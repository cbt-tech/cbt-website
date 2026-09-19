"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, LoaderCircle, Upload } from "lucide-react";
import styles from "./CareersPage.module.css";
import { PrivacyAcknowledgment } from "@/components/common/PrivacyAcknowledgment";
import { hasPrivacyAcknowledgment, PRIVACY_ACKNOWLEDGMENT_ERROR } from "@/lib/privacy";
import { normalizeCareerLink } from "@/lib/career-links";

const SUCCESS_MESSAGE = "We’ve received your details. If your skills match a suitable opportunity, we’ll contact you using the information you provided.";
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx"];
type FormStatus = "idle" | "loading" | "success" | "error";

export function CareerApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (!hasPrivacyAcknowledgment(formData.get("privacyAcknowledged"))) {
      setStatus("error"); setMessage(PRIVACY_ACKNOWLEDGMENT_ERROR); return;
    }
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    if (!value("fullName") || !value("email") || !value("location") || !value("role") || !value("experience") || !value("coverMessage")) {
      setStatus("error"); setMessage("Please complete the required fields before submitting."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) {
      setStatus("error"); setMessage("Please enter a valid email address."); return;
    }
    for (const [name, label] of [["linkedin", "LinkedIn Profile"], ["portfolio", "Portfolio / GitHub"]]) {
      const link = normalizeCareerLink(value(name));
      if (link === null) {
        setStatus("error"); setMessage(`Please enter a valid website link in ${label}, or leave it blank. For example: https://github.com/yourname`);
        form.querySelector<HTMLInputElement>(`input[name="${name}"]`)?.focus();
        return;
      }
      formData.set(name, link);
    }
    const resume = formData.get("resume");
    if (!(resume instanceof File) || resume.size === 0) { setStatus("error"); setMessage("Please attach your résumé before submitting."); return; }
    const extension = resume.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_EXTENSIONS.includes(extension) || resume.size > MAX_FILE_BYTES) { setStatus("error"); setMessage("Please upload a PDF, DOC or DOCX file no larger than 5 MB."); return; }
    if (value("consent") !== "true") {
      setStatus("error"); setMessage("Please confirm your agreement to the use of your profile for career consideration."); return;
    }
    submittingRef.current = true; setStatus("loading"); setMessage("");
    try {
      const response = await fetch("/api/careers", { method: "POST", body: formData });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We couldn’t submit your profile. Please try again.");
      setStatus("success"); setMessage(result.message || SUCCESS_MESSAGE); form.reset(); setFileName("");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "We couldn’t submit your profile. Please try again.");
    } finally { submittingRef.current = false; }
  }

  return (
    <form ref={formRef} className={styles.applicationForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.honeypot} aria-hidden="true"><label htmlFor="career-website">Website</label><input id="career-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className={styles.formGrid}>
        <Field label="Full Name" name="fullName" autoComplete="name" placeholder="Your full name" required />
        <Field label="Email Address" name="email" type="email" autoComplete="email" placeholder="An email address where we can reach you" required />
        <Field label="Phone Number" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" />
        <Field label="Current Location" name="location" autoComplete="address-level2" placeholder="City and country" required />
        <label className={styles.field}><span>Area or Opportunity of Interest</span><select name="role" defaultValue="" required><option value="" disabled>Select an area or opportunity type</option><option>General Application</option><option>AI Agents & Automation</option><option>Web & Backend Development</option><option>Mobile App Development</option><option>Cloud & DevOps</option><option>Cybersecurity</option><option>Salesforce & CRM</option><option>IoT & Embedded Development</option><option>Technical Support</option><option>Internship</option><option>Freelance / Contract</option></select></label>
        <Field label="Relevant Experience" name="experience" placeholder="For example: Fresher, 6 months, or 2 years" required />
        <Field label="Current Company" name="currentCompany" autoComplete="organization" placeholder="If applicable" />
        <Field label="LinkedIn Profile (optional)" name="linkedin" type="url" placeholder="linkedin.com/in/yourname" />
        <Field className={styles.fullField} label="Portfolio / GitHub (optional)" name="portfolio" type="url" placeholder="github.com/yourname or your portfolio URL" />
        <label className={`${styles.field} ${styles.fullField}`}><span>About Your Experience & Interests</span><textarea name="coverMessage" rows={5} minLength={30} maxLength={3000} required placeholder="Tell us about relevant skills or projects, your contribution, and the work you want to pursue." /></label>
        <p className={`${styles.fieldHelper} ${styles.fullField}`}>For internship or contract interest, include your technical area in the message.</p>
        <label className={`${styles.uploadField} ${styles.fullField}`}>
          <input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")} />
          <Upload size={21} aria-hidden="true" /><span><strong>{fileName || "Upload Your Résumé"}</strong><small>PDF, DOC or DOCX · Maximum 5 MB</small></span>{fileName && <FileText size={20} aria-hidden="true" />}
        </label>
      </div>
      <label className={styles.consent}><input name="consent" type="checkbox" value="true" required /><span>I agree to Cantabridge Technologies using my profile to consider me for career opportunities, as described in the <Link href="/privacy-policy">Privacy Policy</Link>.</span></label>
      <PrivacyAcknowledgment purpose="consider my career application" />
      <p className={styles.privacyNote}>Share only information relevant to your application.</p>
      <div className={styles.submitRow}><button type="submit" className="site-button" disabled={status === "loading"}>{status === "loading" ? <><LoaderCircle className={styles.spinner} size={19} /> Submitting…</> : <>Submit Your Profile <ArrowRight size={18} /></>}</button></div>
      {message && <div className={status === "success" ? styles.formSuccess : styles.formError} role={status === "error" ? "alert" : "status"} aria-live="polite">{status === "success" && <CheckCircle2 size={20} aria-hidden="true" />}<span>{status === "success" && <strong>Thank You for Sharing Your Profile</strong>}{message}</span></div>}
    </form>
  );
}

function Field({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return <label className={`${styles.field} ${className}`}><span>{label}</span><input maxLength={200} {...props} /></label>;
}
