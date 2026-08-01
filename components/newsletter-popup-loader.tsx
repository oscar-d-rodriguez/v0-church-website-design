"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const NewsletterPopup = dynamic(
  () => import("@/components/newsletter-popup").then((mod) => mod.NewsletterPopup),
  { ssr: false, loading: () => null }
);

export function NewsletterPopupLoader() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowPopup(true);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, []);

  if (!showPopup) {
    return null;
  }

  return <NewsletterPopup />;
}
