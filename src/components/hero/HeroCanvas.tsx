import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking with soft dampening
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 140,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Number of particles: lower on mobile for speed
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 75;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glow: number;
      pulseSpeed: number;
      phase: number;
    }

    const colors = theme === 'dark'
      ? ['#10b981', '#059669', '#34d399', '#facc15', '#fde047', '#38bdf8']
      : ['#059669', '#10b981', '#34d399', '#facc15', '#eab308', '#0b192c'];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() * 8 + 4,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic mesh gradient with green and light yellow ambient glow
      const bgGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        40,
        mouse.x,
        mouse.y,
        width * 0.75
      );
      if (theme === 'dark') {
        bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
        bgGrad.addColorStop(0.35, 'rgba(250, 204, 21, 0.05)');
        bgGrad.addColorStop(1, 'rgba(7, 11, 26, 0)');
      } else {
        bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.09)');
        bgGrad.addColorStop(0.35, 'rgba(250, 204, 21, 0.06)');
        bgGrad.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Connect near particles with green/yellow cyber filaments
      const maxDistance = isMobile ? 90 : 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (theme === 'dark' ? 0.25 : 0.2);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & move particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interactive mouse repulsion/interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw particle node
        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.phase) * 0.4 + 1;
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow * pulse;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: 0.95 }}
      />
      {/* Decorative futuristic cyber grid lines overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none ${
          theme === 'dark'
            ? 'bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)]'
            : 'bg-[linear-gradient(to_right,#05966914_1px,transparent_1px),linear-gradient(to_bottom,#05966914_1px,transparent_1px)]'
        } bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]`} 
      />
    </div>
  );
};
