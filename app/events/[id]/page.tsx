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

  const categoryColors = {
    worship: "from-primary/80 to-primary",
    youth: "from-accent/80 to-accent",
    community: "from-emerald-500/80 to-emerald-600",
    special: "from-amber-500/80 to-amber-600",
  };

  const categoryLabels = {
    worship: language === "en" ? "Worship" : "Adoracion",
    youth: language === "en" ? "Youth" : "Jovenes",
    community: language === "en" ? "Community" : "Comunidad",
    special: language === "en" ? "Special" : "Especial",
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-16 lg:pt-16">
      <div className="relative">
        <div className={`relative h-[42vh] md:h-[52vh] lg:h-[62vh] bg-gradient-to-br ${categoryColors[event.category]} overflow-hidden`}>
        <Image
          src={event.imageUrl}
          alt={language === "en" ? event.titleEn : event.titleEs}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[event.category]} opacity-55`} />

          {/* Collage Background Pattern */}
          <div className="absolute inset-0">
          {/* Multiple overlapping shapes for collage effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-3xl rotate-12"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-20 right-20 w-48 h-80 bg-white/15 rounded-3xl -rotate-6"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute bottom-20 left-1/4 w-96 h-48 bg-white/10 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute bottom-10 right-10 w-72 h-72 bg-white/15 rounded-3xl rotate-45"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/20 rounded-full"
          />
          </div>

          <div className="absolute top-0 left-0 right-0 z-20">
            <div className="container mx-auto px-4 pt-24 md:pt-28">
              <Link href="/#events">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:border-0 md:bg-transparent md:px-0 md:py-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">{t.events.backToHome}</span>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Floating Share Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className={`absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors ${
              copied ? "bg-emerald-500/80" : "bg-white/20 hover:bg-white/30"
            }`}
            aria-label={copied ? (language === "en" ? "Link copied" : "Enlace copiado") : (language === "en" ? "Share event" : "Compartir evento")}
          >
            {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
          </motion.button>
        </div>

        <div className="container mx-auto px-4 relative z-20 -mt-16 md:-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto rounded-[2rem] border border-white/60 bg-background/95 backdrop-blur-xl shadow-2xl p-6 md:p-10"
          >
            <div className="max-w-3xl">
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
      </div>

      {/* Event Details - Minimal Text */}
      <div className="container mx-auto px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
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
