import React, { useState, useEffect } from 'react';

export interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  wobblePhase?: number;
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
    const newPop: PopEffect = {
      id: Date.now() + Math.random(),
      x: bubble.x,
      y: bubble.y,
      size: bubble.size,
    };
    setPopEffects((prev) => [...prev, newPop]);
    onPopBubble(bubble.id);
  };

  // Clean up expired pop effects
  useEffect(() => {
    if (popEffects.length === 0) return;
    const timer = setTimeout(() => {
      setPopEffects((prev) => prev.slice(1));
    }, 350);
    return () => clearTimeout(timer);
  }, [popEffects]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* Subtle, Photorealistic Translucent Bubbles */}
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
          className="absolute rounded-full cursor-pointer pointer-events-auto transition-transform duration-150 hover:scale-120 active:scale-80 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,100,200,0.2),0_2px_8px_rgba(0,40,100,0.08)] border border-white/50 backdrop-blur-[0.5px] bg-gradient-to-br from-white/20 via-sky-200/10 to-transparent group animate-pulse"
          title="Click to pop!"
        >
          {/* Razor-thin Specular Pinpoint Glint */}
          <div className="absolute top-[18%] left-[20%] w-[25%] h-[20%] bg-white rounded-full blur-[0.3px] opacity-90 group-hover:opacity-100" />

          {/* Secondary Faint Internal Reflection Arc */}
          <div className="absolute bottom-[20%] right-[22%] w-[18%] h-[12%] bg-sky-200/50 rounded-full blur-[0.4px]" />

          {/* Ultra-subtle rainbow chromatic fringe ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-300/25" />
        </div>
      ))}

      {/* Pop Burst Particle Effects */}
      {popEffects.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size * 1.4}px`,
            height: `${p.size * 1.4}px`,
          }}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
        >
          {/* Delicate expanding shockwave ring */}
          <div className="w-full h-full rounded-full border border-white/80 animate-ping opacity-60" />
          {/* Micro-droplet spray */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="absolute w-1 h-1 rounded-full bg-white -translate-y-3 opacity-75" />
            <span className="absolute w-1 h-1 rounded-full bg-sky-200 translate-y-3 opacity-75" />
            <span className="absolute w-1 h-1 rounded-full bg-white -translate-x-3 opacity-75" />
            <span className="absolute w-1 h-1 rounded-full bg-cyan-100 translate-x-3 opacity-75" />
          </div>
        </div>
      ))}
    </div>
  );
};
