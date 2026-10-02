import { cache } from "react";

export type SiteLocale = "en-US" | "es";

export interface CmsAsset {
  url: string;
  title: string;
  description: string | null;
  width: number | null;
  height: number | null;
  contentType: string;
}

export interface SeoMetadata {
  pageTitle: string;
  description: string;
  socialTitle: string;
  socialDescription: string;
  socialImage: CmsAsset | null;
  hideFromSearchEngines: boolean;
}

export interface CmsSiteLink {
  label: string;
  href: string;
  isOffering: boolean;
}

export interface CmsSiteSocialLink {
  platform: "facebook" | "instagram" | "youtube";
  href: string;
}

export interface SiteConfiguration {
  internalName: string;
  siteKey: string;
  organizationName: string;
  organizationLogo: CmsAsset | null;
  organizationDescription?: string;
  navigationItems?: CmsSiteLink[];
  offeringUrl?: string | null;
  footer?: {
    tagline: string | null;
    quickLinksHeading?: string | null;
    connectHeading?: string | null;
    copyright?: string | null;
    quickLinks: CmsSiteLink[];
    socialLinks: CmsSiteSocialLink[];
    contactInfo: {
      address: string | null;
      phone: string | null;
      email: string | null;
    };
  };
  defaultSeoMetadata: SeoMetadata;
}

export interface SiteConfigurationPayload {
  source: "contentful" | "unavailable";
  locale: SiteLocale;
  preview: boolean;
  siteConfiguration: SiteConfiguration | null;
}

const DEFAULT_SITE_DOMAIN = "https://www.iglesiahosanna.com";
const DEFAULT_BACKEND_API_BASE_URL = "http://localhost:8080/api";

export function normalizeSiteLocale(value?: string): SiteLocale {
  return value === "es" ? "es" : "en-US";
}

export function resolveBackendApiBaseUrl(): string {
  const explicitUrl = process.env.BACKEND_API_BASE_URL || process.env.CMS_API_BASE_URL;
  if (explicitUrl) {
    const normalizedUrl = explicitUrl.replace(/\/$/, "");
    return normalizedUrl.endsWith("/api") ? normalizedUrl : `${normalizedUrl}/api`;
  }

  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicApiUrl) {
    const normalizedUrl = publicApiUrl.replace(/\/$/, "");
    return normalizedUrl.endsWith("/api") ? normalizedUrl : `${normalizedUrl}/api`;
  }

  return DEFAULT_BACKEND_API_BASE_URL;
}

export function resolveSiteDomain(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_DOMAIN).replace(/\/$/, "");
}

export function buildCanonicalUrl(pathname: string, siteDomain: string): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteDomain}${normalizedPath}`;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseSiteConfigurationPayload(value: unknown): SiteConfigurationPayload | null {
  if (!isObject(value)) {
    return null;
  }

  const source = value.source;
  const locale = value.locale;
  const preview = value.preview;

  if ((source !== "contentful" && source !== "unavailable") || (locale !== "en-US" && locale !== "es") || typeof preview !== "boolean") {
    return null;
  }

  const siteConfiguration = (value as { siteConfiguration?: unknown }).siteConfiguration ?? null;

  return {
    source,
    locale,
    preview,
    siteConfiguration: siteConfiguration as SiteConfiguration | null,
  };
}

export const getSiteConfigurationPayload = cache(async ({
  locale,
  preview = false,
}: {
  locale?: SiteLocale;
  preview?: boolean;
} = {}): Promise<SiteConfigurationPayload | null> => {
  const resolvedLocale = locale || normalizeSiteLocale(process.env.NEXT_PUBLIC_CMS_LOCALE);

  try {
    const url = new URL(`${resolveBackendApiBaseUrl()}/content/site-configuration`);
    url.searchParams.set("locale", resolvedLocale);
    if (preview) {
      url.searchParams.set("preview", "1");
    }

    const response = await fetch(url.toString(), {
      headers: preview && process.env.CMS_PREVIEW_KEY
        ? { "x-cms-preview-key": process.env.CMS_PREVIEW_KEY }
        : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = parseSiteConfigurationPayload(await response.json());
    return payload;
  } catch {
    return null;
  }
});
