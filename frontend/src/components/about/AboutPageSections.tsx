"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, type MotionValue } from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import styles from "./AboutPageSections.module.css";

const approach = [
  ["01", "Understand Your Business", "Before recommending a solution, we look at the work it needs to support. We discuss your goals, review your existing processes, and identify where manual tasks, disconnected information, or technical limitations create difficulties. This helps us define a clear purpose for the project, whether it involves AI automation, a customer application, or connected equipment."],
  ["02", "Define the Right Solution", "We turn your requirements into a practical development plan, with clear priorities, deliverables, and milestones. The technology and scope are shaped around your budget, timeline, and existing systems. For AI solutions, we also identify which tasks can be automated and where human review or approval should remain part of the process."],
  ["03", "Build Around Your Operations", "Your solution needs to work alongside the tools and systems your business already uses. We plan the necessary connections between applications, customer records, devices, and data sources, then develop and test the agreed workflows. Reviews during development help us check that the solution supports the people who will use it."],
  ["04", "Prepare for Launch and Beyond", "We plan deployment, documentation, and handover so your team understands how to use and manage the solution. Maintenance, updates, and technical support are defined around your requirements. As your needs change, this foundation helps guide improvements, new integrations, and additional features."],
] as const;

const capabilities = [
  ["AI Agents & Automation", "Build custom AI agents to find business information, assist your team, and automate repetitive tasks across your tools.", "/services/ai-machine-learning"],
  ["IoT Solutions", "Connect equipment for remote monitoring, status alerts, and control, giving your team visibility into device operations.", "/services/iot-solutions"],
  ["Salesforce CRM", "Organize customer information, manage sales activities, and connect workflows so your team can track enquiries and follow-ups.", "/services/salesforce-crm"],
  ["Web Development", "Create websites, customer portals, and business applications that help people access your services and complete tasks online.", "/services/web-application-development"],
  ["Mobile App Development", "Build mobile applications that let customers and employees access services, manage tasks, and interact with connected devices.", "/services/mobile-application-development"],
  ["Cloud Services", "Set up and manage cloud environments for your applications, including migrations, backups, and resource planning.", "/services/cloud-computing"],
  ["Cybersecurity", "Identify security gaps and strengthen access controls and configurations across your applications, servers, and networks.", "/services/cybersecurity"],
] as const;
const reasons = [
  ["Your Business Goals First", "We understand your operations and challenges to build solutions that support the work your business needs to do."],
  ["Clear Scope and Priorities", "We agree on essential features, responsibilities, and timelines so you can plan your budget and future improvements."],
  ["Technology That Fits", "We recommend tools based on your requirements, existing systems, and maintenance needs."],
  ["Progress You Can Review", "Agreed milestones and working demonstrations keep you involved and give your feedback a place in development."],
  ["Integrations Planned Early", "We identify the data, permissions, and connections needed to work with your current applications and devices."],
  ["Support Beyond Launch", "We define documentation, handover, and support arrangements so you know how your solution will be maintained."],
] as const;
const process = [
  ["Discover", "Discuss the problem, users, existing systems, and desired outcome."],
  ["Plan", "Agree on deliverables, responsibilities, dependencies, and milestones."],
  ["Design", "Review the user journeys, interfaces, and technical structure needed for the build."],
  ["Develop", "Build the agreed features and review progress through working demonstrations."],
  ["Test", "Check the agreed workflows, integrations, and acceptance requirements."],
  ["Deploy", "Release to the agreed environment and provide the required handover information."],
  ["Support", "Handle maintenance and subsequent changes within the agreed support scope."],
] as const;
const industries = [
  ["Education & Training", "Course websites, enrollment journeys, and learner portals."],
  ["Retail & E-commerce", "Product browsing, online ordering, and customer account features."],
  ["Professional Services", "Client enquiries, document workflows, and internal knowledge access."],
  ["Manufacturing & Equipment Operations", "Equipment status dashboards, device alerts, and operational records."],
  ["Startups & Small Businesses", "A first product release, customer-facing website, or internal application."],
  ["Technology Businesses", "Application integrations, deployment workflows, and infrastructure improvements."],
  ["Other Organizations", "A workflow, application, or system requirement that needs a closer look."],
] as const;
const values = [
  ["Be Useful", "Judge an idea by the problem it helps solve and the work it helps people complete."],
  ["Be Clear", "Explain assumptions, limitations, costs, and changes in language the client can understand."],
  ["Take Responsibility", "Own the agreed work and raise issues early when a commitment is at risk."],
  ["Respect People and Information", "Consider the people using the system and handle access to business information with care."],
  ["Keep Learning", "Use feedback, testing, and experience to improve how we build and deliver."],
  ["Think Beyond Launch", "Consider how the solution will be maintained, handed over, and changed over time."],
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Heading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <div className={`${styles.heading} ${light ? styles.headingLight : ""}`}><p className={`section-eyebrow ${light ? "section-eyebrow-light" : ""}`}>{eyebrow}</p><h2 className="brand-section-heading">{title}</h2></div>;
}

