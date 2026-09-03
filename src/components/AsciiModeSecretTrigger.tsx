import React, { useState, useEffect } from 'react';
import { asciiEngine, type AsciiEngineState } from '../classes/AsciiArtEngine';
import { Terminal } from 'lucide-react';

export const AsciiModeSecretTrigger: React.FC = () => {
  const [engineState, setEngineState] = useState<AsciiEngineState>(() => asciiEngine.getState());

  useEffect(() => {
    const unsub = asciiEngine.subscribe((state) => {
      setEngineState(state);
    });
    return () => unsub();
  }, []);

  const handleToggle = () => {
    asciiEngine.toggle();
  };

  const { active, isTransitioning, transitionType } = engineState;

  return (
    <>
      {/* 1. Visceral Glitch & Screen Shake Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden select-none">
          {/* High-intensity chromatic flash */}
          <div
            className={`absolute inset-0 transition-opacity duration-200 ${
              transitionType === 'activate'
                ? 'bg-emerald-500/20 mix-blend-screen animate-pulse'
                : 'bg-amber-500/20 mix-blend-screen animate-pulse'
            }`}
          />

          {/* Glitch Slice Strip A (Top/Mid) */}
          <div
            className="absolute inset-0 bg-cyan-400/20 mix-blend-color-dodge pointer-events-none"
            style={{
              animation: 'glitchSliceAnimA 0.45s steps(2, start) infinite',
            }}
          />

          {/* Glitch Slice Strip B (Mid/Bottom) */}
          <div
            className="absolute inset-0 bg-red-500/20 mix-blend-screen pointer-events-none"
            style={{
              animation: 'glitchSliceAnimB 0.45s steps(3, end) infinite',
            }}
          />

          {/* Rapid Horizontal CRT Static Tearing Lines */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 2px, transparent 2px, transparent 6px)',
              backgroundSize: '100% 6px',
            }}
          />

          {/* Center Cyberpunk Glitch Telemetry Box */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/95 border-2 border-emerald-400 p-5 shadow-[0_0_35px_rgba(16,185,129,0.7)] text-center font-mono max-w-sm w-[90vw]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-[11px] font-black tracking-widest text-emerald-300 uppercase">
                {transitionType === 'activate' ? 'PROTOCOL BREACH // ASCII_OVERRIDE' : 'RESTORING BRUTALIST REALITY'}
              </span>
            </div>

            <div className="text-xs text-white font-bold tracking-wider mb-2">
              {transitionType === 'activate'
                ? '>>> DISSOLVING 3D MONOLITH TO MONOSPACE BUFFER...'
                : '>>> RECOMPOSING CONCRETE FORM & PHOTOREALISTIC SHADOWS...'}
            </div>

            <div className="flex justify-center gap-1 text-[9px] text-emerald-400/80 font-black tracking-widest animate-pulse">
              <span>[ 01000001</span>
              <span>01010011</span>
              <span>01000011</span>
              <span>01001001 ]</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Secret Button in Bottom-Right Corner */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
        <button
          onClick={handleToggle}
          disabled={isTransitioning}
          title="Secret Protocol: Toggle ASCII Art Mode (Shortcut: Alt+A)"
          className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase transition-all duration-200 border cursor-pointer ${
            active
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              : 'bg-black/80 text-zinc-400 border-zinc-800 hover:border-emerald-500 hover:text-emerald-400 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] backdrop-blur-md'
          } ${isTransitioning ? 'opacity-50 cursor-wait' : ''}`}
        >
          <Terminal className={`w-3.5 h-3.5 ${active ? 'animate-pulse text-emerald-400' : ''}`} />
          <span>{active ? 'EXIT ASCII' : '⌗ ASCII'}</span>
          <span className="text-[9px] opacity-60 hidden sm:inline">[ALT+A]</span>
        </button>
      </div>
    </>
  );
};
