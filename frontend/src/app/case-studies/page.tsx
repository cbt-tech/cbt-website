import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/data/case-studies";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Case Studies", path: "/case-studies" });

export default function CaseStudiesPage() {
  return <main><PageHero title="Case Studies" description="Explore technology solutions spanning connected operations, cloud infrastructure, and enterprise knowledge." /><Container><ul className="grid gap-6 pb-16 md:grid-cols-3">{caseStudies.map((caseStudy) => <li className="min-w-0 border border-slate-200 p-6" key={caseStudy.id}><h2 className="text-xl font-semibold text-[var(--brand-navy)]"><Link className="underline underline-offset-4" href={`/case-studies/${caseStudy.slug}`}>{caseStudy.title}</Link></h2><p className="mt-4 leading-7 text-[var(--brand-gray)]">{caseStudy.summary}</p></li>)}</ul></Container></main>;
}
