import Link from "next/link";
import { siteConfig } from "@/config/site-config";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import { Container } from "@/components/ui/Container";

export type PolicySection = { id: string; title: string; paragraphs: readonly string[] };

export function LegalPolicyPage({ title, introduction, sections }: { title: string; introduction: string; sections: readonly PolicySection[] }) {
  const email = siteConfig.email?.toLowerCase() ?? "contact@cantabridgetechnologies.com";
  return (
    <main className="bg-white py-16 sm:py-24">
      <Container className="max-w-5xl">
        <p className="section-eyebrow">Cantabridge Technologies / Legal</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--brand-navy)] sm:text-6xl">{title}</h1>
        <p className="mt-5 text-sm text-[var(--brand-gray)]">Last updated: 17 September 2026 · Version {PRIVACY_POLICY_VERSION}</p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--brand-gray)]">{introduction}</p>
        <nav aria-label="Policy contents" className="my-10 rounded-xl border border-[#d7dce4] bg-[#f6f8fb] p-6">
          <h2 className="font-semibold text-[var(--brand-navy)]">On this page</h2>
          <ol className="mt-4 grid list-decimal gap-2 pl-5 sm:grid-cols-2">
            {sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-sm text-[var(--brand-blue)] underline underline-offset-2">{section.title}</a></li>)}
          </ol>
        </nav>
        <div className="max-w-3xl space-y-10">
          {sections.map((section, index) => <section id={section.id} key={section.id} className="scroll-mt-28"><h2 className="text-2xl font-semibold text-[var(--brand-navy)]">{index + 1}. {section.title}</h2><div className="mt-4 space-y-4 text-base leading-7 text-[var(--brand-gray)]">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}
          <section className="rounded-xl border border-[#d7dce4] p-6" aria-labelledby="legal-contact"><h2 id="legal-contact" className="text-xl font-semibold text-[var(--brand-navy)]">Contact Cantabridge Technologies</h2><address className="mt-3 space-y-2 text-sm leading-6 not-italic text-[var(--brand-gray)]"><p>{siteConfig.address}</p><p><a href={`mailto:${email}`} className="text-[var(--brand-blue)] underline">{email}</a></p></address></section>
          <nav aria-label="Related policies" className="flex flex-wrap gap-5 text-sm text-[var(--brand-blue)] underline underline-offset-2"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms">Terms and Conditions</Link><Link href="/cookie-policy">Cookie Policy</Link></nav>
        </div>
      </Container>
    </main>
  );
}
