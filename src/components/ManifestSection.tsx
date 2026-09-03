import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { brutalistAudio } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const ManifestSection: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>('honed-slate');

  const handleSelectSpecimen = (id: string) => {
    brutalistAudio.playConcreteThud();
    setSelectedSpecimenId(id);
  };

  const currentSpecimen = t.materialSpecimens.find((s) => s.id === selectedSpecimenId) || t.materialSpecimens[0];

  const bioStatement = t.about.bioStatement || PORTFOLIO_DATA.identity.bioStatement;

  return (
    <section id="about" className="relative min-h-[92vh] flex flex-col justify-center py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Subtle Elevation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 text-xs font-mono mb-16 pb-2 border-b border-purple-500/20 text-zinc-400">
        <span className="font-bold text-zinc-200 bg-black/60 backdrop-blur-xs px-2.5 py-1 border border-white/10">{t.about.level}</span>
        <span className="text-zinc-400 bg-black/60 backdrop-blur-xs px-2.5 py-1 border border-white/10">{t.about.phase}</span>
      </div>

      {/* Grid: Left Column Spacer for Round 3D Pillar (7 cols), Right Column Content (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side Spacer for Round Pillar (7 cols) */}
        <div className="hidden lg:block lg:col-span-7" />

        {/* Right Column: About Content (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase mb-3">
              {t.about.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {bioStatement}
            </p>
          </div>

          {/* Core Manifesto Principles */}
          <div className="space-y-3">
            {t.manifesto.map((item, idx) => (
              <div
                key={idx}
                className="bg-zinc-950/80 p-4 border border-zinc-800 hover:border-zinc-500 transition-colors backdrop-blur-md"
              >
                <div className="font-display font-bold text-xs text-white mb-1 uppercase tracking-wide">
                  {item.title}
                </div>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Minimal Surface Specimen Selector */}
          <div className="bg-zinc-950/80 p-5 border border-zinc-800 backdrop-blur-md">
            <div className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider mb-3">
              {t.about.specimensTitle}
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {t.materialSpecimens.map((specimen) => {
                const isSelected = selectedSpecimenId === specimen.id;
                return (
                  <button
                    key={specimen.id}
                    onClick={() => handleSelectSpecimen(specimen.id)}
                    className={`p-2 text-left border transition-all cursor-pointer font-mono text-xs ${
                      isSelected
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                    }`}
                  >
                    <div className="font-display font-bold text-[11px] uppercase truncate">
                      {specimen.name.split(' // ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="font-sans text-[11px] text-zinc-300 leading-relaxed">
              {currentSpecimen.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
