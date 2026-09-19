"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { Service } from "@/types/service";
import { services } from "@/data/services";
import styles from "./ServiceDetailPage.module.css";

const servicePhotography: Record<string, readonly { src: string; alt: string }[]> = {
  "ai-machine-learning": [
    { src: "/images/services/ai-agent/01-lead-qualification-follow-up-agent-optimized.webp", alt: "Lead qualification and follow-up AI agent illustration" },
    { src: "/images/services/ai-agent/02-customer-support-agent-optimized.webp", alt: "Customer support AI agent illustration" },
    { src: "/images/services/ai-agent/03-voice-reception-appointment-agent-optimized.webp", alt: "Voice reception and appointment AI agent illustration" },
    { src: "/images/services/ai-agent/04-document-processing-agent-optimized.webp", alt: "Document processing AI agent illustration" },
    { src: "/images/services/ai-agent/05-internal-knowledge-assistant-optimized.webp", alt: "Internal knowledge AI assistant illustration" },
    { src: "/images/services/ai-agent/06-email-operations-agent.webp", alt: "Email operations AI agent illustration" },
    { src: "/images/services/ai-agent/07-proposal-rfp-assistant.webp", alt: "Proposal and RFP AI assistant illustration" },
    { src: "/images/services/ai-agent/08-business-reporting-assistant.webp", alt: "Business reporting AI assistant illustration" },
  ],
  "claude-solutions": [
    { src: "/images/services/ai-machine-learning-2.jpg", alt: "Robotic system representing an intelligent Claude-powered workflow" },
    { src: "/images/services/web-application-development-1.jpg", alt: "Professional using an intelligent assistant during a digital workflow" },
  ],
  "iot-solutions": [
    { src: "/images/services/iot-solutions/01-smart-switches-remote-control-optimized.webp", alt: "Smart switches and remote control illustration" },
    { src: "/images/services/iot-solutions/02-automatic-water-pump-control-optimized.webp", alt: "Automatic water pump control illustration" },
    { src: "/images/services/iot-solutions/03-home-automation-optimized.webp", alt: "Home automation illustration" },
    { src: "/images/services/iot-solutions/04-office-automation-optimized.webp", alt: "Office automation illustration" },
    { src: "/images/services/iot-solutions/05-motion-based-lighting-optimized.webp", alt: "Motion-based lighting illustration" },
    { src: "/images/services/iot-solutions/06-automatic-fan-ventilation-control-optimized.webp", alt: "Automatic fan and ventilation control illustration" },
    { src: "/images/services/iot-solutions/07-building-common-area-automation-optimized.webp", alt: "Building and common-area automation illustration" },
    { src: "/images/services/iot-solutions/08-timers-scheduled-device-operation-optimized.webp", alt: "Timers and scheduled device operation illustration" },
  ],
  cybersecurity: [
    { src: "/images/services/cyber-security/01-website-application-security-review-optimized.webp", alt: "Website and application security review illustration" },
    { src: "/images/services/cyber-security/02-cloud-configuration-review-optimized.webp", alt: "Cloud configuration review illustration" },
    { src: "/images/services/cyber-security/03-user-administrator-access-review-optimized.webp", alt: "User and administrator access review illustration" },
    { src: "/images/services/cyber-security/04-firewall-network-access-configuration-optimized.webp", alt: "Firewall and network access configuration illustration" },
    { src: "/images/services/cyber-security/05-api-access-data-handling-review-optimized.webp", alt: "API access and data handling review illustration" },
    { src: "/images/services/cyber-security/06-security-logs-alert-setup-optimized.webp", alt: "Security logs and alert setup illustration" },
    { src: "/images/services/cyber-security/07-server-hardening-certificate-management-optimized.webp", alt: "Server hardening and certificate management illustration" },
    { src: "/images/services/cyber-security/08-incident-preparation-recovery-planning-optimized.webp", alt: "Incident preparation and recovery planning illustration" },
  ],
  "salesforce-crm": [
    { src: "/images/services/salesforce-crm/01-lead-opportunity-management-optimized.webp", alt: "Lead and opportunity management illustration" },
    { src: "/images/services/salesforce-crm/02-customer-support-case-routing-optimized.webp", alt: "Customer support and case routing illustration" },
    { src: "/images/services/salesforce-crm/03-approval-workflows-optimized.webp", alt: "Approval workflows illustration" },
    { src: "/images/services/salesforce-crm/04-follow-ups-customer-updates-optimized.webp", alt: "Follow-ups and customer updates illustration" },
    { src: "/images/services/salesforce-crm/05-pipeline-service-dashboards-optimized.webp", alt: "Pipeline and service dashboards illustration" },
    { src: "/images/services/salesforce-crm/06-support-knowledge-management-optimized.webp", alt: "Support knowledge management illustration" },
    { src: "/images/services/salesforce-crm/07-crm-data-cleanup-migration-optimized.webp", alt: "CRM data cleanup and migration illustration" },
    { src: "/images/services/salesforce-crm/08-website-business-software-integration-optimized.webp", alt: "Website and business software integration illustration" },
  ],
  "web-application-development": [
    { src: "/images/services/web-dev/01-business-corporate-websites-optimized.webp", alt: "Business and corporate websites illustration" },
    { src: "/images/services/web-dev/02-custom-business-applications-optimized.webp", alt: "Custom business applications illustration" },
    { src: "/images/services/web-dev/03-customer-partner-portals-optimized.webp", alt: "Customer and partner portals illustration" },
    { src: "/images/services/web-dev/04-e-commerce-websites-optimized.webp", alt: "E-commerce websites illustration" },
    { src: "/images/services/web-dev/05-admin-panels-operational-dashboards-optimized.webp", alt: "Admin panels and operational dashboards illustration" },
    { src: "/images/services/web-dev/06-booking-appointment-systems-optimized.webp", alt: "Booking and appointment systems illustration" },
    { src: "/images/services/web-dev/07-learning-course-platforms-optimized.webp", alt: "Learning and course platforms illustration" },
    { src: "/images/services/web-dev/08-workflow-approval-systems-optimized.webp", alt: "Workflow and approval systems illustration" },
  ],
  "mobile-application-development": [
    { src: "/images/services/app-dev/01-customer-service-apps-optimized.webp", alt: "Customer service apps illustration" },
    { src: "/images/services/app-dev/02-e-commerce-apps-optimized.webp", alt: "E-commerce apps illustration" },
    { src: "/images/services/app-dev/03-field-service-apps-optimized.webp", alt: "Field service apps illustration" },
    { src: "/images/services/app-dev/04-delivery-logistics-apps-optimized.webp", alt: "Delivery and logistics apps illustration" },
    { src: "/images/services/app-dev/05-sales-crm-apps-optimized.webp", alt: "Sales and CRM apps illustration" },
    { src: "/images/services/app-dev/06-learning-course-apps-optimized.webp", alt: "Learning and course apps illustration" },
    { src: "/images/services/app-dev/07-iot-monitoring-control-apps-optimized.webp", alt: "IoT monitoring and control apps illustration" },
    { src: "/images/services/app-dev/03-field-service-apps-optimized.webp", alt: "Mobile task workflows illustration" },
  ],
  "cloud-computing": [
    { src: "/images/services/cloud-services/01-website-application-hosting-optimized.webp", alt: "Website and application hosting illustration" },
    { src: "/images/services/cloud-services/02-application-data-migration-optimized.webp", alt: "Application and data migration illustration" },
    { src: "/images/services/cloud-services/03-mobile-iot-api-backend-hosting-optimized.webp", alt: "Mobile, IoT, and API backend hosting illustration" },
    { src: "/images/services/cloud-services/04-backups-restore-checks-optimized.webp", alt: "Backups and restore checks illustration" },
    { src: "/images/services/cloud-services/05-server-access-configuration-optimized.webp", alt: "Server access and configuration illustration" },
    { src: "/images/services/cloud-services/06-resource-usage-cost-reviews-optimized.webp", alt: "Resource usage and cost reviews illustration" },
    { src: "/images/services/cloud-services/07-application-monitoring-alerts-optimized.webp", alt: "Application monitoring and alerts illustration" },
    { src: "/images/services/cloud-services/08-development-staging-environments-optimized.webp", alt: "Development and staging environments illustration" },
  ],
  "it-infrastructure-services": [
    { src: "/images/services/it-infrastructure-services-1.jpg", alt: "Technology team operating software delivery environments" },
    { src: "/images/services/it-infrastructure-services-2.jpg", alt: "Engineer working with deployment code on a laptop" },
  ],
  "technical-support": [
    { src: "/images/services/technical-support-1.jpg", alt: "Technical support team assisting customers from a modern office" },
    { src: "/images/services/technical-support-2.jpg", alt: "Support specialist resolving a request with her team" },
  ],
};

