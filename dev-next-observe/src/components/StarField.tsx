"use client";

import { useEffect, useRef } from "react";
import { seededRandom } from "@/lib/hash";

interface Star {
  x: number;
  y: number;
  r: number;
  /** 0 = far, 1 = near. Nearer stars drift more with scroll. */
  depth: number;
  phase: number;
  speed: number;
  /** Index into the palette read from the theme. */
  tint: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

/** Mostly starlight, with a few nebula, signal and aurora stars. Read from CSS so it follows the theme. */
const TINT_TOKENS = ["--color-ink", "--color-ink", "--color-ink", "--color-nebula", "--color-signal", "--color-aurora"];

function readPalette() {
  const style = getComputedStyle(document.documentElement);
  return {
    tints: TINT_TOKENS.map((t) => style.getPropertyValue(t).trim() || "#e8ebf4"),
    alpha: Number(style.getPropertyValue("--star-alpha")) || 1,
  };
}
const MAX_DPR = 2;

function makeStars(width: number, height: number): Star[] {
  const rand = seededRandom(20180101);
  const count = Math.min(420, Math.round((width * height) / 4200));
  return Array.from({ length: count }, () => {
    const depth = rand();
    return {
      x: rand() * width,
      y: rand() * height,
      r: 0.3 + depth * depth * 1.4,
      depth,
      phase: rand() * Math.PI * 2,
      speed: 0.4 + rand() * 1.2,
      tint: Math.floor(rand() * TINT_TOKENS.length),
    };
  });
}

/** A fixed, decorative night sky behind every page. */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let nextMeteorAt = 4000;
    let frame = 0;
    let palette = readPalette();
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(width, height);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const scroll = reduced.matches ? 0 : window.scrollY;

      for (const s of stars) {
        const twinkle = reduced.matches ? 0.8 : 0.55 + 0.45 * Math.sin(s.phase + (time / 1000) * s.speed);
        const y = (((s.y - scroll * s.depth * 0.25) % height) + height) % height;
        ctx.globalAlpha = (0.25 + s.depth * 0.75) * twinkle * palette.alpha;
        ctx.fillStyle = palette.tints[s.tint];
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced.matches) {
        if (!meteor && time > nextMeteorAt) {
          const rand = Math.random();
          meteor = { x: width * (0.3 + rand * 0.6), y: height * 0.1 * rand, vx: -7, vy: 3.2, life: 1 };
        }
        if (meteor) {
          const tail = 14;
          const gradient = ctx.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x - meteor.vx * tail,
            meteor.y - meteor.vy * tail,
          );
          gradient.addColorStop(0, palette.tints[0]);
          gradient.addColorStop(1, "transparent");
          ctx.globalAlpha = meteor.life * 0.9 * palette.alpha;
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail);
          ctx.stroke();
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.life -= 0.012;
          if (meteor.life <= 0 || meteor.x < -100 || meteor.y > height + 100) {
            meteor = null;
            nextMeteorAt = time + 7000 + Math.random() * 9000;
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      if (reduced.matches) {
        draw(0);
        return;
      }
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      if (!running) draw(0);
    };
    const onMotionChange = () => {
      stop();
      start();
    };

    // Re-read colours when the theme changes.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (!running) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotionChange);

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
  );
}
