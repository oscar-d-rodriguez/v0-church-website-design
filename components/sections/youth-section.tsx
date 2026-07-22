"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { BookOpen, Music2, Mountain, Heart } from "lucide-react";

export function YouthSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const activities = [
    { icon: BookOpen, text: t.youth.bibleStudy },
    { icon: Music2, text: t.youth.worship },
    { icon: Mountain, text: t.youth.retreats }  
  ];

  return (
    <section id="youth" ref={ref} className="py-32 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute top-20 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-80 h-80 bg-muted/30 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-[0.4em]">
              {t.youth.subtitle}
            </span>
            <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 mb-6 text-balance tracking-wider">
              {t.youth.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              {t.youth.description}
            </p>

            {/* Activities */}
            <div className="mb-10">
              <h3 className="font-semibold mb-6 text-sm uppercase tracking-[0.15em] text-foreground/70">{t.youth.activities}</h3>
              <div className="grid grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <activity.icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-medium">{activity.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="rounded-full px-10 text-sm uppercase tracking-widest font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="https://www.instagram.com/legacyleadersofficial/" target="_blank" rel="noopener noreferrer">
                {t.youth.join}
              </Link>
            </Button>
          </motion.div>

          {/* Visual Collage with Parallax */}
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
                whileHover={{ scale: 1.01 }}
                className="col-span-2 h-72 rounded-3xl relative overflow-hidden"
              >
                <Image
                  src="/images/youth1.jpg"
                  alt="Youth Ministry"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="text-2xl font-serif font-bold text-white">
                    Legacy Leaders
                  </span>
                </div>
              </motion.div>
              
              {/* Small Images */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-44 rounded-3xl overflow-hidden relative"
              >
                <Image
                  src="/images/youth2.jpg"
                  alt="Youth Worship"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-44 rounded-3xl overflow-hidden relative"
              >
                <Image
                  src="/images/youth3.jpg"
                  alt="Youth Community"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </div>

            {/* Floating Element */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <span className="text-xs uppercase tracking-widest font-bold text-accent">NEW</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
