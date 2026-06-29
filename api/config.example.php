<?php

/**
 * Copy this file to config.php and set your SMTP credentials.
 * config.php is gitignored — safe to use on cPanel.
 */
return [
    'smtp_host' => 'mail.example.com',
    'smtp_port' => 465,
    'smtp_user' => 'noreply@example.com',
    'smtp_pass' => 'Tanasvi@123',
    'sales_email' => 'sales@example.com',
    'noreply_email' => 'noreply@example.com',
    'brand_name' => 'ShipGen',
    'site_url' => 'https://shipgen.net',
    'email_logo_url' => '',
    'allowed_origins' => [
        'http://localhost:5175',
        'http://localhost:4173',
    ],
    'debug' => false,
];
