import { useEffect } from 'react';
import { X, ExternalLink, Layers, Activity, Code2 } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { brutalistAudio } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        brutalistAudio.playHydraulicHiss();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const projT = t.projects[project.id];
  const title = projT?.title || project.title;
  const fullDesc = projT?.fullDesc || project.fullDesc;
  const structuralSpecs = projT?.structuralSpecs || project.structuralSpecs;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col md:flex-row justify-between">
      {/* Click outside backdrop / 3D viewport area to close inspection */}
      <div
        onClick={onClose}
        className="flex-grow pointer-events-auto cursor-pointer relative"
        title="Click anywhere to leave poster"
      >
        {/* Subtle brutalist hint badge pinned top-left */}
        <div className="absolute top-6 left-6 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white font-mono text-[11px] font-bold tracking-widest uppercase backdrop-blur-md transition-colors select-none shadow-[2px_2px_0_#000]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>[ CLICK CANVAS TO LEAVE ]</span>
        </div>
      </div>

      {/* Heavy Concrete Inspection Dossier Panel (Docked on Right) */}
      <div className="pointer-events-auto relative w-full md:w-[480px] lg:w-[540px] h-full max-h-screen overflow-y-auto bg-[#121215]/95 border-l border-zinc-700 shadow-[-16px_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md p-6 sm:p-8 text-zinc-200 animate-in slide-in-from-right duration-300">
        {/* Top Header Strip */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-700">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-white text-black font-bold px-2 py-0.5 uppercase">
              {project.sector}
            </span>
            <span className="bg-zinc-900 text-zinc-300 px-2 py-0.5 border border-zinc-700">
              {project.code}
            </span>
            <span className="text-zinc-500">{t.works.year}: {project.year}</span>
          </div>

          <button
            onClick={() => {
              brutalistAudio.playHydraulicHiss();
              onClose();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-zinc-700 hover:border-white transition-colors cursor-pointer text-[11px] font-mono font-bold uppercase"
            title={t.works.close}
          >
            <span className="hidden sm:inline">LEAVE</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Title & Elevation */}
        <div className="mb-6">
          <div className="text-xs font-mono text-zinc-500 mb-1">
            {project.elevation} // {project.renderMetric}
          </div>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            {title}
          </h3>
        </div>

        {/* Blueprint Schematic Box */}
        <div className="bg-zinc-950 p-6 border border-zinc-800 mb-8 relative">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-2 border-b border-zinc-800">
            <span className="flex items-center gap-1.5 text-zinc-200 font-bold">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              CASE STUDY SCHEMATIC // {t.works.typology}: {project.schematicType}
            </span>
            <span className="text-emerald-400 font-bold">{t.works.status}: {project.status}</span>
          </div>

          <div className="h-32 sm:h-36 w-full flex items-center justify-center border border-dashed border-zinc-800 bg-[#0e0e11] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center font-mono text-center">
              <div className="text-2xl sm:text-3xl font-black text-zinc-500 select-none mb-1 font-display tracking-widest uppercase">
                [{project.schematicType}]
              </div>
              <div className="text-xs text-zinc-500">
                {t.works.framework} // {project.renderMetric}
              </div>
            </div>
          </div>
        </div>

        {/* Design Specifications Matrix */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-zinc-400" />
            {t.works.specifications}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            {structuralSpecs.map((spec, idx) => (
              <div key={idx} className="bg-zinc-900/90 p-3 border border-zinc-800">
                <div className="text-[10px] text-zinc-500 uppercase">{spec.label}</div>
                <div className="text-white font-bold text-xs sm:text-sm mt-1">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Abstract */}
        <div className="mb-8 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-5 border-l-2 border-zinc-500">
          {fullDesc}
        </div>

        {/* Technology Stack Tags */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
            DESIGN TOKENS & STACK:
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-bold bg-zinc-900 text-zinc-300 px-2.5 py-1 border border-zinc-700 shadow-[2px_2px_0_#000]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => brutalistAudio.playMechanicalClick()}
                className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs sm:text-sm px-5 py-2.5 border border-white uppercase transition-all shadow-[2px_2px_0_#000] cursor-pointer"
              >
                <span>{t.works.liveUrl}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => brutalistAudio.playMechanicalClick()}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono font-bold text-xs px-4 py-2.5 border border-zinc-700 hover:border-zinc-500 uppercase transition-all shadow-[2px_2px_0_#000] cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{t.works.repoUrl}</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              brutalistAudio.playHydraulicHiss();
              onClose();
            }}
            className="font-mono text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-wider underline cursor-pointer"
          >
            [{t.works.close}]
          </button>
        </div>
      </div>
    </div>
  );
};
