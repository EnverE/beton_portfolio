import React from 'react';
import { Radio, Play, Pause } from 'lucide-react';
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
    <div className="max-w-xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/95 via-sky-50/80 to-white/90 border border-white shadow-[0_16px_40px_rgba(0,120,220,0.18)] space-y-6 animate-fade-in">
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
          const heightPct = isPlaying
            ? Math.sin(i * 0.4 + progress * 0.1) * 35 + 50
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
            style={{ width: `${progress}%` }}
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
            onTogglePlay();
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 text-white flex items-center justify-center shadow-[0_6px_20px_rgba(2,136,209,0.5),inset_0_2px_0_rgba(255,255,255,0.8)] hover:scale-105 active:scale-95 cursor-pointer transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
      </div>
    </div>
  );
};
