import { z } from "zod";

import type { QRType } from "./types";

const urlField = z
  .string()
  .trim()
  .url("Enter a valid URL (including https://)");

/** Per-type Zod schemas used by react-hook-form via zodResolver. */
export const qrSchemas = {
  text: z.object({
    text: z
      .string()
      .trim()
      .min(1, "Text is required")
      .max(2500, "Keep text under 2500 characters for reliable scanning"),
  }),

  url: z.object({
    url: urlField,
  }),

  "multi-url": z.object({
    urls: z
      .string()
      .trim()
      .min(1, "Add at least one URL")
      .max(1800, "Too many URLs - keep the list under 1800 characters")
      .refine(
        (val) =>
          val
            .split("\n")
            .map((u) => u.trim())
            .filter(Boolean)
            .every((u) => /^https?:\/\/.+/i.test(u)),
        "Each line must be a valid URL starting with http(s)://"
      ),
  }),

  email: z.object({
    email: z.string().trim().email("Enter a valid email address"),
    subject: z.string().max(200).optional().or(z.literal("")),
    body: z
      .string()
      .max(800, "Message is too long")
      .optional()
      .or(z.literal("")),
  }),

  phone: z.object({
    phone: z
      .string()
      .trim()
      .min(3, "Phone number is required")
      .regex(/^[+]?[\d\s()-]+$/, "Enter a valid phone number"),
  }),

  sms: z.object({
    smsNumber: z
      .string()
      .trim()
      .min(3, "Phone number is required")
      .regex(/^[+]?[\d\s()-]+$/, "Enter a valid phone number"),
    smsMessage: z
      .string()
      .trim()
      .min(1, "Message is required")
      .max(600, "Keep SMS under 600 characters"),
  }),

  contact: z
    .object({
      firstName: z.string().trim().optional().or(z.literal("")),
      lastName: z.string().trim().optional().or(z.literal("")),
      organization: z.string().optional().or(z.literal("")),
      title: z.string().optional().or(z.literal("")),
      contactPhone: z.string().optional().or(z.literal("")),
      contactEmail: z
        .string()
        .email("Enter a valid email")
        .optional()
        .or(z.literal("")),
      website: z.string().optional().or(z.literal("")),
      address: z.string().optional().or(z.literal("")),
    })
    .refine((d) => Boolean(d.firstName || d.lastName), {
      message: "Enter at least a first or last name",
      path: ["firstName"],
    }),

  "app-link": z.object({
    appName: z.string().trim().min(1, "App name is required"),
    platform: z.enum(["ios", "android", "web"]).default("ios"),
    appLink: urlField,
  }),

  wifi: z
    .object({
      ssid: z.string().trim().min(1, "Network name (SSID) is required"),
      encryption: z.enum(["WPA", "WEP", "nopass"]).default("WPA"),
      password: z.string().optional().or(z.literal("")),
      hidden: z.enum(["true", "false"]).default("false"),
    })
    .refine((d) => d.encryption === "nopass" || Boolean(d.password), {
      message: "Password is required for secured networks",
      path: ["password"],
    }),

  geo: z.object({
    latitude: z
      .string()
      .trim()
      .refine((v) => {
        const n = Number(v);
        return !Number.isNaN(n) && n >= -90 && n <= 90;
      }, "Latitude must be between -90 and 90"),
    longitude: z
      .string()
      .trim()
      .refine((v) => {
        const n = Number(v);
        return !Number.isNaN(n) && n >= -180 && n <= 180;
      }, "Longitude must be between -180 and 180"),
  }),

  event: z
    .object({
      eventTitle: z.string().trim().min(1, "Event title is required"),
      location: z.string().optional().or(z.literal("")),
      description: z.string().optional().or(z.literal("")),
      startDate: z.string().min(1, "Start date & time is required"),
      endDate: z.string().optional().or(z.literal("")),
    })
    .refine(
      (d) => !d.endDate || new Date(d.endDate) >= new Date(d.startDate),
      { message: "End time must be after the start time", path: ["endDate"] }
    ),

  upi: z
    .object({
      method: z.enum(["upi", "crypto"]).default("upi"),
      // UPI
      upiId: z.string().optional().or(z.literal("")),
      payeeName: z.string().optional().or(z.literal("")),
      // crypto
      coin: z.string().optional().or(z.literal("")),
      address: z.string().optional().or(z.literal("")),
      // shared
      amount: z.string().optional().or(z.literal("")),
      note: z.string().optional().or(z.literal("")),
    })
    .refine((d) => (d.method === "crypto" ? Boolean(d.address) : Boolean(d.upiId)), {
      message: "Enter a UPI ID or crypto address",
      path: ["upiId"],
    }),
} as const;

export type QRSchemaMap = typeof qrSchemas;

export function getSchema(type: QRType) {
  return qrSchemas[type];
}
