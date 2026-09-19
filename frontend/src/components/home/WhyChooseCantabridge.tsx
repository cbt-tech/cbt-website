"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const reasons = [
  {
    title: "Focus on Your Business Goals",
    description: "Every project begins by thoroughly reviewing your current operations. The goal is to build software that addresses your exact digital needs and makes your daily business routines run as smoothly as possible.",
  },
  {
    title: "Clear, Step-by-Step Launching",
    description: "Separate your primary launch features from ideas that can be added later. This gives you absolute control over your budget and ensures the first version of your application launches without unnecessary delays.",
  },
  {
    title: "The Right Tools for the Job",
    description: "Choose tools around your requirements, existing systems, and maintenance needs. Each recommendation should have a clear purpose in the solution.",
  },
  {
    title: "Transparent Milestones",
    description: "Use agreed milestones and working demonstrations to review the build. Feedback during development helps clarify requirements while there is still time to act on them.",
  },
  {
    title: "Connections Planned Early",
    description: "Identify the data, permissions, and integrations the solution needs before development progresses. This helps account for how the new system will work alongside your current tools.",
  },
  {
    title: "Support Defined Before Launch",
    description: "Agree on documentation, handover, and ongoing support as part of the project scope. Know who will maintain the system and how future changes will be handled.",
  },
] as const;

export function WhyChooseCantabridge() {
  const reducedMotion = useReducedMotion();
  const rise = reducedMotion ? 0 : 20;
  const duration = reducedMotion ? 0 : 0.65;

  const intro: Variants = {
    hidden: { opacity: 0, y: rise },
    visible: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
  };
  const list: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: reducedMotion ? 0 : 0.18 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="bg-[#f7f8fa] py-24 text-[var(--brand-navy)] sm:py-32 lg:py-40" aria-labelledby="why-cantabridge-title">
      <Container className="max-w-[1440px] lg:px-10 xl:px-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20 xl:gap-28">
          <motion.div
            className="self-start lg:sticky lg:top-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.div variants={intro}>
              <div className="section-eyebrow">
                Why Cantabridge
              </div>
              <h2 id="why-cantabridge-title" className="brand-section-heading mt-7 max-w-2xl">
                Software and Systems Engineered for Real Business Results
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-[var(--brand-gray)]">
                Successful technology projects require clear goals, transparent timelines, and practical strategies. The entire development process is structured to keep design choices, budget priorities, and final platform launches directly aligned with the growth of your digital presence.
              </p>
            </motion.div>

            <motion.div variants={intro} transition={{ delay: reducedMotion ? 0 : 0.16 }}>
              <Link
                href="/contact"
                className="site-button group mt-9"
              >
                Discuss Your Requirements
                <span className="grid size-10 place-items-center rounded-full bg-white text-[var(--brand-navy)] transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.ol
            className="grid border-t border-[color:color-mix(in_srgb,var(--brand-navy)_18%,transparent)] sm:grid-cols-2"
            variants={list}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
          >
            {reasons.map((reason, index) => (
              <motion.li
                key={reason.title}
                className="group relative min-h-64 overflow-hidden border-b border-[color:color-mix(in_srgb,var(--brand-navy)_18%,transparent)] py-8 sm:min-h-72 sm:px-8 sm:py-9 sm:odd:border-r sm:odd:pl-0"
                variants={item}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--brand-blue)]"
                  variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] } } }}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-6">
                  <span className="text-[11px] font-bold tracking-[0.16em] text-[var(--brand-blue)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 size-1.5 rounded-full bg-[color:color-mix(in_srgb,var(--brand-blue)_28%,transparent)] transition-colors group-hover:bg-[var(--brand-blue)]" aria-hidden="true" />
                </div>
                <h3 className="mt-10 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-[1.7rem]">
                  {reason.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-7 text-[var(--brand-gray)]">
                  {reason.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
