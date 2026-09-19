"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

const services = [
  { display: ["AI Agents", "& Automation"], title: "AI Agents & Automation", href: "/services/ai-machine-learning", position: "0% 0%", description: "Build intelligent AI agents to instantly prepare contextual responses and execute multi-step workflows across your business applications. We map out your entire operational structure to deploy autonomous tools that operate securely 24/7—embedding deterministic logic to ensure every automated action aligns perfectly with your predefined business rules.", cta: "Explore AI Agents & Automation" },
  { display: ["IoT Engineering", "& Automation"], title: "IoT Engineering & Automation", href: "/services/iot-solutions", position: "50% 0%", description: "We write production-ready source code for microcontrollers and hardware modules to execute automated actions, while building custom web and mobile applications to display live device telemetry and performance trends. Our engineering delivers the secure API bridges that connect physical devices to your primary web applications, deploying rule-based engines that instantly trigger digital alerts or system overrides based on live device inputs.", cta: "Explore IoT Solutions" },
  { display: ["Cyber", "security"], title: "Cybersecurity", href: "/services/cybersecurity", position: "100% 0%", description: "Identify weaknesses in application access, server configurations, and network controls. Address the gaps through security reviews, configuration improvements, and protection measures suited to your systems.", cta: "Explore Cybersecurity Services" },
  { display: ["Salesforce", "CRM"], title: "Salesforce CRM", href: "/services/salesforce-crm", position: "0% 50%", description: "Configure and customize Salesforce to optimize the entire lifecycle of lead management, customer acquisition, and service request tracking. This engineering seamlessly connects customer records with primary business applications, deploying automated follow-up sequences and building advanced reporting dashboards that provide instant clarity on operational performance.", cta: "Explore Salesforce Services" },
  { display: ["Web", "Development"], title: "Web Development", href: "/services/web-application-development", position: "50% 50%", description: "Build mobile-friendly websites, secure customer portals, and custom web applications designed to run your business smoothly. From the layout design to the underlying software connections, every page and feature is created to give you a strong online presence, make customer interactions easy, and keep your daily digital tasks running fast without any slowdowns.", cta: "Explore Web Development" },
  { display: ["Mobile App", "Development"], title: "Mobile App Development", href: "/services/mobile-application-development", position: "100% 50%", description: "Expand your digital presence directly onto iOS and Android devices with high-performance mobile applications. Development delivers smooth, user-friendly layouts engineered to connect your digital platform seamlessly with mobile users, ensuring your business stays accessible, responsive, and highly visible on any smartphone screen.", cta: "Explore Mobile App Development" },
  { display: ["Cloud", "Services"], title: "Cloud Services", href: "/services/cloud-computing", position: "0% 100%", description: "Plan cloud deployments and migrations around your applications, data, and usage needs. Set up hosting, backups, and monitoring, then review resource use as your requirements change.", cta: "Explore Cloud Services" },
] as const;

const serviceImages: Record<(typeof services)[number]["title"], { src: string; alt: string }> = {
  "AI Agents & Automation": {
    src: "/images/home/Salesforce CRM.webp",
    alt: "Team designing an automated digital workflow",
  },
  "IoT Engineering & Automation": {
    src: "/images/home/IOT.webp",
    alt: "Engineer monitoring connected irrigation equipment",
  },
  Cybersecurity: {
    src: "/images/home/CyberSecurity.webp",
    alt: "Cybersecurity specialists working in a data center",
  },
  "Salesforce CRM": {
    src: "/images/home/Crmmanagement.webp",
    alt: "Team reviewing a Salesforce sales dashboard",
  },
  "Web Development": {
    src: "/images/home/Webdev.webp",
    alt: "Development team building a web application",
  },
  "Mobile App Development": {
    src: "/images/home/Appdev.webp",
    alt: "Developer testing a mobile application",
  },
  "Cloud Services": {
    src: "/images/home/Cloudservices.webp",
    alt: "Engineer monitoring cloud infrastructure",
  },
};

function ServiceImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 640px) 58vw, 100vw"
      className={`object-cover ${className}`}
    />
  );
}

