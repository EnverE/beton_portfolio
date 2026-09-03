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
    elevationY: 5.5,
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
  }
];

// 15 Evenly Distributed Street Graffitis across the 3D concrete pillar (All on bare concrete, zero poster overlap, diverse styles & colors)
export const PILLAR_GRAFFITI_ARTWORKS: PillarGraffitiConfig[] = [
  // Top Zone (Y: 13.0 to 9.8)
  { id: 'graf-01', text: 'ENVER EREN TATLIDIL', elevationY: 13.0, angleRad: 0.2, scale: 1.5, color: '#00f0ff', style: 'block-throwup', hasUnderline: false, hasDrips: true, rotation: -0.05 },
  { id: 'graf-02', text: '★ ISTANBUL 34', elevationY: 11.2, angleRad: 2.3, scale: 1.25, color: '#ff5500', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: 0.08 },
  { id: 'graf-03', text: 'ODTÜ // METU', elevationY: 9.8, angleRad: -1.8, scale: 1.2, color: '#facc15', style: 'eroded-stencil', hasUnderline: false, hasDrips: false, rotation: -0.06 },

  // Level 00 / Upper Zone (Y: 8.5 to 5.2) - Clear of MADCAT poster (Y: 4.0 to 7.0, Angle: 0.15)
  { id: 'graf-04', text: 'MADCAT // 01', elevationY: 8.5, angleRad: 0.4, scale: 1.15, color: '#ff0055', style: 'chisel-marker', hasUnderline: true, hasDrips: true, rotation: -0.04 },
  { id: 'graf-05', text: 'YOU NEXT?', elevationY: 7.2, angleRad: -2.0, scale: 1.2, color: '#22c55e', style: 'wild-scribble', hasUnderline: true, hasDrips: true, rotation: 0.12 },
  { id: 'graf-06', text: 'GSAP + LENIS', elevationY: 5.2, angleRad: 2.5, scale: 1.1, color: '#f59e0b', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: -0.07 },

  // Level 01 / Middle Zone (Y: 2.6 to -1.9) - Between MADCAT and NEXT posters
  { id: 'graf-07', text: 'CREATIVE CODE', elevationY: 2.6, angleRad: -2.1, scale: 1.35, color: '#38bdf8', style: 'block-throwup', hasUnderline: false, hasDrips: true, rotation: 0.05 },
  { id: 'graf-08', text: 'REACT + THREE.JS', elevationY: 1.2, angleRad: 0.8, scale: 1.15, color: '#00f0ff', style: 'chisel-marker', hasUnderline: true, hasDrips: true, rotation: -0.05 },
  { id: 'graf-09', text: 'CUT UNTIL HONEST', elevationY: -0.5, angleRad: -2.0, scale: 1.25, color: '#ff5500', style: 'eroded-stencil', hasUnderline: false, hasDrips: false, rotation: 0.08 },
  { id: 'graf-10', text: 'BUILD TO LAST', elevationY: -1.9, angleRad: 1.4, scale: 1.2, color: '#facc15', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: -0.06 },

  // Level 02 / Lower Mid Zone (Y: -4.5 to -6.5) - Clear of NEXT poster (Y: -6.0 to -3.0, Angle: 3.14)
  { id: 'graf-11', text: 'SLOW IS A BUG', elevationY: -4.5, angleRad: 0.1, scale: 1.2, color: '#ff0055', style: 'wild-scribble', hasUnderline: true, hasDrips: true, rotation: 0.10 },
  { id: 'graf-12', text: 'BRUTALIST WEB', elevationY: -6.5, angleRad: -0.5, scale: 1.35, color: '#22c55e', style: 'block-throwup', hasUnderline: false, hasDrips: true, rotation: -0.05 },

  // Level 03 / Bottom Zone (Y: -8.8 to -14.2)
  { id: 'graf-13', text: 'HARDWARE & CODE', elevationY: -8.8, angleRad: -2.1, scale: 1.15, color: '#38bdf8', style: 'chisel-marker', hasUnderline: true, hasDrips: true, rotation: -0.07 },
  { id: 'graf-14', text: 'tatlidil.eren', elevationY: -11.5, angleRad: 2.2, scale: 1.2, color: '#00f0ff', style: 'subway-handstyle', hasUnderline: true, hasDrips: true, rotation: 0.06 },
  { id: 'graf-15', text: '41°00\'N 28°58\'E', elevationY: -14.2, angleRad: -2.0, scale: 1.25, color: '#f59e0b', style: 'eroded-stencil', hasUnderline: false, hasDrips: false, rotation: 0.06 }
];

// Alias for backwards compatibility
export const PILLAR_AMBIENT_GRAFFITIS = PILLAR_GRAFFITI_ARTWORKS;
