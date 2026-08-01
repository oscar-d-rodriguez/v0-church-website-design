"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "@/lib/language-context";

interface MarqueeProps {
  items?: string[];
  speed?: number;
  direction?: "left" | "right";
}

export function Marquee({ items, speed = 30, direction = "left" }: MarqueeProps) {
  const { language } = useLanguage();
  const fallbackItems =
    language === "en"
      ? ["WORSHIP", "COMMUNITY", "FAITH", "LOVE", "SERVICE", "HOPE", "PRAYER", "HEALING"]
      : ["ADORACIÓN", "COMUNIDAD", "FE", "AMOR", "SERVICIO", "ESPERANZA", "ORACIÓN", "SANIDAD"];

  const finalItems = items && items.length > 0 ? items : fallbackItems;
  const duplicatedItems = [...finalItems, ...finalItems, ...finalItems, ...finalItems];
  const marqueeStyle = {
    "--marquee-duration": `${speed}s`,
  } as CSSProperties;

  return (
    <div className="relative overflow-hidden py-8 bg-muted/30 border-y border-border">
      <div
        style={marqueeStyle}
        className={`marquee-track ${direction === "left" ? "marquee-track--left" : "marquee-track--right"} flex gap-16 whitespace-nowrap`}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-16 text-lg md:text-xl lg:text-xl uppercase tracking-[0.1em] font-bold"
          >
            {/* Alternating solid and stroke text */}
            <span className={ `${index % 2 === 0 ? "text-foreground" : "stroke-text text-foreground"} tracking-[.25rem]`}>
              {item}
            </span>
            <span className="text-primary/80">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
