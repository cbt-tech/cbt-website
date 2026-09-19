import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

interface PageHeroProps { title: string; description?: string }

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <Section>
      <Container>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[var(--brand-navy)] sm:text-6xl">{title}</h1>
        {description ? <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--brand-gray)]">{description}</p> : null}
      </Container>
    </Section>
  );
}
