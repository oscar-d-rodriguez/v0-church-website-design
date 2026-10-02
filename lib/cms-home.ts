export interface CmsHeroSlide {
  title: string;
  imageUrl: string;
  imageAlt: string;
  headline?: string | null;
  subtitle?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
}

export interface CmsHomeHero {
  contentMode: "shared" | "perSlide";
  welcome: string;
  subtitle: string;
  ctaLabel: string;
  ctaUrl: string;
  slides: CmsHeroSlide[];
}

export interface CmsAboutMedia {
  url: string;
  title: string;
  description: string | null;
  width: number | null;
  height: number | null;
  contentType: string;
}

export interface CmsAboutImage {
  image: CmsAboutMedia | null;
  altText: string | null;
}

export interface CmsAboutCard {
  icon: string;
  headline: string;
  description: string;
}

export interface CmsAboutSection {
  type: "about";
  eyebrow: string;
  headline: string;
  description: string;
  images: {
    main: CmsAboutImage;
    secondary: CmsAboutImage;
    tertiary: CmsAboutImage;
  };
  imageOverlay: {
    badge: string | null;
    headline: string | null;
  } | null;
  cards: CmsAboutCard[];
}

export type CmsHomeAbout = CmsAboutSection;

export interface CmsMinistrySummary {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
}

export interface CmsMinistriesSection {
  type: "ministries";
  eyebrow: string;
  headline: string;
  backgroundImage: CmsAboutMedia | null;
  ministries: CmsMinistrySummary[];
}

export interface CmsYouthActivity {
  icon: string;
  text: string;
}

export interface CmsYouthSection {
  type: "youth";
  eyebrow: string;
  headline: string;
  description: string;
  activitiesHeading: string;
  activities: CmsYouthActivity[];
  primaryCta: {
    label: string;
    url: string;
  } | null;
  images: {
    main: CmsAboutImage & { overlayText: string | null };
    secondary: CmsAboutImage;
    tertiary: CmsAboutImage;
  };
  floatingBadge: string | null;
}

export interface CmsContactServiceTime {
  day: string;
  timeDescription: string;
}

export interface CmsContactSection {
  type: "contact";
  eyebrow: string;
  headline: string;
  contactInfo: {
    address: string | null;
    phone: string | null;
    email: string | null;
  };
  serviceTimes: CmsContactServiceTime[];
  map: {
    embedUrl: string;
    title: string | null;
  } | null;
}

export interface CmsOfferingPoint {
  icon: "sparkles" | "heartHandshake" | "landmark";
  title: string;
  description: string;
}

export interface CmsOfferingSection {
  type: "offering";
  eyebrow: string;
  headline: string;
  description: string;
  cardEyebrow: string;
  cardHeadline: string;
  cardDescription: string;
  donateCta: { label: string; url: string } | null;
  accountLabel: string;
  accountValue: string;
  accountDescription: string;
  givingPoints: CmsOfferingPoint[];
  thankYouHeading: string;
  thankYouDescription: string;
}

export interface CmsServiceTimesSection {
  type: "serviceTimes";
  eyebrow: string;
  headline: string;
  address: string;
  backgroundImage: CmsAboutMedia | null;
  backgroundImageAltText: string | null;
  services: { day: string; time: string; description: string }[];
}

export interface CmsHomePayload {
  source: "contentful" | "fallback";
  locale: string;
  preview: boolean;
  home: {
    locale: string;
    updatedAt: string | null;
    hero: CmsHomeHero;
    about: CmsHomeAbout | null;
    ministries: CmsMinistriesSection | null;
    youth: CmsYouthSection | null;
    contact: CmsContactSection | null;
    offering: CmsOfferingSection | null;
    serviceTimes: CmsServiceTimesSection | null;
  };
}

type CmsHeroMode = "shared" | "perSlide";

interface CmsApiHeroSlide {
  image?: unknown;
  imageAltText?: unknown;
  headline?: unknown;
  subheadline?: unknown;
  primaryCtaLabel?: unknown;
  primaryCtaUrl?: unknown;
}

interface CmsApiHeroSection {
  type?: unknown;
  contentMode?: unknown;
  headline?: unknown;
  subheadline?: unknown;
  primaryCtaLabel?: unknown;
  primaryCtaUrl?: unknown;
  slides?: unknown;
}

