"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Mail, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { submitNewsletterSignup } from "@/app/actions/contact";

const STORAGE_KEY = "hosanna-newsletter-dismissed";

export function NewsletterPopup() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, "dismissed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);

    const result = await submitNewsletterSignup({ email });
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Something went wrong");
      return;
    }

    setIsSuccess(true);
    localStorage.setItem(STORAGE_KEY, "subscribed");

    // Close popup after showing success
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-lg"
          >
            <div className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-border relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors duration-150"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header with gradient background */}
              <div className="relative h-40 bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-8 w-20 h-20 rounded-full bg-white/30 blur-xl" />
                  <div className="absolute bottom-4 right-12 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
                </div>

                {/* Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={reduceMotion ? undefined : { rotate: [0, 5, -5, 0] }}
                    transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Image
                      src="/images/symbol.png"
                      alt="Hosanna"
                      width={80}
                      height={80}
                      className="drop-shadow-lg brightness-0 invert"
                    />
                  </motion.div>
                </div>

                {/* Floating sparkles */}
                <motion.div
                  animate={reduceMotion ? undefined : { y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
                  transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity }}
                  className="absolute top-6 right-16"
                >
                  <Sparkles className="w-5 h-5 text-white/60" />
                </motion.div>
                <motion.div
                  animate={reduceMotion ? undefined : { y: [5, -5, 5], opacity: [0.3, 0.8, 0.3] }}
                  transition={reduceMotion ? undefined : { duration: 2.5, repeat: Infinity }}
                  className="absolute bottom-8 left-12"
                >
                  <Sparkles className="w-4 h-4 text-white/50" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8 pt-6">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-8 h-8 text-emerald-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold font-serif mb-2">{t.newsletter.success}</h3>
                      <p className="text-muted-foreground">{t.newsletter.successMessage}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold font-serif mb-1 tracking-tight">{t.newsletter.title}</h2>
                        <p className="text-primary font-semibold text-xs uppercase tracking-[0.15em] mb-3">{t.newsletter.subtitle}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{t.newsletter.description}</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.newsletter.placeholder}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border bg-muted/30 focus:border-primary focus:ring-0 outline-none transition-all duration-150 text-foreground placeholder:text-muted-foreground"
                            disabled={isSubmitting}
                          />
                        </div>

                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm text-center"
                          >
                            {error}
                          </motion.p>
                        )}

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-6 rounded-2xl text-sm uppercase tracking-widest font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                          ) : (
                            t.newsletter.subscribe
                          )}
                        </Button>

                        <button
                          type="button"
                          onClick={handleClose}
                          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          {t.newsletter.noThanks}
                        </button>

                        <p className="text-xs text-center text-muted-foreground/70">
                          {t.newsletter.privacy}
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
