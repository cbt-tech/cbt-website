import { ServicesOverview } from "@/components/services/ServicesOverview";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Services", path: "/services" });

export default function ServicesPage() {
  return <ServicesOverview />;
}