function TimelineStep({ step, copy, index, progress, reduceMotion, nodeRef }: {
  step: string;
  copy: string;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
  nodeRef: (node: HTMLSpanElement | null) => void;
}) {
  const point = index / (process.length - 1);
  const arrivalPoint = point === 1 ? 0.995 : point;
  const [reached, setReached] = useState(false);

  useMotionValueEvent(progress, "change", (latest) => {
    const nextReached = latest >= arrivalPoint;
    setReached((current) => current === nextReached ? current : nextReached);
  });

  return (
    <article className={`${styles.timelineStep} ${reduceMotion || reached ? styles.timelineStepReached : ""}`}>
      <span ref={nodeRef} className={styles.timelineNode} aria-hidden="true"><i /></span>
      <span className={styles.timelineArrival} aria-hidden="true" />
      <span className={styles.timelineNumber}>{String(index + 1).padStart(2, "0")}</span>
      <div className={styles.timelineCopy}>
        <strong>{step}</strong>
        <p>{copy}</p>
      </div>
    </article>
  );
}

function ProjectTimeline() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [pathData, setPathData] = useState("");
  const [pathViewBox, setPathViewBox] = useState("0 0 1 1");
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 65%"] });
  const pathProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.35 });

  const measurePath = useCallback(() => {
    const timeline = timelineRef.current;
    const nodes = nodeRefs.current.slice(0, process.length);
    if (!timeline || nodes.some((node) => !node)) return;

    const timelineRect = timeline.getBoundingClientRect();
    const points = nodes.map((node) => {
      const rect = node!.getBoundingClientRect();
      return {
        x: rect.left - timelineRect.left + rect.width / 2,
        y: rect.top - timelineRect.top + rect.height / 2,
      };
    });

    const curve = points.slice(1).reduce((value, point, index) => {
      const previous = points[index];
      const middleY = (previous.y + point.y) / 2;
      return `${value} C ${previous.x} ${middleY}, ${point.x} ${middleY}, ${point.x} ${point.y}`;
    }, `M ${points[0].x} ${points[0].y}`);

    setPathViewBox(`0 0 ${timelineRect.width} ${timelineRect.height}`);
    setPathData(curve);
  }, []);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const frame = requestAnimationFrame(measurePath);
    const observer = new ResizeObserver(measurePath);
    observer.observe(timeline);
    nodeRefs.current.forEach((node) => node && observer.observe(node.parentElement ?? node));
    window.addEventListener("resize", measurePath);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measurePath);
    };
  }, [measurePath]);

  return (
    <div ref={timelineRef} className={styles.timeline}>
      <svg className={styles.timelineRail} viewBox={pathViewBox} preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.timelineRailBase} d={pathData} />
        <motion.path className={styles.timelineProgress} d={pathData} style={{ pathLength: reduceMotion ? 1 : pathProgress }} />
      </svg>
      {process.map(([step, copy], index) => <TimelineStep key={step} step={step} copy={copy} index={index} progress={pathProgress} reduceMotion={Boolean(reduceMotion)} nodeRef={(node) => { nodeRefs.current[index] = node; }} />)}
    </div>
  );
}

