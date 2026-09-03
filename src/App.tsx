import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { PillarCanvas } from './components/PillarCanvas';
import { HeroSection } from './components/HeroSection';
import { WorksVault } from './components/WorksVault';
import { ProcessSection } from './components/ProcessSection';
import { ManifestSection } from './components/ManifestSection';
import { DispatchSection } from './components/DispatchSection';
import { FooterHUD } from './components/FooterHUD';
import { CustomCursor } from './components/CustomCursor';
import { LanguageToggle } from './components/LanguageToggle';
import { AsciiModeSecretTrigger } from './components/AsciiModeSecretTrigger';
import { ArchitecturalWallBackground } from './components/ArchitecturalWallBackground';
import { ProjectModal } from './components/ProjectModal';
import { PORTFOLIO_DATA } from './data/portfolio';
import { brutalistAudio } from './utils/audio';
import { useLanguage } from './context/LanguageContext';
import { TRANSLATIONS } from './data/translations';

// Portfolio Root Component - Enver Eren Tatlıdil (Pillar Showcase & Cinematic Zoom)
export function App() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [cursorCoords, setCursorCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [targetAlignment, setTargetAlignment] = useState<'center' | 'left' | 'right'>('center');
  const [activeElevation, setActiveElevation] = useState<string>('00');
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const selectedProject = PORTFOLIO_DATA.projects.find((p) => p.id === focusedProjectId) || null;
  const lenisRef = useRef<Lenis | null>(null);

  // Control site scrolling via pillar vertical drag
  const handlePillarScroll = useCallback((deltaY: number, immediate = true) => {
    if (lenisRef.current) {
      const target = lenisRef.current.scroll + deltaY;
      lenisRef.current.scrollTo(target, { immediate, duration: immediate ? 0 : 0.8 });
    } else {
      window.scrollBy({ top: deltaY, behavior: immediate ? 'instant' : 'smooth' });
    }
  }, []);

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize Lenis for Slow, Cinematic, Smooth Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2, // Slower, weighted, luxurious scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.65, // Deliberate, relaxed mousewheel speed
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Track scroll events and active section through Lenis
    lenis.on('scroll', (e: { scroll: number; limit: number }) => {
      const progress = e.limit > 0 ? Math.min(1, Math.max(0, e.scroll / e.limit)) : 0;
      setScrollProgress(progress);

      // Check active section via getBoundingClientRect
      const sections = [
        { id: 'monolith', num: '00', align: 'center' as const },
        { id: 'works', num: '01', align: 'dynamic' as const },
        { id: 'process', num: '02', align: 'right' as const },
        { id: 'about', num: '03', align: 'left' as const },
        { id: 'dispatch', num: '04', align: 'center' as const },
      ];

      const viewportThreshold = window.innerHeight * 0.45;
      let activeFound = false;

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportThreshold && rect.bottom >= viewportThreshold) {
            setActiveElevation(sec.num);
            activeFound = true;

            if (sec.align === 'dynamic') {
              let stageAlign: 'left' | 'right' = 'right';
              for (let s = 0; s < 5; s++) {
                const stageEl = document.getElementById(`project-stage-${s}`);
                if (stageEl) {
                  const sRect = stageEl.getBoundingClientRect();
                  if (sRect.top <= viewportThreshold + 120) {
                    stageAlign = s % 2 === 0 ? 'right' : 'left';
                  }
                }
              }
              setTargetAlignment(stageAlign);
            } else {
              setTargetAlignment(sec.align);
            }
            break;
          }
        }
      }

      if (!activeFound) {
        if (e.scroll < window.innerHeight * 0.5) {
          setActiveElevation('00');
          setTargetAlignment('center');
        } else if (progress > 0.85) {
          setActiveElevation('04');
          setTargetAlignment('center');
        }
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const elevatorLevels = [
    { label: t.nav.l00, id: 'monolith', num: '00' },
    { label: t.nav.l01, id: 'works', num: '01' },
    { label: t.nav.l02, id: 'process', num: '02' },
    { label: t.nav.l03, id: 'about', num: '03' },
    { label: t.nav.l04, id: 'dispatch', num: '04' },
  ];

  const handleElevatorClick = (id: string) => {
    brutalistAudio.playConcreteThud();
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#' + id, { duration: 1.8 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getSunlightPhaseLabel = () => {
    if (scrollProgress < 0.22) return t.phases.morning;
    if (scrollProgress < 0.48) return t.phases.midday;
    if (scrollProgress < 0.76) return t.phases.golden;
    return t.phases.night;
  };

  // Section animation preset
  const sectionSlideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Helper to continuously interpolate between two hex colors
  const lerpHex = (hexA: string, hexB: string, t: number) => {
    const rA = parseInt(hexA.slice(1, 3), 16);
    const gA = parseInt(hexA.slice(3, 5), 16);
    const bA = parseInt(hexA.slice(5, 7), 16);

    const rB = parseInt(hexB.slice(1, 3), 16);
    const gB = parseInt(hexB.slice(3, 5), 16);
    const bB = parseInt(hexB.slice(5, 7), 16);

    const r = Math.round(rA + (rB - rA) * t);
    const g = Math.round(gA + (gB - gA) * t);
    const b = Math.round(bA + (bB - bA) * t);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Continuous subtle Day -> Golden Hour -> Night color transition
  // White slowly warms into soft golden hour, then dusk, then night
  const getDynamicBackground = useCallback(() => {
    if (scrollProgress < 0.30) {
      // Moodier morning limestone -> Midday architectural stone (Deeper concrete studio tone)
      const t = scrollProgress / 0.30;
      return lerpHex('#e8e6e1', '#dedbd3', t);
    } else if (scrollProgress < 0.50) {
      // Midday stone -> Deeper warm champagne stone
      const t = (scrollProgress - 0.30) / 0.20;
      return lerpHex('#dedbd3', '#d4c8bc', t);
    } else if (scrollProgress < 0.70) {
      // Level 02: Warm champagne stone -> Deeper golden hour amber-stone
      const t = (scrollProgress - 0.50) / 0.20;
      return lerpHex('#d4c8bc', '#baa996', t);
    } else if (scrollProgress < 0.80) {
      // Level 03 Phase A: Golden hour stone -> Warm twilight terracotta/mauve stone
      const t = (scrollProgress - 0.70) / 0.10;
      return lerpHex('#baa996', '#6e5a68', t);
    } else if (scrollProgress < 0.90) {
      // Level 03 Phase B: Twilight mauve stone -> Deep evening indigo-slate
      const t = (scrollProgress - 0.80) / 0.10;
      return lerpHex('#6e5a68', '#1a1322', t);
    } else {
      // Level 04: Deep evening indigo-slate -> Nocturnal velvet midnight obsidian
      const t = (scrollProgress - 0.90) / 0.10;
      return lerpHex('#1a1322', '#050507', t);
    }
  }, [scrollProgress]);

  // Synchronize document body background with dynamic day-to-night palette (eliminates any black overscroll voids)
  useEffect(() => {
    const bg = getDynamicBackground();
    document.body.style.backgroundColor = bg;
    document.documentElement.style.backgroundColor = bg;
  }, [getDynamicBackground]);

  // Day mode remains active while background is light/medium stone
  const isDayMode = scrollProgress < 0.78;

  return (
    <div
      style={{
        backgroundColor: getDynamicBackground(),
        transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`min-h-screen relative font-sans ${
        isDayMode ? 'text-zinc-900' : 'text-[#e4e4e7]'
      }`}
    >
      {/* Precision Custom Architectural Cursor */}
      <CustomCursor />

      {/* Brutalist Bilingual Language Switcher (EN / TR) */}
      <LanguageToggle isDayMode={isDayMode} />

      {/* Secret ASCII Art Engine Protocol Switcher & HUD */}
      <AsciiModeSecretTrigger />

      {/* Photorealistic Brutalist Cast Concrete Formwork Wall (Full-bleed edge-to-edge backdrop) */}
      <ArchitecturalWallBackground
        scrollProgress={scrollProgress}
        targetAlignment={targetAlignment}
      />

      {/* Photorealistic 3D Concrete Pillar Canvas (Pinned in foreground/midground, moves with scroll & lighting) */}
      <PillarCanvas
        scrollProgress={scrollProgress}
        targetAlignment={targetAlignment}
        focusedProjectId={focusedProjectId}
        onSelectProject={setFocusedProjectId}
        onScrollBy={handlePillarScroll}
      />

      {/* Floating Telemetry & Sunlight Phase Indicator */}
      <div className={`fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2.5 border px-3 py-1.5 text-[10px] font-mono pointer-events-none backdrop-blur-md transition-colors duration-500 ${
        isDayMode
          ? 'bg-white/80 border-zinc-300 text-zinc-700 shadow-[2px_2px_0_rgba(0,0,0,0.06)]'
          : 'bg-zinc-950/90 border-zinc-800 text-zinc-400 shadow-[2px_2px_0_#000]'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDayMode ? 'bg-amber-500' : 'bg-emerald-400'}`}></span>
        <span>X: {cursorCoords.x}PX | Y: {cursorCoords.y}PX</span>
        <span className="opacity-40">|</span>
        <span className="font-bold">{getSunlightPhaseLabel()}</span>
        <span className="opacity-40">|</span>
        <span className="opacity-80 uppercase">{t.phases.pillar}: {targetAlignment.toUpperCase()}</span>
      </div>

      {/* Minimal Vertical Elevator HUD (Right Edge) */}
      <aside className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2 p-2 border backdrop-blur-md transition-colors duration-500 ${
        isDayMode
          ? 'bg-white/85 border-zinc-300 shadow-[4px_4px_0_rgba(0,0,0,0.08)]'
          : 'bg-zinc-950/85 border-zinc-800 shadow-[4px_4px_0_#070709]'
      }`}>
        <div className="text-[9px] font-mono text-zinc-500 font-bold px-1 pb-1 border-b border-zinc-400/30 tracking-wider">
          {t.nav.elevator}
        </div>
        {elevatorLevels.map((lvl) => {
          const isActive = activeElevation === lvl.num;
          return (
            <button
              key={lvl.num}
              onClick={() => handleElevatorClick(lvl.id)}
              title={lvl.label}
              className={`flex items-center gap-2 px-2 py-1.5 text-[10px] font-mono font-bold transition-all text-left cursor-pointer border ${
                isActive
                  ? 'bg-black text-white border-black shadow-[2px_2px_0_rgba(0,0,0,0.2)]'
                  : isDayMode
                  ? 'bg-zinc-100 text-zinc-600 border-zinc-300 hover:border-black hover:text-black'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600'
              }`}
            >
              <span className={`w-1.5 h-1.5 ${isActive ? 'bg-white' : 'bg-zinc-400'}`}></span>
              <span>{lvl.num}</span>
            </button>
          );
        })}
      </aside>

      {/* Main Structural Flow with Scroll-Up Transitions */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Section 00: Apex Hero (Pillar Center, Daylight Morning) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={sectionSlideVariants}
            className="slab-section"
          >
            <HeroSection isDayMode={isDayMode} />
          </motion.div>

          {/* Section 01: Selected Works (Pillar Alternates Right / Left, Midday Sunlight) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={sectionSlideVariants}
            className="slab-section"
          >
            <WorksVault
              isDayMode={isDayMode}
              onSelectProject={setFocusedProjectId}
            />
          </motion.div>

          {/* Section 02: How I Work (Process, Pillar Right, Golden Hour Sunset) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={sectionSlideVariants}
            className="slab-section"
          >
            <ProcessSection isDayMode={isDayMode} />
          </motion.div>

          {/* Section 03: About & Manifesto (Pillar Left, Twilight Dusk) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={sectionSlideVariants}
            className="slab-section"
          >
            <ManifestSection />
          </motion.div>

          {/* Section 04: Studio Dispatch Terminal (Pillar Center, Nocturnal Midnight Floodlight) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={sectionSlideVariants}
            className="slab-section"
          >
            <DispatchSection />
          </motion.div>
        </main>

        {/* 3D Pillar Inspection Case Study Panel */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setFocusedProjectId(null)}
        />

        <FooterHUD />
      </div>
    </div>
  );
}

export default App;
