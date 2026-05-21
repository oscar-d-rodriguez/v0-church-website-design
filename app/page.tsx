"use client";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { MinistriesSection } from "@/components/sections/ministries-section";
import { YouthSection } from "@/components/sections/youth-section";
import { OfferingSection } from "@/components/sections/offering-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { useLanguage } from "@/lib/language-context";

export default function HomePage() {
  const { language } = useLanguage();

  const marqueeItems = language === "en" 
    ? ["WORSHIP", "COMMUNITY", "FAITH", "LOVE", "SERVICE", "HOPE", "PRAYER"]
    : ["ADORACIÓN", "COMUNIDAD", "FE", "AMOR", "SERVICIO", "ESPERANZA", "ORACIÓN"];

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <Marquee items={marqueeItems} speed={25} />
      <AboutSection />
      <MinistriesSection />
      <YouthSection />
      <Marquee items={marqueeItems} speed={30} direction="right" />
      <OfferingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
