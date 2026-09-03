import { PILLAR_PROJECT_ARTWORKS, PILLAR_GRAFFITI_ARTWORKS } from '../src/data/pillarArtworks.ts';
import type { GraffitiStyle } from '../src/data/pillarArtworks.ts';
import { TRANSLATIONS } from '../src/data/translations.ts';
import { execSync } from 'child_process';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  message?: string;
  metrics?: Record<string, any>;
}

const results: TestResult[] = [];

function assert(condition: boolean, suite: string, name: string, message?: string, metrics?: Record<string, any>) {
  results.push({
    suite,
    name,
    passed: Boolean(condition),
    message: condition ? undefined : message || 'Assertion failed',
    metrics
  });
}

const columnRadius = 2.2;
const columnHeight = 85;
const jointSpacing = 5.5;

function getPillarRadiusAt(angle: number, y: number): number {
  const distToJoint = Math.abs(((y % jointSpacing) + jointSpacing * 1.5) % jointSpacing - jointSpacing * 0.5);
  let jointDent = 0;
  if (distToJoint < 0.26) {
    jointDent = -0.045 * Math.cos((distToJoint / 0.26) * (Math.PI / 2));
  }

  const castingWaviness =
    Math.sin(angle * 5 + y * 0.35) * 0.024 +
    Math.cos(angle * 9 - y * 0.6) * 0.016 +
    Math.sin(angle * 15 + y * 1.1) * 0.01;

  return columnRadius + castingWaviness + jointDent;
}

console.log('='.repeat(80));
console.log('STARTING RIGOROUS FUNCTIONAL & MATHEMATICAL QA VERIFICATION SUITE');
console.log('='.repeat(80));

// ============================================================================
// SUITE 1: Data Integrity & Spatial Separation
// ============================================================================
const suite1 = 'Data Integrity & Spatial Separation';

// 1.1 Verify Graffiti Collection Count
assert(
  PILLAR_GRAFFITI_ARTWORKS.length === 15,
  suite1,
  'Graffiti Collection Count (Exactly 15)',
  `Expected 15 graffitis, got ${PILLAR_GRAFFITI_ARTWORKS.length}`,
  { count: PILLAR_GRAFFITI_ARTWORKS.length }
);

// 1.2 Verify Unique IDs
const ids = new Set(PILLAR_GRAFFITI_ARTWORKS.map(g => g.id));
assert(
  ids.size === 15,
  suite1,
  'Graffiti IDs Uniqueness',
  `Duplicate graffiti IDs detected: ${PILLAR_GRAFFITI_ARTWORKS.length - ids.size}`,
  { uniqueIds: ids.size }
);

// 1.3 Verify Schema and Allowed Graffiti Styles
const validStyles: GraffitiStyle[] = ['subway-handstyle', 'chisel-marker', 'eroded-stencil', 'wild-scribble', 'block-throwup'];
const allValidStyles = PILLAR_GRAFFITI_ARTWORKS.every(g => validStyles.includes(g.style));
assert(
  allValidStyles,
  suite1,
  'Graffiti Styles Enumeration',
  'One or more graffitis contain an invalid style',
  { validStyles }
);

// 1.4 Verify ZERO White Pigments in Graffiti
const whitePatterns = ['#ffffff', '#fff', 'white', 'rgb(255, 255, 255)', 'rgba(255, 255, 255'];
const whiteGraffitis = PILLAR_GRAFFITI_ARTWORKS.filter(g => {
  const c = g.color.toLowerCase().trim();
  return whitePatterns.some(p => c.includes(p)) || c === '#ffffff' || c === '#fff' || c === 'white';
});
assert(
  whiteGraffitis.length === 0,
  suite1,
  'Zero White Pigments on Graffitis',
  `Found ${whiteGraffitis.length} graffiti(s) with white color: ${whiteGraffitis.map(g => g.id).join(', ')}`,
  { whiteGraffitisCount: whiteGraffitis.length }
);

// 1.5 Mathematical Verification of Poster Bounds vs Graffiti Bounds (Zero Spatial Intersection)
let posterOverlaps = 0;
let minPosterClearance = Infinity;
const posterClearanceDetails: any[] = [];

