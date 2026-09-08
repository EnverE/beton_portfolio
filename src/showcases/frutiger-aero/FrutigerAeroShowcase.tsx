import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Activity,
  Radio,
  Sliders,
  Sparkles,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { aeroAudio } from './aeroAudio';
import { AeroHeaderNav } from './AeroHeaderNav';
import { AeroBubbleField, type Bubble } from './AeroBubbleField';
import { FishbowlEnvironment } from './FishbowlEnvironment';
import { ClownfishCompanion } from './ClownfishCompanion';
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

  // Initial bubble population in the fishbowl
  useEffect(() => {
    const initBubbles: Bubble[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 15,
      size: Math.random() * 45 + 24,
      speed: Math.random() * 0.35 + 0.18,
      drift: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.45 + 0.4,
    }));
    setBubbles(initBubbles);
    bubbleIdRef.current = 15;
  }, []);

  // Continuous animation loop for floating bubbles
  useEffect(() => {
    let animId: number;
    const updateBubbles = () => {
      setBubbles((prev) =>
        prev.map((b) => {
          let newY = b.y - b.speed;
          let newX = b.x + b.drift;
          if (newY < -12) {
            newY = 108;
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
      opacity: 0.8,
    };
    setBubbles((prev) => [...prev, newBubble]);
  };

  // Called by ClownfishCompanion when swimming fast to leave a tiny trail bubble
  const handleClownfishEmitBubble = (xPx: number, yPx: number) => {
    if (bubbles.length > 25) return; // Prevent too many simultaneous bubbles
    const pctX = Math.max(5, Math.min(95, (xPx / window.innerWidth) * 100));
    const pctY = Math.max(10, Math.min(95, (yPx / window.innerHeight) * 100));
    const fishBubble: Bubble = {
      id: bubbleIdRef.current++,
      x: pctX,
      y: pctY,
      size: Math.random() * 16 + 14,
      speed: Math.random() * 0.5 + 0.35,
      drift: (Math.random() - 0.5) * 0.3,
      opacity: 0.85,
    };
    setBubbles((prev) => [...prev, fishBubble]);
  };

  const popBubble = (id: number) => {
    aeroAudio.playDropletPop();
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans select-none text-slate-900">
      {/* 1. Inside-a-Fishbowl Glass Refraction & Distant Windows XP Bliss Backdrop */}
      <FishbowlEnvironment />

      {/* 2. Single Cursor-Chasing Clownfish */}
      <ClownfishCompanion onEmitBubble={handleClownfishEmitBubble} />

      {/* 3. Floating Translucent Water Bubbles (Click-to-Pop) */}
      <AeroBubbleField bubbles={bubbles} onPopBubble={popBubble} />

      {/* 4. Top Windows XP Luna Blue & Bliss Green Header */}
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

      {/* 5. Main Aero Glass Window Shell with Windows XP Color Accents */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10 relative z-20">
        <div className="rounded-2xl sm:rounded-3xl bg-white/55 backdrop-blur-xl border-2 border-white/80 shadow-[0_25px_70px_rgba(0,50,150,0.3),inset_0_1px_2px_rgba(255,255,255,0.95)] overflow-hidden">
          {/* Windows XP Luna Title Bar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#0055ea] via-[#245edb] to-[#0044cc] border-b-2 border-sky-300/50 flex items-center justify-between shadow-[0_3px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.6)] text-white">
            <div className="flex items-center gap-3">
              {/* Classic Window Buttons */}
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-rose-400 to-rose-600 border border-white/70 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border border-white/70 shadow-sm" />
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 border border-white/70 shadow-sm" />
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-200" />
                <span className="font-extrabold text-xs sm:text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  {lang === 'TR'
                    ? 'BİYOSFER EKO-PORTALI // WINDOWS XP & FRUTIGER AERO'
                    : 'ECO-SPHERE BIO-PORTAL // WINDOWS XP & FRUTIGER AERO'}
                </span>
              </div>
            </div>

            {/* Windows XP "Bliss Green" Spawn Bubble Button */}
            <button
              onClick={spawnBubble}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-b from-[#4caf50] via-[#43a047] to-[#2e7d32] text-white font-extrabold text-xs shadow-[0_3px_10px_rgba(46,125,50,0.4),inset_0_1px_0_rgba(255,255,255,0.8)] hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all border border-[#a5d6a7]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'TR' ? 'BALONCUK ÜRET' : 'SPAWN BUBBLE'}</span>
            </button>
          </div>

          {/* Navigation Tabs with Windows XP Blue & Green Glow */}
          <div className="px-5 pt-3.5 bg-white/40 border-b border-white/60 flex flex-wrap gap-2">
            {[
              { id: 'dashboard', label: lang === 'TR' ? 'EKO GÖSTERGE' : 'ECO DASHBOARD', icon: Activity },
              { id: 'media', label: lang === 'TR' ? 'AQUA MEDYA' : 'AQUA MEDIA PLAYER', icon: Radio },
              { id: 'telemetry', label: lang === 'TR' ? 'BİYOSFER TELEMETRİ' : 'BIOSPHERE TELEMETRY', icon: Sliders },
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-extrabold text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0055ea] border-t-2 border-[#245edb] shadow-[0_-4px_12px_rgba(0,85,234,0.15)]'
                      : 'bg-white/40 hover:bg-white/70 text-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0055ea]' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Window Body Content - Rendered by dedicated modular sub-page classes */}
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
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-white/95 to-sky-50/95 hover:from-white hover:to-white text-slate-900 font-extrabold text-xs uppercase tracking-wider border-2 border-white shadow-[0_8px_30px_rgba(0,85,234,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#0055ea]" />
          <span>{lang === 'TR' ? 'BETON PORTFOLYOYA DÖN' : 'BACK TO BETON PORTFOLIO'}</span>
        </button>
      </footer>
    </div>
  );
};
