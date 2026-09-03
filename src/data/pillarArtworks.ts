// Configuration for 3D Artworks on the Monolithic Concrete Pillar
// Easily swap in custom images or graphics by updating the customImageUrl fields!

export interface PillarArtworkConfig {
  id: string;
  projectId: string; // matches project.id from portfolio.ts ('aura', 'nebula', etc.)
  title: string;
  code: string;
  elevationY: number; // Vertical position along the pillar (-40 to +40)
  angleRad: number;   // Radial angle in radians around the cylinder
  width: number;      // Width in 3D units
  height: number;     // Height in 3D units
  customImageUrl?: string; // Optional: Provide your own image path (e.g. '/posters/aura.jpg')
  primaryColor: string;
  accentColor: string;
  tags: string[];
  stickers: Array<{
    text: string;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    rotation: number;
    bg: string;
    fg: string;
  }>;
  graffitis: Array<{
    text: string;
    offsetX: number;
    offsetY: number;
    scale: number;
    rotation: number;
    color: string;
  }>;
}

export type GraffitiStyle =
  | 'subway-handstyle'
  | 'chisel-marker'
  | 'eroded-stencil'
  | 'wild-scribble'
  | 'block-throwup';

export interface PillarGraffitiConfig {
  id: string;
  text: string;
  elevationY: number;
  angleRad: number;
  scale: number;
  color: string;
  style: GraffitiStyle;
  hasUnderline: boolean;
  hasDrips: boolean;
  rotation?: number;
}

export const PILLAR_PROJECT_ARTWORKS: PillarArtworkConfig[] = [
  {
    id: 'art-aura',
    projectId: 'aura-flagship',
    title: 'MADCAT // COLLECTIVE',
    code: 'MC-01',
    elevationY: 6.8,
    angleRad: 0.15,
    width: 2.1,
    height: 3.0,
    primaryColor: '#fafafa',
    accentColor: '#f59e0b',
    tags: ['GRAPHIC COLLECTIVE', 'TOKEN MOTION', 'BILINGUAL PARITY'],
    stickers: [
      { text: 'NEXT.JS 16', offsetX: 0.9, offsetY: 1.2, width: 0.75, height: 0.35, rotation: -0.12, bg: '#000000', fg: '#ffffff' },
      { text: 'GSAP + LENIS', offsetX: -0.85, offsetY: -1.2, width: 0.8, height: 0.3, rotation: 0.08, bg: '#f59e0b', fg: '#000000' }
    ],
    graffitis: []
  },
  {
    id: 'art-nebula',
    projectId: 'nebula',
    title: 'NEBULA // SPATIAL AUDIO',
    code: 'NEB-02',
    elevationY: 2.5,
    angleRad: -0.55,
    width: 2.05,
    height: 2.9,
    primaryColor: '#fafafa',
    accentColor: '#38bdf8',
    tags: ['SPATIAL SOUND', 'ACOUSTIC FORM', 'WEB AUDIO'],
    stickers: [
      { text: 'ACOUSTIC TEST', offsetX: -0.8, offsetY: 1.1, width: 0.85, height: 0.35, rotation: 0.14, bg: '#18181b', fg: '#38bdf8' },
      { text: '3D AUDIO', offsetX: 0.85, offsetY: -1.1, width: 0.7, height: 0.3, rotation: -0.08, bg: '#38bdf8', fg: '#000000' }
    ],
    graffitis: []
  },
  {
    id: 'art-chrono',
    projectId: 'chrono',
    title: 'CHRONO // TRADING HUD',
    code: 'CH-03',
    elevationY: -1.8,
    angleRad: 0.45,
    width: 2.1,
    height: 3.0,
    primaryColor: '#fafafa',
    accentColor: '#ef4444',
    tags: ['HIGH FREQUENCY', 'SUB-12MS', 'FINTECH CORE'],
    stickers: [
      { text: '< 12MS EXECUTION', offsetX: 0.85, offsetY: 1.15, width: 0.9, height: 0.35, rotation: -0.15, bg: '#ef4444', fg: '#ffffff' },
      { text: 'QC PASSED', offsetX: -0.85, offsetY: -1.15, width: 0.75, height: 0.3, rotation: 0.1, bg: '#000000', fg: '#22c55e' }
    ],
    graffitis: []
  },
  {
    id: 'art-monolith',
    projectId: 'monolith',
    title: 'MONOLITH // UI SYSTEM',
    code: 'MN-04',
    elevationY: -6.2,
    angleRad: -0.4,
    width: 2.05,
    height: 2.9,
    primaryColor: '#fafafa',
    accentColor: '#a1a1aa',
    tags: ['BRUTALIST TOKENS', 'DESIGN SYSTEM', 'ZERO BLOAT'],
    stickers: [
      { text: 'TOKEN ENGINE', offsetX: -0.85, offsetY: 1.1, width: 0.85, height: 0.35, rotation: 0.09, bg: '#000000', fg: '#e4e4e7' },
      { text: 'BRUTALIST UI', offsetX: 0.85, offsetY: -1.15, width: 0.8, height: 0.3, rotation: -0.14, bg: '#ffffff', fg: '#000000' }
    ],
    graffitis: []
  },
  {
    id: 'art-synapse',
    projectId: 'synapse',
    title: 'SYNAPSE // NEURAL ENGINE',
    code: 'SYN-05',
    elevationY: -10.5,
    angleRad: 0.35,
    width: 2.1,
    height: 3.0,
    primaryColor: '#fafafa',
    accentColor: '#10b981',
    tags: ['COGNITIVE CANVAS', 'NEURAL FLOW', 'AUTONOMOUS'],
    stickers: [
      { text: 'SYNAPSE AI', offsetX: 0.85, offsetY: 1.15, width: 0.85, height: 0.35, rotation: -0.11, bg: '#10b981', fg: '#000000' },
      { text: 'VERIFIED MODEL', offsetX: -0.85, offsetY: -1.1, width: 0.85, height: 0.3, rotation: 0.12, bg: '#000000', fg: '#10b981' }
    ],
    graffitis: []
  }
];

