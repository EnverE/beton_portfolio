import React from 'react';
import { Sunset, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ProcessSectionProps {
  isDayMode?: boolean;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ isDayMode = true }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section id="process" className="relative min-h-[92vh] flex flex-col justify-center py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Golden Hour Elevation Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-xs font-mono mb-16 pb-2 border-b transition-colors duration-500 ${
        isDayMode
          ? 'border-zinc-400/60 text-zinc-800'
          : 'border-amber-500/30 text-amber-300/90'
      }`}>
        <span className={`font-black flex items-center gap-1.5 px-2.5 py-1 border backdrop-blur-xs ${
          isDayMode ? 'text-zinc-950 bg-white/80 border-zinc-300' : 'text-amber-400 bg-black/60 border-amber-500/20'
        }`}>
          <Sunset className={`w-4 h-4 ${isDayMode ? 'text-amber-700' : 'text-amber-400'}`} />
          {t.process.level}
        </span>
        <span className={`font-bold px-2.5 py-1 border backdrop-blur-xs ${
          isDayMode ? 'text-zinc-800 bg-white/80 border-zinc-300' : 'text-amber-400/90 bg-black/60 border-amber-500/20'
        }`}>
          {t.process.phase}
        </span>
      </div>

      {/* Grid: Left Column has Content (5 cols), Right Column leaves open space for Round 3D Pillar (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="mb-2">
            {/* Eyebrow badge with strong contrast */}
            <span className={`font-mono font-black text-[10px] uppercase tracking-widest px-2.5 py-1 inline-block mb-3 border transition-colors ${
              isDayMode
                ? 'text-amber-950 bg-amber-200/90 border-amber-500/50 shadow-[2px_2px_0_rgba(0,0,0,0.06)]'
                : 'text-amber-400 bg-black/60 border-amber-500/40 shadow-[2px_2px_0_#000]'
            }`}>
              {t.process.eyebrow}
            </span>

            {/* Section Title */}
            <h2 className={`font-display font-black text-3xl sm:text-5xl tracking-tight uppercase mb-3 transition-colors ${
              isDayMode ? 'text-zinc-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-white drop-shadow-[0_2px_12px_rgba(245,158,11,0.15)]'
            }`}>
              {t.process.title}
            </h2>

            {/* Section description with backdrop plate for 100% legibility */}
            <p className={`font-sans font-bold text-xs sm:text-sm leading-relaxed p-4 border transition-colors ${
              isDayMode
                ? 'text-zinc-950 bg-white/80 border-zinc-300 shadow-[3px_3px_0_rgba(0,0,0,0.06)] backdrop-blur-xs'
                : 'text-zinc-200 bg-zinc-950/80 border-zinc-800 shadow-[3px_3px_0_#000] backdrop-blur-xs'
            }`}>
              {t.process.desc}
            </p>
          </div>

          {/* 4 Process Stages */}
          <div className="space-y-4">
            {t.processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-zinc-950/90 p-5 border border-zinc-800 hover:border-amber-400/80 transition-all group backdrop-blur-md shadow-[4px_4px_0_rgba(15,10,20,0.5)] hover:shadow-[6px_6px_0_rgba(245,158,11,0.2)]"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2 pb-1.5 border-b border-zinc-800/80">
                  <span className="font-display font-black text-sm text-amber-400 group-hover:text-amber-300 transition-colors">
                    {t.process.stage} {step.step}
                  </span>
                  <span className="text-zinc-400 text-[10px] font-bold uppercase">
                    {step.phase.split(' // ')[0]}
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm text-white uppercase mb-1.5">
                  {step.title}
                </h3>

                <p className="font-sans text-xs text-zinc-300 leading-relaxed mb-3">
                  {step.description}
                </p>

                {/* Deliverables tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                  {step.deliverables.map((del) => (
                    <span
                      key={del}
                      className="font-mono text-[9px] bg-zinc-900 text-zinc-200 px-2 py-0.5 border border-zinc-700/80 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-amber-400" />
                      <span>{del}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side spacer for Round Pillar (7 cols) */}
        <div className="hidden lg:block lg:col-span-7" />
      </div>
    </section>
  );
};
