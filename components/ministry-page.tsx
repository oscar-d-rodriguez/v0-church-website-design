"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Calendar, Mail, CheckCircle } from "lucide-react";

interface MinistryData {
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  image: string;
  activities: { en: string; es: string }[];
  schedule: { en: string; es: string };
  contact: string;
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
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={ministry.image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link 
                  href="/#ministries"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-widest font-semibold">
                    {language === "en" ? "Back to Ministries" : "Volver a Ministerios"}
                  </span>
                </Link>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground">
                  {title}
                </h1>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                  {description}
                </p>

                <h2 className="text-2xl font-serif font-bold mb-6">
                  {language === "en" ? "What We Do" : "Lo Que Hacemos"}
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {ministry.activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl"
                    >
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium">
                        {language === "en" ? activity.en : activity.es}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Schedule Card */}
                <div className="bg-card rounded-3xl p-8 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold">
                      {language === "en" ? "Schedule" : "Horario"}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{schedule}</p>
                </div>

                {/* Contact Card */}
                <div className="bg-card rounded-3xl p-8 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold">
                      {language === "en" ? "Contact" : "Contacto"}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{ministry.contact}</p>
                  <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/#contact">
                      {language === "en" ? "Get in Touch" : "Contactanos"}
                    </Link>
                  </Button>
                </div>

                {/* Join CTA */}
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground">
                  <h3 className="font-bold text-xl mb-3">
                    {language === "en" ? "Ready to Join?" : "Listo para Unirte?"}
                  </h3>
                  <p className="text-primary-foreground/80 mb-6">
                    {language === "en" 
                      ? "We would love to have you serve with us!" 
                      : "Nos encantaria que sirvieras con nosotros!"}
                  </p>
                  <Button asChild variant="secondary" className="w-full rounded-xl">
                    <Link href="/#contact">
                      {language === "en" ? "Contact Us" : "Contactanos"}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
