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
      id: 'next-project',
      code: 'NEXT // 02',
      title: 'YOU COULD BE NEXT',
      sector: 'WEB DESIGN',
      year: '2026',
      elevation: 'ELEVATION 02',
      renderMetric: 'DIRECT INQUIRIES OPEN',
      status: 'COMMISSIONED',
      shortDesc: "Have an ambitious idea, a portfolio, or a product that deserves distinct motion and brutalist craft? Let's build it together.",
      fullDesc: "I'm currently taking on select web design and creative frontend commissions around my software engineering studies at METU. Whether you need a bespoke portfolio, an interactive 3D WebGL experience, or a production-grade web application built with React, Three.js, or GSAP — reach out directly. Send an email to tatlidil.eren@gmail.com, connect on LinkedIn, or drop a message below at the dispatch terminal.",
      structuralSpecs: [
        { label: 'AVAILABILITY', value: 'OPEN FOR COMMISSIONS' },
        { label: 'DIRECT EMAIL', value: 'tatlidil.eren@gmail.com' },
        { label: 'COLLABORATION', value: 'GLOBAL & REMOTE' },
        { label: 'RESPONSE TIME', value: '< 24-48 HOURS' }
      ],
      techStack: ['React 19', 'Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind CSS'],
      liveUrl: '#dispatch',
      repoUrl: 'https://github.com/EnverE',
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
