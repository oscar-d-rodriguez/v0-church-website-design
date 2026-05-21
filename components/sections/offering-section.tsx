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
    <section id="offering" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent" />
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
            {t.offering.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 mb-6 text-balance">
            {t.offering.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
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
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all ${
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
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-4 px-4 rounded-xl font-bold text-lg border-2 transition-all ${
                      amount === 100
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted/50 border-border hover:border-primary"
                    }`}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    className="w-full pl-10 pr-4 py-4 rounded-xl bg-muted/50 border-2 border-border focus:border-primary focus:outline-none text-lg font-medium transition-colors"
                  />
                </div>
                <Button
                  size="lg"
                  className="px-12 py-4 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-lg"
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
          <h3 className="text-2xl font-serif font-bold text-center mb-8">
            {t.offering.ways}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {givingWays.map((way, index) => (
              <motion.div
                key={way.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border transition-all ${
                  way.highlight
                    ? "bg-primary/5 border-primary/30"
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    way.highlight ? "bg-primary/20" : "bg-muted"
                  }`}
                >
                  <way.icon className={`w-6 h-6 ${way.highlight ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h4 className="font-bold text-lg mb-2">{way.title}</h4>
                <p className="text-muted-foreground text-sm">{way.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
