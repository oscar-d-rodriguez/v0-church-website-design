"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Heart, Target, Sparkles } from "lucide-react";

export function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const cards = [
    {
      icon: Target,
      title: t.about.mission,
      description: t.about.missionText,
      color: "bg-foreground/5 text-foreground",
    },
    {
      icon: Sparkles,
      title: t.about.vision,
      description: t.about.visionText,
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Heart,
      title: t.about.values,
      description: t.about.valuesText,
      color: "bg-foreground/5 text-foreground",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -right-40 top-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -left-40 bottom-20 w-96 h-96 bg-muted/50 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
            {t.about.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 mb-6 text-balance tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty leading-relaxed">
            {t.about.description}
          </p>
        </motion.div>

        {/* Photo Collage Grid with Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[550px]">
            {/* Main Large Image */}
            <motion.div
              style={{ y: y2 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-12 md:col-span-7 row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <Image
                src="/images/community.jpg"
                alt="Our Community"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/70 mb-2 block font-semibold">
                  Our Community
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Growing Together in Faith
                </h3>
              </div>
            </motion.div>
            
            {/* Small Images */}
            <motion.div
              style={{ y: y1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-6 md:col-span-5 rounded-3xl overflow-hidden relative"
            >
              <Image
                src="/images/prayer.jpg"
                alt="Prayer"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </motion.div>
            <motion.div
              style={{ y: y1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-6 md:col-span-5 rounded-3xl overflow-hidden relative"
            >
              <Image
                src="/images/service.jpg"
                alt="Service"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </motion.div>
          </div>
        </motion.div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-3xl p-10 shadow-sm border border-border hover:border-accent/30 transition-colors duration-150 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-150`}
              >
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif tracking-tight">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
