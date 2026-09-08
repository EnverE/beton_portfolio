import React from 'react';

export const FishbowlEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. PHOTOREALISTIC WINDOWS XP "BLISS" PANORAMIC LANDSCAPE */}
      <div className="absolute inset-0 z-0">
        <img
          src="/showcase/aero/bliss-hills.jpg"
          alt="Windows XP Bliss Photoreal Landscape"
          className="w-full h-full object-cover object-bottom scale-105 filter brightness-[1.02] contrast-[1.04]"
        />

        {/* Ambient atmospheric sky tint & sunburst bloom */}
        <div className="absolute top-0 inset-x-0 h-[45vh] bg-gradient-to-b from-[#0055ea]/25 via-[#29b6f6]/10 to-transparent pointer-events-none" />
        <div className="absolute -top-20 left-1/4 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-white/60 via-amber-100/25 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* 2. PHOTOREALISTIC UNDERWATER CAUSTIC LIGHT RAYS */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-45 mix-blend-overlay">
        {/* Upper sunlight caustic cone */}
        <div className="absolute -top-40 inset-x-0 h-[140%] bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(255,255,255,0.9)_0%,rgba(178,235,242,0.5)_35%,transparent_75%)]" />

        {/* Shimmering animated caustic cellular wave pattern */}
        <div
          className="absolute inset-0 opacity-40 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(ellipse at 15% 25%, rgba(255,255,255,0.85) 0%, transparent 22%),
                              radial-gradient(ellipse at 42% 18%, rgba(255,255,255,0.7) 0%, transparent 28%),
                              radial-gradient(ellipse at 78% 30%, rgba(255,255,255,0.8) 0%, transparent 25%),
                              radial-gradient(ellipse at 30% 65%, rgba(255,255,255,0.6) 0%, transparent 32%),
                              radial-gradient(ellipse at 68% 70%, rgba(255,255,255,0.65) 0%, transparent 28%)`,
            backgroundSize: '120% 120%',
            animationDuration: '5.5s',
          }}
        />
      </div>

      {/* 3. FIRST-PERSON INSIDE-A-FISHBOWL SPHERICAL GLASS REFRACTION & REFLECTIONS */}
      {/* Outer spherical vignette with physical glass refraction shadow */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 0 140px 45px rgba(0, 50, 140, 0.42),
            inset 0 0 60px 15px rgba(255, 255, 255, 0.5),
            inset 0 -40px 80px rgba(46, 125, 50, 0.3)
          `,
        }}
      />

      {/* Spherical curved glass rim highlights (Top-Left & Top-Right thick glass arcs) */}
      <div
        className="absolute -top-12 -left-12 w-96 h-96 rounded-full border-[18px] border-white/40 blur-[1px] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 100% 100%, transparent 60%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 100% 100%, transparent 60%, black 100%)',
        }}
      />
      <div
        className="absolute -top-12 -right-12 w-96 h-96 rounded-full border-[18px] border-white/35 blur-[1px] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 0% 100%, transparent 60%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 0% 100%, transparent 60%, black 100%)',
        }}
      />

      {/* Curved glass corner glare */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-br-full bg-gradient-to-br from-white/70 via-white/15 to-transparent blur-md pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-bl-full bg-gradient-to-bl from-white/60 via-white/10 to-transparent blur-md pointer-events-none" />

      {/* Lower glass rim refraction caustics */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white/45 via-emerald-400/15 via-sky-300/20 to-transparent pointer-events-none" />

      {/* Upper water meniscus curve with fluid waterline reflection */}
      <div className="absolute top-0 inset-x-0 h-5 bg-gradient-to-b from-sky-200/60 via-white/75 to-transparent border-b border-white/60 pointer-events-none shadow-[0_2px_12px_rgba(255,255,255,0.8)]" />
    </div>
  );
};
