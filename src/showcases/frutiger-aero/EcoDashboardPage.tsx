import React from 'react';
import { Sun, Droplets, Wind, Sparkles } from 'lucide-react';

export interface EcoDashboardPageProps {
  lang: 'EN' | 'TR';
  solarOutput: number;
  hydroFlow: number;
  purityLevel: number;
}

export const EcoDashboardPage: React.FC<EcoDashboardPageProps> = ({
  lang,
  solarOutput,
  hydroFlow,
  purityLevel,
}) => {
  return (
    <div className="space-y-8 animate-fade-in select-none">
      {/* Hero Feature Banner - Windows XP Bliss Panorama & Frutiger Aero Harmony */}
      <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#0055ea]/90 via-[#0288d1]/85 to-[#388e3c]/90 text-white shadow-[0_16px_35px_rgba(0,85,234,0.3)] border-2 border-white/70 overflow-hidden">
        {/* Specular curved sunburst light highlight */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-radial from-white/40 via-yellow-200/20 to-transparent blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider border border-white/40 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>{lang === 'TR' ? 'WINDOWS XP & AERO DENEYİMİ' : 'WINDOWS XP & AERO BENCHMARK'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {lang === 'TR'
              ? 'Balık Fanusu & Windows XP Bliss Cenneti'
              : 'Fishbowl Sanctuary & Windows XP Bliss Horizon'}
          </h1>
          <p className="text-xs sm:text-sm text-sky-50 leading-relaxed font-medium drop-shadow-sm">
            {lang === 'TR'
              ? 'Cam fanusun içinden yemyeşil Windows XP tepelerini izleyin. İmlecinizi merakla takip eden palyaço balığı ve patlatılabilir su baloncuklarıyla saf nostalji.'
              : 'Gaze out from within the curved glass fishbowl at the iconic Windows XP Bliss rolling hills. A playful clownfish pursues your cursor amidst crystal-clear interactive popping bubbles.'}
          </p>
        </div>
      </div>

      {/* 3 Telemetry Dial Cards - Windows XP Luna Blue & Bliss Green */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Solar Card */}
        <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_10px_28px_rgba(0,85,234,0.1)] space-y-4 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '18s' }} />
              <span>{lang === 'TR' ? 'GÜNEŞ ŞEBEKESİ' : 'SOLAR ARRAY'}</span>
            </span>
            <span className="text-xs font-black text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 shadow-sm">
              ONLINE
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#0055ea] tracking-tight">{solarOutput}%</span>
            <span className="text-xs font-bold text-slate-500">PEAK</span>
          </div>
          {/* Glossy Progress Track */}
          <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 shadow-inner overflow-hidden border border-slate-300/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 shadow-[0_1px_4px_rgba(245,158,11,0.5)] transition-all duration-700"
              style={{ width: `${solarOutput}%` }}
            />
          </div>
        </div>

        {/* Hydro Velocity - Windows XP Luna Blue */}
        <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_10px_28px_rgba(0,85,234,0.1)] space-y-4 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#0055ea]" />
              <span>{lang === 'TR' ? 'HİDRO AKIŞ' : 'HYDRO VELOCITY'}</span>
            </span>
            <span className="text-xs font-black text-[#0055ea] bg-sky-100/90 px-2 py-0.5 rounded-full border border-sky-300 shadow-sm">
              FLOWING
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#0055ea] tracking-tight">{hydroFlow}</span>
            <span className="text-xs font-bold text-slate-500">M / SEC</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 shadow-inner overflow-hidden border border-slate-300/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#29b6f6] via-[#0288d1] to-[#0055ea] shadow-[0_1px_4px_rgba(0,85,234,0.5)] transition-all duration-700"
              style={{ width: `${(hydroFlow / 20) * 100}%` }}
            />
          </div>
        </div>

        {/* Biosphere Purity - Windows XP Bliss Green */}
        <div className="rounded-2xl p-5 bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_10px_28px_rgba(0,85,234,0.1)] space-y-4 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-[#388e3c]" />
              <span>{lang === 'TR' ? 'ATMOSFER SAFİYETİ' : 'BIOSPHERE PURITY'}</span>
            </span>
            <span className="text-xs font-black text-[#2e7d32] bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 shadow-sm">
              PRISTINE
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-[#2e7d32] tracking-tight">{purityLevel}%</span>
            <span className="text-xs font-bold text-slate-500">INDEX</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 shadow-inner overflow-hidden border border-slate-300/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#66bb6a] via-[#43a047] to-[#2e7d32] shadow-[0_1px_4px_rgba(46,125,50,0.5)] transition-all duration-700"
              style={{ width: `${purityLevel}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
