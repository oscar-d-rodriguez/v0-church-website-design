"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "/#home", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#ministries", label: t.nav.ministries },
    { href: "/#youth", label: t.nav.youth },
    { href: "/#events", label: t.nav.events },
    { href: "/#offering", label: t.nav.offering },
    { href: "/#contact", label: t.nav.contact },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/iglesiahosannabellevue/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/iglesiahosannabellevue/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@IglesiaHosanna", label: "YouTube" },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link href="#home" className="flex items-center gap-3 mb-6">
              <div className="relative h-14 w-44">
                <Image
                  src="/images/logo.png"
                  alt={t.churchName}
                  fill
                  className="object-contain brightness-0 invert dark:hidden"
                />
                <div
                  className="hidden dark:block absolute inset-0 bg-primary"
                  style={{
                    WebkitMaskImage: "url('/images/logo.png')",
                    maskImage: "url('/images/logo.png')",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                  aria-hidden="true"
                />
              </div>
            </Link>
            <p className="text-background/70 text-lg mb-6 max-w-md">
              {t.footer.tagline}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/60 hover:text-background transition-colors inline-block text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">{t.footer.connect}</h3>
            <address className="not-italic text-background/60 space-y-3 text-sm">
              <p>15220 Main St</p>
              <p>Bellevue, WA 98007</p>
              <p>(555) 123-4567</p>
              <p>iglesia.hosanna@gmail.com</p>
            </address>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-background/50 text-sm text-center">
            {new Date().getFullYear()} {t.churchName}. {t.footer.copyright}.
          </p>
        </div>
      </div>
    </footer>
  );
}
