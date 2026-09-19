import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { services } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/lib/services";

interface ServicePageProps { params: Promise<{ slug: string }> }
export const dynamicParams = false;
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  const metadata = createMetadata({ title: service.seo?.title ?? service.title, description: service.seo?.description ?? service.shortDescription, path: `/services/${service.slug}` });
  if (!service.seo?.openGraphTitle && !service.seo?.openGraphDescription) return metadata;
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      title: service.seo.openGraphTitle ?? service.seo.title,
      description: service.seo.openGraphDescription ?? service.seo.description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
