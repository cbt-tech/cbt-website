import { hasPrivacyAcknowledgment, PRIVACY_ACKNOWLEDGMENT_ERROR } from "@/lib/privacy";

export const contactServices = [
  "AI Agents & Automation",
  "AI & Machine Learning",
  "Claude Solutions",
  "IoT Solutions",
  "Cybersecurity",
  "Salesforce CRM",
  "Web Development",
  "Mobile App Development",
  "Mobile Development",
  "Cloud Services",
  "Cloud Computing",
  "Not Sure Yet",
  "Other",
] as const;

export type ContactFormType = "enquiry" | "consultation";

export type ContactPayload = {
  privacyAcknowledged?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
  formGuard?: unknown;
  formType?: unknown;
  startedAt?: unknown;
};

export type ValidContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  formType: ContactFormType;
  startedAt: number;
};

type ValidationResult =
  | { ok: true; data: ValidContactPayload }
  | { ok: false; message: string };

const serviceSet = new Set<string>(contactServices);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+\d][\d\s().-]*$/;
// HTML patterns use the Unicode sets (v) flag; literal parentheses and hyphens need escaping.
export const CONTACT_PHONE_INPUT_PATTERN = String.raw`[+0-9][0-9 \(\)\-.]*`;
const controlCharacterPattern = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactPayload(payload: ContactPayload): ValidationResult {
  if (!hasPrivacyAcknowledgment(payload.privacyAcknowledged)) {
    return { ok: false, message: PRIVACY_ACKNOWLEDGMENT_ERROR };
  }
  const name = text(payload.name);
  const email = text(payload.email).toLowerCase();
  const phone = text(payload.phone);
  const company = text(payload.company);
  const service = text(payload.service);
  const message = text(payload.message);
  const formType = payload.formType === "consultation" ? "consultation" : payload.formType === "enquiry" ? "enquiry" : null;
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : Number(text(payload.startedAt));

  if (!formType) return { ok: false, message: "We couldn’t verify this form. Refresh the page and try again." };
  if (name.length < 2 || name.length > 100 || controlCharacterPattern.test(name)) {
    return { ok: false, message: "Please enter a valid name between 2 and 100 characters." };
  }
  if (email.length > 160 || !emailPattern.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (phone && (phone.length > 30 || !phonePattern.test(phone) || phone.replace(/\D/g, "").length < 7)) {
    return { ok: false, message: "Please enter a valid phone number, or leave it blank." };
  }
  if (company.length > 120 || controlCharacterPattern.test(company)) {
    return { ok: false, message: "Please enter a valid company or organization name." };
  }
  if (formType === "consultation" && company.length < 2) {
    return { ok: false, message: "Please enter your company or organization name." };
  }
  if ((formType === "consultation" && !service) || (service && !serviceSet.has(service))) {
    return { ok: false, message: "Please select a valid service." };
  }
  if (message.length < 20 || message.length > 4000 || controlCharacterPattern.test(message)) {
    return { ok: false, message: "Please provide project details between 20 and 4,000 characters." };
  }
  if (!Number.isSafeInteger(startedAt) || startedAt <= 0) {
    return { ok: false, message: "We couldn’t verify this form. Refresh the page and try again." };
  }

  return { ok: true, data: { name, email, phone, company, service, message, formType, startedAt } };
}
