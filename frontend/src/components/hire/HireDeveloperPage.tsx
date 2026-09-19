"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  CheckCircle2,
  CloudCog,
  Code2,
  Cpu,
  Layers3,
  Smartphone,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./HireDeveloperPage.module.css";
import { PrivacyAcknowledgment } from "@/components/common/PrivacyAcknowledgment";
import { hasPrivacyAcknowledgment, PRIVACY_ACKNOWLEDGMENT_ERROR } from "@/lib/privacy";

const expertise = [
  { title: "Frontend Development", description: "Responsive, accessible interfaces for websites, web applications, and internal platforms.", icon: Code2 },
  { title: "Backend Development", description: "APIs, integrations, databases, and server-side systems designed around your application needs.", icon: Braces },
  { title: "Full-Stack Development", description: "End-to-end application development across user interfaces, business logic, and data layers.", icon: Layers3 },
  { title: "Mobile App Development", description: "Purpose-built mobile experiences for iOS, Android, and cross-platform requirements.", icon: Smartphone },
  { title: "AI Agents & Automation", description: "AI-assisted workflows and agents that connect tools, information, and repeatable business tasks.", icon: Bot },
  { title: "Salesforce Development", description: "Salesforce configuration, customization, integrations, and workflow implementation.", icon: CloudCog },
  { title: "IoT & Embedded Development", description: "Connected-device software, embedded workflows, data exchange, and operational interfaces.", icon: Cpu },
  { title: "Cloud & DevOps", description: "Cloud infrastructure, deployment workflows, observability, and reliable application operations.", icon: CloudCog },
] as const;

const engagementPaths = [
  ["01", "A dedicated developer", "Add focused development capacity for a defined period, aligned to the skills and working pattern your project needs."],
  ["02", "Support for your existing team", "Bring in additional technical capability to help your current team move a project or workstream forward."],
  ["03", "A defined project", "Engage development support around a clear scope, outcome, and delivery plan."],
] as const;

const process = [
  ["01", "Share your requirements", "Tell us the skills you need, what you are building, and the context around the work."],
  ["02", "Discuss skills and project fit", "We review the brief with you and clarify the technical and working requirements."],
  ["03", "Agree scope and engagement", "Availability, responsibilities, working hours, duration, and commercial terms are discussed."],
  ["04", "Begin onboarding", "Once the engagement is agreed, we coordinate access, communication, and a practical start."],
] as const;

const expertiseOptions = [...expertise.map(({ title }) => title), "Not Sure Yet"];
const countOptions = ["1 developer", "2 developers", "3–5 developers", "6+ developers", "Not Sure Yet"];
const engagementOptions = ["Dedicated developer", "Additional team support", "Defined project", "Not Sure Yet"];
const durationOptions = ["Less than 3 months", "3–6 months", "6–12 months", "More than 12 months", "Not Sure Yet"];

type FormStatus = "idle" | "submitting" | "success" | "error";

