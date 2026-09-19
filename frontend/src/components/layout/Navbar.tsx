"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  ChevronDown,
  CloudCog,
  Code2,
  Menu,
  Network,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Hire a Developer", href: "/hire-a-developer" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

const serviceGroups = [
  {
    title: "AI & Connected Systems",
    description: "Automate tasks, connect equipment, and organize customer information.",
    services: [
      { label: "AI Agents & Automation", href: "/services/ai-machine-learning", icon: BrainCircuit },
      { label: "IoT Solutions", href: "/services/iot-solutions", icon: Network },
      { label: "Salesforce CRM", href: "/services/salesforce-crm", icon: BriefcaseBusiness },
    ],
  },
  {
    title: "Web & Mobile Applications",
    description: "Build websites and applications for customers and internal teams.",
    services: [
      { label: "Web Development", href: "/services/web-application-development", icon: Code2 },
      { label: "Mobile App Development", href: "/services/mobile-application-development", icon: Smartphone },
    ],
  },
  {
    title: "Cloud, Security & IT",
    description: "Deploy applications, manage infrastructure, and resolve technical issues.",
    services: [
      { label: "Cloud Services", href: "/services/cloud-computing", icon: CloudCog },
      { label: "Cybersecurity", href: "/services/cybersecurity", icon: ShieldCheck },
    ],
  },
] as const;

