import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  buildCanonicalUrl,
  getSiteConfigurationPayload,
  normalizeSiteLocale,
  resolveSiteDomain,
} from "@/lib/site-configuration";
import { getCmsMinistryContent } from "@/lib/cms-ministry";

interface MinistriesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MinistriesLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = normalizeSiteLocale(
    cookieStore.get("church-language")?.value || process.env.NEXT_PUBLIC_CMS_LOCALE,
  );
  const payload = await getSiteConfigurationPayload({ locale, preview: false });
  const ministryPayload = await getCmsMinistryContent({ slug, locale });
  const seo = ministryPayload?.ministry?.seoMetadata || payload?.siteConfiguration?.defaultSeoMetadata;
  const siteDomain = resolveSiteDomain();

  return {
    alternates: {
      canonical: buildCanonicalUrl(`/ministries/${slug}`, siteDomain),
    },
    robots: {
      index: !seo?.hideFromSearchEngines,
      follow: !seo?.hideFromSearchEngines,
    },
  };
}

export default function MinistriesLayout({ children }: MinistriesLayoutProps) {
  return children;
}
