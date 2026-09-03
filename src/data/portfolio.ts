export interface Project {
  id: string;
  code: string;
  title: string;
  sector: 'WEB DESIGN' | 'DESIGN SYSTEMS' | 'INTERACTIVE 3D' | 'PRODUCT UI/UX';
  year: string;
  elevation: string;
  renderMetric: string;
  status: 'LIVE' | 'PROTOTYPE' | 'COMMISSIONED';
  shortDesc: string;
  fullDesc: string;
  structuralSpecs: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  schematicType: 'MONOLITH GRID' | 'SPATIAL 3D' | 'EDITORIAL' | 'TOKEN MATRIX';
}

export interface MaterialSpecimen {
  id: string;
  name: string;
  code: string;
  compressiveStrength: string;
  aggregate: string;
  reinforcement: string;
  curingPeriod: string;
  description: string;
  surfaceTexture: string;
}

export interface CareerMilestone {
  era: string;
  elevation: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  structuralOutput: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
}

export const PORTFOLIO_DATA = {
  identity: {
    name: "ENVER EREN TATLIDIL",
    title: "CREATIVE WEB DESIGNER & INTERACTION ENGINEER",
    monolithicTitle: "REFINED DIGITAL ARCHITECTURE",
    callsign: "EET // WEB.SPEC.01",
    location: "ISTANBUL // GLOBAL COLLABORATIONS",
    elevation: "LEVEL 00 // DIGITAL CANVAS",
    structuralIntegrity: "100% DESIGN REFINEMENT",
    seismicRating: "60-120 FPS FLUID MOTION",
    status: "OPEN TO NEW PROJECTS, LIMITED HOURS AROUND SCHOOL",
    bioStatement: "I'm Eren, a senior Software Engineering student at METU, based in Istanbul. On paper that's my field, but in practice I've got a hand in a bit of everything. Web is where most of my work ends up, React, Three.js, GSAP, that kind of stack, but I don't stay in one lane. I've built PCBs, messed around in Fusion 360, put together a game or two, and spent a fair amount of time in a DAW. Still studying, still freelancing on the side, still figuring out which of these I want to get serious about.",
    manifesto: [
      "01. HONESTY OF DIGITAL MEDIUM: The web is not paper or billboard. We embrace resolution independence, fluid aspect ratios, and raw code integrity.",
      "02. REFINED MINIMALISM: Stripping away decorative vanity to reveal structural typography, deliberate negative space, and disciplined layout grids.",
      "03. TACTILE MICRO-INTERACTIONS: Every hover, scroll displacement, and press must convey physical weight and visceral responsive feedback.",
      "04. PERFORMANCE AS LUXURY: True elegance is instantaneous response. 60-120 FPS frame pacing, zero layout shifts, and lightweight assets."
    ]
  },

  materialSpecimens: [
    {
      id: 'honed-slate',
      name: 'HONED BASALT & SLATE',
      code: 'SURFACE-01',
      compressiveStrength: '120 FPS FLUID',
      aggregate: 'Deep Charcoal (#121214) & Fine Quartz Grit',
      reinforcement: '1px Razor Chamfer (#27272a)',
      curingPeriod: 'Zero Runtime Latency',
      description: 'Cold, matte stone surface engineered for high-contrast digital galleries and luxury editorial presentation. Absorbs glare, elevating typography and spatial hierarchy.',
      surfaceTexture: 'Fine matte grain with razor-sharp 1px border delineation'
    },
    {
      id: 'bone-titanium',
      name: 'BONE WHITE & TITANIUM',
      code: 'SURFACE-02',
      compressiveStrength: 'AAA CONTRAST (14:1)',
      aggregate: 'Limestone Dust & Pure Platinum Accents',
      reinforcement: 'Subtle Inset Bevel (1px)',
      curingPeriod: 'Ultra-Lightweight CSS',
      description: 'High-luminance monochrome architectural surface. Creates gallery-grade negative space, placing all visual focus on pristine type and interactive media.',
      surfaceTexture: 'Silky smooth mineral finish with precise micro-shadows'
    },
    {
      id: 'obsidian-glass',
      name: 'FROSTED OBSIDIAN ACRYLIC',
      code: 'SURFACE-03',
      compressiveStrength: 'SUB-10MS BLUR RENDER',
      aggregate: 'Translucent Smoked Glass Matrix',
      reinforcement: 'Backdrop-Filter Blur (20px)',
      curingPeriod: 'Hardware-Accelerated Compositor',
      description: 'Layered semi-transparent monolithic panels creating atmospheric depth without compromising typographic legibility or frame pacing.',
      surfaceTexture: 'Subtle frosted sheen with high-frequency edge reflection'
    },
    {
      id: 'wireframe-grid',
      name: 'REBAR CAD BLUEPRINT',
      code: 'SURFACE-04',
      compressiveStrength: '0.5PX GRID TENSION',
      aggregate: 'Cyan Laser Vector Grid (#38bdf8)',
      reinforcement: 'Parametric Mathematical Layout',
      curingPeriod: 'Dynamic SVG & Canvas Engine',
      description: 'Technical wireframe blueprint surface exposing structural layout coordinates, layout baseline grids, and viewport boundary vectors.',
      surfaceTexture: 'Geometric orthogonal grid with glowing vector intersections'
    }
  ] as MaterialSpecimen[],

  pillars: [
    {
      code: 'PIL-01',
      title: 'CREATIVE DIRECTION & ART DIRECTION',
      specs: 'AESTHETIC: COLD LUXURY BRUTALISM',
      description: 'Crafting unforgettable visual identities, bespoke brand atmospheres, and digital publications that stand apart from generic templates.'
    },
    {
      code: 'PIL-02',
      title: 'UI/UX & INTERACTION DESIGN',
      specs: 'MOTION: TACTILE SPRING PHYSICS',
      description: 'Designing intuitive yet visceral digital interfaces with calibrated micro-interactions, spring mechanics, and ergonomic spatial flows.'
    },
    {
      code: 'PIL-03',
      title: 'CREATIVE FRONTEND & THREE.JS',
      specs: 'ENGINEERING: REACT 19 + WEBGL',
      description: 'Translating bold design visions into pixel-perfect, accessible code with smooth custom shaders, 3D canvases, and fluid transitions.'
    },
    {
      code: 'PIL-04',
      title: 'DESIGN SYSTEMS & TYPOGRAPHY',
      specs: 'FOUNDATION: TOKEN-BASED ARCHITECTURE',
      description: 'Building robust, scalable design systems with disciplined typography scales, modular component libraries, and strict visual rhythm.'
    }
  ],

  howIWork: [
    {
      step: '01',
      phase: 'STRUCTURAL DISCOVERY & GRID ARCHITECTURE',
      title: 'DISSECTING CONTENT & SPATIAL HIERARCHY',
      description: 'Before any styling begins, I construct the mathematical layout foundation: column rhythms, baseline typography grids, and disciplined negative space.',
      deliverables: ['Spatial Layout Blueprint', 'Typography Scale Matrix', 'Interactive Wireframe Flow']
    },
    {
      step: '02',
      phase: 'TACTILE MOTION & INTERACTION PHYSICS',
      title: 'CALIBRATING PHYSICAL DIGITAL ERGONOMICS',
      description: 'Defining the mechanical feel of the interface: spring stiffness, cursor damping, acoustic cues, and smooth viewport transitions that provide physical feedback.',
      deliverables: ['Framer Motion Prototypes', 'Three.js Spatial Sandboxes', 'Micro-Interaction Curves']
    },
    {
      step: '03',
      phase: 'HIGH-FIDELITY SURFACE & DESIGN SYSTEMS',
      title: 'SCULPTING REFINED VISUAL SURFACES',
      description: 'Applying refined brutalist aesthetics: cold obsidian/slate palettes, razor 1px borders, pristine typography, and tokenized design systems.',
      deliverables: ['Figma Design System', 'WCAG AAA Color Tokens', 'Editorial Visual Direction']
    },
    {
      step: '04',
      phase: 'CREATIVE FRONTEND & 120 FPS PRODUCTION',
      title: 'ROCK-SOLID PRODUCTION ENGINEERING',
      description: 'Translating design into uncompromising, fluid code using React 19, Three.js, and modern CSS. Zero layout shifts and sub-100ms response times.',
      deliverables: ['Production Web Architecture', 'Zero-Jank 120 FPS Pacing', 'Automated CI/CD Deployment']
    }
  ] as ProcessStep[],

  projects: [
    {
      id: 'aura-flagship',
      code: 'MC-01',
      title: 'MADCAT COLLECTIVE — WORK IN PROGRESS',
      sector: 'WEB DESIGN',
      year: '2026',
      elevation: 'ELEVATION 01',
      renderMetric: 'GSAP + LENIS MOTION',
      status: 'PROTOTYPE',
      shortDesc: 'Bilingual portfolio site in development for a graphic design collective, built around a single, deliberately-chosen motion language instead of a grab-bag of effects.',
      fullDesc: 'Currently under active construction — structural skeleton and routing are complete, visual design has not started yet. MadCat is architected around token-driven motion (every duration, easing curve, and transform value lives in one file) and a single site-wide animation verb, chosen only after comparing candidates side by side rather than assumed upfront. Full bilingual parity (Turkish/English) is enforced automatically at build time.',
      structuralSpecs: [
        { label: 'STATUS', value: 'WORK IN PROGRESS — SKELETON PHASE' },
        { label: 'FRAMEWORK', value: 'NEXT.JS 16 + TYPESCRIPT' },
        { label: 'MOTION ENGINE', value: 'GSAP SCROLLTRIGGER + LENIS' },
        { label: 'LOCALIZATION', value: 'NEXT-INTL (TR/EN PARITY ENFORCED)' }
      ],
      techStack: ['Next.js 16', 'TypeScript', 'GSAP', 'Lenis', 'next-intl'],
      liveUrl: 'https://github.com',
      repoUrl: 'https://github.com',
      schematicType: 'MONOLITH GRID'
    },
    {
      id: 'nebula-sound',
      code: 'PROJECT // 02',
      title: 'NEBULA SPATIAL AUDIO EXPERIENCE',
      sector: 'INTERACTIVE 3D',
      year: '2025',
      elevation: 'ELEVATION 02',
      renderMetric: 'REAL-TIME BINAURAL SYNTHESIS',
      status: 'LIVE',
      shortDesc: 'Generative sound and visual playground reacting to cursor velocity and microphone acoustics.',
      fullDesc: 'An experimental interactive web experience exploring the intersection of spatial typography and generative acoustics. Features real-time FFT audio spectrum analysis driving particle deformation and fluid typographic wave distortions.',
      structuralSpecs: [
        { label: 'AUDIO DSP', value: 'WEB AUDIO BIQUAD API' },
        { label: 'SHADER PASS', value: 'RAYMARCHED DISPLACEMENT' },
        { label: 'LATENCY', value: '< 8MS AUDIO-VISUAL SYNC' },
        { label: 'COLOR PALETTE', value: 'MONOCHROME TITANIUM' }
      ],
      techStack: ['Creative WebGL', 'Web Audio API', 'TypeScript', 'GLSL', 'Vite'],
      liveUrl: 'https://github.com',
      repoUrl: 'https://github.com',
      schematicType: 'MONOLITH GRID'
    },
    {
      id: 'chrono-mag',
      code: 'PROJECT // 03',
      title: 'CHRONO EDITORIAL PUBLICATION',
      sector: 'WEB DESIGN',
      year: '2024',
      elevation: 'ELEVATION 03',
      renderMetric: 'FLUID RATIO ENGINE',
      status: 'COMMISSIONED',
      shortDesc: 'Digital architectural publication with asymmetric grid layouts and darkroom reading mode.',
      fullDesc: 'Engineered for deep-read cultural essays and architectural critiques. Implements a fluid responsive baseline grid, custom reading progress indicator, darkroom inverted mode, and physical tactile page transition physics.',
      structuralSpecs: [
        { label: 'PERFORMANCE', value: '100/100 LIGHTHOUSE SCORE' },
        { label: 'TYPOGRAPHY', value: 'PLUS JAKARTA SANS' },
        { label: 'GRID SYSTEM', value: '12-COLUMN ASYMMETRIC' },
        { label: 'ASSET WEIGHT', value: 'ZERO LAYOUT SHIFT (CLS: 0)' }
      ],
      techStack: ['UI Design', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      liveUrl: 'https://github.com',
      repoUrl: 'https://github.com',
      schematicType: 'EDITORIAL'
    },
    {
      id: 'monolith-system',
      code: 'PROJECT // 04',
      title: 'MONOLITH-UI DESIGN SYSTEM',
      sector: 'DESIGN SYSTEMS',
      year: '2024',
      elevation: 'ELEVATION 04',
      renderMetric: '64 DESIGN TOKENS',
      status: 'LIVE',
      shortDesc: 'Clean, uncompromising brutalist UI component architecture for high-density web software.',
      fullDesc: 'A rigorous design system built on mathematical proportions and raw honesty of materials. Includes 42 accessible UI components, standardized spacing tokens, refined tactile button physics, and comprehensive documentation.',
      structuralSpecs: [
        { label: 'COMPONENTS', value: '42 ACCESSIBLE MODULES' },
        { label: 'ACCESSIBILITY', value: 'WCAG AAA 14:1 CONTRAST' },
        { label: 'BUNDLE IMPACT', value: '< 12KB COMPRESSED' },
        { label: 'CUSTOMIZATION', value: 'VARIABLE CSS TOKENS' }
      ],
      techStack: ['Figma Tokens', 'React', 'TypeScript', 'Storybook'],
      liveUrl: 'https://github.com',
      repoUrl: 'https://github.com',
      schematicType: 'TOKEN MATRIX'
    },
    {
      id: 'synapse-ai',
      code: 'PROJECT // 05',
      title: 'SYNAPSE CREATIVE CANVAS',
      sector: 'PRODUCT UI/UX',
      year: '2024',
      elevation: 'ELEVATION 05',
      renderMetric: 'INFINITE SPATIAL VIEWPORT',
      status: 'PROTOTYPE',
      shortDesc: 'Node-based AI generative canvas featuring hardware-accelerated spatial panning and magnetic docking.',
      fullDesc: 'A revolutionary creative workspace allowing designers to orchestrate complex generative workflows on an infinite zoomable canvas. Designed with cold obsidian panels, laser-thin connector cables, and low-latency interaction loops.',
      structuralSpecs: [
        { label: 'RENDER MODEL', value: 'CANVAS2D + WEBGL HYBRID' },
        { label: 'CONCURRENCY', value: 'LOCAL-FIRST CRDT STATE' },
        { label: 'TOUCH SUPPORT', value: 'MULTI-FINGER PINCH ZOOM' },
        { label: 'DESIGN TOKENS', value: 'DARK TITANIUM OBSIDIAN' }
      ],
      techStack: ['Product Design', 'React', 'Canvas API', 'Framer Motion'],
      liveUrl: 'https://github.com',
      repoUrl: 'https://github.com',
      schematicType: 'MONOLITH GRID'
    }
  ] as Project[],

  skillsArsenal: [
    {
      category: 'VISUAL & INTERACTION DESIGN',
      specs: 'AESTHETIC & SPATIAL MASTERY',
      skills: [
        { name: 'Creative Web Design & Direction', loadCapacity: 98, grade: 'EXEMPLARY' },
        { name: 'UI/UX Architecture & Prototyping', loadCapacity: 96, grade: 'REFINED' },
        { name: 'Figma & Design Systems Tokens', loadCapacity: 97, grade: 'PRECISION' },
        { name: 'Architectural Typography & Grids', loadCapacity: 99, grade: 'MASTERY' },
        { name: 'Motion Design & Micro-Interactions', loadCapacity: 94, grade: 'PHYSICS-BASED' }
      ]
    },
    {
      category: 'CREATIVE FRONTEND & MOTION',
      specs: 'PRODUCTION EXECUTION',
      skills: [
        { name: 'React 19 & Next.js Ecosystem', loadCapacity: 96, grade: 'PRODUCTION' },
        { name: 'Three.js / WebGL / Spatial Canvas', loadCapacity: 91, grade: 'REAL-TIME 3D' },
        { name: 'Tailwind CSS & Modern CSS Layouts', loadCapacity: 99, grade: 'FLUID GRIDS' },
        { name: 'Framer Motion & Spring Mechanics', loadCapacity: 95, grade: 'ORGANIC SPRING' },
        { name: 'Web Audio API Acoustic Feedback', loadCapacity: 90, grade: 'DSP SYNTHESIS' }
      ]
    },
    {
      category: 'ENGINEERING & PERFORMANCE',
      specs: 'LIGHTWEIGHT RUNTIMES',
      skills: [
        { name: 'TypeScript & Architecture Cleanliness', loadCapacity: 95, grade: 'TYPE-SAFE' },
        { name: 'Responsive Ergonomics & Mobile UX', loadCapacity: 98, grade: 'ADAPTIVE' },
        { name: 'Core Web Vitals & Frame Rate Tuning', loadCapacity: 96, grade: '120 FPS P99' },
        { name: 'Accessibility (WCAG AAA Standards)', loadCapacity: 94, grade: 'INCLUSIVE' },
        { name: 'Git & Production Deployment CI/CD', loadCapacity: 92, grade: 'IMMUTABLE' }
      ]
    }
  ],

  constructionTimeline: [
    {
      era: '2024 - PRESENT',
      elevation: 'LEVEL 03 // SENIOR CREATIVE',
      role: 'LEAD CREATIVE WEB DESIGNER & FRONTEND ENGINEER',
      organization: 'INDEPENDENT STUDIO & COMMISSIONS',
      location: 'GLOBAL // REMOTE',
      summary: 'Designing high-impact digital experiences, bespoke web flagships, and interaction design systems for international brands, technology pioneers, and creative studios.',
      structuralOutput: [
        'Designed and delivered bespoke luxury flagship websites winning industry acclaim',
        'Engineered custom interactive WebGL spatial components running smoothly at 120 FPS',
        'Standardized brutalist token design systems reducing client iteration cycles by 40%'
      ]
    },
    {
      era: '2022 - 2024',
      elevation: 'LEVEL 02 // DIGITAL CRAFT',
      role: 'SENIOR UI/UX & INTERACTION DESIGNER',
      organization: 'APEX CREATIVE LABS',
      location: 'ISTANBUL',
      summary: 'Led the visual identity and interface design for enterprise SaaS products, digital publications, and design tooling.',
      structuralOutput: [
        'Created cohesive design token libraries spanning over 120 web components',
        'Pioneered tactile micro-interaction patterns resulting in 28% higher task completion rate',
        'Conducted deep typography and accessibility audits achieving full WCAG AAA contrast'
      ]
    },
    {
      era: '2020 - 2022',
      elevation: 'LEVEL 01 // FOUNDATION',
      role: 'WEB DESIGNER & FRONTEND DEVELOPER',
      organization: 'STUDIO MONOLITH',
      location: 'ISTANBUL',
      summary: 'Crafted responsive websites, editorial layouts, and interactive brand presentations with heavy emphasis on typography and visual restraint.',
      structuralOutput: [
        'Built over 25 bespoke responsive web experiences with zero layout shifts',
        'Authored reusable animation presets and custom cursor interaction systems'
      ]
    }
  ] as CareerMilestone[],

  contactTelemetry: {
    transmissionFrequency: 'STUDIO DISPATCH // OPEN',
    email: 'tatlidil.eren@gmail.com',
    github: 'https://github.com/EnverE',
    linkedin: 'https://www.linkedin.com/in/enver-eren-tatl%C4%B1dil-573a53219',
    locationCoordinate: 'ISTANBUL // 41°00\'49"N  28°57\'18"E',
    commissionStatus: 'OPEN TO NEW PROJECTS, LIMITED HOURS AROUND SCHOOL'
  }
};
