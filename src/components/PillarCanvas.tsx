import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PILLAR_PROJECT_ARTWORKS, PILLAR_GRAFFITI_ARTWORKS } from '../data/pillarArtworks';
import { PillarTextureFactory } from '../utils/pillarTextureFactory';

interface PillarCanvasProps {
  scrollProgress: number; // 0 (top) to 1 (bottom)
  targetAlignment: 'center' | 'left' | 'right';
  focusedProjectId?: string | null;
  onSelectProject?: (projectId: string | null) => void;
  onScrollBy?: (deltaY: number, immediate?: boolean) => void;
}

export const PillarCanvas: React.FC<PillarCanvasProps> = ({
  scrollProgress,
  targetAlignment,
  focusedProjectId = null,
  onSelectProject,
  onScrollBy,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const pillarGroupRef = useRef<THREE.Group | null>(null);
  const posterMeshesRef = useRef<THREE.Mesh[]>([]);
  const focusedProjectRef = useRef<string | null>(focusedProjectId);
  const onSelectProjectRef = useRef(onSelectProject);
  const onScrollByRef = useRef(onScrollBy);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const bounceLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const moonLightRef = useRef<THREE.DirectionalLight | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const spotLight2Ref = useRef<THREE.SpotLight | null>(null);
  const alignmentRef = useRef(targetAlignment);
  const scrollRef = useRef(scrollProgress);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Update refs on change
  useEffect(() => {
    alignmentRef.current = targetAlignment;
  }, [targetAlignment]);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    focusedProjectRef.current = focusedProjectId;
  }, [focusedProjectId]);

  useEffect(() => {
    onSelectProjectRef.current = onSelectProject;
  }, [onSelectProject]);

  useEffect(() => {
    onScrollByRef.current = onScrollBy;
  }, [onScrollBy]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.8, 150);
    camera.position.set(0, 0, 19.5);
    camera.lookAt(0, 0, 0);

    // 2. High-Performance WebGL Renderer with ACES Filmic Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05; // Richer, moodier exposure (not overexposed/bright)
    container.appendChild(renderer.domElement);

    // 3. Ultra-Photorealistic Architectural Concrete Procedural Textures (Diffuse + Normal + Roughness + AO)
    const createRuggedConcreteTextures = () => {
      const isMobileDevice = window.innerWidth < 768;
      const size = isMobileDevice ? 1024 : 2048; // Efficient 1K on mobile, ultra-crisp 2K on desktop

      // --- Diffuse Canvas ---
      const diffCanvas = document.createElement('canvas');
      diffCanvas.width = size;
      diffCanvas.height = size;
      const diffCtx = diffCanvas.getContext('2d');

      // --- Heightfield for Tangent Normal Map Computation ---
      const heightData = new Float32Array(size * size);

      // --- Roughness Canvas (PBR Micro-reflectance) ---
      const roughCanvas = document.createElement('canvas');
      roughCanvas.width = size;
      roughCanvas.height = size;
      const roughCtx = roughCanvas.getContext('2d');

      // --- Ambient Occlusion (AO) Canvas (Micro-cavity contact shadows) ---
      const aoCanvas = document.createElement('canvas');
      aoCanvas.width = size;
      aoCanvas.height = size;
      const aoCtx = aoCanvas.getContext('2d');

      if (diffCtx && roughCtx && aoCtx) {
        // Base Tone: Deeper, weathered raw brutalist concrete
        diffCtx.fillStyle = '#545358';
        diffCtx.fillRect(0, 0, size, size);

        roughCtx.fillStyle = '#e2e2e6'; // Cement paste matrix is matte (~0.88)
        roughCtx.fillRect(0, 0, size, size);

        aoCtx.fillStyle = '#ffffff'; // White = fully unoccluded
        aoCtx.fillRect(0, 0, size, size);

        // Baseline height field
        for (let i = 0; i < heightData.length; i++) {
          heightData[i] = 0.5 + (Math.random() - 0.5) * 0.03;
        }

        // Layer 1: Large-Scale Hydration Mottling & Cement Clouding (Organic poured slurry variations)
        const mottlingCount = isMobileDevice ? 25 : 60;
        for (let i = 0; i < mottlingCount; i++) {
          const cx = Math.random() * size;
          const cy = Math.random() * size;
          const rad = Math.random() * (isMobileDevice ? 160 : 320) + 60;
          const isLighter = Math.random() > 0.45;
          const grad = diffCtx.createRadialGradient(cx, cy, 0, cx, cy, rad);
          const alpha = Math.random() * 0.12 + 0.04;
          grad.addColorStop(0, isLighter ? `rgba(135, 134, 140, ${alpha})` : `rgba(80, 78, 85, ${alpha})`);
          grad.addColorStop(1, 'rgba(107, 106, 111, 0)');
          diffCtx.fillStyle = grad;
          diffCtx.beginPath();
          diffCtx.arc(cx, cy, rad, 0, Math.PI * 2);
          diffCtx.fill();
        }

        // Layer 2: Micro Silica Sand Matrix (Tactile physical grain)
        const sandImgData = diffCtx.getImageData(0, 0, size, size);
        const sandPixels = sandImgData.data;
        const sandCount = isMobileDevice ? 70000 : 280000;
        for (let i = 0; i < sandCount; i++) {
          const px = Math.floor(Math.random() * size);
          const py = Math.floor(Math.random() * size);
          const idx = (py * size + px) * 4;
          const delta = (Math.random() - 0.5) * 38;
          sandPixels[idx] = Math.max(0, Math.min(255, sandPixels[idx] + delta));
          sandPixels[idx + 1] = Math.max(0, Math.min(255, sandPixels[idx + 1] + delta));
          sandPixels[idx + 2] = Math.max(0, Math.min(255, sandPixels[idx + 2] + delta));

          heightData[py * size + px] += (Math.random() - 0.5) * 0.06;
        }
        diffCtx.putImageData(sandImgData, 0, 0);

        // Layer 3: High-Density Gritty Mineral Aggregate Spots (Basalt, Quartz, Limestone)
        const mineralCount = isMobileDevice ? 9000 : 35000;
        for (let i = 0; i < mineralCount; i++) {
          const x = Math.floor(Math.random() * size);
          const y = Math.floor(Math.random() * size);
          const r = Math.random() * 2.6 + 0.5;
          const mineralType = Math.random();

          let stoneR = 75, stoneG = 74, stoneB = 78;
          let roughnessVal = 130;

          if (mineralType < 0.35) {
            // Dark basalt rock fragment
            const b = Math.floor(Math.random() * 25 + 40);
            stoneR = b; stoneG = b - 2; stoneB = b + 3;
            roughnessVal = 90;
          } else if (mineralType < 0.65) {
            // Crystalline quartz / granite speck (specular highlight)
            const q = Math.floor(Math.random() * 45 + 175);
            stoneR = q; stoneG = q - 3; stoneB = q - 6;
            roughnessVal = 80;
          } else {
            // Earthy limestone / gravel fleck
            const l = Math.floor(Math.random() * 30 + 115);
            stoneR = l; stoneG = l + 2; stoneB = l - 2;
            roughnessVal = 150;
          }

          // Irregular mineral shape (organic jitter, not a smooth circle)
          diffCtx.fillStyle = `rgb(${stoneR},${stoneG},${stoneB})`;
          diffCtx.beginPath();
          const sides = 5 + Math.floor(Math.random() * 3);
          for (let s = 0; s < sides; s++) {
            const ang = (s / sides) * Math.PI * 2;
            const rad = r * (0.7 + Math.random() * 0.6);
            const px = x + Math.cos(ang) * rad;
            const py = y + Math.sin(ang) * rad;
            if (s === 0) diffCtx.moveTo(px, py);
            else diffCtx.lineTo(px, py);
          }
          diffCtx.closePath();
          diffCtx.fill();

          roughCtx.fillStyle = `rgb(${roughnessVal},${roughnessVal},${roughnessVal})`;
          roughCtx.beginPath();
          roughCtx.arc(x, y, r, 0, Math.PI * 2);
          roughCtx.fill();

          const idx = y * size + x;
          heightData[idx] += 0.14;
        }

        // Layer 4: RUGGED CONCRETE DENTS & CRATERS (Irregular chiseled cavities, NOT round circles)
        // Helper to draw an irregular, jagged dent with depth and highlight rim
        const drawCraggyDent = (cx: number, cy: number, baseR: number, depth: number) => {
          const numVerts = 10;
          const points: { x: number; y: number; r: number }[] = [];
          for (let v = 0; v < numVerts; v++) {
            const angle = (v / numVerts) * Math.PI * 2;
            const r = baseR * (0.65 + Math.random() * 0.7); // Jagged, irregular radius
            points.push({
              x: cx + Math.cos(angle) * r,
              y: cy + Math.sin(angle) * r,
              r,
            });
          }

          // Draw dark recessed cavity interior on diffuse
          diffCtx.save();
          diffCtx.beginPath();
          diffCtx.moveTo(points[0].x, points[0].y);
          for (let v = 1; v < numVerts; v++) diffCtx.lineTo(points[v].x, points[v].y);
          diffCtx.closePath();
          const darkTone = Math.floor(Math.random() * 18 + 28);
          diffCtx.fillStyle = `rgb(${darkTone}, ${darkTone - 1}, ${darkTone + 3})`;
          diffCtx.fill();

          // Chipped stone rim highlight (raking light catches the fractured lip!)
          diffCtx.strokeStyle = 'rgba(225, 225, 235, 0.45)';
          diffCtx.lineWidth = Math.max(1, baseR * 0.22);
          diffCtx.stroke();
          diffCtx.restore();

          // Carve depth into heightfield with falloff
          const maxR = Math.ceil(baseR * 1.3);
          for (let dy = -maxR; dy <= maxR; dy++) {
            for (let dx = -maxR; dx <= maxR; dx++) {
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist <= baseR) {
                const px = Math.floor((cx + dx + size) % size);
                const py = Math.floor((cy + dy + size) % size);
                const falloff = 1 - dist / baseR;
                heightData[py * size + px] -= depth * falloff;
              }
            }
          }

          // Ambient occlusion inside cavity
          aoCtx.fillStyle = 'rgba(0, 0, 0, 0.65)';
          aoCtx.beginPath();
          aoCtx.arc(cx, cy, baseR * 1.1, 0, Math.PI * 2);
          aoCtx.fill();
        };

        // Large prominent chiseled dents & surface pockets
        const dentCount = isMobileDevice ? 90 : 350;
        for (let i = 0; i < dentCount; i++) {
          const cx = Math.floor(Math.random() * size);
          const cy = Math.floor(Math.random() * size);
          const baseR = Math.random() * (isMobileDevice ? 4.5 : 8) + 2.0;
          drawCraggyDent(cx, cy, baseR, 0.55);
        }

        // Medium air void pockets & pits (rugged bug holes across the surface)
        const bugholeCount = isMobileDevice ? 700 : 2800;
        for (let i = 0; i < bugholeCount; i++) {
          const cx = Math.floor(Math.random() * size);
          const cy = Math.floor(Math.random() * size);
          const baseR = Math.random() * (isMobileDevice ? 2.0 : 3.2) + 1.0;
          drawCraggyDent(cx, cy, baseR, 0.35);
        }

        // Honeycomb Rock Pockets (Clusters of exposed coarse gravel with deep crevices)
        const honeycombCount = isMobileDevice ? 8 : 25;
        for (let h = 0; h < honeycombCount; h++) {
          const hx = Math.floor(Math.random() * size);
          const hy = Math.floor(Math.random() * size);
          const clusterRadius = Math.random() * (isMobileDevice ? 20 : 35) + 12;
          const rockCount = Math.floor(Math.random() * (isMobileDevice ? 10 : 20) + 6);

          for (let r = 0; r < rockCount; r++) {
            const rx = hx + (Math.random() - 0.5) * clusterRadius * 2;
            const ry = hy + (Math.random() - 0.5) * clusterRadius * 2;
            const rockR = Math.random() * (isMobileDevice ? 2.5 : 4) + 1.0;
            drawCraggyDent(rx, ry, rockR, 0.45);
          }
        }

        // Layer 5: Vertical Hydration Flow & Curing Streaks (Subtle water drainage marks)
        const streakCount = isMobileDevice ? 25 : 65;
        for (let s = 0; s < streakCount; s++) {
          const sx = Math.random() * size;
          const alpha = Math.random() * 0.08 + 0.02;
          const isDarkStreak = Math.random() > 0.45;
          diffCtx.strokeStyle = isDarkStreak
            ? `rgba(28, 26, 32, ${alpha})`
            : `rgba(235, 235, 240, ${alpha * 0.7})`;
          diffCtx.lineWidth = Math.random() * 6 + 2;
          diffCtx.beginPath();
          diffCtx.moveTo(sx, 0);
          diffCtx.lineTo(sx + (Math.random() - 0.5) * 8, size);
          diffCtx.stroke();
        }

        // Layer 6: Authentic Vertical Formwork Seams (Two vertical mold joint lines at 0 and size/2)
        for (const seamX of [0, Math.floor(size / 2)]) {
          diffCtx.strokeStyle = 'rgba(25, 25, 30, 0.5)';
          diffCtx.lineWidth = 2.5;
          diffCtx.beginPath();
          diffCtx.moveTo(seamX, 0);
          diffCtx.lineTo(seamX, size);
          diffCtx.stroke();

          diffCtx.strokeStyle = 'rgba(230, 230, 235, 0.25)';
          diffCtx.lineWidth = 1.5;
          diffCtx.beginPath();
          diffCtx.moveTo(seamX + 2, 0);
          diffCtx.lineTo(seamX + 2, size);
          diffCtx.stroke();

          for (let y = 0; y < size; y++) {
            heightData[y * size + seamX] += 0.16;
            const px = (seamX - 1 + size) % size;
            heightData[y * size + px] -= 0.12;
          }
        }

        // Layer 7: DENTED HORIZONTAL LINES (Chiseled, recessed formwork grooves with chipped spalls)
        const seamCount = 3;
        const seamStep = Math.floor(size / seamCount);

        for (let s = 1; s <= seamCount; s++) {
          const baseSeamY = s * seamStep - Math.floor(seamStep / 2);
          const seamWidth = 12;

          // 1. Carve rugged wavy V-groove dent into heightfield
          for (let x = 0; x < size; x++) {
            const wave = Math.sin(x * 0.035) * 3.2 + Math.cos(x * 0.075) * 1.8;
            const seamY = Math.round(baseSeamY + wave);

            const isChipped = Math.random() < 0.06; // Frequent broken spalls along seam
            const localDepth = isChipped ? 0.90 : 0.65;
            const localWidth = isChipped ? seamWidth * 2.0 : seamWidth;
            const halfW = Math.ceil(localWidth / 2);

            for (let dy = -halfW; dy <= halfW; dy++) {
              const py = (seamY + dy + size) % size;
              const distNorm = Math.abs(dy) / halfW;
              const profile = Math.cos(distNorm * (Math.PI / 2));
              heightData[py * size + x] -= localDepth * profile;
            }
          }

          // 2. Weathered dark groove shadow on diffuse
          diffCtx.save();
          diffCtx.strokeStyle = 'rgba(24, 22, 28, 0.85)';
          diffCtx.lineWidth = 5;
          diffCtx.beginPath();
          for (let x = 0; x < size; x++) {
            const wave = Math.sin(x * 0.035) * 3.2 + Math.cos(x * 0.075) * 1.8;
            const seamY = baseSeamY + wave;
            if (x === 0) diffCtx.moveTo(x, seamY);
            else diffCtx.lineTo(x, seamY);
          }
          diffCtx.stroke();

          // 3. Highlighted chipped stone lip (raking sun catches the lower edge)
          diffCtx.strokeStyle = 'rgba(235, 235, 245, 0.45)';
          diffCtx.lineWidth = 2.5;
          diffCtx.beginPath();
          for (let x = 0; x < size; x++) {
            const wave = Math.sin(x * 0.035) * 3.2 + Math.cos(x * 0.075) * 1.8;
            const seamY = baseSeamY + wave + 4;
            if (x === 0) diffCtx.moveTo(x, seamY);
            else diffCtx.lineTo(x, seamY);
          }
          diffCtx.stroke();
          diffCtx.restore();

          // 4. Contact AO shadow inside the dented line
          aoCtx.strokeStyle = 'rgba(0, 0, 0, 0.75)';
          aoCtx.lineWidth = 8;
          aoCtx.beginPath();
          for (let x = 0; x < size; x++) {
            const wave = Math.sin(x * 0.035) * 3.2 + Math.cos(x * 0.075) * 1.8;
            const seamY = baseSeamY + wave;
            if (x === 0) aoCtx.moveTo(x, seamY);
            else aoCtx.lineTo(x, seamY);
          }
          aoCtx.stroke();

          // 5. Irregular broken spall dents clustered along the horizontal seam line
          for (let c = 0; c < 35; c++) {
            const cx = Math.floor(Math.random() * size);
            const wave = Math.sin(cx * 0.035) * 3.2 + Math.cos(cx * 0.075) * 1.8;
            const cy = Math.round(baseSeamY + wave + (Math.random() - 0.5) * 8);
            drawCraggyDent(cx, cy, Math.random() * 6 + 3, 0.65);
          }
        }
      }

      // --- Compute True Tangent-Space Normal Map from Heightfield ---
      const normalCanvas = document.createElement('canvas');
      normalCanvas.width = size;
      normalCanvas.height = size;
      const normalCtx = normalCanvas.getContext('2d');
      if (normalCtx) {
        const imgData = normalCtx.createImageData(size, size);
        const data = imgData.data;
        const bumpStrength = 7.5; // High bump strength for rugged, tangible 3D relief

        for (let y = 0; y < size; y++) {
          const yPrev = (y - 1 + size) % size;
          const yNext = (y + 1) % size;

          for (let x = 0; x < size; x++) {
            const xPrev = (x - 1 + size) % size;
            const xNext = (x + 1) % size;

            // Central difference gradient
            const dx = (heightData[y * size + xNext] - heightData[y * size + xPrev]) * bumpStrength;
            const dy = (heightData[yNext * size + x] - heightData[yPrev * size + x]) * bumpStrength;

            // Normalized normal vector: (-dx, -dy, 1.0)
            const len = Math.sqrt(dx * dx + dy * dy + 1.0);
            const nx = -dx / len;
            const ny = -dy / len;
            const nz = 1.0 / len;

            const idx = (y * size + x) * 4;
            data[idx] = Math.floor((nx * 0.5 + 0.5) * 255);
            data[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
            data[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
            data[idx + 3] = 255;
          }
        }
        normalCtx.putImageData(imgData, 0, 0);
      }

      // Create Three.js Textures with Maximum Anisotropic Filtering for Razor-Sharp Curved Rendering
      const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

      const diffTexture = new THREE.CanvasTexture(diffCanvas);
      diffTexture.wrapS = THREE.RepeatWrapping;
      diffTexture.wrapT = THREE.RepeatWrapping;
      diffTexture.repeat.set(2, 6);
      diffTexture.anisotropy = maxAnisotropy;

      const normalTexture = new THREE.CanvasTexture(normalCanvas);
      normalTexture.wrapS = THREE.RepeatWrapping;
      normalTexture.wrapT = THREE.RepeatWrapping;
      normalTexture.repeat.set(2, 6);
      normalTexture.anisotropy = maxAnisotropy;

      const roughTexture = new THREE.CanvasTexture(roughCanvas);
      roughTexture.wrapS = THREE.RepeatWrapping;
      roughTexture.wrapT = THREE.RepeatWrapping;
      roughTexture.repeat.set(2, 6);
      roughTexture.anisotropy = maxAnisotropy;

      const aoTexture = new THREE.CanvasTexture(aoCanvas);
      aoTexture.wrapS = THREE.RepeatWrapping;
      aoTexture.wrapT = THREE.RepeatWrapping;
      aoTexture.repeat.set(2, 6);
      aoTexture.anisotropy = maxAnisotropy;

      return { diffTexture, normalTexture, roughTexture, aoTexture };
    };

    const { diffTexture, normalTexture, roughTexture, aoTexture } = createRuggedConcreteTextures();

    // 4. Photorealistic Physical Material with Deep Normal & AO Mapping for Rugged Relief
    const concreteMaterial = new THREE.MeshStandardMaterial({
      map: diffTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(3.5, 3.5), // High normal scale for deep tactile dents and cavities
      roughnessMap: roughTexture,
      aoMap: aoTexture,
      aoMapIntensity: 1.35,
      roughness: 0.88,
      metalness: 0.04,
    });

    // 5. Build the Rugged 3D Monolithic Concrete Column
    const pillarGroup = new THREE.Group();
    pillarGroupRef.current = pillarGroup;

    const columnHeight = 85;
    const columnRadius = 2.2;
    const radialSegments = 128;

    // Rugged Cylindrical Shaft with Physical Casting Waviness, Dents & Recessed Horizontal Lines
    const cylinderGeo = new THREE.CylinderGeometry(
      columnRadius,
      columnRadius,
      columnHeight,
      radialSegments,
      160,
      false
    );

    // Apply subtle physical casting waviness, dents, and recessed horizontal lines to the vertices
    const posAttr = cylinderGeo.attributes.position;
    const jointSpacing = 5.5; // Recessed horizontal joint grooves every 5.5 units vertically
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      const angle = Math.atan2(x, z);
      const currentRadius = Math.sqrt(x * x + z * z);
      if (currentRadius > 0.1) {
        // Recessed horizontal joint dent
        const distToJoint = Math.abs(((y % jointSpacing) + jointSpacing * 1.5) % jointSpacing - jointSpacing * 0.5);
        let jointDent = 0;
        if (distToJoint < 0.26) {
          jointDent = -0.045 * Math.cos((distToJoint / 0.26) * (Math.PI / 2));
        }

        const castingWaviness =
          Math.sin(angle * 5 + y * 0.35) * 0.024 +
          Math.cos(angle * 9 - y * 0.6) * 0.016 +
          Math.sin(angle * 15 + y * 1.1) * 0.01;

        const newRadius = currentRadius + castingWaviness + jointDent;
        posAttr.setX(i, (x / currentRadius) * newRadius);
        posAttr.setZ(i, (z / currentRadius) * newRadius);
      }
    }
    cylinderGeo.computeVertexNormals();

    // Duplicate UV for Ambient Occlusion (aoMap)
    cylinderGeo.setAttribute('uv2', cylinderGeo.attributes.uv);

    const mainPillar = new THREE.Mesh(cylinderGeo, concreteMaterial);
    pillarGroup.add(mainPillar);

    // 5b. Helper: compute the exact concrete surface radius for any angle & vertical position Y
    const getPillarRadiusAt = (angle: number, y: number, includeGroove: boolean = true): number => {
      let jointDent = 0;
      if (includeGroove) {
        const distToJoint = Math.abs(((y % jointSpacing) + jointSpacing * 1.5) % jointSpacing - jointSpacing * 0.5);
        if (distToJoint < 0.26) {
          jointDent = -0.045 * Math.cos((distToJoint / 0.26) * (Math.PI / 2));
        }
      }

      const castingWaviness =
        Math.sin(angle * 5 + y * 0.35) * 0.024 +
        Math.cos(angle * 9 - y * 0.6) * 0.016 +
        Math.sin(angle * 15 + y * 1.1) * 0.01;

      return columnRadius + castingWaviness + jointDent;
    };

    // Helper: Conform any cylindrical geometry to follow the exact bumps of the pillar with guaranteed positive clearance
    const conformToPillarSurface = (
      geo: THREE.BufferGeometry,
      elevationY: number,
      radialClearance: number,
      includeGroove: boolean = true
    ) => {
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);
        const angle = Math.atan2(x, z);
        const yWorld = y + elevationY;
        const targetR = getPillarRadiusAt(angle, yWorld, includeGroove) + radialClearance;

        pos.setX(i, Math.sin(angle) * targetR);
        pos.setZ(i, Math.cos(angle) * targetR);
      }
      geo.computeVertexNormals();
    };

    // Attach Authentic Project Wheatpastes, Vinyl Stickers & Graffitis onto Pillar Surface
    const posterMeshes: THREE.Mesh[] = [];

    PILLAR_PROJECT_ARTWORKS.forEach((art) => {
      // 1. Curved Main Poster Mesh
      const posterTex = PillarTextureFactory.createPosterTexture(art);
      const deltaTheta = art.width / columnRadius;
      const thetaStart = art.angleRad - deltaTheta / 2;

      // 48 radial segments and 32 vertical segments so it smoothly hugs every single wave and dent
      const posterGeo = new THREE.CylinderGeometry(
        columnRadius,
        columnRadius,
        art.height,
        48,
        32,
        true,
        thetaStart,
        deltaTheta
      );
      conformToPillarSurface(posterGeo, art.elevationY, 0.095);

      const posterMat = new THREE.MeshStandardMaterial({
        map: posterTex,
        roughness: 0.82,
        metalness: 0.02,
        transparent: true,
        depthWrite: false, // Prevents depth-buffer self-clipping
        depthTest: true,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -8,
        side: THREE.FrontSide, // Outward facing only
      });

      const posterMesh = new THREE.Mesh(posterGeo, posterMat);
      posterMesh.position.y = art.elevationY;
      posterMesh.userData = { projectId: art.projectId, isPoster: true };
      pillarGroup.add(posterMesh);
      posterMeshes.push(posterMesh);

      // 2. Vinyl Stickers (Offset above poster with 2D rotated texture)
      art.stickers.forEach((stk) => {
        const stkTex = PillarTextureFactory.createStickerTexture(stk.text, stk.bg, stk.fg, stk.rotation);
        const stkDeltaTheta = stk.width / columnRadius;
        const stkCenterAngle = art.angleRad + stk.offsetX / columnRadius;
        const stkThetaStart = stkCenterAngle - stkDeltaTheta / 2;

        const stkGeo = new THREE.CylinderGeometry(
          columnRadius,
          columnRadius,
          stk.height,
          24,
          8,
          true,
          stkThetaStart,
          stkDeltaTheta
        );
        conformToPillarSurface(stkGeo, art.elevationY + stk.offsetY, 0.135);

        const stkMat = new THREE.MeshStandardMaterial({
          map: stkTex,
          roughness: 0.35, // Glossy vinyl feel
          metalness: 0.1,
          transparent: true,
          depthWrite: false,
          depthTest: true,
          polygonOffset: true,
          polygonOffsetFactor: -6,
          polygonOffsetUnits: -12,
          side: THREE.FrontSide,
        });

        const stkMesh = new THREE.Mesh(stkGeo, stkMat);
        stkMesh.position.y = art.elevationY + stk.offsetY;
        stkMesh.userData = { projectId: art.projectId };
        pillarGroup.add(stkMesh);
      });

      // Posters have stickers attached
    });

    // 3. Evenly Distributed Street Graffitis across the 3D Concrete Pillar (Bare Concrete, Flush)
    PILLAR_GRAFFITI_ARTWORKS.forEach((graf) => {
      const grafTex = PillarTextureFactory.createGraffitiTexture(graf.text, graf.color, {
        style: graf.style,
        hasUnderline: graf.hasUnderline,
        hasDrips: graf.hasDrips,
        rotation: graf.rotation ?? 0,
      });

      const grafW = 2.7 * graf.scale;
      const grafH = 1.35 * graf.scale;
      const grafDeltaTheta = grafW / columnRadius;
      const grafThetaStart = graf.angleRad - grafDeltaTheta / 2;

      const grafGeo = new THREE.CylinderGeometry(
        columnRadius,
        columnRadius,
        grafH,
        48,
        20,
        true,
        grafThetaStart,
        grafDeltaTheta
      );

      // Conforms to organic casting waviness without dipping below concrete faces at joint lines
      conformToPillarSurface(grafGeo, graf.elevationY, 0.042, false);

      const grafMat = new THREE.MeshStandardMaterial({
        map: grafTex,
        roughness: 1.0, // Matte chalky aerosol spray
        metalness: 0.0,
        transparent: true,
        opacity: 0.98,
        depthWrite: false,
        depthTest: true,
        polygonOffset: true,
        polygonOffsetFactor: -6,
        polygonOffsetUnits: -12,
        side: THREE.FrontSide,
      });

      const grafMesh = new THREE.Mesh(grafGeo, grafMat);
      grafMesh.position.y = graf.elevationY;
      pillarGroup.add(grafMesh);
    });

    posterMeshesRef.current = posterMeshes;

    scene.add(pillarGroup);

    // 6. Seamless Organic Architectural Lighting Setup (Smooth Curvature Gradient Wrap)
    // Ambient Hemisphere Light (Smooth, seamless sky vs ground bounce that wraps naturally around the cylinder)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x6e6c66, 0.60);
    hemiLightRef.current = hemiLight;
    scene.add(hemiLight);

    // Primary Sunlight (Positioned with sufficient front-wrap so shadows roll seamlessly across the curve with NO straight lines)
    const sunLight = new THREE.DirectionalLight(0xfff6ea, 2.7);
    sunLight.position.set(14, 16, 13);
    sunLightRef.current = sunLight;
    scene.add(sunLight);

    // Soft Wrap Fill Light (Gently bridges the light and shadow side to ensure a smooth, continuous gradient)
    const bounceLight = new THREE.DirectionalLight(0xdcd8d0, 0.42);
    bounceLight.position.set(-10, 4, 12);
    bounceLightRef.current = bounceLight;
    scene.add(bounceLight);

    // Architectural Edge Rim Light (Soft silhouette definition)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.72);
    rimLight.position.set(-16, 12, 10);
    rimLightRef.current = rimLight;
    scene.add(rimLight);

    // Nocturnal Night Lights
    const moonLight = new THREE.DirectionalLight(0x38bdf8, 0.0);
    moonLight.position.set(-14, 24, 10);
    moonLightRef.current = moonLight;
    scene.add(moonLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.0, 40, Math.PI / 4, 0.35);
    spotLight.position.set(-2, -6, 16);
    spotLight.target = pillarGroup;
    spotLightRef.current = spotLight;
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0x38bdf8, 0.0, 35, Math.PI / 4, 0.4);
    spotLight2.position.set(3, -6, 15);
    spotLight2.target = pillarGroup;
    spotLight2Ref.current = spotLight2;
    scene.add(spotLight2);

    // 7. Resize Handler
    const onResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', onResize);

    // 8. Render Loop with Dynamic Day-to-Night Progression & Drag-to-Spin Interaction
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;

    // Interactive Drag to Spin and Scroll with the Pillar
    const drag = {
      isDragging: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      velocity: 0,
      velocityY: 0,
      manualRotation: 0,
      lastTime: 0,
    };

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();
    let downX = 0;
    let downY = 0;
    let downTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Allow drag unless clicking directly on interactive UI controls
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, input, textarea, select, [role="button"], .interactive-ui')) {
        return;
      }

      drag.isDragging = true;
      drag.startX = e.clientX;
      drag.startY = e.clientY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.velocity = 0;
      drag.velocityY = 0;
      drag.lastTime = performance.now();
      downX = e.clientX;
      downY = e.clientY;
      downTime = performance.now();
      document.body.style.userSelect = 'none';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.isDragging) return;

      const now = performance.now();
      const dt = Math.max(8, now - drag.lastTime);
      drag.lastTime = now;

      const deltaX = e.clientX - drag.lastX;
      const deltaY = e.clientY - drag.lastY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;

      // 1. Horizontal Spin: dragging across screen spins ~360 degrees (2 * PI)
      const sensitivity = (Math.PI * 2.4) / Math.max(300, window.innerWidth);
      const rotDelta = deltaX * sensitivity;

      drag.manualRotation += rotDelta;

      // Smooth velocity for realistic momentum fling
      const frameVel = (rotDelta / dt) * 16;
      drag.velocity = drag.velocity * 0.3 + frameVel * 0.7;

      // 2. Vertical Drag to Control Site Scroll with the Pillar (Calibrated for slow, heavy concrete weight)
      if (onScrollByRef.current && !focusedProjectRef.current) {
        // Reduced ratio (0.85) for calm, controlled, monumental movement
        const scrollDelta = -deltaY * 0.85;
        onScrollByRef.current(scrollDelta, true);

        const frameScrollVel = (-deltaY / dt) * 16 * 0.85;
        drag.velocityY = drag.velocityY * 0.35 + frameScrollVel * 0.65;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (drag.isDragging) {
        drag.isDragging = false;
        document.body.style.userSelect = '';
        // Cap max release velocity so it spins gracefully without teleporting
        const maxVel = 0.22;
        if (Math.abs(drag.velocity) > maxVel) {
          drag.velocity = Math.sign(drag.velocity) * maxVel;
        }

        // Apply gentle vertical scroll fling momentum when released
        if (onScrollByRef.current && !focusedProjectRef.current && Math.abs(drag.velocityY) > 1.8) {
          const flingAmount = Math.sign(drag.velocityY) * Math.min(Math.abs(drag.velocityY) * 8, 260);
          onScrollByRef.current(flingAmount, false);
        }

        // Quick click detection for leaving or selecting poster
        const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
        const dur = performance.now() - downTime;
        if (dist < 12 && dur < 450 && onSelectProjectRef.current) {
          // If already zoomed in on a poster:
          // Clicking again (whether on the poster, pillar, or background) LEAVES the poster!
          if (focusedProjectRef.current) {
            onSelectProjectRef.current(null);
            return;
          }

          // Otherwise, raycast onto poster meshes on the pillar to zoom in
          if (posterMeshesRef.current.length > 0) {
            mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            const intersects = raycaster.intersectObjects(posterMeshesRef.current, false);
            if (intersects.length > 0) {
              const hit = intersects[0];
              const hitProjId = hit.object.userData?.projectId;
              if (hitProjId) {
                onSelectProjectRef.current(hitProjId);
              }
            }
          }
        }
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    container.addEventListener('contextmenu', onContextMenu);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const progress = scrollRef.current;
      const alignment = alignmentRef.current;
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      const isMobile = window.innerWidth < 1024;
      const isPhone = window.innerWidth < 768 || aspect < 0.85;
      const focusedId = focusedProjectRef.current;

      if (focusedId) {
        // Find corresponding artwork
        const art = PILLAR_PROJECT_ARTWORKS.find((a) => a.projectId === focusedId || (focusedId && (focusedId.includes(a.projectId) || a.projectId.includes(focusedId))));
        if (art) {
          // Dynamic camera distance Z:
          // On mobile phones, the bottom sheet takes the bottom ~50% of the screen.
          // Compute targetCamZ so the 2.1 unit poster fits horizontally with comfortable breathing room:
          let targetCamZ = 5.8;
          let targetY = -art.elevationY;

          if (isPhone) {
            const halfFovRad = (35 / 2) * (Math.PI / 180);
            targetCamZ = Math.max(8.8, 3.1 / (2 * Math.tan(halfFovRad) * aspect));
            // Shift poster upwards into top half of screen above mobile bottom sheet
            targetY = -art.elevationY - 1.25;
          } else if (isMobile) {
            targetCamZ = 6.8;
          }

          camera.position.z += (targetCamZ - camera.position.z) * 0.055;
          camera.position.x += (0 - camera.position.x) * 0.055;
          camera.position.y += (0 - camera.position.y) * 0.055;

          // Center pillar horizontally
          currentX += (0 - currentX) * 0.055;

          // Bring poster to eye level
          currentY += (targetY - currentY) * 0.055;

          // Face the poster directly towards camera + subtle mouse parallax
          const targetRotY = -art.angleRad + mouseRef.current.x * 0.06;
          if (pillarGroupRef.current) {
            pillarGroupRef.current.position.x = currentX;
            pillarGroupRef.current.position.y = currentY;
            pillarGroupRef.current.rotation.y += (targetRotY - pillarGroupRef.current.rotation.y) * 0.065;
          }
        } else {
          // Project does not have a 3D poster yet - maintain calm, centered column presentation
          const defaultCamZ = isPhone ? 20.0 : 16.0;
          camera.position.z += (defaultCamZ - camera.position.z) * 0.055;
          camera.position.x += (0 - camera.position.x) * 0.055;
          camera.position.y += (0 - camera.position.y) * 0.055;
          currentX += (0 - currentX) * 0.055;
          if (pillarGroupRef.current) {
            pillarGroupRef.current.position.x = currentX;
          }
        }
      } else {
        // Normal camera distance: dynamically adapted for mobile portrait framing
        let defaultCamZ = 19.5;
        if (isPhone) {
          defaultCamZ = 22.8; // Gracefully frame pillar on narrow mobile screens
        }
        camera.position.z += (defaultCamZ - camera.position.z) * 0.045;
        camera.position.x += (0 - camera.position.x) * 0.045;
        camera.position.y += (0 - camera.position.y) * 0.045;

        // Target X positioning
        let targetX = 0;
        if (!isMobile) {
          if (alignment === 'right') targetX = 4.8;
          if (alignment === 'left') targetX = -4.8;
        } else if (!isPhone) {
          if (alignment === 'right') targetX = 2.0;
          if (alignment === 'left') targetX = -2.0;
        } else {
          // On mobile phones: subtle offset (0.85) so pillar remains 100% on screen
          if (alignment === 'right') targetX = 0.85;
          if (alignment === 'left') targetX = -0.85;
        }

        // Slow, heavy architectural mass lerp: majestic, continuous glide across the screen
        currentX += (targetX - currentX) * 0.022;

        // Descend along the round pillar with smooth momentum
        const targetY = (progress - 0.5) * 26;
        currentY += (targetY - currentY) * 0.035;

        // Rotational momentum & deceleration when released
        if (!drag.isDragging) {
          drag.manualRotation += drag.velocity;
          drag.velocity *= 0.948; // Smooth architectural turntable friction
          if (Math.abs(drag.velocity) < 0.00003) {
            drag.velocity = 0;
          }
        }

        if (pillarGroupRef.current) {
          pillarGroupRef.current.position.x = currentX;
          pillarGroupRef.current.position.y = currentY;

          // Continuous scroll spin + mouse parallax + USER INTERACTIVE DRAG TO SPIN!
          const scrollSpin = progress * Math.PI * 4;
          const targetRotY = scrollSpin + mouseRef.current.x * 0.15 + drag.manualRotation;
          pillarGroupRef.current.rotation.y += (targetRotY - pillarGroupRef.current.rotation.y) * 0.08;
        }
      }

      // Dynamic Day-to-Night Sun Motion & Smooth Continuous Color Transitions
      if (sunLightRef.current && hemiLightRef.current && rimLightRef.current && bounceLightRef.current && moonLightRef.current && spotLightRef.current && spotLight2Ref.current) {
        // Continuous Sun Arc across the sky
        const sunAngle = progress * Math.PI * 0.92;
        const sunX = 18 * Math.cos(sunAngle);
        const sunY = Math.max(4, 24 * Math.sin(sunAngle));
        const sunZ = 13 + Math.cos(sunAngle) * 3; // Front-quarter wrap ensures seamless shadow roll-off (NO straight lines)
        sunLightRef.current.position.set(sunX, sunY, sunZ);

        // Pre-defined color stops for gentle, continuous warming
        const colMorning = new THREE.Color(0xfff6ea);
        const colMidday = new THREE.Color(0xffffff);
        const colAfternoon = new THREE.Color(0xfff2dc); // Gentle warm champagne
        const colGolden = new THREE.Color(0xfcd385);    // Soft golden hour sun
        const colTwilight = new THREE.Color(0xb45309);  // Fading twilight ember

        if (progress < 0.25) {
          // Morning white -> Midday neutral white (Seamless, moodier organic gradient)
          const t = progress / 0.25;
          sunLightRef.current.color.lerpColors(colMorning, colMidday, t);
          sunLightRef.current.intensity = 2.7 - t * 0.1;

          hemiLightRef.current.color.setHex(0xffffff);
          hemiLightRef.current.groundColor.setHex(0x6e6c66);
          hemiLightRef.current.intensity = 0.60;

          bounceLightRef.current.intensity = 0.42;
          bounceLightRef.current.color.setHex(0xdcd8d0);

          rimLightRef.current.intensity = 0.72;
          rimLightRef.current.color.setHex(0xe4e4e7);

          moonLightRef.current.intensity = 0;
          spotLightRef.current.intensity = 0;
          spotLight2Ref.current.intensity = 0;
        } else if (progress < 0.48) {
          // Midday neutral white -> Gentle warm champagne
          const t = (progress - 0.25) / 0.23;
          sunLightRef.current.color.lerpColors(colMidday, colAfternoon, t);
          sunLightRef.current.intensity = 2.65;

          hemiLightRef.current.color.setHex(0xfafaf8);
          hemiLightRef.current.groundColor.setHex(0x66645e);
          hemiLightRef.current.intensity = 0.56;

          bounceLightRef.current.intensity = 0.40;
          bounceLightRef.current.color.setHex(0xe0dad0);

          rimLightRef.current.intensity = 0.72;

          moonLightRef.current.intensity = 0;
          spotLightRef.current.intensity = 0;
          spotLight2Ref.current.intensity = 0;
        } else if (progress < 0.72) {
          // Gentle champagne -> Soft golden hour (Subtle, warm, continuous gradient)
          const t = (progress - 0.48) / 0.24;
          sunLightRef.current.color.lerpColors(colAfternoon, colGolden, t);
          sunLightRef.current.intensity = 2.65 + t * 0.2;

          // Sky fill gently warms into dusk lavender
          const skyDusk = new THREE.Color(0xfafaf8).lerp(new THREE.Color(0x6e527a), t);
          const gndDusk = new THREE.Color(0x66645e).lerp(new THREE.Color(0x2e201a), t);
          hemiLightRef.current.color.copy(skyDusk);
          hemiLightRef.current.groundColor.copy(gndDusk);
          hemiLightRef.current.intensity = 0.56 - t * 0.08;

          // Warm rim highlight
          const rimCol = new THREE.Color(0xe4e4e7).lerp(new THREE.Color(0xfcd385), t);
          rimLightRef.current.color.copy(rimCol);
          rimLightRef.current.intensity = 0.72 + t * 0.25;

          // Warm subtle wrap bounce
          const bncCol = new THREE.Color(0xe0dad0).lerp(new THREE.Color(0xf6cf9f), t);
          bounceLightRef.current.color.copy(bncCol);
          bounceLightRef.current.intensity = 0.40 + t * 0.05;

          moonLightRef.current.intensity = 0;
          spotLightRef.current.intensity = 0;
          spotLight2Ref.current.intensity = 0;
        } else if (progress < 0.85) {
          // LEVEL 03: Golden hour -> Sunset into Twilight Dusk
          const t = (progress - 0.70) / 0.15;
          sunLightRef.current.color.lerpColors(colGolden, colTwilight, t);
          sunLightRef.current.intensity = Math.max(0, (1 - t) * 2.85);

          hemiLightRef.current.color.lerpColors(new THREE.Color(0x6e527a), new THREE.Color(0x1a2234), t);
          hemiLightRef.current.groundColor.lerpColors(new THREE.Color(0x2e201a), new THREE.Color(0x0a0c12), t);
          hemiLightRef.current.intensity = 0.48 - t * 0.18;

          // Rim light shifts from sunset amber to cool moonlit highlight
          const rimDusk = new THREE.Color(0xfcd385).lerp(new THREE.Color(0x93c5fd), t);
          rimLightRef.current.color.copy(rimDusk);
          rimLightRef.current.intensity = 0.95 - t * 0.40;

          bounceLightRef.current.intensity = 0.45 - t * 0.22;

          // Moonlight and gallery spotlights smoothly power on
          moonLightRef.current.intensity = 0.35 * t;
          spotLightRef.current.intensity = 1.2 * t;
          spotLight2Ref.current.intensity = 0.8 * t;
        } else {
          // LEVEL 04: Nocturnal Midnight (Moonlight + foundation spotlights)
          const t = (progress - 0.85) / 0.15;
          sunLightRef.current.intensity = 0;

          hemiLightRef.current.color.lerpColors(new THREE.Color(0x1a2234), new THREE.Color(0x101522), t);
          hemiLightRef.current.groundColor.lerpColors(new THREE.Color(0x0a0c12), new THREE.Color(0x040508), t);
          hemiLightRef.current.intensity = 0.30 - t * 0.08;

          bounceLightRef.current.intensity = 0.22 - t * 0.10;
          rimLightRef.current.intensity = 0.55 - t * 0.20;

          // Spotlight apex
          moonLightRef.current.intensity = 0.35 + 0.35 * t;
          spotLightRef.current.intensity = 1.2 + 0.8 * t;
          spotLight2Ref.current.intensity = 0.8 + 0.5 * t;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
};
