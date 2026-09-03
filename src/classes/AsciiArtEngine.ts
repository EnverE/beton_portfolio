// ============================================================================
// ASCII ART ENGINE - SEPARATE MODULAR CLASS (WITH GLITCH TRANSITIONS)
// Isolated, self-contained ASCII Art transformation system for 3D Pillar & UI.
// To remove this feature, simply delete this class and its React trigger.
// ============================================================================

export type AsciiTheme = 'green' | 'amber' | 'mono';

export interface AsciiEngineState {
  active: boolean;
  theme: AsciiTheme;
  isTransitioning: boolean;
  transitionType: 'activate' | 'revert' | null;
}

export class AsciiArtEngine {
  private active: boolean = false;
  private isTransitioning: boolean = false;
  private transitionType: 'activate' | 'revert' | null = null;
  private animId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private sampleCanvas: HTMLCanvasElement | null = null;
  private sampleCtx: CanvasRenderingContext2D | null = null;
  private webglCanvas: HTMLCanvasElement | null = null;
  private styleEl: HTMLStyleElement | null = null;
  private glitchStyleEl: HTMLStyleElement | null = null;
  private theme: AsciiTheme = 'green';
  private listeners: Set<(state: AsciiEngineState) => void> = new Set();
  private keydownHandler: ((e: KeyboardEvent) => void) | null = null;
  private resizeHandler: (() => void) | null = null;

  // Character ramp from low to high density
  private readonly CHAR_RAMP = '   ..::--==++**##%%@@';

  constructor() {
    if (typeof window !== 'undefined') {
      this.initKeybindings();
      this.injectGlitchStyles();
    }
  }

  public getState(): AsciiEngineState {
    return {
      active: this.active,
      theme: this.theme,
      isTransitioning: this.isTransitioning,
      transitionType: this.transitionType,
    };
  }

  public isActive(): boolean {
    return this.active;
  }

  public getTheme(): AsciiTheme {
    return this.theme;
  }

  public setTheme(t: AsciiTheme): void {
    this.theme = t;
    this.updateStyles();
    this.notify();
  }

  public subscribe(fn: (state: AsciiEngineState) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  // Toggle with Glitch & Screen Shake Transition
  public toggle(): boolean {
    if (this.isTransitioning) return this.active;
    this.toggleWithGlitch();
    return !this.active;
  }

  public toggleWithGlitch(): void {
    if (this.isTransitioning) return;

    const targetActive = !this.active;
    this.isTransitioning = true;
    this.transitionType = targetActive ? 'activate' : 'revert';

    // Apply visceral screen shake to the document body
    const shakeClass = targetActive ? 'screen-glitch-active' : 'screen-glitch-reverse';
    document.body.classList.add(shakeClass);

    this.notify();

    // Halfway through the glitch (at peak glitch slice / tear), switch the core mode
    setTimeout(() => {
      if (targetActive) {
        this.enableCore();
      } else {
        this.disableCore();
      }
      this.notify();
    }, 220);

    // Settle transition after 500ms
    setTimeout(() => {
      this.isTransitioning = false;
      this.transitionType = null;
      document.body.classList.remove('screen-glitch-active', 'screen-glitch-reverse');
      this.notify();
    }, 500);
  }

  private enableCore(): void {
    if (this.active) return;
    this.active = true;

    this.findWebglCanvas();
    this.createAsciiCanvas();
    this.injectStyles();
    this.startLoop();

    document.documentElement.classList.add('ascii-art-active');
  }

  private disableCore(): void {
    if (!this.active) return;
    this.active = false;

    this.stopLoop();
    this.removeAsciiCanvas();
    this.removeStyles();

    if (this.webglCanvas) {
      this.webglCanvas.style.opacity = '1';
    }

    document.documentElement.classList.remove('ascii-art-active');
  }

  public enable(): void {
    if (this.active) return;
    this.toggleWithGlitch();
  }

  public disable(): void {
    if (!this.active) return;
    this.toggleWithGlitch();
  }

  private initKeybindings(): void {
    this.keydownHandler = (e: KeyboardEvent) => {
      // Secret Hotkey: Alt + A or Ctrl + Shift + A
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.active) {
        this.disable();
      }
    };
    window.addEventListener('keydown', this.keydownHandler);
  }

