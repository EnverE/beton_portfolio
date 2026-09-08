import React, { useState, useEffect } from 'react';

export interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
}

export interface PopEffect {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface AeroBubbleFieldProps {
  bubbles: Bubble[];
  onPopBubble: (id: number) => void;
}

export const AeroBubbleField: React.FC<AeroBubbleFieldProps> = ({ bubbles, onPopBubble }) => {
  const [popEffects, setPopEffects] = useState<PopEffect[]>([]);

  const handlePop = (bubble: Bubble, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    // Add pop burst visual effect
    const newPop: PopEffect = {
      id: Date.now() + Math.random(),
      x: bubble.x,
      y: bubble.y,
      size: bubble.size,
    };
    setPopEffects((prev) => [...prev, newPop]);

    // Trigger audio & state removal
    onPopBubble(bubble.id);
  };

  // Clean up expired pop effects after 450ms
  useEffect(() => {
    if (popEffects.length === 0) return;
    const timer = setTimeout(() => {
      setPopEffects((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [popEffects]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Active Floating Bubbles */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          onClick={(e) => handlePop(b, e)}
          onTouchStart={(e) => handlePop(b, e)}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
          }}
          className="absolute rounded-full cursor-pointer pointer-events-auto transition-transform duration-100 hover:scale-115 active:scale-90 shadow-[inset_0_3px_5px_rgba(255,255,255,0.95),inset_0_-4px_8px_rgba(0,85,234,0.35),0_6px_16px_rgba(0,50,150,0.18)] border border-white/70 backdrop-blur-[0.5px] bg-gradient-to-tr from-cyan-400/20 via-white/30 to-emerald-300/25 group"
          title="Click to pop!"
        >
          {/* Primary High-Gloss Crescent Glint */}
          <div className="absolute top-[12%] left-[16%] w-[36%] h-[26%] bg-white rounded-full blur-[0.5px] rotate-[-35deg] opacity-90 group-hover:opacity-100" />

          {/* Secondary Subsurface Rim Reflection */}
          <div className="absolute bottom-[14%] right-[18%] w-[22%] h-[16%] bg-white/80 rounded-full blur-[0.5px]" />

          {/* Subtle iridescent rainbow ring rim */}
          <div className="absolute inset-0 rounded-full border border-sky-300/40" />
        </div>
      ))}

      {/* Pop Burst Particle Effects */}
      {popEffects.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
        >
          {/* Expanding shockwave ring */}
          <div className="w-full h-full rounded-full border-2 border-white animate-ping opacity-75" />
          {/* Droplet burst particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-sm -translate-y-4 animate-out fade-out" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200 shadow-sm translate-y-4 animate-out fade-out" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-sm -translate-x-4 animate-out fade-out" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-emerald-200 shadow-sm translate-x-4 animate-out fade-out" />
          </div>
        </div>
      ))}
    </div>
  );
};
