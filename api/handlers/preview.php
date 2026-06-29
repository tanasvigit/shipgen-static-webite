<?php

declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

apply_cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    http_response_code(405);
    echo 'Method not allowed.';
    exit;
}

$type = (string) ($_GET['type'] ?? '');
$sample = ContactEmails::PREVIEW_SAMPLES[$type] ?? null;

if ($sample === null) {
    http_response_code(404);
    echo 'Use /api/email/preview/sales or /api/email/preview/autoreply';
    exit;
}

$html = $type === 'sales'
    ? ContactEmails::buildSalesEmail($sample)['html']
    : ContactEmails::buildAutoReplyEmail($sample)['html'];

header('Content-Type: text/html; charset=utf-8');
echo $html;
