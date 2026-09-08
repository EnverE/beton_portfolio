import React from 'react';
import { Sliders, RefreshCw } from 'lucide-react';

export interface BiosphereTelemetryPageProps {
  lang: 'EN' | 'TR';
}

export const BiosphereTelemetryPage: React.FC<BiosphereTelemetryPageProps> = ({ lang }) => {
  return (
    <div className="space-y-6 animate-fade-in">
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
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between text-xs"
              >
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
  );
};
