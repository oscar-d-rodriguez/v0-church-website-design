"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
}

export function Marquee({ items, speed = 30, direction = "left" }: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-8 bg-muted/30 border-y border-border">
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        className="flex gap-16 whitespace-nowrap"
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
            <span className="text-primary/40">+</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
