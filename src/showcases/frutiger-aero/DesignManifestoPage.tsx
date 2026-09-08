import React from 'react';
import { Sparkles } from 'lucide-react';

export interface DesignManifestoPageProps {
  lang: 'EN' | 'TR';
}

export const DesignManifestoPage: React.FC<DesignManifestoPageProps> = ({ lang }) => {
  return (
    <div className="max-w-3xl mx-auto rounded-2xl p-6 sm:p-8 bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-5 text-slate-800 animate-fade-in">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h3 className="font-black text-base text-slate-900 uppercase">
          {lang === 'TR' ? 'Frutiger Aero: Yaratıcı Tasarım Yetkinliği' : 'Frutiger Aero: Creative Design Craft'}
        </h3>
      </div>
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
        <p>
          {lang === 'TR'
            ? 'Bu prototip, ana portfolyomdaki brutalist monolitik beton estetiğine taban tabana zıt bir görsel dili kusursuz uygulayabilme becerimi sergilemek için tasarlandı. Frutiger Aero; 2004–2013 yılları arasında Windows Vista, 7 ve erken iOS dönemini tanımlayan cam dokuları, parlak skeuomorfizm, su damlaları ve doğa-teknoloji harmonisini temsil eder.'
            : 'This interactive prototype showcases dynamic range: contrasting the heavy concrete brutalism of my main portfolio with the luminous, optimistic aesthetic of Frutiger Aero (2004–2013). Defined by glassy skeuomorphism, dynamic water glints, and nature-tech harmony, it was rebuilt with modern high-performance React 19 and Web Audio.'}
        </p>
        <p>
          {lang === 'TR'
            ? 'Tüm cam parlaklıkları, ses sentezleyicileri, SVG göstergeleri ve baloncuk fiziği bağımsız bir alan adı gerektirmeksizin doğrudan bu portfolyo altyapısında çalışmaktadır.'
            : 'All glossy reflections, audio synthesis, SVG gauge telemetry, and bubble physics run natively inside this portfolio without external dependencies.'}
        </p>
      </div>
      <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 text-xs font-mono font-bold">
        <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-800">SKEUOMORPHISM</span>
        <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">AERO GLASS</span>
        <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800">WEB AUDIO SYNTH</span>
        <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800">BUBBLE PHYSICS</span>
      </div>
    </div>
  );
};
