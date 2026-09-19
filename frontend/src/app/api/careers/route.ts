import { hasPrivacyAcknowledgment, PRIVACY_ACKNOWLEDGMENT_ERROR, privacyReceipt } from "@/lib/privacy";
import { normalizeCareerLink } from "@/lib/career-links";
import { saveToGoogleSheets, googleSheetsErrorResponse, SUBMISSION_NOT_CONFIGURED_MESSAGE } from "@/lib/google-sheets";

export const runtime = "nodejs";

const SUCCESS_MESSAGE = "We’ve received your details. If your skills match a suitable opportunity, we’ll contact you using the information you provided.";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedRoles = new Set(["General Application", "AI Agents & Automation", "Web & Backend Development", "Mobile App Development", "Cloud & DevOps", "Cybersecurity", "Salesforce & CRM", "IoT & Embedded Development", "Technical Support", "Internship", "Freelance / Contract"]);
const allowedExtensions = new Set(["pdf", "doc", "docx"]);
const allowedTypes = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_REQUEST_BYTES = 5_700_000;
const RATE_WINDOW_MS = 30 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 3;
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const recentSubmissions = new Map<string, number>();

function text(value: FormDataEntryValue | null, maxLength: number) {
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

function validMagicBytes(bytes: Uint8Array, extension: string) {
  if (extension === "pdf") return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2d;
  if (extension === "doc") return bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0 && bytes[4] === 0xa1 && bytes[5] === 0xb1 && bytes[6] === 0x1a && bytes[7] === 0xe1;
  if (extension === "docx") return bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
  return false;
}

async function fingerprint(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (origin && origin !== requestOrigin && origin !== allowedOrigin) return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("multipart/form-data")) return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 415 });
  if (Number(request.headers.get("content-length") || 0) > MAX_REQUEST_BYTES) return Response.json({ message: "Your submission exceeds the allowed size. Check the résumé size and shorten the message if needed." }, { status: 413 });
  if (isRateLimited(clientAddress(request))) return Response.json({ message: "Please wait a few minutes before trying again." }, { status: 429 });

  let formData: FormData;
  try { formData = await request.formData(); } catch { return Response.json({ message: "We couldn’t process this submission. Refresh the page and try again." }, { status: 400 }); }
  if (text(formData.get("website"), 200)) return Response.json({ message: SUCCESS_MESSAGE });

  const fullName = text(formData.get("fullName"), 100);
  if (!hasPrivacyAcknowledgment(formData.get("privacyAcknowledged"))) return Response.json({ message: PRIVACY_ACKNOWLEDGMENT_ERROR }, { status: 400 });
  const email = text(formData.get("email"), 160).toLowerCase();
  const phone = text(formData.get("phone"), 30);
  const location = text(formData.get("location"), 120);
  const role = text(formData.get("role"), 100);
  const experience = text(formData.get("experience"), 100);
  const currentCompany = text(formData.get("currentCompany"), 120);
  const linkedin = normalizeCareerLink(text(formData.get("linkedin"), 300));
  const portfolio = normalizeCareerLink(text(formData.get("portfolio"), 300));
  const coverMessage = text(formData.get("coverMessage"), 3000);
  const consent = text(formData.get("consent"), 10);
  const resume = formData.get("resume");

  if (fullName.length < 2 || !email || location.length < 2 || !allowedRoles.has(role) || !experience || coverMessage.length < 30) return Response.json({ message: "Please complete the required fields before submitting." }, { status: 400 });
  if (!emailPattern.test(email)) return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  if (linkedin === null || portfolio === null) return Response.json({ message: `Please enter a valid website link in ${linkedin === null ? "LinkedIn Profile" : "Portfolio / GitHub"}, or leave it blank.` }, { status: 400 });
  if (consent !== "true") return Response.json({ message: "Please confirm your agreement to the use of your profile for career consideration." }, { status: 400 });
  if (!(resume instanceof File) || resume.size === 0) return Response.json({ message: "Please attach your résumé before submitting." }, { status: 400 });
  if (resume.size > MAX_FILE_BYTES) return Response.json({ message: "Please upload a PDF, DOC or DOCX file no larger than 5 MB." }, { status: 400 });
  const extension = resume.name.split(".").pop()?.toLowerCase() ?? "";
  if (!allowedExtensions.has(extension) || !allowedTypes.has(resume.type)) return Response.json({ message: "Please upload a PDF, DOC or DOCX file no larger than 5 MB." }, { status: 400 });
  const resumeBytes = new Uint8Array(await resume.arrayBuffer());
  if (!validMagicBytes(resumeBytes, extension)) return Response.json({ message: "We couldn’t read this file as a supported résumé. Please upload a valid PDF, DOC or DOCX file." }, { status: 400 });

  const submissionKey = await fingerprint(`${email}|${phone}|${role}|${resume.name}|${resume.size}`);
  const now = Date.now();
  for (const [key, submittedAt] of recentSubmissions) if (now - submittedAt > DUPLICATE_WINDOW_MS) recentSubmissions.delete(key);
  if (recentSubmissions.has(submissionKey)) return Response.json({ message: "We’ve already received this submission. You don’t need to send it again." }, { status: 409 });

  try {
    if (await saveToGoogleSheets({ type: "careers", fields: {
      "Privacy acknowledgment": privacyReceipt(), "Career consideration consent": "Confirmed",
      "Full name": fullName, "Email": email, "Phone": phone, "Current location": location, "Role interested in": role,
      "Experience": experience, "Current company": currentCompany, "LinkedIn": linkedin, "Portfolio / GitHub": portfolio,
      "Cover message": coverMessage,
    }, resume: { filename: resume.name.replace(/[^a-zA-Z0-9._-]/g, "_"), mimeType: resume.type, content: Buffer.from(resumeBytes).toString("base64") } })) {
      recentSubmissions.set(submissionKey, now);
      return Response.json({ message: SUCCESS_MESSAGE });
    }
  } catch (error) {
    return googleSheetsErrorResponse(error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CAREERS_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Careers email delivery is not configured.");
    return Response.json({ message: SUBMISSION_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const fields = [["Privacy acknowledgment", privacyReceipt()], ["Career consideration consent", "Confirmed"], ["Full name", fullName], ["Email", email], ["Phone", phone], ["Current location", location], ["Role interested in", role], ["Experience", experience], ["Current company", currentCompany || "Not provided"], ["LinkedIn", linkedin || "Not provided"], ["Portfolio / GitHub", portfolio || "Not provided"]];
  const plainText = [...fields.map(([label, value]) => `${label}: ${value}`), "", "Cover message / Why Cantabridge:", coverMessage].join("\n");
  const tableRows = fields.map(([label, value]) => `<tr><td style="padding:6px"><strong>${escapeHtml(label)}</strong></td><td style="padding:6px">${escapeHtml(value)}</td></tr>`).join("");

  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `career-${submissionKey}` },
      body: JSON.stringify({
        from: fromEmail, to: [toEmail], reply_to: email, subject: `Career profile: ${role} — ${fullName}`, text: plainText,
        html: `<h2>New careers profile</h2><table cellpadding="0" cellspacing="0">${tableRows}</table><h3>Cover message / Why Cantabridge</h3><p>${escapeHtml(coverMessage).replace(/\n/g, "<br>")}</p>`,
        attachments: [{ filename: resume.name.replace(/[^a-zA-Z0-9._-]/g, "_"), content: Buffer.from(resumeBytes).toString("base64") }],
      }),
    });
  } catch (error) {
    console.error("Careers email provider request failed", error);
    return Response.json({ message: "We couldn’t submit your profile. Please try again." }, { status: 502 });
  }
  if (!emailResponse.ok) {
    console.error("Careers email delivery failed with status", emailResponse.status);
    return Response.json({ message: "We couldn’t submit your profile. Please try again." }, { status: 502 });
  }

  recentSubmissions.set(submissionKey, now);
  return Response.json({ message: SUCCESS_MESSAGE });
}
