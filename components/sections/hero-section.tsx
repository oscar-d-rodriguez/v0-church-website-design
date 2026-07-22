"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const heroImages = [
  "/images/hero-0.jpg",
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

export function HeroSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Rotating Background Images with Parallax - Darker overlay */}
      <motion.div
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImage]}
              alt="Hosanna Church Community"
              fill
              className="object-cover parallax-image"
              priority
              sizes="100vw"
            />
            {/* Darker overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Image Indicators - moved below scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage 
                  ? "bg-white w-8" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo Symbol */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-8 relative"
          >
            <Image
              src="/images/symbol.png"
              alt={t.churchName}
              fill
              loading="eager"
              className="object-contain brightness-0 invert"
            />
          </motion.div>

          {/* Main Heading - White text */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.92, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="uppercase text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-balance tracking-wider"
          >
            <motion.span
              initial={{ opacity: 0, y: 10, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-white"
            >
              {t.hero.welcome}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="uppercase text-lg md:text-3xl text-white/80 mb-12 max-w-2xl mx-auto text-pretty leading-relaxed tracking-[.75rem]"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="text-sm uppercase tracking-widest font-semibold px-10 py-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <a href="#contact">{t.hero.cta}</a>
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="text-sm uppercase tracking-widest font-semibold px-10 py-6 rounded-full border-2 border-white bg-black/50 text-white hover:bg-white hover:text-black transition-all group"
            >
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              {t.hero.watchLive}
            </Button> */}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
