import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Activity,
  Radio,
  Sliders,
  Sparkles,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { aeroAudio } from './aeroAudio';
import { AeroHeaderNav } from './AeroHeaderNav';
import { AeroBubbleField, type Bubble } from './AeroBubbleField';
import { EcoDashboardPage } from './EcoDashboardPage';
import { AquaMediaPlayerPage } from './AquaMediaPlayerPage';
import { BiosphereTelemetryPage } from './BiosphereTelemetryPage';
import { DesignManifestoPage } from './DesignManifestoPage';

export interface FrutigerAeroShowcaseProps {
  onBack: () => void;
  initialLanguage?: 'EN' | 'TR';
}

export type AeroShowcaseTab = 'dashboard' | 'media' | 'telemetry' | 'spec';
export type AeroAtmosphere = 'azure' | 'aqua' | 'aurora';

export const FrutigerAeroShowcase: React.FC<FrutigerAeroShowcaseProps> = ({
  onBack,
  initialLanguage = 'EN',
}) => {
  const [lang, setLang] = useState<'EN' | 'TR'>(initialLanguage);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<AeroShowcaseTab>('dashboard');
  const [atmosphere, setAtmosphere] = useState<AeroAtmosphere>('azure');
  const [timeString, setTimeString] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38);
  const [solarOutput, setSolarOutput] = useState(98.4);
  const [hydroFlow, setHydroFlow] = useState(14.2);
  const [purityLevel, setPurityLevel] = useState(99.8);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bubbleIdRef = useRef(1);

  // Live system clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initial bubble population
  useEffect(() => {
    const initBubbles: Bubble[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 20,
      size: Math.random() * 45 + 25,
      speed: Math.random() * 0.4 + 0.2,
      drift: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.35,
    }));
    setBubbles(initBubbles);
    bubbleIdRef.current = 13;
  }, []);

  // Animation frame loop for floating bubbles
  useEffect(() => {
    let animId: number;
    const updateBubbles = () => {
      setBubbles((prev) =>
        prev.map((b) => {
          let newY = b.y - b.speed;
          let newX = b.x + b.drift;
          if (newY < -15) {
            newY = 110;
            newX = Math.random() * 90 + 5;
          }
          return { ...b, y: newY, x: newX };
        })
      );
      animId = requestAnimationFrame(updateBubbles);
    };
    animId = requestAnimationFrame(updateBubbles);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Simulated live telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSolarOutput((prev) => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
      setHydroFlow((prev) => +(prev + (Math.random() - 0.5) * 0.2).toFixed(1));
      setPurityLevel((prev) => +(Math.min(100, Math.max(99.0, prev + (Math.random() - 0.5) * 0.05))).toFixed(2));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Audio equalizer simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    aeroAudio.isMuted = next;
    if (!next) {
      aeroAudio.playAeroClick();
    }
  };

  const spawnBubble = () => {
    aeroAudio.playBubbleSpawn();
    const newBubble: Bubble = {
      id: bubbleIdRef.current++,
      x: Math.random() * 80 + 10,
      y: 95,
      size: Math.random() * 50 + 30,
      speed: Math.random() * 0.5 + 0.3,
      drift: (Math.random() - 0.5) * 0.4,
      opacity: 0.75,
    };
    setBubbles((prev) => [...prev, newBubble]);
  };

  const popBubble = (id: number) => {
    aeroAudio.playDropletPop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  // Background atmospheres
  const atmosphereStyles = {
    azure: {
      bg: 'from-[#0288d1] via-[#4fc3f7] to-[#81c784]',
      ground: 'from-[#66bb6a] to-[#2e7d32]',
      accent: '#00e5ff',
      glow: 'rgba(79, 195, 247, 0.45)',
    },
    aqua: {
      bg: 'from-[#00695c] via-[#26a69a] to-[#80cbc4]',
      ground: 'from-[#004d40] to-[#00796b]',
      accent: '#64ffda',
      glow: 'rgba(38, 166, 154, 0.45)',
    },
    aurora: {
      bg: 'from-[#1a237e] via-[#00897b] to-[#7cb342]',
      ground: 'from-[#004d40] to-[#1b5e20]',
      accent: '#69f0ae',
      glow: 'rgba(105, 240, 174, 0.45)',
    },
  }[atmosphere];

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden font-sans select-none bg-gradient-to-b ${atmosphereStyles.bg} transition-colors duration-1000 text-slate-900`}
    >
      {/* Dynamic Animated Sunburst & Horizon Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-white/60 via-cyan-200/30 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Translucent Water Bubbles */}
      <AeroBubbleField bubbles={bubbles} onPopBubble={popBubble} />

      {/* Top Aero Navigation Bridge */}
      <AeroHeaderNav
        lang={lang}
        onBack={onBack}
        atmosphere={atmosphere}
        setAtmosphere={setAtmosphere}
        timeString={timeString}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onToggleLang={() => {
          aeroAudio.playAeroClick();
          setLang(lang === 'EN' ? 'TR' : 'EN');
        }}
      />

      {/* Main Aero Glass Workspace */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 relative z-20">
        {/* Aero Window Shell */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/40 backdrop-blur-2xl border border-white/90 shadow-[0_20px_60px_rgba(0,50,120,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden">
          {/* Aero Window Header Strip */}
          <div className="px-6 py-4 bg-gradient-to-b from-white/90 via-white/70 to-white/40 border-b border-white/80 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3">
              {/* Window Aqua Buttons */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-b from-rose-400 to-rose-600 border border-rose-700/40 shadow-inner" />
                <span className="w-3 h-3 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border border-amber-600/40 shadow-inner" />
                <span className="w-3 h-3 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 border border-emerald-700/40 shadow-inner" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-wide flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-sky-600" />
                <span>ECO-SPHERE BIO-PORTAL // VISTA AERO ENGINE 2026</span>
              </span>
            </div>

            {/* Bubble Spawner CTA */}
            <button
              onClick={spawnBubble}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 text-white font-bold text-xs shadow-[0_2px_8px_rgba(2,136,209,0.4),inset_0_1px_0_rgba(255,255,255,0.7)] hover:brightness-105 active:translate-y-0.5 cursor-pointer transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'TR' ? 'BALONCUK ÜRET' : 'SPAWN BUBBLE'}</span>
            </button>
          </div>

          {/* Aero Tab Navigation */}
          <div className="px-6 pt-4 bg-white/20 border-b border-white/50 flex flex-wrap gap-2">
            {[
              { id: 'dashboard', label: lang === 'TR' ? 'EKO GÖSTERGE' : 'ECO DASHBOARD', icon: Activity },
              { id: 'media', label: lang === 'TR' ? 'AQUA MEDYA OYNATICI' : 'AQUA MEDIA PLAYER', icon: Radio },
              { id: 'telemetry', label: lang === 'TR' ? 'BİYOSFER TELEMETRİSİ' : 'BIOSPHERE TELEMETRY', icon: Sliders },
              { id: 'spec', label: lang === 'TR' ? 'TASARIM MANİFESTOSU' : 'DESIGN MANIFESTO', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    aeroAudio.playAeroClick();
                    setActiveTab(tab.id as AeroShowcaseTab);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-bold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/90 text-sky-900 border-t-2 border-sky-500 shadow-[0_-4px_12px_rgba(0,100,200,0.1)]'
                      : 'bg-white/30 hover:bg-white/60 text-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Window Body Content - Rendered by clean dedicated page classes */}
          <div className="p-6 sm:p-10 space-y-8">
            {activeTab === 'dashboard' && (
              <EcoDashboardPage
                lang={lang}
                solarOutput={solarOutput}
                hydroFlow={hydroFlow}
                purityLevel={purityLevel}
              />
            )}

            {activeTab === 'media' && (
              <AquaMediaPlayerPage
                isPlaying={isPlayingAudio}
                progress={audioProgress}
                onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
              />
            )}

            {activeTab === 'telemetry' && <BiosphereTelemetryPage lang={lang} />}

            {activeTab === 'spec' && <DesignManifestoPage lang={lang} />}
          </div>
        </div>
      </main>

      {/* Floating Bottom Quick Return Dock */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => {
            aeroAudio.playAeroClick();
            onBack();
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 font-extrabold text-xs uppercase tracking-wider border border-white shadow-[0_8px_25px_rgba(0,120,220,0.3),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-sky-600" />
          <span>{lang === 'TR' ? 'BETON PORTFOLYOYA GERİ DÖN' : 'BACK TO BETON PORTFOLIO'}</span>
        </button>
      </footer>
    </div>
  );
};