// 15 Evenly Distributed Street Graffitis across the 3D concrete pillar (All on bare concrete, zero poster overlap, diverse styles & colors)
export const PILLAR_GRAFFITI_ARTWORKS: PillarGraffitiConfig[] = [
  // Top Zone (Y: 13.0 to 9.8)
  { id: 'graf-01', text: 'ENVER EREN TATLIDIL', elevationY: 13.0, angleRad: 0.2, scale: 1.5, color: '#00f0ff', style: 'block-throwup', hasUnderline: false, hasDrips: true, rotation: -0.05 },
  { id: 'graf-02', text: '★ ISTANBUL 34', elevationY: 11.2, angleRad: 2.3, scale: 1.25, color: '#ff5500', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: 0.08 },
  { id: 'graf-03', text: 'RAW BRUTALISM', elevationY: 9.8, angleRad: -1.8, scale: 1.2, color: '#facc15', style: 'eroded-stencil', hasUnderline: false, hasDrips: false, rotation: -0.06 },

  // Level 00 / Upper Zone (Y: 9.6 to 6.0) - Completely clear of MADCAT poster (Y: 5.3 to 8.3)
  { id: 'graf-04', text: 'MADCAT // 01', elevationY: 9.6, angleRad: 0.4, scale: 1.15, color: '#ff0055', style: 'chisel-marker', hasUnderline: true, hasDrips: true, rotation: -0.04 },
  { id: 'graf-05', text: '120 FPS // EET', elevationY: 7.5, angleRad: -2.0, scale: 1.2, color: '#22c55e', style: 'wild-scribble', hasUnderline: true, hasDrips: true, rotation: 0.12 },
  { id: 'graf-06', text: 'KINETIC FORM', elevationY: 6.0, angleRad: 1.6, scale: 1.1, color: '#f59e0b', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: -0.07 },

  // Level 01 / Middle Zone (Y: 4.2 to 0.2) - Clear of NEBULA poster (Y: 1.05 to 3.95)
  { id: 'graf-07', text: 'NEBULA 48kHz', elevationY: 4.2, angleRad: -2.1, scale: 1.35, color: '#38bdf8', style: 'block-throwup', hasUnderline: false, hasDrips: true, rotation: 0.05 },
  { id: 'graf-08', text: 'SPATIAL AUDIO', elevationY: 2.0, angleRad: 2.4, scale: 1.15, color: '#00f0ff', style: 'chisel-marker', hasUnderline: true, hasDrips: true, rotation: -0.05 },
  { id: 'graf-09', text: 'NO WEAKNESS', elevationY: 0.2, angleRad: -2.1, scale: 1.25, color: '#ff5500', style: 'eroded-stencil', hasUnderline: false, hasDrips: false, rotation: 0.08 },

  // Level 02 / Lower Mid Zone (Y: -2.0 to -5.6) - Clear of CHRONO (Y: -3.3 to -0.3) & MONOLITH (Y: -7.65 to -4.75)
  { id: 'graf-10', text: 'CHRONO <12MS', elevationY: -2.0, angleRad: 2.3, scale: 1.2, color: '#facc15', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: -0.06 },
  { id: 'graf-11', text: 'HIGH FREQUENCY', elevationY: -3.8, angleRad: -2.1, scale: 1.2, color: '#ff0055', style: 'wild-scribble', hasUnderline: true, hasDrips: true, rotation: 0.10 },
  { id: 'graf-12', text: 'MONOLITH UI', elevationY: -5.6, angleRad: 2.2, scale: 1.35, color: '#22c55e', style: 'block-throwup', hasUnderline: false, hasDrips: true, rotation: -0.05 },

  // Level 03 / Bottom Zone (Y: -8.5 to -14.2) - Clear of SYNAPSE poster (Y: -12.0 to -9.0)
  { id: 'graf-13', text: 'ZERO BLOAT // CSS', elevationY: -8.5, angleRad: -1.9, scale: 1.15, color: '#38bdf8', style: 'chisel-marker', hasUnderline: true, hasDrips: true, rotation: -0.07 },
  { id: 'graf-14', text: 'SYNAPSE AI 4K', elevationY: -11.2, angleRad: 2.2, scale: 1.2, color: '#00f0ff', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: 0.06 },
  { id: 'graf-15', text: '41°00\'N 28°58\'E', elevationY: -14.2, angleRad: -2.0, scale: 1.25, color: '#f59e0b', style: 'eroded-stencil', hasUnderline: false, hasDrips: false, rotation: 0.06 }
];

// Alias for backwards compatibility
export const PILLAR_AMBIENT_GRAFFITIS = PILLAR_GRAFFITI_ARTWORKS;
