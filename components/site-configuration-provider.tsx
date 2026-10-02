"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SiteConfiguration } from "@/lib/site-configuration";
import { useLanguage } from "@/lib/language-context";

const SiteConfigurationContext = createContext<SiteConfiguration | null>(null);

function resolvePublicApiBaseUrl(): string {
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicApiUrl) {
    return `${publicApiUrl.replace(/\/$/, "")}/api`;
  }

  return "http://localhost:8080/api";
}

function mapLanguageToLocale(language: string): "en-US" | "es" {
  return language === "es" ? "es" : "en-US";
}

export function SiteConfigurationProvider({
  value,
  children,
}: {
  value: SiteConfiguration | null;
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const [siteConfiguration, setSiteConfiguration] = useState<SiteConfiguration | null>(value);

  useEffect(() => {
    let active = true;

    const loadSiteConfiguration = async () => {
      try {
        const locale = mapLanguageToLocale(language);
        const url = new URL(`${resolvePublicApiBaseUrl()}/content/site-configuration`);
        url.searchParams.set("locale", locale);

        const response = await fetch(url.toString(), {
          cache: "no-store",
        });

        if (!response.ok || !active) {
          return;
        }

        const payload = (await response.json()) as {
          siteConfiguration?: SiteConfiguration | null;
        };

        if (active) {
          setSiteConfiguration(payload.siteConfiguration ?? null);
        }
      } catch {
        if (active) {
          setSiteConfiguration(value);
        }
      }
    };

    loadSiteConfiguration();

    return () => {
      active = false;
    };
  }, [language, value]);

  return (
    <SiteConfigurationContext.Provider value={siteConfiguration}>
      {children}
    </SiteConfigurationContext.Provider>
  );
}

export function useSiteConfiguration() {
  return useContext(SiteConfigurationContext);
}
