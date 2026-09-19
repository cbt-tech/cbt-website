# Hostinger deployment guide for the Cantabridge website

This project is a Next.js app under the `frontend/` folder. It must be deployed as a Node.js app, not as a static site, because it includes server API routes for contact, careers, and hiring forms.

## 1) Prepare the environment file

From the project root, open the example file:

- `frontend/.env.example`

Copy it to a real environment file for your deployment environment.

Example:

```bash
cd frontend
copy .env.example .env.local
```

Or, if you are deploying with Hostinger and want a production file:

```bash
copy .env.example .env.production
```

Then fill in the real values:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com

GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=your-secret-key

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@yourdomain.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com
CAREERS_TO_EMAIL=careers@yourdomain.com
HIRING_TO_EMAIL=hire@yourdomain.com
```

Important notes:

- `NEXT_PUBLIC_SITE_URL` must be the final live HTTPS domain (for example `https://www.your-domain.com`).
- `GOOGLE_SHEETS_WEBHOOK_*` and `RESEND_*` values are server-side and should not be exposed to the browser.
- If you use Google Sheets, set the webhook and secret. If you use Resend, set the Resend API key and sender email.
- If you use both, keep both configured.

If Hostinger allows environment variables in the dashboard, put the same values there instead of relying only on a local `.env` file.

---

## 2) Build the app locally before deployment

Run these commands from the `frontend` directory:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If the build succeeds, the app is ready for deployment.

Useful local verification:

```bash
npm run start
```

Then open the site locally in the browser to confirm page rendering and form routes work.

---

## 3) Prepare the Hostinger app

In Hostinger:

1. Open your website dashboard.
2. Go to the Node.js app section or the website server section.
3. Create or edit a Node.js project.
4. Set the application root to the project folder that contains the Next.js app.

For this project, the app root should normally be:

```text
/home/username/website/frontend
```

or the matching folder where the project is uploaded.

Do not deploy the project as a plain static site. The app must be run with Node.js so the API routes work.

---

## 4) Upload the project files

Upload the project files to Hostinger from your local machine.

Minimum required contents:

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `public/`
- `src/`
- `.env` or the environment variables configured in Hostinger

If you are using a Git-based deployment, push the project and let Hostinger pull it.

---

## 5) Set the startup command on Hostinger

In the Hostinger Node.js settings, configure the app startup command.

Use one of these approaches:

```bash
npm install && npm run build && npm start
```

or, if Hostinger allows a custom start command:

```bash
npm run start -- --hostname 0.0.0.0 --port 3000
```

If your hosting platform uses a custom runtime environment, set the app port to `3000` and use the correct Node.js version supported by Next.js 16.

---

## 6) Add environment variables in Hostinger

Do not put confidential keys in source control.

Set these in the Hostinger dashboard environment variable section:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=your-secret-key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@yourdomain.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com
CAREERS_TO_EMAIL=careers@yourdomain.com
HIRING_TO_EMAIL=hire@yourdomain.com
```

Make sure the values match the actual production domain and the correct email/provider accounts.

---

## 7) Connect the domain and SSL

1. Add your custom domain in Hostinger.
2. Enable SSL/HTTPS.
3. Make sure the site resolves to the correct Node.js app.
4. Confirm the final URL is the same as `NEXT_PUBLIC_SITE_URL`.

After SSL is enabled, verify the homepage loads correctly with HTTPS.

---

## 8) Deploy and start the app

After the environment variables and startup command are set:

1. Save the configuration.
2. Start or redeploy the app.
3. Wait for the process to boot.
4. Open your site URL.

Check these pages:

- `/`
- `/about`
- `/services`
- `/contact`
- `/careers`
- `/hire-a-developer`

Then test the form routes:

- Contact form submission
- Careers submission
- Developer hiring form

If any form fails, verify the env variables and delivery service setup.

---

## 9) Production service validation

### Google Sheets flow

If the contact or careers form is set to write to Google Sheets:

- Confirm the Google Apps Script webhook URL is valid.
- Confirm the webhook secret matches.
- Test a real submission and verify the row appears in the target sheet.

### Resend email flow

If the site is using email delivery:

- Make sure `RESEND_API_KEY` is valid.
- Confirm the sender email is verified with Resend.
- Test a contact submission and check the inbox.

---

## 10) Common deployment problems

### 1. App fails to start
Check:

- Node.js version compatibility
- The startup command
- Port configuration
- Missing environment variables

### 2. Contact form gives an error
Check:

- `GOOGLE_SHEETS_WEBHOOK_URL`
- `GOOGLE_SHEETS_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

### 3. Sitemap or meta URLs look wrong
Check:

- `NEXT_PUBLIC_SITE_URL`
- domain and SSL configuration

### 4. API routes return 500
Check:

- server runtime is enabled
- environment variables are loaded
- code is built with production config

---

## 11) Recommended final deployment checklist

Before going live, confirm all of these are true:

- [ ] `npm install` works
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Hostinger uses a Node.js app, not static hosting
- [ ] `NEXT_PUBLIC_SITE_URL` points to the final live domain
- [ ] All required env vars are added in Hostinger
- [ ] SSL is active
- [ ] Contact form works
- [ ] Careers form works
- [ ] Hiring form works
- [ ] Live site loads correctly on HTTPS

---

## 12) Recommended production command set

Use this as the final production deployment pattern:

```bash
npm install
npm run build
npm start
```

If Hostinger requires a custom startup script, use:

```bash
npm install && npm run build && npx next start -H 0.0.0.0 -p 3000
```

---

## 13) Final reminder

This site includes both frontend pages and server APIs. A static upload alone will not work for contact, careers, or hiring forms. Hostinger must run the Next.js server with the correct environment variables.

If you want, the next step is to prepare a Hostinger-specific `.env.production` example using your actual live domain and secrets.
