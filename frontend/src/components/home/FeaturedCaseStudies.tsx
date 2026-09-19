"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const studies = [
  {
    number: "01",
    industry: "Connected Equipment",
    project: "Monitor Equipment from One Place",
    challenge: "Your team needs to check equipment status without visiting every installation.",
    solution: "Connect compatible devices to a dashboard with status updates, configurable alerts, and authorized remote controls.",
    result: "Connection reliability, alert usefulness, and whether the controls suit the equipment and its operating conditions.",
    image: "/images/case-studies/connected-operations.png",
    href: "/contact",
    position: "object-center",
  },
  {
    number: "02",
    industry: "Internal Knowledge",
    project: "Find Answers in Company Documents",
    challenge: "Staff spend time searching through manuals, policies, and other internal documents.",
    solution: "Build an AI assistant that retrieves relevant passages from approved documents and includes source references for review.",
    result: "Answer accuracy, document permissions, and how the assistant responds when it cannot find reliable information.",
    image: "/images/case-studies/secure-cloud.png",
    href: "/contact",
    position: "object-center",
  },
  {
    number: "03",
    industry: "Sales & Customer Operations",
    project: "Organize Incoming Enquiries",
    challenge: "Enquiries arrive through different channels, making ownership and follow-up difficult to track.",
    solution: "Connect enquiry forms to a CRM, assign records, and create follow-up tasks for the responsible team members.",
    result: "Record completeness, assignment accuracy, and visibility of enquiries still awaiting action.",
    image: "/images/case-studies/enterprise-ai.png",
    href: "/contact",
    position: "object-center",
  },
] as const;

function WorkIntro({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "grid grid-cols-[minmax(0,1fr)_minmax(320px,0.54fr)] items-end gap-12"}>
      <div>
        <div className="section-eyebrow section-eyebrow-light">
          Where Technology Can Help
        </div>
        <h2 className="brand-section-heading mt-5 max-w-4xl text-white">
          Start with a Task That Needs to Work Better
        </h2>
      </div>
      <div className={compact ? "mt-7" : "pb-1"}>
        <p className="max-w-xl text-base leading-7 text-white/58">
          These examples show how AI, software, and connected devices could support everyday operations. Each solution would need to be scoped around your systems, data, and working practices.
        </p>
        <Link href="/contact" className="site-button group mt-6">
          Discuss a Similar Requirement
          <span className="grid size-9 place-items-center rounded-full bg-[var(--brand-blue)] transition-transform group-hover:translate-x-1">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}

function FocusPanel({
  study,
  active,
  onActivate,
  reducedMotion,
}: {
  study: (typeof studies)[number];
  active: boolean;
  onActivate: () => void;
  reducedMotion: boolean | null;
}) {
  const duration = reducedMotion ? 0 : 0.72;
  const transition = { duration, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <motion.article
      className="group relative min-w-0 overflow-hidden border border-white/16 bg-[#07142d]"
      animate={{ flexGrow: active ? 3.4 : 0.62, borderColor: active ? "rgba(6,97,241,0.72)" : "rgba(255,255,255,0.16)" }}
      transition={transition}
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
    >
      <Link href={study.href} className="relative block h-full min-h-[520px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-sky)]">
        <motion.div
          className="absolute -inset-x-6 -inset-y-3"
          animate={{ x: active ? -6 : 10, scale: active ? 1 : 1.05 }}
          transition={transition}
        >
          <Image
            src={study.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 58vw, 80vw"
            className={`object-cover ${study.position}`}
          />
        </motion.div>
        <motion.div className="absolute inset-0 bg-black" animate={{ opacity: active ? 0.34 : 0.62 }} transition={transition} aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010714]/95 via-[#010714]/12 to-[#010714]/48" aria-hidden="true" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/74 xl:p-6">
          <span className="max-w-[150px] leading-5">{study.industry}</span>
          <span className="text-[var(--brand-sky)]">{study.number}</span>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-10 p-5 xl:p-7"
          style={{ opacity: active ? 0 : 1 }}
          aria-hidden={active}
        >
          <p className="text-lg font-semibold leading-tight tracking-[-0.025em] text-white [writing-mode:vertical-rl] [transform:rotate(180deg)]">
            {study.project}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 z-20 w-[620px] p-7 xl:w-[760px] xl:p-9"
          style={{ opacity: active ? 1 : 0 }}
          aria-hidden={!active}
        >
          <h3 className="w-full text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-white xl:text-5xl">
            {study.project}
          </h3>
          <div className="mt-6 grid max-w-3xl grid-cols-2 gap-7 border-t border-white/25 pt-5 text-base leading-7 text-white/68">
            <div>
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--brand-sky)]">Business need</p>
              <p>{study.challenge}</p>
            </div>
            <div>
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--brand-sky)]">Possible solution</p>
              <p>{study.solution}</p>
            </div>
          </div>
          <div className="mt-6 flex items-end justify-between gap-8">
            <div className="border-l-2 border-[var(--brand-blue)] pl-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/48">What to evaluate</p>
              <p className="mt-1 max-w-md text-base font-semibold leading-7 text-white">{study.result}</p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors group-hover:border-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)]">
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function MobilePanel({ study }: { study: (typeof studies)[number] }) {
  return (
    <article className="overflow-hidden border border-white/15 bg-[#07142d]">
      <Link href={study.href} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={study.image} alt="" fill sizes="100vw" className={`object-cover ${study.position} transition-transform duration-700 group-hover:scale-[1.025]`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010714] via-black/12 to-black/35" />
          <div className="absolute inset-x-0 top-0 flex justify-between p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            <span>{study.industry}</span><span className="text-[var(--brand-sky)]">{study.number}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-white">{study.project}</h3>
            <p className="mt-4 text-base leading-7 text-white/65">{study.solution}</p>
            <div className="mt-5 flex items-end justify-between gap-5 border-t border-white/20 pt-4">
              <p className="max-w-xs text-base font-semibold text-white">{study.result}</p>
              <ArrowUpRight className="size-5 text-[var(--brand-sky)]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedCaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-[#010714] text-white" aria-label="Application examples">
      <div className="lg:hidden">
        <Container className="py-24 sm:py-28">
          <WorkIntro compact />
          <div className="mt-12 space-y-7">
            {studies.map((study) => <MobilePanel key={study.number} study={study} />)}
          </div>
        </Container>
      </div>

      <Container className="hidden max-w-[1600px] py-24 lg:block xl:px-12 xl:py-32">
        <WorkIntro />
        <div className="mt-10 flex h-[min(64svh,680px)] min-h-[540px] gap-3 xl:mt-12 xl:gap-4" onMouseLeave={() => setActiveIndex(0)}>
          {studies.map((study, index) => (
            <FocusPanel
              key={study.number}
              study={study}
              active={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
