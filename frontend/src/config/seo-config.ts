import { siteConfig } from "@/config/site-config";

export const seoConfig = {
  titleTemplate: `%s | ${siteConfig.siteName}`,
  defaultTitle: siteConfig.defaultTitle,
  defaultDescription: siteConfig.defaultDescription,
} as const;
