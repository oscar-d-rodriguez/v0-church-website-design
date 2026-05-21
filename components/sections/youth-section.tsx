"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { BookOpen, Music2, Mountain, Heart } from "lucide-react";

export function YouthSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const activities = [
    { icon: BookOpen, text: t.youth.bibleStudy },
    { icon: Music2, text: t.youth.worship },
    { icon: Mountain, text: t.youth.retreats },
    { icon: Heart, text: t.youth.community },
  ];

  return (
    <section id="youth" ref={ref} className="py-24 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        style={{ x: x1 }}
        className="absolute top-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ x: x2 }}
        className="absolute bottom-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              {t.youth.subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 text-balance">
              {t.youth.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t.youth.description}
            </p>

            {/* Activities */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-lg">{t.youth.activities}</h3>
              <div className="grid grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{activity.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="rounded-full px-8"
            >
              {t.youth.join}
            </Button>
          </motion.div>

          {/* Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 h-64 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-8xl"
                  >
                    🙌
                  </motion.span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-2xl font-serif font-bold gradient-text">
                    Next Gen Faith
                  </span>
                </div>
              </motion.div>
              
              {/* Small Images */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="h-40 bg-gradient-to-br from-accent/30 to-accent/10 rounded-2xl flex items-center justify-center"
              >
                <span className="text-5xl">🎸</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="h-40 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl flex items-center justify-center"
              >
                <span className="text-5xl">⛺</span>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center"
            >
              <span className="text-3xl">✨</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
