"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Clock, MapPin } from "lucide-react";
import type { CmsServiceTimesSection } from "@/lib/cms-home";

export function ServiceTimesSection({ serviceTimesSection }: { serviceTimesSection?: CmsServiceTimesSection | null }) {
  const { language } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const fallbackServices = [
    {
      day: language === "en" ? "Friday" : "Viernes",
      time: "7:00 PM",
      type: language === "en" ? "Bible Study" : "Estudio Bíblico",
    },
    {
      day: language === "en" ? "Sunday" : "Domingo",
      time: "2:00 PM",
      type: language === "en" ? "Service" : "Servicio de Gloria",
    },
    {
      day: language === "en" ? "Tuesday" : "Martes",
      time: "7:00 PM",
      type: language === "en" ? "Prayer" : "Oración",
    },
  ];
  const services = serviceTimesSection?.services.length
    ? serviceTimesSection.services
    : fallbackServices;
  const backgroundImageUrl = serviceTimesSection?.backgroundImage?.url || "/images/prayer.jpg";

  return (
    <section ref={ref} className="relative flex items-start overflow-hidden py-20 sm:py-24 md:h-[80vh] md:min-h-[600px] md:items-center md:py-0">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0 h-full w-full scale-110">
        <Image
          src={backgroundImageUrl}
          alt={serviceTimesSection?.backgroundImageAltText || "Service times background"}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-xs uppercase tracking-[0.25em] sm:text-sm sm:tracking-[0.4em]">
              {serviceTimesSection?.eyebrow || (language === "en" ? "Join Us" : "Únete a Nosotros")}
            </span>
            <h2 className="mt-5 mb-10 font-serif text-3xl font-bold uppercase leading-tight tracking-wide text-white sm:mt-6 sm:mb-12 sm:text-4xl sm:tracking-wider md:text-5xl lg:text-6xl">
              {serviceTimesSection?.headline || (language === "en" ? "Service Times" : "Horarios de Servicio")}
            </h2>
          </motion.div>

          {/* Service Times Grid */}
          <div className="mb-10 grid gap-5 sm:mb-12 md:grid-cols-3 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:p-8"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-white sm:text-3xl">{service.time}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">{service.day}</h3>
                <p className="text-white/70 text-sm uppercase tracking-wider">{"description" in service ? service.description : service.type}</p>
              </motion.div>
            ))}
          </div>

          {/* Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-3 text-white/80"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm sm:text-lg">{serviceTimesSection?.address || "15220 Main St, Bellevue, WA 98007"}</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
