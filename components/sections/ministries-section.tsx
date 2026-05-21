"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Music, Baby, Users, UserCircle, Globe, HandHeart } from "lucide-react";

export function MinistriesSection() {
  const { t } = useLanguage();

  const ministries = [
    {
      icon: Music,
      title: t.ministries.worship,
      description: t.ministries.worshipDesc,
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Baby,
      title: t.ministries.children,
      description: t.ministries.childrenDesc,
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Users,
      title: t.ministries.men,
      description: t.ministries.menDesc,
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: UserCircle,
      title: t.ministries.women,
      description: t.ministries.womenDesc,
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Globe,
      title: t.ministries.outreach,
      description: t.ministries.outreachDesc,
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: HandHeart,
      title: t.ministries.prayer,
      description: t.ministries.prayerDesc,
      gradient: "from-accent/20 to-accent/5",
    },
  ];

  return (
    <section id="ministries" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            {t.ministries.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 text-balance">
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-br ${ministry.gradient} bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden`}
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <ministry.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 font-serif group-hover:text-primary transition-colors">
                  {ministry.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
