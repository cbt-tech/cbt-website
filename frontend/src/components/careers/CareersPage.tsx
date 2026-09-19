"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { CareerApplicationForm } from "./CareerApplicationForm";
import styles from "./CareersPage.module.css";

const reasons = [
  ["01", "Understand the Problem Behind the Task", "Look beyond a feature request to the workflow it supports. Understanding the users and their needs gives technical decisions a clearer direction."],
  ["02", "Contribute Across the Build", "Depending on your role, contribute to planning, implementation, testing, or deployment. See how your work connects with the rest of the solution."],
  ["03", "Learn Through Practical Work", "Develop your judgment by investigating issues, testing assumptions, and discussing feedback. We value being able to explain what you learned and how you applied it."],
  ["04", "Share Ideas and Ask Questions", "Clear questions can prevent misunderstandings. We encourage discussing options, raising concerns, and asking for context when a requirement is unclear."],
  ["05", "Take Responsibility for the Details", "Pay attention to the parts that make software usable and maintainable: understandable code, clear error handling, useful documentation, and thoughtful testing."],
  ["06", "Connect Different Technologies", "Our service areas bring together applications, AI, devices, and infrastructure. The work calls for understanding how your part communicates with the systems around it."],
];

const culture = ["Curiosity", "Clear Communication", "Shared Learning", "Care in Delivery", "Accountability", "Respect"];
const areas = [
  ["AI Agents & Automation", "Assistants, document workflows, business-tool integrations, and testing of AI outputs and actions."],
  ["Web & Backend Development", "Websites, business applications, APIs, databases, and access-controlled workflows."],
  ["Mobile App Development", "Mobile interfaces, backend integration, notifications, and testing across the agreed devices."],
  ["Cloud & DevOps", "Application deployment, Linux environments, monitoring, backups, and release workflows."],
  ["Cybersecurity", "Scoped application and configuration reviews, access controls, and approved remediation work."],
  ["Salesforce & CRM", "CRM configuration, custom development, automation, data handling, and integrations."],
  ["IoT & Embedded Development", "Microcontroller firmware, sensor and RFID integration, device communication, and connected applications."],
  ["Technical Support", "Issue investigation, application maintenance, troubleshooting, and clear support documentation."],
] as const;
const process = [
  ["01", "Profile Review", "We consider your experience, projects, and interests against the requirements of the opportunity."],
  ["02", "Introductory Conversation", "Discuss your background, the kind of work you are looking for, and the role’s expectations and working arrangements."],
  ["03", "Role-Focused Discussion", "Walk through relevant work, explain your contribution, and discuss how you approach problems and technical decisions."],
  ["04", "Practical Evaluation", "Where relevant, a task or work-sample discussion may help us understand your approach. Its scope and expectations will be explained beforehand."],
  ["05", "Offer & Onboarding", "If selected, review the proposed responsibilities and engagement terms before planning your start and onboarding."],
] as const;
const faqs = [
  ["Can I apply when no roles are listed?", "Yes. You can submit a general profile and select your area of interest. It may be considered when a suitable requirement arises; submitting does not guarantee an interview or position."],
  ["Can freshers or students share their profiles?", "Yes. Mention your current learning stage and include relevant coursework, personal projects, or practical experience. Any future role or internship will have its own requirements."],
  ["Do you consider freelance or contract work?", "You can register your interest by selecting Freelance / Contract. Include your skills, availability, and relevant work. Engagements depend on project needs and agreed terms."],
  ["What should I include in my message?", "Describe your main skills, one relevant project or problem you worked on, and your own contribution. Include what you would like to work on next. Share only work you have permission to disclose."],
  ["What happens after I submit?", "Your profile is submitted for career consideration. If there is a suitable match, we’ll contact you to discuss the opportunity and any next steps. We cannot promise a response date for general applications."],
  ["Are opportunities remote or office-based?", "Location, working hours, and any remote or on-site requirements depend on the role. These details will be shared when an opportunity is discussed."],
] as const;
const reveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function CareersPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="career-title">
        <div className={styles.heroInner}>
          <motion.div
            className={`${styles.eyebrow} section-eyebrow`}
            initial={reduceMotion ? false : { opacity: 0, letterSpacing: ".3em" }}
            animate={{ opacity: 1, letterSpacing: ".16em" }}
            transition={{ duration: reduceMotion ? 0 : .7, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Careers at Cantabridge"
          >
            <TypewriterText text="Careers at Cantabridge" start={.06} speed={.024} reducedMotion={reduceMotion} />
          </motion.div>
          <div className={styles.heroComposition}>
            <motion.h1
              id="career-title"
              className={`${styles.heroTitle} brand-display-heading`}
              aria-label="Build Technology People Can Put to Work"
              initial={reduceMotion ? false : { x: 22, letterSpacing: "-.035em" }}
              animate={{ x: 0, letterSpacing: "-.075em" }}
              transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : .42, ease: [0.16, 1, 0.3, 1] }}
            >
              <TypewriterText text="Build Technology" start={.48} speed={.042} reducedMotion={reduceMotion} />
            </motion.h1>

            <div className={styles.heroSupport}>
              <motion.p initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .72, delay: reduceMotion ? 0 : 1.92, ease: [0.16, 1, 0.3, 1] }}>
                At Cantabridge Technologies, our work spans AI solutions, business applications, and connected systems. If you enjoy understanding a problem, building a solution, and improving the details, we’d like to learn about your skills and interests.
              </motion.p>
              <motion.a href="#career-areas" className={`${styles.primaryLink} site-button`} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .65, delay: reduceMotion ? 0 : 2.12, ease: [0.16, 1, 0.3, 1] }}>
                Explore Career Areas <ArrowDown size={17} />
              </motion.a>
            </div>

            <motion.div
              className={styles.accentPhrase}
              initial={reduceMotion ? false : { x: -28, y: 18, scale: .97, letterSpacing: "-.035em" }}
              animate={{ x: 0, y: 0, scale: 1, letterSpacing: "-.075em" }}
              transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 1.18, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <span><TypewriterText text="People Can" start={1.28} speed={.045} reducedMotion={reduceMotion} /></span>
              <span><TypewriterText text="Put to Work" start={1.75} speed={.045} reducedMotion={reduceMotion} /></span>
            </motion.div>
          </div>
        </div>
        <motion.div className={styles.heroRule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.25, delay: 0.35 }} />
      </section>

      <section className={styles.introSection}>
        <Reveal className={`${styles.sectionEyebrow} section-eyebrow`}>Why Cantabridge</Reveal>
        <div className={styles.introGrid}>
          <Reveal><h2 className={`${styles.sectionTitle} brand-section-heading`}>Bring Your Skills to Work with a Clear Purpose</h2></Reveal>
          <Reveal delay={0.1}><p className={styles.leadCopy}>The work we take on connects technology with a business task: helping someone find information, complete a process, or manage equipment. We’re building a team that cares about how a solution is developed and how it works for the people using it.</p></Reveal>
        </div>
        <div className={styles.reasonList}>
          {reasons.map(([number, title, copy], index) => (
            <motion.article className={styles.reasonRow} key={number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: 0.55, delay: (index % 2) * 0.06 }}>
              <span className={styles.reasonNumber}>{number}</span><h3>{title}</h3><p>{copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className={styles.cultureSection} aria-labelledby="culture-title">
        <div className={styles.cultureGlow} aria-hidden="true" />
        <div className={styles.cultureHeader}>
          <Reveal className={`${styles.sectionEyebrow} ${styles.lightEyebrow} section-eyebrow section-eyebrow-light`}>How We Work Together</Reveal>
          <Reveal delay={0.08}><h2 id="culture-title" className={`${styles.cultureTitle} brand-section-heading`}>Ask Questions. Share What You Learn.<br /><span>Follow Through.</span></h2></Reveal>
        </div>
        <div className={styles.cultureTicker} aria-label="Our working principles">
          {culture.map((item, index) => (
            <motion.div className={styles.cultureItem} key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.055 }}><span>{String(index + 1).padStart(2, "0")}</span>{item}</motion.div>
          ))}
        </div>
        <Reveal className={styles.cultureCopy}><p>We’re shaping a working culture around clear communication and shared responsibility. That means explaining your approach, asking for help when needed, and raising issues while there is time to act. We value feedback that improves the work and respect for the people contributing to it.</p></Reveal>
      </section>

      <section className={styles.areasSection} id="career-areas">
        <div className={styles.areasIntro}>
          <Reveal className={`${styles.sectionEyebrow} section-eyebrow`}>Career Areas</Reveal>
          <Reveal><h2 className={`${styles.sectionTitle} brand-section-heading`}>Where Your Skills Could Make a Difference</h2></Reveal>
          <Reveal delay={0.08}><p>These areas reflect the work Cantabridge Technologies offers. They are areas of interest for future recruitment, rather than a list of current vacancies.</p></Reveal>
        </div>
        <div className={styles.areaList}>
          {areas.map(([area, description], index) => (
            <motion.div className={styles.areaRow} key={area} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.48, delay: index * 0.025 }}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{area}</strong><p>{description}</p></div></motion.div>
          ))}
        </div>
      </section>

      <section className={styles.opportunitiesSection} id="opportunities" aria-labelledby="opportunities-title">
        <Reveal className={`${styles.sectionEyebrow} ${styles.lightEyebrow} section-eyebrow section-eyebrow-light`}>Opportunities</Reveal>
        <div className={styles.opportunitiesHeader}>
          <Reveal><h2 id="opportunities-title" className={`${styles.opportunitiesTitle} brand-section-heading`}>Find Work That Fits Your Skills</h2></Reveal>
          <Reveal delay={0.1}><p>Available roles will appear here with their responsibilities, required skills, and working arrangements.</p></Reveal>
        </div>
        <Reveal className={styles.emptyRole}>
          <div className={styles.statusDot} aria-hidden="true" /><div><h3>No Open Positions at the Moment</h3><p>You can still share your profile for future consideration. Tell us your area of interest and include examples that show what you can do.</p></div><a href="#career-application" className="site-button">Share Your Profile <ArrowRight size={18} /></a>
        </Reveal>
      </section>

      <section className={styles.processSection} aria-labelledby="process-title">
        <Reveal className={`${styles.sectionEyebrow} section-eyebrow`}>What to Expect</Reveal>
        <Reveal><h2 id="process-title" className={`${styles.processTitle} brand-section-heading`}>A Conversation About Your Skills and the Work</h2></Reveal>
        <p className={styles.processIntroduction}>When a suitable role becomes available, the process may include the steps below. The discussions and any evaluation will depend on the role.</p>
        <div className={styles.processList}>
          {process.map(([number, label, description], index) => (
            <motion.div className={styles.processStep} key={number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}><span>{number}</span><Check size={16} aria-hidden="true" /><strong>{label}</strong><p>{description}</p></motion.div>
          ))}
        </div>
        <p className={styles.processNote}>Sharing a general profile does not start an interview process. We’ll contact you if there is a suitable opportunity to discuss.</p>
      </section>

      <section className={styles.applicationSection} id="career-application" aria-labelledby="application-title">
        <div className={styles.applicationIntro}>
          <Reveal className={`${styles.sectionEyebrow} section-eyebrow`}>Share Your Profile</Reveal>
          <Reveal><h2 id="application-title" className={`${styles.applicationTitle} brand-section-heading`}>Tell Us What You Can Build and Where You Want to Contribute</h2></Reveal>
          <Reveal delay={0.08}><p>Share your skills, relevant experience, and the work you are interested in. A project link or a short explanation of a problem you solved can help us understand your contribution beyond your résumé.</p></Reveal>
          <p className={styles.formHelper}>Applying for future opportunities? Select your preferred area below.</p>
        </div>
        <CareerApplicationForm />
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <Reveal className={`${styles.sectionEyebrow} section-eyebrow`}>Questions</Reveal>
        <div className={styles.faqGrid}>
          <Reveal><h2 id="faq-title" className={`${styles.faqTitle} brand-section-heading`}>Before You Share Your Profile</h2></Reveal>
          <div className={styles.faqList}>{faqs.map(([question, answer], index) => (
            <motion.details key={question} className={styles.faqItem} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}><summary>{question}<span>+</span></summary><p>{answer}</p></motion.details>
          ))}
            <motion.details className={styles.faqItem} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: faqs.length * 0.04 }}><summary>I want to hire a developer for my business. Is this the right form?<span>+</span></summary><p>For project staffing or developer enquiries, please use our <Link href="/hire-a-developer">Hire a Developer page</Link>. This form is for people interested in working with Cantabridge Technologies.</p></motion.details>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalGrid} aria-hidden="true" />
        <Reveal className={`${styles.sectionEyebrow} ${styles.lightEyebrow} section-eyebrow section-eyebrow-light`}>Stay in Consideration</Reveal>
        <Reveal><h2 className={`${styles.finalTitle} brand-section-heading`}>Share Your Skills and Interests</h2></Reveal>
        <Reveal delay={0.08} className={styles.finalCtaFoot}><p>Send your profile with a few details about the work you want to do. We’ll contact you if there is a suitable opportunity to explore together.</p><a href="#career-application" className={`${styles.lightLink} site-button`}>Share Your Profile <ArrowRight size={18} /></a></Reveal>
      </section>
    </main>
  );
}

function TypewriterText({ text, start, speed, reducedMotion }: { text: string; start: number; speed: number; reducedMotion: boolean | null }) {
  return (
    <span className={styles.typewriterText} aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <motion.span
          className={styles.typedCharacter}
          key={`${character}-${index}`}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : .01, delay: reducedMotion ? 0 : start + index * speed }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </span>
  );
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} transition={{ duration: 0.82, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}
