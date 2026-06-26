import { memo, useEffect, useRef, useState } from "react";

import { createMatrix, drawMatrixToCanvas, type QRMatrix } from "@/lib/qr/engine";
import type { QRCustomization } from "@/lib/qr/types";
import { cn } from "@/lib/utils";

interface QRCanvasProps {
  content: string;
  customization: QRCustomization;
  /** rendered pixel size override (defaults to customization.size) */
  renderSize?: number;
  className?: string;
}

/**
 * Live QR renderer. Matrix generation (heavy, async) runs debounced and only
 * when the content or error-correction level changes. Repainting (cheap, sync)
 * runs whenever visual props change.
 */
function QRCanvasImpl({
  content,
  customization,
  renderSize,
  className,
}: QRCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [matrix, setMatrix] = useState<QRMatrix | null>(null);
  const size = renderSize ?? customization.size;

  // Heavy: regenerate matrix only when payload / ECC changes (debounced).
  useEffect(() => {
    if (!content) {
      setMatrix(null);
      return;
    }
    let cancelled = false;
    const id = window.setTimeout(() => {
      void createMatrix(content, customization.errorCorrection).then((m) => {
        if (!cancelled) setMatrix(m);
      });
    }, 110);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [content, customization.errorCorrection]);

  // Cheap: repaint when matrix or visual style changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !matrix) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawMatrixToCanvas(ctx, matrix, { ...customization, size });
  }, [matrix, size, customization]);

  const logoPx = (customization.logoSize / customization.size) * size;

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{
        width: size,
        height: size,
        filter: customization.shadow
          ? "drop-shadow(0 12px 24px rgba(15,23,42,0.28))"
          : "none",
      }}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ borderRadius: size * 0.05 }}
      />
      {matrix && customization.logoImage && (
        <div
          className="absolute left-1/2 top-1/2 flex items-center justify-center bg-white shadow-md"
          style={{
            width: logoPx,
            height: logoPx,
            transform: "translate(-50%, -50%)",
            borderRadius: logoPx * 0.22,
            padding: logoPx * 0.1,
          }}
        >
          <img
            src={customization.logoImage}
            alt="QR center logo"
            className="h-full w-full object-contain"
            style={{ borderRadius: logoPx * 0.14 }}
          />
        </div>
      )}
    </div>
  );
}

export const QRCanvas = memo(QRCanvasImpl);
