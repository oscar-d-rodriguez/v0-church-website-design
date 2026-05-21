"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, Heart } from "lucide-react";

export function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    isPrayer: false,
  });

  const contactInfo = [
    {
      icon: MapPin,
      label: t.contact.address,
      value: "123 Faith Street, City, State 12345",
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: "(555) 123-4567",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "info@gracechurch.com",
    },
  ];

  const serviceHours = [
    { day: t.contact.sunday, time: "9:00 AM & 11:00 AM" },
    { day: t.contact.wednesday, time: "7:00 PM" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formState);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-muted/30 to-transparent" />
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
            {t.contact.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 text-balance">
            {t.contact.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Info Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Service Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-lg">{t.contact.hours}</h3>
              </div>
              <div className="space-y-3">
                {serviceHours.map((schedule) => (
                  <div
                    key={schedule.day}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-6 h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-10 h-10 mx-auto text-primary mb-2" />
                <span className="text-muted-foreground">View on Google Maps</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              {/* Prayer Request Toggle */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, isPrayer: !formState.isPrayer })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formState.isPrayer
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${formState.isPrayer ? "fill-current" : ""}`} />
                  {t.contact.form.prayer}
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border-2 border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl py-6 text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t.contact.form.send}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