  private findWebglCanvas(): void {
    const canvases = Array.from(document.querySelectorAll('canvas'));
    // Find the 3D pillar canvas (exclude our own ascii canvas if present)
    this.webglCanvas = canvases.find((c) => c.id !== 'ascii-pillar-canvas') || null;
    if (this.webglCanvas) {
      this.webglCanvas.style.opacity = '0';
      this.webglCanvas.style.transition = 'opacity 0.25s ease';
    }
  }

  private createAsciiCanvas(): void {
    if (this.canvas) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'ascii-pillar-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.inset = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '5'; // Above background, below UI text/interactive controls
    this.canvas.style.imageRendering = 'pixelated';

    this.ctx = this.canvas.getContext('2d', { alpha: true });

    this.sampleCanvas = document.createElement('canvas');
    this.sampleCtx = this.sampleCanvas.getContext('2d', { willReadFrequently: true });

    this.updateCanvasSize();

    this.resizeHandler = () => this.updateCanvasSize();
    window.addEventListener('resize', this.resizeHandler);

    document.body.appendChild(this.canvas);
  }

  private updateCanvasSize(): void {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
  }

  private removeAsciiCanvas(): void {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    this.canvas = null;
    this.ctx = null;
    this.sampleCanvas = null;
    this.sampleCtx = null;
  }

