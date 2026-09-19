interface SectionHeadingProps { title: string; description?: string }

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div>
      <h2 className="brand-section-heading text-[var(--brand-navy)]">{title}</h2>
      {description ? <p className="mt-2 text-[var(--brand-gray)]">{description}</p> : null}
    </div>
  );
}
