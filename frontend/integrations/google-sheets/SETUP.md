# Google Sheets form storage

The website can store all four forms without Amazon SES or Resend. Contact and consultation forms use the **Contact enquiries** tab, hiring uses **Developer hiring**, and careers uses **Career applications**. Résumés are stored in a restricted Google Drive folder; the sheet holds the file link. No notification emails are sent in Sheets mode.

## Set up your Google account

1. Create a Google Sheet owned by your company and keep **General access: Restricted**. Copy its ID from `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`.
2. Create a dedicated Google Drive folder for résumés with **General access: Restricted**. Copy its ID from `https://drive.google.com/drive/folders/RESUME_FOLDER_ID`.
3. In the sheet, choose **Extensions > Apps Script**. Replace the default code with [Code.gs](./Code.gs).
4. Open **Project Settings > Script Properties** and add:

   | Property | Value |
   | --- | --- |
   | `SPREADSHEET_ID` | Your spreadsheet ID |
   | `RESUME_FOLDER_ID` | Your private résumé folder ID |
   | `WEBHOOK_SECRET` | A randomly generated secret of at least 32 characters |

   Generate a secret locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Put the same value in your hosting environment; do not post it in chat or add it to browser code.

5. Choose **Deploy > New deployment > Web app**. Set **Execute as: Me** and **Who has access: Anyone**, authorize the spreadsheet and Drive permissions, and copy the deployed URL ending in `/exec`. The endpoint requires the shared secret; the sheet and files remain restricted. Some managed Google accounts restrict public web-app deployment and require an administrator's change.
6. Configure these **server-only** variables in `frontend/.env.local` for local development, and in your hosting environment for deployment:

   ```env
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   GOOGLE_SHEETS_WEBHOOK_SECRET=the_same_secret_as_WEBHOOK_SECRET
   ```

7. Restart the local server, or rebuild/redeploy your hosted website. Submit each form with test data and confirm the right row appears. For careers, also open the résumé link as the owner and confirm an unauthenticated visitor cannot view it. This account-level check cannot be completed from the project alone.

After changing `Code.gs`, publish a **new version** through **Deploy > Manage deployments**; saving the script alone does not update the deployed endpoint. Do not rename the generated column headers.

## Behavior and maintenance

- The browser submits to the existing website API routes. The shared secret stays on the server. Existing validation, privacy checkboxes, file validation, and anti-abuse checks still apply.
- When either Google variable is set, Sheets is selected. Incomplete configuration or a Google failure produces an error, never a false success or a fallback email. With neither Google variable set, the previous Resend configuration remains available.
- The website requires Node.js hosting to run its API routes, even when using Sheets.
- A script lock prevents overlapping row writes. Duplicate requests with the same submission ID do not add a second row. A new form submission receives a new ID; a retry after an ambiguous network failure can still produce a duplicate, so review records before acting on them.
- Restrict collaborators to staff who need access. Review and delete expired records and associated résumé files in line with your privacy policy. Keep an eye on storage and Apps Script quotas. This setup can use a standard Google account; its quotas and Drive storage are limited.
- Diagnose errors using hosting logs and **Apps Script > Executions**. Confirm script properties, deployment access, résumé folder access, matching headers, and quotas. There is no public endpoint that lists submissions.

Google documentation: [Web app deployment](https://developers.google.com/apps-script/guides/web), [Drive service](https://developers.google.com/apps-script/reference/drive), and [quotas](https://developers.google.com/apps-script/guides/services/quotas).
