import React, { useEffect, useRef } from 'react';

export interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export interface WaterWakeCanvasRef {
  addWake: (x: number, y: number, speed: number) => void;
}

export interface WaterWakeCanvasProps {
  canvasRef?: React.RefObject<WaterWakeCanvasRef | null>;
}

export const WaterWakeCanvas: React.FC<WaterWakeCanvasProps> = ({ canvasRef }) => {
  const domRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const motesRef = useRef<Mote[]>([]);

  // Initialize suspended aquatic motes (marine snow / dust motes catching sunlight)
  useEffect(() => {
    const motes: Mote[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      motes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.2 - 0.05,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }
    motesRef.current = motes;
  }, []);

  // Expose addWake method to external callers
  useEffect(() => {
    if (canvasRef) {
      canvasRef.current = {
        addWake: (x: number, y: number, speed: number) => {
          if (ripplesRef.current.length > 25) return;
          ripplesRef.current.push({
            x,
            y,
            radius: 4,
            maxRadius: Math.min(speed * 12 + 30, 90),
            opacity: Math.min(0.55, speed * 0.08 + 0.2),
            speed: 1.2 + speed * 0.15,
          });
        },
      };
    }
  }, [canvasRef]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = domRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render and update suspended water motes
      ctx.fillStyle = '#ffffff';
      const motes = motesRef.current;
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;

        if (m.y < -10) {
          m.y = canvas.height + 10;
          m.x = Math.random() * canvas.width;
        }
        if (m.x < -10) m.x = canvas.width + 10;
        if (m.x > canvas.width + 10) m.x = -10;

        ctx.globalAlpha = m.alpha;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render expanding water wake ripples from the clownfish
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= 0.96;

        if (r.opacity < 0.015 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Inner caustic ring
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity})`;
        ctx.lineWidth = Math.max(1, 2.5 * (1 - r.radius / r.maxRadius));
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Outer cyan refraction glow ring
        ctx.strokeStyle = `rgba(129, 212, 250, ${r.opacity * 0.45})`;
        ctx.lineWidth = Math.max(0.8, 4.0 * (1 - r.radius / r.maxRadius));
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius + 2, (r.radius + 2) * 0.65, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={domRef}
      className="fixed inset-0 pointer-events-none z-15 select-none"
    />
  );
};