function ServiceScene({ service, index, progress }: { service: (typeof services)[number]; index: number; progress: MotionValue<number> }) {
  const image = serviceImages[service.title];
  const sceneStep = 0.61 / (services.length - 1);
  const center = 0.33 + sceneStep * index;
  const opacity = useTransform(progress, [center - sceneStep * 0.9, center - sceneStep * 0.34, center + sceneStep * 0.34, center + sceneStep * 0.9], [0.25, 1, 1, 0.25]);
  const titleX = useTransform(progress, [center - sceneStep, center, center + sceneStep], [72, 0, -54]);
  const imageX = useTransform(progress, [center - sceneStep, center, center + sceneStep], [110, 0, -42]);
  const imageScale = useTransform(progress, [center - sceneStep, center, center + sceneStep], [0.94, 1, 1.045]);
  const imageClip = useTransform(progress, [center - sceneStep * 0.75, center], ["inset(0 0 0 18%)", "inset(0 0 0 0%)"]);

  return (
    <article className="relative h-full w-screen shrink-0 overflow-hidden border-r border-white/10 bg-[#020817]" aria-label={service.title}>
      <motion.div className="grid h-full grid-rows-[minmax(0,0.82fr)_minmax(0,1.12fr)_auto] gap-5 px-6 pb-8 pt-20 sm:grid-cols-[minmax(0,42%)_minmax(0,58%)] sm:grid-rows-[minmax(0,1fr)_auto] sm:gap-x-12 sm:px-[6vw] sm:pb-[7vh] sm:pt-[12vh]" style={{ opacity }}>
        <motion.header className="relative z-20 min-w-0 self-start sm:col-start-1 sm:row-start-1" style={{ x: titleX }}>
          <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
            <span className="text-[var(--brand-sky)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-9 bg-[var(--brand-blue)]" /> Our Services
          </div>
          <h3 className="text-[clamp(2.75rem,6.6vw,7.4rem)] font-semibold leading-[0.84] tracking-[-0.065em] text-white">
            {service.display.map((line, lineIndex) => (
              <span key={`${service.title}-${line}`} className={`block ${lineIndex < service.display.length - 1 ? "mb-[0.12em]" : ""}`}>
                {line}
              </span>
            ))}
          </h3>
        </motion.header>

        <motion.div className="relative z-10 min-h-0 overflow-hidden border border-white/15 bg-[#031c51] sm:col-start-2 sm:row-span-2 sm:row-start-1" style={{ x: imageX, scale: imageScale, clipPath: imageClip }}>
          <ServiceImage src={image.src} alt={image.alt} className="saturate-[0.82] contrast-[1.04]" />
          <div className="absolute inset-x-0 top-0 h-1 bg-[var(--brand-blue)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,23,0.2),transparent_35%)]" />
        </motion.div>

        <div className="relative z-20 max-w-md self-end border-t border-white/20 pt-5 sm:col-start-1 sm:row-start-2">
          <p className="text-base leading-7 text-white/68">{service.description}</p>
          <Link href={service.href} className="group mt-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.17em] text-white">
            {service.cta}
            <span className="grid size-8 place-items-center rounded-full border border-[var(--brand-blue)] text-[var(--brand-sky)] transition-colors group-hover:bg-[var(--brand-blue)] group-hover:text-white">
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </motion.div>
    </article>
  );
}

export function WhatWeDoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, reducedMotion ? { stiffness: 1000, damping: 1000 } : { stiffness: 95, damping: 28, mass: 0.32 });

  const gatewayOpacity = useTransform(progress, [0, 0.19, 0.235], [1, 1, 0]);
  const gatewayScale = useTransform(progress, [0, 0.14, 0.235], [1, 1.035, 1.11]);
  const lineScaleX = useTransform(progress, [0, 0.11, 0.225], [1, 1, 24]);
  const lineOpacity = useTransform(progress, [0, 0.13, 0.225], [0.42, 0.5, 0]);
  const wordScale = useTransform(progress, [0, 0.12, 0.225], [1, 1.055, 1.18]);
  const wordScaleX = useTransform(progress, [0, 0.13, 0.225], [1, 1.08, 1.2]);
  const wordY = useTransform(progress, [0, 0.225], ["0%", "-6%"]);
  const wordOpacity = useTransform(progress, [0, 0.175, 0.23], [1, 1, 0]);
  const leftWordX = useTransform(progress, [0, 0.13, 0.23], ["0%", "0%", "-22%"]);
  const rightWordX = useTransform(progress, [0, 0.13, 0.23], ["0%", "0%", "22%"]);
  const exhibitionOpacity = useTransform(progress, [0.275, 0.33], [0, 1]);
  const trackX = useTransform(progress, [0.33, 0.94], ["0vw", "-600vw"]);

  return (
    <section ref={sectionRef} className="relative h-[700svh] bg-black" aria-label="Technology services">
      <div className="sticky top-0 h-svh min-h-[620px] overflow-hidden bg-[#020817]">
        <motion.div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-black" style={{ opacity: gatewayOpacity, scale: gatewayScale }}>
          <div className="absolute inset-0 flex justify-around px-[8vw]">
            {Array.from({ length: 10 }).map((_, index) => <motion.span key={index} className="h-full w-px origin-center bg-white" style={{ scaleX: lineScaleX, opacity: lineOpacity }} />)}
          </div>
          <div className="relative flex h-[clamp(5rem,16vw,15rem)] w-full items-center justify-center overflow-visible" aria-label="Services">
            <motion.h2
              aria-hidden="true"
              className="absolute whitespace-nowrap pr-[0.14em] text-[clamp(3.4rem,12vw,12rem)] font-black tracking-[-0.08em] text-white"
              style={{ clipPath: "inset(0 50% 0 0)", opacity: wordOpacity, scale: wordScale, scaleX: wordScaleX, x: leftWordX, y: wordY }}
            >
              SERVICES
            </motion.h2>
            <motion.span
              aria-hidden="true"
              className="absolute whitespace-nowrap pr-[0.14em] text-[clamp(3.4rem,12vw,12rem)] font-black tracking-[-0.08em] text-white"
              style={{ clipPath: "inset(0 0 0 50%)", opacity: wordOpacity, scale: wordScale, scaleX: wordScaleX, x: rightWordX, y: wordY }}
            >
              SERVICES
            </motion.span>
            <span className="sr-only">Services</span>
          </div>
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.25em] text-white/55">
            Explore Our Services <span className="h-px w-10 bg-white/35" /> 7 Services
          </div>
        </motion.div>

        <motion.div className="absolute inset-0 z-10 overflow-hidden" style={{ opacity: exhibitionOpacity }}>
          <div className="pointer-events-none absolute inset-0 z-20 flex justify-around px-[8vw] opacity-[0.07]" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, index) => <span key={index} className="h-full w-px bg-white" />)}
          </div>
          <div className="absolute left-6 top-6 z-20 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.24em] text-white/60 sm:left-10 sm:top-8">
            Cantabridge / Technology Services <span className="h-px w-12 bg-white/35" />
          </div>
          <motion.div className="flex h-full will-change-transform" style={{ x: trackX }}>
            {services.map((service, index) => <ServiceScene key={service.title} service={service} index={index} progress={progress} />)}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
