import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/common/PageHero";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/data/case-studies";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { createMetadata } from "@/lib/metadata";

interface CaseStudyPageProps { params: Promise<{ slug: string }> }
export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = getCaseStudyBySlug((await params).slug);
  if (!caseStudy) return {};
  return createMetadata({ title: caseStudy.seo?.title ?? caseStudy.title, description: caseStudy.seo?.description ?? caseStudy.summary, path: `/case-studies/${caseStudy.slug}` });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug((await params).slug);
  if (!caseStudy) notFound();
  return <main><PageHero title={caseStudy.title} description={caseStudy.summary} /><Container className="flex flex-wrap items-center gap-6 pb-16"><Link href="/contact" className="site-button">Discuss a Similar Project</Link><Link href="/case-studies" className="underline underline-offset-4">All Case Studies</Link></Container></main>;
}
