import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Scale, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';
import { brutalistAudio } from '../utils/audio';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language].footer;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        brutalistAudio.playMechanicalClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={() => {
        brutalistAudio.playMechanicalClick();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] bg-zinc-950 border border-zinc-700 text-zinc-300 font-mono text-xs shadow-[8px_8px_0_#000] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 text-white">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-emerald-400"></span>
            <h2 id="legal-modal-title" className="font-bold tracking-wider text-xs uppercase">
              {t.legalTitle}
            </h2>
          </div>
          <button
            onClick={() => {
              brutalistAudio.playMechanicalClick();
              onClose();
            }}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-zinc-400 leading-relaxed text-[11px] sm:text-xs">
          {/* 01. Privacy */}
          <section className="border-l-2 border-emerald-500/80 pl-4 py-1 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.legalPrivacyHeader}</span>
            </div>
            <p className="text-zinc-400">{t.legalPrivacyBody}</p>
          </section>

          {/* 02. Terms */}
          <section className="border-l-2 border-amber-500/80 pl-4 py-1 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold tracking-wide">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.legalTermsHeader}</span>
            </div>
            <p className="text-zinc-400">{t.legalTermsBody}</p>
          </section>

          {/* 03. IP */}
          <section className="border-l-2 border-cyan-500/80 pl-4 py-1 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold tracking-wide">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.legalIpHeader}</span>
            </div>
            <p className="text-zinc-400">{t.legalIpBody}</p>
          </section>

          {/* 04. Data removal */}
          <section className="border-l-2 border-purple-500/80 pl-4 py-1 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold tracking-wide">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.legalContactHeader}</span>
            </div>
            <p className="text-zinc-400">{t.legalContactBody}</p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-800 bg-zinc-900/60 text-[10px] text-zinc-500">
          <span>{t.legalDisclaimer}</span>
          <button
            onClick={() => {
              brutalistAudio.playMechanicalClick();
              onClose();
            }}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-white text-zinc-300 hover:text-black font-bold uppercase transition-colors cursor-pointer border border-zinc-700"
          >
            {t.legalClose}
          </button>
        </div>
      </div>
    </div>
  );
};
