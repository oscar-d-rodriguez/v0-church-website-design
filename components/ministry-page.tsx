"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ArrowLeft, Calendar, Mail, CheckCircle, Sparkles } from "lucide-react";
import type { CmsMinistryDetail } from "@/lib/cms-ministry";

export interface LegacyMinistryData {
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  image: string;
  directorImage?: string;
  activities: { en: string; es: string; zoomUrl?: string }[];
  schedule: { en: string; es: string };
  contact: string;
  directorEn?: string;
  directorEs?: string;
  directorIsFemale?: boolean;
}

interface MinistryPageProps {
  ministry: LegacyMinistryData | CmsMinistryDetail;
}

function isCmsMinistry(ministry: LegacyMinistryData | CmsMinistryDetail): ministry is CmsMinistryDetail {
  return "detailDescription" in ministry && "whatWeDoItems" in ministry;
}

export function MinistryPage({ ministry }: MinistryPageProps) {
  const { language } = useLanguage();
  const cmsMinistry = isCmsMinistry(ministry) ? ministry : null;
  const legacyMinistry = (cmsMinistry ? null : ministry) as LegacyMinistryData;

  const title = cmsMinistry ? cmsMinistry.title : language === "en" ? legacyMinistry.titleEn : legacyMinistry.titleEs;
  const description = cmsMinistry
    ? cmsMinistry.detailDescription
    : language === "en"
      ? legacyMinistry.descriptionEn
      : legacyMinistry.descriptionEs;
  const shortDescription = cmsMinistry
    ? cmsMinistry.shortDescription
    : description;
  const heroImage = cmsMinistry?.heroImage?.url || (!cmsMinistry ? legacyMinistry.image : "");
  const heroImageAlt = cmsMinistry?.heroImageAltText || title;
  const activities = cmsMinistry
    ? cmsMinistry.whatWeDoItems.map((item) => ({ text: item, zoomUrl: undefined }))
    : legacyMinistry.activities.map((activity) => ({
        text: language === "en" ? activity.en : activity.es,
        zoomUrl: activity.zoomUrl,
      }));
  const leader = cmsMinistry
    ? cmsMinistry.leader
    : legacyMinistry.directorEn || legacyMinistry.directorEs || legacyMinistry.directorImage
      ? {
          name: language === "en" ? legacyMinistry.directorEn || null : legacyMinistry.directorEs || null,
          image: legacyMinistry.directorImage || null,
          imageAltText: language === "en" ? legacyMinistry.directorEn || "Director" : legacyMinistry.directorEs || "Director",
          roleLabel: language === "en" ? "Director" : legacyMinistry.directorIsFemale ? "Directora" : "Director",
        }
      : null;
  const leaderImage = cmsMinistry ? cmsMinistry.leader?.image?.url || null : legacyMinistry.directorImage || null;
  const contactEmail = cmsMinistry ? cmsMinistry.contactEmail : legacyMinistry.contact;
  const schedule = cmsMinistry
    ? cmsMinistry.schedule
    : language === "en"
      ? legacyMinistry.schedule.en
      : legacyMinistry.schedule.es;
  const joinCta = cmsMinistry
    ? cmsMinistry.joinCta?.heading && cmsMinistry.joinCta.description && cmsMinistry.joinCta.label
      ? cmsMinistry.joinCta
      : null
    : {
        heading: language === "en" ? "Ready to Join?" : "¿Listo para Unirte?",
        description: language === "en"
          ? "We would love to have you serve with us! Contact us today to get started."
          : "¡Nos encantaría que sirvieras con nosotros! Contáctanos hoy para comenzar.",
        label: language === "en" ? "Contact Us Now" : "Contactanos Ahora",
      };

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="relative -mt-20">
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[440px] overflow-hidden bg-gradient-to-br from-sky-500/80 to-blue-700">
            <Image
              src={heroImage}
              alt={heroImageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/70 to-blue-700/75" />

            <div className="absolute inset-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-3xl rotate-12"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-20 right-20 w-48 h-80 bg-white/15 rounded-3xl -rotate-6"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute bottom-20 left-1/4 w-96 h-48 bg-white/10 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-10 right-10 w-72 h-72 bg-white/15 rounded-3xl rotate-45"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/20 rounded-full"
              />
            </div>

            <div className="absolute top-0 left-0 right-0 z-20">
              <div className="container mx-auto px-4 lg:px-40 pt-56 md:pt-52 lg:pt-48">
                <Link
                  href="/#ministries"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-3 py-2 text-white backdrop-blur-md shadow-lg transition-colors hover:bg-black/65 md:px-4 md:py-2.5 md:hover:text-amber-200 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm uppercase tracking-widest font-semibold">
                    {language === "en" ? "Back to Ministries" : "Volver a los ministerios"}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 lg:px-40 relative z-20 -mt-32 md:-mt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto rounded-[2rem] border border-white/60 bg-background/95 backdrop-blur-xl shadow-2xl p-6 md:p-10"
            >
              <span className="inline-flex px-4 py-1.5 bg-primary/10 text-primary text-xs md:text-sm font-semibold uppercase tracking-[0.18em] rounded-full">
                {language === "en" ? "Ministry" : "Ministerio"}
              </span>
              <motion.h1
                className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-base md:text-lg leading-relaxed text-foreground/80 text-pretty max-w-3xl"
              >
                  {shortDescription}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10 md:py-16 bg-gradient-to-b from-background via-background to-muted/30">
          <div className="container mx-auto px-4 lg:px-40">
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
                  className="mb-12"
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
                    <h2 className="text-3xl font-serif font-bold">
                      {language === "en" ? "What We Do" : "Lo Que Hacemos"}
                    </h2>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activities.map((activity, index) => (
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
                            {activity.text}
                          </span>
                        </div>
                        {activity.zoomUrl && (
                          <div className="relative mt-3 pl-9">
                            <a
                              href={activity.zoomUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/20"
                            >
                              Link a Zoom
                            </a>
                          </div>
                        )}
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
                {leader && (
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-card/50 border border-primary/30 p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Subtle background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-amber-500/5" />
                    
                    <div className="relative">
                      {leaderImage && (
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
                              src={leaderImage}
                              alt={leader.imageAltText || leader.name || "Director"}
                              fill
                              className="object-cover rounded-full ring-4 ring-background shadow-xl"
                            />
                          </div>
                        </motion.div>
                      )}
                      <div className="text-center">
                        <h3 className="font-bold text-xl text-foreground">
                          {leader.roleLabel}
                        </h3>
                        <p className="text-primary font-semibold text-2xl leading-relaxed">
                          {leader.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {schedule && (
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-blue-50 to-blue-50/50 p-6 shadow-md dark:from-blue-950/30 dark:to-blue-900/20"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">
                        {language === "en" ? "Schedule" : "Horario"}
                      </h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{schedule}</p>
                  </motion.div>
                )}

                {contactEmail && (
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-green-50 to-green-50/50 p-6 shadow-md dark:from-green-950/30 dark:to-green-900/20"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg">
                        {language === "en" ? "Contact" : "Contacto"}
                      </h3>
                    </div>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="block break-all text-foreground/80 font-medium underline-offset-4 hover:underline"
                    >
                      {contactEmail}
                    </a>
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
                {joinCta && contactEmail && <motion.div
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
                        {joinCta.heading}
                      </h3>
                    </div>
                    <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                      {joinCta.description}
                    </p>
                    <Button asChild variant="secondary" className="w-full rounded-xl font-semibold group-hover:scale-105 transition-transform">
                      <a href={`mailto:${contactEmail}`}>
                        {joinCta.label}
                      </a>
                    </Button>
                  </div>
                </motion.div>}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