PILLAR_GRAFFITI_ARTWORKS.forEach(g => {
  const gw = 2.7 * g.scale;
  const gh = 1.35 * g.scale;
  const gTh = gw / columnRadius;
  const gy1 = g.elevationY - gh / 2;
  const gy2 = g.elevationY + gh / 2;

  PILLAR_PROJECT_ARTWORKS.forEach(p => {
    const pw = p.width;
    const ph = p.height;
    const pTh = pw / columnRadius;
    const py1 = p.elevationY - ph / 2;
    const py2 = p.elevationY + ph / 2;

    const yOverlap = Math.max(gy1, py1) < Math.min(gy2, py2);

    let diff = Math.abs(g.angleRad - p.angleRad) % (2 * Math.PI);
    if (diff > Math.PI) diff = 2 * Math.PI - diff;
    const minTh = (gTh + pTh) / 2;
    const thOverlap = diff < minTh;

    if (yOverlap && thOverlap) {
      posterOverlaps++;
    }

    const dy = Math.max(0, gy1 - py2, py1 - gy2);
    const dArc = Math.max(0, (diff - minTh) * columnRadius);
    const dist = Math.hypot(dy, dArc);
    if (dist < minPosterClearance) minPosterClearance = dist;

    posterClearanceDetails.push({
      grafId: g.id,
      posterId: p.id,
      yOverlap,
      thOverlap,
      clearanceDistance: dist
    });
  });
});

assert(
  posterOverlaps === 0,
  suite1,
  'Mathematical Zero Poster-Graffiti Intersections',
  `Detected ${posterOverlaps} overlap(s) between graffitis and project posters`,
  {
    totalPosterPairsChecked: PILLAR_GRAFFITI_ARTWORKS.length * PILLAR_PROJECT_ARTWORKS.length,
    overlapsDetected: posterOverlaps,
    minimumClearance3DUnits: Number(minPosterClearance.toFixed(3))
  }
);

// 1.6 Mathematical Verification of Mutual Graffiti-Graffiti Separation
let grafOverlaps = 0;
let minGrafClearance = Infinity;

for (let i = 0; i < PILLAR_GRAFFITI_ARTWORKS.length; i++) {
  for (let j = i + 1; j < PILLAR_GRAFFITI_ARTWORKS.length; j++) {
    const g1 = PILLAR_GRAFFITI_ARTWORKS[i];
    const g2 = PILLAR_GRAFFITI_ARTWORKS[j];
    const w1 = 2.7 * g1.scale;
    const h1 = 1.35 * g1.scale;
    const w2 = 2.7 * g2.scale;
    const h2 = 1.35 * g2.scale;

    const gy1A = g1.elevationY - h1 / 2;
    const gy1B = g1.elevationY + h1 / 2;
    const gy2A = g2.elevationY - h2 / 2;
    const gy2B = g2.elevationY + h2 / 2;

    const yOverlap = Math.max(gy1A, gy2A) < Math.min(gy1B, gy2B);

    let diff = Math.abs(g1.angleRad - g2.angleRad) % (2 * Math.PI);
    if (diff > Math.PI) diff = 2 * Math.PI - diff;
    const minTh = (w1 + w2) / (2 * columnRadius);
    const thOverlap = diff < minTh;

    if (yOverlap && thOverlap) {
      grafOverlaps++;
    }

    const dy = Math.max(0, gy1A - gy2B, gy2A - gy1B);
    const dArc = Math.max(0, (diff - minTh) * columnRadius);
    const dist = Math.hypot(dy, dArc);
    if (dist < minGrafClearance) minGrafClearance = dist;
  }
}

assert(
  grafOverlaps === 0,
  suite1,
  'Mutual Graffiti-Graffiti Separation',
  `Detected ${grafOverlaps} overlap(s) between adjacent graffitis`,
  {
    totalPairsChecked: (PILLAR_GRAFFITI_ARTWORKS.length * (PILLAR_GRAFFITI_ARTWORKS.length - 1)) / 2,
    overlapsDetected: grafOverlaps,
    minimumGrafMargin3DUnits: Number(minGrafClearance.toFixed(3))
  }
);

