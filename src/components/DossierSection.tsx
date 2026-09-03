import { PORTFOLIO_DATA } from '../data/portfolio';
import { brutalistAudio } from '../utils/audio';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const DossierSection: React.FC = () => {
  return (
    <section id="dossier" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800">
      {/* Elevation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-8 pb-2 border-b border-zinc-800 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="bg-zinc-900 text-white font-bold px-2 py-0.5 border border-zinc-700">
            LEVEL 04
          </span>
          <span className="text-zinc-300 font-bold tracking-wider uppercase">
            CAREER TRAJECTORY & EXPERIENCE LOG
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>EXPERIENCE CHRONOLOGY // 2020 — PRESENT</span>
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-12">
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tighter uppercase mb-3">
          EXPERIENCE DOSSIER
        </h2>
        <p className="font-sans text-sm text-zinc-400 max-w-3xl">
          Tracing creative progression from early frontend prototypes to lead visual direction and high-scale design systems.
        </p>
      </div>

      {/* Vertical Stratigraphic Timeline */}
      <div className="relative border-l-2 border-zinc-700/80 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {PORTFOLIO_DATA.constructionTimeline.map((item, idx) => (
          <div
            key={idx}
            className="relative concrete-slab-dark p-6 sm:p-8 border border-zinc-700/80 hover:border-zinc-400 transition-colors group shadow-[4px_4px_0_#070709]"
            onMouseEnter={() => brutalistAudio.playMechanicalClick()}
          >
            {/* Anchor Point on the vertical line */}
            <div className="absolute -left-[33px] sm:-left-[49px] top-6 w-4 h-4 bg-zinc-950 border-2 border-zinc-500 group-hover:border-white group-hover:bg-white transition-colors flex items-center justify-center">
              <div className="w-1 h-1 bg-zinc-900 group-hover:bg-black"></div>
            </div>

            {/* Top Elevation & Era Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="bg-zinc-950 text-white font-bold px-2 py-0.5 border border-zinc-800">
                  {item.elevation}
                </span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {item.era}
                </span>
              </div>
              <div className="flex items-center gap-1 text-zinc-500">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </div>
            </div>

            {/* Role & Organization */}
            <div className="mb-4">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase group-hover:text-zinc-200 transition-colors">
                {item.role}
              </h3>
              <div className="font-mono text-xs text-zinc-400 font-bold tracking-wider mt-0.5">
                {item.organization}
              </div>
            </div>

            {/* Summary */}
            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              {item.summary}
            </p>

            {/* Key Deliverables / Structural Outputs */}
            <div className="bg-zinc-950/80 p-4 border border-zinc-800/80 font-mono text-xs">
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                DELIVERABLES & ACHIEVEMENTS:
              </div>
              <ul className="space-y-1.5">
                {item.structuralOutput.map((output, oIdx) => (
                  <li key={oIdx} className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{output}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
