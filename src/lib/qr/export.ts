import {
  createMatrix,
  drawMatrixToCanvas,
  matrixToSVGString,
} from "./engine";
import type { QRCustomization } from "./types";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function triggerDownload(href: string, filename: string): void {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Render a fully composited QR (matrix + optional center logo) to an
 * offscreen canvas at an optional pixel scale for crisp exports.
 */
export async function renderFullCanvas(
  content: string,
  c: QRCustomization,
  scale = 2
): Promise<HTMLCanvasElement> {
  const matrix = await createMatrix(content, c.errorCorrection);
  const canvas = document.createElement("canvas");
  canvas.width = c.size * scale;
  canvas.height = c.size * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  drawMatrixToCanvas(ctx, matrix, c);

  if (c.logoImage) {
    const img = await loadImage(c.logoImage);
    const logo = c.logoSize;
    const pos = (c.size - logo) / 2;
    const pad = logo * 0.12;
    // White rounded backing plate for contrast.
    ctx.fillStyle = "#ffffff";
    const r = logo * 0.22;
    const bx = pos - pad;
    const by = pos - pad;
    const bs = logo + pad * 2;
    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.arcTo(bx + bs, by, bx + bs, by + bs, r);
    ctx.arcTo(bx + bs, by + bs, bx, by + bs, r);
    ctx.arcTo(bx, by + bs, bx, by, r);
    ctx.arcTo(bx, by, bx + bs, by, r);
    ctx.closePath();
    ctx.fill();
    ctx.drawImage(img, pos, pos, logo, logo);
  }

  return canvas;
}

export async function exportPNG(
  content: string,
  c: QRCustomization,
  filename = "qr-code.png"
): Promise<void> {
  const canvas = await renderFullCanvas(content, c, 3);
  triggerDownload(canvas.toDataURL("image/png"), filename);
}

export async function exportJPG(
  content: string,
  c: QRCustomization,
  filename = "qr-code.jpg"
): Promise<void> {
  const canvas = await renderFullCanvas(content, c, 3);
  triggerDownload(canvas.toDataURL("image/jpeg", 0.92), filename);
}

export async function exportSVG(
  content: string,
  c: QRCustomization,
  filename = "qr-code.svg"
): Promise<void> {
  const matrix = await createMatrix(content, c.errorCorrection);
  let svg = matrixToSVGString(matrix, c);

  if (c.logoImage) {
    const logo = c.logoSize;
    const pos = (c.size - logo) / 2;
    const pad = logo * 0.12;
    const plate =
      `<rect x="${(pos - pad).toFixed(2)}" y="${(pos - pad).toFixed(2)}" ` +
      `width="${(logo + pad * 2).toFixed(2)}" height="${(logo + pad * 2).toFixed(2)}" ` +
      `rx="${(logo * 0.22).toFixed(2)}" fill="#ffffff"/>`;
    const image =
      `<image href="${c.logoImage}" x="${pos.toFixed(2)}" y="${pos.toFixed(2)}" ` +
      `width="${logo}" height="${logo}" preserveAspectRatio="xMidYMid meet"/>`;
    svg = svg.replace("</svg>", `${plate}${image}</svg>`);
  }

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
  URL.revokeObjectURL(url);
}

export async function exportPDF(
  content: string,
  c: QRCustomization,
  filename = "qr-code.pdf"
): Promise<void> {
  const canvas = await renderFullCanvas(content, c, 3);
  const dataUrl = canvas.toDataURL("image/png");
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const qrMM = 100;
  const x = (pageWidth - qrMM) / 2;
  pdf.setFontSize(18);
  pdf.text("QR Studio", pageWidth / 2, 25, { align: "center" });
  pdf.addImage(dataUrl, "PNG", x, 45, qrMM, qrMM);
  pdf.save(filename);
}

/** Copy the rendered QR PNG to the clipboard (where supported). */
export async function copyImageToClipboard(
  content: string,
  c: QRCustomization
): Promise<void> {
  const canvas = await renderFullCanvas(content, c, 3);
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png")
  );
  if (!blob) throw new Error("Could not render image");
  if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
    throw new Error("Clipboard image copy is not supported in this browser");
  }
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": blob }),
  ]);
}

export async function copyTextToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}
