import type { QRFormData, QRType } from "@/lib/qr/types";

export type FieldKind =
  | "text"
  | "textarea"
  | "url"
  | "email"
  | "tel"
  | "number"
  | "select"
  | "datetime"
  | "switch";

export interface FieldDef {
  name: string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
  hint?: string;
  options?: { value: string; label: string }[];
  /** grid span on >=sm screens */
  colSpan?: 1 | 2;
  /** only show when this predicate passes (conditional fields) */
  showIf?: (data: QRFormData) => boolean;
  defaultValue?: string;
}

/** Declarative field groups for every QR type. */
export const FIELD_CONFIG: Record<QRType, FieldDef[]> = {
  text: [
    {
      name: "text",
      label: "Text content",
      kind: "textarea",
      placeholder: "Type anything you want to encode...",
      colSpan: 2,
      hint: "Up to 2500 characters for reliable scanning.",
    },
  ],
  url: [
    {
      name: "url",
      label: "Website URL",
      kind: "url",
      placeholder: "https://example.com",
      colSpan: 2,
    },
  ],
  "multi-url": [
    {
      name: "urls",
      label: "URLs (one per line)",
      kind: "textarea",
      placeholder: "https://example.com\nhttps://github.com",
      colSpan: 2,
      hint: "Each line must be a full URL starting with http(s)://",
    },
  ],
  email: [
    {
      name: "email",
      label: "Email address",
      kind: "email",
      placeholder: "hello@example.com",
      colSpan: 2,
    },
    { name: "subject", label: "Subject", kind: "text", placeholder: "Optional subject", colSpan: 2 },
    {
      name: "body",
      label: "Message",
      kind: "textarea",
      placeholder: "Optional message body",
      colSpan: 2,
    },
  ],
  phone: [
    {
      name: "phone",
      label: "Phone number",
      kind: "tel",
      placeholder: "+1 555 123 4567",
      colSpan: 2,
      hint: "Include the country code for international numbers.",
    },
  ],
  sms: [
    { name: "smsNumber", label: "Phone number", kind: "tel", placeholder: "+1 555 123 4567", colSpan: 2 },
    {
      name: "smsMessage",
      label: "Message",
      kind: "textarea",
      placeholder: "Pre-filled text message...",
      colSpan: 2,
    },
  ],
  contact: [
    { name: "firstName", label: "First name", kind: "text", placeholder: "John" },
    { name: "lastName", label: "Last name", kind: "text", placeholder: "Doe" },
    { name: "organization", label: "Organization", kind: "text", placeholder: "Acme Inc." },
    { name: "title", label: "Job title", kind: "text", placeholder: "Product Designer" },
    { name: "contactPhone", label: "Phone", kind: "tel", placeholder: "+1 555 123 4567" },
    { name: "contactEmail", label: "Email", kind: "email", placeholder: "john@example.com" },
    { name: "website", label: "Website", kind: "text", placeholder: "https://example.com", colSpan: 2 },
    { name: "address", label: "Address", kind: "textarea", placeholder: "123 Main St, City", colSpan: 2 },
  ],
  "app-link": [
    { name: "appName", label: "App name", kind: "text", placeholder: "My App", colSpan: 2 },
    {
      name: "platform",
      label: "Platform",
      kind: "select",
      defaultValue: "ios",
      options: [
        { value: "ios", label: "iOS App Store" },
        { value: "android", label: "Google Play" },
        { value: "web", label: "Web App" },
      ],
    },
    { name: "appLink", label: "App link", kind: "url", placeholder: "https://apps.apple.com/..." },
  ],
  wifi: [
    { name: "ssid", label: "Network name (SSID)", kind: "text", placeholder: "MyNetwork", colSpan: 2 },
    {
      name: "encryption",
      label: "Security",
      kind: "select",
      defaultValue: "WPA",
      options: [
        { value: "WPA", label: "WPA/WPA2/WPA3" },
        { value: "WEP", label: "WEP" },
        { value: "nopass", label: "No password" },
      ],
    },
    {
      name: "password",
      label: "Password",
      kind: "text",
      placeholder: "Network password",
      showIf: (d) => d.encryption !== "nopass",
    },
    {
      name: "hidden",
      label: "Hidden network",
      kind: "switch",
      defaultValue: "false",
      colSpan: 2,
      hint: "Enable if the network does not broadcast its SSID.",
    },
  ],
  geo: [
    { name: "latitude", label: "Latitude", kind: "text", placeholder: "37.7749" },
    { name: "longitude", label: "Longitude", kind: "text", placeholder: "-122.4194" },
  ],
  event: [
    { name: "eventTitle", label: "Event title", kind: "text", placeholder: "Product launch", colSpan: 2 },
    { name: "location", label: "Location", kind: "text", placeholder: "San Francisco, CA", colSpan: 2 },
    { name: "startDate", label: "Starts", kind: "datetime" },
    { name: "endDate", label: "Ends", kind: "datetime" },
    {
      name: "description",
      label: "Description",
      kind: "textarea",
      placeholder: "Optional details",
      colSpan: 2,
    },
  ],
  upi: [
    {
      name: "method",
      label: "Payment method",
      kind: "select",
      defaultValue: "upi",
      colSpan: 2,
      options: [
        { value: "upi", label: "UPI (India)" },
        { value: "crypto", label: "Crypto (BIP21)" },
      ],
    },
    {
      name: "upiId",
      label: "UPI ID",
      kind: "text",
      placeholder: "name@bank",
      showIf: (d) => (d.method || "upi") === "upi",
    },
    {
      name: "payeeName",
      label: "Payee name",
      kind: "text",
      placeholder: "Merchant name",
      showIf: (d) => (d.method || "upi") === "upi",
    },
    {
      name: "coin",
      label: "Coin",
      kind: "select",
      defaultValue: "bitcoin",
      showIf: (d) => d.method === "crypto",
      options: [
        { value: "bitcoin", label: "Bitcoin" },
        { value: "ethereum", label: "Ethereum" },
        { value: "litecoin", label: "Litecoin" },
      ],
    },
    {
      name: "address",
      label: "Wallet address",
      kind: "text",
      placeholder: "Wallet address",
      showIf: (d) => d.method === "crypto",
    },
    { name: "amount", label: "Amount", kind: "text", placeholder: "Optional amount" },
    { name: "note", label: "Note", kind: "text", placeholder: "Optional note" },
  ],
};

/** Build the default form values for a type from its field config. */
export function defaultsFor(type: QRType): QRFormData {
  const out: QRFormData = {};
  for (const f of FIELD_CONFIG[type]) {
    out[f.name] = f.defaultValue ?? "";
  }
  return out;
}
