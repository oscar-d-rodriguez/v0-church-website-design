import { Baby, Globe, HandHeart, Music, UserCircle, Users, type LucideIcon } from "lucide-react";

export type MinistryIconKey = "music" | "baby" | "users" | "userCircle" | "globe" | "handHeart";

export const ministryIconMap: Record<MinistryIconKey, LucideIcon> = {
  music: Music,
  baby: Baby,
  users: Users,
  userCircle: UserCircle,
  globe: Globe,
  handHeart: HandHeart,
};

export function getMinistryIcon(iconKey: string): LucideIcon {
  return ministryIconMap[iconKey as MinistryIconKey] || Users;
}