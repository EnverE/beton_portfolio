import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Project } from '../data/portfolio';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../data/translations';

interface WorksVaultProps {
  isDayMode?: boolean;
  onSelectProject?: (projectId: string) => void;
}

export const WorksVault: React.FC<WorksVaultProps> = ({
  isDayMode = true,
  onSelectProject,
}) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [internalSelectedProject, setInternalSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project.id);
    } else {
      setInternalSelectedProject(project);
    }
  };

  return (
    <section id="works" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Subtle Elevation Header */}
      <div className={`flex items-center justify-between text-xs font-mono mb-16 pb-2 border-b transition-colors duration-500 ${
        isDayMode ? 'border-zinc-300/60 text-zinc-500' : 'border-zinc-800 text-zinc-500'
      }`}>
        <span className="font-bold">{t.works.level}</span>
        <span>{t.works.phase}</span>
      </div>

      {/* Alternating Project Stages Pushed to the Sides */}
      {/* Alternating Project Stages with Dedicated Vertical Runway */}
      <div className="space-y-48 mb-24">
        {PORTFOLIO_DATA.projects.map((project, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={project.id}
              id={`project-stage-${idx}`}
              className="min-h-[85vh] flex items-center grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {isLeft ? (
                <>
                  {/* Left Side Card (5 cols) */}
                  <div className="lg:col-span-5 my-auto">
                    <ProjectCard
                      project={project}
                      idx={idx + 1}
                      isDayMode={isDayMode}
                      onOpen={() => handleProjectClick(project)}
                    />
                  </div>
                  {/* Right Side Spacer for Round Pillar (7 cols) */}
                  <div className="hidden lg:block lg:col-span-7" />
                </>
              ) : (
                <>
                  {/* Left Side Spacer for Round Pillar (7 cols) */}
                  <div className="hidden lg:block lg:col-span-7" />
                  {/* Right Side Card (5 cols) */}
                  <div className="lg:col-span-5 my-auto">
                    <ProjectCard
                      project={project}
                      idx={idx + 1}
                      isDayMode={isDayMode}
                      onOpen={() => handleProjectClick(project)}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {!onSelectProject && (
        <ProjectModal
          project={internalSelectedProject}
          onClose={() => setInternalSelectedProject(null)}
        />
      )}
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  idx: number;
  isDayMode: boolean;
  onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, isDayMode, onOpen }) => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const projT = t.projects[project.id];
  const title = projT?.title || project.title;
  const shortDesc = projT?.shortDesc || project.shortDesc;

  return (
    <div
      onClick={onOpen}
      className={`p-6 sm:p-7 border relative group cursor-pointer transition-all backdrop-blur-md ${
        isDayMode
          ? 'bg-white/85 text-zinc-900 border-zinc-200 shadow-[4px_4px_0_rgba(0,0,0,0.06)] hover:border-black hover:shadow-[8px_8px_0_rgba(0,0,0,0.12)]'
          : 'bg-zinc-950/85 text-zinc-200 border-zinc-800 shadow-[4px_4px_0_#070709] hover:border-zinc-500 hover:shadow-[8px_8px_0_#000]'
      } hover:translate-x-[-1px] hover:translate-y-[-1px]`}
    >
      {/* Top Index & Sector */}
      <div className={`flex items-center justify-between text-xs font-mono mb-4 pb-2 border-b ${
        isDayMode ? 'border-zinc-200 text-zinc-500' : 'border-zinc-800 text-zinc-500'
      }`}>
        <span className="font-bold">0{idx} // {project.code}</span>
        <span className="text-[11px] font-bold">{project.sector}</span>
      </div>

      {/* Project Title */}
      <h3 className={`font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-3 transition-colors ${
        isDayMode ? 'text-zinc-950 group-hover:text-black' : 'text-white group-hover:text-zinc-200'
      }`}>
        {title}
      </h3>

      {/* Concise Summary */}
      <p className={`font-sans text-xs sm:text-sm leading-relaxed mb-5 ${
        isDayMode ? 'text-zinc-600' : 'text-zinc-400'
      }`}>
        {shortDesc}
      </p>

      {/* Clean Tech Pills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className={`font-mono text-[10px] px-2 py-0.5 border ${
              isDayMode ? 'bg-zinc-100 text-zinc-700 border-zinc-200' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Minimal Action Link */}
      <div className={`pt-3 border-t flex items-center justify-between text-xs font-mono font-bold ${
        isDayMode ? 'border-zinc-200 text-zinc-800' : 'border-zinc-800 text-zinc-300'
      }`}>
        <span className="group-hover:underline flex items-center gap-1">
          <span>{t.works.viewCase}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
        <span className="text-[10px] text-emerald-500 font-mono">
          {project.renderMetric}
        </span>
      </div>
    </div>
  );
};
