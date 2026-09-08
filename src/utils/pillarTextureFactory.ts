import * as THREE from 'three';
import type { PillarArtworkConfig, GraffitiStyle } from '../data/pillarArtworks';

export type { GraffitiStyle };

export interface GraffitiRenderOptions {
  style?: GraffitiStyle;
  hasUnderline?: boolean;
  hasDrips?: boolean;
  rotation?: number;
  widthPx?: number;
  heightPx?: number;
}

export class PillarTextureFactory {
  // Generate high-resolution authentic wheatpaste poster texture
  static createPosterTexture(config: PillarArtworkConfig): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1460;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const w = canvas.width;
    const h = canvas.height;

    // 1. Deckled Torn Wheatpaste Edge Path
    ctx.save();
    ctx.beginPath();
    const margin = 28;
    const jag = 7;
    
    // Top edge
    ctx.moveTo(margin, margin);
    for (let x = margin; x < w - margin; x += 18) {
      ctx.lineTo(x, margin + (Math.random() - 0.5) * jag);
    }
    // Right edge
    for (let y = margin; y < h - margin; y += 18) {
      ctx.lineTo(w - margin + (Math.random() - 0.5) * jag, y);
    }
    // Bottom edge
    for (let x = w - margin; x > margin; x -= 18) {
      ctx.lineTo(x, h - margin + (Math.random() - 0.5) * jag);
    }
    // Left edge
    for (let y = h - margin; y > margin; y -= 18) {
      ctx.lineTo(margin + (Math.random() - 0.5) * jag, y);
    }
    ctx.closePath();
    ctx.clip();

