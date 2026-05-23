"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, Heart, Check, Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

export function ContactSection() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
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
      value: "15220 Main St, Bellevue, WA 98007",
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: "(555) 123-4567",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "iglesia.hosanna@gmail.com",
    },
  ];

  const serviceHours = [
    { day: language === "en" ? "Friday" : "Viernes", time: "7:00 PM - Bible Study" },
    { day: language === "en" ? "Sunday" : "Domingo", time: "2:00 PM - Service" },
    { day: language === "en" ? "Thursday" : "Jueves", time: "7:00 PM - Prayer" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const result = await submitContactForm(formState);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      setFormState({ name: "", email: "", message: "", isPrayer: false });
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-muted/20 to-transparent" />
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
          <span className="text-primary font-semibold text-sm uppercase tracking-[0.4em]">
            {t.contact.subtitle}
          </span>
          <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 text-balance tracking-wider">
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
                  className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <info.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
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
              className="bg-muted/30 rounded-3xl p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm uppercase tracking-[0.15em]">{t.contact.hours}</h3>
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

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-6 h-48 rounded-3xl overflow-hidden border border-border"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.4876!2d-122.1467!3d47.6186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906c8d2a3b5555%3A0x123456789!2s15220%20Main%20St%2C%20Bellevue%2C%20WA%2098007!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hosanna Church Location"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-10 shadow-sm border border-border">
              {/* Prayer Request Toggle */}
              <div className="mb-8">
                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, isPrayer: !formState.isPrayer })}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-semibold transition-all ${
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
              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold mb-3">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-muted/30 border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold mb-3">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-muted/30 border-2 border-border focus:border-primary focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.15em] font-semibold mb-3">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl bg-muted/30 border-2 border-border focus:border-primary focus:outline-none transition-colors resize-none"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center"
                  >
                    <Check className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                    <p className="text-emerald-600 font-medium">
                      {language === "en" ? "Message sent successfully!" : "Mensaje enviado con exito!"}
                    </p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || isSuccess}
                  className="w-full rounded-2xl py-6 text-sm uppercase tracking-widest font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting 
                    ? (language === "en" ? "Sending..." : "Enviando...") 
                    : t.contact.form.send}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
