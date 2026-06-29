<?php

declare(strict_types=1);

final class ContactEmails
{
    /** @var array<string, array{name: string, email: string, subject: string, message: string}> */
    public const PREVIEW_SAMPLES = [
        'sales' => [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Demo request',
            'message' => 'I would like to schedule a demo of the yard management module.',
        ],
        'autoreply' => [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Demo request',
            'message' => 'Sample message',
        ],
    ];

    /**
     * @param array{name: string, email: string, subject: string, message: string} $payload
     * @return array{from: string, to: string, reply_to: string, subject: string, html: string, embedded: list<array{path: string, cid: string, filename: string}>}
     */
    public static function buildSalesEmail(array $payload): array
    {
        $brand = ShipgenTemplate::brandName();
        $safeName = ShipgenTemplate::escapeHtml($payload['name']);
        $safeEmail = ShipgenTemplate::escapeHtml($payload['email']);
        $safeSubject = ShipgenTemplate::escapeHtml($payload['subject']);
        $safeMessage = nl2br(ShipgenTemplate::escapeHtml($payload['message']));

        $bodyContent = '
    <h1 style="margin: 0 0 10px; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 700; color: #0A0E1A; line-height: 1.3;">
      New contact form submission
    </h1>
    <p style="margin: 0 0 28px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #4B5563; line-height: 1.6;">
      A visitor submitted the contact form on the ' . ShipgenTemplate::escapeHtml($brand) . ' website.
    </p>
    ' . ShipgenTemplate::fieldRow('Name', $safeName) . '
    ' . ShipgenTemplate::fieldRow('Email', '<a href="mailto:' . $safeEmail . '" style="color: #0066FF; text-decoration: none; font-weight: 600;">' . $safeEmail . '</a>') . '
    ' . ShipgenTemplate::fieldRow('Subject', $safeSubject) . '
    ' . ShipgenTemplate::fieldRow('Message', $safeMessage);

        $noreply = Config::string('noreply_email', 'noreply@shipgen.net');
        $sales = Config::string('sales_email', 'sales@shipgen.net');

        return [
            'from' => '"' . $brand . ' Website" <' . $noreply . '>',
            'to' => $sales,
            'reply_to' => $payload['email'],
            'subject' => '[Contact Form] ' . $payload['subject'],
            'html' => ShipgenTemplate::render([
                'headerTagline' => 'Enterprise Logistics &amp; Warehouse Management',
                'bodyContent' => $bodyContent,
                'footerNote' => 'Internal notification — reply directly to the sender using Reply in your mail client.',
                'cta' => [
                    'label' => 'Reply to sender',
                    'href' => 'mailto:' . $payload['email'] . '?subject=Re:' . rawurlencode($payload['subject']),
                ],
            ]),
            'embedded' => ShipgenTemplate::embeddedLogo(),
        ];
    }

    /**
     * @param array{name: string, email: string, subject?: string, message?: string} $payload
     * @return array{from: string, to: string, subject: string, html: string, embedded: list<array{path: string, cid: string, filename: string}>}
     */
    public static function buildAutoReplyEmail(array $payload): array
    {
        $brand = ShipgenTemplate::brandName();
        $safeName = ShipgenTemplate::escapeHtml($payload['name']);
        $noreply = Config::string('noreply_email', 'noreply@shipgen.net');
        $sales = Config::string('sales_email', 'sales@shipgen.net');

        $bodyContent = '
    <h1 style="margin: 0 0 14px; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 700; color: #0A0E1A; line-height: 1.3;">
      Thank you, ' . $safeName . '!
    </h1>
    <p style="margin: 0 0 16px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #4B5563; line-height: 1.65;">
      We have received your message and our team will respond within <strong style="color: #0A0E1A;">24 hours</strong>.
    </p>
    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #4B5563; line-height: 1.65;">
      Explore our platform or reach us at
      <a href="mailto:' . ShipgenTemplate::escapeHtml($sales) . '" style="color: #0066FF; text-decoration: none; font-weight: 700;">' . ShipgenTemplate::escapeHtml($sales) . '</a>.
    </p>';

        return [
            'from' => '"' . $brand . '" <' . $noreply . '>',
            'to' => $payload['email'],
            'subject' => 'We received your message — ' . $brand,
            'html' => ShipgenTemplate::render([
                'headerTagline' => 'Thank you for contacting us',
                'bodyContent' => $bodyContent,
                'footerNote' => 'This is an automated confirmation. Please do not reply to this email.',
                'cta' => [
                    'label' => 'Visit ShipGen',
                    'href' => ShipgenTemplate::siteUrl(),
                ],
            ]),
            'embedded' => ShipgenTemplate::embeddedLogo(),
        ];
    }
}
