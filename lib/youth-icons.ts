import { BookOpen, Mountain, Music2, type LucideIcon } from "lucide-react";

export type YouthActivityIconKey = "bookOpen" | "music2" | "mountain";

export const youthActivityIconMap: Record<YouthActivityIconKey, LucideIcon> = {
  bookOpen: BookOpen,
  music2: Music2,
  mountain: Mountain,
};

export function getYouthActivityIcon(iconKey: string): LucideIcon {
  return youthActivityIconMap[iconKey as YouthActivityIconKey] || BookOpen;
}