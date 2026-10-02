"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import type { CmsHomeHero } from "@/lib/cms-home";

const fallbackHeroImages = [
  "/images/hero-0.jpg",
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

interface HeroSectionProps {
  cmsHero?: CmsHomeHero;
}

export function HeroSection({ cmsHero }: HeroSectionProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages =
    cmsHero?.slides?.length
      ? cmsHero.slides.map((slide) => slide.imageUrl)
      : fallbackHeroImages;

  const heroImageAlts =
    cmsHero?.slides?.length
      ? cmsHero.slides.map((slide) => slide.imageAlt || "Hosanna Church Community")
      : fallbackHeroImages.map(() => "Hosanna Church Community");

  const activeSlide = cmsHero?.slides?.[currentImage];
  const isPerSlideMode = cmsHero?.contentMode === "perSlide";
  const welcomeText = isPerSlideMode ? activeSlide?.headline : cmsHero?.welcome;
  const subtitleText = isPerSlideMode ? activeSlide?.subtitle : cmsHero?.subtitle;
  const ctaLabel = isPerSlideMode ? activeSlide?.ctaLabel : cmsHero?.ctaLabel;
  const ctaUrl = isPerSlideMode ? activeSlide?.ctaUrl : cmsHero?.ctaUrl;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950"
    >
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={heroImageAlts[index] || "Hosanna Church Community"}
              fill
              className="object-cover parallax-image"
              priority={index === 0}
              quality={60}
              sizes="100vw"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-1">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              aria-current={index === currentImage ? "true" : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-white/20" : "hover:bg-white/15"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className={`h-3.5 w-3.5 rounded-full border border-white/40 transition-all duration-300 ${
                  index === currentImage ? "scale-110 bg-white" : "bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-32 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="relative mx-auto mb-8 h-16 w-16 md:h-20 md:w-20">
            <Image
              src="/images/symbol.png"
              alt={t.churchName}
              fill
              loading="eager"
              quality={80}
              sizes="80px"
              className="object-contain brightness-0 invert"
            />
          </div>

          <h1
            className="mb-6 font-serif text-5xl font-bold uppercase tracking-wider text-balance md:text-7xl lg:text-8xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
          >
            <span className="text-white">{welcomeText || t.hero.welcome}</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg uppercase leading-relaxed tracking-[.75rem] text-white text-pretty md:text-3xl">
            {subtitleText || t.hero.subtitle}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-primary px-10 py-6 text-sm font-semibold uppercase tracking-widest text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
              asChild
            >
              <a href={ctaUrl || "#contact"}>{ctaLabel || t.hero.cta}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