const serviceHeroPhrases: Record<string, { main: string; accent: string }> = {
  "ai-machine-learning": { main: "AI Agents &", accent: "Automation" },
  "claude-solutions": { main: "Claude", accent: "Solutions" },
  "iot-solutions": { main: "IoT", accent: "Solutions" },
  cybersecurity: { main: "Cyber", accent: "security" },
  "salesforce-crm": { main: "Salesforce", accent: "CRM" },
  "web-application-development": { main: "Web", accent: "Development" },
  "mobile-application-development": { main: "Mobile App", accent: "Development" },
  "cloud-computing": { main: "Cloud", accent: "Services" },
  "it-infrastructure-services": { main: "IT Infrastructure", accent: "& DevOps" },
  "technical-support": { main: "Technical", accent: "Support" },
};

function TypewriterText({ text, start, speed, reducedMotion }: { text: string; start: number; speed: number; reducedMotion: boolean | null }) {
  return <span className={styles.typewriterText} aria-hidden="true">{Array.from(text).map((character, index) => (
    <motion.span
      className={styles.typedCharacter}
      key={`${character}-${index}`}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : .01, delay: reducedMotion ? 0 : start + index * speed }}
    >{character === " " ? "\u00A0" : character}</motion.span>
  ))}</span>;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

export function ServiceDetailPage({ service }: { service: Service }) {
  const reduced = useReducedMotion();
  const detail = service.detailCopy;
  const start = service.order % services.length;
  const related = detail?.related
    ? detail.related.map((item) => ({ ...services.find((serviceItem) => serviceItem.slug === item.slug)!, ...item }))
    : [0, 1, 2].map((offset) => ({ ...services[(start + offset) % services.length], description: "" }));
  const capabilities = detail?.capabilities ?? service.features?.map((title) => ({ title, description: "" }));
  const useCases = detail?.useCases ?? service.useCases?.map((title) => ({ title, description: "", meta: "" }));
  const architecture = detail?.architecture ?? service.architecture?.map((title) => ({ title, description: "" }));
  const outcomes = detail?.outcomes ?? service.benefits?.map((title) => ({ title, description: "" }));
  const process = detail?.process ?? service.process?.map((title) => ({ title, description: "" }));
  const heroPhrases = serviceHeroPhrases[service.slug] ?? { main: service.title, accent: "Solutions" };
  const titleWords = heroPhrases.main.split(" ");
  const motionDirection = service.order % 2 === 0 ? -1 : 1;
  const photography = servicePhotography[service.slug];

  return <main className={`${styles.page} ${styles[`variant${service.order}`]}`}>
    <div className={styles.heroTransition}>
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.serviceHeroTopline}>
          <motion.p
            className={styles.serviceEyebrow}
            initial={reduced ? false : { opacity: 0, letterSpacing: ".3em" }}
            animate={{ opacity: 1, letterSpacing: ".16em" }}
            transition={{ duration: reduced ? 0 : .7, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Cantabridge service ${String(service.order).padStart(2, "0")}`}
          >
            <TypewriterText text={detail?.heroServiceLabel ?? `Cantabridge service / ${String(service.order).padStart(2, "0")}`} start={.06} speed={.024} reducedMotion={reduced} />
          </motion.p>
          <motion.div initial={reduced ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: .3 }}>
            <Link href="/services" className={styles.serviceBack}><span aria-hidden="true">←</span> All Services</Link>
          </motion.div>
        </div>

        <div className={styles.serviceHeroComposition}>
          <motion.h1
            className={`brand-display-heading ${styles.serviceHeroTitle} ${service.title.length > 18 ? styles.longServiceTitle : ""}`}
            aria-label={service.title}
            initial={reduced ? false : { x: 18 * motionDirection }}
            animate={{ x: 0 }}
            transition={{ duration: reduced ? 0 : .95, delay: .36, ease: [0.16, 1, 0.3, 1] }}
          >
            {titleWords.map((word, index) => (
              <span className={styles.serviceWordClip} key={`${word}-${index}`}>
                <motion.span
                  aria-hidden="true"
                  initial={reduced ? false : { opacity: 0, y: "105%", scale: .98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: reduced ? 0 : .78, delay: reduced ? 0 : .44 + index * .11, ease: [0.16, 1, 0.3, 1] }}
                >{word}</motion.span>
              </span>
            ))}
            <motion.span
              className={styles.serviceAccentPhrase}
              initial={reduced ? false : { opacity: 0, x: -24 * motionDirection, y: 18, scale: .97 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: reduced ? 0 : .9, delay: reduced ? 0 : .78 + (service.order % 3) * .04, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >{heroPhrases.accent}</motion.span>
          </motion.h1>

          <motion.div className={styles.serviceHeroSupport} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .72, delay: reduced ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}>
            <p>{service.shortDescription}</p>
            <Link href={detail?.heroCtaHref ?? "/contact"} className={`${styles.button} site-button`}>{detail?.heroCta ?? "Discuss your requirements"} <span aria-hidden="true">↗</span></Link>
          </motion.div>
        </div>
      </div>
      <motion.div className={styles.heroRule} aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.15, delay: .2, ease: [0.22, 1, 0.36, 1] }} />
    </section>

    <section className={styles.statement}><Reveal><p className={`${styles.eyebrow} section-eyebrow`}>Our Perspective</p><div className={styles.statementContent}><h2>{service.statement}</h2>{detail?.perspectiveParagraphs && <div className={styles.perspectiveCopy}>{detail.perspectiveParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>}</div></Reveal></section>
    </div>

    <section className={styles.capabilities}><div className={styles.capabilityLayout}>
      <div className={styles.stickyCopy}><p className={`${styles.eyebrow} section-eyebrow`}>What We Deliver</p><h2 className="brand-section-heading">{detail?.deliverablesHeading ?? "Capability across the full solution."}</h2><p>{service.description}</p></div>
      <div><div className={styles.capabilityList}>{capabilities?.map((item, index) => <Reveal className={styles.capabilityItem} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div><ArrowUpRight aria-hidden="true" /></Reveal>)}</div>{detail?.projectExamples && <Reveal className={styles.projectExamples}><h3>{detail.projectExamples.heading}</h3><p>{detail.projectExamples.description}</p><div className={styles.capabilityList}>{detail.projectExamples.items.map((item, index) => <div className={styles.capabilityItem} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight aria-hidden="true" /></div>)}</div></Reveal>}</div>
    </div></section>

    <section className={styles.useCases}>
      <Reveal className={styles.sectionLead}><p className={`${styles.eyebrow} section-eyebrow`}>{detail?.useCasesLabel ?? "Where it creates value"}</p><div><h2 className="brand-section-heading">{detail?.useCasesHeading ?? "Business use cases, made tangible."}</h2>{detail?.useCasesIntro && <p className={styles.sectionDescription}>{detail.useCasesIntro}</p>}</div></Reveal>
      <div className={styles.editorialGrid}>{useCases?.map((item, index) => {
        const photo = photography[index % photography.length];
        return <Reveal className={`${styles.casePanel} ${styles[`casePanel${(index % 4) + 1}`]}`} delay={(index % 4) * 0.04} key={item.title}><div className={styles.caseGraphic}><Image src={photo.src} alt={index < photography.length ? photo.alt : ""} fill sizes="(max-width: 500px) 100vw, (max-width: 1000px) 50vw, 25vw" quality={82} className={styles.caseImage} /><span>{String(index + 1).padStart(2, "0")}</span>{service.slug !== "ai-machine-learning" && service.slug !== "iot-solutions" && service.slug !== "salesforce-crm" && service.slug !== "mobile-application-development" && service.slug !== "cloud-computing" && service.slug !== "web-application-development" && service.slug !== "cybersecurity" && <small>Photography / Pexels</small>}</div><h3>{item.title}</h3>{item.description && <p className={styles.caseDescription}>{item.description}</p>}{item.meta && <p className={styles.caseMeta}>{item.meta}</p>}</Reveal>;
      })}</div>
      {detail?.customAgent && <Reveal className={styles.customAgent}><div className={styles.customAgentCopy}><h3>{detail.customAgent.heading}</h3><p>{detail.customAgent.description}</p></div><div className={styles.customAgentActions}><Link href={detail.customAgent.href ?? "/contact"} className="site-button">{detail.customAgent.buttonLabel} <ArrowUpRight aria-hidden="true" /></Link></div></Reveal>}
    </section>

    <section className={styles.architecture}>
      <Reveal className={styles.architectureLead}><p className={`${styles.eyebrow} section-eyebrow section-eyebrow-light`}>{detail?.architectureLabel ?? "Solution architecture"}</p><div><h2 className="brand-section-heading">{detail?.architectureHeading ?? "Connected from first input to useful outcome."}</h2>{detail?.architectureIntro && <p className={styles.sectionDescription}>{detail.architectureIntro}</p>}</div></Reveal>
      <div className={styles.flow}>{architecture?.map((item, index) => <Reveal className={styles.flowStep} delay={index * 0.06} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong>{item.description && <p>{item.description}</p>}</div>{index < (architecture?.length ?? 0) - 1 && <ArrowRight aria-hidden="true" />}</Reveal>)}</div>
    </section>

    <section className={styles.outcomes}>
      <Reveal className={styles.sectionLead}><p className={`${styles.eyebrow} section-eyebrow section-eyebrow-light`}>{detail?.outcomesLabel ?? "Business outcomes"}</p><div><h2 className="brand-section-heading">{detail?.outcomesHeading ?? "Technology with an operating purpose."}</h2>{detail?.outcomesIntro && <p className={styles.sectionDescription}>{detail.outcomesIntro}</p>}</div></Reveal>
      <div className={styles.outcomeList}>{outcomes?.map((item, index) => <Reveal className={styles.outcome} key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div></Reveal>)}</div>
    </section>

    <section className={styles.process}>
      <Reveal className={styles.sectionLead}><p className={`${styles.eyebrow} section-eyebrow`}>{detail?.processLabel ?? "How we work"}</p><div><h2 className="brand-section-heading">{detail?.processHeading ?? "A clear path from requirement to value."}</h2></div></Reveal>
      <div className={styles.timeline}>{process?.map((item, index) => <Reveal className={styles.processStep} delay={index * 0.05} key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><i /><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div></Reveal>)}</div>
    </section>

    {service.slug !== "ai-machine-learning" && <section className={styles.support}><Reveal className={styles.supportGrid}><div><p className={`${styles.eyebrow} section-eyebrow section-eyebrow-light`}>Implementation & Support</p><h2 className="brand-section-heading">{detail?.supportHeading ?? "Built to work beyond launch."}</h2></div><div><p>{service.support}</p>{detail?.supportAreas && <div className={styles.tags}>{detail.supportAreas.map((item) => <span key={item}><Check aria-hidden="true" />{item}</span>)}</div>}<div className={styles.tags}>{service.technologies?.map((item) => <span key={item}><Check aria-hidden="true" />{item}</span>)}</div></div></Reveal></section>}

    {!!service.faqs?.length && <section className={styles.faq}><div className={styles.faqLayout}><Reveal className={styles.faqLabel}><p className={`${styles.eyebrow} section-eyebrow`}>{detail?.faqLabel ?? "Frequently asked"}</p></Reveal><div className={styles.faqContent}><Reveal className={styles.faqHeading}><h2 className="brand-section-heading">{detail?.faqHeading ?? "Useful answers before we begin."}</h2></Reveal><div className={styles.faqList}>{service.faqs.map((item, index) => <details key={item.question}><summary><span>0{index + 1}</span><strong className={styles.faqQuestion}>{item.question}</strong><i /></summary><p>{item.answer}</p></details>)}</div></div></div></section>}

    <section className={styles.related}><Reveal className={styles.sectionLead}><p className={`${styles.eyebrow} section-eyebrow`}>{detail?.relatedLabel ?? "Connected capabilities"}</p><div><h2 className="brand-section-heading">{detail?.relatedHeading ?? "Build the complete solution."}</h2></div></Reveal><div className={styles.relatedList}>{related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span>{String(item.order).padStart(2, "0")}</span><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div><ArrowUpRight aria-hidden="true" /></Link>)}</div></section>

    <section className={styles.cta}><Reveal className={styles.ctaInner}><p className={`${styles.eyebrow} section-eyebrow section-eyebrow-light`}>{detail?.ctaLabel ?? "Start a conversation"}</p><h2 className="brand-section-heading">{detail?.ctaHeading ?? `Ready to explore ${service.title}?`}</h2><p>{detail?.ctaDescription ?? "Share your goals, current environment, and priorities. We’ll help identify a practical way forward."}</p><Link href={detail?.ctaHref ?? "/contact"} className={`${styles.ctaButton} site-button`}>{detail?.ctaButton ?? "Book a free consultation"} <ArrowUpRight aria-hidden="true" /></Link></Reveal></section>
  </main>;
}
