import { useEffect, useRef, useState } from "react";
import {
  Check,
  ClipboardCopy,
  Copy,
  FileImage,
  FileText,
  ImageDown,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/glass/glass-card";
import { useLivePayload } from "@/components/qr/qr-preview";
import {
  copyImageToClipboard,
  copyTextToClipboard,
  exportJPG,
  exportPDF,
  exportPNG,
  exportSVG,
  renderFullCanvas,
} from "@/lib/qr/export";
import { useWizardStore } from "@/store/wizardStore";
import { useHistoryStore } from "@/store/historyStore";

export function StepExport() {
  const type = useWizardStore((s) => s.type);
  const formData = useWizardStore((s) => s.formData);
  const customization = useWizardStore((s) => s.customization);
  const payload = useLivePayload();
  const addToHistory = useHistoryStore((s) => s.add);

  const [busy, setBusy] = useState<string | null>(null);
  const [copiedData, setCopiedData] = useState(false);
  const savedRef = useRef<string | null>(null);

  const filename = `qr-${type}`;

  // Auto-save this QR to history once when arriving on the export step.
  useEffect(() => {
    if (!payload.content || savedRef.current === payload.content) return;
    savedRef.current = payload.content;
    let cancelled = false;
    (async () => {
      try {
        const canvas = await renderFullCanvas(payload.content, customization, 1);
        const thumb = canvas.toDataURL("image/png");
        if (cancelled) return;
        addToHistory({
          type,
          label: payload.label,
          content: payload.content,
          formData,
          customization,
          thumbnail: thumb,
        });
      } catch {
        /* thumbnail generation is best-effort */
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.content]);

  const run = async (key: string, fn: () => Promise<void>, okMsg: string) => {
    setBusy(key);
    try {
      await fn();
      toast.success(okMsg);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  };

  const actions = [
    {
      key: "png",
      label: "PNG",
      icon: ImageDown,
      run: () => exportPNG(payload.content, customization, `${filename}.png`),
      msg: "PNG downloaded",
    },
    {
      key: "svg",
      label: "SVG",
      icon: FileImage,
      run: () => exportSVG(payload.content, customization, `${filename}.svg`),
      msg: "SVG downloaded",
    },
    {
      key: "jpg",
      label: "JPG",
      icon: FileImage,
      run: () => exportJPG(payload.content, customization, `${filename}.jpg`),
      msg: "JPG downloaded",
    },
    {
      key: "pdf",
      label: "PDF",
      icon: FileText,
      run: () => exportPDF(payload.content, customization, `${filename}.pdf`),
      msg: "PDF downloaded",
    },
    {
      key: "copy-img",
      label: "Copy image",
      icon: ClipboardCopy,
      run: () => copyImageToClipboard(payload.content, customization),
      msg: "Image copied to clipboard",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Download & share</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Export your QR in any format. It's also saved to your history
          automatically.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((a) => (
          <Button
            key={a.key}
            variant={a.key === "png" ? "accent" : "outline"}
            className="h-auto flex-col gap-2 py-4"
            disabled={busy !== null}
            onClick={() => run(a.key, a.run, a.msg)}
          >
            {busy === a.key ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <a.icon className="size-5" />
            )}
            <span className="text-sm">{a.label}</span>
          </Button>
        ))}
      </div>

      <GlassPanel className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Encoded data</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await copyTextToClipboard(payload.content);
              setCopiedData(true);
              toast.success("Data copied");
              setTimeout(() => setCopiedData(false), 1500);
            }}
          >
            {copiedData ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
            Copy
          </Button>
        </div>
        <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-background/50 p-3 text-xs text-muted-foreground">
          {payload.content}
        </pre>
      </GlassPanel>
    </div>
  );
}
