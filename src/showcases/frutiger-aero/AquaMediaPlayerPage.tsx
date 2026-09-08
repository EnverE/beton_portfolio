import React from 'react';
import { Radio, Play, Pause, Disc3, Volume2 } from 'lucide-react';
import { aeroAudio } from './aeroAudio';

export interface AquaMediaPlayerPageProps {
  isPlaying: boolean;
  progress: number;
  onTogglePlay: () => void;
}

export const AquaMediaPlayerPage: React.FC<AquaMediaPlayerPageProps> = ({
  isPlaying,
  progress,
  onTogglePlay,
}) => {
  return (
    <div className="max-w-xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/95 via-sky-50/90 to-emerald-50/80 border-2 border-white shadow-[0_20px_50px_rgba(0,85,234,0.22)] space-y-6 animate-fade-in select-none">
      {/* Player Header - Luna Blue & Bliss Green */}
      <div className="flex items-center justify-between border-b border-sky-200/80 pb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#0055ea]" />
          <span className="font-black text-xs sm:text-sm text-slate-900 tracking-wide">
            WINDOWS MEDIA PLAYER // XP BLISS EDITION
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full font-extrabold border border-emerald-300">
          <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>WMA 320 KBPS</span>
        </div>
      </div>

      {/* Animated Equalizer Waveform - Neon XP Blue & Emerald */}
      <div className="h-32 rounded-2xl bg-gradient-to-b from-slate-950 via-[#001e4d] to-[#003366] p-4 flex items-end justify-center gap-1.5 shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)] overflow-hidden relative border border-sky-400/30">
        <div className="absolute top-2 left-4 flex items-center gap-2 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FISHBOWL AMBIENCE // BLISS CHILLOUT</span>
        </div>
        {Array.from({ length: 30 }, (_, i) => {
          const heightPct = isPlaying
            ? Math.sin(i * 0.38 + progress * 0.12) * 38 + 52
            : 10 + (i % 4) * 4;
          return (
            <div
              key={i}
              className="w-2 rounded-t-sm bg-gradient-to-t from-[#0055ea] via-[#29b6f6] to-[#4caf50] transition-all duration-150 shadow-[0_0_6px_rgba(41,182,246,0.5)]"
              style={{ height: `${heightPct}%` }}
            />
          );
        })}
      </div>

      {/* Scrubber - Windows XP Progress Bar Style */}
      <div className="space-y-1.5">
        <div className="w-full h-3 rounded-full bg-slate-200/90 p-0.5 shadow-inner overflow-hidden cursor-pointer border border-slate-300/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0055ea] via-[#29b6f6] to-[#4caf50] shadow-[0_1px_4px_rgba(0,85,234,0.4)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono font-bold text-slate-600">
          <span>01:42</span>
          <div className="flex items-center gap-1 text-slate-500">
            <Volume2 className="w-3.5 h-3.5 text-[#0055ea]" />
            <span>DOLBY SURROUND</span>
          </div>
          <span>04:20</span>
        </div>
      </div>

      {/* Controls - Iconic XP Emerald Start-Button Style Circular Play Button */}
      <div className="flex items-center justify-center gap-5 pt-2">
        <button
          onClick={() => {
            aeroAudio.playAeroClick();
            onTogglePlay();
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-b from-[#4caf50] via-[#43a047] to-[#2e7d32] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(46,125,50,0.5),inset_0_2px_0_rgba(255,255,255,0.9)] hover:scale-105 active:scale-95 cursor-pointer transition-all border-2 border-[#a5d6a7]"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
        </button>
      </div>
    </div>
  );
};
