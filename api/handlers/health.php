<?php

declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

apply_cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    json_response(['error' => 'Method not allowed.'], 405);
}

json_response(['ok' => true, 'themedEmails' => true]);
