import React from 'react';
import { ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { aeroAudio } from './aeroAudio';

export interface AeroHeaderNavProps {
  lang: 'EN' | 'TR';
  onBack: () => void;
  atmosphere: 'azure' | 'aqua' | 'aurora';
  setAtmosphere: (a: 'azure' | 'aqua' | 'aurora') => void;
  timeString: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleLang: () => void;
}

export const AeroHeaderNav: React.FC<AeroHeaderNavProps> = ({
  lang,
  onBack,
  atmosphere,
  setAtmosphere,
  timeString,
  isMuted,
  onToggleMute,
  onToggleLang,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-[#0055ea]/90 via-[#245edb]/85 to-[#0044cc]/90 backdrop-blur-xl border-b-2 border-sky-300/60 shadow-[0_4px_25px_rgba(0,85,234,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] px-4 sm:px-8 py-2.5 flex items-center justify-between text-white">
      {/* Left: Return button & XP Status badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            aeroAudio.playAeroClick();
            onBack();
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-b from-[#4caf50] via-[#388e3c] to-[#2e7d32] hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider border border-[#81c784] shadow-[0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all active:translate-y-0.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-white" />
          <span>{lang === 'TR' ? 'PORTFOLYO' : 'BETON PORTFOLIO'}</span>
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/30 text-white text-xs font-semibold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-wide">XP LUNA // FRUTIGER AERO FISHBOWL</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-semibold">
        {/* Atmosphere Theme Selector */}
        <div className="hidden sm:flex items-center gap-1 bg-black/25 p-1 rounded-full border border-white/30 shadow-inner">
          {(['azure', 'aqua', 'aurora'] as const).map((atm) => {
            const isActive = atmosphere === atm;
            const labels = {
              azure: lang === 'TR' ? 'XP BLISS' : 'XP BLISS',
              aqua: lang === 'TR' ? 'AQUA MAVİ' : 'AQUA BLUE',
              aurora: lang === 'TR' ? 'ÇAYIR YEŞİLİ' : 'LUSH MEADOW',
            };
            const activeGradients = {
              azure: 'from-[#42a5f5] to-[#1565c0]',
              aqua: 'from-[#26a69a] to-[#00695c]',
              aurora: 'from-[#66bb6a] to-[#2e7d32]',
            };
            return (
              <button
                key={atm}
                onClick={() => {
                  aeroAudio.playGlassChime();
                  setAtmosphere(atm);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-b ${activeGradients[atm]} text-white shadow-[0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.7)]`
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {labels[atm]}
              </button>
            );
          })}
        </div>

        {/* Digital Clock */}
        <div className="px-3 py-1 rounded-full bg-white/20 border border-white/40 font-mono text-[11px] text-white shadow-inner">
          {timeString}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onToggleMute}
          className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/40 shadow-sm cursor-pointer transition-all"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
        </button>

        {/* Language Toggle */}
        <button
          onClick={onToggleLang}
          className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold border border-white/40 shadow-sm cursor-pointer transition-all"
        >
          {lang}
        </button>
      </div>
    </header>
  );
};
