import { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { brutalistAudio } from '../utils/audio';
import { Gauge } from 'lucide-react';

export const ArsenalSection: React.FC = () => {
  const [motionRate, setMotionRate] = useState<number>(120);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMotionRate(val);
    if (val % 10 === 0) {
      if (val >= 140) {
        brutalistAudio.playHydraulicHiss();
      } else {
        brutalistAudio.playMechanicalClick();
      }
    }
  };

  const getMotionStatus = () => {
    if (motionRate >= 135) {
      return { label: 'ULTRA-HIGH REFRESH (144HZ PRO)', color: 'text-white bg-zinc-900 border-white', isPeak: true };
    }
    if (motionRate >= 100) {
      return { label: 'OPTIMAL LIQUID MOTION (120HZ)', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500', isPeak: false };
    }
    return { label: 'STANDARD 60FPS FRAME RATE', color: 'text-zinc-300 bg-zinc-900 border-zinc-700', isPeak: false };
  };

  const status = getMotionStatus();

  return (
    <section id="arsenal" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-800">
      {/* Elevation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-8 pb-2 border-b border-zinc-800 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="bg-zinc-900 text-white font-bold px-2 py-0.5 border border-zinc-700">
            LEVEL 03
          </span>
          <span className="text-zinc-300 font-bold tracking-wider uppercase">
            TECHNICAL ARSENAL & MOTION LAB
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>FRAME RENDERING: HARDWARE-ACCELERATED GLSL</span>
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-10">
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tighter uppercase mb-3">
          SKILLS & CAPABILITIES
        </h2>
        <p className="font-sans text-sm text-zinc-400 max-w-3xl">
          Core proficiencies spanning visual direction, interaction systems, and high-performance frontend engineering.
        </p>
      </div>

      {/* Interactive Motion & Viewport Stress Console */}
      <div className="concrete-slab-dark p-6 sm:p-8 border border-zinc-700/80 mb-14 shadow-[4px_4px_0_#070709]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-zinc-300" />
            <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase">
              INTERACTION FLUIDITY & REFRESH PACING SIMULATOR
            </h3>
          </div>
          <div className={`font-mono text-xs font-bold px-3 py-1 border ${status.color}`}>
            {status.label}
          </div>
        </div>

        {/* Refresh Rate Slider Control */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-zinc-400">TARGET RENDER FREQUENCY:</span>
            <span className="font-display font-black text-2xl text-white">
              {motionRate} FPS
            </span>
          </div>

          <input
            type="range"
            min="60"
            max="144"
            value={motionRate}
            onChange={handleSliderChange}
            className="w-full h-3 bg-zinc-900 appearance-none border border-zinc-700 cursor-ew-resize accent-white"
          />

          <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
            <span>60 FPS (STANDARD)</span>
            <span>120 FPS (PROMOTION / LIQUID)</span>
            <span className="text-white font-bold">144 FPS (EXTREME FLUIDITY)</span>
          </div>
        </div>

        {/* Dynamic Telemetry Gauge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-zinc-950 p-3 border border-zinc-800">
            <div className="text-zinc-500 text-[10px]">FRAME TIME BUDGET</div>
            <div className="text-white font-bold text-sm mt-0.5">
              {(1000 / motionRate).toFixed(2)} MS
            </div>
          </div>
          <div className="bg-zinc-950 p-3 border border-zinc-800">
            <div className="text-zinc-500 text-[10px]">LAYOUT SHIFT</div>
            <div className="text-zinc-300 font-bold text-sm mt-0.5">
              NOT MEASURED YET
            </div>
          </div>
          <div className="bg-zinc-950 p-3 border border-zinc-800">
            <div className="text-zinc-500 text-[10px]">MOTION DAMPENING</div>
            <div className="text-zinc-300 font-bold text-sm mt-0.5">
              CRITICAL DAMPED SPRING
            </div>
          </div>
          <div className="bg-zinc-950 p-3 border border-zinc-800">
            <div className="text-zinc-500 text-[10px]">CONTRAST</div>
            <div className="text-zinc-300 font-bold text-sm mt-0.5">
              NOT AUDITED YET
            </div>
          </div>
        </div>
      </div>

      {/* Skills Matrices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.skillsArsenal.map((category, idx) => (
          <div
            key={idx}
            className="concrete-slab-light p-6 border border-zinc-700/80 flex flex-col justify-between shadow-[4px_4px_0_#070709]"
          >
            <div>
              <div className="text-[10px] font-mono text-zinc-400 font-bold tracking-widest uppercase mb-1">
                {category.specs}
              </div>
              <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase mb-6 pb-2 border-b border-zinc-800">
                {category.category}
              </h4>

              {/* Individual Skill Gauges */}
              <div className="flex flex-col gap-4 mb-6">
                {category.skills.map((skill) => {
                  return (
                    <div key={skill.name} className="font-mono text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-zinc-200 font-medium">{skill.name}</span>
                        <span className="text-zinc-500 text-[10px] font-bold">{skill.grade}</span>
                      </div>
                      
                      {/* Clean Brutalist Meter Bar */}
                      <div className="h-2 w-full bg-zinc-950 border border-zinc-800 p-0.5">
                        <div
                          className="h-full bg-zinc-300 transition-all duration-300"
                          style={{ width: `${skill.loadCapacity}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[9px] text-zinc-500 mt-1">
                        <span>SELF-RATED: {skill.loadCapacity}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
              <span>NOTE</span>
              <span className="text-white font-bold">SELF-RATED, NOT AUDITED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
