"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { Music, Baby, Users, UserCircle, Globe, HandHeart } from "lucide-react";

export function MinistriesSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const ministries = [
    {
      icon: Music,
      title: t.ministries.worship,
      description: t.ministries.worshipDesc,
    },
    {
      icon: Baby,
      title: t.ministries.children,
      description: t.ministries.childrenDesc,
    },
    {
      icon: Users,
      title: t.ministries.men,
      description: t.ministries.menDesc,
    },
    {
      icon: UserCircle,
      title: t.ministries.women,
      description: t.ministries.womenDesc,
    },
    {
      icon: Globe,
      title: t.ministries.outreach,
      description: t.ministries.outreachDesc,
    },
    {
      icon: HandHeart,
      title: t.ministries.prayer,
      description: t.ministries.prayerDesc,
    },
  ];

  return (
    <section id="ministries" ref={ref} className="py-32 bg-muted/20 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-muted/50 rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-semibold text-xs uppercase tracking-[0.2em]">
            {t.ministries.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 text-balance tracking-tight">
            {t.ministries.title}
          </h2>
        </motion.div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-3xl p-10 border border-border hover:border-accent/30 transition-colors duration-150 cursor-pointer group relative overflow-hidden"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 group-hover:bg-accent/10 transition-colors duration-150">
                  <ministry.icon className="w-6 h-6 text-foreground/70 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-serif tracking-tight group-hover:text-foreground transition-colors duration-150">
                  {ministry.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {ministry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
