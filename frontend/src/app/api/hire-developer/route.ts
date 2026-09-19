import { hasPrivacyAcknowledgment, PRIVACY_ACKNOWLEDGMENT_ERROR, privacyReceipt } from "@/lib/privacy";
import { saveToGoogleSheets, googleSheetsErrorResponse, SUBMISSION_NOT_CONFIGURED_MESSAGE } from "@/lib/google-sheets";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const expertiseValues = new Set(["Frontend Development", "Backend Development", "Full-Stack Development", "Mobile App Development", "AI Agents & Automation", "Salesforce Development", "IoT & Embedded Development", "Cloud & DevOps", "Not Sure Yet"]);
const developerCountValues = new Set(["1 developer", "2 developers", "3–5 developers", "6+ developers", "Not Sure Yet"]);
const engagementValues = new Set(["Dedicated developer", "Additional team support", "Defined project", "Not Sure Yet"]);
const durationValues = new Set(["Less than 3 months", "3–6 months", "6–12 months", "More than 12 months", "Not Sure Yet"]);
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();

type HiringPayload = Record<string, unknown>;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function clientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
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
  if (origin && origin !== requestOrigin && origin !== allowedOrigin) {
    return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length") || 0) > 25_000) {
    return Response.json({ message: "Please shorten your project requirements and try again." }, { status: 413 });
  }
  if (isRateLimited(clientAddress(request))) {
    return Response.json({ message: "Please wait a few minutes before trying again." }, { status: 429 });
  }

  let payload: HiringPayload;
  try {
    payload = await request.json() as HiringPayload;
  } catch {
    return Response.json({ message: "We couldn’t read this submission. Refresh the page and try again." }, { status: 400 });
  }

  if (text(payload.website, 200)) return Response.json({ message: "Hiring enquiry received." });

  const contactName = text(payload.contactName, 100);
  if (!hasPrivacyAcknowledgment(payload.privacyAcknowledged)) return Response.json({ message: PRIVACY_ACKNOWLEDGMENT_ERROR }, { status: 400 });
  const companyName = text(payload.companyName, 120);
  const workEmail = text(payload.workEmail, 160).toLowerCase();
  const phone = text(payload.phone, 30);
  const expertise = text(payload.expertise, 80);
  const developerCount = text(payload.developerCount, 40);
  const engagementType = text(payload.engagementType, 60);
  const duration = text(payload.duration, 50);
  const startDate = text(payload.startDate, 100);
  const budgetRange = text(payload.budgetRange, 100) || "Not provided";
  const timezoneOverlap = text(payload.timezoneOverlap, 160);
  const requirements = text(payload.requirements, 5000);

  if (contactName.length < 2 || companyName.length < 2 || !emailPattern.test(workEmail) || startDate.length < 2 || timezoneOverlap.length < 2 || requirements.length < 30) {
    return Response.json({ message: "Please review the required fields and try again." }, { status: 400 });
  }
  if (!expertiseValues.has(expertise) || !developerCountValues.has(developerCount) || !engagementValues.has(engagementType) || !durationValues.has(duration)) {
    return Response.json({ message: "Please select a valid option for each requirement." }, { status: 400 });
  }
  if (typeof payload.requirements === "string" && payload.requirements.trim().length > 5000) {
    return Response.json({ message: "Please shorten your project requirements and try again." }, { status: 400 });
  }

  try {
    if (await saveToGoogleSheets({ type: "hiring", fields: {
      "Privacy acknowledgment": privacyReceipt(), "Contact name": contactName, "Company name": companyName,
      "Email": workEmail, "Phone": phone, "Developer expertise": expertise, "Number of developers": developerCount,
      "Engagement type": engagementType, "Expected duration": duration, "Preferred start date": startDate,
      "Budget range": budgetRange, "Timezone overlap": timezoneOverlap, "Requirements": requirements,
    } })) return Response.json({ message: "Hiring enquiry received successfully." });
  } catch (error) {
    return googleSheetsErrorResponse(error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.HIRING_TO_EMAIL || "contact@cantabridgetechnologies.com";
  if (!apiKey || !fromEmail) {
    console.error("Hiring enquiry email delivery is not configured.");
    return Response.json({ message: SUBMISSION_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const fields = [
    ["Privacy acknowledgment", privacyReceipt()],
    ["Contact name", contactName], ["Company name", companyName], ["Work email", workEmail], ["Phone", phone || "Not provided"],
    ["Developer expertise", expertise], ["Number of developers", developerCount], ["Engagement type", engagementType], ["Expected duration", duration],
    ["Preferred start date", startDate], ["Budget range", budgetRange], ["Timezone / working-hour overlap", timezoneOverlap],
  ];
  const plainText = [...fields.map(([label, value]) => `${label}: ${value}`), "", "Project requirements:", requirements].join("\n");
  const tableRows = fields.map(([label, value]) => `<tr><td style="padding:7px 14px 7px 0;vertical-align:top"><strong>${escapeHtml(label)}</strong></td><td style="padding:7px 0;vertical-align:top">${escapeHtml(value)}</td></tr>`).join("");

  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `hire-${crypto.randomUUID()}` },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: workEmail,
        subject: `Developer hiring enquiry: ${expertise} — ${companyName}`,
        text: plainText,
        html: `<h2>New developer hiring enquiry</h2><table cellpadding="0" cellspacing="0">${tableRows}</table><h3>Project requirements</h3><p>${escapeHtml(requirements).replace(/\n/g, "<br>")}</p>`,
      }),
    });
  } catch (error) {
    console.error("Hiring enquiry email provider request failed", error);
    return Response.json({ message: "We couldn’t send your enquiry. Please try again or email contact@cantabridgetechnologies.com." }, { status: 502 });
  }

  if (!emailResponse.ok) {
    console.error("Hiring enquiry email delivery failed with status", emailResponse.status);
    return Response.json({ message: "We couldn’t send your enquiry. Please try again or email contact@cantabridgetechnologies.com." }, { status: 502 });
  }

  return Response.json({ message: "Hiring enquiry sent successfully." });
}
