import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";
import { caseStudies } from "@/data/case-studies";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/services", "/training", "/case-studies", "/hire-a-developer", "/careers", "/contact", "/privacy-policy", "/terms", "/cookie-policy"];
  const paths = [...staticPaths, ...services.map(({ slug }) => `/services/${slug}`), ...caseStudies.map(({ slug }) => `/case-studies/${slug}`)];
  return paths.map((path) => ({ url: new URL(path || "/", siteConfig.siteUrl).toString() }));
}