const reveal = (reducedMotion: boolean | null, delay = 0) => ({
  initial: reducedMotion ? false as const : { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function HireDeveloperPage() {
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
      if (!hasPrivacyAcknowledgment(payload.privacyAcknowledged)) {
        setStatus("error"); setErrorMessage(PRIVACY_ACKNOWLEDGMENT_ERROR); return;
      }
      const response = await fetch("/api/hire-developer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send your hiring enquiry.");
      formRef.current?.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your hiring enquiry. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="hire-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.frameTopline} aria-hidden="true">
            <span>Cantabridge Technologies</span><span>Hire a Developer</span>
          </div>
          <div className={styles.heroContent}>
            <motion.p className={`${styles.eyebrow} section-eyebrow`} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.7 }}>
              Extend your development capability
            </motion.p>
            <motion.h1 id="hire-title" className="brand-display-heading" initial={reducedMotion ? false : { opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}>
              Hire Developers for Your <span>Next Project.</span>
            </motion.h1>
            <motion.div className={styles.heroAside} initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.34 }}>
              <p>Tell us the skills you need, what you’re building, and how you want to work. We’ll review your requirements and discuss a suitable engagement.</p>
              <a className="site-button" href="#hiring-enquiry">Share Your Requirements <ArrowDown aria-hidden="true" /></a>
            </motion.div>
            <motion.div className={styles.heroFoot} initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.65 }}>
              <span><Check aria-hidden="true" /> Requirements reviewed by our team</span>
              <span><Check aria-hidden="true" /> Engagement shaped around your project</span>
              <span><Check aria-hidden="true" /> Clear discussion before onboarding</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.expertise} aria-labelledby="expertise-title">
        <div className={styles.sectionIntro}>
          <motion.div {...reveal(reducedMotion)}><p className={`${styles.eyebrow} section-eyebrow`}>Development expertise</p><h2 id="expertise-title" className="brand-section-heading">The skills your project needs.</h2></motion.div>
          <motion.p {...reveal(reducedMotion, 0.08)}>Explore the development capabilities available for new builds, existing products, connected systems, and ongoing technical work.</motion.p>
        </div>
        <div className={styles.expertiseGrid}>
          {expertise.map(({ title, description, icon: Icon }, index) => (
            <motion.article className={styles.expertiseCard} key={title} {...reveal(reducedMotion, (index % 4) * 0.06)}>
              <div className={styles.cardTop}><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /></div>
              <h3>{title}</h3><p>{description}</p>
              <ArrowRight className={styles.cardArrow} aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.engagement} aria-labelledby="engagement-title">
        <div className={styles.engagementInner}>
          <motion.div className={styles.engagementHeading} {...reveal(reducedMotion)}>
            <p className={`${styles.eyebrow} section-eyebrow section-eyebrow-light`}>Engagement requirements</p>
            <h2 id="engagement-title" className="brand-section-heading">Built around the way you need to work.</h2>
            <p>Availability, scope, working hours, and commercial terms are discussed after we review your enquiry.</p>
          </motion.div>
          <div className={styles.engagementCards}>
            {engagementPaths.map(([number, title, description], index) => (
              <motion.article key={number} {...reveal(reducedMotion, index * 0.08)}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.processSection} aria-labelledby="process-title">
        <div className={styles.processIntro}>
          <motion.div {...reveal(reducedMotion)}><p className={`${styles.eyebrow} section-eyebrow`}>How it works</p><h2 id="process-title" className="brand-section-heading">A clear path from brief to onboarding.</h2></motion.div>
          <motion.p {...reveal(reducedMotion, 0.08)}>Each conversation starts with your requirements. From there, we clarify the fit and shape the engagement together.</motion.p>
        </div>
        <div className={styles.processGrid}>
          {process.map(([number, title, description], index) => (
            <motion.article key={number} {...reveal(reducedMotion, index * 0.08)}>
              <div className={styles.processMarker}><span>{number}</span>{index < process.length - 1 ? <i aria-hidden="true" /> : null}</div>
              <h3>{title}</h3><p>{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.enquirySection} id="hiring-enquiry" aria-labelledby="enquiry-title">
        <motion.div className={styles.enquiryIntro} {...reveal(reducedMotion)}>
          <p className={`${styles.eyebrow} section-eyebrow`}>Hiring enquiry</p>
          <h2 id="enquiry-title" className="brand-section-heading">Tell Us Who You Need.</h2>
          <p>Share as much context as you have. If some details are still taking shape, select “Not Sure Yet” and we can discuss them with you.</p>
          <div className={styles.enquiryNote}><span>What happens next</span><p>We review the skills, scope, working pattern, and timing before contacting you to discuss a suitable next step.</p></div>
        </motion.div>

        <motion.div className={styles.formCard} {...reveal(reducedMotion, 0.08)}>
          {status === "success" ? (
            <div className={styles.success} role="status" aria-live="polite">
              <CheckCircle2 aria-hidden="true" /><p className={styles.formLabel}>Enquiry received</p>
              <h2>Thank you. Your requirements are with our team.</h2>
              <p>We’ll review the details and contact you to discuss the skills and engagement you need.</p>
              <button type="button" className="site-button" onClick={() => setStatus("idle")}>Send another enquiry</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate={false}>
              <div className={styles.formHeader}>
                <div><p className={styles.formLabel}>Project requirements</p><h2>Start with the essentials.</h2></div>
                <p>Fields marked * are required</p>
              </div>
              <div className={styles.honeypot} aria-hidden="true"><label htmlFor="hire-website">Website</label><input id="hire-website" name="website" tabIndex={-1} autoComplete="off" /></div>
              <div className={styles.formGrid}>
                <Field label="Contact name *" htmlFor="hire-name"><input id="hire-name" name="contactName" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name" /></Field>
                <Field label="Company name *" htmlFor="hire-company"><input id="hire-company" name="companyName" required minLength={2} maxLength={120} autoComplete="organization" placeholder="Company name" /></Field>
                <Field label="Work email *" htmlFor="hire-email"><input id="hire-email" name="workEmail" type="email" required maxLength={160} autoComplete="email" placeholder="name@company.com" /></Field>
                <Field label="Phone number" htmlFor="hire-phone"><input id="hire-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="Optional" /></Field>
                <Field label="Developer expertise *" htmlFor="hire-expertise"><select id="hire-expertise" name="expertise" required defaultValue=""><option value="" disabled>Select expertise</option>{expertiseOptions.map((item) => <option key={item}>{item}</option>)}</select></Field>
                <Field label="Number of developers *" htmlFor="hire-count"><select id="hire-count" name="developerCount" required defaultValue=""><option value="" disabled>Select team size</option>{countOptions.map((item) => <option key={item}>{item}</option>)}</select></Field>
                <Field label="Engagement type *" htmlFor="hire-engagement"><select id="hire-engagement" name="engagementType" required defaultValue=""><option value="" disabled>Select engagement</option>{engagementOptions.map((item) => <option key={item}>{item}</option>)}</select></Field>
                <Field label="Expected duration *" htmlFor="hire-duration"><select id="hire-duration" name="duration" required defaultValue=""><option value="" disabled>Select duration</option>{durationOptions.map((item) => <option key={item}>{item}</option>)}</select></Field>
                <Field label="Preferred start date *" htmlFor="hire-start"><input id="hire-start" name="startDate" required maxLength={100} placeholder="For example: October 2026 or Not Sure Yet" /></Field>
                <Field label="Budget range" htmlFor="hire-budget"><input id="hire-budget" name="budgetRange" maxLength={100} placeholder="Optional — add a range or Not Sure Yet" /></Field>
                <Field label="Timezone / working-hour overlap *" htmlFor="hire-timezone" full><input id="hire-timezone" name="timezoneOverlap" required minLength={2} maxLength={160} placeholder="Your timezone and preferred hours, or Not Sure Yet" /></Field>
                <Field label="Project requirements *" htmlFor="hire-requirements" full><textarea id="hire-requirements" name="requirements" required minLength={30} maxLength={5000} rows={7} placeholder="Describe what you’re building, the skills involved, current project stage, responsibilities, and any important technical context." /></Field>
              </div>
              <PrivacyAcknowledgment />
              {status === "error" ? <p className={styles.error} role="alert">{errorMessage}</p> : null}
              <div className={styles.submitRow}>
                <p>By submitting, you agree that we may use your details to review and respond to this enquiry. Read our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
                <button type="submit" className="site-button" disabled={status === "submitting"}>{status === "submitting" ? "Sending enquiry…" : "Send Hiring Enquiry"}<ArrowUpRight aria-hidden="true" /></button>
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
