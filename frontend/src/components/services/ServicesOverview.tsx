"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { services } from "@/data/services";
import styles from "./ServicesOverview.module.css";

const agentDeliverables = ["AI Agent Strategy", "Custom AI Agent Development", "Claude-Powered Business Assistants", "Custom Claude Integrations", "Workflow Automation", "Knowledge-Based Agents", "Business System Integration", "Deployment, Monitoring & Optimization"];
const delivery = [
  ["01", "Discover", "Understand goals, challenges, users, systems, and constraints."],
  ["02", "Plan", "Define scope, architecture, technology, timeline, and execution strategy."],
  ["03", "Design", "Create solution structure, UX, workflows, and technical architecture."],
  ["04", "Build", "Develop with structured implementation and clear communication."],
  ["05", "Test", "Validate functionality, performance, security, and reliability."],
  ["06", "Deploy", "Prepare production infrastructure and release safely."],
  ["07", "Support & Improve", "Monitor, maintain, optimize, and scale as requirements evolve."],
] as const;
const outcomes = ["Improved operational efficiency", "Reduced manual work", "Better system visibility", "Stronger security", "Faster workflows", "Scalable digital infrastructure", "Improved customer experience", "Better decision-making", "Long-term technical reliability"];
const engagements = ["Fixed Scope Projects", "Dedicated Development Support", "Technology Consulting", "Ongoing Maintenance & Support", "Flexible Collaboration", "Custom Engagement"];
const platforms = ["AI / ML", "Agentic AI", "React", "Next.js", "Node.js", "Python", "MongoDB", "SQL", "Salesforce", "AWS", "Docker", "Linux", "MQTT", "REST APIs", "Cloud Infrastructure", "Monitoring & Security"];
const reasons = ["Business-first approach", "End-to-end support", "Flexible execution", "Practical technology selection", "Secure and scalable architecture", "Transparent communication", "Long-term technical support"];
const serviceCoverImages: Record<string, string> = {
  "ai-machine-learning": "/images/services/ai-agent/01-lead-qualification-follow-up-agent-optimized.webp",
  "claude-solutions": "/images/services/ai-agent/02-customer-support-agent-optimized.webp",
  "iot-solutions": "/images/services/iot-solutions/01-smart-switches-remote-control-optimized.webp",
  "cybersecurity": "/images/services/cyber-security/01-website-application-security-review-optimized.webp",
  "salesforce-crm": "/images/services/salesforce-crm/01-lead-opportunity-management-optimized.webp",
  "web-application-development": "/images/services/web-dev/01-business-corporate-websites-optimized.webp",
  "mobile-application-development": "/images/services/app-dev/01-customer-service-apps-optimized.webp",
  "cloud-computing": "/images/services/cloud-services/01-website-application-hosting-optimized.webp",
};
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Heading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <div className={`${styles.heading} ${light ? styles.light : ""}`}><p className={`section-eyebrow ${light ? "section-eyebrow-light" : ""}`}>{eyebrow}</p><h2 className="brand-section-heading">{title}</h2></div>;
}

