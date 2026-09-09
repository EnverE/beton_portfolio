import React, { useEffect, useRef } from 'react';

export interface ClownfishCompanionProps {
  onEmitBubble?: (x: number, y: number) => void;
  onWaterWake?: (x: number, y: number, speed: number) => void;
}

export const ClownfishCompanion: React.FC<ClownfishCompanionProps> = ({
  onEmitBubble,
  onWaterWake,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fishModelRef = useRef<HTMLDivElement | null>(null);

  const targetRef = useRef({ x: 350, y: 350, hasInteracted: false });
  const posRef = useRef({ x: 300, y: 300 });
  const curYawRef = useRef(0);
  const curPitchRef = useRef(0);
  const tailPhaseRef = useRef(0);
  const wakeCounterRef = useRef(0);
  const bubbleCounterRef = useRef(0);

  // Mouse & Touch Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY, hasInteracted: true };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          hasInteracted: true,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Buttery-Smooth Direct-DOM Animation Loop (60/120 FPS Fluidity)
  useEffect(() => {
    let animId: number;
    let idleClock = 0;

    const loop = () => {
      idleClock += 0.016;

      let targetX = targetRef.current.x;
      let targetY = targetRef.current.y;

      // Natural idle patrol path if no interaction
      if (!targetRef.current.hasInteracted) {
        const cx = window.innerWidth * 0.65;
        const cy = window.innerHeight * 0.45;
        targetX = cx + Math.cos(idleClock * 0.8) * 170;
        targetY = cy + Math.sin(idleClock * 1.4) * 85;
      }

      const cur = posRef.current;
      const dx = targetX - cur.x;
      const dy = targetY - cur.y;
      const dist = Math.hypot(dx, dy);

      // Smooth damped velocity easing
      let speed = 0;
      if (dist > 28) {
        speed = Math.min(dist * 0.046, 7.8);
        cur.x += (dx / dist) * speed;
        cur.y += (dy / dist) * speed;
      } else {
        // Organic gentle floating hover when stationary near cursor
        cur.y += Math.sin(idleClock * 3.5) * 0.45;
      }

      // Smooth 3D Yaw Rotation (Banks smoothly through 3D space when turning)
      let targetYaw = curYawRef.current;
      if (dx > 12) {
        targetYaw = 0; // Facing Right
      } else if (dx < -12) {
        targetYaw = 180; // Facing Left
      }
      curYawRef.current += (targetYaw - curYawRef.current) * 0.12;

      // Vertical Pitch Angle (Smooth banking on dive/ascent)
      const absDx = Math.max(Math.abs(dx), 24);
      const targetPitch = Math.atan2(dy, absDx) * (180 / Math.PI) * 0.38;
      const clampedPitch = Math.max(-26, Math.min(26, targetPitch));
      curPitchRef.current += (clampedPitch - curPitchRef.current) * 0.1;

      // Natural Tail Undulation (High-speed swim vs. calm glide)
      const phaseDelta = speed > 1.0 ? 0.28 : 0.09;
      tailPhaseRef.current += phaseDelta;
      const wagAmplitude = speed > 1.0 ? 12 : 4;
      const tailWag = Math.sin(tailPhaseRef.current) * wagAmplitude;

      // 1. Direct DOM transform for Position (Zero React render overhead)
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${cur.x - 65}px, ${cur.y - 35}px, 0)`;
      }

      // 2. Direct DOM transform for 3D Fish Banking & Tail Motion
      if (fishModelRef.current) {
        fishModelRef.current.style.transform = `
          perspective(600px)
          rotateY(${curYawRef.current}deg)
          rotateZ(${curYawRef.current > 90 ? -curPitchRef.current : curPitchRef.current}deg)
          rotateY(${tailWag}deg)
        `;
      }

      // 3. Emit Hydrodynamic Water Wake Ripples behind the fish
      wakeCounterRef.current += 1;
      if (speed > 1.2 && wakeCounterRef.current > 6 && onWaterWake) {
        wakeCounterRef.current = 0;
        const tailX = curYawRef.current < 90 ? cur.x - 45 : cur.x + 45;
        const tailY = cur.y + 6;
        onWaterWake(tailX, tailY, speed);
      }

      // 4. Emit occasional micro-bubbles when sprinting
      bubbleCounterRef.current += 1;
      if (speed > 3.6 && bubbleCounterRef.current > 42 && onEmitBubble) {
        bubbleCounterRef.current = 0;
        const tailX = curYawRef.current < 90 ? cur.x - 48 : cur.x + 48;
        const tailY = cur.y + 8;
        onEmitBubble(tailX, tailY);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [onEmitBubble, onWaterWake]);

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-none z-[18] will-change-transform select-none"
      style={{
        left: 0,
        top: 0,
        transform: 'translate3d(300px, 300px, 0)',
      }}
    >
      <div
        ref={fishModelRef}
        className="w-28 sm:w-32 h-auto relative will-change-transform"
        style={{
          transformOrigin: '50% 50%',
        }}
      >
        <div className="relative">
          {/* Photorealistic High-Resolution Clownfish Asset */}
          <img
            src="/showcase/aero/clownfish.png"
            alt="Photoreal Clownfish"
            className="w-full h-auto drop-shadow-[0_12px_16px_rgba(0,30,80,0.4)] filter brightness-[1.02] contrast-[1.04]"
            draggable={false}
          />

          {/* Dynamic Caustic Specular Glimmer passing over wet scales */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-45 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 45%, rgba(255,255,255,0.5) 75%, transparent 100%)',
              maskImage: 'url(/showcase/aero/clownfish.png)',
              WebkitMaskImage: 'url(/showcase/aero/clownfish.png)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          />
        </div>
      </div>
    </div>
  );
};
