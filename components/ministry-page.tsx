"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Calendar, Mail, CheckCircle, Sparkles } from "lucide-react";

interface MinistryData {
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  image: string;
  directorImage?: string;
  activities: { en: string; es: string }[];
  schedule: { en: string; es: string };
  contact: string;
  directorEn?: string;
  directorEs?: string;
}

interface MinistryPageProps {
  ministry: MinistryData;
}

export function MinistryPage({ ministry }: MinistryPageProps) {
  const { language, t } = useLanguage();

  const title = language === "en" ? ministry.titleEn : ministry.titleEs;
  const description = language === "en" ? ministry.descriptionEn : ministry.descriptionEs;
  const schedule = language === "en" ? ministry.schedule.en : ministry.schedule.es;

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section - Extends to top */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden -mt-20">
          <Image
            src={ministry.image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* Darker overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-background" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          <div className="absolute inset-0 flex items-end pt-20">
            <div className="container mx-auto px-4 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  href="/#ministries"
                  className="inline-flex items-center gap-2 text-white hover:text-amber-300 transition-colors mb-6 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm uppercase tracking-widest font-semibold">
                    {language === "en" ? "Back to Ministries" : "Volver a Ministerios"}
                  </span>
                </Link>
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {title}
                </motion.h1>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-gradient-to-b from-background via-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-12 p-6 bg-gradient-to-r from-primary/5 to-amber-500/5 rounded-2xl border border-primary/20 backdrop-blur"
                >
                  <p className="text-lg leading-relaxed text-foreground/90 font-medium">
                    {description}
                  </p>
                </motion.div>

                {/* What We Do Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-amber-500 rounded-full"></div>
                    <h2 className="text-3xl font-serif font-bold">
                      {language === "en" ? "What We Do" : "Lo Que Hacemos"}
                    </h2>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {ministry.activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        // whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(16, 132, 205, 0.1)" }}
                        className="relative group p-5 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all cursor-default overflow-hidden"
                      >
                        {/* Gradient background on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-amber-500/5 transition-all duration-300" />
                        
                        <div className="relative flex items-start gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 12 }}
                            transition={{ type: "spring" }}
                            className="mt-1"
                          >
                            <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                          </motion.div>
                          <span className="font-medium text-foreground/90 leading-relaxed">
                            {language === "en" ? activity.en : activity.es}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Director Card - Enhanced */}
                {(ministry.directorEn || ministry.directorEs || ministry.directorImage) && (
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-card/50 border border-primary/30 p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Subtle background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-amber-500/5" />
                    
                    <div className="relative">
                      {ministry.directorImage && (
                        <motion.div
                          className="mb-6 flex justify-center"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <div className="relative w-40 h-40">
                            {/* Ring effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-amber-500/20 blur-lg" />
                            <div className="absolute inset-2 rounded-full ring-2 ring-primary/30" />
                            
                            <Image
                              src={ministry.directorImage}
                              alt={language === "en" ? ministry.directorEn || "Director" : ministry.directorEs || "Director/a"}
                              fill
                              className="object-cover rounded-full ring-4 ring-background shadow-xl"
                            />
                          </div>
                        </motion.div>
                      )}
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-foreground">
                          {language === "en" ? "Director" : "Director/a"}
                        </h3>
                        <p className="text-primary font-semibold text-2xl leading-relaxed">
                          {language === "en" ? ministry.directorEn : ministry.directorEs}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Schedule Card */}
                {/* <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-primary/30 p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">
                        {language === "en" ? "Schedule" : "Horario"}
                      </h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                      {schedule}
                    </p>
                  </div>
                </motion.div> */}

                {/* Contact Card */}
                {/* <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/30 dark:to-green-900/20 border border-primary/30 p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">
                        {language === "en" ? "Contact" : "Contacto"}
                      </h3>
                    </div>
                    <p className="text-foreground/80 font-medium mb-4 break-all">
                      {ministry.contact}
                    </p>
                    <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all">
                      <a href={`mailto:${ministry.contact}`}>
                        {language === "en" ? "Send Email" : "Enviar Email"}
                      </a>
                    </Button>
                  </div>
                </motion.div> */}

                {/* Join CTA - Enhanced */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-amber-500 p-8 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow group"
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      animate={{ 
                        x: [0, 100, 0],
                        y: [0, 50, 0]
                      }}
                      transition={{ duration: 20, repeat: Infinity }}
                      className="absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5" />
                      <h3 className="font-bold text-xl">
                        {language === "en" ? "Ready to Join?" : "¿Listo para Unirte?"}
                      </h3>
                    </div>
                    <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                      {language === "en" 
                        ? "We would love to have you serve with us! Contact us today to get started." 
                        : "¡Nos encantaría que sirvieras con nosotros! Contáctanos hoy para comenzar."}
                    </p>
                    <Button asChild variant="secondary" className="w-full rounded-xl font-semibold group-hover:scale-105 transition-transform">
                      <a href={`mailto:${ministry.contact}`}>
                        {language === "en" ? "Contact Us Now" : "Contactanos Ahora"}
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
