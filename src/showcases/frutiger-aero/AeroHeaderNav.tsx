import React from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
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
          {(['azure', 'aqua', 'aurora'] as const).map((atm) => {
            const isActive = atmosphere === atm;
            const labels = {
              azure: lang === 'TR' ? 'GÖKYÜZÜ' : 'AZURE',
              aqua: 'AQUA',
              aurora: 'AURORA',
            };
            const activeGradients = {
              azure: 'from-sky-400 to-sky-600',
              aqua: 'from-teal-400 to-teal-600',
              aurora: 'from-emerald-400 to-emerald-600',
            };
            return (
              <button
                key={atm}
                onClick={() => {
                  aeroAudio.playGlassChime();
                  setAtmosphere(atm);
                }}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? `bg-gradient-to-b ${activeGradients[atm]} text-white shadow-sm`
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {labels[atm]}
              </button>
            );
          })}
        </div>

        {/* Clock */}
        <div className="px-3 py-1 rounded-full bg-white/70 border border-white/90 font-mono text-[11px] text-sky-900 shadow-sm">
          {timeString}
        </div>

        {/* Sound Mute Toggle */}
        <button
          onClick={onToggleMute}
          className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-sm cursor-pointer transition-all"
          title={isMuted ? 'Unmute Aero Sounds' : 'Mute Aero Sounds'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
        </button>

        {/* Language Toggle */}
        <button
          onClick={onToggleLang}
          className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-slate-800 font-bold border border-slate-200 shadow-sm cursor-pointer transition-all"
        >
          {lang}
        </button>
      </div>
    </header>
  );
};
