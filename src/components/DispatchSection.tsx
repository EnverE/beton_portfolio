import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { brutalistAudio } from '../utils/audio';
import { Send, Copy, Check, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

export const DispatchSection: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [formData, setFormData] = useState({ name: '', channel: '', payload: '' });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    brutalistAudio.playMechanicalClick();
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`[Commission] Project Inquiry from ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.channel}\n\nProject Scope:\n${formData.payload}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.contactTelemetry.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.payload) return;

    setError(null);
    brutalistAudio.playHydraulicHiss();
    setIsTransmitting(true);

    try {
      const res = await fetch('/api/dispatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.channel,
          message: formData.payload,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        brutalistAudio.playConcreteThud();
        setTransmitted(true);
        setFormData({ name: '', channel: '', payload: '' });
      } else {
        setError(data.error || data.message || t.dispatch.errorGeneric);
      }
    } catch {
      setError(t.dispatch.errorGeneric);
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <section id="dispatch" className="relative min-h-[92vh] flex flex-col justify-center py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Subtle Elevation Header */}
      <div className="flex items-center justify-between text-xs font-mono mb-16 pb-2 border-b border-zinc-800 text-zinc-500">
        <span className="font-bold text-zinc-200">{t.dispatch.level}</span>
        <span className="text-zinc-400">{t.dispatch.phase}</span>
      </div>

      {/* Centered Heading */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight uppercase mb-3">
          {t.dispatch.title}
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {t.dispatch.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl mx-auto">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950/80 p-6 sm:p-8 border border-zinc-800 shadow-[4px_4px_0_#050507] backdrop-blur-md">
          {transmitted ? (
            <div className="text-center py-8 font-mono text-xs">
              <div className="text-emerald-400 font-bold mb-2">{t.dispatch.successTitle}</div>
              <p className="text-zinc-400 mb-4">{t.dispatch.successDesc}</p>
              <button
                onClick={() => setTransmitted(false)}
                className="text-white underline cursor-pointer"
              >
                {t.dispatch.btnSendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">{t.dispatch.formName}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.dispatch.formNamePlaceholder}
                  className="w-full bg-zinc-900 text-white p-2.5 border border-zinc-800 focus:border-zinc-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">{t.dispatch.formEmail}</label>
                <input
                  type="email"
                  required
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  placeholder={t.dispatch.formEmailPlaceholder}
                  className="w-full bg-zinc-900 text-white p-2.5 border border-zinc-800 focus:border-zinc-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">{t.dispatch.formScope}</label>
                <textarea
                  required
                  rows={3}
                  value={formData.payload}
                  onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                  placeholder={t.dispatch.formScopePlaceholder}
                  className="w-full bg-zinc-900 text-white p-2.5 border border-zinc-800 focus:border-zinc-500 outline-none resize-none"
                />
              </div>

              {/* Botcheck Honeypot for Web3Forms spam prevention */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <button
                type="submit"
                disabled={isTransmitting}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs py-3 border border-white uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isTransmitting ? t.dispatch.btnTransmitting : t.dispatch.btnTransmit}</span>
              </button>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-800/80 text-red-300 text-[11px] space-y-2">
                  <p className="text-center">{error}</p>
                  <button
                    type="button"
                    onClick={handleMailtoFallback}
                    className="w-full flex items-center justify-center gap-2 p-2 bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black font-bold uppercase transition-colors border border-zinc-700 hover:border-white cursor-pointer text-[10px]"
                  >
                    <Mail className="w-3 h-3" />
                    <span>{t.dispatch.btnOpenMailClient}</span>
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Direct Channels (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 font-mono text-xs">
          <div className="bg-zinc-950/80 p-5 border border-zinc-800 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between p-2.5 bg-zinc-900 border border-zinc-800">
              <div>
                <div className="text-[10px] text-zinc-500">{t.dispatch.directDispatch}</div>
                <div className="text-white font-bold">{PORTFOLIO_DATA.contactTelemetry.email}</div>
              </div>
              <button
                onClick={() => handleCopy(PORTFOLIO_DATA.contactTelemetry.email, 'email')}
                className="p-1.5 bg-zinc-800 hover:bg-white text-zinc-300 hover:text-black border border-zinc-700 transition-colors cursor-pointer"
                title={t.dispatch.btnCopy}
              >
                {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={PORTFOLIO_DATA.contactTelemetry.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-white text-center border border-zinc-800 text-zinc-300 hover:text-black font-bold text-[11px] transition-colors"
              >
                GITHUB
              </a>
              <a
                href={PORTFOLIO_DATA.contactTelemetry.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-white text-center border border-zinc-800 text-zinc-300 hover:text-black font-bold text-[11px] transition-colors"
              >
                LINKEDIN
              </a>
            </div>
          </div>

          <div className="bg-zinc-950/80 p-4 border border-zinc-800 text-zinc-500 text-[11px] leading-relaxed">
            <div className="font-bold text-zinc-300 mb-1">{t.dispatch.coordinates}</div>
            <div>{t.dispatch.locationVal}</div>
            <div className="mt-2 text-zinc-400">{t.dispatch.statusVal}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
