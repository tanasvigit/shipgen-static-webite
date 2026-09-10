<?php
/**
 * ShipGen contact form handler — single file for cPanel.
 * Edit the $CONFIG block below with your SMTP credentials after deploy.
 * POST JSON: { name, email, subject, message } → sales email + auto-reply.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$CONFIG = [
    'smtp_host' => 'mail.shipgen.net',
    'smtp_port' => 465,
    'smtp_user' => 'sales@shipgen.net',
    'smtp_pass' => 'Tanasvi@123',
    'sales_email' => 'sales@shipgen.net',
    'noreply_email' => 'sales@shipgen.net',
    'brand_name' => 'ShipGen',
    'site_url' => 'https://shipgen.net',
    'debug' => false,
];

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

header('Access-Control-Allow-Origin: *');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(['error' => 'Method not allowed.'], 405);
}

try {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw ?: '', true);
    if (!is_array($body)) {
        respond(['error' => 'Invalid JSON body.'], 400);
    }

    $name = trim((string) ($body['name'] ?? ''));
    $email = trim((string) ($body['email'] ?? ''));
    $subject = trim((string) ($body['subject'] ?? ''));
    $message = trim((string) ($body['message'] ?? ''));

    if ($name === '' || $email === '' || $subject === '' || $message === '') {
        respond(['error' => 'All fields are required.'], 400);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(['error' => 'Please enter a valid email address.'], 400);
    }
    if (strlen($name) > 120 || strlen($subject) > 200 || strlen($message) > 5000) {
        respond(['error' => 'One or more fields exceed the maximum length.'], 400);
    }

    $brand = $CONFIG['brand_name'];
    $sales = $CONFIG['sales_email'];
    $noreply = $CONFIG['noreply_email'];
    $siteUrl = rtrim($CONFIG['site_url'], '/');

    $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    $salesHtml = email_shell($brand, 'Enterprise Logistics &amp; Warehouse Management', '
      <h1 style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:24px;color:#0A0E1A;">New contact form submission</h1>
      <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#4B5563;">
        A visitor submitted the contact form on the ' . htmlspecialchars($brand, ENT_QUOTES, 'UTF-8') . ' website.
      </p>
      ' . field_row('Name', $safeName) . '
      ' . field_row('Email', '<a href="mailto:' . $safeEmail . '" style="color:#0066FF;text-decoration:none;font-weight:600;">' . $safeEmail . '</a>') . '
      ' . field_row('Subject', $safeSubject) . '
      ' . field_row('Message', $safeMessage) . '
    ', 'Internal notification — reply directly to the sender.');

    $autoHtml = email_shell($brand, 'Thank you for contacting us', '
      <h1 style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:24px;color:#0A0E1A;">Thank you, ' . $safeName . '!</h1>
      <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#4B5563;line-height:1.65;">
        We have received your message and our team will respond within <strong>24 hours</strong>.
      </p>
      <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#4B5563;line-height:1.65;">
        Reach us at <a href="mailto:' . htmlspecialchars($sales, ENT_QUOTES, 'UTF-8') . '" style="color:#0066FF;font-weight:700;">' . htmlspecialchars($sales, ENT_QUOTES, 'UTF-8') . '</a>
        or visit <a href="' . htmlspecialchars($siteUrl, ENT_QUOTES, 'UTF-8') . '" style="color:#0066FF;">' . htmlspecialchars($siteUrl, ENT_QUOTES, 'UTF-8') . '</a>.
      </p>
    ', 'This is an automated confirmation. Please do not reply to this email.');

    smtp_send($CONFIG, [
        'from' => '"' . $brand . ' Website" <' . $noreply . '>',
        'to' => $sales,
        'reply_to' => $email,
        'subject' => '[Contact Form] ' . $subject,
        'html' => $salesHtml,
    ]);

    smtp_send($CONFIG, [
        'from' => '"' . $brand . '" <' . $noreply . '>',
        'to' => $email,
        'subject' => 'We received your message — ' . $brand,
        'html' => $autoHtml,
    ]);

    respond(['ok' => true]);
} catch (Throwable $e) {
    error_log('Contact form error: ' . $e->getMessage());
    if (!empty($CONFIG['debug'])) {
        respond(['error' => $e->getMessage()], 500);
    }
    respond(['error' => 'Failed to send message. Please try again later.'], 500);
}

function respond(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function field_row(string $label, string $valueHtml): string
{
    return '
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 12px;">
      <tr>
        <td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.04em;padding:0 0 4px;">'
        . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') .
        '</td>
      </tr>
      <tr>
        <td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0A0E1A;line-height:1.5;padding:10px 12px;background:#F5F6F8;border-radius:8px;">'
        . $valueHtml .
        '</td>
      </tr>
    </table>';
}

function email_shell(string $brand, string $tagline, string $body, string $footerNote): string
{
    $safeBrand = htmlspecialchars($brand, ENT_QUOTES, 'UTF-8');
    return '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#F5F6F8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5F6F8;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#0A0E1A;padding:24px 28px;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#FFFFFF;">' . $safeBrand . '</div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#9CA3AF;margin-top:4px;">' . $tagline . '</div>
        </td></tr>
        <tr><td style="padding:28px;">' . $body . '</td></tr>
        <tr><td style="padding:16px 28px 24px;border-top:1px solid #E5E7EB;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9CA3AF;">' . htmlspecialchars($footerNote, ENT_QUOTES, 'UTF-8') . '</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>';
}

function smtp_send(array $config, array $message): void
{
    $host = (string) $config['smtp_host'];
    $port = (int) $config['smtp_port'];
    $user = (string) $config['smtp_user'];
    $pass = (string) $config['smtp_pass'];

    if ($host === '' || $user === '' || $pass === '' || $pass === 'YOUR_SMTP_PASSWORD') {
        throw new RuntimeException('SMTP is not configured. Edit $CONFIG in contact.php.');
    }

    $target = ($port === 465 ? 'ssl://' : '') . $host . ':' . $port;
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

    try {
        smtp_expect($socket, 220);
        smtp_cmd($socket, 'EHLO ' . (gethostname() ?: 'localhost'));
        smtp_expect($socket, 250);
        smtp_cmd($socket, 'AUTH LOGIN');
        smtp_expect($socket, 334);
        smtp_cmd($socket, base64_encode($user));
        smtp_expect($socket, 334);
        smtp_cmd($socket, base64_encode($pass));
        smtp_expect($socket, 235);

        $from = extract_email($message['from']);
        $to = extract_email($message['to']);

        smtp_cmd($socket, 'MAIL FROM:<' . $from . '>');
        smtp_expect($socket, 250);
        smtp_cmd($socket, 'RCPT TO:<' . $to . '>');
        smtp_expect($socket, 250);
        smtp_cmd($socket, 'DATA');
        smtp_expect($socket, 354);

        $headers = [
            'From: ' . $message['from'],
            'To: ' . $message['to'],
            'Subject: ' . encode_header($message['subject']),
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'Date: ' . date(DATE_RFC2822),
            'Message-ID: <' . bin2hex(random_bytes(16)) . '@shipgen>',
        ];
        if (!empty($message['reply_to'])) {
            $headers[] = 'Reply-To: ' . $message['reply_to'];
        }

        $payload = implode("\r\n", $headers) . "\r\n\r\n" . $message['html'];
        $payload = preg_replace('/^\./m', '..', $payload) ?? $payload;
        fwrite($socket, $payload . "\r\n.\r\n");
        smtp_expect($socket, 250);
        smtp_cmd($socket, 'QUIT');
    } finally {
        fclose($socket);
    }
}

/** @param resource $socket */
function smtp_cmd($socket, string $command): void
{
    fwrite($socket, $command . "\r\n");
}

/** @param resource $socket */
function smtp_expect($socket, int $code): void
{
    $data = '';
    while (($line = fgets($socket, 515)) !== false) {
        $data .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    $response = trim($data);
    if (!str_starts_with($response, (string) $code)) {
        throw new RuntimeException('Unexpected SMTP response: ' . $response);
    }
}

function extract_email(string $value): string
{
    if (preg_match('/<([^>]+)>/', $value, $matches)) {
        return trim($matches[1]);
    }
    return trim($value);
}

function encode_header(string $value): string
{
    if (preg_match('/[^\x20-\x7E]/', $value)) {
        return '=?UTF-8?B?' . base64_encode($value) . '?=';
    }
    return $value;
}
