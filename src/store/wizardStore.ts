import { create } from "zustand";

import {
  DEFAULT_CUSTOMIZATION,
  type QRCustomization,
  type QRFormData,
  type QRType,
} from "@/lib/qr/types";

export const WIZARD_STEPS = ["type", "content", "design", "export"] as const;
export type WizardStep = (typeof WIZARD_STEPS)[number];

interface WizardState {
  stepIndex: number;
  type: QRType;
  formData: QRFormData;
  /** whether the current form data has passed validation */
  isContentValid: boolean;
  customization: QRCustomization;

  setStep: (index: number) => void;
  next: () => void;
  prev: () => void;
  setType: (type: QRType) => void;
  setFormData: (data: QRFormData, valid: boolean) => void;
  setCustomization: (patch: Partial<QRCustomization>) => void;
  resetCustomization: () => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  stepIndex: 0,
  type: "url",
  formData: {},
  isContentValid: false,
  customization: { ...DEFAULT_CUSTOMIZATION },

  setStep: (index) =>
    set({ stepIndex: Math.max(0, Math.min(index, WIZARD_STEPS.length - 1)) }),

  next: () =>
    set((s) => ({
      stepIndex: Math.min(s.stepIndex + 1, WIZARD_STEPS.length - 1),
    })),

  prev: () => set((s) => ({ stepIndex: Math.max(s.stepIndex - 1, 0) })),

  setType: (type) =>
    set((s) =>
      s.type === type
        ? { type }
        : { type, formData: {}, isContentValid: false }
    ),

  setFormData: (formData, isContentValid) => set({ formData, isContentValid }),

  setCustomization: (patch) =>
    set((s) => ({ customization: { ...s.customization, ...patch } })),

  resetCustomization: () =>
    set({ customization: { ...DEFAULT_CUSTOMIZATION } }),

  reset: () =>
    set({
      stepIndex: 0,
      type: "url",
      formData: {},
      isContentValid: false,
      customization: { ...DEFAULT_CUSTOMIZATION },
    }),
}));
