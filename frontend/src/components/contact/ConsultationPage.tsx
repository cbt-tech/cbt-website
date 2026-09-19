"use client";

import { useCallback, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./ConsultationPage.module.css";
import { CONTACT_PHONE_INPUT_PATTERN, validateContactPayload } from "@/lib/contact-validation";
import { PrivacyAcknowledgment } from "@/components/common/PrivacyAcknowledgment";

const services = [
  "AI & Machine Learning",
  "Claude Solutions",
  "IoT Solutions",
  "Cybersecurity",
  "Salesforce CRM",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Other",
] as const;

const expectations = [
  ["01", "We review your context", "Share the challenge, opportunity, or early-stage idea you want to discuss."],
  ["02", "You meet the right people", "We connect you with someone who understands the relevant technology and business context."],
  ["03", "You leave with clarity", "The conversation focuses on practical options, likely constraints, and a sensible next step."],
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ConsultationPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const setStartedAtInput = useCallback((input: HTMLInputElement | null) => {
    if (input) input.value = String(Date.now());
  }, []);
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setErrorMessage("");

    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const validation = validateContactPayload(payload);
    if (!validation.ok) {
      setErrorMessage(validation.message);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Contact-Form": "website" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to request your consultation.");
      formRef.current?.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to request your consultation. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="consultation-title">
        <div className={styles.heroInner}>
          <motion.p className={`${styles.eyebrow} section-eyebrow`} initial={reducedMotion ? false : { opacity: 0, letterSpacing: ".3em" }} animate={{ opacity: 1, letterSpacing: ".28em" }} transition={{ duration: reducedMotion ? 0 : .7 }}>
            Free technology consultation
          </motion.p>
          <div className={styles.heroGrid}>
            <motion.h1 id="consultation-title" className="brand-display-heading" initial={reducedMotion ? false : { opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .9, delay: .12, ease: [0.16, 1, 0.3, 1] }}>
              Start with a clear <span>conversation.</span>
            </motion.h1>
            <motion.div className={styles.heroAside} initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .75, delay: .42 }}>
              <p>Tell us what you’re trying to achieve. We’ll bring a practical perspective and help you identify the most useful next step.</p>
              <a href="#contact-form">Request a consultation <ArrowDown aria-hidden="true" /></a>
            </motion.div>
          </div>
          <motion.div className={styles.assurance} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: reducedMotion ? 0 : .72 }}>
            <span><Check aria-hidden="true" /> No obligation</span>
            <span><Check aria-hidden="true" /> Human review</span>
            <span><Check aria-hidden="true" /> Practical guidance</span>
          </motion.div>
        </div>
      </section>

      <section className={styles.booking} id="contact-form" aria-labelledby="booking-title">
        <div className={styles.bookingIntro}>
          <motion.p className={`${styles.eyebrow} section-eyebrow`} initial={reducedMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>What to expect</motion.p>
          <motion.h2 id="booking-title" className="brand-section-heading" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75 }}>
            A useful first conversation.
          </motion.h2>
          <div className={styles.expectations}>
            {expectations.map(([number, title, copy], index) => (
              <motion.article key={number} initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: reducedMotion ? 0 : index * .07 }}>
                <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div className={styles.formCard} initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .8 }}>
          {status === "success" ? (
            <div className={styles.success} role="status" aria-live="polite">
              <CheckCircle2 aria-hidden="true" />
              <p className={styles.formLabel}>Request received</p>
              <h2>Thank you. We’ll be in touch shortly.</h2>
              <p>Our team will review your brief and contact you to arrange the conversation.</p>
              <button type="button" className="site-button" onClick={() => setStatus("idle")}>Submit another request</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="formType" value="consultation" />
              <input ref={setStartedAtInput} type="hidden" name="startedAt" />
              <div className={styles.formHeader}>
                <div><p className={styles.formLabel}>Consultation request</p><h2>Tell us about your goals.</h2></div>
                <p>Usually replies within 1–2 business days</p>
              </div>
              <div className={styles.honeypot} aria-hidden="true"><label htmlFor="consultation-form-guard">Leave this field blank</label><input id="consultation-form-guard" name="formGuard" type="text" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-bwignore="true" /></div>
              <div className={styles.formGrid}>
                <Field label="Full name" htmlFor="consultation-name"><input id="consultation-name" name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name" /></Field>
                <Field label="Work email" htmlFor="consultation-email"><input id="consultation-email" name="email" type="email" required maxLength={160} autoComplete="email" placeholder="name@company.com" /></Field>
                <Field label="Phone number" htmlFor="consultation-phone"><input id="consultation-phone" name="phone" type="tel" minLength={7} maxLength={30} pattern={CONTACT_PHONE_INPUT_PATTERN} autoComplete="tel" placeholder="Optional" /></Field>
                <Field label="Company / organization" htmlFor="consultation-company"><input id="consultation-company" name="company" required maxLength={120} autoComplete="organization" placeholder="Company name" /></Field>
                <Field label="Area of interest" htmlFor="consultation-service" full><select id="consultation-service" name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option value={service} key={service}>{service}</option>)}</select></Field>
                <Field label="What would you like to discuss?" htmlFor="consultation-message" full><textarea id="consultation-message" name="message" required minLength={20} maxLength={4000} rows={6} placeholder="Describe the challenge, desired outcome, current environment, and any important timeline." /></Field>
              </div>
              <PrivacyAcknowledgment />
              {status === "error" ? <p className={styles.error} role="alert">{errorMessage}</p> : null}
              <div className={styles.submitRow}>
                <p>Your information is used only to review and respond to this request.</p>
                <button type="submit" className="site-button" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Request consultation"}<ArrowUpRight aria-hidden="true" /></button>
              </div>
            </form>
          )}
        </motion.div>
      </section>
    </main>
  );
}

function Field({ label, htmlFor, full = false, children }: { label: string; htmlFor: string; full?: boolean; children: ReactNode }) {
  return <label className={`${styles.field} ${full ? styles.fullField : ""}`} htmlFor={htmlFor}><span>{label}</span>{children}</label>;
}
