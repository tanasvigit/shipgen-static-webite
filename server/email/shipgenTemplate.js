/**
 * Shipgen email layout — enterprise theme with email-client-safe HTML.
 * Colors: #0066FF, #7C3AED, #0A0E1A, #4B5563, #F5F6F8, #FFFFFF
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.join(__dirname, '../../public/logo_logistic.png');
const LOGO_CID = 'shipgen-logo@shipgen';

const THEME = {
  primaryBlue: '#0066FF',
  purpleAccent: '#7C3AED',
  textPrimary: '#0A0E1A',
  textSecondary: '#4B5563',
  background: '#F5F6F8',
  cardWhite: '#FFFFFF',
  footerDark: '#0A0E1A',
  fontBody: 'Arial, Helvetica, sans-serif',
  fontMono: 'Consolas, Monaco, monospace',
};

const BRAND_NAME = process.env.BRAND_NAME?.trim() || 'ShipGen';
const SITE_URL = (process.env.SITE_URL || 'https://shipgen.net').replace(/\/$/, '');
const LOGO_URL =
  process.env.EMAIL_LOGO_URL?.trim() || `${SITE_URL}/logo_logistic.png`;

/** Inline logo attachment for reliable display in Gmail/Outlook */
export function getEmailAttachments() {
  if (fs.existsSync(LOGO_PATH)) {
    return [
      {
        filename: 'logo_logistic.png',
        path: LOGO_PATH,
        cid: LOGO_CID,
      },
    ];
  }
  return [];
}

function logoSrc() {
  return fs.existsSync(LOGO_PATH) ? `cid:${LOGO_CID}` : LOGO_URL;
}

function gradientHeaderCell(innerHtml) {
  return `
    <td align="center" bgcolor="${THEME.primaryBlue}" style="background-color: ${THEME.primaryBlue}; background: linear-gradient(135deg, ${THEME.primaryBlue} 0%, ${THEME.purpleAccent} 100%); padding: 0; border-radius: 12px 12px 0 0;">
      <!--[if gte mso 9]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:140px;">
        <v:fill type="gradient" color="${THEME.primaryBlue}" color2="${THEME.purpleAccent}" angle="135" />
        <v:textbox inset="0,0,0,0" style="mso-fit-shape-to-text:true">
      <![endif]-->
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="padding: 32px 28px 28px; text-align: center;">
            ${innerHtml}
          </td>
        </tr>
      </table>
      <!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
    </td>`;
}

function ctaButton(label, href) {
  const safeHref = escapeHtml(href);
  const safeLabel = escapeHtml(label);
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 24px;">
      <tr>
        <td align="center" bgcolor="${THEME.primaryBlue}" style="border-radius: 8px; background-color: ${THEME.primaryBlue}; background: linear-gradient(135deg, ${THEME.primaryBlue} 0%, ${THEME.purpleAccent} 100%);">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${safeHref}" style="height:46px;v-text-anchor:middle;width:220px;" arcsize="12%" fillcolor="${THEME.primaryBlue}" stroke="f">
          <v:fill type="gradient" color="${THEME.primaryBlue}" color2="${THEME.purpleAccent}" angle="135" />
          <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${safeLabel}</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${safeHref}" target="_blank" style="display: inline-block; padding: 14px 32px; font-family: ${THEME.fontBody}; font-size: 15px; font-weight: 700; color: #FFFFFF !important; text-decoration: none; border-radius: 8px; mso-hide: all;">
            ${safeLabel}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
    </table>`;
}

/**
 * @param {object} options
 * @param {string} options.headerTagline
 * @param {string} options.bodyContent
 * @param {string} [options.footerNote]
 * @param {{ label: string, href: string }} [options.cta]
 */
export function renderShipgenEmail({ headerTagline, bodyContent, footerNote, cta }) {
  const year = new Date().getFullYear();
  const disclaimer =
    footerNote ||
    'This is an automated message from ShipGen. Please do not reply if you did not request it.';

  const headerInner = `
    <img src="${logoSrc()}" alt="${escapeHtml(BRAND_NAME)}" width="150" height="auto" style="display: block; margin: 0 auto 14px; max-width: 150px; height: auto; border: 0; outline: none;" />
    <p style="margin: 0; font-family: ${THEME.fontBody}; font-size: 14px; font-weight: 600; color: #FFFFFF; letter-spacing: 0.03em; line-height: 1.5;">
      ${headerTagline}
    </p>`;

  const ctaBlock = cta ? ctaButton(cta.label, cta.href) : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
  <title>${escapeHtml(BRAND_NAME)}</title>
  <style type="text/css">
    body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
  </style>
</head>
<body bgcolor="${THEME.background}" style="margin: 0; padding: 0; background-color: ${THEME.background}; font-family: ${THEME.fontBody};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${THEME.background}" style="background-color: ${THEME.background};">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; border-collapse: separate;">
          <tr>
            ${gradientHeaderCell(headerInner)}
          </tr>
          <tr>
            <td bgcolor="${THEME.cardWhite}" style="background-color: ${THEME.cardWhite}; padding: 36px 32px; border-left: 1px solid #E5E7EB; border-right: 1px solid #E5E7EB;">
              <div style="font-family: ${THEME.fontBody}; font-size: 15px; line-height: 1.65; color: ${THEME.textPrimary};">
                ${bodyContent}
              </div>
              ${ctaBlock}
            </td>
          </tr>
          <tr>
            <td bgcolor="${THEME.footerDark}" style="background-color: ${THEME.footerDark}; padding: 24px 32px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 8px; font-family: ${THEME.fontBody}; font-size: 13px; font-weight: 700; color: #FFFFFF;">
                &copy; ${year} ${escapeHtml(BRAND_NAME)}
              </p>
              <p style="margin: 0; font-family: ${THEME.fontBody}; font-size: 12px; line-height: 1.55; color: #9CA3AF;">
                ${escapeHtml(disclaimer)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function fieldRow(label, valueHtml) {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
      <tr>
        <td style="padding-bottom: 6px; font-family: ${THEME.fontMono}; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${THEME.textSecondary};">
          ${escapeHtml(label)}
        </td>
      </tr>
      <tr>
        <td bgcolor="${THEME.background}" style="padding: 14px 16px; background-color: ${THEME.background}; border: 1px solid #E5E7EB; border-radius: 8px; font-family: ${THEME.fontBody}; font-size: 15px; color: ${THEME.textPrimary}; line-height: 1.55;">
          ${valueHtml}
        </td>
      </tr>
    </table>`;
}

export function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function withEmailAttachments(mailOptions) {
  const attachments = getEmailAttachments();
  if (!attachments.length) return mailOptions;
  return {
    ...mailOptions,
    attachments: [...(mailOptions.attachments || []), ...attachments],
  };
}

export { THEME, BRAND_NAME, SITE_URL, LOGO_URL, LOGO_CID };
