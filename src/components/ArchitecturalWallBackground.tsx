import React, { useEffect, useRef, useState } from 'react';

interface ArchitecturalWallBackgroundProps {
  scrollProgress: number;
  targetAlignment?: 'center' | 'left' | 'right';
}

export const ArchitecturalWallBackground: React.FC<ArchitecturalWallBackgroundProps> = ({
  scrollProgress,
  targetAlignment = 'center',
}) => {
  const isNight = scrollProgress > 0.78;

  // Smooth momentum position matching the 3D pillar physics
  const [smoothY, setSmoothY] = useState(0);
  const [smoothX, setSmoothX] = useState(0);

  const scrollRef = useRef(scrollProgress);
  const alignRef = useRef(targetAlignment);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    alignRef.current = targetAlignment;
  }, [targetAlignment]);

  useEffect(() => {
    let animId: number;
    let currY = 0;
    let currX = 0;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      // Travel distance: 1 formwork panel (260px) per portfolio level,
      // scrolling smoothly with the exact same 0.035 physical momentum as the 3D pillar!
      const targetY = -scrollRef.current * 1300;
      currY += (targetY - currY) * 0.035;

      // Subtle horizontal parallax when the pillar glides across sections
      let targetX = 0;
      if (alignRef.current === 'right') targetX = 35;
      if (alignRef.current === 'left') targetX = -35;
      currX += (targetX - currX) * 0.022;

      setSmoothY(currY);
      setSmoothX(currX);
    };

    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Dynamic light wash style based on time of day, tracking down the wall with scroll
  const getLightingWash = () => {
    const washY = 15 + scrollProgress * 45; // light wash travels down the wall as you descend
    const washX = 50 + smoothX * 0.15;

    if (scrollProgress < 0.35) {
      // Morning / Midday: Soft natural skylight wash from top
      return `radial-gradient(circle at ${washX}% ${washY}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 70%)`;
    } else if (scrollProgress < 0.70) {
      // Golden Hour: Warm ambient sun wash raking across the concrete
      const intensity = Math.min(0.24, 0.10 + ((scrollProgress - 0.35) / 0.35) * 0.14);
      return `radial-gradient(ellipse at ${washX - 10}% ${washY}%, rgba(245, 158, 11, ${intensity}) 0%, rgba(251, 191, 36, ${intensity * 0.4}) 45%, transparent 75%)`;
    } else if (scrollProgress < 0.88) {
      // Twilight Dusk: Cool indigo-mauve atmospheric wash
      const intensity = Math.min(0.18, ((scrollProgress - 0.70) / 0.18) * 0.18);
      return `radial-gradient(ellipse at ${washX}% ${washY}%, rgba(139, 92, 246, ${intensity}) 0%, rgba(30, 27, 75, ${intensity * 0.5}) 50%, transparent 80%)`;
    } else {
      // Nocturnal Night: Gallery architectural spotlight pooling behind the pillar
      return `radial-gradient(circle at ${washX}% ${washY}%, rgba(56, 189, 248, 0.12) 0%, rgba(14, 165, 233, 0.04) 40%, transparent 70%)`;
    }
  };

  const seamColor = isNight ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.07)';
  const seamHighlight = isNight ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)';
  const tieHoleOuter = isNight ? '#0b0b0e' : '#a8a69e';
  const tieHoleInner = isNight ? '#040406' : '#6b6962';
  const tieHoleBevel = isNight ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.40)';
  const crosshairColor = isNight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.12)';

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Full-Bleed Architectural Concrete Formwork Grid (Seamless Infinite Scroll & Parallax) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="brutalist-formwork"
            width="480"
            height="260"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${smoothX.toFixed(2)}, ${smoothY.toFixed(2)})`}
          >
            {/* Panel Formwork Joint Grooves (Beveled Seams) */}
            <line x1="0" y1="0" x2="480" y2="0" stroke={seamColor} strokeWidth="1" />
            <line x1="0" y1="1" x2="480" y2="1" stroke={seamHighlight} strokeWidth="0.5" />
            
            <line x1="0" y1="0" x2="0" y2="260" stroke={seamColor} strokeWidth="1" />
            <line x1="1" y1="0" x2="1" y2="260" stroke={seamHighlight} strokeWidth="0.5" />

            {/* Architectural Registration Crosshairs (+) at Panel Intersections */}
            <g stroke={crosshairColor} strokeWidth="1">
              <line x1="-5" y1="0" x2="5" y2="0" />
              <line x1="0" y1="-5" x2="0" y2="5" />
            </g>

            {/* Tie-Rod Holes (Paterae) - 4 corner formwork anchors per panel */}
            {[
              { cx: 38, cy: 38 },
              { cx: 442, cy: 38 },
              { cx: 38, cy: 222 },
              { cx: 442, cy: 222 },
            ].map((hole, idx) => (
              <g key={idx}>
                {/* Outer Bevel Rim */}
                <circle cx={hole.cx} cy={hole.cy} r="6.5" fill={tieHoleBevel} />
                {/* Recessed Cavity */}
                <circle cx={hole.cx} cy={hole.cy} r="5.5" fill={tieHoleOuter} />
                {/* Deep Center Core */}
                <circle cx={hole.cx - 0.5} cy={hole.cy - 0.5} r="3.5" fill={tieHoleInner} />
              </g>
            ))}

            {/* Subtle Architectural Formwork Notation */}
            <text
              x="55"
              y="42"
              fill={crosshairColor}
              fontSize="8"
              fontFamily="monospace"
              letterSpacing="0.1em"
              className="opacity-50"
            >
              MOD. 480×260 // EET-BRUT
            </text>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#brutalist-formwork)" />
      </svg>

      {/* 2. Atmospheric Dynamic Daylight & Studio Light Wash (Tracks with Scroll) */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{ background: getLightingWash() }}
      />

      {/* 3. Subtle Vignette Edge Definition */}
      <div
        className="absolute inset-0"
        style={{
          background: isNight
            ? 'radial-gradient(ellipse at center, transparent 40%, rgba(3, 3, 5, 0.65) 100%)'
            : 'radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.08) 100%)',
        }}
      />
    </div>
  );
};
