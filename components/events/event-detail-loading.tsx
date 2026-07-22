"use client";

interface EventDetailLoadingProps {
  language: "en" | "es";
}

export function EventDetailLoading({ language }: EventDetailLoadingProps) {
  void language;

  return <div className="min-h-screen bg-white" aria-hidden="true" />;
}
