# Cantabridge Technologies Website

Corporate website for Cantabridge Technologies, with shared page styling, typed service content, contact and application forms, and Salesforce Embedded Messaging.

## Stack

- Next.js, React, and TypeScript
- Tailwind CSS
- Framer Motion and Lucide React

## Architecture

```text
public/             Organized static assets
src/app/            Routes, layouts, metadata, and page composition
src/components/     Reusable layout, UI, common, and domain components
src/config/         Global site and SEO configuration
src/data/           Typed local content sources
src/hooks/          Reusable React hooks
src/lib/            Helpers and data access
src/types/          Shared TypeScript contracts
```

Pages compose components; components receive data through props; repeated content lives in `src/data`; shared contracts live in `src/types`. Server Components and static generation are preferred.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm start
```

## Content and services

Content uses local typed data. Contact, hiring, and careers API routes store submissions in Google Sheets when configured, or deliver them through Resend; they require a server runtime. There is no website application database, authentication, or CMS.

To add a service, add a typed entry to `src/data/services.ts` and place approved assets under `public/images/services`. The shared `/services/[slug]` route generates the page; do not create a duplicate page file.

To add a page, create its route under `src/app` and keep it focused on metadata and composition. Add domain-specific reusable sections under the matching `src/components` folder, or cross-page primitives under `src/components/common` or `src/components/ui`.

## Deployment

Use a Next.js-compatible Node.js deployment on Hostinger or another provider. A static-only upload cannot run the contact, hiring, and careers API routes.

Before building for production:

- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS website origin; it controls canonical URLs, the sitemap, and form origin validation.
- For Google Sheets, follow [the setup guide](integrations/google-sheets/SETUP.md) and configure server-only `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET`. Résumés use a restricted Google Drive folder. No email service is required in this mode.
- Alternatively, configure server-only `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`, with a verified sending domain. `CAREERS_TO_EMAIL` and `HIRING_TO_EMAIL` are optional.
- Run `npm run lint`, `npm run build`, and `node --test tests/privacy-consent.test.mjs`.
- Verify actual Google Sheets storage (including résumé access), or email delivery, and Salesforce chat on the deployed origin.

The site shares the `--heading-font` system font stack across headings, body text, navigation, and forms. Public images are served individually; removing unused images reduces the deployment assets.

## Salesforce website agent

`src/components/layout/SalesforceAgent.tsx` loads the supplied CBT Embedded Messaging deployment through the shared `PageShell`, so the agent remains available across routes. It initializes once per document and requests chat opening 1.5 seconds after both the Messaging API and chat button are ready.

Salesforce setup must permit the website origin:

- Add the deployed website origin to the Salesforce CORS allowlist.
- Allow that origin to frame the associated Experience Cloud site using its trusted inline-framing domains. Add preview or local-development origins separately if needed.
- Publish the messaging deployment after relevant configuration changes, then verify the launcher and chat on the actual website.

The local browser check loaded the bootstrap successfully, but Salesforce blocked its chat iframe with a `frame-ancestors` policy that currently permits only Salesforce domains. This restriction must be changed in Salesforce; website code cannot override it.

References: [Salesforce Messaging security](https://help.salesforce.com/s/articleView?id=service.miaw_security.htm&language=en_US&type=5) and [Messaging administration and iframe troubleshooting](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/messaging_admin_implementation_guide.pdf).

## Pending approved information

Training currently directs visitors to discuss requirements. Case study detail pages contain the existing project summaries; fuller project reports require approved content.
