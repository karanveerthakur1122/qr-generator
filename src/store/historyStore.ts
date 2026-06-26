import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { QRCustomization, QRFormData, QRType } from "@/lib/qr/types";

export interface HistoryItem {
  id: string;
  type: QRType;
  label: string;
  content: string;
  formData: QRFormData;
  customization: QRCustomization;
  /** small PNG data URL thumbnail */
  thumbnail: string;
  createdAt: number;
}

interface HistoryState {
  items: HistoryItem[];
  add: (item: Omit<HistoryItem, "id" | "createdAt">) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const MAX_ITEMS = 40;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((s) => {
          // De-duplicate by identical content; refresh the timestamp instead.
          const filtered = s.items.filter((i) => i.content !== item.content);
          const entry: HistoryItem = {
            ...item,
            id:
              typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            createdAt: Date.now(),
          };
          return { items: [entry, ...filtered].slice(0, MAX_ITEMS) };
        }),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "qr-studio-history" }
  )
);
