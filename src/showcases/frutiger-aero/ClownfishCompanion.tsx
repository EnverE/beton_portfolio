import React, { useEffect, useRef, useState } from 'react';

export interface ClownfishCompanionProps {
  onEmitBubble?: (x: number, y: number) => void;
}

export const ClownfishCompanion: React.FC<ClownfishCompanionProps> = ({ onEmitBubble }) => {
  const [pos, setPos] = useState({ x: 300, y: 300 });
  const [facingRight, setFacingRight] = useState(true);
  const [pitch, setPitch] = useState(0);
  const [tailAngle, setTailAngle] = useState(0);

  const targetRef = useRef({ x: 350, y: 350, hasInteracted: false });
  const currentRef = useRef({ x: 300, y: 300 });
  const tailPhaseRef = useRef(0);
  const bubbleCooldownRef = useRef(0);

  // Mouse & Touch tracking
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

  // Physics animation loop
  useEffect(() => {
    let animId: number;
    let idleTime = 0;

    const loop = () => {
      idleTime += 0.015;

      let targetX = targetRef.current.x;
      let targetY = targetRef.current.y;

      // Gentle autonomous idle swimming if the user hasn't moved pointer recently
      if (!targetRef.current.hasInteracted) {
        const cx = window.innerWidth * 0.65;
        const cy = window.innerHeight * 0.45;
        targetX = cx + Math.cos(idleTime) * 160;
        targetY = cy + Math.sin(idleTime * 1.5) * 80;
      }

      const cur = currentRef.current;
      const dx = targetX - cur.x;
      const dy = targetY - cur.y;
      const dist = Math.hypot(dx, dy);

      // Swimming speed scaling based on distance to cursor
      let speed = 0;
      if (dist > 30) {
        speed = Math.min(dist * 0.05, 8.0);
        cur.x += (dx / dist) * speed;
        cur.y += (dy / dist) * speed;
      } else {
        // Natural hovering bobbing when idle near cursor
        cur.y += Math.sin(idleTime * 4) * 0.5;
      }

      // Smooth heading direction flip
      if (dx > 10) {
        setFacingRight(true);
      } else if (dx < -10) {
        setFacingRight(false);
      }

      // Vertical tilt angle (pitch)
      const absDx = Math.max(Math.abs(dx), 20);
      const targetPitch = Math.atan2(dy, absDx) * (180 / Math.PI) * 0.4;
      const clampedPitch = Math.max(-28, Math.min(28, targetPitch));
      setPitch(clampedPitch);

      // Natural tail oscillation frequency
      const phaseDelta = speed > 1.2 ? 0.32 : 0.12;
      tailPhaseRef.current += phaseDelta;
      const wagAmplitude = speed > 1.2 ? 14 : 6;
      setTailAngle(Math.sin(tailPhaseRef.current) * wagAmplitude);

      // Emit occasional playful micro-bubbles when sprinting
      bubbleCooldownRef.current += 1;
      if (speed > 3.2 && bubbleCooldownRef.current > 40 && onEmitBubble) {
        bubbleCooldownRef.current = 0;
        // Tail position relative to body
        const tailX = facingRight ? cur.x - 45 : cur.x + 45;
        const tailY = cur.y + 8;
        onEmitBubble(tailX, tailY);
      }

      setPos({ x: cur.x, y: cur.y });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [facingRight, onEmitBubble]);

  return (
    <div
      className="fixed pointer-events-none z-30 transition-transform will-change-transform duration-75"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${pos.x - 65}px, ${pos.y - 35}px, 0)`,
      }}
    >
      <div
        className="w-32 sm:w-36 h-auto relative transition-transform duration-300 ease-out select-none"
        style={{
          transform: `
            perspective(500px)
            rotateY(${facingRight ? 0 : 180}deg)
            rotateZ(${facingRight ? pitch : -pitch}deg)
            rotateY(${tailAngle * 0.6}deg)
          `,
          transformOrigin: '50% 50%',
        }}
      >
        {/* Photorealistic Ocellaris Clownfish Image with Underwater Depth Lighting */}
        <div className="relative group">
          <img
            src="/showcase/aero/clownfish.png"
            alt="Photoreal Clownfish Companion"
            className="w-full h-auto drop-shadow-[0_14px_18px_rgba(0,35,90,0.45)] filter brightness-[1.03] contrast-[1.05]"
            draggable={false}
          />

          {/* Dynamic Caustic Sunlight Glimmer across wet fish scales */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 rounded-full"
            style={{
              background: `linear-gradient(${120 + tailAngle * 3}deg, rgba(255,255,255,0.7) 0%, transparent 40%, rgba(255,255,255,0.5) 70%, transparent 100%)`,
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
