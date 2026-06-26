import type { QRFormData, QRType } from "./types";

export interface QRPayload {
  /** The string that gets encoded into the QR matrix. */
  content: string;
  /** Human-friendly "Scan to ..." label. */
  label: string;
}

const enc = encodeURIComponent;

/** Escape special characters for the WIFI: payload format. */
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

function buildVCard(data: QRFormData): string {
  const {
    firstName = "",
    lastName = "",
    contactPhone = "",
    contactEmail = "",
    organization = "",
    title = "",
    website = "",
    address = "",
  } = data;

  const lines = ["BEGIN:VCARD", "VERSION:3.0"];
  if (firstName || lastName) {
    lines.push(`FN:${`${firstName} ${lastName}`.trim()}`);
    lines.push(`N:${lastName};${firstName};;;`);
  }
  if (organization) lines.push(`ORG:${organization}`);
  if (title) lines.push(`TITLE:${title}`);
  if (contactPhone) lines.push(`TEL:${contactPhone}`);
  if (contactEmail) lines.push(`EMAIL:${contactEmail}`);
  if (website) lines.push(`URL:${website}`);
  if (address) lines.push(`ADR:;;${address};;;;`);
  lines.push("END:VCARD");
  return lines.join("\n");
}

function buildEvent(data: QRFormData): string {
  const {
    eventTitle = "",
    location = "",
    description = "",
    startDate = "",
    endDate = "",
  } = data;

  // Convert "2026-06-26T14:30" (datetime-local) to "20260626T143000".
  const toICS = (v: string) => v.replace(/[-:]/g, "").replace(/\.\d+/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${eventTitle}`,
  ];
  if (location) lines.push(`LOCATION:${location}`);
  if (description) lines.push(`DESCRIPTION:${description}`);
  if (startDate) lines.push(`DTSTART:${toICS(startDate)}`);
  if (endDate) lines.push(`DTEND:${toICS(endDate)}`);
  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\n");
}

function buildPayment(data: QRFormData): { content: string; label: string } {
  const method = data.method || "upi";

  if (method === "crypto") {
    // BIP21-style: <coin>:<address>?amount=..&label=..
    const coin = (data.coin || "bitcoin").toLowerCase();
    const address = data.address || "";
    const params: string[] = [];
    if (data.amount) params.push(`amount=${enc(data.amount)}`);
    if (data.note) params.push(`message=${enc(data.note)}`);
    const query = params.length ? `?${params.join("&")}` : "";
    return {
      content: `${coin}:${address}${query}`,
      label: "Scan to pay with crypto",
    };
  }

  // UPI (default): upi://pay?pa=..&pn=..&am=..&cu=INR&tn=..
  const params: string[] = [];
  if (data.upiId) params.push(`pa=${enc(data.upiId)}`);
  if (data.payeeName) params.push(`pn=${enc(data.payeeName)}`);
  if (data.amount) params.push(`am=${enc(data.amount)}`);
  params.push("cu=INR");
  if (data.note) params.push(`tn=${enc(data.note)}`);
  return {
    content: `upi://pay?${params.join("&")}`,
    label: "Scan to pay via UPI",
  };
}

/**
 * Build the QR content string + label for a given type and form data.
 * Ports the original qrService.generateQRData and extends it with
 * Wi-Fi, geo, event and payment types.
 */
export function buildPayload(type: QRType, data: QRFormData): QRPayload {
  switch (type) {
    case "text":
      return { content: data.text || "", label: "Scan to view text" };

    case "url":
      return { content: data.url || "", label: "Scan to visit website" };

    case "multi-url": {
      const urls = (data.urls || "")
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean);
      if (urls.length === 1) {
        return { content: urls[0], label: "Scan to visit website" };
      }
      return {
        content: `Multiple URLs:\n${urls.join("\n")}`,
        label: `Scan to view ${urls.length} URLs`,
      };
    }

    case "email": {
      let content = `mailto:${data.email || ""}`;
      const params: string[] = [];
      if (data.subject) params.push(`subject=${enc(data.subject)}`);
      if (data.body) params.push(`body=${enc(data.body)}`);
      if (params.length) content += `?${params.join("&")}`;
      return { content, label: "Scan to send email" };
    }

    case "phone":
      return { content: `tel:${data.phone || ""}`, label: "Scan to call" };

    case "sms": {
      let content = `sms:${data.smsNumber || ""}`;
      if (data.smsMessage) content += `?body=${enc(data.smsMessage)}`;
      return { content, label: "Scan to send SMS" };
    }

    case "contact":
      return { content: buildVCard(data), label: "Scan to save contact" };

    case "app-link": {
      const platform = data.platform || "ios";
      const platformLabel =
        platform === "ios"
          ? "App Store"
          : platform === "android"
            ? "Play Store"
            : "the web";
      return {
        content: data.appLink || "",
        label: `Scan to get ${data.appName || "the app"} on ${platformLabel}`,
      };
    }

    case "wifi": {
      const auth = data.encryption || "WPA";
      const ssid = escapeWifi(data.ssid || "");
      const password = escapeWifi(data.password || "");
      const hidden = data.hidden === "true" ? "true" : "false";
      const content =
        auth === "nopass"
          ? `WIFI:T:nopass;S:${ssid};;`
          : `WIFI:T:${auth};S:${ssid};P:${password};H:${hidden};;`;
      return { content, label: "Scan to join Wi-Fi" };
    }

    case "geo": {
      const lat = data.latitude || "0";
      const lng = data.longitude || "0";
      return { content: `geo:${lat},${lng}`, label: "Scan to open location" };
    }

    case "event":
      return { content: buildEvent(data), label: "Scan to add event" };

    case "upi":
      return buildPayment(data);

    default:
      return { content: "", label: "" };
  }
}
