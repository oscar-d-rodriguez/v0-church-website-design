"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { CreditCard, Building, Mail, Heart, RefreshCw, DollarSign } from "lucide-react";

export function OfferingSection() {
  const { t } = useLanguage();

  const givingTypes = [
    { icon: Heart, label: t.offering.tithes },
    { icon: RefreshCw, label: t.offering.recurring },
    { icon: DollarSign, label: t.offering.oneTime },
  ];

  const givingWays = [
    {
      icon: CreditCard,
      title: t.offering.online,
      description: t.offering.onlineDesc,
      highlight: true,
    },
    {
      icon: Building,
      title: t.offering.inPerson,
      description: t.offering.inPersonDesc,
      highlight: false,
    },
    {
      icon: Mail,
      title: t.offering.mail,
      description: t.offering.mailDesc,
      highlight: false,
    },
  ];

  return (
    <section id="offering" className="py-32 bg-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-muted/30 to-transparent" />
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
          <span className="text-primary font-semibold text-xs uppercase tracking-[0.2em]">
            {t.offering.subtitle}
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mt-6 mb-6 text-balance tracking-tight">
            {t.offering.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.offering.description}
          </p>
        </motion.div>

        {/* Main Giving Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              {/* Giving Types */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {givingTypes.map((type, index) => (
                  <motion.button
                    key={type.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-colors duration-150 text-sm uppercase tracking-wider font-semibold ${
                      index === 0
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent border-border hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <type.icon className="w-5 h-5" />
                    <span className="font-medium">{type.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Amount Selection */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                {[25, 50, 100, 250, 500, 1000].map((amount, index) => (
                  <motion.button
                    key={amount}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-4 px-4 rounded-2xl font-bold text-lg border-2 transition-colors duration-150 ${
                      amount === 100
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/30 border-border hover:border-primary"
                    }`}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-muted/30 border-2 border-border focus:border-primary focus:outline-none text-lg font-medium transition-colors"
                  />
                </div>
                <Button
                  size="lg"
                  className="px-12 py-4 text-sm uppercase tracking-widest font-semibold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                >
                  Give Now
                </Button>
              </div>

              {/* Powered by Stripe */}
              <div className="text-center">
                <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
                  <span>Secure payments powered by</span>
                  <span className="font-bold text-foreground">Stripe</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ways to Give */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-center mb-10">
            {t.offering.ways}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {givingWays.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`p-8 rounded-3xl border transition-colors duration-150 ${
                  way.highlight
                    ? "bg-primary/5 border-primary/30"
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                    way.highlight ? "bg-primary/10" : "bg-muted/50"
                  }`}
                >
                  <way.icon className={`w-5 h-5 ${way.highlight ? "text-primary" : "text-foreground/50"}`} />
                </div>
                <h4 className="font-bold text-lg mb-3 tracking-tight">{way.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{way.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
