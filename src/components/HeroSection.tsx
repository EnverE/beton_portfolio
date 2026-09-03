import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { brutalistAudio } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface HeroSectionProps {
  isDayMode?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isDayMode = true }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  return (
    <section id="monolith" className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Subtle Top Metadata */}
      <div className={`flex items-center justify-between text-xs font-mono tracking-wider transition-colors duration-500 ${
        isDayMode ? 'text-zinc-600' : 'text-zinc-500'
      }`}>
        <div className="flex items-center gap-2 font-bold">
          <span className={`w-2 h-2 rounded-full ${isDayMode ? 'bg-black' : 'bg-white'}`}></span>
          <span>{t.hero.subTag}</span>
        </div>
        <div>
          <span>{t.hero.elevation}</span>
        </div>
      </div>

      {/* Main Centered Minimal Typography Framing the Round 3D Pillar */}
      <div className="flex flex-col items-center text-center my-auto py-8 sm:py-12 relative z-10">
        <h1 className={`font-display font-black text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[0.95] mb-4 sm:mb-6 uppercase max-w-4xl transition-colors duration-500 ${
          isDayMode ? 'text-zinc-950' : 'text-white'
        }`}>
          {PORTFOLIO_DATA.identity.name}
        </h1>

        {/* Highly Visible Subtitle */}
        <div className="mb-4 sm:mb-6">
          <span className={`font-mono font-black text-[11px] sm:text-sm md:text-base tracking-widest uppercase px-3.5 py-1.5 border transition-colors duration-500 inline-block ${
            isDayMode
              ? 'text-black bg-white/80 border-zinc-300 shadow-[2px_2px_0_rgba(0,0,0,0.08)] backdrop-blur-xs'
              : 'text-white bg-black/80 border-zinc-700 shadow-[2px_2px_0_#000] backdrop-blur-xs'
          }`}>
            {t.hero.title}
          </span>
        </div>

        {/* Highly Visible Bio Statement */}
        <p className={`font-sans font-bold text-sm sm:text-lg md:text-2xl max-w-2xl leading-snug tracking-tight mb-8 sm:mb-10 transition-colors duration-500 px-4 py-3 sm:px-6 sm:py-4 border ${
          isDayMode
            ? 'text-zinc-950 bg-white/80 border-zinc-200 shadow-[4px_4px_0_rgba(0,0,0,0.06)] backdrop-blur-xs'
            : 'text-zinc-100 bg-zinc-950/80 border-zinc-800 shadow-[4px_4px_0_#000] backdrop-blur-xs'
        }`}>
          {t.hero.bio}
        </p>

        {/* Minimal Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#works"
            onClick={() => brutalistAudio.playConcreteThud()}
            className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white font-mono font-bold text-xs px-6 py-3 border border-black uppercase tracking-wider transition-all shadow-[3px_3px_0_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <span>{t.hero.btnWorks}</span>
            <ArrowDownRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#dispatch"
            onClick={() => brutalistAudio.playHydraulicHiss()}
            className={`flex items-center gap-2 font-mono font-bold text-xs px-6 py-3 border uppercase tracking-wider transition-all shadow-[3px_3px_0_rgba(0,0,0,0.06)] cursor-pointer backdrop-blur-xs ${
              isDayMode
                ? 'bg-white/80 text-black border-zinc-300 hover:border-black'
                : 'bg-zinc-900/80 text-white border-zinc-700 hover:border-white'
            }`}
          >
            <span>{t.hero.btnContact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className={`flex items-center justify-between text-[11px] font-mono transition-colors duration-500 ${
        isDayMode ? 'text-zinc-500' : 'text-zinc-500'
      }`}>
        <span className="animate-pulse">{t.hero.scrollHint}</span>
        <span className="hidden sm:inline">{t.hero.monolithTag}</span>
      </div>
    </section>
  );
};
