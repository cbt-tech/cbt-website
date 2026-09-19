"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MoveDownRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const capabilities = ["AI & Automation", "Web & Mobile Apps", "IoT & CRM", "Cloud & IT Services"] as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function AboutCantabridge() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="who-we-are" className="relative overflow-hidden bg-[#f7f8fa] py-[clamp(4rem,7vw,7rem)]" aria-labelledby="about-cantabridge-title">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(3,28,81,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(3,28,81,.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute -right-32 top-1/4 size-[420px] rounded-full bg-[var(--brand-sky)]/10 blur-[110px]" />
      </div>

      <Container className="relative max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <header className="mb-[clamp(2.5rem,4vw,4rem)] flex justify-start text-left">
          <p className="section-eyebrow">
            Who We Are
          </p>
        </header>

        <div className="relative isolate grid overflow-hidden rounded-[28px] bg-[#031c51] shadow-[0_35px_100px_rgba(3,28,81,.18)] lg:grid-cols-[minmax(380px,42fr)_minmax(0,58fr)] lg:rounded-[36px]">
          <div className="relative z-20 flex flex-col justify-between gap-14 p-7 text-white sm:p-10 lg:p-12 xl:p-16">
            <div>
              <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-5 text-[9px] font-bold uppercase tracking-[.22em] text-white/55">
                <span>About Us</span>
              </div>
              <motion.h2
                id="about-cantabridge-title"
                className="max-w-md text-[clamp(1.35rem,2.1vw,2rem)] font-medium leading-[1.18] tracking-[-.035em] text-white"
                initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: .75 }}
                transition={{ duration: .75, delay: .2, ease }}
              >
                Your Technical Partner for Scalable Business Growth
              </motion.h2>
              <motion.div
                className="mt-7 max-w-xl space-y-5 text-base leading-7 text-white/68 lg:text-[17px] lg:leading-8"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: .45 }}
                transition={{ duration: .7, delay: .38, ease }}
              >
                <p>Cantabridge Technologies is an AI-first software development and IT infrastructure company based in Rajasthan, India. We build custom AI agents, business applications, and connected systems around your business needs.</p>
                <p>From automating everyday tasks to strengthening your infrastructure, we connect your existing tools and develop solutions that support your next stage of growth.</p>
              </motion.div>
            </div>

            <div>
              <ul className="mb-9 grid grid-cols-2 gap-x-5 gap-y-3" aria-label="Core capabilities">
                {capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-center gap-2.5 border-t border-white/15 pt-3 text-[10px] font-bold uppercase tracking-[.12em] text-white/72"
                  >
                    <span className="size-1.5 rounded-full bg-[var(--brand-sky)] shadow-[0_0_12px_var(--brand-sky)]" /> {capability}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="site-button group">
                About Cantabridge
                <span className="grid size-9 place-items-center rounded-full bg-white text-[var(--brand-navy)] transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative min-h-[460px] overflow-hidden sm:min-h-[560px] lg:min-h-full">
            <div className="absolute -inset-y-8 inset-x-0">
              <Image src="/images/home/home_who_we_are.png" alt="Software developers collaborating around a computer and connected device" fill sizes="(max-width: 1023px) 100vw, 65vw" className="object-cover object-[center_48%]" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,28,81,.02),rgba(3,28,81,.28))] lg:bg-[linear-gradient(90deg,#031c51_0%,rgba(3,28,81,.18)_9%,rgba(3,28,81,.02)_30%,rgba(3,28,81,.2)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,.12)_48%,transparent_62%)] opacity-60" />

            <div className="absolute right-5 top-5 flex items-center gap-3 rounded-full border border-white/25 bg-[#031c51]/55 px-4 py-3 text-[9px] font-bold uppercase tracking-[.2em] text-white backdrop-blur-xl sm:right-8 sm:top-8">
              <span className="inline-flex size-2 rounded-full bg-[#65d6ff]" />
              Built Around Your Business
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-white/12 p-5 text-white shadow-2xl backdrop-blur-xl sm:bottom-8 sm:left-auto sm:right-8 sm:w-[350px] sm:p-6">
              <div className="flex items-start justify-between gap-5">
                <div><p className="text-[9px] font-bold uppercase tracking-[.23em] text-white/55">How We Work</p><h3 className="mt-3 text-xl font-semibold tracking-[-.035em]">Understand the Work. Build What Helps.</h3></div>
                <MoveDownRight className="size-5 text-[var(--brand-sky)]" aria-hidden="true" />
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-white/20 pt-4 text-[9px] font-bold uppercase tracking-[.15em] text-white/72">
                <span>Understand</span><span className="h-px flex-1 bg-white/25" /><span>Build</span><span className="h-px flex-1 bg-white/25" /><span>Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 text-sm leading-6 text-[var(--brand-gray)] sm:grid-cols-3 lg:mt-10">
          {["Start with a clear business need", "Work with the systems you use", "Plan for life after launch"].map((item, index) => (
            <div key={item} className="flex items-center gap-4 border-t border-[rgba(3,28,81,.14)] pt-4">
              <span className="text-[10px] text-[var(--brand-blue)]">0{index + 1}</span><span className="font-semibold text-[var(--brand-navy)]">{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