interface CmsApiAboutSection {
  type?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  description?: unknown;
  images?: unknown;
  imageOverlay?: unknown;
  cards?: unknown;
}

interface CmsApiMinistriesSection {
  type?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  backgroundImage?: unknown;
  ministries?: unknown;
}

interface CmsApiYouthSection {
  type?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  description?: unknown;
  activitiesHeading?: unknown;
  activities?: unknown;
  primaryCta?: unknown;
  images?: unknown;
  floatingBadge?: unknown;
}

interface CmsApiContactSection {
  type?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  contactInfo?: unknown;
  serviceTimes?: unknown;
  map?: unknown;
}

interface CmsApiOfferingSection {
  type?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  description?: unknown;
  cardEyebrow?: unknown;
  cardHeadline?: unknown;
  cardDescription?: unknown;
  donateCta?: unknown;
  accountLabel?: unknown;
  accountValue?: unknown;
  accountDescription?: unknown;
  givingPoints?: unknown;
  thankYouHeading?: unknown;
  thankYouDescription?: unknown;
}

interface CmsApiServiceTimesSection {
  type?: unknown;
  eyebrow?: unknown;
  headline?: unknown;
  address?: unknown;
  backgroundImage?: unknown;
  backgroundImageAltText?: unknown;
  services?: unknown;
}

interface CmsApiPage {
  sections?: unknown;
}

interface CmsApiHomeResponse {
  source?: unknown;
  locale?: unknown;
  page?: CmsApiPage | null;
}

function normalizeOptionalText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function normalizeCta(
  label: unknown,
  url: unknown,
): { label: string | null; url: string | null } {
  const normalizedLabel = normalizeOptionalText(label);
  const normalizedUrl = normalizeOptionalText(url);

  if (!normalizedLabel || !normalizedUrl) {
    return { label: null, url: null };
  }

  return { label: normalizedLabel, url: normalizedUrl };
}

function normalizeHeroMode(value: unknown): CmsHeroMode {
  return value === "perSlide" ? "perSlide" : "shared";
}

function mapHeroSlides(rawSlides: unknown, contentMode: CmsHeroMode): CmsHeroSlide[] {
  if (!Array.isArray(rawSlides)) {
    return [];
  }

  return rawSlides
    .map((slide): CmsHeroSlide | null => {
      const candidate = slide as CmsApiHeroSlide;
      const imageUrl = normalizeOptionalText(candidate?.image);

      if (!imageUrl) {
        return null;
      }

      const slideCta = normalizeCta(candidate?.primaryCtaLabel, candidate?.primaryCtaUrl);

      if (contentMode === "shared") {
        return {
          title: "",
          imageUrl,
          imageAlt: normalizeOptionalText(candidate?.imageAltText) || "",
        };
      }

      return {
        title: "",
        imageUrl,
        imageAlt: normalizeOptionalText(candidate?.imageAltText) || "",
        headline: normalizeOptionalText(candidate?.headline),
        subtitle: normalizeOptionalText(candidate?.subheadline),
        ctaLabel: slideCta.label,
        ctaUrl: slideCta.url,
      };
    })
    .filter((slide): slide is CmsHeroSlide => Boolean(slide));
}

function mapHeroSection(rawSection: CmsApiHeroSection): CmsHomeHero {
  const contentMode = normalizeHeroMode(rawSection.contentMode);
  const heroCta = normalizeCta(rawSection.primaryCtaLabel, rawSection.primaryCtaUrl);
  const slides = mapHeroSlides(rawSection.slides, contentMode);

  return {
    contentMode,
    welcome: contentMode === "shared" ? normalizeOptionalText(rawSection.headline) || "" : "",
    subtitle: contentMode === "shared" ? normalizeOptionalText(rawSection.subheadline) || "" : "",
    ctaLabel: contentMode === "shared" ? heroCta.label || "" : "",
    ctaUrl: contentMode === "shared" ? heroCta.url || "" : "",
    slides,
  };
}

