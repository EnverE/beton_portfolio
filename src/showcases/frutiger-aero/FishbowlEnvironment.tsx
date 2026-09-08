import React from 'react';

export const FishbowlEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#020d1e]">
      {/* 1. IMMERSIVE RETRO AQUARIUM MOTION LAMP ENVIRONMENT */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/showcase/aero/aquarium-lamp-bg.jpg"
          alt="Vintage 2000s Rotating Aquarium Lamp Coral Reef"
          className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.06]"
          loading="eager"
        />

        {/* Translucent oceanic depth vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#01091a]/15 to-[#000512]/60 pointer-events-none" />
      </div>

      {/* 2. FLUORESCENT LAMP BACKLIGHT TUBE GLOW (Electric Cyan & Sapphire) */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Top fluorescent tube light bloom */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-cyan-400/30 via-sky-400/15 to-transparent blur-2xl pointer-events-none" />

        {/* Bottom pedestal internal lamp glow */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-cyan-400/35 via-sky-500/20 to-transparent blur-2xl pointer-events-none" />

        {/* Central aquatic ambient radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1200px] h-[75vw] max-h-[900px] rounded-full bg-radial from-cyan-300/20 via-sky-500/08 to-transparent blur-3xl pointer-events-none" />

        {/* Animated caustic light shimmer across the coral reef */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-screen animate-pulse pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 45%, rgba(56,189,248,0.7) 0%, transparent 35%),
              radial-gradient(ellipse at 30% 55%, rgba(14,165,233,0.5) 0%, transparent 40%),
              radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.6) 0%, transparent 38%)
            `,
            backgroundSize: '100% 100%',
            animationDuration: '5s',
          }}
        />
      </div>

      {/* 3. CYLINDRICAL ACRYLIC LAMP GLASS REFLECTION EDGES */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 0 100px 30px rgba(0, 8, 24, 0.65),
            inset 0 0 30px 6px rgba(0, 220, 255, 0.35)
          `,
        }}
      />

      {/* Curved acrylic cylindrical pillar specular glares on sides */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-cyan-400/15 via-white/20 to-transparent blur-sm pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-cyan-400/15 via-white/20 to-transparent blur-sm pointer-events-none" />
    </div>
  );
};
