import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  companyName: "Cantabridge Technologies",
  siteName: "Cantabridge Technologies",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "contact@cantabridgetechnologies.com",
  phone: null,
  address: "Rajasthan, India",
  defaultTitle: "Cantabridge Technologies — AI-First Software Development Company",
  defaultDescription: "AI-First software development company building Agentic AI, Claude-powered solutions, intelligent applications, and modern technology systems for businesses.",
  logoPath: "/images/Logo_400_200_tm/400_100_transparant.webp",
};