function mapAboutMedia(rawMedia: unknown): CmsAboutMedia | null {
  const candidate = rawMedia as {
    url?: unknown;
    title?: unknown;
    description?: unknown;
    width?: unknown;
    height?: unknown;
    contentType?: unknown;
  };
  const url = normalizeOptionalText(candidate?.url);

  if (!url) {
    return null;
  }

  return {
    url,
    title: normalizeOptionalText(candidate?.title) || "",
    description: normalizeOptionalText(candidate?.description),
    width: typeof candidate?.width === "number" ? candidate.width : null,
    height: typeof candidate?.height === "number" ? candidate.height : null,
    contentType: normalizeOptionalText(candidate?.contentType) || "",
  };
}

function mapAboutImage(rawImage: unknown): CmsAboutImage {
  const candidate = rawImage as { image?: unknown; altText?: unknown };

  return {
    image: mapAboutMedia(candidate?.image),
    altText: normalizeOptionalText(candidate?.altText),
  };
}

function mapAboutSection(rawSection: CmsApiAboutSection): CmsAboutSection {
  const rawImages = rawSection.images as {
    main?: unknown;
    secondary?: unknown;
    tertiary?: unknown;
  } | undefined;
  const rawOverlay = rawSection.imageOverlay as {
    badge?: unknown;
    headline?: unknown;
  } | null | undefined;
  const rawCards = Array.isArray(rawSection.cards) ? rawSection.cards : [];

  return {
    type: "about",
    eyebrow: normalizeOptionalText(rawSection.eyebrow) || "",
    headline: normalizeOptionalText(rawSection.headline) || "",
    description: normalizeOptionalText(rawSection.description) || "",
    images: {
      main: mapAboutImage(rawImages?.main),
      secondary: mapAboutImage(rawImages?.secondary),
      tertiary: mapAboutImage(rawImages?.tertiary),
    },
    imageOverlay: rawOverlay
      ? {
          badge: normalizeOptionalText(rawOverlay.badge),
          headline: normalizeOptionalText(rawOverlay.headline),
        }
      : null,
    cards: rawCards
      .map((rawCard) => {
        const candidate = rawCard as {
          icon?: unknown;
          headline?: unknown;
          description?: unknown;
        };

        return {
          icon: normalizeOptionalText(candidate?.icon) || "",
          headline: normalizeOptionalText(candidate?.headline) || "",
          description: normalizeOptionalText(candidate?.description) || "",
        };
      }),
  };
}

function mapMinistriesSection(rawSection: CmsApiMinistriesSection): CmsMinistriesSection {
  const rawMinistries = Array.isArray(rawSection.ministries) ? rawSection.ministries : [];

  return {
    type: "ministries",
    eyebrow: normalizeOptionalText(rawSection.eyebrow) || "",
    headline: normalizeOptionalText(rawSection.headline) || "",
    backgroundImage: mapAboutMedia(rawSection.backgroundImage),
    ministries: rawMinistries.map((rawMinistry) => {
      const candidate = rawMinistry as {
        slug?: unknown;
        icon?: unknown;
        title?: unknown;
        shortDescription?: unknown;
      };

      return {
        slug: normalizeOptionalText(candidate?.slug) || "",
        icon: normalizeOptionalText(candidate?.icon) || "",
        title: normalizeOptionalText(candidate?.title) || "",
        shortDescription: normalizeOptionalText(candidate?.shortDescription) || "",
      };
    }),
  };
}

function mapYouthSection(rawSection: CmsApiYouthSection): CmsYouthSection {
  const rawActivities = Array.isArray(rawSection.activities) ? rawSection.activities : [];
  const rawImages = rawSection.images as {
    main?: { image?: unknown; altText?: unknown; overlayText?: unknown };
    secondary?: unknown;
    tertiary?: unknown;
  } | undefined;
  const rawCta = rawSection.primaryCta as { label?: unknown; url?: unknown } | null | undefined;
  const label = normalizeOptionalText(rawCta?.label);
  const url = normalizeOptionalText(rawCta?.url);

  return {
    type: "youth",
    eyebrow: normalizeOptionalText(rawSection.eyebrow) || "",
    headline: normalizeOptionalText(rawSection.headline) || "",
    description: normalizeOptionalText(rawSection.description) || "",
    activitiesHeading: normalizeOptionalText(rawSection.activitiesHeading) || "",
    activities: rawActivities.map((rawActivity) => {
      const candidate = rawActivity as { icon?: unknown; text?: unknown };

      return {
        icon: normalizeOptionalText(candidate?.icon) || "",
        text: normalizeOptionalText(candidate?.text) || "",
      };
    }),
    primaryCta: label && url ? { label, url } : null,
    images: {
      main: {
        image: mapAboutMedia(rawImages?.main?.image),
        altText: normalizeOptionalText(rawImages?.main?.altText),
        overlayText: normalizeOptionalText(rawImages?.main?.overlayText),
      },
      secondary: mapAboutImage(rawImages?.secondary),
      tertiary: mapAboutImage(rawImages?.tertiary),
    },
    floatingBadge: normalizeOptionalText(rawSection.floatingBadge),
  };
}

