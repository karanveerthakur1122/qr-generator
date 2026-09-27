import { QR_TYPES } from "./qr/types";

export const SITE_URL = "https://qr-generator-free-app.netlify.app/";
export const SITE_NAME = "QR Studio";
export const OG_IMAGE = `${SITE_URL}og-image.png`;

/** Visible FAQ copy. Structured data is built from this same list. */
export const FAQ = [
  {
    q: "Is QR Studio free?",
    a: "Yes. No account and no payment. The generator runs in your browser.",
  },
  {
    q: "Which QR codes can I create?",
    a: "Website, text, multi-link, app store, email, phone, SMS, vCard contact, Wi-Fi, map location, calendar event, and payment (UPI or crypto).",
  },
  {
    q: "Is my QR content uploaded?",
    a: "No. The code is built on your device. Content is not sent to a server to generate the QR.",
  },
  {
    q: "Which file formats can I download?",
    a: "A single code exports as PNG, SVG, JPG, or PDF. Batch mode downloads a ZIP of PNG files or one PDF.",
  },
  {
    q: "What does a Wi-Fi QR code do?",
    a: "It stores the network name, password, and security type so a phone can join after scanning. The phone still asks you to confirm.",
  },
] as const;

export const STEPS = [
  "Choose a QR type.",
  "Enter the details. The preview updates as you type.",
  "Export PNG, SVG, JPG, or PDF. Batch mode exports many codes as a ZIP or one PDF.",
] as const;

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: SITE_NAME,
        url: SITE_URL,
        image: OG_IMAGE,
        description:
          "Free online QR code generator with 12 data types, batch generation, and PNG, SVG, JPG, and PDF export.",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: QR_TYPES.map((t) => `${t.label}: ${t.description}`),
        author: {
          "@type": "Person",
          name: "Karan Veer Thakur",
          url: "https://karanveerthakur.com.np/",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
