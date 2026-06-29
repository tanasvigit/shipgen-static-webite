<?php

declare(strict_types=1);

require_once __DIR__ . '/../bootstrap.php';

apply_cors();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(['error' => 'Method not allowed.'], 405);
}

try {
    $body = read_json_body();
    $name = trim((string) ($body['name'] ?? ''));
    $email = trim((string) ($body['email'] ?? ''));
    $subject = trim((string) ($body['subject'] ?? ''));
    $message = trim((string) ($body['message'] ?? ''));

    if ($name === '' || $email === '' || $subject === '' || $message === '') {
        json_response(['error' => 'All fields are required.'], 400);
    }

    if (!is_valid_email($email)) {
        json_response(['error' => 'Please enter a valid email address.'], 400);
    }

    if (strlen($name) > 120 || strlen($subject) > 200 || strlen($message) > 5000) {
        json_response(['error' => 'One or more fields exceed the maximum length.'], 400);
    }

    $payload = [
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
    ];

    $mailer = new Mailer();
    $mailer->send(ContactEmails::buildSalesEmail($payload));
    $mailer->send(ContactEmails::buildAutoReplyEmail($payload));

    json_response(['ok' => true]);
} catch (Throwable $e) {
    if (Config::get('debug', false)) {
        json_response(['error' => $e->getMessage()], 500);
    }
    error_log('Contact form error: ' . $e->getMessage());
    json_response(['error' => 'Failed to send message. Please try again later.'], 500);
}
