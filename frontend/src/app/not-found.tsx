import { PageHero } from "@/components/common/PageHero";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFoundPage() {
  return <main><PageHero title="Page not found" description="The requested page does not exist." /><Container className="pb-16"><Link href="/" className="site-button">Return Home</Link></Container></main>;
}
