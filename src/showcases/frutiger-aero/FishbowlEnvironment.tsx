import React from 'react';

export const FishbowlEnvironment: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. DISTANT WINDOWS XP "BLISS" LANDSCAPE (Viewed through the glass) */}
      <div className="absolute inset-0 z-0">
        {/* Sky: Iconic vibrant Windows XP Azure Blue with solar glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0055ea] via-[#1e88e5] via-55%-[#42a5f5] via-75%-[#90caf9] to-[#c8e6c9]" />

        {/* Sunburst radiance shining through the water bowl */}
        <div className="absolute -top-24 left-1/3 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-white/70 via-amber-100/30 to-transparent blur-3xl" />

        {/* Fluffy sun-drenched Windows XP cumulus clouds */}
        <svg
          className="absolute top-8 left-0 w-full h-64 opacity-85"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#bbdefb" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e3f2fd" stopOpacity="0.3" />
            </linearGradient>
            <filter id="cloudBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Cloud Formation Left */}
          <g filter="url(#cloudBlur)">
            <ellipse cx="220" cy="95" rx="140" ry="45" fill="url(#cloudGrad1)" />
            <ellipse cx="180" cy="70" rx="90" ry="50" fill="#ffffff" />
            <ellipse cx="270" cy="75" rx="80" ry="40" fill="#ffffff" />
            <ellipse cx="320" cy="90" rx="70" ry="35" fill="url(#cloudGrad1)" />
          </g>

          {/* Cloud Formation Center-Right */}
          <g filter="url(#cloudBlur)">
            <ellipse cx="980" cy="80" rx="180" ry="50" fill="url(#cloudGrad1)" />
            <ellipse cx="930" cy="55" rx="110" ry="45" fill="#ffffff" />
            <ellipse cx="1040" cy="60" rx="95" ry="42" fill="#ffffff" />
            <ellipse cx="1120" cy="78" rx="80" ry="35" fill="url(#cloudGrad2)" />
          </g>

          {/* Wispy Cloud Formation Far Right */}
          <ellipse cx="1320" cy="110" rx="110" ry="30" fill="url(#cloudGrad2)" filter="url(#cloudBlur)" />
        </svg>

        {/* Iconic Windows XP "Bliss" Rolling Green Hills */}
        <div className="absolute bottom-0 left-0 right-0 h-[48vh] min-h-[320px]">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 450"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Distant Hill Gradient */}
              <linearGradient id="xpDistantHill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#43a047" />
                <stop offset="40%" stopColor="#2e7d32" />
                <stop offset="100%" stopColor="#1b5e20" />
              </linearGradient>

              {/* Midground Bliss Hill Gradient */}
              <linearGradient id="xpMidHill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7cb342" />
                <stop offset="25%" stopColor="#558b2f" />
                <stop offset="60%" stopColor="#33691e" />
                <stop offset="100%" stopColor="#1b5e20" />
              </linearGradient>

              {/* Foreground Sun-kissed Lush Hill Gradient */}
              <linearGradient id="xpForegroundHill" x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="#8bc34a" />
                <stop offset="20%" stopColor="#689f38" />
                <stop offset="55%" stopColor="#388e3c" />
                <stop offset="100%" stopColor="#1b5e20" />
              </linearGradient>

              {/* Sunlight highlight streak along crest */}
              <linearGradient id="crestSunlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c5e1a5" stopOpacity="0" />
                <stop offset="35%" stopColor="#dcedc8" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#aed581" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8bc34a" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Layer 1: Distant rolling ridge */}
            <path
              d="M0,220 Q360,110 720,180 T1440,140 L1440,450 L0,450 Z"
              fill="url(#xpDistantHill)"
            />

            {/* Layer 2: Midground iconic undulating Bliss hill */}
            <path
              d="M0,260 Q280,140 680,195 Q1080,250 1440,170 L1440,450 L0,450 Z"
              fill="url(#xpMidHill)"
            />

            {/* Layer 3: Foreground sweeping sunlit ridge */}
            <path
              d="M0,310 Q420,175 880,230 Q1240,270 1440,210 L1440,450 L0,450 Z"
              fill="url(#xpForegroundHill)"
            />

            {/* Sun-kissed luminous rim along foreground ridge */}
            <path
              d="M0,310 Q420,175 880,230 Q1240,270 1440,210"
              fill="none"
              stroke="url(#crestSunlight)"
              strokeWidth="4"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* 2. UNDERWATER CAUSTIC LIGHT RAYS FILTERING THROUGH BOWL */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-40 mix-blend-overlay">
        <div className="absolute -top-32 inset-x-0 h-[120%] bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,255,255,0.8)_0%,rgba(178,235,242,0.4)_40%,transparent_80%)]" />
        {/* Animated caustic ripple streaks */}
        <div
          className="absolute inset-0 opacity-30 animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.7) 0%, transparent 25%),
                              radial-gradient(circle at 75% 20%, rgba(255,255,255,0.6) 0%, transparent 30%),
                              radial-gradient(circle at 45% 65%, rgba(255,255,255,0.5) 0%, transparent 35%)`,
            backgroundSize: '100% 100%',
            animationDuration: '6s',
          }}
        />
      </div>

      {/* 3. INSIDE-A-FISHBOWL SPHERICAL GLASS CURVATURE & REFRACTIONS */}
      {/* Outer spherical vignette showing the curved fishbowl rim */}
      <div
        className="absolute inset-0 z-2 pointer-events-none"
        style={{
          boxShadow:
            'inset 0 0 100px 30px rgba(0, 85, 234, 0.35), inset 0 0 40px 10px rgba(255, 255, 255, 0.45), inset 0 -30px 60px rgba(46, 125, 50, 0.2)',
        }}
      />

      {/* Specular Curved Glass Rim Reflection (Top-Left and Top-Right Arcs) */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-br-full bg-gradient-to-br from-white/60 via-white/10 to-transparent blur-md pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-bl-full bg-gradient-to-bl from-white/50 via-white/10 to-transparent blur-md pointer-events-none" />

      {/* Bottom Glass Curvature Glow */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white/40 via-sky-300/20 to-transparent pointer-events-none" />

      {/* Upper Water Meniscus Surface Curve */}
      <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-sky-200/50 via-white/60 to-transparent border-b border-white/50 pointer-events-none" />
    </div>
  );
};
