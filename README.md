# ShipGen Logistics — Marketing Site

Static React marketing site with a single **PHP contact handler** for cPanel deployment. Build once, upload `dist/` — no Node.js required on the server.

## Run locally

**Prerequisites:** Node.js 18+

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the frontend:

   ```bash
   npm run dev
   ```

   Frontend: [http://localhost:5173](http://localhost:5173)

   Contact mail works after deploy on cPanel (PHP). Local Vite does not execute PHP.

## Contact form emails

On submit, `contact.php` sends:

1. **To sales** — themed notification with form fields (`Reply-To` = visitor)
2. **To the visitor** — themed auto-reply from `noreply@`

Edit SMTP settings in the `$CONFIG` block at the top of `public/contact.php` (copied into `dist/` on build).

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
├── contact.php         # contact form mail handler
└── .htaccess           # SPA fallback
```

### cPanel steps

1. Upload **everything inside `dist/`** to `public_html/` (or your domain folder).
2. Edit `contact.php` on the server — set SMTP host, user, password, and email addresses in `$CONFIG`.
3. Ensure PHP 8.1+ is enabled for the domain.
4. Submit the contact form on the live site to verify.

The form posts to `/contact.php` on the same domain.

## Project structure

```
├── components/           # React pages
├── public/
│   ├── contact.php       # SMTP contact handler (copied to dist/)
│   └── .htaccess
└── dist/                 # Deploy this folder (gitignored)
```

**Security:** Do not commit real SMTP passwords. Set them on the server after upload.
