# ShipGen Logistics — Marketing Site

Static React marketing site with a **PHP contact API** for cPanel deployment. Build once, upload `dist/` — no Node.js required on the server.

## Run locally

**Prerequisites:** Node.js 18+, PHP 8.1+ with OpenSSL (local dev only — cPanel provides PHP in production)

On Windows, install [PHP](https://windows.php.net/download/) or XAMPP and add `php` to your PATH.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the contact API:

   ```bash
   cp api/config.example.php api/config.php
   ```

   Edit `api/config.php` with your SMTP credentials (same settings you used for the old Node API).

3. Start frontend + PHP API:

   ```bash
   npm run dev
   ```

   - Frontend: [http://localhost:5175](http://localhost:5175)
   - Contact API: proxied at `/api/*` → PHP on port `8080`

4. **Preview email templates:**

   - Sales notification: [http://localhost:8080/api/email/preview/sales](http://localhost:8080/api/email/preview/sales)
   - User auto-reply: [http://localhost:8080/api/email/preview/autoreply](http://localhost:8080/api/email/preview/autoreply)

5. Health check: [http://localhost:8080/api/health](http://localhost:8080/api/health)

## Contact form emails

On submit, the API sends:

1. **To sales** — themed notification with form fields (`Reply-To` = visitor)
2. **To the visitor** — themed auto-reply from `noreply@`

Configure addresses in `api/config.php` (`sales_email`, `noreply_email`, SMTP settings).

## Build & deploy to cPanel

```bash
npm run build
```

This produces:

```
dist/
├── index.html          # React app
├── assets/             # JS/CSS
├── logo_logistic.png   # static assets from public/
├── .htaccess           # SPA + /api routing
└── api/                # PHP contact API (copied from api/)
    ├── index.php
    ├── config.example.php
    ├── lib/
    └── handlers/
```

### cPanel steps

1. Upload **everything inside `dist/`** to `public_html/` (or your domain folder).
2. On the server, copy `api/config.example.php` → `api/config.php` and set SMTP credentials.
3. Ensure PHP 8.1+ is enabled for the domain.
4. Test: `https://yourdomain.com/api/health` should return `{"ok":true,"themedEmails":true}`.

The contact form posts to `/api/contact` on the same domain — no CORS or separate API host needed in production.

Optional: set `site_url` in `api/config.php` to your live URL for email links and logo fallback.

## Project structure

```
├── api/                    # PHP contact API (source)
│   ├── config.example.php  # Copy to config.php (gitignored)
│   ├── index.php           # Router: /api/contact, /api/health, previews
│   ├── handlers/
│   └── lib/                # Mailer, templates
├── components/             # React pages
├── public/.htaccess        # Copied to dist/ on build
├── scripts/copy-api.mjs    # Runs after vite build
└── dist/                   # Deploy this folder (gitignored)
```

**Security:** Never commit `api/config.php` or SMTP passwords.
