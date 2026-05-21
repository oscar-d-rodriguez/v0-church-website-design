"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { events } from "@/lib/events-data";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventsSection() {
  const { language, t } = useLanguage();

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
    <section id="events" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            {t.events.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 mb-6 text-balance">
            {t.events.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
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
              <Link href={`/events/${event.id}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-200 border border-border h-full flex flex-col"
                >
                  {/* Image Placeholder with Gradient */}
                  <div className={`relative h-48 bg-gradient-to-br ${categoryColors[event.category]} overflow-hidden`}>
                    {/* Collage Pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-2 left-2 w-16 h-16 bg-white/20 rounded-lg" />
                      <div className="absolute top-4 right-4 w-24 h-12 bg-white/10 rounded-lg" />
                      <div className="absolute bottom-4 left-1/4 w-20 h-20 bg-white/15 rounded-full" />
                      <div className="absolute bottom-2 right-2 w-12 h-16 bg-white/20 rounded-lg" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {categoryLabels[event.category]}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {language === "en" ? event.titleEn : event.titleEs}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {language === "en" ? event.descriptionEn : event.descriptionEs}
                    </p>

                    <div className="mt-auto space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            {t.common.viewAll}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
