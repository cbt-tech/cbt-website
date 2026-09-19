import type { Metadata } from "next";
import { CareersPage as CareersExperience } from "@/components/careers/CareersPage";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Careers",
    description: "Explore career areas at Cantabridge Technologies in software development, AI, IoT, Salesforce, and cloud. Share your profile for future opportunities.",
    path: "/careers",
  }),
  openGraph: {
    title: "Careers | Cantabridge Technologies",
    description: "Tell us what you build, how you solve problems, and where you want to contribute. Share your profile for future opportunities at Cantabridge Technologies.",
    url: "/careers",
    siteName: "Cantabridge Technologies",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersExperience />;
}