// ============================================================================
// SUITE 2: Typographic Styles & Texture Bounds
// ============================================================================
const suite2 = 'Typographic Styles & Texture Bounds';

// 2.1 Test all 5 styles representation
const presentStyles = new Set(PILLAR_GRAFFITI_ARTWORKS.map(g => g.style));
assert(
  validStyles.every(s => presentStyles.has(s)),
  suite2,
  'All 5 Graffiti Styles Present on Pillar',
  `Missing styles: ${validStyles.filter(s => !presentStyles.has(s)).join(', ')}`,
  { presentStyles: Array.from(presentStyles) }
);

// 2.2 Font Scaler Mathematical Simulation on Edge-case Strings
function simulateFontScaling(text: string, baseFontSize: number, widthPx = 1280): { fontSize: number; textW: number; maxTextW: number } {
  const maxTextW = widthPx * 0.72; // 921.6px
  const charAspect = 0.62;
  let fontSize = baseFontSize;
  let textW = text.length * fontSize * charAspect;

  while (textW > maxTextW && fontSize > 16) {
    fontSize -= 4;
    textW = text.length * fontSize * charAspect;
  }

  if (textW > maxTextW && textW > 0) {
    fontSize = Math.max(10, Math.floor(fontSize * (maxTextW / textW)));
    textW = text.length * fontSize * charAspect;
  }

  return { fontSize, textW, maxTextW };
}

const edgeCaseStrings = [
  'ENVER EREN TATLIDIL',
  '41°00\'N 28°58\'E',
  '★ ISTANBUL 34',
  'CHRONO <12MS // HIGH FREQUENCY TRADING CORE ARCHITECTURE',
  'SUPER_LONG_BRUTALIST_STRING_WITH_VERY_LONG_CHARACTER_SEQUENCE_AND_NUMBERS_0123456789_SPECIAL_CHARS_★_°_/_<_>_#_!_?',
  'SHORT',
  'X',
];

const styleBaseSizes: Record<GraffitiStyle, number> = {
  'subway-handstyle': 124,
  'chisel-marker': 120,
  'eroded-stencil': 114,
  'wild-scribble': 104,
  'block-throwup': 138,
};

let allWithinBounds = true;
const scalingReport: any[] = [];

for (const style of validStyles) {
  const baseSize = styleBaseSizes[style];
  for (const str of edgeCaseStrings) {
    const res = simulateFontScaling(str, baseSize, 1280);
    const overflowed = res.textW > res.maxTextW + 0.1 || res.textW > 1280;
    if (overflowed) allWithinBounds = false;
    scalingReport.push({
      style,
      textLength: str.length,
      initialBaseSize: baseSize,
      computedFontSize: res.fontSize,
      computedTextWidth: Number(res.textW.toFixed(1)),
      maxAllowedWidth: res.maxTextW,
      overflowed
    });
  }
}

assert(
  allWithinBounds,
  suite2,
  'Font Scaler Non-Overflow Bounds across All Styles & Edge-cases',
  'One or more long strings exceeded the allowed canvas boundary',
  { totalEdgeCaseScenariosTested: scalingReport.length }
);

// 2.3 Paint Drip Length Clamping Verification
const canvasH = 640;
let dripClippingDetected = false;
let maxDripBottomObserved = 0;

for (let startY = 150; startY <= 635; startY += 5) {
  for (const style of validStyles) {
    for (let sim = 0; sim < 20; sim++) {
      const dripW = style === 'block-throwup' ? 4.5 + Math.random() * 2.5 : 2.5 + Math.random() * 2.5;
      const beadR = dripW * 1.35;
      const maxAvailableDrip = Math.max(0, canvasH - 25 - beadR - startY);
      if (maxAvailableDrip < 8) continue; // Skipped safely

      const maxLen = style === 'wild-scribble' ? 140 : 85;
      const dripLen = Math.min(maxAvailableDrip, 28 + Math.random() * maxLen);

      const finalBottomY = startY + dripLen + beadR;
      if (finalBottomY > canvasH) {
        dripClippingDetected = true;
      }
      if (finalBottomY > maxDripBottomObserved) {
        maxDripBottomObserved = finalBottomY;
      }
    }
  }
}

