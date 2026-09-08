import React from 'react';

export const FishbowlEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#01081a]">
      {/* 1. FIRST-PERSON VIEWPOINT FROM DIRECTLY INSIDE THE ROUND GLASS FISHBOWL */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <img
          src="/showcase/aero/fishbowl-inside.jpg"
          alt="Inside the Classical Round Glass Fishbowl Underwater Viewpoint"
          className="w-full h-full object-cover object-center filter brightness-[1.03] contrast-[1.06]"
          loading="eager"
        />

        {/* Ambient deep sapphire underwater atmospheric vignetting */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#010b24]/20 to-[#000512]/75 pointer-events-none" />
      </div>

      {/* 2. DYNAMIC ELECTRIC BLUE AMBIENT LIGHTS & CAUSTIC WATER GLOW */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {/* Core luminous water ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[1000px] h-[75vw] max-h-[1000px] rounded-full bg-radial from-cyan-400/25 via-sky-500/12 to-transparent blur-3xl pointer-events-none" />

        {/* Shimmering animated caustic ripples */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen animate-pulse pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.75) 0%, transparent 35%),
              radial-gradient(ellipse at 38% 42%, rgba(14,165,233,0.55) 0%, transparent 40%),
              radial-gradient(ellipse at 62% 58%, rgba(6,182,212,0.65) 0%, transparent 38%)
            `,
            backgroundSize: '100% 100%',
            animationDuration: '4.8s',
          }}
        />
      </div>

      {/* 3. CURVED GLASS BOWL PERIMETER VIGNETTE */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 0 100px 30px rgba(0, 5, 18, 0.8),
            inset 0 0 35px 8px rgba(0, 200, 255, 0.3)
          `,
        }}
      />
    </div>
  );
};
