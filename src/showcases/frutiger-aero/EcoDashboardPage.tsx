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
    <div className="space-y-8 animate-fade-in">
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
  );
};
