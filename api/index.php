<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

apply_cors();

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$route = preg_replace('#^/api/?#', '', $path);
$route = trim((string) $route, '/');

if ($route === 'contact') {
    require __DIR__ . '/handlers/contact.php';
    exit;
}

if ($route === 'health') {
    require __DIR__ . '/handlers/health.php';
    exit;
}

if (preg_match('#^email/preview/(sales|autoreply)$#', $route, $matches)) {
    $_GET['type'] = $matches[1];
    require __DIR__ . '/handlers/preview.php';
    exit;
}

json_response(['error' => 'Not found.'], 404);
