<?php

declare(strict_types=1);

/**
 * PHP built-in server router for local development.
 * Run: php -S localhost:8080 router-dev.php
 */
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

if (str_starts_with($uri, '/api')) {
    require __DIR__ . '/index.php';
    return true;
}

http_response_code(404);
header('Content-Type: text/plain; charset=utf-8');
echo "ShipGen Contact API — use /api/health or /api/contact\n";
return true;