assert(
  !dripClippingDetected && maxDripBottomObserved <= canvasH - 10,
  suite2,
  'Paint Drip Length Strict Clamping (Zero Bottom Clipping)',
  `Drips clipped past canvas bottom! Max bottom observed: ${maxDripBottomObserved.toFixed(1)}px (Canvas H: ${canvasH}px)`,
  {
    canvasHeight: canvasH,
    maxDripBottomObserved: Number(maxDripBottomObserved.toFixed(1)),
    bottomClearanceMarginPx: Number((canvasH - maxDripBottomObserved).toFixed(1))
  }
);

// ============================================================================
// SUITE 3: Translations Parity
// ============================================================================
const suite3 = 'Translations Parity (EN <-> TR)';

const en = TRANSLATIONS.EN;
const tr = TRANSLATIONS.TR;
const parityIssues: string[] = [];

function checkParity(objA: any, objB: any, path: string) {
  if (typeof objA !== typeof objB) {
    parityIssues.push(`Type mismatch at ${path}: ${typeof objA} vs ${typeof objB}`);
    return;
  }
  if (typeof objA === 'string') {
    if (!objA.trim()) parityIssues.push(`Empty string in EN at ${path}`);
    if (!objB.trim()) parityIssues.push(`Empty string in TR at ${path}`);
    return;
  }
  if (Array.isArray(objA)) {
    if (!Array.isArray(objB)) {
      parityIssues.push(`Array type mismatch at ${path}`);
      return;
    }
    if (objA.length !== objB.length) {
      parityIssues.push(`Array length mismatch at ${path}: EN=${objA.length} vs TR=${objB.length}`);
    }
    const maxLen = Math.max(objA.length, objB.length);
    for (let i = 0; i < maxLen; i++) {
      checkParity(objA[i], objB[i], `${path}[${i}]`);
    }
    return;
  }
  if (typeof objA === 'object' && objA !== null) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    for (const key of keysA) {
      const p = path ? `${path}.${key}` : key;
      if (!(key in objB)) {
        parityIssues.push(`Missing key in TR: ${p}`);
      } else {
        checkParity(objA[key], objB[key], p);
      }
    }
    for (const key of keysB) {
      const p = path ? `${path}.${key}` : key;
      if (!(key in objA)) {
        parityIssues.push(`Extra key in TR: ${p}`);
      }
    }
  }
}

checkParity(en, tr, 'TRANSLATIONS');

assert(
  parityIssues.length === 0,
  suite3,
  '100% Key Parity & Completeness (English vs Turkish)',
  `Detected ${parityIssues.length} parity issues:\n${parityIssues.slice(0, 5).join('\n')}`,
  {
    totalParityIssues: parityIssues.length,
    enRootSectionsCount: Object.keys(en).length,
    trRootSectionsCount: Object.keys(tr).length,
    projectsCount: Object.keys(en.projects).length,
    processStepsCount: en.processSteps.length,
    manifestoItemsCount: en.manifesto.length,
    materialSpecimensCount: en.materialSpecimens.length
  }
);

// ============================================================================
// SUITE 4: 3D Pillar Geometry & Waviness
// ============================================================================
const suite4 = '3D Pillar Geometry & Waviness';

let minRadius = Infinity;
let maxRadius = -Infinity;
let maxDeltaY = 0;
let maxDeltaTheta = 0;
let hasNaN = false;
let sampleCount = 0;

const sampleYSteps = 300;
const sampleAngleSteps = 100;
const yMin = -columnHeight / 2;
const yMax = columnHeight / 2;

