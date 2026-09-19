import { PageHero } from "@/components/common/PageHero";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/metadata";
export const metadata = createMetadata({ title: "Training", path: "/training" });
export default function TrainingPage() {
  return <main><PageHero title="Technology Training" description="Contact our team to discuss your technology training requirements, availability, and suitable next steps." /><Container className="pb-16"><Link href="/contact" className="site-button">Discuss Training Requirements</Link></Container></main>;
}
