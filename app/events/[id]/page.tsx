"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import {
  events as fallbackEvents,
  fetchEvents,
  findEventBySlugOrId,
  type ChurchEvent,
} from "@/lib/events-data";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const HOSANNA_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Hosanna+Church";
const HOSANNA_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Hosanna%20Church&z=15&output=embed";

export default function EventDetailPage() {
  const params = useParams();
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [events, setEvents] = useState<ChurchEvent[]>(fallbackEvents);
  const eventSlug = Array.isArray(params.id) ? params.id[0] : params.id;
  const event = eventSlug ? findEventBySlugOrId(events, eventSlug) : undefined;

  useEffect(() => {
    let isMounted = true;

    fetchEvents().then((loadedEvents) => {
      if (isMounted) {
        setEvents(loadedEvents);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleShare = async () => {
    const eventTitle = language === "en" ? event?.titleEn : event?.titleEs;
    const shareData = {
      title: eventTitle,
      text: language === "en" 
        ? `Join us for ${eventTitle} at ${t.churchName}!` 
        : `Unete a nosotros para ${eventTitle} en ${t.churchName}!`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link href="/#events">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.events.backToHome}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabels = {
    worship: language === "en" ? "Worship" : "Adoración",
    youth: language === "en" ? "Youth" : "Jóvenes",
    community: language === "en" ? "Community" : "Comunidad",
    special: language === "en" ? "Special" : "Especial",
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-16 lg:pt-16">
      <div className="container mx-auto px-4 pt-24 md:pt-8">
        <Link href="/#events">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">
              {language === "en" ? "Back to Events" : "Volver a los eventos"}
            </span>
          </motion.div>
        </Link>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-[2rem] border border-border shadow-xl"
        >
          <div className="relative w-full aspect-video">
            <Image
              src={event.imageUrl}
              alt={language === "en" ? event.titleEn : event.titleEs}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto relative rounded-[2rem] border border-white/60 bg-background/95 backdrop-blur-xl shadow-2xl p-6 md:p-10"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className={`absolute right-6 top-6 z-20 w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground transition-colors ${
                copied ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/40" : "hover:bg-muted"
              }`}
              aria-label={copied ? (language === "en" ? "Link copied" : "Enlace copiado") : (language === "en" ? "Share event" : "Compartir evento")}
            >
              {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            </motion.button>
            <div className="max-w-5xl">
                <span className="inline-flex px-4 py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-semibold uppercase tracking-[0.18em] rounded-full">
                  {categoryLabels[event.category]}
                </span>
                <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance tracking-tight">
                  {language === "en" ? event.titleEn : event.titleEs}
                </h1>
                <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
                  {language === "en" ? event.descriptionEn : event.descriptionEs}
                </p>
            </div>
          </motion.div>
      </div>

      {/* Event Details - Minimal Text */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {/* Event Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">{t.events.date}</p>
              <p className="font-semibold">{event.date}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">{t.events.time}</p>
              <p className="font-semibold">{event.time}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">{t.events.location}</p>
              <p className="font-semibold">{language === "en" ? event.locationEn : event.locationEs}</p>
            </motion.div>
          </div>

          {event.includeHosannaMap && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border bg-card p-4 md:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {language === "en" ? "Hosanna Map" : "Mapa de Hosanna"}
                </h2>
                <a
                  href={HOSANNA_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {language === "en" ? "Open in Google Maps" : "Abrir en Google Maps"}
                </a>
              </div>
              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  title="Hosanna Church map"
                  src={HOSANNA_MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full md:h-80"
                />
              </div>
            </motion.div>
          )}

          {/* CTA Button */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Button
              size="lg"
              className="rounded-full px-12 py-6 text-lg bg-primary hover:bg-primary/90"
            >
              {language === "en" ? "I'm Interested" : "Me Interesa"}
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
    </main>
    <Footer />
    </>
  );
}
