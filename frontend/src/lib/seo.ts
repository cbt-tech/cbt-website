import { siteConfig } from "@/config/site-config";

export function getAbsoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.siteUrl).toString();
}
