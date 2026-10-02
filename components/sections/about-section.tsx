"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Heart, Target, Sparkles } from "lucide-react";
import type { CmsAboutSection } from "@/lib/cms-home";
import { getAboutIcon } from "@/lib/about-icons";

interface AboutSectionProps {
  aboutSection?: CmsAboutSection | null;
}

export function AboutSection({ aboutSection }: AboutSectionProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const fallbackCards = [
    {
      icon: Target,
      title: t.about.mission,
      description: t.about.missionText,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Sparkles,
      title: t.about.vision,
      description: t.about.visionText,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Heart,
      title: t.about.values,
      description: t.about.valuesText,
      color: "bg-primary/10 text-primary",
    },
  ];
  const cards = aboutSection?.cards.length
    ? aboutSection.cards.map((card, index) => ({
        icon: getAboutIcon(card.icon),
        title: card.headline || fallbackCards[index]?.title || "",
        description: card.description || fallbackCards[index]?.description || "",
        color: "bg-primary/10 text-primary",
      }))
    : fallbackCards;
  const mainImage = aboutSection?.images.main.image?.url || "/images/community.jpg";
  const secondaryImage = aboutSection?.images.secondary.image?.url || "/images/prayer.jpg";
  const tertiaryImage = aboutSection?.images.tertiary.image?.url || "/images/service.jpg";
  const mainImageAlt = aboutSection?.images.main.altText || "Our Community";
  const secondaryImageAlt = aboutSection?.images.secondary.altText || "Prayer";
  const tertiaryImageAlt = aboutSection?.images.tertiary.altText || "Service";

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute -right-40 top-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
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
          <span className="text-primary font-semibold text-sm uppercase tracking-[0.4em]">
            {aboutSection?.eyebrow || t.about.subtitle}
          </span>
          <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 mb-6 text-balance">
            {aboutSection?.headline || t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty leading-relaxed">
            {aboutSection?.description || t.about.description}
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
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-12 md:col-span-7 row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <Image
                src={mainImage}
                alt={mainImageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2 block font-semibold">
                  {aboutSection?.imageOverlay?.badge || t.about.overlayBadge}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {aboutSection?.imageOverlay?.headline || t.about.overlayTitle}
                </h3>
              </div>
            </motion.div>
            
            {/* Small Images */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-6 md:col-span-5 aspect-[4/5] md:aspect-auto md:h-full rounded-3xl overflow-hidden relative"
            >
              <Image
                src={secondaryImage}
                alt={secondaryImageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-6 md:col-span-5 aspect-[4/5] md:aspect-auto md:h-full rounded-3xl overflow-hidden relative"
            >
              <Image
                src={tertiaryImage}
                alt={tertiaryImageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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
              className="bg-card rounded-3xl p-10 shadow-sm border border-border hover:border-primary/30 transition-colors duration-150 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-150`}
              >
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-4 font-serif tracking-tight text-2xl">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
