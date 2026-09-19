import type { Metadata } from "next";
import { AboutScrollHero } from "@/components/about/AboutScrollHero";
import { AboutPageSections } from "@/components/about/AboutPageSections";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Cantabridge Technologies, providing AI agents, web and mobile apps, IoT engineering, Salesforce CRM, cloud services, and managed IT support.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Cantabridge Technologies",
    description: "Discover how Cantabridge Technologies delivers complete digital solutions, from AI agents and mobile applications to IoT engineering and managed IT services.",
    url: "/about",
    siteName: "Cantabridge Technologies",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutScrollHero />
      <AboutPageSections />
    </main>
  );
}