function mapContactSection(rawSection: CmsApiContactSection): CmsContactSection {
  const rawContactInfo = rawSection.contactInfo as {
    address?: unknown;
    phone?: unknown;
    email?: unknown;
  } | undefined;
  const rawServiceTimes = Array.isArray(rawSection.serviceTimes) ? rawSection.serviceTimes : [];
  const rawMap = rawSection.map as { embedUrl?: unknown; title?: unknown } | null | undefined;
  const embedUrl = normalizeOptionalText(rawMap?.embedUrl);

  return {
    type: "contact",
    eyebrow: normalizeOptionalText(rawSection.eyebrow) || "",
    headline: normalizeOptionalText(rawSection.headline) || "",
    contactInfo: {
      address: normalizeOptionalText(rawContactInfo?.address),
      phone: normalizeOptionalText(rawContactInfo?.phone),
      email: normalizeOptionalText(rawContactInfo?.email),
    },
    serviceTimes: rawServiceTimes.map((rawServiceTime) => {
      const candidate = rawServiceTime as { day?: unknown; timeDescription?: unknown };

      return {
        day: normalizeOptionalText(candidate?.day) || "",
        timeDescription: normalizeOptionalText(candidate?.timeDescription) || "",
      };
    }),
    map: embedUrl
      ? {
          embedUrl,
          title: normalizeOptionalText(rawMap?.title),
        }
      : null,
  };
}

function mapOfferingSection(rawSection: CmsApiOfferingSection): CmsOfferingSection {
  const rawCta = rawSection.donateCta as { label?: unknown; url?: unknown } | null | undefined;
  const label = normalizeOptionalText(rawCta?.label);
  const url = normalizeOptionalText(rawCta?.url);
  const givingPoints = Array.isArray(rawSection.givingPoints) ? rawSection.givingPoints : [];

  return {
    type: "offering",
    eyebrow: normalizeOptionalText(rawSection.eyebrow) || "",
    headline: normalizeOptionalText(rawSection.headline) || "",
    description: normalizeOptionalText(rawSection.description) || "",
    cardEyebrow: normalizeOptionalText(rawSection.cardEyebrow) || "",
    cardHeadline: normalizeOptionalText(rawSection.cardHeadline) || "",
    cardDescription: normalizeOptionalText(rawSection.cardDescription) || "",
    donateCta: label && url ? { label, url } : null,
    accountLabel: normalizeOptionalText(rawSection.accountLabel) || "",
    accountValue: normalizeOptionalText(rawSection.accountValue) || "",
    accountDescription: normalizeOptionalText(rawSection.accountDescription) || "",
    givingPoints: givingPoints.map((point) => {
      const candidate = point as { icon?: unknown; title?: unknown; description?: unknown };
      const icon = normalizeOptionalText(candidate?.icon);
      return {
        icon: icon === "heartHandshake" || icon === "landmark" ? icon : "sparkles",
        title: normalizeOptionalText(candidate?.title) || "",
        description: normalizeOptionalText(candidate?.description) || "",
      };
    }),
    thankYouHeading: normalizeOptionalText(rawSection.thankYouHeading) || "",
    thankYouDescription: normalizeOptionalText(rawSection.thankYouDescription) || "",
  };
}

