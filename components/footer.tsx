"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useSiteConfiguration } from "@/components/site-configuration-provider";

export function Footer() {
  const { t } = useLanguage();
  const siteConfiguration = useSiteConfiguration();

  const logoUrl = siteConfiguration?.organizationLogo?.url || "/images/logo.png";
  const logoAlt = siteConfiguration?.organizationLogo?.description || siteConfiguration?.organizationName || t.churchName;

  const sectionHref = (id: string) => `/#${id}`;

  const fallbackQuickLinks = [
    { href: sectionHref("home"), label: t.nav.home },
    { href: sectionHref("about"), label: t.nav.about },
    { href: sectionHref("ministries"), label: t.nav.ministries },
    { href: sectionHref("youth"), label: t.nav.youth },
    { href: sectionHref("events"), label: t.nav.events },
    { href: sectionHref("offering"), label: t.nav.offering },
    { href: sectionHref("contact"), label: t.nav.contact },
  ];

  const socialIconByPlatform = { facebook: Facebook, instagram: Instagram, youtube: Youtube };
  const fallbackSocialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/iglesiahosannabellevue/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/iglesiahosannabellevue/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@IglesiaHosanna", label: "YouTube" },
  ];
  const footer = siteConfiguration?.footer;
  const quickLinks = footer?.quickLinks.length
    ? footer.quickLinks
    : fallbackQuickLinks;
  const socialLinks = footer?.socialLinks.length
    ? footer.socialLinks.map((social) => ({
        icon: socialIconByPlatform[social.platform],
        href: social.href,
        label: social.platform,
      }))
    : fallbackSocialLinks;
  const contactInfo = footer
    ? [
        footer.contactInfo.address,
        footer.contactInfo.phone,
        footer.contactInfo.email,
      ].filter((value): value is string => Boolean(value))
    : ["15220 Main St", "Bellevue, WA 98007", "(425) 644-6356", "iglesia.hosanna@gmail.com"];

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
            <Link href={sectionHref("home")} className="flex items-center gap-3 mb-6">
              <div className="relative h-14 w-44">
                <Image
                    src={logoUrl}
                    alt={logoAlt}
                  fill
                  sizes="176px"
                  className="object-contain brightness-0 invert dark:hidden"
                />
                <div
                  className="hidden dark:block absolute inset-0 bg-primary"
                  style={{
                      WebkitMaskImage: `url('${logoUrl}')`,
                      maskImage: `url('${logoUrl}')`,
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
              {footer?.tagline || t.footer.tagline}
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
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">{footer?.quickLinksHeading || t.footer.quickLinks}</h3>
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
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">{footer?.connectHeading || t.footer.connect}</h3>
            <address className="not-italic text-background/60 space-y-3 text-sm">
              {contactInfo.map((value) => <p key={value}>{value}</p>)}
            </address>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-background/50 text-sm text-center">
            {new Date().getFullYear()} {t.churchName}. {footer?.copyright || t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
