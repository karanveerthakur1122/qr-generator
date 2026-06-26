/**
 * Core QR domain types shared across the engine, forms, store and history.
 */

export type QRType =
  | "text"
  | "url"
  | "multi-url"
  | "email"
  | "phone"
  | "sms"
  | "contact"
  | "app-link"
  | "wifi"
  | "geo"
  | "event"
  | "upi";

export type QRStyle = "squares" | "dots" | "rounded";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

/** Free-form, type-specific field bag captured by the forms. */
export type QRFormData = Record<string, string>;

export interface QRCustomization {
  fgColor: string;
  bgColor: string;
  size: number;
  style: QRStyle;
  logoImage: string | null;
  logoSize: number;
  errorCorrection: ErrorCorrectionLevel;
  gradient: boolean;
  gradientColors: [string, string];
  shadow: boolean;
  margin: number;
}

export const DEFAULT_CUSTOMIZATION: QRCustomization = {
  fgColor: "#0F172A",
  bgColor: "#FFFFFF",
  size: 288,
  style: "rounded",
  logoImage: null,
  logoSize: 56,
  errorCorrection: "L",
  gradient: false,
  gradientColors: ["#34d399", "#8b5cf6"],
  shadow: true,
  margin: 2,
};

export type QRCategory = "Basic" | "Contact" | "Network" | "Payment";

export interface QRTypeMeta {
  id: QRType;
  label: string;
  /** lucide-react icon name */
  icon: string;
  description: string;
  category: QRCategory;
}

/** Single source of truth for the type grid, wizard and history labels. */
export const QR_TYPES: QRTypeMeta[] = [
  {
    id: "text",
    label: "Text",
    icon: "Type",
    description: "Encode any plain text or note.",
    category: "Basic",
  },
  {
    id: "url",
    label: "Website",
    icon: "Link",
    description: "Open a single website or link.",
    category: "Basic",
  },
  {
    id: "multi-url",
    label: "Multi-link",
    icon: "Link2",
    description: "Bundle several links together.",
    category: "Basic",
  },
  {
    id: "email",
    label: "Email",
    icon: "Mail",
    description: "Compose an email with subject & body.",
    category: "Contact",
  },
  {
    id: "phone",
    label: "Phone",
    icon: "Phone",
    description: "Dial a phone number instantly.",
    category: "Contact",
  },
  {
    id: "sms",
    label: "SMS",
    icon: "MessageSquare",
    description: "Pre-fill a text message.",
    category: "Contact",
  },
  {
    id: "contact",
    label: "Contact",
    icon: "Contact",
    description: "Share a full vCard contact.",
    category: "Contact",
  },
  {
    id: "app-link",
    label: "App",
    icon: "Smartphone",
    description: "Link to an app store listing.",
    category: "Basic",
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    icon: "Wifi",
    description: "Join a Wi-Fi network in one scan.",
    category: "Network",
  },
  {
    id: "geo",
    label: "Location",
    icon: "MapPin",
    description: "Drop a map pin at coordinates.",
    category: "Network",
  },
  {
    id: "event",
    label: "Event",
    icon: "CalendarDays",
    description: "Add a calendar event.",
    category: "Network",
  },
  {
    id: "upi",
    label: "Payment",
    icon: "Wallet",
    description: "UPI or crypto payment request.",
    category: "Payment",
  },
];

export function getTypeMeta(id: QRType): QRTypeMeta {
  return QR_TYPES.find((t) => t.id === id) ?? QR_TYPES[0];
}
