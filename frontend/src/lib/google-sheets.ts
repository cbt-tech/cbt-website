import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";

type Submission = {
  type: "contact" | "hiring" | "careers";
  fields: Record<string, string>;
  resume?: { filename: string; mimeType: string; content: string };
};

export const SUBMISSION_NOT_CONFIGURED_MESSAGE = "This form is not configured to receive submissions yet. Please email contact@cantabridgetechnologies.com.";

class GoogleSheetsError extends Error {
  constructor(message: string, readonly publicMessage: string, readonly status = 502) {
    super(message);
  }
}

export function googleSheetsErrorResponse(error: unknown) {
  // Only log our own diagnostics, never provider responses or submitted data.
  console.error("Google Sheets storage failed:", error instanceof GoogleSheetsError ? error.message : "Unexpected storage failure. Check Apps Script executions.");
  return Response.json({
    message: error instanceof GoogleSheetsError ? error.publicMessage : "We could not confirm that your submission was saved. Please email contact@cantabridgetechnologies.com before submitting again.",
  }, { status: error instanceof GoogleSheetsError ? error.status : 502 });
}

// Called only by server route handlers. Never expose these settings to the browser.
// Returns false when Sheets is not selected, allowing the existing email delivery.
export async function saveToGoogleSheets(submission: Submission): Promise<boolean> {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!webhook && !secret) return false;
  if (!webhook || !secret || secret.length < 32) throw new GoogleSheetsError("Google Sheets configuration is incomplete. Set GOOGLE_SHEETS_WEBHOOK_URL and a GOOGLE_SHEETS_WEBHOOK_SECRET of at least 32 characters in frontend/.env.local or the hosting environment, then restart or redeploy.", SUBMISSION_NOT_CONFIGURED_MESSAGE, 503);
  let url: URL;
  try {
    url = new URL(webhook);
  } catch {
    throw new GoogleSheetsError("GOOGLE_SHEETS_WEBHOOK_URL is not a valid URL.", SUBMISSION_NOT_CONFIGURED_MESSAGE, 503);
  }
  if (url.protocol !== "https:" || url.hostname !== "script.google.com" || url.username || url.password || url.search || url.hash || !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname)) {
    throw new GoogleSheetsError("Use the deployed Google Apps Script /exec URL.", SUBMISSION_NOT_CONFIGURED_MESSAGE, 503);
  }
  const submissionId = crypto.randomUUID();
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...submission, submissionId, submittedAt: new Date().toISOString(), privacyPolicyVersion: PRIVACY_POLICY_VERSION, secret }),
    cache: "no-store",
    signal: AbortSignal.timeout(45_000),
  });
  if (!response.ok) throw new GoogleSheetsError(`Google Sheets request failed with HTTP ${response.status}. Check deployment access and Apps Script executions.`, "The submission service is unavailable. Please email contact@cantabridgetechnologies.com.");
  let result: { ok?: unknown; submissionId?: unknown; error?: unknown } | null;
  try {
    result = await response.json();
  } catch {
    throw new GoogleSheetsError("Google Sheets returned an invalid response. Check the deployed script version and web app access permissions.", "The submission service returned an unexpected response. We could not confirm storage. Please email contact@cantabridgetechnologies.com.");
  }
  if (result?.ok !== true || result.submissionId !== submissionId) {
    const diagnostics: Record<string, string> = {
      spreadsheet_access: "Unable to open the spreadsheet. Check SPREADSHEET_ID in Apps Script Script Properties and the deployment owner's sheet access.",
      sheet_headers: "Unable to prepare sheet columns. Check existing tab headers against Code.gs.",
      resume_storage: "Resume storage failed. Check RESUME_FOLDER_ID, file validation, and private Drive folder access.",
      resume_decode: "Resume data could not be decoded. Check the deployed script version and the uploaded file encoding.",
      resume_folder_missing: "Set RESUME_FOLDER_ID in Apps Script Script Properties. Careers requires a private Drive folder.",
      resume_folder_access: "Unable to open the resume folder. Check RESUME_FOLDER_ID and the deployment owner's Drive access.",
      resume_folder_sharing: "Set the resume folder General access to Restricted.",
      resume_file_create: "Unable to create the resume file. Check Drive storage, folder edit permission, and Apps Script quotas.",
      resume_file_url: "Unable to read the stored resume link. Check Drive access for the deployment owner.",
      row_write: "Spreadsheet row write failed. Check sheet edit permissions, protected ranges, and quotas.",
    };
    const detail = typeof result?.error === "string" && Object.hasOwn(diagnostics, result.error)
      ? diagnostics[result.error]
      : "Check matching WEBHOOK_SECRET, SPREADSHEET_ID, permissions, headers, and Apps Script executions.";
    throw new GoogleSheetsError(`Google Sheets did not confirm storage. ${detail}`, "We could not confirm that your submission was saved. Please email contact@cantabridgetechnologies.com before submitting again.");
  }
  return true;
}
