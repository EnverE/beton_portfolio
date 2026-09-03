import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  isDayMode?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ isDayMode = true }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav
      aria-label="Language selection"
      className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-1.5 p-1 border font-mono text-[11px] font-bold tracking-wider backdrop-blur-md transition-colors duration-500 shadow-[3px_3px_0_rgba(0,0,0,0.08)] ${
        isDayMode
          ? 'bg-white/85 border-zinc-300 text-zinc-700 shadow-[3px_3px_0_rgba(0,0,0,0.06)]'
          : 'bg-zinc-950/85 border-zinc-800 text-zinc-300 shadow-[3px_3px_0_#050507]'
      }`}
    >
      <div className="flex items-center gap-1 pl-1.5 pr-1 opacity-60">
        <Globe className="w-3 h-3" />
        <span className="text-[9px] hidden sm:inline">LANG:</span>
      </div>

      <button
        onClick={() => setLanguage('EN')}
        className={`px-2 py-1 transition-all cursor-pointer border ${
          language === 'EN'
            ? isDayMode
              ? 'bg-black text-white border-black shadow-[1px_1px_0_rgba(0,0,0,0.2)]'
              : 'bg-white text-black border-white shadow-[1px_1px_0_#fff]'
            : isDayMode
            ? 'bg-transparent text-zinc-500 border-transparent hover:text-black hover:border-zinc-300'
            : 'bg-transparent text-zinc-500 border-transparent hover:text-white hover:border-zinc-700'
        }`}
        title="Switch to English"
        aria-pressed={language === 'EN'}
      >
        EN
      </button>

      <span className="opacity-30">/</span>

      <button
        onClick={() => setLanguage('TR')}
        className={`px-2 py-1 transition-all cursor-pointer border ${
          language === 'TR'
            ? isDayMode
              ? 'bg-black text-white border-black shadow-[1px_1px_0_rgba(0,0,0,0.2)]'
              : 'bg-white text-black border-white shadow-[1px_1px_0_#fff]'
            : isDayMode
            ? 'bg-transparent text-zinc-500 border-transparent hover:text-black hover:border-zinc-300'
            : 'bg-transparent text-zinc-500 border-transparent hover:text-white hover:border-zinc-700'
        }`}
        title="Türkçe diline geç"
        aria-pressed={language === 'TR'}
      >
        TR
      </button>
    </nav>
  );
};
