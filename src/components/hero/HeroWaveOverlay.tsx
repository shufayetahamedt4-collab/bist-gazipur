import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

interface Ripple {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

export const HeroWaveOverlay: React.FC = () => {
  const { theme } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position state - defaults to center of screen until mouse enters
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 3 : 300,
  });

  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const lastSpawnTime = useRef<number>(0);

  // Track mouse coordinates across the hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
      setHasMouseMoved(true);

      // Spawn subtle gentle ripple on cursor movement (throttled to smooth 400ms intervals)
      const now = Date.now();
      if (now - lastSpawnTime.current > 450) {
        lastSpawnTime.current = now;
        setRipples((prev) => [
          ...prev.slice(-4),
          { id: now, x, y, createdAt: now },
        ]);
      }
    };

    // Periodic gentle wave at cursor position every 2 seconds
    const interval = setInterval(() => {
      setMousePos((current) => {
        const now = Date.now();
        setRipples((prev) => [
          ...prev.slice(-4),
          { id: now, x: current.x, y: current.y, createdAt: now },
        ]);
        return current;
      });
    }, 2000);

    // Clean up expired ripples
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setRipples((prev) => prev.filter((r) => now - r.createdAt < 2200));
    }, 500);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Handle direct click or tap for instant gentle wave
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();

    setMousePos({ x, y });
    setHasMouseMoved(true);
    setRipples((prev) => [
      ...prev.slice(-4),
      { id: now, x, y, createdAt: now },
    ]);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className="absolute inset-0 pointer-events-auto overflow-hidden z-[2] select-none"
    >
      {/* Soft, gentle SVG wave filter definition (calm, non-jittery, very subtle) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="soft-cursor-wave" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="sine"
              baseFrequency="0.006 0.008"
              numOctaves="2"
              result="softTurb"
            >
              <animate
                attributeName="baseFrequency"
                dur="4s"
                values="0.004 0.006; 0.008 0.01; 0.004 0.006"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="softTurb"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Cursor Location Soft Water Spotlight Glow */}
      <div
        className="absolute pointer-events-none transition-transform duration-150 ease-out rounded-full"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          background:
            theme === 'dark'
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(250, 204, 21, 0.06) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(250, 204, 21, 0.12) 45%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Gentle Concentric Wave Rings at Cursor Location */}
      {/* Primary Periodic Ring at Cursor */}
      <div
        key={`pulse-1-${Math.floor(Date.now() / 2000)}`}
        className="absolute rounded-full pointer-events-none border border-emerald-400/40 dark:border-emerald-300/30"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '120px',
          height: '120px',
          animation: 'cursorSoftWave 2s cubic-bezier(0.2, 0.6, 0.35, 1) infinite',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)',
        }}
      />

      {/* Secondary Staggered Ring at Cursor (offset by 1s for seamless gentle flow) */}
      <div
        key={`pulse-2-${Math.floor(Date.now() / 2000)}`}
        className="absolute rounded-full pointer-events-none border border-yellow-400/35 dark:border-yellow-300/25"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '120px',
          height: '120px',
          animation: 'cursorSoftWave 2s cubic-bezier(0.2, 0.6, 0.35, 1) infinite 1s',
          boxShadow: '0 0 15px rgba(250, 204, 21, 0.2)',
        }}
      />

      {/* Dynamic Cursor-Emitted Gentle Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            boxShadow: '0 0 18px rgba(16, 185, 129, 0.3)',
            animation: 'dynamicRippleExpand 2s cubic-bezier(0.12, 0.5, 0.3, 1) forwards',
          }}
        />
      ))}

      {/* Soft Ambient Horizontal Wave Water Undulation (calm, light, relaxing) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.12) 0%, transparent 60%)',
          animation: 'gentleBreathe 4s ease-in-out infinite',
        }}
      />

      {/* CSS Keyframe animations for gentle cursor waves */}
      <style>{`
        @keyframes cursorSoftWave {
          0% {
            transform: translate(-50%, -50%) scale(0.2);
            opacity: 0.8;
          }
          50% {
            opacity: 0.45;
          }
          100% {
            transform: translate(-50%, -50%) scale(3.2);
            opacity: 0;
          }
        }

        @keyframes dynamicRippleExpand {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0.75;
            width: 80px;
            height: 80px;
          }
          60% {
            opacity: 0.35;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
            width: 80px;
            height: 80px;
          }
        }

        @keyframes gentleBreathe {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.02);
          }
        }

        .cursor-wave-gentle {
          filter: url(#soft-cursor-wave);
        }
      `}</style>
    </div>
  );
};
