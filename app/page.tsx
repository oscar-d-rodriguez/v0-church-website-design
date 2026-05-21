"use client";

import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { MinistriesSection } from "@/components/sections/ministries-section";
import { YouthSection } from "@/components/sections/youth-section";
import { EventsSection } from "@/components/sections/events-section";
import { OfferingSection } from "@/components/sections/offering-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { useLanguage } from "@/lib/language-context";

export default function HomePage() {
  const { language } = useLanguage();

  const marqueeItems = language === "en" 
    ? ["WORSHIP", "COMMUNITY", "FAITH", "LOVE", "SERVICE", "HOPE", "PRAYER", "HOSANNA"]
    : ["ADORACION", "COMUNIDAD", "FE", "AMOR", "SERVICIO", "ESPERANZA", "ORACION", "HOSANNA"];

  return (
    <main className="min-h-screen">
      <NewsletterPopup />
      <Navigation />
      <HeroSection />
      <Marquee items={marqueeItems} speed={25} />
      <AboutSection />
      <MinistriesSection />
      <YouthSection />
      <Marquee items={marqueeItems} speed={30} direction="right" />
      <EventsSection />
      <OfferingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
