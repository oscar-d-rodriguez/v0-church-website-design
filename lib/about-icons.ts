import { Heart, Sparkles, Target, type LucideIcon } from "lucide-react";

export type AboutIconKey = "heart" | "sparkles" | "target";

export const aboutIconMap: Record<AboutIconKey, LucideIcon> = {
  heart: Heart,
  sparkles: Sparkles,
  target: Target,
};

export function getAboutIcon(iconKey: string): LucideIcon {
  return aboutIconMap[iconKey as AboutIconKey] || Heart;
}
