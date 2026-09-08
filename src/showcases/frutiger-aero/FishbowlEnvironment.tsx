import React from 'react';

export const FishbowlEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. PHOTOREALISTIC ULTRA-HIGH-RESOLUTION WINDOWS XP "BLISS" PANORAMA */}
      <div className="absolute inset-0 z-0">
        <img
          src="/showcase/aero/bliss-hills.jpg"
          alt="Windows XP Bliss Ultra-Sharp Landscape"
          className="w-full h-full object-cover object-bottom filter brightness-[1.02] contrast-[1.03]"
          loading="eager"
        />

        {/* Soft atmospheric blue sky tint & solar glow */}
        <div className="absolute top-0 inset-x-0 h-[40vh] bg-gradient-to-b from-[#0055ea]/20 via-[#29b6f6]/08 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-1/4 translate-x-1/2 w-[700px] h-[450px] bg-radial from-white/70 via-amber-100/25 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* 2. VOLUMETRIC UNDERWATER GOD RAYS (Sunlight shafts piercing the water) */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        {/* Angled sunbeam 1 */}
        <div
          className="absolute -top-32 right-1/4 w-48 h-[120vh] bg-gradient-to-b from-white/80 via-sky-200/30 to-transparent blur-2xl transform rotate-[-22deg] origin-top"
        />
        {/* Angled sunbeam 2 */}
        <div
          className="absolute -top-32 right-1/3 w-64 h-[120vh] bg-gradient-to-b from-white/65 via-emerald-100/20 to-transparent blur-3xl transform rotate-[-25deg] origin-top"
        />
        {/* Angled sunbeam 3 */}
        <div
          className="absolute -top-32 right-1/2 w-40 h-[110vh] bg-gradient-to-b from-white/50 via-cyan-100/20 to-transparent blur-2xl transform rotate-[-28deg] origin-top"
        />
      </div>

      {/* 3. SHIMMERING CAUSTIC WATER RIPPLE NETWORK */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-30 mix-blend-overlay">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 18% 22%, rgba(255,255,255,0.8) 0%, transparent 20%),
              radial-gradient(ellipse at 45% 15%, rgba(255,255,255,0.7) 0%, transparent 26%),
              radial-gradient(ellipse at 80% 28%, rgba(255,255,255,0.85) 0%, transparent 22%),
              radial-gradient(ellipse at 28% 60%, rgba(255,255,255,0.55) 0%, transparent 30%),
              radial-gradient(ellipse at 70% 68%, rgba(255,255,255,0.6) 0%, transparent 25%)
            `,
            backgroundSize: '110% 110%',
            animationDuration: '6s',
          }}
        />
      </div>

      {/* 4. AQUARIUM BED & NATURAL AQUATIC PLANTS (Riverbed substrate with pebbles & grass) */}
      <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 z-2 pointer-events-none opacity-90 overflow-hidden">
        <img
          src="/showcase/aero/aquarium-bed.png"
          alt="Aquarium Riverbed Pebbles and Plants"
          className="w-full h-full object-cover object-bottom filter contrast-[1.05] brightness-[0.98]"
        />
        {/* Gentle depth shadow on gravel bottom */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 via-black/15 to-transparent pointer-events-none" />
      </div>

      {/* 5. TOP WATER SURFACE MENISCUS (Looking up from inside water column) */}
      <div className="absolute top-0 inset-x-0 z-3 pointer-events-none">
        {/* Shimmering fluid waterline reflection */}
        <div className="h-6 bg-gradient-to-b from-sky-300/40 via-white/70 to-transparent border-b border-white/70 shadow-[0_4px_16px_rgba(255,255,255,0.7)]" />
        {/* Undulating water surface ripple reflection */}
        <div
          className="h-2 w-full opacity-60"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.8) 0px, transparent 15px, rgba(255,255,255,0.5) 30px)',
          }}
        />
      </div>

      {/* 6. FIRST-PERSON INSIDE-A-FISHBOWL SPHERICAL GLASS CURVATURE */}
      {/* Heavy spherical fisheye vignette around the full screen perimeter */}
      <div
        className="absolute inset-0 z-3 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 0 160px 50px rgba(0, 55, 150, 0.45),
            inset 0 0 50px 12px rgba(255, 255, 255, 0.45),
            inset 0 -50px 90px rgba(20, 90, 40, 0.35)
          `,
        }}
      />

      {/* Thick curved glass rim highlights (Simulating spherical glass bowl reflections) */}
      <div
        className="absolute -top-16 -left-16 w-[420px] h-[420px] rounded-full border-[22px] border-white/45 blur-[1.5px] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 100% 100%, transparent 62%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 100% 100%, transparent 62%, black 100%)',
        }}
      />
      <div
        className="absolute -top-16 -right-16 w-[420px] h-[420px] rounded-full border-[22px] border-white/40 blur-[1.5px] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 0% 100%, transparent 62%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 0% 100%, transparent 62%, black 100%)',
        }}
      />

      {/* Specular corner glares */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-br-full bg-gradient-to-br from-white/60 via-white/10 to-transparent blur-md pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-bl-full bg-gradient-to-bl from-white/55 via-white/10 to-transparent blur-md pointer-events-none" />
    </div>
  );
};