export function ServicesOverview() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <Reveal className={styles.heroCopy}>
            <p className={`${styles.eyebrow} section-eyebrow`}>What We Do</p>
            <h1 className="brand-display-heading">End-to-End Technology Services for Modern Businesses</h1>
            <p className={styles.heroText}>Explore technology solutions designed to improve efficiency, strengthen security, modernize operations, and support sustainable business growth.</p>
            <Link href="/contact" className={`${styles.primaryButton} site-button`}>Discuss Your Requirements <ArrowUpRight aria-hidden="true" /></Link>
          </Reveal>
          <Reveal className={styles.heroVisual} delay={0.08}><Image src="/images/services/ai-machine-learning-1.jpg" alt="Artificial intelligence network and robotic technology" fill priority sizes="(max-width: 900px) 100vw, 38vw" quality={84} className={styles.overviewImage} /><span>Business-ready services · Real-world delivery</span></Reveal>
        </div>
      </section>

      <section className={styles.featured}>
        <Reveal className={styles.featuredIntro}><span className={styles.featureNumber}>AI</span><Heading eyebrow="Featured AI Capabilities" title="Build Smart, Business-Focused AI and Automation Solutions" light /></Reveal>
        <div className={styles.featuredGrid}>
          <Reveal className={styles.agentStatement}><p>We help businesses create governed AI agents and practical assistants that retrieve internal knowledge, work with documents, connect systems, automate workflows, and support everyday decisions across operations.</p><Link href="/services/ai-machine-learning">Explore AI Agents & Automation <ArrowUpRight aria-hidden="true" /></Link></Reveal>
          <div className={styles.deliverableList}>{agentDeliverables.map((item, index) => <Reveal className={styles.deliverable} delay={(index % 4) * 0.04} key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</Reveal>)}</div>
        </div>
      </section>

      <section className={styles.catalog}>
        <Reveal><Heading eyebrow="Complete Technology Services" title="Expertise Across the Digital Lifecycle" /></Reveal>
        <div className={styles.serviceList}>
          {services.map((service, index) => (
            <Reveal className={styles.service} key={service.slug}>
              <div className={styles.serviceHeader}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3></div>
              <div className={styles.serviceBody}>
                <div className={styles.serviceImage}>
                  <Image
                    src={serviceCoverImages[service.slug] ?? "/images/services/ai-machine-learning-1.jpg"}
                    alt={`${service.title} professionals and technology`}
                    fill
                    sizes="(max-width: 720px) 100vw, 30vw"
                    quality={80}
                    className={styles.catalogImage}
                  />
                </div>
                <div className={styles.serviceCopy}><p>{service.shortDescription}</p><strong>Key outcomes</strong><ul>{service.benefits?.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div className={styles.serviceDeliverables}><strong>What we deliver</strong><ul>{service.features?.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul><Link href={`/services/${service.slug}`}>Explore service <ArrowUpRight aria-hidden="true" /></Link></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <Reveal><Heading eyebrow="Our Process" title="From Requirement to Reliable Delivery" /></Reveal>
        <div className={styles.processLine}>{delivery.map(([number, title, copy], index) => <Reveal className={styles.processStep} delay={index * 0.04} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </section>

      <section className={styles.outcomes}>
        <Reveal><Heading eyebrow="What You Gain" title="Technology That Creates Practical Business Value" light /></Reveal>
        <div className={styles.outcomeList}>{outcomes.map((item, index) => <Reveal className={styles.outcome} key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></Reveal>)}</div>
      </section>

      <section className={styles.engagements}>
        <Reveal><Heading eyebrow="Ways to Work Together" title="Engagements Shaped Around the Requirement" /></Reveal>
        <div className={styles.engagementGrid}>{engagements.map((item, index) => <Reveal className={styles.engagement} delay={(index % 3) * 0.05} key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3><p>Flexible collaboration aligned to your scope, team, delivery needs, and long-term priorities.</p></Reveal>)}</div>
      </section>

      <section className={styles.platforms}>
        <Reveal className={styles.platformGrid}><Heading eyebrow="Technologies & Platforms" title="A Practical, Modern Technology Stack" light /><div className={styles.platformList}>{platforms.map((item) => <span key={item}>{item}</span>)}</div></Reveal>
      </section>

      <section className={styles.why}>
        <Reveal><Heading eyebrow="Why Choose Us" title="Practical Technology. Dependable Delivery. Lasting Support." /></Reveal>
        <div className={styles.whyList}>{reasons.map((item, index) => <Reveal className={styles.whyItem} delay={(index % 3) * 0.04} key={item}><span><Check aria-hidden="true" /></span><h3>{item}</h3></Reveal>)}</div>
      </section>

      <section className={styles.cta}>
        <Reveal className={styles.ctaInner}><p className={`${styles.eyebrow} section-eyebrow section-eyebrow-light`}>Let&apos;s Work Together</p><h2 className="brand-section-heading">What Technology Challenge Are You Trying to Solve?</h2><p>Tell us what you want to build, automate, modernize, secure, integrate, or scale. We&apos;ll help you identify the right technical approach.</p><Link href="/contact" className={`${styles.secondaryButton} site-button`}>Discuss Your Requirements <ArrowUpRight aria-hidden="true" /></Link></Reveal>
      </section>
    </main>
  );
}
