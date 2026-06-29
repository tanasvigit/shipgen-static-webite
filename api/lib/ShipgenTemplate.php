<?php

declare(strict_types=1);

final class ShipgenTemplate
{
    private const LOGO_CID = 'shipgen-logo@shipgen';

    private const THEME = [
        'primaryBlue' => '#0066FF',
        'purpleAccent' => '#7C3AED',
        'textPrimary' => '#0A0E1A',
        'textSecondary' => '#4B5563',
        'background' => '#F5F6F8',
        'cardWhite' => '#FFFFFF',
        'footerDark' => '#0A0E1A',
        'fontBody' => 'Arial, Helvetica, sans-serif',
        'fontMono' => 'Consolas, Monaco, monospace',
    ];

    public static function brandName(): string
    {
        return Config::string('brand_name', 'ShipGen');
    }

    public static function siteUrl(): string
    {
        return rtrim(Config::string('site_url', 'https://shipgen.net'), '/');
    }

    public static function logoUrl(): string
    {
        $custom = Config::string('email_logo_url');
        if ($custom !== '') {
            return $custom;
        }
        return self::siteUrl() . '/logo_logistic.png';
    }

    public static function logoCid(): string
    {
        return self::LOGO_CID;
    }

    public static function logoPath(): ?string
    {
        $candidates = [
            dirname(__DIR__, 2) . '/logo_logistic.png',
            dirname(__DIR__, 3) . '/public/logo_logistic.png',
        ];

        foreach ($candidates as $path) {
            if (is_file($path)) {
                return $path;
            }
        }

        return null;
    }

    /** @return list<array{path: string, cid: string, filename: string}> */
    public static function embeddedLogo(): array
    {
        $path = self::logoPath();
        if ($path === null) {
            return [];
        }

        return [[
            'path' => $path,
            'cid' => self::LOGO_CID,
            'filename' => 'logo_logistic.png',
        ]];
    }

    private static function logoSrc(): string
    {
        return self::logoPath() !== null ? 'cid:' . self::LOGO_CID : self::logoUrl();
    }

    /**
     * @param array{
     *   headerTagline: string,
     *   bodyContent: string,
     *   footerNote?: string,
     *   cta?: array{label: string, href: string}
     * } $options
     */
    public static function render(array $options): string
    {
        $theme = self::THEME;
        $brand = self::escapeHtml(self::brandName());
        $year = date('Y');
        $disclaimer = self::escapeHtml(
            $options['footerNote'] ?? 'This is an automated message from ShipGen. Please do not reply if you did not request it.'
        );

        $headerInner = '
    <img src="' . self::logoSrc() . '" alt="' . $brand . '" width="150" height="auto" style="display: block; margin: 0 auto 14px; max-width: 150px; height: auto; border: 0; outline: none;" />
    <p style="margin: 0; font-family: ' . $theme['fontBody'] . '; font-size: 14px; font-weight: 600; color: #FFFFFF; letter-spacing: 0.03em; line-height: 1.5;">
      ' . $options['headerTagline'] . '
    </p>';

        $ctaBlock = !empty($options['cta'])
            ? self::ctaButton($options['cta']['label'], $options['cta']['href'])
            : '';

        return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <title>' . $brand . '</title>
  <style type="text/css">
    body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
  </style>
</head>
<body bgcolor="' . $theme['background'] . '" style="margin: 0; padding: 0; background-color: ' . $theme['background'] . '; font-family: ' . $theme['fontBody'] . ';">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="' . $theme['background'] . '" style="background-color: ' . $theme['background'] . ';">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; border-collapse: separate;">
          <tr>
            ' . self::gradientHeaderCell($headerInner) . '
          </tr>
          <tr>
            <td bgcolor="' . $theme['cardWhite'] . '" style="background-color: ' . $theme['cardWhite'] . '; padding: 36px 32px; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;">
              <div style="font-family: ' . $theme['fontBody'] . '; font-size: 15px; line-height: 1.65; color: ' . $theme['textPrimary'] . ';">
                ' . $options['bodyContent'] . '
              </div>
              ' . $ctaBlock . '
            </td>
          </tr>
          <tr>
            <td bgcolor="' . $theme['footerDark'] . '" style="background-color: ' . $theme['footerDark'] . '; padding: 24px 32px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 8px; font-family: ' . $theme['fontBody'] . '; font-size: 13px; font-weight: 700; color: #FFFFFF;">
                &copy; ' . $year . ' ' . $brand . '
              </p>
              <p style="margin: 0; font-family: ' . $theme['fontBody'] . '; font-size: 12px; line-height: 1.55; color: #9CA3AF;">
                ' . $disclaimer . '
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>';
    }

    public static function fieldRow(string $label, string $valueHtml): string
    {
        $theme = self::THEME;
        return '
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
      <tr>
        <td style="padding-bottom: 6px; font-family: ' . $theme['fontMono'] . '; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ' . $theme['textSecondary'] . ';">
          ' . self::escapeHtml($label) . '
        </td>
      </tr>
      <tr>
        <td bgcolor="' . $theme['background'] . '" style="padding: 14px 16px; background-color: ' . $theme['background'] . '; border: 1px solid #E5E7EB; border-radius: 8px; font-family: ' . $theme['fontBody'] . '; font-size: 15px; color: ' . $theme['textPrimary'] . '; line-height: 1.55;">
          ' . $valueHtml . '
        </td>
      </tr>
    </table>';
    }

    public static function escapeHtml(string $text): string
    {
        return htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    private static function gradientHeaderCell(string $innerHtml): string
    {
        $theme = self::THEME;
        return '
    <td align="center" bgcolor="' . $theme['primaryBlue'] . '" style="background-color: ' . $theme['primaryBlue'] . '; background: linear-gradient(135deg, ' . $theme['primaryBlue'] . ' 0%, ' . $theme['purpleAccent'] . ' 100%); padding: 0; border-radius: 12px 12px 0 0;">
      <!--[if gte mso 9]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:140px;">
        <v:fill type="gradient" color="' . $theme['primaryBlue'] . '" color2="' . $theme['purpleAccent'] . '" angle="135" />
        <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:true">
      <![endif]-->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding: 32px 28px 28px; text-align: center;">
            ' . $innerHtml . '
          </td>
        </tr>
      </table>
      <!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
    </td>';
    }

    private static function ctaButton(string $label, string $href): string
    {
        $theme = self::THEME;
        $safeHref = self::escapeHtml($href);
        $safeLabel = self::escapeHtml($label);

        return '
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px;">
      <tr>
        <td align="center" bgcolor="' . $theme['primaryBlue'] . '" style="border-radius: 8px; background-color: ' . $theme['primaryBlue'] . '; background: linear-gradient(135deg, ' . $theme['primaryBlue'] . ' 0%, ' . $theme['purpleAccent'] . ' 100%);">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="' . $safeHref . '" style="height:46px;v-text-anchor:middle;width:220px;" arcsize="12%" fillcolor="' . $theme['primaryBlue'] . '" stroke="f">
          <v:fill type="gradient" color="' . $theme['primaryBlue'] . '" color2="' . $theme['purpleAccent'] . '" angle="135" />
          <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">' . $safeLabel . '</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="' . $safeHref . '" target="_blank" style="display: inline-block; padding: 14px 32px; font-family: ' . $theme['fontBody'] . '; font-size: 15px; font-weight: 700; color: #FFFFFF !important; text-decoration: none; border-radius: 8px; mso-hide: all;">
            ' . $safeLabel . '
          </a>
          <!--<![endif]-->
        </td>
      </tr>
    </table>';
    }
}
