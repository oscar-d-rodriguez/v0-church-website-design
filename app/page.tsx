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
import { getCmsHomeContent } from "@/lib/cms-home";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  buildCanonicalUrl,
  getSiteConfigurationPayload,
  normalizeSiteLocale,
  resolveSiteDomain,
} from "@/lib/site-configuration";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = normalizeSiteLocale(
    cookieStore.get("church-language")?.value || process.env.NEXT_PUBLIC_CMS_LOCALE,
  );
  const payload = await getSiteConfigurationPayload({ locale, preview: false });
  const seo = payload?.siteConfiguration?.defaultSeoMetadata;
  const siteDomain = resolveSiteDomain();

  return {
    alternates: {
      canonical: buildCanonicalUrl("/", siteDomain),
    },
    robots: {
      index: !seo?.hideFromSearchEngines,
      follow: !seo?.hideFromSearchEngines,
    },
  };
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const locale = normalizeSiteLocale(
    cookieStore.get("church-language")?.value || process.env.NEXT_PUBLIC_CMS_LOCALE,
  );
  const cmsData = await getCmsHomeContent({ locale, preview: false });

  return (
    <main className="min-h-screen">
      <NewsletterPopupLoader />
      <Navigation />
      <HeroSection cmsHero={cmsData?.home.hero} />
      <Marquee speed={25} />
      <AboutSection aboutSection={cmsData?.home.about} />
      <MinistriesSection ministriesSection={cmsData?.home.ministries} />
      <YouthSection youthSection={cmsData?.home.youth} />
      <Marquee speed={30} direction="right" />
      <EventsSection />
      <OfferingSection offeringSection={cmsData?.home.offering} />
      <ServiceTimesSection serviceTimesSection={cmsData?.home.serviceTimes} />
      <ContactSection contactSection={cmsData?.home.contact} />
      <Footer />
    </main>
  );
}
