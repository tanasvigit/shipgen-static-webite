<?php

declare(strict_types=1);

final class Mailer
{
    private string $host;
    private int $port;
    private string $user;
    private string $pass;

    public function __construct()
    {
        $this->host = Config::string('smtp_host');
        $this->port = Config::int('smtp_port', 465);
        $this->user = Config::string('smtp_user');
        $this->pass = Config::string('smtp_pass');
    }

    /**
     * @param array{
     *   from: string,
     *   to: string,
     *   subject: string,
     *   html: string,
     *   reply_to?: string,
     *   embedded?: list<array{path: string, cid: string, filename: string}>
     * } $message
     */
    public function send(array $message): void
    {
        if ($this->host === '' || $this->user === '' || $this->pass === '') {
            throw new RuntimeException('SMTP is not configured.');
        }

        $socket = $this->connect();
        try {
            $this->expect($socket, 220);
            $this->command($socket, 'EHLO ' . gethostname());
            $this->expect($socket, 250);
            $this->command($socket, 'AUTH LOGIN');
            $this->expect($socket, 334);
            $this->command($socket, base64_encode($this->user));
            $this->expect($socket, 334);
            $this->command($socket, base64_encode($this->pass));
            $this->expect($socket, 235);

            $from = $this->extractAddress($message['from']);
            $to = $this->extractAddress($message['to']);

            $this->command($socket, 'MAIL FROM:<' . $from . '>');
            $this->expect($socket, 250);
            $this->command($socket, 'RCPT TO:<' . $to . '>');
            $this->expect($socket, 250);
            $this->command($socket, 'DATA');
            $this->expect($socket, 354);

            $boundary = !empty($message['embedded']) ? 'shipgen_' . bin2hex(random_bytes(8)) : null;
            $headerBlock = $this->buildHeaders($message, $boundary);
            $body = $this->buildBody($message, $boundary);
            $payload = $headerBlock . "\r\n\r\n" . $body;
            $payload = preg_replace('/^\./m', '..', $payload) ?? $payload;

            fwrite($socket, $payload . "\r\n.\r\n");
            $this->expect($socket, 250);
            $this->command($socket, 'QUIT');
        } finally {
            fclose($socket);
        }
    }

    /** @return resource */
    private function connect()
    {
        $target = ($this->port === 465 ? 'ssl://' : '') . $this->host . ':' . $this->port;
        $errno = 0;
        $errstr = '';
        $socket = @stream_socket_client(
            $target,
            $errno,
            $errstr,
            20,
            STREAM_CLIENT_CONNECT,
            stream_context_create([
                'ssl' => [
                    'verify_peer' => true,
                    'verify_peer_name' => true,
                    'allow_self_signed' => false,
                ],
            ])
        );

        if ($socket === false) {
            throw new RuntimeException('SMTP connection failed: ' . $errstr);
        }

        stream_set_timeout($socket, 20);
        return $socket;
    }

    /** @param resource $socket */
    private function command($socket, string $command): void
    {
        fwrite($socket, $command . "\r\n");
    }

    /** @param resource $socket */
    private function expect($socket, int $code): void
    {
        $response = $this->readResponse($socket);
        if (!str_starts_with($response, (string) $code)) {
            throw new RuntimeException('Unexpected SMTP response: ' . $response);
        }
    }

    /** @param resource $socket */
    private function readResponse($socket): string
    {
        $data = '';
        while (($line = fgets($socket, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return trim($data);
    }

    /** @param array<string, mixed> $message */
    private function buildHeaders(array $message, ?string $boundary): string
    {
        $headers = [
            'From: ' . $message['from'],
            'To: ' . $message['to'],
            'Subject: ' . $this->encodeHeader($message['subject']),
            'MIME-Version: 1.0',
            'Date: ' . date(DATE_RFC2822),
            'Message-ID: <' . bin2hex(random_bytes(16)) . '@shipgen>',
        ];

        if (!empty($message['reply_to'])) {
            $headers[] = 'Reply-To: ' . $message['reply_to'];
        }

        if ($boundary !== null) {
            $headers[] = 'Content-Type: multipart/related; boundary="' . $boundary . '"';
        } else {
            $headers[] = 'Content-Type: text/html; charset=UTF-8';
            $headers[] = 'Content-Transfer-Encoding: 8bit';
        }

        return implode("\r\n", $headers);
    }

    /** @param array<string, mixed> $message */
    private function buildBody(array $message, ?string $boundary): string
    {
        if ($boundary === null) {
            return $message['html'];
        }

        $parts = [];
        $parts[] = '--' . $boundary;
        $parts[] = 'Content-Type: text/html; charset=UTF-8';
        $parts[] = 'Content-Transfer-Encoding: 8bit';
        $parts[] = '';
        $parts[] = $message['html'];

        foreach ($message['embedded'] as $item) {
            if (!is_file($item['path'])) {
                continue;
            }
            $binary = file_get_contents($item['path']);
            if ($binary === false) {
                continue;
            }
            $parts[] = '--' . $boundary;
            $parts[] = 'Content-Type: image/png; name="' . $item['filename'] . '"';
            $parts[] = 'Content-Transfer-Encoding: base64';
            $parts[] = 'Content-ID: <' . $item['cid'] . '>';
            $parts[] = 'Content-Disposition: inline; filename="' . $item['filename'] . '"';
            $parts[] = '';
            $parts[] = chunk_split(base64_encode($binary));
        }

        $parts[] = '--' . $boundary . '--';
        return implode("\r\n", $parts);
    }

    private function extractAddress(string $value): string
    {
        if (preg_match('/<([^>]+)>/', $value, $matches)) {
            return trim($matches[1]);
        }
        return trim($value);
    }

    private function encodeHeader(string $value): string
    {
        if (preg_match('/[^\x20-\x7E]/', $value)) {
            return '=?UTF-8?B?' . base64_encode($value) . '?=';
        }
        return $value;
    }
}