    // 2. Paper Base & Wrinkle Grain
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#f5f3ee');
    grad.addColorStop(0.5, '#ede9e1');
    grad.addColorStop(1, '#e4dfd5');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Fine paper aggregate noise
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 16;
      d[i] = Math.min(255, Math.max(0, d[i] + n));
      d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + n));
      d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + n));
    }
    ctx.putImageData(imgData, 0, 0);

    // Paper diagonal crinkles & wheatpaste folds
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 2.5;
    for (let c = 0; c < 8; c++) {
      ctx.beginPath();
      const startX = Math.random() * w;
      const startY = Math.random() * h;
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + (Math.random() - 0.5) * 300,
        startY + Math.random() * 200,
        startX + (Math.random() - 0.5) * 400,
        startY + Math.random() * 400,
        startX + (Math.random() - 0.5) * 500,
        startY + Math.random() * 600
      );
      ctx.stroke();
    }

    // Wheatpaste translucent glue stain around borders
    ctx.strokeStyle = 'rgba(180, 160, 130, 0.35)';
    ctx.lineWidth = 16;
    ctx.stroke();

    if (config.projectId === 'frutiger-aero') {
      // 1. Frutiger Aero Sky & Meadow Gradient Base
      const aeroGrad = ctx.createLinearGradient(0, 0, 0, h);
      aeroGrad.addColorStop(0, '#0288d1');
      aeroGrad.addColorStop(0.55, '#4fc3f7');
      aeroGrad.addColorStop(0.78, '#81c784');
      aeroGrad.addColorStop(1, '#388e3c');
      ctx.fillStyle = aeroGrad;
      ctx.fillRect(0, 0, w, h);

      // Sunburst Glow at Top
      const sunGrad = ctx.createRadialGradient(w / 2, 80, 20, w / 2, 80, 450);
      sunGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      sunGrad.addColorStop(0.4, 'rgba(224, 247, 250, 0.4)');
      sunGrad.addColorStop(1, 'rgba(2, 136, 209, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, w, 550);

      // Procedural Floating Water Bubbles on Poster
      const bubbleCoords = [
        { x: 140, y: 320, r: 42 },
        { x: w - 180, y: 260, r: 56 },
        { x: 260, y: 720, r: 35 },
        { x: w - 130, y: 840, r: 48 },
        { x: w / 2 - 200, y: 1100, r: 38 },
        { x: w - 240, y: 1220, r: 44 }
      ];
      bubbleCoords.forEach(b => {
        const bGrad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
        bGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        bGrad.addColorStop(0.5, 'rgba(129, 212, 250, 0.3)');
        bGrad.addColorStop(1, 'rgba(2, 136, 209, 0.6)');
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Specular glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.28, b.r * 0.16, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Aero Glass Window Frame (Home Screen Viewport)
      const winX = 65;
      const winY = 160;
      const winW = w - 130;
      const winH = 1100;
      const winR = 28;

      ctx.save();
      // Window shadow
      ctx.shadowColor = 'rgba(0, 40, 90, 0.35)';
      ctx.shadowBlur = 32;
      ctx.shadowOffsetY = 16;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.roundRect(winX, winY, winW, winH, winR);
      ctx.fill();
      ctx.restore();

      // Window Glass Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(winX, winY, winW, winH, winR);
      ctx.stroke();

      // Top Glass Title Bar
      const barH = 75;
      const barGrad = ctx.createLinearGradient(0, winY, 0, winY + barH);
      barGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      barGrad.addColorStop(0.5, 'rgba(224, 242, 254, 0.85)');
      barGrad.addColorStop(1, 'rgba(186, 230, 253, 0.65)');
      ctx.fillStyle = barGrad;
      ctx.beginPath();
      ctx.roundRect(winX, winY, winW, barH, [winR, winR, 0, 0]);
      ctx.fill();

      // Aqua Window Buttons
      const btnY = winY + barH / 2;
      [
        { color: '#f87171', border: '#dc2626', x: winX + 35 },
        { color: '#fbbf24', border: '#d97706', x: winX + 65 },
        { color: '#4ade80', border: '#16a34a', x: winX + 95 }
      ].forEach(btn => {
        ctx.fillStyle = btn.color;
        ctx.beginPath();
        ctx.arc(btn.x, btnY, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = btn.border;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Window Title
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ECO-SPHERE // BIO-AERO CLOUD PORTAL', winX + 130, btnY + 8);

      // Hero Content Inside Window
      ctx.font = '900 86px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0284c7';
      ctx.fillText(config.code, winX + 45, winY + 200);

      ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.fillText('ECO-SPHERE', winX + 45, winY + 270);

      ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#0369a1';
      ctx.fillText('FRUTIGER AERO // CAPABILITY SHOWCASE', winX + 45, winY + 310);

      // High-Gloss Telemetry Card
      const cardX = winX + 45;
      const cardY = winY + 350;
      const cardW = winW - 90;
      const cardH = 360;
      const cardGrad = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
      cardGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      cardGrad.addColorStop(1, 'rgba(240, 249, 255, 0.7)');
      ctx.fillStyle = cardGrad;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3 Dials inside Telemetry Card
      const dials = [
        { label: 'SOLAR GRID', val: '98.4%', col: '#f59e0b', cx: cardX + cardW * 0.2 },
        { label: 'HYDRO FLOW', val: '14.2 M/S', col: '#0284c7', cx: cardX + cardW * 0.5 },
        { label: 'BIO PURITY', val: '99.8%', col: '#10b981', cx: cardX + cardW * 0.8 }
      ];
      dials.forEach(d => {
        const cy = cardY + 160;
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.5)';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.arc(d.cx, cy, 65, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = d.col;
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(d.cx, cy, 65, -Math.PI / 2, Math.PI * 0.75);
        ctx.stroke();

        ctx.fillStyle = '#0f172a';
        ctx.font = '900 28px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(d.val, d.cx, cy + 10);

        ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#475569';
        ctx.fillText(d.label, d.cx, cy + 120);
        ctx.textAlign = 'left';
      });

      // Tags
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 28px "JetBrains Mono", monospace';
      ctx.fillText('FEATURE SPECIFICATIONS:', winX + 45, winY + 770);

      ctx.font = '700 22px "JetBrains Mono", monospace';
      config.tags.forEach((tag, idx) => {
        ctx.fillStyle = '#0369a1';
        ctx.fillText(`• ${tag}`, winX + 45, winY + 820 + idx * 45);
      });

      // Large Glossy Pill CTA Button
      const btnW = 480;
      const btnH = 75;
      const btnBx = winX + (winW - btnW) / 2;
      const btnBy = winY + 980;
      const pGrad = ctx.createLinearGradient(0, btnBy, 0, btnBy + btnH);
      pGrad.addColorStop(0, '#38bdf8');
      pGrad.addColorStop(0.5, '#0284c7');
      pGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.roundRect(btnBx, btnBy, btnW, btnH, 38);
      ctx.fill();

      // Top Specular Sheen on Button
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.roundRect(btnBx + 4, btnBy + 3, btnW - 8, btnH * 0.45, 30);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LAUNCH LIVE SHOWCASE WEBSITE', btnBx + btnW / 2, btnBy + 46);
      ctx.textAlign = 'left';

      // Official Stamp
      ctx.save();
      ctx.translate(w - 200, 1310);
      ctx.rotate(-0.1);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 4;
      ctx.strokeRect(-120, -40, 240, 80);
      ctx.fillStyle = '#0284c7';
      ctx.font = '900 22px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AUTHENTIC AERO', 0, -5);
      ctx.font = '700 15px "JetBrains Mono", monospace';
      ctx.fillText('CAPABILITY VERIFIED', 0, 22);
      ctx.restore();
    } else {
      // 3. Brutalist Poster Content & Typography
      ctx.fillStyle = '#09090b';

      // Top Metadata strip
      ctx.font = '900 32px "JetBrains Mono", monospace';
      ctx.fillText(`ARCHITECTURAL SPEC // ${config.code}`, 65, 110);

      ctx.font = '700 24px "JetBrains Mono", monospace';
      ctx.fillStyle = '#52525b';
      ctx.fillText('EET STUDIO / ISTANBUL', w - 380, 110);

      // Divider line
      ctx.fillStyle = '#09090b';
      ctx.fillRect(65, 135, w - 130, 8);

      // Giant Project Code Callout
      ctx.font = '900 160px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(config.code, 65, 300);

      // Project Title
      ctx.font = '900 68px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(config.title, 65, 390);

      // Accent Block
      ctx.fillStyle = config.accentColor;
      ctx.fillRect(65, 425, 240, 12);

      // Wireframe Geometric Blueprint Graphic
      ctx.strokeStyle = 'rgba(9, 9, 11, 0.85)';
      ctx.lineWidth = 3;
      ctx.strokeRect(65, 480, w - 130, 360);

      // Diagonal architectural grid inside the box
      ctx.strokeStyle = 'rgba(9, 9, 11, 0.15)';
      ctx.lineWidth = 1.5;
      for (let gx = 65; gx < w - 65; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 480);
        ctx.lineTo(gx, 840);
        ctx.stroke();
      }
      for (let gy = 480; gy < 840; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(65, gy);
        ctx.lineTo(w - 65, gy);
        ctx.stroke();
      }

      // Focal schematic geometry
      ctx.strokeStyle = config.accentColor;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(w / 2, 660, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#09090b';
      ctx.lineWidth = 4;
      ctx.strokeRect(w / 2 - 80, 580, 160, 160);

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(w / 2 - 140, 660);
      ctx.lineTo(w / 2 + 140, 660);
      ctx.moveTo(w / 2, 520);
      ctx.lineTo(w / 2, 800);
      ctx.stroke();

      // Tags & Specifications List
      ctx.fillStyle = '#18181b';
      ctx.font = '800 36px "JetBrains Mono", monospace';
      ctx.fillText('CORE ATTRIBUTES:', 65, 920);

      ctx.font = '600 28px "JetBrains Mono", monospace';
      config.tags.forEach((tag, idx) => {
        ctx.fillStyle = '#27272a';
        ctx.fillText(`[${idx + 1}] ${tag}`, 65, 980 + idx * 50);
      });

      // Barcode Strip at Bottom
      const barY = 1240;
      ctx.fillStyle = '#09090b';
      for (let bx = 65; bx < 480; bx += Math.floor(Math.random() * 8) + 4) {
        const bw = Math.floor(Math.random() * 5) + 2;
        ctx.fillRect(bx, barY, bw, 90);
      }
      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.fillText(`AUTHENTICATED // EET-${config.code}-2026`, 65, 1365);

      // Official Stamp Badge
      ctx.save();
      ctx.translate(w - 220, 1260);
      ctx.rotate(-0.15);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 6;
      ctx.strokeRect(-120, -50, 240, 100);
      ctx.fillStyle = '#dc2626';
      ctx.font = '900 28px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('APPROVED', 0, -10);
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.fillText('PORTFOLIO VAULT', 0, 25);
      ctx.restore();
    }

    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  }

  // Generate high-contrast vinyl street sticker
  static createStickerTexture(
    text: string,
    bg: string,
    fg: string,
    rotation = 0,
    widthPx = 640,
    heightPx = 220
  ): THREE.CanvasTexture {
    // Dynamically expand canvas resolution for long text strings (e.g. full email addresses)
    const effectiveWidth = Math.max(widthPx, Math.min(1024, text.length * 36));
    const canvas = document.createElement('canvas');
    canvas.width = effectiveWidth;
    canvas.height = heightPx;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.save();
    if (rotation !== 0) {
      ctx.translate(effectiveWidth / 2, heightPx / 2);
      ctx.rotate(rotation);
      ctx.translate(-effectiveWidth / 2, -heightPx / 2);
    }

    // Rounded Sticker Background
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.roundRect(14, 14, effectiveWidth - 28, heightPx - 28, 16);
    ctx.fill();

    // Sticker Outer Edge Border
    ctx.strokeStyle = fg;
    ctx.lineWidth = 5;
    ctx.stroke();

    // Holographic/gloss sheen corner highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(18, 18);
    ctx.lineTo(effectiveWidth / 2, 18);
    ctx.lineTo(18, heightPx - 18);
    ctx.closePath();
    ctx.fill();

    // Text Label with dynamic auto-scaling to guarantee it never overflows or clips
    ctx.fillStyle = fg;
    const maxTextWidth = effectiveWidth - 56;
    let fontSize = 34;
    ctx.font = `900 ${fontSize}px "JetBrains Mono", monospace`;
    let measured = ctx.measureText(text).width;
    while (measured > maxTextWidth && fontSize > 16) {
      fontSize -= 1.5;
      ctx.font = `900 ${fontSize}px "JetBrains Mono", monospace`;
      measured = ctx.measureText(text).width;
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, effectiveWidth / 2, heightPx / 2);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  // Generate authentic street graffiti across 5 distinct typographic styles
  static createGraffitiTexture(
    text: string,
    color: string,
    options: GraffitiRenderOptions = {}
  ): THREE.CanvasTexture {
    const {
      style = 'subway-handstyle',
      hasUnderline = true,
      hasDrips = true,
      rotation = 0,
      widthPx = 1280,
      heightPx = 640,
    } = options;

    const canvas = document.createElement('canvas');
    canvas.width = widthPx;
    canvas.height = heightPx;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;

    // 1. Select distinct font family & base size by style
    let fontFamily = '"Sedgwick Ave Display", cursive';
    let baseFontSize = 124;
    let outlineWidth = 14;

    if (style === 'chisel-marker') {
      fontFamily = '"Permanent Marker", sans-serif';
      baseFontSize = 120;
      outlineWidth = 12;
    } else if (style === 'eroded-stencil') {
      fontFamily = '"Rubik Dirt", sans-serif';
      baseFontSize = 114;
      outlineWidth = 10;
    } else if (style === 'wild-scribble') {
      fontFamily = '"Rock Salt", cursive';
      baseFontSize = 104;
      outlineWidth = 10;
    } else if (style === 'block-throwup') {
      fontFamily = '"Bungee", sans-serif';
      baseFontSize = 138; // Extra large, heroic scale!
      outlineWidth = 20;
    }

    // Dynamic font scaler: ensure text NEVER overflows canvas width
    const maxTextW = widthPx * 0.72;
    let fontSize = baseFontSize;
    ctx.font = `italic 900 ${fontSize}px ${fontFamily}, sans-serif`;
    let textW = ctx.measureText(text).width;
    while (textW > maxTextW && fontSize > 16) {
      fontSize -= 4;
      ctx.font = `italic 900 ${fontSize}px ${fontFamily}, sans-serif`;
      textW = ctx.measureText(text).width;
    }
    // Proportional safety clamp if long edge-case string still exceeds maxTextW
    if (textW > maxTextW && textW > 0) {
      fontSize = Math.max(10, Math.floor(fontSize * (maxTextW / textW)));
      ctx.font = `italic 900 ${fontSize}px ${fontFamily}, sans-serif`;
      textW = ctx.measureText(text).width;
    }

    const cy = h / 2 - fontSize * 0.25;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw rotated handstyle lettering and flourishes
    ctx.save();
    if (rotation !== 0) {
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.translate(-cx, -cy);
    }

    // Tight Dark Contour Border (Bonded directly to concrete, NO floating drop shadow!)
    ctx.save();
    ctx.strokeStyle = '#050505';
    ctx.lineWidth = outlineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeText(text, cx, cy);
    ctx.restore();

    // High-Pressure Aerosol Mist Halo (Soft spray can edge)
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = style === 'block-throwup' ? 38 : 26;
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(6, outlineWidth * 0.7);
    ctx.globalAlpha = 0.65;
    ctx.strokeText(text, cx, cy);
    ctx.restore();

    // Saturated Spray Core Fill
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillText(text, cx, cy);
    ctx.restore();

    // Stencil Slit Cutouts (for eroded-stencil style)
    if (style === 'eroded-stencil') {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.clearRect(cx - textW * 0.32, cy - fontSize * 0.6, 6, fontSize * 1.2);
      ctx.clearRect(cx + textW * 0.12, cy - fontSize * 0.6, 6, fontSize * 1.2);
      ctx.restore();
    }

    // Diverse Underline Flourish Styles
    if (hasUnderline && style !== 'block-throwup') {
      const lineY = cy + fontSize * 0.54;
      const startLineX = cx - textW * 0.50;
      const endLineX = cx + textW * 0.52;

      ctx.save();
      if (style === 'chisel-marker') {
        // Double parallel chisel underline
        ctx.strokeStyle = '#050505';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startLineX, lineY);
        ctx.lineTo(endLineX, lineY);
        ctx.moveTo(startLineX + 25, lineY + 14);
        ctx.lineTo(endLineX - 25, lineY + 14);
        ctx.stroke();

        ctx.strokeStyle = color;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(startLineX, lineY);
        ctx.lineTo(endLineX, lineY);
        ctx.moveTo(startLineX + 25, lineY + 14);
        ctx.lineTo(endLineX - 25, lineY + 14);
        ctx.stroke();
      } else if (style === 'wild-scribble') {
        // Jagged zigzag scratch underline
        ctx.strokeStyle = '#050505';
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(startLineX, lineY);
        for (let seg = 1; seg <= 6; seg++) {
          const sx = startLineX + ((endLineX - startLineX) / 6) * seg;
          const sy = lineY + (seg % 2 === 0 ? 8 : -8);
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(startLineX, lineY);
        for (let seg = 1; seg <= 6; seg++) {
          const sx = startLineX + ((endLineX - startLineX) / 6) * seg;
          const sy = lineY + (seg % 2 === 0 ? 8 : -8);
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      } else {
        // Subway sweeping curve with arrowhead
        ctx.strokeStyle = '#050505';
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startLineX, lineY);
        ctx.quadraticCurveTo(cx, lineY + 12, endLineX, lineY - 8);
        ctx.stroke();

        ctx.shadowColor = color;
        ctx.shadowBlur = 16;
        ctx.strokeStyle = color;
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(startLineX, lineY);
        ctx.quadraticCurveTo(cx, lineY + 12, endLineX, lineY - 8);
        ctx.stroke();

        // Arrow flick
        ctx.beginPath();
        ctx.moveTo(endLineX - 20, lineY - 24);
        ctx.lineTo(endLineX + 14, lineY - 8);
        ctx.lineTo(endLineX - 12, lineY + 6);
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.restore();
    }

    // End rotated context
    ctx.restore();

    // Natural Gravity Drips (if enabled for style)
    if (hasDrips) {
      ctx.save();
      const dripCount = style === 'block-throwup'
        ? Math.floor(Math.min(10, Math.max(5, text.length * 0.9)))
        : style === 'wild-scribble'
        ? Math.floor(Math.min(12, Math.max(6, text.length * 1.4)))
        : Math.floor(Math.min(8, Math.max(4, text.length * 0.9)));

      for (let i = 0; i < dripCount; i++) {
        const tNorm = (i + 0.5) / dripCount + (Math.random() - 0.5) * 0.16;
        const localDx = -textW * 0.44 + tNorm * textW * 0.88;
        const localDy = fontSize * 0.35 + (Math.random() - 0.5) * 10;
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const rotDx = localDx * cosR - localDy * sinR;
        const rotDy = localDx * sinR + localDy * cosR;
        const dripX = cx + rotDx;
        const startY = cy + rotDy;

        const dripW = style === 'block-throwup' ? 4.5 + Math.random() * 2.5 : 2.5 + Math.random() * 2.5;
        const beadR = dripW * 1.35;
        const maxAvailableDrip = Math.max(0, h - 25 - beadR - startY);
        if (maxAvailableDrip < 8) continue; // Skip drip if text is too close to bottom border

        const maxLen = style === 'wild-scribble' ? 140 : 85;
        const dripLen = Math.min(maxAvailableDrip, 28 + Math.random() * maxLen);

        // Dark back stroke
        ctx.strokeStyle = '#050505';
        ctx.lineWidth = dripW + 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(dripX, startY);
        const midX = dripX + (Math.random() - 0.5) * 3;
        const endX = dripX + (Math.random() - 0.5) * 4;
        ctx.quadraticCurveTo(midX, startY + dripLen * 0.6, endX, startY + dripLen);
        ctx.stroke();

        // Color drip
        ctx.strokeStyle = color;
        ctx.lineWidth = dripW;
        ctx.beginPath();
        ctx.moveTo(dripX, startY);
        ctx.quadraticCurveTo(midX, startY + dripLen * 0.6, endX, startY + dripLen);
        ctx.stroke();

        // Droplet bead
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(endX, startY + dripLen, beadR, 0, Math.PI * 2);
        ctx.fill();

        if (Math.random() > 0.5 && startY + dripLen + beadR * 3 < h - 15) {
          ctx.beginPath();
          ctx.arc(endX + (Math.random() - 0.5) * 3, startY + dripLen + beadR * 2.5, beadR * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }

    // Aerosol Spray Splatters & Mist Specks
    ctx.save();
    const speckCount = style === 'eroded-stencil' ? 1400 : 700;
    for (let i = 0; i < speckCount; i++) {
      const rx = Math.max(15, Math.min(w - 15, cx + (Math.random() - 0.5) * (textW + 160)));
      const ry = Math.max(15, Math.min(h - 15, cy + (Math.random() - 0.5) * (fontSize * 2.0)));
      const r = Math.random() * 2.0 + 0.3;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.random() * 0.40;
      ctx.fill();
    }
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  }
}
