<?php

declare(strict_types=1);

final class Config
{
    /** @var array<string, mixed> */
    private static array $values = [];

    /** @param array<string, mixed> $config */
    public static function load(array $config): void
    {
        self::$values = $config;
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return self::$values[$key] ?? $default;
    }

    public static function string(string $key, string $default = ''): string
    {
        $value = self::get($key, $default);
        return is_string($value) ? trim($value) : $default;
    }

    public static function int(string $key, int $default = 0): int
    {
        $value = self::get($key, $default);
        return is_int($value) ? $value : (int) $value;
    }

    /** @return list<string> */
    public static function stringList(string $key): array
    {
        $value = self::get($key, []);
        if (!is_array($value)) {
            return [];
        }

        return array_values(array_filter(array_map(static fn ($item) => is_string($item) ? trim($item) : '', $value)));
    }
}
