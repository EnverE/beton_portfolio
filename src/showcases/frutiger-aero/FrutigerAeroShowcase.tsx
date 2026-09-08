import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sun,
  Droplets,
  Sparkles,
  Wind,
  Activity,
  Globe,
  Radio,
  Sliders,
  Cpu,
  RefreshCw,
  Plus
} from 'lucide-react';
import { aeroAudio } from './aeroAudio';

interface FrutigerAeroShowcaseProps {
  onBack: () => void;
  initialLanguage?: 'EN' | 'TR';
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
}

export const FrutigerAeroShowcase: React.FC<FrutigerAeroShowcaseProps> = ({
  onBack,
  initialLanguage = 'EN'
}) => {
  const [lang, setLang] = useState<'EN' | 'TR'>(initialLanguage);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'media' | 'telemetry' | 'spec'>('dashboard');
  const [atmosphere, setAtmosphere] = useState<'azure' | 'aqua' | 'aurora'>('azure');
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
      opacity: Math.random() * 0.5 + 0.35
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
      opacity: 0.75
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
      glow: 'rgba(79, 195, 247, 0.45)'
    },
    aqua: {
      bg: 'from-[#00695c] via-[#26a69a] to-[#80cbc4]',
      ground: 'from-[#004d40] to-[#00796b]',
      accent: '#64ffda',
      glow: 'rgba(38, 166, 154, 0.45)'
    },
    aurora: {
      bg: 'from-[#1a237e] via-[#00897b] to-[#7cb342]',
      ground: 'from-[#004d40] to-[#1b5e20]',
      accent: '#69f0ae',
      glow: 'rgba(105, 240, 174, 0.45)'
    }
  }[atmosphere];

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden font-sans select-none bg-gradient-to-b ${atmosphereStyles.bg} transition-colors duration-1000 text-slate-900`}
    >
      {/* Dynamic Animated Sunburst & Horizon Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-white/60 via-cyan-200/30 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Translucent Water Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {bubbles.map((b) => (
          <div
            key={b.id}
            onClick={() => popBubble(b.id)}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              opacity: b.opacity,
            }}
            className="absolute rounded-full cursor-pointer pointer-events-auto transition-transform hover:scale-110 active:scale-95 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(0,100,200,0.3),0_4px_12px_rgba(0,0,0,0.15)] border border-white/60 backdrop-blur-[1px] bg-radial from-white/50 via-cyan-100/20 to-sky-400/20 group"
            title="Click to pop bubble!"
          >
            {/* Primary Specular Glint */}
            <div className="absolute top-[14%] left-[18%] w-[32%] h-[24%] bg-white rounded-full blur-[0.5px] rotate-[-30deg]" />
            {/* Secondary Rim Reflection */}
            <div className="absolute bottom-[16%] right-[20%] w-[18%] h-[14%] bg-white/70 rounded-full blur-[0.5px]" />
          </div>
        ))}
      </div>

      {/* Top Aero Navigation Bridge */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/80 shadow-[0_4px_20px_rgba(0,120,220,0.15)] px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              aeroAudio.playAeroClick();
              onBack();
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-b from-white to-slate-100 hover:from-slate-50 hover:to-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 shadow-[0_2px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all active:translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-sky-600" />
            <span>{lang === 'TR' ? 'PORTFOLYOYA DÖN' : 'RETURN TO PORTFOLIO'}</span>
          </button>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/40 text-sky-900 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ECO-SPHERE // BIO-AERO CLOUD OS</span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold">
          {/* Atmosphere Preset Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-white/60 p-1 rounded-full border border-white/80 shadow-inner">
            <button
              onClick={() => {
                aeroAudio.playGlassChime();
                setAtmosphere('azure');
              }}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                atmosphere === 'azure'
                  ? 'bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'TR' ? 'GÖKYÜZÜ' : 'AZURE'}
            </button>
            <button
              onClick={() => {
                aeroAudio.playGlassChime();
                setAtmosphere('aqua');
              }}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                atmosphere === 'aqua'
                  ? 'bg-gradient-to-b from-teal-400 to-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AQUA
            </button>
            <button
              onClick={() => {
                aeroAudio.playGlassChime();
                setAtmosphere('aurora');
              }}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                atmosphere === 'aurora'
                  ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AURORA
            </button>
          </div>

          {/* Clock */}
          <div className="px-3 py-1 rounded-full bg-white/70 border border-white/90 font-mono text-[11px] text-sky-900 shadow-sm">
            {timeString}
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm cursor-pointer transition-all"
            title={isMuted ? 'Unmute Aero Sounds' : 'Mute Aero Sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              aeroAudio.playAeroClick();
              setLang(lang === 'EN' ? 'TR' : 'EN');
            }}
            className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-slate-800 font-bold border border-slate-200 shadow-sm cursor-pointer transition-all"
          >
            {lang}
          </button>
        </div>
      </header>

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
              { id: 'telemetry', label: lang === 'TR' ? 'BİYOSFER TELEMETRİSİ' : 'BIOSPHERE TELEMETRY', icon: Cpu },
              { id: 'spec', label: lang === 'TR' ? 'TASARIM MANİFESTOSU' : 'DESIGN MANIFESTO', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    aeroAudio.playAeroClick();
                    setActiveTab(tab.id as typeof activeTab);
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

          {/* Window Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* TAB 1: ECO DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Hero Feature Banner */}
                <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-sky-500/85 via-teal-400/80 to-emerald-400/85 text-white shadow-[0_12px_30px_rgba(2,136,209,0.25)] border border-white/60 overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-white/30 to-transparent blur-2xl pointer-events-none" />
                  <div className="relative z-10 max-w-xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{lang === 'TR' ? 'YENİLİKÇİ ESTETİK KANITI' : 'CAPABILITY BENCHMARK'}</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm">
                      {lang === 'TR'
                        ? 'Parlak Skeuomorfizm & Aero Glass Mimarisi'
                        : 'Lush Skeuomorphism & Aero Glass Web Architecture'}
                    </h1>
                    <p className="text-xs sm:text-sm text-sky-50 leading-relaxed font-medium">
                      {lang === 'TR'
                        ? '2000’lerin teknolojik iyimserliği, su damlacıkları ve şeffaf cam panellerinin modern React 19 ve CSS cam morfolojisi ile yeniden yaratımı.'
                        : 'The vibrant techno-optimism of the 2000s, water glints, and glossy tactile widgets reconstructed with modern high-performance CSS and reactive Web Audio.'}
                    </p>
                  </div>
                </div>

                {/* 3 Telemetry Dial Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Solar Card */}
                  <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(0,100,200,0.08)] space-y-4 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '18s' }} />
                        <span>{lang === 'TR' ? 'GÜNEŞ ŞEBEKESİ' : 'SOLAR ARRAY'}</span>
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        ONLINE
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900 tracking-tight">{solarOutput}%</span>
                      <span className="text-xs font-bold text-slate-500">PEAK</span>
                    </div>
                    {/* Glossy Progress Track */}
                    <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 shadow-inner overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_1px_4px_rgba(245,158,11,0.5)] transition-all duration-700"
                        style={{ width: `${solarOutput}%` }}
                      />
                    </div>
                  </div>

                  {/* Hydro Velocity */}
                  <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(0,100,200,0.08)] space-y-4 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-sky-500" />
                        <span>{lang === 'TR' ? 'HİDRO AKIŞ' : 'HYDRO VELOCITY'}</span>
                      </span>
                      <span className="text-xs font-extrabold text-sky-600 bg-sky-100/80 px-2 py-0.5 rounded-full">
                        OPTIMAL
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900 tracking-tight">{hydroFlow}</span>
                      <span className="text-xs font-bold text-slate-500">M / SEC</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 shadow-inner overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_1px_4px_rgba(14,165,233,0.5)] transition-all duration-700"
                        style={{ width: `${(hydroFlow / 20) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Biosphere Purity */}
                  <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(0,100,200,0.08)] space-y-4 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Wind className="w-4 h-4 text-emerald-500" />
                        <span>{lang === 'TR' ? 'ATMOSFER SAFİYETİ' : 'BIOSPHERE PURITY'}</span>
                      </span>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        PRISTINE
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900 tracking-tight">{purityLevel}%</span>
                      <span className="text-xs font-bold text-slate-500">INDEX</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 shadow-inner overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 shadow-[0_1px_4px_rgba(16,185,129,0.5)] transition-all duration-700"
                        style={{ width: `${purityLevel}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AQUA MEDIA PLAYER */}
            {activeTab === 'media' && (
              <div className="max-w-xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/95 via-sky-50/80 to-white/90 border border-white shadow-[0_16px_40px_rgba(0,120,220,0.18)] space-y-6">
                <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Radio className="w-5 h-5 text-sky-600" />
                    <span className="font-black text-sm text-slate-900 tracking-wide">AERO SOUND PLAYER // MP3 JUKEBOX</span>
                  </div>
                  <span className="text-[11px] font-mono text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full font-bold">
                    320 KBPS VBR
                  </span>
                </div>

                {/* Animated Equalizer Waveform */}
                <div className="h-28 rounded-2xl bg-gradient-to-b from-slate-900 to-sky-950 p-4 flex items-end justify-center gap-1.5 shadow-inner overflow-hidden relative">
                  <div className="absolute top-2 left-4 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">
                    AQUATIC AMBIENCE // 2007 CHILLOUT
                  </div>
                  {Array.from({ length: 28 }, (_, i) => {
                    const heightPct = isPlayingAudio
                      ? Math.sin(i * 0.4 + audioProgress * 0.1) * 35 + 50
                      : 10 + (i % 3) * 5;
                    return (
                      <div
                        key={i}
                        className="w-2 rounded-t-sm bg-gradient-to-t from-sky-500 via-teal-400 to-emerald-300 transition-all duration-150"
                        style={{ height: `${heightPct}%` }}
                      />
                    );
                  })}
                </div>

                {/* Scrubber */}
                <div className="space-y-1.5">
                  <div className="w-full h-2.5 rounded-full bg-slate-200/90 shadow-inner overflow-hidden cursor-pointer">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-500">
                    <span>01:42</span>
                    <span>04:20</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      aeroAudio.playGlassChime();
                      setIsPlayingAudio(!isPlayingAudio);
                    }}
                    className="w-14 h-14 rounded-full bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(2,136,209,0.5),inset_0_2px_0_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 cursor-pointer transition-all"
                  >
                    {isPlayingAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: BIOSPHERE TELEMETRY */}
            {activeTab === 'telemetry' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-slate-900 text-sm uppercase flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-teal-600" />
                      <span>{lang === 'TR' ? 'EKOLOJİK DENGE PARAMETRELERİ' : 'ECO-BALANCE SENSORS'}</span>
                    </h3>
                    <div className="space-y-3 text-xs font-semibold text-slate-700">
                      <div className="flex justify-between pb-2 border-b border-slate-200">
                        <span>Carbon Capture Rate</span>
                        <span className="font-mono text-emerald-600 font-bold">+94.2 Tons/Day</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-slate-200">
                        <span>Rainwater Retention</span>
                        <span className="font-mono text-sky-600 font-bold">1,480 kL</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-slate-200">
                        <span>Wind Turbine RPM</span>
                        <span className="font-mono text-slate-900 font-bold">42.8 RPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ocean Salinity Index</span>
                        <span className="font-mono text-teal-600 font-bold">35 PSU (Nominal)</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl p-6 bg-white/70 backdrop-blur-xl border border-white/90 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-slate-900 text-sm uppercase flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-sky-600" />
                      <span>{lang === 'TR' ? 'CANLI ALTYAPI DURUMU' : 'CLOUD SUBSYSTEM STATUS'}</span>
                    </h3>
                    <div className="space-y-2.5">
                      {['Atmospheric Filter Cluster', 'Aqua-Loop Turbine Array', 'Thermal Buffer Grid'].map((sys, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{sys}</span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            100% OPERATIONAL
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: DESIGN MANIFESTO */}
            {activeTab === 'spec' && (
              <div className="max-w-3xl mx-auto rounded-2xl p-6 sm:p-8 bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-5 text-slate-800">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-base text-slate-900 uppercase">
                    {lang === 'TR' ? 'Frutiger Aero: Yaratıcı Tasarım Yetkinliği' : 'Frutiger Aero: Creative Design Craft'}
                  </h3>
                </div>
                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <p>
                    {lang === 'TR'
                      ? 'Bu prototip, ana portfolyomdaki brutalist monolitik beton estetiğine taban tabana zıt bir görsel dili kusursuz uygulayabilme becerimi sergilemek için tasarlandı. Frutiger Aero; 2004–2013 yılları arasında Windows Vista, 7 ve erken iOS dönemini tanımlayan cam dokuları, parlak skeuomorfizm, su damlaları ve doğa-teknoloji harmonisini temsil eder.'
                      : 'This interactive prototype showcases dynamic range: contrasting the heavy concrete brutalism of my main portfolio with the luminous, optimistic aesthetic of Frutiger Aero (2004–2013). Defined by glassy skeuomorphism, dynamic water glints, and nature-tech harmony, it was rebuilt with modern high-performance React 19 and Web Audio.'}
                  </p>
                  <p>
                    {lang === 'TR'
                      ? 'Tüm cam parlaklıkları, ses sentezleyicileri, SVG göstergeleri ve baloncuk fiziği bağımsız bir alan adı gerektirmeksizin doğrudan bu portfolyo altyapısında çalışmaktadır.'
                      : 'All glossy reflections, audio synthesis, SVG gauge telemetry, and bubble physics run natively inside this portfolio without external dependencies.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 text-xs font-mono font-bold">
                  <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800">SKEUOMORPHISM</span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">AERO GLASS</span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800">WEB AUDIO SYNTH</span>
                  <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800">BUBBLE PHYSICS</span>
                </div>
              </div>
            )}
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
