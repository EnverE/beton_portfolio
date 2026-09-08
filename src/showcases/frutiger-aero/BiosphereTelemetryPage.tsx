import React from 'react';
import { Sliders, RefreshCw, Activity, ShieldCheck } from 'lucide-react';

export interface BiosphereTelemetryPageProps {
  lang: 'EN' | 'TR';
}

export const BiosphereTelemetryPage: React.FC<BiosphereTelemetryPageProps> = ({ lang }) => {
  return (
    <div className="space-y-6 animate-fade-in select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eco-Balance Sensors */}
        <div className="rounded-2xl p-6 bg-white/75 backdrop-blur-xl border-2 border-white shadow-[0_10px_28px_rgba(0,85,234,0.1)] space-y-4">
          <h3 className="font-black text-slate-900 text-sm uppercase flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#0055ea]" />
            <span>{lang === 'TR' ? 'EKOLOJİK DENGE PARAMETRELERİ' : 'ECO-BALANCE SENSORS'}</span>
          </h3>
          <div className="space-y-3 text-xs font-bold text-slate-700">
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#388e3c]" />
                {lang === 'TR' ? 'Karbon Yakalama Hızı' : 'Carbon Capture Rate'}
              </span>
              <span className="font-mono text-[#2e7d32] font-black">+94.2 Tons/Day</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span>{lang === 'TR' ? 'Yağmur Suyu Tutma' : 'Rainwater Retention'}</span>
              <span className="font-mono text-[#0055ea] font-black">1,480 kL</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-slate-200">
              <span>{lang === 'TR' ? 'Rüzgar Türbini Hızı' : 'Wind Turbine RPM'}</span>
              <span className="font-mono text-slate-900 font-black">42.8 RPM</span>
            </div>
            <div className="flex justify-between">
              <span>{lang === 'TR' ? 'Okyanus Tuzluluk Endeksi' : 'Ocean Salinity Index'}</span>
              <span className="font-mono text-[#0288d1] font-black">35 PSU (Nominal)</span>
            </div>
          </div>
        </div>

        {/* Cloud Subsystem Status */}
        <div className="rounded-2xl p-6 bg-white/75 backdrop-blur-xl border-2 border-white shadow-[0_10px_28px_rgba(0,85,234,0.1)] space-y-4">
          <h3 className="font-black text-slate-900 text-sm uppercase flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#388e3c]" />
            <span>{lang === 'TR' ? 'CANLI ALTYAPI DURUMU' : 'CLOUD SUBSYSTEM STATUS'}</span>
          </h3>
          <div className="space-y-2.5">
            {[
              { name: lang === 'TR' ? 'Atmosfer Filtre Kümesi' : 'Atmospheric Filter Cluster', rate: '100% ONLINE' },
              { name: lang === 'TR' ? 'Aqua-Loop Türbin Dizisi' : 'Aqua-Loop Turbine Array', rate: '100% OPTIMAL' },
              { name: lang === 'TR' ? 'Termal Tampon Izgarası' : 'Thermal Buffer Grid', rate: '100% STABLE' },
            ].map((sys, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-gradient-to-r from-sky-50/90 to-emerald-50/90 border border-sky-200/60 flex items-center justify-between text-xs shadow-sm"
              >
                <span className="font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0055ea]" />
                  {sys.name}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#1b5e20] bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {sys.rate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
