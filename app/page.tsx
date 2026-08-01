import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { MinistriesSection } from "@/components/sections/ministries-section";
import { YouthSection } from "@/components/sections/youth-section";
import { EventsSection } from "@/components/sections/events-section";
import { OfferingSection } from "@/components/sections/offering-section";
import { ServiceTimesSection } from "@/components/sections/service-times-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import { NewsletterPopupLoader } from "@/components/newsletter-popup-loader";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <NewsletterPopupLoader />
      <Navigation />
      <HeroSection />
      <Marquee speed={25} />
      <AboutSection />
      <MinistriesSection />
      <YouthSection />
      <Marquee speed={30} direction="right" />
      <EventsSection />
      <OfferingSection />
      <ServiceTimesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
