"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CONTACT_PHONE_INPUT_PATTERN, validateContactPayload } from "@/lib/contact-validation";
import { PrivacyAcknowledgment } from "@/components/common/PrivacyAcknowledgment";

const services = [
  "AI Agents & Automation",
  "IoT Solutions",
  "Cybersecurity",
  "Salesforce CRM",
  "Web Development",
  "Mobile App Development",
  "Cloud Services",
  "Not Sure Yet",
  "Other",
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClass = "w-full border-0 border-b border-[#cfd5df] bg-transparent px-0 pb-3 pt-1 text-base text-[var(--brand-navy)] outline-none transition-colors placeholder:text-[#959da8] focus:border-[var(--brand-blue)] focus:ring-0";
const labelClass = "mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-gray)]";

export function GetInTouch() {
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

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
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

      if (!response.ok) throw new Error(result.message || "We couldn’t send your enquiry. Please try again or email contact@cantabridgetechnologies.com.");

      formRef.current?.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "We couldn’t send your enquiry. Please try again or email contact@cantabridgetechnologies.com.");
      setStatus("error");
    }
  }

  return (
    <section className="overflow-hidden bg-[#f6f8fb] py-24 sm:py-32 lg:py-40" aria-labelledby="get-in-touch-title">
      <Container className="max-w-[1240px] lg:px-10 xl:px-16">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-eyebrow justify-center">
              Get in Touch
            </div>
            <h2 id="get-in-touch-title" className="brand-section-heading mt-7 text-[var(--brand-navy)]">
              What Would You Like Your Technology to Do Better?
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[var(--brand-gray)]">
              Tell us what you want to build, improve, or connect. Share the tools you use, the problem you’re facing, and any timeline or budget you have in mind. We’ll use that context to discuss the next step.
            </p>
          </motion.div>

          <motion.div
            className="relative mx-auto mt-14 max-w-5xl border border-[#d8dde5] bg-white p-6 sm:p-10 lg:p-14"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute left-0 top-0 h-1 w-24 bg-[var(--brand-blue)]" aria-hidden="true" />
            {status === "success" ? (
              <div className="flex min-h-[440px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                <CheckCircle2 className="size-11 text-[var(--brand-blue)]" aria-hidden="true" />
                <h3 className="mt-7 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--brand-navy)] sm:text-4xl">
                  Thank You. We’ve Received Your Enquiry.
                </h3>
                <p className="mt-4 text-base leading-7 text-[var(--brand-gray)]">We’ll review your details and contact you using the information provided.</p>
                <button type="button" onClick={() => setStatus("idle")} className="site-button mt-8">
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="formType" value="enquiry" />
                <input ref={setStartedAtInput} type="hidden" name="startedAt" />
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-form-guard">Leave this field blank</label>
                  <input id="contact-form-guard" name="formGuard" type="text" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" data-bwignore="true" />
                </div>

                <div className="mb-10 flex items-end justify-between gap-6 border-b border-[#e0e4ea] pb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">Project Enquiry</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[var(--brand-navy)] sm:text-3xl">Tell Us About Your Requirement</h3>
                  </div>
                  <span className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-gray)] sm:block">An outline is enough to start the conversation.</span>
                </div>

                <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>Full Name</label>
                    <input id="contact-name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>Email Address</label>
                    <input id="contact-email" name="email" type="email" required maxLength={160} autoComplete="email" className={fieldClass} placeholder="Where we can reach you" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>Phone Number</label>
                    <input id="contact-phone" name="phone" type="tel" minLength={7} maxLength={30} pattern={CONTACT_PHONE_INPUT_PATTERN} autoComplete="tel" className={fieldClass} placeholder="Your phone number" />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className={labelClass}>Company / Organization</label>
                    <input id="contact-company" name="company" type="text" maxLength={120} autoComplete="organization" className={fieldClass} placeholder="Your company or organization" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-service" className={labelClass}>Service Interested In</label>
                    <select id="contact-service" name="service" defaultValue="" className={fieldClass}>
                      <option value="" disabled>Select a service</option>
                      {services.map((service) => <option key={service} value={service}>{service}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className={labelClass}>Project Details</label>
                    <textarea id="contact-message" name="message" required minLength={20} maxLength={4000} rows={5} className={`${fieldClass} resize-y`} placeholder="What would you like to build or improve? Include your current tools and any timeline or budget, if known." />
                  </div>
                </div>

                <PrivacyAcknowledgment />
                {status === "error" && (
                  <p className="mt-6 border-l-2 border-red-600 pl-4 text-sm leading-6 text-red-700" role="alert">{errorMessage}</p>
                )}

                <div className="mt-8 flex flex-col gap-5 border-t border-[#e0e4ea] pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-5 text-[var(--brand-gray)]">Read our <Link href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link> for details about how we handle your information.</p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="site-button group min-w-40 justify-between"
                  >
                    {status === "submitting" ? "Sending…" : "Send Enquiry"}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
      </Container>
    </section>
  );
}
