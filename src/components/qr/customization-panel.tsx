import { useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassPanel } from "@/components/glass/glass-card";
import { useWizardStore } from "@/store/wizardStore";
import type { QRStyle } from "@/lib/qr/types";
import { cn } from "@/lib/utils";

const PRESETS: {
  name: string;
  fgColor: string;
  bgColor: string;
  style: QRStyle;
  gradient?: boolean;
  gradientColors?: [string, string];
}[] = [
  { name: "Classic", fgColor: "#0F172A", bgColor: "#FFFFFF", style: "rounded" },
  {
    name: "Aurora",
    fgColor: "#34d399",
    bgColor: "#0F172A",
    style: "dots",
    gradient: true,
    gradientColors: ["#34d399", "#8b5cf6"],
  },
  { name: "Ocean", fgColor: "#2563eb", bgColor: "#eff6ff", style: "rounded" },
  { name: "Sunset", fgColor: "#db2777", bgColor: "#fff1f2", style: "dots" },
  { name: "Mono", fgColor: "#111111", bgColor: "#f5f5f5", style: "squares" },
  {
    name: "Violet",
    fgColor: "#7c3aed",
    bgColor: "#faf5ff",
    style: "rounded",
    gradient: true,
    gradientColors: ["#8b5cf6", "#ec4899"],
  },
];

const STYLES: { value: QRStyle; label: string }[] = [
  { value: "squares", label: "Squares" },
  { value: "rounded", label: "Rounded" },
  { value: "dots", label: "Dots" },
];

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-transparent p-1"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-input bg-background/60 px-3 text-sm uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
    </div>
  );
}

export function CustomizationPanel() {
  const { customization, setCustomization } = useWizardStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomization({
        logoImage: ev.target?.result as string,
        errorCorrection: "H",
      });
    };
    reader.readAsDataURL(file);
  };

  const maxLogo = Math.floor(customization.size * 0.22);

  return (
    <div className="flex flex-col gap-6">
      {/* Presets */}
      <section className="flex flex-col gap-3">
        <Label>Quick presets</Label>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() =>
                setCustomization({
                  fgColor: p.fgColor,
                  bgColor: p.bgColor,
                  style: p.style,
                  gradient: p.gradient ?? false,
                  gradientColors: p.gradientColors ?? customization.gradientColors,
                })
              }
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 px-3 py-2 text-xs font-medium transition-colors hover:bg-secondary"
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-black/10"
                style={{
                  background: p.gradient
                    ? `linear-gradient(135deg, ${p.gradientColors?.[0]}, ${p.gradientColors?.[1]})`
                    : p.fgColor,
                }}
              />
              {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* Style */}
      <section className="flex flex-col gap-3">
        <Label>Module style</Label>
        <div className="grid grid-cols-3 gap-2">
          {STYLES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setCustomization({ style: s.value })}
              className={cn(
                "cursor-pointer rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                customization.style === s.value
                  ? "border-accent bg-accent/15 text-foreground"
                  : "border-border/70 hover:bg-secondary"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section className="grid grid-cols-2 gap-3">
        <ColorField
          label="Foreground"
          value={customization.fgColor}
          onChange={(v) => setCustomization({ fgColor: v })}
        />
        <ColorField
          label="Background"
          value={customization.bgColor}
          onChange={(v) => setCustomization({ bgColor: v })}
        />
      </section>

      {/* Gradient */}
      <GlassPanel className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <Label>Gradient fill</Label>
          <Switch
            checked={customization.gradient}
            onCheckedChange={(v) => setCustomization({ gradient: v })}
          />
        </div>
        {customization.gradient && (
          <div className="grid grid-cols-2 gap-3">
            <ColorField
              label="From"
              value={customization.gradientColors[0]}
              onChange={(v) =>
                setCustomization({
                  gradientColors: [v, customization.gradientColors[1]],
                })
              }
            />
            <ColorField
              label="To"
              value={customization.gradientColors[1]}
              onChange={(v) =>
                setCustomization({
                  gradientColors: [customization.gradientColors[0], v],
                })
              }
            />
          </div>
        )}
      </GlassPanel>

      {/* Size */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label>Size</Label>
          <span className="text-sm text-muted-foreground">
            {customization.size}px
          </span>
        </div>
        <Slider
          min={160}
          max={512}
          step={16}
          value={[customization.size]}
          onValueChange={([v]) => setCustomization({ size: v })}
        />
      </section>

      {/* Logo */}
      <section className="flex flex-col gap-3">
        <Label>Center logo</Label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleLogo}
          className="hidden"
        />
        {!customization.logoImage ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus className="size-4" />
            Upload logo
          </Button>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1">
                <img
                  src={customization.logoImage}
                  alt="Logo preview"
                  className="h-full w-full object-contain"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCustomization({ logoImage: null })}
              >
                <Trash2 className="size-4" />
                Remove
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Label>Logo size</Label>
              <span className="text-sm text-muted-foreground">
                {customization.logoSize}px
              </span>
            </div>
            <Slider
              min={24}
              max={maxLogo}
              step={4}
              value={[Math.min(customization.logoSize, maxLogo)]}
              onValueChange={([v]) => setCustomization({ logoSize: v })}
            />
          </div>
        )}
      </section>

      {/* Effects + error correction */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
          <Label>Drop shadow</Label>
          <Switch
            checked={customization.shadow}
            onCheckedChange={(v) => setCustomization({ shadow: v })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Error correction</Label>
          <Select
            value={customization.errorCorrection}
            onValueChange={(v) =>
              setCustomization({
                errorCorrection: v as "L" | "M" | "Q" | "H",
              })
            }
          >
            <SelectTrigger disabled={Boolean(customization.logoImage)}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Low (7%)</SelectItem>
              <SelectItem value="M">Medium (15%)</SelectItem>
              <SelectItem value="Q">Quartile (25%)</SelectItem>
              <SelectItem value="H">High (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  );
}
