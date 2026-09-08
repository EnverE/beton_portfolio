import React from 'react';
import { Sparkles, Fish, Droplets, Compass } from 'lucide-react';

export interface DesignManifestoPageProps {
  lang: 'EN' | 'TR';
}

export const DesignManifestoPage: React.FC<DesignManifestoPageProps> = ({ lang }) => {
  return (
    <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-8 bg-white/85 backdrop-blur-xl border-2 border-white shadow-[0_16px_40px_rgba(0,85,234,0.15)] space-y-5 text-slate-800 animate-fade-in select-none">
      <div className="flex items-center gap-2.5 pb-3 border-b border-sky-100">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h3 className="font-black text-base text-slate-900 uppercase tracking-wide">
          {lang === 'TR'
            ? 'Windows XP Bliss, Fanus & Frutiger Aero Sanatı'
            : 'Windows XP Bliss, Fishbowl Optics & Frutiger Aero Craft'}
        </h3>
      </div>
      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
        <p>
          {lang === 'TR'
            ? 'Bu etkileşimli deneyim, ana portfolyodaki monolitik beton brutalizmine karşıt olarak 2000’lerin iyimser teknoloji vizyonunu canlandırır: Kristal su fanusunun içinden izlenen efsanevi Windows XP Bliss yeşil tepeleri, imlecinizin peşinden yüzen sevimli palyaço balığı ve dokunulduğunda ses efektleriyle patlayan su baloncukları.'
            : 'This interactive experience channels the euphoric techno-optimism of the 2000s: an inside-a-fishbowl vantage point gazing out at the legendary Windows XP Bliss rolling green hills, accompanied by a physics-driven clownfish that pursues your cursor, and tactile water bubbles that burst upon click.'}
        </p>
        <p>
          {lang === 'TR'
            ? 'Ayrı bir alan adına ihtiyaç duymadan, aynı alan adı altında SPA mimarisiyle çalışan bu vitrin; karmaşık SVG animasyonları, dinamik imleç fiziği ve Web Audio sentezleyicisini hafif ve performanslı şekilde bir araya getirir.'
            : 'Living natively on the same domain without external redirects, this showcase demonstrates cutting-edge frontend capabilities: vector SVG aquatic anatomy, lerped pointer-following physics, procedural caustics, and zero-latency Web Audio.'}
        </p>
      </div>
      <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 text-xs font-mono font-bold">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0055ea]/10 text-[#0055ea] border border-[#0055ea]/30">
          <Compass className="w-3.5 h-3.5" />
          XP LUNA BLUE
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#388e3c]/10 text-[#2e7d32] border border-[#388e3c]/30">
          <Droplets className="w-3.5 h-3.5" />
          BLISS HILL GREEN
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-300">
          <Fish className="w-3.5 h-3.5" />
          CLOWNFISH COMPANION
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300">
          <Droplets className="w-3.5 h-3.5" />
          POPPING BUBBLES
        </span>
      </div>
    </div>
  );
};
