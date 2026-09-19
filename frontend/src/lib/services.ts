import { services } from "@/data/services";

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
