import type { CmsAsset, SeoMetadata, SiteLocale } from "@/lib/site-configuration";
import { normalizeSiteLocale, resolveBackendApiBaseUrl } from "@/lib/site-configuration";

export interface CmsMinistryLeader {
  name: string | null;
  image: CmsAsset | null;
  imageAltText: string | null;
  roleLabel: string | null;
}

export interface CmsMinistryJoinCta {
  heading: string | null;
  description: string | null;
  label: string | null;
}

export interface CmsMinistryDetail {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  detailDescription: string;
  heroImage: CmsAsset | null;
  heroImageAltText: string | null;
  leader: CmsMinistryLeader | null;
  whatWeDoItems: string[];
  schedule: string | null;
  contactEmail: string | null;
  joinCta: CmsMinistryJoinCta | null;
  seoMetadata: SeoMetadata;
}

interface CmsMinistryResponse {
  source?: unknown;
  locale?: unknown;
  ministry?: unknown;
}

function isCmsMinistryDetail(value: unknown): value is CmsMinistryDetail {
  return typeof value === "object" && value !== null && typeof (value as CmsMinistryDetail).slug === "string";
}

export async function getCmsMinistryContent({
  slug,
  locale = "en-US",
}: {
  slug: string;
  locale?: SiteLocale | string;
}): Promise<{ source: "contentful" | "unavailable"; locale: SiteLocale; ministry: CmsMinistryDetail | null } | null> {
  const resolvedLocale = normalizeSiteLocale(locale);

  try {
    const url = new URL(`${resolveBackendApiBaseUrl()}/content/ministries/${encodeURIComponent(slug)}`);
    url.searchParams.set("locale", resolvedLocale);

    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as CmsMinistryResponse;
    return {
      source: payload.source === "contentful" ? "contentful" : "unavailable",
      locale: payload.locale === "es" ? "es" : "en-US",
      ministry: isCmsMinistryDetail(payload.ministry) ? payload.ministry : null,
    };
  } catch {
    return null;
  }
}
