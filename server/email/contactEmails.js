import {
  renderShipgenEmail,
  fieldRow,
  escapeHtml,
  SITE_URL,
  BRAND_NAME,
  withEmailAttachments,
} from './shipgenTemplate.js';

export function buildSalesEmail({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  const bodyContent = `
    <h1 style="margin: 0 0 10px; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 700; color: #0A0E1A; line-height: 1.3;">
      New contact form submission
    </h1>
    <p style="margin: 0 0 28px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #4B5563; line-height: 1.6;">
      A visitor submitted the contact form on the ${escapeHtml(BRAND_NAME)} website.
    </p>
    ${fieldRow('Name', safeName)}
    ${fieldRow('Email', `<a href="mailto:${safeEmail}" style="color: #0066FF; text-decoration: none; font-weight: 600;">${safeEmail}</a>`)}
    ${fieldRow('Subject', safeSubject)}
    ${fieldRow('Message', safeMessage)}
  `;

  return withEmailAttachments({
    from: `"${BRAND_NAME} Website" <${process.env.NOREPLY_EMAIL?.trim() || 'noreply@shipgen.net'}>`,
    to: process.env.SALES_EMAIL?.trim() || 'sales@shipgen.net',
    replyTo: email,
    subject: `[Contact Form] ${subject}`,
    html: renderShipgenEmail({
      headerTagline: 'Enterprise Logistics &amp; Warehouse Management',
      bodyContent,
      footerNote: 'Internal notification — reply directly to the sender using Reply in your mail client.',
      cta: { label: 'Reply to sender', href: `mailto:${email}?subject=Re:${encodeURIComponent(subject)}` },
    }),
  });
}

export function buildAutoReplyEmail({ name, email }) {
  const safeName = escapeHtml(name);

  const bodyContent = `
    <h1 style="margin: 0 0 14px; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 700; color: #0A0E1A; line-height: 1.3;">
      Thank you, ${safeName}!
    </h1>
    <p style="margin: 0 0 16px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #4B5563; line-height: 1.65;">
      We have received your message and our team will respond within <strong style="color: #0A0E1A;">24 hours</strong>.
    </p>
    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #4B5563; line-height: 1.65;">
      Explore our platform or reach us at
      <a href="mailto:sales@shipgen.net" style="color: #0066FF; text-decoration: none; font-weight: 700;">sales@shipgen.net</a>.
    </p>
  `;

  return withEmailAttachments({
    from: `"${BRAND_NAME}" <${process.env.NOREPLY_EMAIL?.trim() || 'noreply@shipgen.net'}>`,
    to: email,
    subject: `We received your message — ${BRAND_NAME}`,
    html: renderShipgenEmail({
      headerTagline: 'Thank you for contacting us',
      bodyContent,
      footerNote: 'This is an automated confirmation. Please do not reply to this email.',
      cta: { label: 'Visit ShipGen', href: SITE_URL },
    }),
  });
}

/** Sample payloads for preview route */
export const PREVIEW_SAMPLES = {
  sales: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Demo request',
    message: 'I would like to schedule a demo of the yard management module.',
  },
  autoreply: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Demo request',
    message: 'Sample message',
  },
};
