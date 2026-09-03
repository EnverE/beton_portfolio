import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')
        );
        setIsHovering(isClickable);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest('a, button, input, textarea, select, [role="button"]')) {
        setIsDragging(true);
      }
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Precision Architectural Cross Cursor */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        {/* Horizontal cross bar */}
        <div
          className={`h-[1.5px] bg-white transition-all duration-150 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isDragging
              ? 'w-10 bg-amber-400'
              : isHovering
              ? 'w-8'
              : 'w-5'
          }`}
        />

        {/* Vertical cross bar */}
        <div
          className={`w-[1.5px] bg-white transition-all duration-150 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            isDragging
              ? 'h-10 bg-amber-400'
              : isHovering
              ? 'h-8'
              : 'h-5'
          }`}
        />

        {/* Center alignment point */}
        <div className="w-1 h-1 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Drag to spin & scroll 4-way directional indicators */}
        {isDragging && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono font-black text-amber-400 pointer-events-none select-none">
            <span className="absolute -top-7 left-1/2 -translate-x-1/2">▲</span>
            <span className="absolute top-4 left-1/2 -translate-x-1/2">▼</span>
            <span className="absolute top-1/2 -left-7 -translate-y-1/2">◄</span>
            <span className="absolute top-1/2 left-4 -translate-y-1/2">►</span>
          </div>
        )}

        {/* Subtle interactive hover corner reticle */}
        {isHovering && !isDragging && (
          <div className="w-7 h-7 border border-white/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110" />
        )}
      </div>
    </div>
  );
};
