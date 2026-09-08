import React, { useEffect, useRef, useState } from 'react';

export interface ClownfishCompanionProps {
  onEmitBubble?: (x: number, y: number) => void;
}

export const ClownfishCompanion: React.FC<ClownfishCompanionProps> = ({ onEmitBubble }) => {
  const [pos, setPos] = useState({ x: 300, y: 300 });
  const [facingRight, setFacingRight] = useState(true);
  const [pitch, setPitch] = useState(0);
  const [tailAngle, setTailAngle] = useState(0);
  const [finAngle, setFinAngle] = useState(0);

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

      // Gentle autonomous idle swimming if the user hasn't moved the mouse recently
      if (!targetRef.current.hasInteracted) {
        const cx = window.innerWidth * 0.65;
        const cy = window.innerHeight * 0.45;
        targetX = cx + Math.cos(idleTime) * 140;
        targetY = cy + Math.sin(idleTime * 1.6) * 70;
      }

      const cur = currentRef.current;
      const dx = targetX - cur.x;
      const dy = targetY - cur.y;
      const dist = Math.hypot(dx, dy);

      // Swimming speed scaling based on distance to cursor
      let speed = 0;
      if (dist > 25) {
        speed = Math.min(dist * 0.045, 7.0);
        cur.x += (dx / dist) * speed;
        cur.y += (dy / dist) * speed;
      } else {
        // Subtle curious hovering bob when right beside the cursor
        cur.y += Math.sin(idleTime * 4) * 0.4;
      }

      // Determine swimming direction & flip
      if (dx > 8) {
        setFacingRight(true);
      } else if (dx < -8) {
        setFacingRight(false);
      }

      // Vertical tilt angle (pitch)
      const absDx = Math.max(Math.abs(dx), 15);
      const targetPitch = Math.atan2(dy, absDx) * (180 / Math.PI) * 0.45;
      const clampedPitch = Math.max(-30, Math.min(30, targetPitch));
      setPitch(clampedPitch);

      // Tail oscillation
      const phaseDelta = speed > 1.2 ? 0.28 : 0.1;
      tailPhaseRef.current += phaseDelta;
      const wagAmplitude = speed > 1.2 ? 24 : 10;
      setTailAngle(Math.sin(tailPhaseRef.current) * wagAmplitude);

      // Pectoral fin fluttering
      setFinAngle(Math.cos(tailPhaseRef.current * 1.5) * 18);

      // Emit occasional playful micro-bubbles when swimming with high speed
      bubbleCooldownRef.current += 1;
      if (speed > 3.0 && bubbleCooldownRef.current > 45 && onEmitBubble) {
        bubbleCooldownRef.current = 0;
        // Tail position relative to body
        const tailX = facingRight ? cur.x - 30 : cur.x + 30;
        const tailY = cur.y + 5;
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
        transform: `translate3d(${pos.x - 40}px, ${pos.y - 25}px, 0)`,
      }}
    >
      <div
        className="w-20 h-14 relative transition-transform duration-200"
        style={{
          transform: `${facingRight ? 'scaleX(1)' : 'scaleX(-1)'} rotate(${
            facingRight ? pitch : -pitch
          }deg)`,
          transformOrigin: '50% 50%',
        }}
      >
        <svg
          viewBox="0 0 90 55"
          className="w-full h-full overflow-visible drop-shadow-[0_6px_10px_rgba(0,30,80,0.3)]"
        >
          <defs>
            {/* Clownfish Vibrant Orange Body Gradient */}
            <linearGradient id="fishBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffa726" />
              <stop offset="35%" stopColor="#ff7043" />
              <stop offset="70%" stopColor="#f4511e" />
              <stop offset="100%" stopColor="#d84315" />
            </linearGradient>

            {/* Glossy Back Specular Highlight */}
            <linearGradient id="fishGloss" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Fin Gradient */}
            <linearGradient id="fishFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff9800" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#f4511e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#212121" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* DORSAL FIN (TOP) */}
          <path
            d="M32,15 Q42,5 55,10 Q65,14 68,20 Q52,18 32,15 Z"
            fill="url(#fishFinGrad)"
            stroke="#212121"
            strokeWidth="1.2"
          />

          {/* PELVIC & ANAL FINS (BOTTOM) */}
          <path
            d="M36,37 Q42,48 50,44 Q48,38 42,36 Z"
            fill="url(#fishFinGrad)"
            stroke="#212121"
            strokeWidth="1.2"
          />
          <path
            d="M52,36 Q60,45 68,40 Q62,35 56,34 Z"
            fill="url(#fishFinGrad)"
            stroke="#212121"
            strokeWidth="1.2"
          />

          {/* CAUDAL TAIL FIN (Animated wagging) */}
          <g
            style={{
              transform: `rotate(${tailAngle}deg)`,
              transformOrigin: '20px 28px',
              transition: 'transform 0.05s linear',
            }}
          >
            {/* Tail stem and fan */}
            <path
              d="M22,28 Q10,14 2,16 Q-2,27 2,38 Q10,40 22,28 Z"
              fill="url(#fishFinGrad)"
              stroke="#212121"
              strokeWidth="1.2"
            />
            {/* White stripe on tail */}
            <path
              d="M14,21 Q8,27 14,33"
              stroke="#ffffff"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* MAIN OVAL CLOWNFISH BODY */}
          <path
            d="M20,28 C20,16 34,12 55,14 C72,16 84,23 84,28 C84,34 72,40 55,42 C34,44 20,40 20,28 Z"
            fill="url(#fishBodyGrad)"
          />

          {/* STRIPE 1: Head White Stripe with Black Edges */}
          <path
            d="M66,16 Q71,28 66,40"
            stroke="#212121"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M66,16 Q71,28 66,40"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* STRIPE 2: Middle White Stripe with characteristic forward curve */}
          <path
            d="M44,14 Q50,22 46,28 Q42,34 44,42"
            stroke="#212121"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M44,14 Q50,22 46,28 Q42,34 44,42"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* STRIPE 3: Tail Base White Stripe */}
          <path
            d="M24,20 Q27,28 24,36"
            stroke="#212121"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M24,20 Q27,28 24,36"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* PECTORAL FIN (Animated flutter) */}
          <g
            style={{
              transform: `rotate(${finAngle}deg)`,
              transformOrigin: '54px 30px',
              transition: 'transform 0.05s linear',
            }}
          >
            <path
              d="M54,30 Q44,24 38,32 Q44,38 54,32 Z"
              fill="url(#fishFinGrad)"
              stroke="#212121"
              strokeWidth="1.2"
            />
          </g>

          {/* DORSAL BODY GLOSS HIGHLIGHT */}
          <path
            d="M26,22 C32,16 48,14 64,17 C52,15 36,17 26,22 Z"
            fill="url(#fishGloss)"
          />

          {/* EYE & PUPIL WITH GLOSSY SPECULAR REFLECTION */}
          <circle cx="74" cy="24" r="4.2" fill="#ffb74d" stroke="#212121" strokeWidth="0.8" />
          <circle cx="74.5" cy="24" r="2.8" fill="#111111" />
          <circle cx="75.5" cy="23" r="1.1" fill="#ffffff" />

          {/* SMILE / MOUTH */}
          <path
            d="M82,29 Q80,31 77,30"
            stroke="#212121"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
