import type { Metadata } from "next";

import { siteConfig } from "@/config/site-config";

interface MetadataInput {
  title: string;
  description?: string;
  path?: string;
}

export function createMetadata({
  title,
  description = siteConfig.defaultDescription,
  path = "/",
}: MetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: siteConfig.siteName, type: "website" },
  };
}
