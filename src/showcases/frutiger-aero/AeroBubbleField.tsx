import React from 'react';

export interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
}

export interface AeroBubbleFieldProps {
  bubbles: Bubble[];
  onPopBubble: (id: number) => void;
}

export const AeroBubbleField: React.FC<AeroBubbleFieldProps> = ({ bubbles, onPopBubble }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          onClick={() => onPopBubble(b.id)}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
          }}
          className="absolute rounded-full cursor-pointer pointer-events-auto transition-transform hover:scale-110 active:scale-95 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(0,100,200,0.3),0_4px_12px_rgba(0,0,0,0.15)] border border-white/60 backdrop-blur-[1px] bg-radial from-white/50 via-cyan-100/20 to-sky-400/20 group"
          title="Click to pop bubble!"
        >
          {/* Primary Specular Glint */}
          <div className="absolute top-[14%] left-[18%] w-[32%] h-[24%] bg-white rounded-full blur-[0.5px] rotate-[-30deg]" />
          {/* Secondary Rim Reflection */}
          <div className="absolute bottom-[16%] right-[20%] w-[18%] h-[14%] bg-white/70 rounded-full blur-[0.5px]" />
        </div>
      ))}
    </div>
  );
};