function Brand() {
  return (
    <Link
      href="/"
      className="group flex w-[200px] shrink-0 items-center overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-sky)] focus-visible:ring-offset-4 min-[375px]:w-[220px] sm:w-[240px] xl:w-[220px]"
      aria-label="Cantabridge Technologies home"
    >
      <Image
        src="/images/Logo_400_200_tm/400_100_transparant.webp"
        alt="Cantabridge Technologies"
        width={400}
        height={100}
        className="block h-auto w-[113.64%] max-w-none shrink-0 -translate-x-[6.25%]"
        sizes="(min-width: 1280px) 250px, (min-width: 640px) 273px, (min-width: 375px) 250px, 228px"
        priority
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const servicesRegionRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (servicesOpen) servicesButtonRef.current?.focus();
        else if (mobileOpen) mobileButtonRef.current?.focus();
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (servicesOpen && !servicesRegionRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [mobileOpen, servicesOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenus = () => {
    setServicesOpen(false);
    setMobileOpen(false);
  };

  return (
    <header className="corporate-nav-type sticky top-0 z-50 border-b border-[color:color-mix(in_srgb,var(--brand-gray)_22%,white)] bg-white/95 shadow-[0_1px_0_color-mix(in_srgb,var(--brand-navy)_8%,transparent)] backdrop-blur-xl">
      <Container className="flex h-[76px] max-w-[1440px] items-center justify-between gap-6 lg:px-8">
        <Brand />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">
          {navigation.slice(0, 2).map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`nav-link ${isActive(item.href) ? "nav-link-active" : ""}`}>
              {item.label}
            </Link>
          ))}

          <div
            ref={servicesRegionRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              ref={servicesButtonRef}
              type="button"
              className="nav-link services-nav-trigger flex appearance-none items-center gap-1.5 bg-transparent"
              aria-expanded={servicesOpen}
              aria-controls="services-mega-menu"
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
              <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              id="services-mega-menu"
              aria-hidden={!servicesOpen}
              className={`fixed left-1/2 top-[76px] w-[min(900px,calc(100vw-48px))] -translate-x-1/2 pt-4 transition-all duration-200 ${servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
            >
              <div className="overflow-hidden rounded-2xl border border-[color:color-mix(in_srgb,var(--brand-gray)_22%,white)] bg-white shadow-[0_24px_70px_color-mix(in_srgb,var(--brand-navy)_18%,transparent)]">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {serviceGroups.map((group) => (
                    <div key={group.title} className="rounded-xl p-3">
                      <p className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--brand-navy)]">{group.title}</p>
                      <p className="mb-3 mt-1.5 min-h-10 text-[13px] leading-5 text-[var(--brand-gray)]">{group.description}</p>
                      <div className="space-y-1">
                        {group.services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link key={service.href} href={service.href} aria-current={isActive(service.href) ? "page" : undefined} onClick={closeMenus} className="group/service flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium tracking-[-0.005em] text-[var(--brand-gray)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand-sky)_7%,white)] hover:text-[var(--brand-navy)] focus-visible:bg-[color:color-mix(in_srgb,var(--brand-sky)_7%,white)] focus-visible:outline-none">
                              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[color:color-mix(in_srgb,var(--brand-gray)_10%,white)] text-[var(--brand-gray)] transition-colors group-hover/service:bg-[color:color-mix(in_srgb,var(--brand-sky)_12%,white)] group-hover/service:text-[var(--brand-blue)]">
                                <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                              </span>
                              {service.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/services" onClick={closeMenus} className="group flex items-center justify-between border-t border-[color:color-mix(in_srgb,var(--brand-gray)_14%,white)] bg-[color:color-mix(in_srgb,var(--brand-gray)_5%,white)] px-6 py-3.5 text-sm font-semibold text-[var(--brand-gray)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand-sky)_10%,white)] hover:text-[var(--brand-blue)]">
                  Explore All Services
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {navigation.slice(2).map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`nav-link ${isActive(item.href) ? "nav-link-active" : ""}`}>
              {item.label}
            </Link>
          ))}

          <Link href="/contact" className="nav-link flex items-center gap-2">
            Discuss Your Project
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            ref={mobileButtonRef}
            type="button"
            className="grid size-11 place-items-center rounded-xl border border-[color:color-mix(in_srgb,var(--brand-gray)_24%,white)] text-[var(--brand-navy)] transition-colors hover:border-[var(--brand-sky)] hover:bg-[color:color-mix(in_srgb,var(--brand-sky)_7%,white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-sky)] xl:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </Container>

      <div id="mobile-navigation" aria-hidden={!mobileOpen} className={`absolute inset-x-0 top-full h-[calc(100dvh-76px)] overflow-y-auto border-t border-[color:color-mix(in_srgb,var(--brand-gray)_14%,white)] bg-white transition-all duration-300 xl:hidden ${mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`}>
        <Container className="flex min-h-full flex-col py-5">
          <nav className="space-y-1" aria-label="Mobile navigation">
            {navigation.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} onClick={closeMenus} className={`mobile-nav-link ${isActive(item.href) ? "mobile-nav-link-active" : ""}`}>
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              className={`mobile-nav-link services-nav-trigger flex w-full appearance-none items-center justify-between bg-transparent ${pathname.startsWith("/services") ? "mobile-nav-link-active" : ""}`}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-menu"
              onClick={() => setMobileServicesOpen((open) => !open)}
            >
              Services
              <ChevronDown aria-hidden="true" className={`size-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>

            <div id="mobile-services-menu" aria-hidden={!mobileServicesOpen} className={`grid transition-[grid-template-rows] duration-300 ${mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="mb-3 ml-3 border-l border-[color:color-mix(in_srgb,var(--brand-gray)_24%,white)] py-2 pl-4">
                  {serviceGroups.map((group) => (
                    <div key={group.title} className="mb-4 last:mb-0">
                      <p className="mb-1.5 text-[13px] font-semibold tracking-[-0.01em] text-[var(--brand-navy)]">{group.title}</p>
                      {group.services.map((service) => (
                        <Link key={service.href} href={service.href} aria-current={isActive(service.href) ? "page" : undefined} onClick={closeMenus} className="block rounded-lg py-2 text-sm font-normal tracking-[-0.005em] text-[var(--brand-gray)] hover:text-[var(--brand-navy)]">
                          {service.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link href="/services" onClick={closeMenus} className="mt-2 flex items-center gap-2 text-sm font-bold text-[var(--brand-blue)]">
                    Explore All Services <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            {navigation.slice(2).map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} onClick={closeMenus} className={`mobile-nav-link ${isActive(item.href) ? "mobile-nav-link-active" : ""}`}>
                {item.label}
              </Link>
            ))}

            <Link href="/contact" onClick={closeMenus} className="mobile-nav-link flex items-center justify-between">
              Discuss Your Project
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
