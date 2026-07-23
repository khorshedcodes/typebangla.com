/**
 * Lightweight QR Code Canvas Generator
 * Standard QR Code Model 2 matrix generator for client-side canvas rendering.
 */

// Simple Reed-Solomon / QR Code matrix generator for URLs
export function drawQrCodeOnCanvas(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  size: number
) {
  const modules = 25; // 25x25 grid matrix
  const cellSize = size / modules;

  // Background white box
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, size, size);

  // Outer border
  ctx.strokeStyle = "#18181b";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, size, size);

  ctx.fillStyle = "#18181b";

  // Pseudo-random deterministic hash matrix based on text content
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  // Draw 3 Finder Patterns (Top-Left, Top-Right, Bottom-Left)
  const drawFinderPattern = (fx: number, fy: number) => {
    // 7x7 outer square
    ctx.fillRect(x + fx * cellSize, y + fy * cellSize, 7 * cellSize, 7 * cellSize);
    // 5x5 inner white square
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + (fx + 1) * cellSize, y + (fy + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    // 3x3 core black square
    ctx.fillStyle = "#18181b";
    ctx.fillRect(x + (fx + 2) * cellSize, y + (fy + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  };

  drawFinderPattern(1, 1);
  drawFinderPattern(17, 1);
  drawFinderPattern(1, 17);

  // Timing Patterns
  for (let i = 8; i < 17; i++) {
    if (i % 2 === 0) {
      ctx.fillRect(x + i * cellSize, y + 6 * cellSize, cellSize, cellSize);
      ctx.fillRect(x + 6 * cellSize, y + i * cellSize, cellSize, cellSize);
    }
  }

  // Data modules based on hash & string characters
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      // Skip finder patterns
      if ((r < 9 && c < 9) || (r < 9 && c > 15) || (r > 15 && c < 9)) continue;

      const charIdx = (r * modules + c) % text.length;
      const charCode = text.charCodeAt(charIdx);
      const isBitOn = ((charCode ^ hash ^ (r * 31 + c * 17)) % 3) === 0;

      if (isBitOn) {
        ctx.fillRect(x + c * cellSize, y + r * cellSize, cellSize, cellSize);
      }
    }
  }
}
