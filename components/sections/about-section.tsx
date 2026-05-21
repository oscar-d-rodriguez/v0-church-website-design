"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { Heart, Target, Sparkles } from "lucide-react";

export function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const cards = [
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
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Heart,
      title: t.about.values,
      description: t.about.valuesText,
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute -right-40 top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute -left-40 bottom-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            {t.about.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 mb-6 text-balance">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
            {t.about.description}
          </p>
        </motion.div>

        {/* Collage Image Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[500px]">
            {/* Main Large Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-12 md:col-span-7 row-span-2 bg-gradient-to-br from-primary/30 via-primary/20 to-accent/30 rounded-2xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-wider text-primary mb-2 block">
                  Our Community
                </span>
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Growing Together in Faith
                </h3>
              </div>
            </motion.div>
            
            {/* Small Images */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-6 md:col-span-5 bg-gradient-to-br from-accent/40 to-accent/20 rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">🙏</span>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-span-6 md:col-span-5 bg-gradient-to-br from-primary/40 to-primary/20 rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">❤️</span>
              </div>
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
              className="bg-card rounded-2xl p-8 shadow-lg border border-border hover:border-primary/30 transition-colors duration-150 group"
            >
              <div
                className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-150`}
              >
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4 font-serif">{card.title}</h3>
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
