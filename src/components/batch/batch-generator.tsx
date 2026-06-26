import { useRef, useState } from "react";
import { FileDown, FileText, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlassCard, GlassPanel } from "@/components/glass/glass-card";
import { QRCanvas } from "@/components/qr/qr-canvas";
import { renderFullCanvas } from "@/lib/qr/export";
import { DEFAULT_CUSTOMIZATION } from "@/lib/qr/types";

function parseEntries(raw: string): string[] {
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 100);
}

function triggerBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function BatchGenerator() {
  const [raw, setRaw] = useState("");
  const [entries, setEntries] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const customization = { ...DEFAULT_CUSTOMIZATION, size: 220, shadow: false };

  const generate = () => {
    const parsed = parseEntries(raw);
    if (parsed.length === 0) {
      toast.error("Add at least one line of content");
      return;
    }
    setEntries(parsed);
    toast.success(`Generated ${parsed.length} QR codes`);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setRaw((ev.target?.result as string) ?? "");
    reader.readAsText(file);
  };

  const downloadZip = async () => {
    setBusy("zip");
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      for (let i = 0; i < entries.length; i++) {
        const canvas = await renderFullCanvas(entries[i], customization, 3);
        const blob: Blob | null = await new Promise((res) =>
          canvas.toBlob((b) => res(b), "image/png")
        );
        if (blob) zip.file(`qr-${String(i + 1).padStart(3, "0")}.png`, blob);
      }
      const out = await zip.generateAsync({ type: "blob" });
      triggerBlob(out, "qr-studio-batch.zip");
      toast.success("ZIP downloaded");
    } catch {
      toast.error("Could not build ZIP");
    } finally {
      setBusy(null);
    }
  };

  const downloadPdf = async () => {
    setBusy("pdf");
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const cols = 3;
      const cell = (pageW - 20) / cols;
      const margin = 10;
      let x = margin;
      let y = margin;

      for (let i = 0; i < entries.length; i++) {
        const canvas = await renderFullCanvas(entries[i], customization, 2);
        const img = canvas.toDataURL("image/png");
        const qrSize = cell - 8;
        pdf.addImage(img, "PNG", x + 4, y + 2, qrSize, qrSize);
        pdf.setFontSize(7);
        pdf.text(
          entries[i].slice(0, 28),
          x + cell / 2,
          y + qrSize + 6,
          { align: "center", maxWidth: cell }
        );
        x += cell;
        if ((i + 1) % cols === 0) {
          x = margin;
          y += cell + 4;
          if (y + cell > pageH - margin && i < entries.length - 1) {
            pdf.addPage();
            y = margin;
          }
        }
      }
      pdf.save("qr-studio-batch.pdf");
      toast.success("PDF downloaded");
    } catch {
      toast.error("Could not build PDF");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <GlassCard className="flex flex-col gap-4 p-5 sm:p-7">
        <div>
          <h2 className="text-xl font-semibold">Batch generator</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste one URL or text per line (or upload a .csv/.txt). Generate up
            to 100 QR codes at once.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="batch-input">Content list</Label>
          <Textarea
            id="batch-input"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={"https://example.com\nhttps://github.com\nHello world"}
            className="min-h-36"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="accent" onClick={generate}>
            <Sparkles className="size-4" />
            Generate
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.txt,text/csv,text/plain"
            onChange={handleFile}
            className="hidden"
          />
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4" />
            Upload file
          </Button>
          {entries.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {entries.length} codes
            </span>
          )}
        </div>
      </GlassCard>

      {entries.length > 0 && (
        <GlassCard className="flex flex-col gap-5 p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Results</h3>
            <div className="flex gap-2">
              <Button
                variant="accent"
                disabled={busy !== null}
                onClick={downloadZip}
              >
                <FileDown className="size-4" />
                {busy === "zip" ? "Zipping..." : "ZIP"}
              </Button>
              <Button
                variant="outline"
                disabled={busy !== null}
                onClick={downloadPdf}
              >
                <FileText className="size-4" />
                {busy === "pdf" ? "Building..." : "PDF"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {entries.map((entry, i) => (
              <GlassPanel
                key={`${entry}-${i}`}
                className="flex flex-col items-center gap-2 p-3"
              >
                <div className="rounded-lg bg-white p-2">
                  <QRCanvas
                    content={entry}
                    customization={customization}
                    renderSize={120}
                  />
                </div>
                <p className="w-full truncate text-center text-xs text-muted-foreground">
                  {entry}
                </p>
              </GlassPanel>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
