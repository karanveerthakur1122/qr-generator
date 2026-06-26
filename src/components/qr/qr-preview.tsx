import { type ReactNode } from "react";
import { QrCode, ShieldCheck, TriangleAlert } from "lucide-react";

import { GlassCard } from "@/components/glass/glass-card";
import { QRCanvas } from "@/components/qr/qr-canvas";
import { buildPayload } from "@/lib/qr/payloads";
import { useWizardStore } from "@/store/wizardStore";
import { cn } from "@/lib/utils";

export function useLivePayload() {
  const type = useWizardStore((s) => s.type);
  const formData = useWizardStore((s) => s.formData);
  return buildPayload(type, formData);
}

function scanQuality(logo: boolean, logoSize: number, size: number) {
  if (!logo) return { ok: true, msg: "Optimized for clean scanning" };
  const area = (logoSize * logoSize) / (size * size);
  if (area <= 0.05) return { ok: true, msg: "Logo size looks scan-safe" };
  return { ok: false, msg: "Large logo may reduce scannability" };
}

export function QRPreview({
  children,
  compact = false,
}: {
  children?: ReactNode;
  compact?: boolean;
}) {
  const customization = useWizardStore((s) => s.customization);
  const payload = useLivePayload();
  const hasContent = payload.content.trim().length > 0;
  const quality = scanQuality(
    Boolean(customization.logoImage),
    customization.logoSize,
    customization.size
  );

  const renderSize = compact ? 150 : 256;

  return (
    <GlassCard className="flex flex-col items-center gap-5 p-6">
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Live preview
        </span>
        {hasContent && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              quality.ok
                ? "bg-accent/15 text-accent"
                : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
            )}
          >
            {quality.ok ? (
              <ShieldCheck className="size-3.5" />
            ) : (
              <TriangleAlert className="size-3.5" />
            )}
            {quality.ok ? "Scan ready" : "Check size"}
          </span>
        )}
      </div>

      <div
        className="flex items-center justify-center rounded-2xl p-4"
        style={{ minHeight: renderSize + 32, minWidth: renderSize + 32 }}
      >
        {hasContent ? (
          <QRCanvas
            content={payload.content}
            customization={customization}
            renderSize={renderSize}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
            <QrCode className="size-12 opacity-40" />
            <p className="max-w-[12rem] text-sm">
              Your QR code will appear here as you type.
            </p>
          </div>
        )}
      </div>

      {hasContent && (
        <p className="text-center text-sm text-muted-foreground">
          {payload.label}
        </p>
      )}

      {children}
    </GlassCard>
  );
}
