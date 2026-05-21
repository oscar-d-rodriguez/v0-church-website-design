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
    <div className="relative overflow-hidden py-4 bg-primary/5 border-y border-border">
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
        className="flex gap-8 whitespace-nowrap"
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground"
          >
            <span>{item}</span>
            <span className="text-primary">+++</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
