"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Clock, MapPin } from "lucide-react";

export function ServiceTimesSection() {
  const { language } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const services = [
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

  return (
    <section ref={ref} className="relative h-[80vh] min-h-[600px] overflow-hidden flex items-center">
      {/* Parallax Background Image */}
      <motion.div className="absolute inset-0 z-0 h-full w-full scale-110">
        <Image
          src="/images/prayer.jpg"
          alt="Service times background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-[0.4em]">
              {language === "en" ? "Join Us" : "Únete a Nosotros"}
            </span>
            <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 mb-12 text-white tracking-wider">
              {language === "en" ? "Service Times" : "Horarios de Servicio"}
            </h2>
          </motion.div>

          {/* Service Times Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-3xl font-bold text-white">{service.time}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif">{service.day}</h3>
                <p className="text-white/70 text-sm uppercase tracking-wider">{service.type}</p>
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
            <span className="text-lg">15220 Main St, Bellevue, WA 98007</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
