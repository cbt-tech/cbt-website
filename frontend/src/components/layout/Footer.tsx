import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site-config";

const quickLinks = [
  ["Home", "/"], ["About Us", "/about"], ["Services", "/services"],
  ["Hire a Developer", "/hire-a-developer"], ["Careers", "/careers"], ["Contact", "/contact"],
] as const;

const serviceLinks = [
  ["AI Agents & Automation", "/services/ai-machine-learning"],
  ["IoT Solutions", "/services/iot-solutions"],
  ["Cybersecurity", "/services/cybersecurity"],
  ["Salesforce CRM", "/services/salesforce-crm"],
  ["Web Development", "/services/web-application-development"],
  ["Mobile App Development", "/services/mobile-application-development"],
  ["Cloud Services", "/services/cloud-computing"],
] as const;

const legalLinks = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms and Conditions", "/terms"],
  ["Cookie Policy", "/cookie-policy"],
] as const;

const countries = [
  { code: "in", name: "India", label: "India" },
  { code: "ae", name: "United Arab Emirates", label: "UAE" },
  { code: "us", name: "United States of America", label: "USA" },
  { code: "au", name: "Australia", label: "Australia" },
  { code: "gb", name: "United Kingdom", label: "UK" },
] as const;

const linkClass = "w-fit text-sm leading-6 text-[#545d6b] transition-colors hover:text-[var(--brand-blue)] focus-visible:text-[var(--brand-blue)] focus-visible:outline-none";
const headingClass = "text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-navy)]";

export function Footer() {
  return (
    <footer className="border-t border-[#e3e7ed] bg-white text-[var(--brand-navy)]">
      <Container className="max-w-[1440px] px-6 py-20 sm:py-24 lg:px-10 lg:py-28 xl:px-16">
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-12 xl:gap-x-12">
          <div className="md:col-span-2 xl:col-span-4 xl:pr-8">
            <Link href="/" className="inline-flex w-[280px] max-w-full overflow-hidden align-top outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-4 sm:w-[300px] xl:w-[280px]" aria-label="Cantabridge Technologies home">
              <Image src={siteConfig.logoPath ?? "/images/Logo_400_200_tm/400_100_transparant.webp"} alt="Cantabridge Technologies" width={400} height={100} sizes="(min-width: 1280px) 319px, (min-width: 640px) 341px, 319px" className="block h-auto w-[113.64%] max-w-none shrink-0 -translate-x-[6.25%]" />
            </Link>
            <h2 className="mt-8 text-xl font-semibold tracking-[-0.025em]">Cantabridge Technologies</h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#606977]">
              Custom AI solutions, business applications, and connected systems, with the cloud infrastructure and technical support to keep them working.
            </p>
          </div>

          <nav className="xl:col-span-2" aria-label="Quick links">
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="mt-6 grid gap-2.5">
              {quickLinks.map(([label, href]) => <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>)}
            </ul>
          </nav>

          <nav className="xl:col-span-3" aria-label="Services">
            <h2 className={headingClass}>Our Services</h2>
            <ul className="mt-6 grid gap-2.5">
              {serviceLinks.map(([label, href]) => <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>)}
            </ul>
          </nav>

          <div className="md:col-span-2 xl:col-span-3">
            <h2 className={headingClass}>Contact Information</h2>
            <address className="mt-6 grid gap-4 not-italic">
              <a href={`mailto:${siteConfig.email}`} className="flex min-w-0 items-start gap-3 text-sm leading-6 text-[#545d6b] transition-colors hover:text-[var(--brand-blue)]">
                <Mail className="mt-1 size-4 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" /><span className="break-all">contact@cantabridgetechnologies.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm leading-6 text-[#545d6b]">
                <MapPin className="mt-1 size-4 shrink-0 text-[var(--brand-blue)]" aria-hidden="true" /><span>Rajasthan, India</span>
              </div>
            </address>
            <section aria-labelledby="footer-global-vision" className="mt-8 border-t border-[#e3e7ed] pt-6">
              <h2 id="footer-global-vision" className={headingClass}>Our Global Vision</h2>
              <p className="mt-3 text-sm leading-6 text-[#606977]">We aspire to support businesses worldwide with dependable technology services, including in India, the UAE, the USA, Australia, the UK, and beyond.</p>
              <ul aria-label="Countries in our vision" className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                {countries.map((country) => (
                  <li key={country.code} className="flex items-center gap-1.5 text-xs font-medium text-[#545d6b]">
                    <Image src={`/images/flags/${country.code}.png`} alt={`${country.name} flag`} width={32} height={22} className="h-[22px] w-8 shrink-0 object-contain" />
                    <span>{country.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-[#e3e7ed] pt-7 text-xs text-[#6b7280] sm:mt-20 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {legalLinks.map(([label, href]) => <li key={href}><Link href={href} className="transition-colors hover:text-[var(--brand-blue)]">{label}</Link></li>)}
            </ul>
          </nav>
          <p>© 2026 Cantabridge Technologies. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
