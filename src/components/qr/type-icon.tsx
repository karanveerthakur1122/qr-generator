import {
  CalendarDays,
  Contact,
  Link,
  Link2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Smartphone,
  Type,
  Wallet,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Type,
  Link,
  Link2,
  Mail,
  Phone,
  MessageSquare,
  Contact,
  Smartphone,
  Wifi,
  MapPin,
  CalendarDays,
  Wallet,
};

export function TypeIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Type;
  return <Icon className={className} aria-hidden="true" />;
}
