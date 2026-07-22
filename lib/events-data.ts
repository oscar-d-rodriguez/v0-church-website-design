export interface ChurchEvent {
  id: string;
  slug: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  date: string;
  time: string;
  locationEn: string;
  locationEs: string;
  imageUrl: string;
  includeHosannaMap: boolean;
  contacts: EventContact[];
  category: "worship" | "youth" | "community" | "special";
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

function formatDisplayDate(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function formatDisplayTime(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "TBD";
  }

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(parsedDate);
}

function mapCategory(type?: string): ChurchEvent["category"] {
  switch (type) {
    case "service":
      return "worship";
    case "meeting":
      return "community";
    case "outreach":
      return "community";
    default:
      return "special";
  }
}

export function mapBackendEvent(event: BackendEvent): ChurchEvent {
  const title = event.title ?? "Untitled Event";
  const contacts = Array.isArray(event.contacts)
    ? event.contacts
        .filter((contact) => contact?.name?.trim())
        .map((contact) => ({
          name: contact.name.trim(),
          phone: contact.phone?.trim() || undefined,
        }))
    : [];

  return {
    id: event.id,
    slug: slugifyEventTitle(title),
    titleEn: title,
    titleEs: event.title ?? "Evento sin título",
    descriptionEn: event.description ?? "More details coming soon.",
    descriptionEs: event.description ?? "Pronto más detalles.",
    date: formatDisplayDate(event.date),
    time: formatDisplayTime(event.date),
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
