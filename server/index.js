import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import { buildAutoReplyEmail, buildSalesEmail, PREVIEW_SAMPLES } from './email/contactEmails.js';

const app = express();
const PORT = Number(process.env.CONTACT_API_PORT) || 3001;

const requiredEnv = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missing = requiredEnv.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and set your SMTP credentials.');
  process.exit(1);
}

const SMTP_HOST = process.env.SMTP_HOST.trim();
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER.trim();
const SMTP_PASS = process.env.SMTP_PASS;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5175')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, themedEmails: true });
});

/** Preview themed emails in browser — http://localhost:3001/api/email/preview/sales */
app.get('/api/email/preview/:type', (req, res) => {
  const type = req.params.type;
  const sample = PREVIEW_SAMPLES[type];
  if (!sample) {
    return res.status(404).send('Use /api/email/preview/sales or /api/email/preview/autoreply');
  }
  const mail = type === 'sales' ? buildSalesEmail(sample) : buildAutoReplyEmail(sample);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(mail.html);
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body ?? {};

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (name.length > 120 || subject.length > 200 || message.length > 5000) {
      return res.status(400).json({ error: 'One or more fields exceed the maximum length.' });
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    const salesMail = buildSalesEmail(payload);
    const replyMail = buildAutoReplyEmail(payload);

    console.log(`[email] Sending themed sales notification (${salesMail.html?.length ?? 0} bytes HTML)`);
    await transporter.sendMail(salesMail);

    console.log(`[email] Sending themed auto-reply (${replyMail.html?.length ?? 0} bytes HTML)`);
    await transporter.sendMail(replyMail);

    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, async () => {
  try {
    await transporter.verify();
    console.log('SMTP connection verified');
  } catch (err) {
    console.warn('SMTP verify failed:', err.message);
  }
  console.log('--- ShipGen Contact API (themed emails v2) ---');
  console.log(`Contact API listening on http://localhost:${PORT}`);
  console.log(`Health check:  http://localhost:${PORT}/api/health`);
  console.log(`Email previews: http://localhost:${PORT}/api/email/preview/sales`);
  console.log(`                  http://localhost:${PORT}/api/email/preview/autoreply`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nPort ${PORT} is already in use. Run: npx kill-port ${PORT}`);
    console.error('Then restart with: npm run dev\n');
  } else {
    console.error(err);
  }
  process.exit(1);
});