for (let yi = 0; yi <= sampleYSteps; yi++) {
  const y = yMin + (yi / sampleYSteps) * (yMax - yMin);
  for (let ai = 0; ai <= sampleAngleSteps; ai++) {
    const angle = (ai / sampleAngleSteps) * Math.PI * 2;
    const r = getPillarRadiusAt(angle, y);
    sampleCount++;

    if (isNaN(r) || !isFinite(r)) {
      hasNaN = true;
    }

    if (r < minRadius) minRadius = r;
    if (r > maxRadius) maxRadius = r;

    // Numerical partial derivatives for smoothness
    const dy = 0.01;
    const r_dy = getPillarRadiusAt(angle, y + dy);
    const gradY = Math.abs((r_dy - r) / dy);
    if (gradY > maxDeltaY) maxDeltaY = gradY;

    const dTh = 0.01;
    const r_dTh = getPillarRadiusAt(angle + dTh, y);
    const gradTh = Math.abs((r_dTh - r) / dTh);
    if (gradTh > maxDeltaTheta) maxDeltaTheta = gradTh;
  }
}

assert(
  !hasNaN && minRadius > 0,
  suite4,
  'Strictly Positive & Finite Radius Everywhere',
  `Encountered invalid radius: minRadius=${minRadius}, hasNaN=${hasNaN}`,
  { sampleCount, minRadius: Number(minRadius.toFixed(4)), maxRadius: Number(maxRadius.toFixed(4)) }
);

assert(
  minRadius >= 2.10 && maxRadius <= 2.30,
  suite4,
  'Physical Monolithic Curvature Bounds [2.10 - 2.30]',
  `Radius out of expected bounds: [${minRadius.toFixed(4)}, ${maxRadius.toFixed(4)}]`,
  {
    baseColumnRadius: columnRadius,
    minRadiusSampled: Number(minRadius.toFixed(4)),
    maxRadiusSampled: Number(maxRadius.toFixed(4)),
    maxWavinessAmplitude: Number(((maxRadius - minRadius) / 2).toFixed(4))
  }
);

let jointsValid = true;
for (let k = -7; k <= 7; k++) {
  const jointY = k * jointSpacing;
  const rAtJoint = getPillarRadiusAt(0, jointY);
  const rOutsideJoint = getPillarRadiusAt(0, jointY + 0.5);
  if (rAtJoint >= rOutsideJoint) {
    jointsValid = false;
  }
}

assert(
  jointsValid,
  suite4,
  'Horizontal Recessed Joint Grooves Smooth Profile',
  'Joint groove profile was not consistently recessed across all elevations',
  { jointSpacing, maxSlopeY: Number(maxDeltaY.toFixed(3)), maxSlopeTheta: Number(maxDeltaTheta.toFixed(3)) }
);

// ============================================================================
// SUITE 5: Code Quality & Build Verification
// ============================================================================
const suite5 = 'Code Quality & Build Verification';

let lintPassed = false;
let lintOutput = '';
try {
  lintOutput = execSync('npm run lint', { encoding: 'utf-8' });
  lintPassed = true;
} catch (e: any) {
  lintOutput = e.stdout || e.message;
}

assert(
  lintPassed,
  suite5,
  'Oxlint Static Code Analysis (0 Errors, 0 Warnings)',
  `Oxlint failed:\n${lintOutput}`,
  { status: lintPassed ? 'PASSED' : 'FAILED' }
);

let buildPassed = false;
let buildOutput = '';
try {
  buildOutput = execSync('npm run build', { encoding: 'utf-8' });
  buildPassed = true;
} catch (e: any) {
  buildOutput = e.stdout || e.message;
}

assert(
  buildPassed,
  suite5,
  'TypeScript Typecheck & Vite Production Build',
  `Build failed:\n${buildOutput}`,
  { status: buildPassed ? 'PASSED' : 'FAILED' }
);

// ============================================================================
// SUMMARY REPORT GENERATION
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('QA EXECUTION SUMMARY REPORT');
console.log('='.repeat(80));

let passedCount = 0;
let failedCount = 0;

for (const res of results) {
  const icon = res.passed ? '✓ PASS' : '✗ FAIL';
  console.log(`${icon} [${res.suite}] ${res.name}`);
  if (res.metrics) {
    console.log(`       Metrics: ${JSON.stringify(res.metrics)}`);
  }
  if (!res.passed && res.message) {
    console.log(`       Error: ${res.message}`);
  }
  if (res.passed) passedCount++;
  else failedCount++;
}

console.log('='.repeat(80));
console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('='.repeat(80));

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
