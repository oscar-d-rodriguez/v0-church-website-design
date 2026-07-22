"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { events as fallbackEvents, fetchEvents, type ChurchEvent } from "@/lib/events-data";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export function EventsSection() {
  const { language, t } = useLanguage();
  const [events, setEvents] = useState<ChurchEvent[]>(fallbackEvents);

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

  const categoryLabels = {
    worship: language === "en" ? "Worship" : "Adoracion",
    youth: language === "en" ? "Youth" : "Jovenes",
    community: language === "en" ? "Community" : "Comunidad",
    special: language === "en" ? "Special" : "Especial",
  };

  return (
    <section id="events" className="py-32 relative overflow-hidden bg-foreground dark:bg-card">
      {/* Background Image with fixed position effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/community.jpg"
          alt="Community background"
          fill
          className="object-cover opacity-5"
          sizes="100vw"
          loading="eager"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-[0.4em]">
            {t.events.subtitle}
          </span>
          <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 mb-6 text-balance tracking-wider text-background dark:text-foreground">
            {t.events.title}
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/events/${event.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group bg-background dark:bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-200 border border-border h-full flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-muted">
                    <Image
                      src={event.imageUrl}
                      alt={language === "en" ? event.titleEn : event.titleEs}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.15em] font-semibold rounded-full">
                        {categoryLabels[event.category]}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-black/55 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 font-serif tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                      {language === "en" ? event.titleEn : event.titleEs}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
                      {language === "en" ? event.descriptionEn : event.descriptionEs}
                    </p>

                    <div className="mt-auto space-y-2.5 text-sm text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-primary/60" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-primary/60" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary/60" />
                        <span>{language === "en" ? event.locationEn : event.locationEs}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm uppercase tracking-widest font-semibold"
          >
            {t.common.viewAll}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div> */}
      </div>
    </section>
  );
}
