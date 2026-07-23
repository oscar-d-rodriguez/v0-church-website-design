export interface ChurchEvent {
  id: string;
  slug: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  startDateIso: string;
  endDateIso?: string;
  isMultiDay: boolean;
  dateEn: string;
  dateEs: string;
  timeEn: string;
  timeEs: string;
  date: string;
  time: string;
  locationEn: string;
  locationEs: string;
  imageUrl: string;
  includeHosannaMap: boolean;
  contacts: EventContact[];
  category: "service" | "womens" | "mens" | "fundraiser" | "event" | "outreach" | "meeting";
}

export interface EventContact {
  name: string;
  phone?: string;
}

interface BackendEvent {
  id: string;
  title?: string;
  description?: string;
  date: string;
  endDate?: string;
  location?: string;
  type?: string;
  image?: string;
  includeHosannaMap?: boolean;
  contacts?: EventContact[];
}

const fallbackEvents: ChurchEvent[] = [];

export const events: ChurchEvent[] = fallbackEvents;

export function slugifyEventTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "event";
}

function formatDisplayDate(value: string, locale: "en" | "es") {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function formatDisplayDateRange(
  startValue: string,
  endValue: string | undefined,
  locale: "en" | "es",
) {
  const start = new Date(startValue);

  if (Number.isNaN(start.getTime())) {
    return startValue;
  }

  if (!endValue) {
    return formatDisplayDate(startValue, locale);
  }

  const end = new Date(endValue);
  if (Number.isNaN(end.getTime())) {
    return formatDisplayDate(startValue, locale);
  }

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  if (sameDay) {
    return formatDisplayDate(startValue, locale);
  }

  const startShort = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
  }).format(start);

  const endLong = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(end);

  return `${startShort} - ${endLong}`;
}

function formatDisplayTime(value: string, locale: "en" | "es") {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return locale === "es" ? "Por confirmar" : "TBD";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(parsedDate)
    .replace(/\s+/g, "")
    .toLowerCase();
}

function formatDisplayTimeRange(
  startValue: string,
  endValue: string | undefined,
  locale: "en" | "es",
) {
  const start = new Date(startValue);

  if (Number.isNaN(start.getTime())) {
    return locale === "es" ? "Por confirmar" : "TBD";
  }

  if (!endValue) {
    return formatDisplayTime(startValue, locale);
  }

  const end = new Date(endValue);
  if (Number.isNaN(end.getTime())) {
    return formatDisplayTime(startValue, locale);
  }

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const startTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(start)
    .replace(/\s+/g, "")
    .toLowerCase();

  const endTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(end)
    .replace(/\s+/g, "")
    .toLowerCase();

  if (sameDay) {
    return `${startTime} - ${endTime}`;
  }

  const startLabel = locale === "es" ? "inicio" : "start";
  const endLabel = locale === "es" ? "fin" : "end";
  return `${startTime} (${startLabel}) • ${endTime} (${endLabel})`;
}

function mapCategory(type?: string): ChurchEvent["category"] {
  const normalized = (type ?? "event").toLowerCase().trim();

  switch (normalized) {
    case "service":
      return "service";
    case "womens":
    case "women":
    case "women's":
      return "womens";
    case "mens":
    case "men":
    case "men's":
      return "mens";
    case "fundraiser":
      return "fundraiser";
    case "meeting":
      return "meeting";
    case "outreach":
      return "outreach";
    default:
      return "event";
  }
}

export function mapBackendEvent(event: BackendEvent): ChurchEvent {
  const title = event.title ?? "Untitled Event";
  const startDateIso = event.date;
  const endDateIso = event.endDate;
  const startDate = new Date(startDateIso);
  const endDate = endDateIso ? new Date(endDateIso) : null;
  const isMultiDay =
    !!endDate &&
    !Number.isNaN(startDate.getTime()) &&
    !Number.isNaN(endDate.getTime()) &&
    startDate.toDateString() !== endDate.toDateString();
  const contacts = Array.isArray(event.contacts)
    ? event.contacts
        .filter((contact) => contact?.name?.trim())
        .map((contact) => ({
          name: contact.name.trim(),
          phone: contact.phone?.trim() || undefined,
        }))
    : [];

  const dateEn = formatDisplayDateRange(startDateIso, endDateIso, "en");
  const dateEs = formatDisplayDateRange(startDateIso, endDateIso, "es");
  const timeEn = formatDisplayTimeRange(startDateIso, endDateIso, "en");
  const timeEs = formatDisplayTimeRange(startDateIso, endDateIso, "es");

  return {
    id: event.id,
    slug: slugifyEventTitle(title),
    titleEn: title,
    titleEs: event.title ?? "Evento sin título",
    descriptionEn: event.description ?? "More details coming soon.",
    descriptionEs: event.description ?? "Pronto más detalles.",
    startDateIso,
    endDateIso,
    isMultiDay,
    dateEn,
    dateEs,
    timeEn,
    timeEs,
    date: dateEn,
    time: timeEn,
    locationEn: event.location ?? "Church Campus",
    locationEs: event.location ?? "Campus de la Iglesia",
    imageUrl: event.image ?? "/images/community.jpg",
    includeHosannaMap: Boolean(event.includeHosannaMap),
    contacts,
    category: mapCategory(event.type),
  };
}

export function findEventBySlugOrId(events: ChurchEvent[], value: string) {
  return events.find((event) => event.slug === value || event.id === value);
}

function getEventsApiUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  const baseUrl = configuredUrl ? configuredUrl.replace(/\/$/, "") : "http://localhost:8080";
  return `${baseUrl}/api/events`;
}

export async function fetchEvents(): Promise<ChurchEvent[]> {
  try {
    const response = await fetch(getEventsApiUrl(), { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to load events: ${response.status}`);
    }

    const data = (await response.json()) as BackendEvent[] | { events?: BackendEvent[] };
    const items = Array.isArray(data) ? data : data.events ?? [];

    return items.map(mapBackendEvent);
  } catch (error) {
    console.error("Unable to load events from backend, falling back to sample data.", error);
    return fallbackEvents;
  }
}