export function AboutPageSections() {
  return (
    <div className={styles.pageSections}>
      <section className={`${styles.section} ${styles.story}`}>
        <Reveal className={styles.storyGrid}>
          <Heading eyebrow="Our Story" title="The Company We’re Building" />
          <div className={styles.storyCopy}>
            <p className={styles.lead}>Cantabridge Technologies was started with a clear goal: to build custom AI solutions and high-quality software that help businesses scale and grow. By combining strong project management with elite development skills, the company ensures that your digital strategy and your software ecosystems always work together perfectly.</p>
            <p>Every project starts with your final business goal. This simple approach ensures your custom AI tools, web or mobile apps, and cloud services are highly useful, delivered on time, and easy to grow as your business expands.</p>
            <p>Open transparency guides the entire development process. There are zero hidden costs, no unrealistic promises, and no complicated tech jargon used to confuse you. By sharing clear project milestones and honest progress updates at every stage, the goal is to build an honest partnership where you always know exactly what is being built, how much it costs, and when it will launch.</p>
          </div>
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.approachSection}`}>
        <Reveal><Heading eyebrow="Our Approach" title="Your Business Goals Shape What We Build" /><p className="mt-7 max-w-3xl text-base leading-7 text-[var(--brand-gray)]">Every project starts with understanding your business—how your team works, what your customers need, and where your current technology falls short. At Cantabridge Technologies, this understanding guides how we plan, develop, and support your solution.</p></Reveal>
        <div className={styles.approachGrid}>
          {approach.map(([number, title, copy], index) => (
            <Reveal className={styles.approachItem} delay={index * 0.07} key={number}>
              <span className={styles.stepNumber}>{number}</span><h3>{title}</h3><p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.purposeSection}`}>
        <Reveal className={styles.purposeIntro}><Heading eyebrow="Vision & Mission" title="Technology That Helps Businesses Move Forward" light /></Reveal>
        <div className={styles.purposeGrid}>
          <Reveal className={styles.purposeCard}><p className={styles.cardLabel}>Our Vision</p><h3>To become a trusted technology partner for businesses across industries, helping them adopt new technologies, improve how they work, and build for the future.</h3></Reveal>
          <Reveal className={styles.purposeCard} delay={0.08}><p className={styles.cardLabel}>Our Mission</p><h3>To develop AI solutions, custom software, and connected systems that address business challenges. We bring together development, integration, and ongoing support to help organizations automate tasks, serve their customers, and manage their operations.</h3></Reveal>
        </div>
      </section>

      <section className={`${styles.section} ${styles.capabilitiesSection}`}>
        <Reveal><Heading eyebrow="Our Capabilities" title="Technology Services Built Around Your Business" /><p className="mt-7 max-w-3xl text-base leading-7 text-[var(--brand-gray)]">We develop applications, automate workflows, and connect business systems. Our services bring together AI, software development, cloud, and security to support your operations and customer needs.</p></Reveal>
        <div className={styles.capabilityList}>
          {capabilities.map(([capability, copy, href], index) => (
            <Reveal className={styles.capabilityRow} delay={(index % 3) * 0.04} key={capability}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{capability}</h3>
                <p className="mt-2 max-w-3xl text-base leading-7 text-[var(--brand-gray)]">{copy}</p>
              </div>
              <Link href={href} aria-label={`View ${capability} service page`} className={styles.capabilityLink}>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.whySection}`}>
        <Reveal><Heading eyebrow="Why Cantabridge" title="Software and Systems Built Around Your Business Goals" light /><p className="mt-7 max-w-3xl text-base leading-7 text-white/70">We connect your requirements with clear priorities, practical technology choices, and milestones you can review—from initial planning to launch and support.</p></Reveal>
        <div className={styles.reasonGrid}>{reasons.map(([reason, copy], index) => <Reveal className={styles.reason} delay={(index % 3) * 0.06} key={reason}><span><Check size={15} /></span><div><h3>{reason}</h3><p className="mt-3 text-base leading-7 text-white/70">{copy}</p></div></Reveal>)}</div>
        <Reveal><Link href="/contact" className="site-button mt-10">Discuss Your Requirements <ArrowUpRight aria-hidden="true" className="size-4" /></Link></Reveal>
      </section>

      <section className={`${styles.section} ${styles.processSection}`}>
        <Reveal><Heading eyebrow="How We Work" title="What Happens During a Project" /><p className="mt-7 max-w-3xl text-base leading-7 text-[var(--brand-gray)]">The steps below describe our proposed delivery process. The scope of each stage depends on the project and the services agreed.</p></Reveal>
        <ProjectTimeline />
      </section>

      <section className={`${styles.section} ${styles.qualitySection}`}>
        <Reveal className={styles.qualityGrid}>
          <div><Heading eyebrow="Quality & Commitment" title="Quality in the Details That Matter" /><p>We assess a solution against the work it needs to perform: whether key tasks can be completed, permissions behave as intended, errors are handled clearly, and the system can be maintained after handover. Testing and documentation should make those checks visible.</p></div>
          <div className={styles.isoMark}>
            <Image
              src="/images/about/ISO_9001-2015.webp"
              alt="ISO 9001:2015 certification logo"
              width={220}
              height={220}
              className={styles.isoLogo}
              priority
            />
          </div>
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.industrySection}`}>
        <Reveal><Heading eyebrow="Business Applications" title="Different Businesses. Specific Requirements." /><p className="mt-7 max-w-3xl text-base leading-7 text-[var(--brand-gray)]">These examples illustrate requirements we can discuss. The right solution depends on your users, systems, and operating needs.</p></Reveal>
        <div className={styles.industryGrid}>{industries.map(([industry, copy], index) => <Reveal className={styles.industryItem} delay={(index % 4) * 0.04} key={industry}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{industry}</h3><p className="mt-2 text-base font-normal leading-7 text-[var(--brand-gray)]">{copy}</p></div></Reveal>)}</div>
      </section>

      <section className={`${styles.section} ${styles.globalSection}`}>
        <Reveal className={styles.globalGrid}>
          <div><Heading eyebrow="Based in India" title="Rajasthan, India" light /><p>Cantabridge Technologies is based in Rajasthan. To explore working with us, share your project requirements and location so we can discuss communication, delivery arrangements, and the support you need.</p></div>
          <div className={styles.globe}><span>Rajasthan, India</span></div>
        </Reveal>
      </section>

      <section className={`${styles.section} ${styles.valuesSection}`}>
        <Reveal><Heading eyebrow="Our Values" title="Principles We Put into Practice" /></Reveal>
        <div className={styles.valuesGrid}>{values.map(([value, copy], index) => <Reveal className={styles.valueItem} delay={(index % 3) * 0.05} key={value}><span>0{index + 1}</span><div><h3>{value}</h3><p className="mt-3 text-base leading-7 text-[var(--brand-gray)]">{copy}</p></div></Reveal>)}</div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`}>
        <Reveal className={styles.ctaInner}>
          <p className={`${styles.ctaEyebrow} section-eyebrow section-eyebrow-light`}>Let&apos;s Work Together</p><h2 className="brand-section-heading">Tell Us What You Need to Build or Improve</h2><p>You may have a detailed brief or a problem you’re still defining. Tell us what happens today and what you want to change. We can start there.</p>
          <Link href="/contact" className="site-button">Discuss Your Project <ArrowUpRight aria-hidden="true" /></Link>
        </Reveal>
      </section>
    </div>
  );
}
