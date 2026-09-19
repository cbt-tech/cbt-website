import { validateContactPayload, type ContactPayload } from "@/lib/contact-validation";
import { privacyReceipt } from "@/lib/privacy";
import { saveToGoogleSheets, googleSheetsErrorResponse, SUBMISSION_NOT_CONFIGURED_MESSAGE } from "@/lib/google-sheets";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 3;
const MINIMUM_FORM_COMPLETION_MS = 2_000;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function clientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(address: string) {
  const now = Date.now();
  const entry = rateLimit.get(address);
  if (!entry || entry.resetAt <= now) {
    rateLimit.set(address, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin || (origin !== requestOrigin && origin !== allowedOrigin)) {
    return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 403 });
  }

  if (request.headers.get("x-contact-form") !== "website") {
    return Response.json({ message: "We couldn’t verify this form. Refresh the page and try again." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return Response.json({ message: "Please shorten your message and try again." }, { status: 413 });
  }

  if (isRateLimited(clientAddress(request))) {
    return Response.json({ message: "Please wait a few minutes before trying again." }, { status: 429 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 400 });
  }

  if (text(payload.formGuard, 200) || text(payload.website, 200)) {
    console.warn("Contact submission rejected because the anti-spam field was populated. No data was saved.");
    return Response.json({ message: "Your submission was not saved because we could not verify the form. Refresh the page, enter your details manually, and try again." }, { status: 400 });
  }

  const validation = validateContactPayload(payload);
  if (!validation.ok) return Response.json({ message: validation.message }, { status: 400 });

  const { name, email, phone, company, service, message, startedAt } = validation.data;
  const completionTime = Date.now() - startedAt;
  if (completionTime < MINIMUM_FORM_COMPLETION_MS || completionTime > 24 * 60 * 60 * 1000) {
    return Response.json({ message: "We couldn’t verify this form. Refresh the page and try again." }, { status: 400 });
  }

  try {
    if (await saveToGoogleSheets({ type: "contact", fields: {
      "Privacy acknowledgment": privacyReceipt(), "Form": text(payload.formType, 30),
      "Name": name, "Email": email, "Phone": phone, "Company": company, "Service": service, "Message": message,
    } })) return Response.json({ message: "Inquiry received successfully." });
  } catch (error) {
    return googleSheetsErrorResponse(error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact email delivery is not configured.");
    return Response.json({ message: SUBMISSION_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const subject = `New website inquiry: ${service} — ${company}`;
  const acknowledgment = privacyReceipt();
  const plainText = [
    acknowledgment,
    `Name: ${name}`,
    `Work email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Company: ${company}`,
    `Service: ${service}`,
    "",
    "Project requirements:",
    message,
  ].join("\n");

  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text: plainText,
        html: `<h2>New website inquiry</h2><p>${escapeHtml(acknowledgment)}</p><table cellpadding="6" cellspacing="0"><tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr><tr><td><strong>Work email</strong></td><td>${escapeHtml(email)}</td></tr><tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "Not provided")}</td></tr><tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr><tr><td><strong>Service</strong></td><td>${escapeHtml(service)}</td></tr></table><h3>Project requirements</h3><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      }),
    });
  } catch (error) {
    console.error("Contact email provider request failed", error);
    return Response.json(
      { message: "We couldn’t send your enquiry. Please try again or email contact@cantabridgetechnologies.com." },
      { status: 502 },
    );
  }

  if (!emailResponse.ok) {
    console.error("Contact email delivery failed with status", emailResponse.status);
    return Response.json({ message: "We couldn’t send your enquiry. Please try again or email contact@cantabridgetechnologies.com." }, { status: 502 });
  }

  return Response.json({ message: "Inquiry sent successfully." });
}
