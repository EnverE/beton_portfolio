import React from 'react';

export const FishbowlEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#020b1e]">
      {/* 1. PHOTOREALISTIC CLASSICAL ROUND FISHBOWL WITH BLUE AMBIENT LIGHTS */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/showcase/aero/fishbowl-blue.jpg"
          alt="Classical Round Glass Fishbowl with Blue Ambient Lights"
          className="w-full h-full object-cover object-center filter brightness-[1.04] contrast-[1.08]"
          loading="eager"
        />

        {/* Ambient deep blue / sapphire radial atmosphere */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#02102e]/30 to-[#010818]/85 pointer-events-none" />
      </div>

      {/* 2. GLOWING ELECTRIC BLUE AMBIENT LIGHTS & RIM GLOW */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Core luminous water glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[70vw] max-h-[900px] rounded-full bg-radial from-cyan-400/20 via-sky-500/10 to-transparent blur-3xl" />

        {/* Shimmering animated caustic ripples */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-screen animate-pulse pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.7) 0%, transparent 35%),
              radial-gradient(ellipse at 40% 45%, rgba(14,165,233,0.5) 0%, transparent 40%),
              radial-gradient(ellipse at 60% 55%, rgba(6,182,212,0.6) 0%, transparent 38%)
            `,
            backgroundSize: '100% 100%',
            animationDuration: '4.5s',
          }}
        />
      </div>

      {/* 3. CURVED GLASS BOWL RIM HIGHLIGHTS & VIGNETTE */}
      {/* Soft perimeter vignette for deep moody contrast */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 0 120px 40px rgba(1, 8, 24, 0.75),
            inset 0 0 40px 10px rgba(0, 180, 255, 0.25)
          `,
        }}
      />

      {/* Upper glass rim reflection line */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-cyan-300/30 via-white/40 to-transparent pointer-events-none" />
    </div>
  );
};