  private startLoop(): void {
    const loop = () => {
      if (!this.active) return;
      this.renderAsciiPillar();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  private stopLoop(): void {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private renderAsciiPillar(): void {
    if (!this.canvas || !this.ctx || !this.sampleCanvas || !this.sampleCtx) return;

    // Ensure we have reference to webgl canvas
    if (!this.webglCanvas) {
      this.findWebglCanvas();
      if (!this.webglCanvas) return;
    }

    const width = this.canvas.width;
    const height = this.canvas.height;

    // Character dimensions in canvas coordinates
    const charW = 7;
    const charH = 11;
    const cols = Math.floor(width / charW);
    const rows = Math.floor(height / charH);

    if (cols <= 0 || rows <= 0) return;

    if (this.sampleCanvas.width !== cols || this.sampleCanvas.height !== rows) {
      this.sampleCanvas.width = cols;
      this.sampleCanvas.height = rows;
    }

    // 1. Sample WebGL canvas
    try {
      this.sampleCtx.clearRect(0, 0, cols, rows);
      this.sampleCtx.drawImage(this.webglCanvas, 0, 0, cols, rows);
    } catch {
      return;
    }

    let imgData: ImageData;
    try {
      imgData = this.sampleCtx.getImageData(0, 0, cols, rows);
    } catch {
      return;
    }

    const data = imgData.data;

    // 2. Clear output canvas with clean transparent back
    this.ctx.clearRect(0, 0, width, height);

    // Font setup
    this.ctx.font = 'bold 11px "JetBrains Mono", monospace';
    this.ctx.textBaseline = 'top';

    // Theme color palettes
    const palette = {
      green: {
        text: '#4ade80',
        bright: '#86efac',
        dim: 'rgba(34, 197, 94, 0.55)',
        shadow: 'rgba(74, 222, 128, 0.7)',
      },
      amber: {
        text: '#fbbf24',
        bright: '#fde68a',
        dim: 'rgba(245, 158, 11, 0.55)',
        shadow: 'rgba(251, 191, 36, 0.7)',
      },
      mono: {
        text: '#e4e4e7',
        bright: '#ffffff',
        dim: 'rgba(161, 161, 170, 0.55)',
        shadow: 'rgba(255, 255, 255, 0.6)',
      },
    }[this.theme];

    this.ctx.fillStyle = palette.text;
    this.ctx.shadowColor = palette.shadow;
    this.ctx.shadowBlur = 3;

    const maxRampIdx = this.CHAR_RAMP.length - 1;

    // 3. Render ASCII characters line by line for peak 120 FPS performance
    for (let y = 0; y < rows; y++) {
      let lineChars = '';
      let hasVisibleChars = false;

      for (let x = 0; x < cols; x++) {
        const idx = (y * cols + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        // If transparent / background pixel, render space
        if (a < 20) {
          lineChars += ' ';
          continue;
        }

        // Perceived luminance formula
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const rampIdx = Math.min(maxRampIdx, Math.floor(lum * maxRampIdx));
        const char = this.CHAR_RAMP[rampIdx] || ' ';

        if (char !== ' ') hasVisibleChars = true;
        lineChars += char;
      }

      if (hasVisibleChars) {
        this.ctx.fillText(lineChars, 0, y * charH);
      }
    }

    // Reset shadow blur to avoid canvas slowdown
    this.ctx.shadowBlur = 0;
  }

  private injectGlitchStyles(): void {
    if (this.glitchStyleEl) return;
    this.glitchStyleEl = document.createElement('style');
    this.glitchStyleEl.id = 'ascii-glitch-keyframes';
    this.glitchStyleEl.textContent = `
      @keyframes screenGlitchShake {
        0% { transform: translate(0, 0) scale(1); filter: none; }
        12% { transform: translate(-8px, 4px) scale(1.008) skewX(0.8deg); filter: hue-rotate(90deg) contrast(1.4); }
        25% { transform: translate(9px, -5px) scale(0.995) skewX(-1.2deg); filter: invert(0.2) contrast(1.6); }
        38% { transform: translate(-6px, -6px) scale(1.012) skewX(0.5deg); filter: hue-rotate(180deg); }
        50% { transform: translate(10px, 5px) scale(1.003) skewX(-0.7deg); filter: invert(0.3) saturate(2); }
        62% { transform: translate(-8px, 3px) scale(0.992) skewX(0.9deg); filter: contrast(1.5); }
        75% { transform: translate(6px, -4px) scale(1.008) skewX(-0.5deg); filter: hue-rotate(270deg); }
        88% { transform: translate(-4px, 2px) scale(1.002) skewX(0.2deg); filter: none; }
        100% { transform: translate(0, 0) scale(1) skewX(0); filter: none; }
      }

      @keyframes screenGlitchReverseShake {
        0% { transform: translate(0, 0) scale(1); filter: none; }
        12% { transform: translate(8px, -4px) scale(0.992) skewX(-0.8deg); filter: hue-rotate(-90deg) contrast(1.4); }
        25% { transform: translate(-9px, 5px) scale(1.005) skewX(1.2deg); filter: invert(0.2) contrast(1.6); }
        38% { transform: translate(6px, 6px) scale(0.988) skewX(-0.5deg); filter: hue-rotate(-180deg); }
        50% { transform: translate(-10px, -5px) scale(0.997) skewX(0.7deg); filter: invert(0.3) saturate(2); }
        62% { transform: translate(8px, -3px) scale(1.008) skewX(-0.9deg); filter: contrast(1.5); }
        75% { transform: translate(-6px, 4px) scale(0.992) skewX(0.5deg); filter: hue-rotate(-270deg); }
        88% { transform: translate(4px, -2px) scale(0.998) skewX(-0.2deg); filter: none; }
        100% { transform: translate(0, 0) scale(1) skewX(0); filter: none; }
      }

      .screen-glitch-active {
        animation: screenGlitchShake 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards !important;
        transform-origin: center center;
        overflow: hidden !important;
      }

      .screen-glitch-reverse {
        animation: screenGlitchReverseShake 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards !important;
        transform-origin: center center;
        overflow: hidden !important;
      }

      /* Tearing slice keyframes */
      @keyframes glitchSliceAnimA {
        0% { clip-path: inset(15% 0 65% 0); transform: translateX(-24px); }
        30% { clip-path: inset(45% 0 35% 0); transform: translateX(28px); }
        60% { clip-path: inset(72% 0 10% 0); transform: translateX(-16px); }
        100% { clip-path: inset(25% 0 60% 0); transform: translateX(20px); }
      }

      @keyframes glitchSliceAnimB {
        0% { clip-path: inset(55% 0 25% 0); transform: translateX(32px); }
        30% { clip-path: inset(10% 0 75% 0); transform: translateX(-30px); }
        60% { clip-path: inset(35% 0 50% 0); transform: translateX(22px); }
        100% { clip-path: inset(80% 0 8% 0); transform: translateX(-18px); }
      }
    `;
    document.head.appendChild(this.glitchStyleEl);
  }

  private injectStyles(): void {
    if (this.styleEl) return;
    this.styleEl = document.createElement('style');
    this.styleEl.id = 'ascii-art-mode-styles';
    this.updateStyles();
    document.head.appendChild(this.styleEl);
  }

  private updateStyles(): void {
    if (!this.styleEl) return;

    const isGreen = this.theme === 'green';
    const isAmber = this.theme === 'amber';

    const mainColor = isGreen ? '#22c55e' : isAmber ? '#f59e0b' : '#f4f4f5';
    const brightColor = isGreen ? '#4ade80' : isAmber ? '#fbbf24' : '#ffffff';
    const glowColor = isGreen ? 'rgba(34, 197, 94, 0.4)' : isAmber ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.3)';
    const cardBg = isGreen ? 'rgba(4, 16, 8, 0.92)' : isAmber ? 'rgba(18, 12, 4, 0.92)' : 'rgba(15, 15, 18, 0.92)';
    const cardBorder = isGreen ? '#16a34a' : isAmber ? '#d97706' : '#71717a';

    this.styleEl.textContent = `
      html.ascii-art-active {
        background-color: #050a06 !important;
        color: ${mainColor} !important;
      }
      html.ascii-art-active body {
        background-color: #050a06 !important;
        color: ${mainColor} !important;
        font-family: 'JetBrains Mono', monospace !important;
      }
      html.ascii-art-active * {
        font-family: 'JetBrains Mono', monospace !important;
        text-shadow: 0 0 6px ${glowColor};
      }
      html.ascii-art-active h1,
      html.ascii-art-active h2,
      html.ascii-art-active h3,
      html.ascii-art-active h4 {
        color: ${brightColor} !important;
        letter-spacing: -0.02em !important;
      }
      html.ascii-art-active p,
      html.ascii-art-active span,
      html.ascii-art-active a,
      html.ascii-art-active button {
        color: ${mainColor} !important;
      }
      html.ascii-art-active .bg-zinc-950\\/90,
      html.ascii-art-active .bg-zinc-950\\/85,
      html.ascii-art-active .bg-white\\/80,
      html.ascii-art-active .bg-white\\/85,
      html.ascii-art-active .bg-zinc-900\\/80 {
        background-color: ${cardBg} !important;
        border: 1px dashed ${cardBorder} !important;
        box-shadow: 0 0 20px ${glowColor} !important;
      }
      html.ascii-art-active button,
      html.ascii-art-active a {
        border-color: ${cardBorder} !important;
      }
      /* Retro CRT Scanlines */
      html.ascii-art-active::after {
        content: "";
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(
          rgba(18, 16, 16, 0) 50%, 
          rgba(0, 0, 0, 0.25) 50%
        ), linear-gradient(
          90deg,
          rgba(255, 0, 0, 0.03),
          rgba(0, 255, 0, 0.01),
          rgba(0, 0, 255, 0.03)
        );
        background-size: 100% 3px, 4px 100%;
        pointer-events: none;
        z-index: 9999;
      }
    `;
  }

  private removeStyles(): void {
    if (this.styleEl && this.styleEl.parentElement) {
      this.styleEl.parentElement.removeChild(this.styleEl);
    }
    this.styleEl = null;
  }

  // Complete cleanup for safe removal
  public destroy(): void {
    this.disableCore();
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
    if (this.glitchStyleEl && this.glitchStyleEl.parentElement) {
      this.glitchStyleEl.parentElement.removeChild(this.glitchStyleEl);
    }
    this.listeners.clear();
  }
}

// Global Singleton Export
export const asciiEngine = new AsciiArtEngine();
