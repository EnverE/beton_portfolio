import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { brutalistAudio } from '../utils/audio';

interface Monolith3DProps {
  isBlueprint?: boolean;
}

export const Monolith3D: React.FC<Monolith3DProps> = ({ isBlueprint = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [telemetry, setTelemetry] = useState({ rotX: 18, rotY: -32, zoom: 1.0 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const monolithGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(14, 11, 22);
    camera.lookAt(0, 1.5, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Procedural Concrete Texture Generator (Zero external network dependencies)
    const createConcreteTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#4a4a4f';
        ctx.fillRect(0, 0, 512, 512);

        // Add aggregate specks and stippling
        for (let i = 0; i < 45000; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const radius = Math.random() * 1.5 + 0.5;
          const shade = Math.floor(Math.random() * 80 + 30);
          ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Add horizontal board-formed wood seams
        ctx.strokeStyle = 'rgba(20, 20, 22, 0.65)';
        ctx.lineWidth = 3;
        for (let y = 64; y < 512; y += 64) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(512, y);
          ctx.stroke();

          // Subtle highlight below seam
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.beginPath();
          ctx.moveTo(0, y + 2);
          ctx.lineTo(512, y + 2);
          ctx.stroke();
          ctx.strokeStyle = 'rgba(20, 20, 22, 0.65)';
        }
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      return texture;
    };

    const concreteTexture = createConcreteTexture();

    // 5. Monolith Materials
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a595b,
      roughness: 0.88,
      metalness: 0.05,
      map: concreteTexture,
      bumpMap: concreteTexture,
      bumpScale: 0.04,
    });

    const darkConcreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x363538,
      roughness: 0.92,
      metalness: 0.02,
      map: concreteTexture,
      bumpMap: concreteTexture,
      bumpScale: 0.06,
    });

    const titaniumAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5, // Polished Titanium Chrome
      roughness: 0.15,
      metalness: 0.9,
    });

    const blueprintMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      wireframeLinewidth: 1.5,
    });

    materialsRef.current = [concreteMaterial, darkConcreteMaterial, titaniumAccentMaterial, blueprintMaterial];

    // 6. Monolithic Architectural Assembly (Group of Brutalist Slabs & Cantilevers)
    const monolith = new THREE.Group();
    monolithGroupRef.current = monolith;

    // Base podium slab (Heavy foundation)
    const podiumGeo = new THREE.BoxGeometry(11, 1.2, 9);
    const podiumMesh = new THREE.Mesh(podiumGeo, isBlueprint ? blueprintMaterial : darkConcreteMaterial);
    podiumMesh.position.set(0, -1.2, 0);
    podiumMesh.castShadow = true;
    podiumMesh.receiveShadow = true;
    monolith.add(podiumMesh);

    // Primary vertical monolithic tower
    const towerGeo = new THREE.BoxGeometry(4.2, 9.5, 3.8);
    const towerMesh = new THREE.Mesh(towerGeo, isBlueprint ? blueprintMaterial : concreteMaterial);
    towerMesh.position.set(-1.8, 3.8, -0.6);
    towerMesh.castShadow = true;
    towerMesh.receiveShadow = true;
    monolith.add(towerMesh);

    // Cantilevered overhang slab (Gravity-defying brutalist span)
    const cantileverGeo = new THREE.BoxGeometry(8.2, 1.8, 5.0);
    const cantileverMesh = new THREE.Mesh(cantileverGeo, isBlueprint ? blueprintMaterial : concreteMaterial);
    cantileverMesh.position.set(1.5, 5.8, 1.2);
    cantileverMesh.castShadow = true;
    cantileverMesh.receiveShadow = true;
    monolith.add(cantileverMesh);

    // Secondary offset pylon (Counter-weight block)
    const pylonGeo = new THREE.BoxGeometry(3.2, 6.2, 3.2);
    const pylonMesh = new THREE.Mesh(pylonGeo, isBlueprint ? blueprintMaterial : darkConcreteMaterial);
    pylonMesh.position.set(2.8, 2.0, -1.8);
    pylonMesh.castShadow = true;
    pylonMesh.receiveShadow = true;
    monolith.add(pylonMesh);

    // Vertical service shaft / ventilation duct slit
    const shaftGeo = new THREE.BoxGeometry(1.2, 11.2, 1.4);
    const shaftMesh = new THREE.Mesh(shaftGeo, isBlueprint ? blueprintMaterial : concreteMaterial);
    shaftMesh.position.set(-3.2, 4.4, 1.4);
    shaftMesh.castShadow = true;
    shaftMesh.receiveShadow = true;
    monolith.add(shaftMesh);

    // Polished titanium structural accent beam
    const titaniumBeamGeo = new THREE.BoxGeometry(8.4, 0.35, 0.45);
    const titaniumBeamMesh = new THREE.Mesh(titaniumBeamGeo, isBlueprint ? blueprintMaterial : titaniumAccentMaterial);
    titaniumBeamMesh.position.set(1.5, 6.8, 3.75);
    titaniumBeamMesh.castShadow = true;
    monolith.add(titaniumBeamMesh);

    // Tie-rod anchor bolt details (Circular recesses)
    const boltGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16);
    const boltMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6 });
    for (let x of [-3.8, 0, 3.8]) {
      for (let y of [5.2, 6.4]) {
        const bolt = new THREE.Mesh(boltGeo, boltMat);
        bolt.rotation.x = Math.PI / 2;
        bolt.position.set(x, y, 3.75);
        monolith.add(bolt);
      }
    }

    scene.add(monolith);

    // 7. Lighting - Brutalist sharp raking sunlight
    const ambientLight = new THREE.AmbientLight(isBlueprint ? 0x0369a1 : 0x71717a, isBlueprint ? 1.4 : 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    sunLight.position.set(18, 26, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Cold fill light from subterranean angle
    const fillLight = new THREE.DirectionalLight(isBlueprint ? 0x38bdf8 : 0x64748b, 0.9);
    fillLight.position.set(-15, -8, -12);
    scene.add(fillLight);

    // 8. Interaction handling
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      brutalistAudio.playMechanicalClick();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !monolithGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      monolithGroupRef.current.rotation.y += deltaX * 0.008;
      monolithGroupRef.current.rotation.x += deltaY * 0.008;

      // Limit pitch to prevent disorienting flip
      monolithGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.8, monolithGroupRef.current.rotation.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };

      setTelemetry({
        rotX: Math.round((monolithGroupRef.current.rotation.x * 180) / Math.PI),
        rotY: Math.round((monolithGroupRef.current.rotation.y * 180) / Math.PI),
        zoom: 1.0,
      });
    };

    const onMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        brutalistAudio.playConcreteThud();
      }
    };

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !monolithGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      monolithGroupRef.current.rotation.y += deltaX * 0.01;
      monolithGroupRef.current.rotation.x += deltaY * 0.01;
      monolithGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.8, monolithGroupRef.current.rotation.x));

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Render loop with subtle idle drift
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (monolithGroupRef.current && !isDragging.current) {
        monolithGroupRef.current.rotation.y += 0.0025; // Slow monolithic rotation
      }

      renderer.render(scene, camera);
    };
    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      resizeObserver.disconnect();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isBlueprint]);

  const handleResetOrbit = () => {
    if (monolithGroupRef.current) {
      monolithGroupRef.current.rotation.set(0.1, -0.3, 0);
      setTelemetry({ rotX: 6, rotY: -17, zoom: 1.0 });
      brutalistAudio.playConcreteThud();
    }
  };

  return (
    <div className="relative w-full h-[380px] md:h-[480px] lg:h-[520px] concrete-surface border border-zinc-700 select-none overflow-hidden group shadow-[4px_4px_0_#070709]">
      {/* Three.js canvas mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Formwork tie-rod anchors */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-600 shadow-inner" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-600 shadow-inner" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-600 shadow-inner" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-600 shadow-inner" />

      {/* Architectural Telemetry HUD Overlay */}
      <div className="absolute top-4 left-4 pointer-events-none text-xs font-mono tracking-widest text-zinc-400 bg-zinc-950/90 p-2.5 border border-zinc-800 backdrop-blur-xs flex flex-col gap-1">
        <div className="flex items-center gap-2 text-white font-bold">
          <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
          <span>SPATIAL CANVAS // 3D VIEWPORT</span>
        </div>
        <div className="text-[11px] text-zinc-400">ROT-Y: {telemetry.rotY}° | ROT-X: {telemetry.rotX}°</div>
        <div className="text-[10px] text-zinc-500">PRECISION: 120 FPS // DRAG TO ROTATE</div>
      </div>

      {/* Interaction Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2">
        <button
          onClick={handleResetOrbit}
          className="text-[10px] font-mono font-bold bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black px-3 py-1.5 border border-zinc-700 hover:border-white transition-all uppercase tracking-wider shadow-[2px_2px_0px_#070709] cursor-pointer"
        >
          [ALIGN AXIS]
        </button>
      </div>

      {/* Wireframe CAD stamp tag */}
      {isBlueprint && (
        <div className="absolute top-4 right-4 font-mono text-[10px] text-sky-400 bg-sky-950/90 px-2 py-1 border border-sky-600 tracking-wider">
          REBAR CAD WIREFRAME // ACTIVE
        </div>
      )}
    </div>
  );
};
