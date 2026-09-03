import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { brutalistAudio } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const FooterHUD: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const scrollToTop = () => {
    brutalistAudio.playConcreteThud();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0c0c0e] border-t border-zinc-800 pt-12 pb-16 px-4 sm:px-6 lg:px-8 font-mono text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800">
        {/* Left identity */}
        <div>
          <div className="font-display font-black text-base sm:text-lg text-white uppercase tracking-wider mb-1">
            {PORTFOLIO_DATA.identity.name} // {t.footer.portfolioTag}
          </div>
          <div className="text-zinc-400 text-xs">
            {t.footer.subline}
          </div>
        </div>

        {/* Center Live Telemetry */}
        <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2 border border-zinc-800 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-zinc-300">{t.footer.systemFps}</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">{t.footer.designQuality}</span>
        </div>

        {/* Back to top pneumatic button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black px-4 py-2 border border-zinc-700 hover:border-white font-bold uppercase transition-all shadow-[2px_2px_0_#000] cursor-pointer text-xs"
        >
          <span>{t.footer.returnTop}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-500">
        <div>
          {t.footer.copyright} {new Date().getFullYear()} {PORTFOLIO_DATA.identity.name}
        </div>
        <div className="text-zinc-500 flex items-center gap-2">
          <span>{t.footer.editHint}</span>
          <code className="bg-zinc-900 text-zinc-300 px-1.5 py-0.5 border border-zinc-800">
            src/data/portfolio.ts
          </code>
        </div>
      </div>
    </footer>
  );
};
