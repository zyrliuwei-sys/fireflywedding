import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

/** Deterministic PRNG so every mount of a given seed looks the same. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Fly = {
  x: number; // px
  y: number;
  z: number; // depth 0.35..1 → size, speed, brightness
  phase: number;
  blink: number; // blink speed
  wx: number; // wander frequencies
  wy: number;
  vx: number;
  vy: number;
};

/** A soft glow sprite, drawn once and reused for every firefly. */
function makeSprite(size: number) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const r = size / 2;
  const grad = g.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, 'rgba(250, 255, 205, 1)');
  grad.addColorStop(0.12, 'rgba(236, 250, 140, 0.95)');
  grad.addColorStop(0.35, 'rgba(206, 236, 84, 0.32)');
  grad.addColorStop(1, 'rgba(190, 230, 60, 0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

/**
 * Living firefly swarm rendered on a canvas: three depth layers that drift,
 * blink and lean toward the pointer. Decorative only (aria-hidden), fills the
 * nearest `relative` parent, pauses off-screen, and draws a single still
 * frame when the visitor prefers reduced motion.
 */
export function FireflyField({
  count = 24,
  seed = 7,
  className,
  interactive = true,
}: {
  count?: number;
  seed?: number;
  className?: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sprite = makeSprite(64);
    const rand = mulberry32(seed);
    let w = 0;
    let h = 0;
    let flies: Fly[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const seedFlies = () => {
      flies = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        z: 0.35 + rand() * 0.65,
        phase: rand() * Math.PI * 2,
        blink: 0.6 + rand() * 1.1,
        wx: 0.15 + rand() * 0.35,
        wy: 0.12 + rand() * 0.3,
        vx: 0,
        vy: 0,
      }));
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      const first = w === 0;
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first) seedFlies();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (const f of flies) {
        // Wander: layered sines give an unhurried, organic drift.
        const s = 0.18 * f.z;
        f.vx += Math.sin(t * f.wx + f.phase) * s * 0.06;
        f.vy += (Math.cos(t * f.wy + f.phase * 1.3) * s - 0.02 * f.z) * 0.06;

        if (pointer.active) {
          const dx = pointer.x - f.x;
          const dy = pointer.y - f.y;
          const d2 = dx * dx + dy * dy;
          const R = 180;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const pull = (1 - d / R) * 0.05 * f.z;
            f.vx += (dx / d) * pull;
            f.vy += (dy / d) * pull;
          }
        }

        f.vx *= 0.94;
        f.vy *= 0.94;
        f.x += f.vx;
        f.y += f.vy;
        // Wrap softly at the edges.
        if (f.x < -20) f.x = w + 20;
        if (f.x > w + 20) f.x = -20;
        if (f.y < -20) f.y = h + 20;
        if (f.y > h + 20) f.y = -20;

        const pulse = 0.5 + 0.5 * Math.sin(t * f.blink + f.phase);
        const alpha = (0.15 + 0.85 * pulse * pulse) * (0.35 + 0.65 * f.z);
        const size = (10 + 22 * f.z) * (0.75 + 0.35 * pulse);
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, f.x - size / 2, f.y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    if (reduced) {
      draw(4);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = false;
    const start = performance.now();
    const loop = (now: number) => {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(host);

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    if (interactive) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [count, seed, interactive]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
    />
  );
}
