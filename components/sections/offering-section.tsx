"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { ArrowRight, HeartHandshake, Landmark, Send, Sparkles } from "lucide-react";

export function OfferingSection() {
  const { language, t } = useLanguage();
  const paypalDonationUrl =
    "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=iglesiahosannabellevue@gmail.com&item_name=Donation&currency_code=USD";

  const givingPoints = [
    {
      icon: Sparkles,
      title: language === "en" ? "Tithes & Offerings" : "Diezmos y Ofrendas",
      description:
        language === "en"
          ? "Support the ministry, worship, and the ongoing work of the church."
          : "Apoya el ministerio, la adoración y el trabajo continuo de la iglesia.",
    },
    {
      icon: HeartHandshake,
      title: language === "en" ? "Missions & Outreach" : "Misiones y Alcance",
      description:
        language === "en"
          ? "Help us reach people, serve families, and care for the community."
          : "Ayúdanos a alcanzar personas, servir familias y cuidar a la comunidad.",
    },
    {
      icon: Landmark,
      title: language === "en" ? "Building Fund" : "Fondo de Construcción",
      description:
        language === "en"
          ? "Contribute to the future growth and facilities of the church."
          : "Contribuye al crecimiento futuro y a las instalaciones de la iglesia.",
    },
  ];

  return (
    <section id="offering" className="py-32 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-muted/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-[0.4em]">
            {t.offering.subtitle}
          </span>
          <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 mb-6 text-balance tracking-wider">
            {t.offering.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.offering.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-2xl border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                  {language === "en" ? "Give with purpose" : "Da con propósito"}
                </p>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  {language === "en" ? "Support the ministry today" : "Apoya al ministerio hoy"}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                  {language === "en"
                    ? "Your generosity helps us continue worship, discipleship, outreach, and care for our church family."
                    : "Tu generosidad nos ayuda a continuar la adoración, el discipulado, el alcance y el cuidado de nuestra familia iglesia."}
                </p>

                <a
                  href={paypalDonationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
                >
                  {language === "en" ? "Donate with PayPal" : "Donar con PayPal"}
                  <ArrowRight className="h-4 w-4" />
                </a>

                <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    {language === "en" ? "PayPal account" : "Cuenta de PayPal"}
                  </p>
                  <p className="font-semibold text-foreground">iglesiahosannabellevue@gmail.com</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {language === "en"
                      ? "If you prefer, you can also send your gift directly from your PayPal app or website."
                      : "Si lo prefieres, también puedes enviar tu ofrenda directamente desde tu app o sitio web de PayPal."}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {givingPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="rounded-3xl border border-border bg-background/80 p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{point.title}</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6">
                <div className="flex items-center gap-3 text-primary mb-3">
                  <Send className="h-5 w-5" />
                  <p className="font-semibold uppercase tracking-[0.25em] text-sm">
                    {language === "en" ? "Every gift matters" : "Cada donación importa"}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {language === "en"
                    ? "Thank you for partnering with us in faith and generosity."
                    : "Gracias por asociarte con nosotros en fe y generosidad."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
