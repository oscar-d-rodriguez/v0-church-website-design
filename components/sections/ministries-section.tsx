"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Music, Baby, Users, UserCircle, Globe, HandHeart } from "lucide-react";

export function MinistriesSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const ministries = [
    {
      icon: Music,
      title: t.ministries.worship,
      description: t.ministries.worshipDesc,
      slug: "worship",
    },
    {
      icon: Baby,
      title: t.ministries.children,
      description: t.ministries.childrenDesc,
      slug: "children",
    },
    {
      icon: Users,
      title: t.ministries.men,
      description: t.ministries.menDesc,
      slug: "men",
    },
    {
      icon: UserCircle,
      title: t.ministries.women,
      description: t.ministries.womenDesc,
      slug: "women",
    },
    {
      icon: Globe,
      title: t.ministries.outreach,
      description: t.ministries.outreachDesc,
      slug: "outreach",
    },
    {
      icon: HandHeart,
      title: t.ministries.prayer,
      description: t.ministries.prayerDesc,
      slug: "prayer",
    },
  ];

  return (
    <section id="ministries" ref={ref} className="py-32 relative overflow-hidden bg-primary">
      {/* Background Image with fixed position effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/worship.jpg"
          alt="Worship background"
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-white/70 font-semibold text-sm uppercase tracking-[0.4em]">
            {t.ministries.subtitle}
          </span>
          <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 text-balance tracking-wider text-white">
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
            >
              <Link href={`/ministries/${ministry.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-colors duration-150 cursor-pointer group relative overflow-hidden h-full"
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:bg-white/20 transition-colors duration-150">
                      <ministry.icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 font-serif tracking-tight text-white group-hover:text-white transition-colors duration-150">
                      {ministry.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-sm">
                      {ministry.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
