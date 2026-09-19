import type { Metadata } from "next";
import { ScrollHero } from "@/components/home/ScrollHero";
import { AboutCantabridge } from "@/components/home/AboutCantabridge";
import { WhatWeDoShowcase } from "@/components/home/WhatWeDoShowcase";
import { WhyChooseCantabridge } from "@/components/home/WhyChooseCantabridge";
import { FeaturedCaseStudies } from "@/components/home/FeaturedCaseStudies";
import { GetInTouch } from "@/components/home/GetInTouch";

export const metadata: Metadata = {
  title: { absolute: "AI Solutions & Software Development | Cantabridge Technologies" },
  description: "Cantabridge Technologies builds AI agents, web and mobile apps, and IoT solutions, delivering robust cloud infrastructure, cybersecurity, and IT support.",
};

export default function HomePage() {
  return (
    <main>
      <ScrollHero />
      <AboutCantabridge />
      <WhatWeDoShowcase />
      <WhyChooseCantabridge />
      <FeaturedCaseStudies />
      <GetInTouch />
    </main>
  );
}
