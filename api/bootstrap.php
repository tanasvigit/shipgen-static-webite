<?php

declare(strict_types=1);

require_once __DIR__ . '/lib/Http.php';
require_once __DIR__ . '/lib/Config.php';
require_once __DIR__ . '/lib/Mailer.php';
require_once __DIR__ . '/lib/ShipgenTemplate.php';
require_once __DIR__ . '/lib/ContactEmails.php';

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    if (php_sapi_name() === 'cli-server') {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'Missing api/config.php. Copy api/config.example.php to api/config.php and set SMTP credentials.',
        ]);
        exit;
    }
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Contact API is not configured.']);
    exit;
}

Config::load(require $configPath);
