import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Layers, Compass, Menu, X, Terminal } from 'lucide-react';
import { brutalistAudio } from '../utils/audio';
import { PORTFOLIO_DATA } from '../data/portfolio';

interface HeaderNavProps {
  isBlueprint: boolean;
  setIsBlueprint: (val: boolean) => void;
  surfaceFinish: 'board-formed' | 'polished';
  setSurfaceFinish: (finish: 'board-formed' | 'polished') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isBlueprint,
  setIsBlueprint,
  surfaceFinish,
  setSurfaceFinish,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().split(' ')[4];
      setCurrentTime(`${utc} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const muted = brutalistAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleModeToggle = () => {
    brutalistAudio.playHydraulicHiss();
    setIsBlueprint(!isBlueprint);
  };

  const handleFinishToggle = () => {
    brutalistAudio.playConcreteThud();
    setSurfaceFinish(surfaceFinish === 'board-formed' ? 'polished' : 'board-formed');
  };

  const navLinks = [
    { label: '00 // HOME', href: '#monolith' },
    { label: '01 // WORKS', href: '#works' },
    { label: '02 // PROCESS', href: '#process' },
    { label: '03 // ABOUT', href: '#about' },
    { label: '04 // CONTACT', href: '#dispatch' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#161618]/95 backdrop-blur-md border-b-4 border-zinc-700 shadow-[0_6px_0_#09090b]">
      {/* Top Telemetry Strip */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 bg-zinc-950/90 border-b border-zinc-800/80 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            {PORTFOLIO_DATA.identity.callsign}
          </span>
          <span className="text-zinc-700">|</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Compass className="w-3 h-3 text-zinc-500" />
            {PORTFOLIO_DATA.identity.location}
          </span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">EXPERIENCE: 5+ YEARS</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-300">SYSTEM: 120 FPS ADAPTIVE</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-200 font-bold">{currentTime}</span>
        </div>
      </div>

      {/* Main Structural Navigation Beam */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Monolithic Logo */}
        <a
          href="#monolith"
          onClick={() => brutalistAudio.playConcreteThud()}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-9 h-9 bg-zinc-900 border border-zinc-500 flex items-center justify-center font-display font-black text-sm text-white group-hover:bg-white group-hover:text-black group-hover:border-white transition-all shadow-[2px_2px_0_#000]">
            EET
          </div>
          <div>
            <div className="font-display font-bold text-base text-white tracking-tight group-hover:text-zinc-300 transition-colors leading-tight">
              {PORTFOLIO_DATA.identity.name}
            </div>
            <div className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase">
              CREATIVE WEB DESIGN & UI
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => brutalistAudio.playMechanicalClick()}
              className="font-mono text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 px-3 py-1.5 border border-transparent hover:border-zinc-700 transition-all uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Brutalist Toolset Controls */}
        <div className="flex items-center gap-2">
          {/* Blueprint Mode Toggle */}
          <button
            onClick={handleModeToggle}
            title="Toggle Rebar CAD Blueprint Mode"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold border transition-colors shadow-[2px_2px_0_#000] cursor-pointer ${
              isBlueprint
                ? 'bg-sky-950 text-sky-400 border-sky-500'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isBlueprint ? 'CAD MODE' : 'CONCRETE'}</span>
          </button>

          {/* Finish Toggle */}
          <button
            onClick={handleFinishToggle}
            title="Toggle Surface Finish"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white transition-colors shadow-[2px_2px_0_#000] cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>{surfaceFinish === 'board-formed' ? 'ROUGH' : 'SMOOTH'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            title="Toggle Structural Sound Effects"
            className={`p-2 border transition-colors shadow-[2px_2px_0_#000] cursor-pointer ${
              isMuted
                ? 'bg-zinc-950 text-zinc-600 border-zinc-800'
                : 'bg-zinc-900 text-white border-zinc-700 hover:border-white'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              brutalistAudio.playMechanicalClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                brutalistAudio.playConcreteThud();
                setMobileMenuOpen(false);
              }}
              className="font-mono text-xs font-bold text-zinc-300 hover:text-white py-2 px-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-zinc-800 text-xs font-mono text-zinc-400">
            <span>FINISH: {surfaceFinish.toUpperCase()}</span>
            <button
              onClick={handleFinishToggle}
              className="text-white font-bold underline uppercase"
            >
              SWITCH
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
