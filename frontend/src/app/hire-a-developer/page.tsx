import { HireDeveloperPage } from "@/components/hire/HireDeveloperPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Hire Developers for Your Next Project",
  description: "Hire developers for web, mobile, AI, Salesforce, IoT, cloud, and full-stack projects through Cantabridge Technologies.",
  path: "/hire-a-developer",
});

export default function HireADeveloperPage() {
  return <HireDeveloperPage />;
}
