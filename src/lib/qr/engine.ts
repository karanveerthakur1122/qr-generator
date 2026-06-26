import QRCode from "qrcode";

import type { ErrorCorrectionLevel, QRCustomization, QRStyle } from "./types";

export interface QRMatrix {
  /** number of modules per side */
  count: number;
  get: (row: number, col: number) => boolean;
}

/** Generate the QR module matrix for a given string. */
export async function createMatrix(
  content: string,
  level: ErrorCorrectionLevel
): Promise<QRMatrix> {
  const qr = await QRCode.create(content || " ", {
    errorCorrectionLevel: level,
  });
  const modules = qr.modules;
  const count = modules.size;
  return {
    count,
    get: (row: number, col: number) => Boolean(modules.get(row, col)),
  };
}

interface DrawOptions {
  size: number;
  margin: number;
  fgColor: string;
  bgColor: string;
  style: QRStyle;
  gradient: boolean;
  gradientColors: [string, string];
}

function pickDrawOptions(c: QRCustomization): DrawOptions {
  return {
    size: c.size,
    margin: c.margin,
    fgColor: c.fgColor,
    bgColor: c.bgColor,
    style: c.style,
    gradient: c.gradient,
    gradientColors: c.gradientColors,
  };
}

/**
 * Draw the QR matrix onto a 2D canvas context. Synchronous; the optional
 * center logo is composited separately (see export.ts) so live preview can
 * overlay it as a DOM node instead.
 */
export function drawMatrixToCanvas(
  ctx: CanvasRenderingContext2D,
  matrix: QRMatrix,
  customization: QRCustomization
): void {
  const opts = pickDrawOptions(customization);
  const { count } = matrix;
  const totalModules = count + opts.margin * 2;
  const moduleSize = opts.size / totalModules;

  ctx.clearRect(0, 0, opts.size, opts.size);
  ctx.fillStyle = opts.bgColor;
  ctx.fillRect(0, 0, opts.size, opts.size);

  // Foreground fill: solid color or diagonal gradient.
  let fill: string | CanvasGradient = opts.fgColor;
  if (opts.gradient) {
    const grad = ctx.createLinearGradient(0, 0, opts.size, opts.size);
    grad.addColorStop(0, opts.gradientColors[0]);
    grad.addColorStop(1, opts.gradientColors[1]);
    fill = grad;
  }
  ctx.fillStyle = fill;

  const radius = moduleSize * 0.42;

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!matrix.get(row, col)) continue;
      const x = (col + opts.margin) * moduleSize;
      const y = (row + opts.margin) * moduleSize;

      if (opts.style === "dots") {
        ctx.beginPath();
        ctx.arc(x + moduleSize / 2, y + moduleSize / 2, radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (opts.style === "rounded") {
        roundRect(ctx, x, y, moduleSize, moduleSize, moduleSize * 0.28);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, moduleSize + 0.5, moduleSize + 0.5);
      }
    }
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Build a standalone SVG string for the matrix (used for SVG export). */
export function matrixToSVGString(
  matrix: QRMatrix,
  customization: QRCustomization
): string {
  const opts = pickDrawOptions(customization);
  const { count } = matrix;
  const totalModules = count + opts.margin * 2;
  const moduleSize = opts.size / totalModules;
  const fill = opts.gradient ? "url(#qrGradient)" : opts.fgColor;

  const parts: string[] = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.size}" height="${opts.size}" viewBox="0 0 ${opts.size} ${opts.size}">`
  );
  if (opts.gradient) {
    parts.push(
      `<defs><linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%">` +
        `<stop offset="0%" stop-color="${opts.gradientColors[0]}"/>` +
        `<stop offset="100%" stop-color="${opts.gradientColors[1]}"/>` +
        `</linearGradient></defs>`
    );
  }
  parts.push(
    `<rect width="${opts.size}" height="${opts.size}" fill="${opts.bgColor}"/>`
  );

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!matrix.get(row, col)) continue;
      const x = (col + opts.margin) * moduleSize;
      const y = (row + opts.margin) * moduleSize;

      if (opts.style === "dots") {
        const cx = x + moduleSize / 2;
        const cy = y + moduleSize / 2;
        parts.push(
          `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${(moduleSize * 0.42).toFixed(2)}" fill="${fill}"/>`
        );
      } else if (opts.style === "rounded") {
        parts.push(
          `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${moduleSize.toFixed(2)}" height="${moduleSize.toFixed(2)}" rx="${(moduleSize * 0.28).toFixed(2)}" fill="${fill}"/>`
        );
      } else {
        parts.push(
          `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(moduleSize + 0.5).toFixed(2)}" height="${(moduleSize + 0.5).toFixed(2)}" fill="${fill}"/>`
        );
      }
    }
  }
  parts.push("</svg>");
  return parts.join("");
}

/** Recommend the best error-correction level for a payload length. */
export function recommendErrorCorrection(
  length: number,
  hasLogo: boolean
): ErrorCorrectionLevel {
  if (hasLogo) return "H";
  if (length > 1000) return "L";
  if (length > 500) return "M";
  if (length > 100) return "Q";
  return "H";
}
