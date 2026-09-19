import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface CTASectionProps { title: string; href: string; linkLabel: string }

export function CTASection({ title, href, linkLabel }: CTASectionProps) {
  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-semibold text-[var(--brand-navy)]">{title}</h2>
        <Link className="site-button mt-4" href={href}>{linkLabel}</Link>
      </Container>
    </Section>
  );
}
