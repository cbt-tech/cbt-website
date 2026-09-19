import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { seoConfig } from "@/config/seo-config";
import { siteConfig } from "@/config/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: seoConfig.defaultTitle, template: seoConfig.titleTemplate },
  description: seoConfig.defaultDescription,
  icons: {
    icon: "/images/Logo_160_160_tm/160_160.svg",
    apple: "/images/Logo_160_160_tm/160_160.webp",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><PageShell>{children}</PageShell></body></html>;
}