function mapServiceTimesSection(rawSection: CmsApiServiceTimesSection): CmsServiceTimesSection {
  const services = Array.isArray(rawSection.services) ? rawSection.services : [];
  return {
    type: "serviceTimes",
    eyebrow: normalizeOptionalText(rawSection.eyebrow) || "",
    headline: normalizeOptionalText(rawSection.headline) || "",
    address: normalizeOptionalText(rawSection.address) || "",
    backgroundImage: mapAboutMedia(rawSection.backgroundImage),
    backgroundImageAltText: normalizeOptionalText(rawSection.backgroundImageAltText),
    services: services.map((service) => {
      const candidate = service as { day?: unknown; time?: unknown; description?: unknown };
      return {
        day: normalizeOptionalText(candidate?.day) || "",
        time: normalizeOptionalText(candidate?.time) || "",
        description: normalizeOptionalText(candidate?.description) || "",
      };
    }),
  };
}

function mapApiResponseToCmsPayload(apiResponse: CmsApiHomeResponse, preview: boolean): CmsHomePayload | null {
  const page = apiResponse.page;
  const sections = Array.isArray(page?.sections) ? page.sections : [];
  const heroSection = sections.find((section) => {
    const candidate = section as CmsApiHeroSection;
    return candidate?.type === "hero";
  }) as CmsApiHeroSection | undefined;
  const aboutSection = sections.find((section) => {
    const candidate = section as CmsApiAboutSection;
    return candidate?.type === "about";
  }) as CmsApiAboutSection | undefined;
  const ministriesSection = sections.find((section) => {
    const candidate = section as CmsApiMinistriesSection;
    return candidate?.type === "ministries";
  }) as CmsApiMinistriesSection | undefined;
  const youthSection = sections.find((section) => {
    const candidate = section as CmsApiYouthSection;
    return candidate?.type === "youth";
  }) as CmsApiYouthSection | undefined;
  const contactSection = sections.find((section) => {
    const candidate = section as CmsApiContactSection;
    return candidate?.type === "contact";
  }) as CmsApiContactSection | undefined;
  const offeringSection = sections.find((section) => {
    const candidate = section as CmsApiOfferingSection;
    return candidate?.type === "offering";
  }) as CmsApiOfferingSection | undefined;
  const serviceTimesSection = sections.find((section) => {
    const candidate = section as CmsApiServiceTimesSection;
    return candidate?.type === "serviceTimes";
  }) as CmsApiServiceTimesSection | undefined;

  if (!heroSection) {
    return null;
  }

  const hero = mapHeroSection(heroSection);
  const about = aboutSection ? mapAboutSection(aboutSection) : null;
  const ministries = ministriesSection ? mapMinistriesSection(ministriesSection) : null;
  const youth = youthSection ? mapYouthSection(youthSection) : null;
  const contact = contactSection ? mapContactSection(contactSection) : null;
  const offering = offeringSection ? mapOfferingSection(offeringSection) : null;
  const serviceTimes = serviceTimesSection ? mapServiceTimesSection(serviceTimesSection) : null;
  const locale = normalizeOptionalText(apiResponse.locale) || "en-US";

  return {
    source: apiResponse.source === "contentful" ? "contentful" : "fallback",
    locale,
    preview,
    home: {
      locale,
      updatedAt: null,
      hero,
      about,
          ministries,
          youth,
          contact,
          offering,
          serviceTimes,
    },
  };
}

function resolveApiBaseUrl() {
  const explicitServerUrl = process.env.CMS_API_BASE_URL;
  if (explicitServerUrl) {
    const normalizedUrl = explicitServerUrl.replace(/\/$/, "");
    return normalizedUrl.endsWith("/api") ? normalizedUrl : `${normalizedUrl}/api`;
  }

  const nextPublicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (nextPublicApiUrl) {
    const normalizedUrl = nextPublicApiUrl.replace(/\/$/, "");
    return normalizedUrl.endsWith("/api") ? normalizedUrl : `${normalizedUrl}/api`;
  }

  return "http://localhost:8080/api";
}

export async function getCmsHomeContent({
  locale = "en-US",
  preview = false,
}: {
  locale?: string;
  preview?: boolean;
} = {}): Promise<CmsHomePayload | null> {
  try {
    const baseUrl = resolveApiBaseUrl();
    const url = new URL(`${baseUrl}/content/pages/home`);
    url.searchParams.set("locale", locale);
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

    const payload = (await response.json()) as CmsApiHomeResponse;
    return mapApiResponseToCmsPayload(payload, preview);
  } catch {
    return null;
  }
}
