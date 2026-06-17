# ShipGen Logistics — Marketing Site

Static marketing website for the ShipGen logistics platform, with a small Node.js API for the contact form (SMTP).

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure email (required for contact form):

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `SMTP_PASS` to your `sales@shipgen.net` mailbox password.

3. Start the site **and** contact API together:

   ```bash
   npm run dev
   ```

   - Frontend: [http://localhost:5175](http://localhost:5175)
   - Contact API: [http://localhost:3001](http://localhost:3001) (proxied via `/api` in dev)

4. **Preview email theme in your browser** (before sending):

   - Sales notification: [http://localhost:3001/api/email/preview/sales](http://localhost:3001/api/email/preview/sales)
   - User auto-reply: [http://localhost:3001/api/email/preview/autoreply](http://localhost:3001/api/email/preview/autoreply)

   You should see the blue→purple gradient header, logo, white card body, and dark footer.

   **Restart the API after template changes:** stop `npm run dev` and run it again, or run `npm run dev:server` in a fresh terminal.

## Contact form emails

On submit, the API sends:

1. **To `sales@shipgen.net`** — notification with name, email, subject, message (`Reply-To` set to the user)
2. **To the user** — auto-reply from `noreply@shipgen.net`

SMTP settings (defaults in `.env.example`):

| Setting | Value |
|---------|--------|
| Host | `mail.shipgen.net` |
| Port | `465` (SSL) |
| Auth user | `sales@shipgen.net` |

Ensure `noreply@shipgen.net` exists as a mailbox or alias on your mail server so the `From` address is accepted.

Set `SITE_URL` and optionally `EMAIL_LOGO_URL` in `.env` so the Shipgen email template can load the logo in messages.

## Build for production

```bash
npm run build
```

Deploy **`dist/`** as static files and run **`server/index.js`** on a Node host. Point your reverse proxy so `/api/contact` reaches the API (or set `VITE_CONTACT_API_URL` at build time to the full API URL).

Example nginx location:

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:3001;
}
```

Set `ALLOWED_ORIGINS` in `.env` to your production site URL(s).

## Project structure

```
├── App.tsx
├── components/          # Pages and UI
├── hooks/               # Shared React hooks
├── server/
│   ├── index.js              # Contact form API
│   └── email/
│       ├── shipgenTemplate.js # Branded HTML layout
│       └── contactEmails.js   # Sales + auto-reply content
├── public/              # Static assets
└── .env.example         # SMTP config template (copy to .env)
```

**Security:** Never commit `.env` or email passwords to git.
