import { ConsultationPage } from "@/components/contact/ConsultationPage";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({
  title: "Book a Free Consultation",
  description: "Book a free technology consultation with Cantabridge Technologies and identify the most practical next step for your business.",
  path: "/contact",
});
export default function ContactPage() { return <ConsultationPage />; }
