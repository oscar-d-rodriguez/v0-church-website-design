"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { events } from "@/lib/events-data";
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EventDetailPage() {
  const params = useParams();
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const event = events.find((e) => e.id === params.id);

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
    <main className="min-h-screen bg-background">
      {/* Hero Image Section - Large, Prominent */}
      <div className={`relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gradient-to-br ${categoryColors[event.category]} overflow-hidden`}>
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

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link href="/#events">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">{t.events.backToHome}</span>
                </motion.div>
              </Link>
              
              <Link href="/">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative h-10 w-32"
                >
                  <Image
                    src="/images/logo.png"
                    alt={t.churchName}
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            {categoryLabels[event.category]}
          </span>
        </motion.div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 pb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white text-center text-balance mb-6"
            >
              {language === "en" ? event.titleEn : event.titleEs}
            </motion.h1>
          </div>
          
          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Floating Share Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className={`absolute bottom-24 right-8 z-20 w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors ${
            copied ? "bg-emerald-500/80" : "bg-white/20 hover:bg-white/30"
          }`}
          aria-label={copied ? (language === "en" ? "Link copied" : "Enlace copiado") : (language === "en" ? "Share event" : "Compartir evento")}
        >
          {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Event Details - Minimal Text */}
      <div className="container mx-auto px-4 py-12">
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

          {/* Brief Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-muted-foreground text-center mb-8 text-pretty"
          >
            {language === "en" ? event.descriptionEn : event.descriptionEs}
          </motion.p>

          {/* CTA Button */}
          <motion.div
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
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
