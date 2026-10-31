// Profile header and footer rendered as self-hosted SVGs (no third-party image service).
// Transparent background and mid-tone colors so it reads on GitHub's light and dark themes.
// Animations are entrance-only (fill-mode: backwards), so renderers without CSS animation
// still show the final frame.

import type { Profile } from "@biprodas/content";

const xml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Mid-tone colors chosen to stay legible on both #ffffff and #0d1117. */
export const palette = {
  gradient: ["#2563EB", "#06B6D4"], // blue → cyan
  prompt: "#0891B2",
  separator: "#06B6D4",
  muted: "#7D8590",
} as const;

const width = 1000;
const height = 260;

/**
 * A filled sine-like wave starting at baseline `y`, wide enough to be shifted left by one
 * `period` and still cover the canvas, so a translateX(-period) loop is seamless.
 */
function wave(y: number, amp: number, period: number, bottom = height): string {
  const cycles = Math.ceil((width + period) / period) + 1;
  const crest = `q ${period / 4} ${-amp} ${period / 2} 0 t ${period / 2} 0`;
  return `M0 ${y} ${Array(cycles).fill(crest).join(" ")} V ${bottom} H 0 Z`;
}

const gradientStops = () =>
  palette.gradient
    .map((c, i, all) => `      <stop offset="${i / (all.length - 1)}" stop-color="${c}" />`)
    .join("\n");

/** Decorative footer: drifting waves rising from the bottom, fading out at the top and sides. */
export function footerSvg(): string {
  const h = 140;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${h}" width="${width}" height="${h}" aria-hidden="true">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
${gradientStops()}
    </linearGradient>
    <linearGradient id="edge-fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0" />
      <stop offset="0.15" stop-color="#fff" stop-opacity="1" />
      <stop offset="0.85" stop-color="#fff" stop-opacity="1" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <mask id="edges"><rect width="${width}" height="${h}" fill="url(#edge-fade)" /></mask>
    <linearGradient id="top-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0" />
      <stop offset="0.45" stop-color="#fff" stop-opacity="1" />
    </linearGradient>
    <mask id="top"><rect width="${width}" height="${h}" fill="url(#top-fade)" /></mask>
  </defs>
  <style>
    .w1 { opacity: 0.10; animation: drift-left 20s linear infinite; }
    .w2 { opacity: 0.16; animation: drift-right 14s linear infinite; }
    .w3 { opacity: 0.24; animation: drift-left 10s linear infinite; }
    @keyframes drift-left { to { transform: translateX(-320px); } }
    @keyframes drift-right { from { transform: translateX(-260px); } to { transform: translateX(0); } }
    @media (prefers-reduced-motion: reduce) { .w1, .w2, .w3 { animation: none; } }
  </style>
  <g mask="url(#edges)"><g mask="url(#top)">
    <path class="w1" d="${wave(52, 14, 320, h)}" fill="url(#accent)" />
    <path class="w2" d="${wave(74, 11, 260, h)}" fill="url(#accent)" />
    <path class="w3" d="${wave(98, 8, 320, h)}" fill="url(#accent)" />
  </g></g>
</svg>
`;
}

export function headerSvg(p: Profile): string {
  const name = xml(p.name);
  // "A · B · C" → parts joined by accent-colored separators.
  const parts = p.headline.engineering.split(/\s*[·•|]\s*/);
  const sep = "  ·  ";
  const title = parts.map((part) => xml(part)).join(`<tspan class="sep">${sep}</tspan>`);

  // Typing effect: the line is revealed by a clip that grows in `chars` steps while a cursor
  // moves along. textLength pins the rendered width, so the clip and cursor line up with the
  // text whatever font the viewer has. Without CSS animation, the full line and the cursor
  // at its end are shown.
  const chars = parts.join(sep).length;
  const titleSize = 22;
  const titleWidth = Math.round(chars * titleSize * 0.48);
  const titleLeft = width / 2 - titleWidth / 2;
  const typeDelay = 0.7;
  const typeDuration = +(chars * 0.055).toFixed(2);
  const handle = xml(p.name.toLowerCase().replace(/\s+/g, "."));

  const stops = gradientStops();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title">
  <title id="title">${name} — ${xml(p.headline.engineering)}</title>
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
${stops}
    </linearGradient>
    <!-- Soft left/right edges for the waves. -->
    <linearGradient id="edge-fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0" />
      <stop offset="0.18" stop-color="#fff" stop-opacity="1" />
      <stop offset="0.82" stop-color="#fff" stop-opacity="1" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <mask id="edges"><rect width="${width}" height="${height}" fill="url(#edge-fade)" /></mask>
    <!-- Waves dissolve toward the bottom instead of ending in a hard edge. -->
    <linearGradient id="bottom-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.72" stop-color="#fff" stop-opacity="1" />
      <stop offset="1" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
    <mask id="bottom"><rect width="${width}" height="${height}" fill="url(#bottom-fade)" /></mask>
    <clipPath id="typed"><rect class="typing" x="${titleLeft}" y="150" width="${titleWidth + 4}" height="44" /></clipPath>
  </defs>
  <style>
    .sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; }
    .mono { font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; }
    .prompt { font-size: 17px; fill: ${palette.prompt}; }
    .name { font-size: 68px; font-weight: 800; letter-spacing: -1.5px; }
    .title { font-size: ${titleSize}px; font-weight: 600; letter-spacing: 0.5px; fill: ${palette.muted}; white-space: pre; }
    .sep { fill: ${palette.separator}; font-weight: 800; }
    .in { animation: rise 0.7s cubic-bezier(.2, .7, .2, 1) backwards; }
    .bar { transform-box: fill-box; transform-origin: center; animation: grow 0.8s 0.45s cubic-bezier(.2, .7, .2, 1) backwards; }
    @keyframes rise { from { opacity: 0; transform: translateY(10px); } }
    @keyframes grow { from { transform: scaleX(0); } }
    .typing { transform-box: fill-box; transform-origin: left; animation: reveal ${typeDuration}s steps(${chars}, end) ${typeDelay}s backwards; }
    .caret { fill: ${palette.separator}; animation: caret ${typeDuration}s steps(${chars}, end) ${typeDelay}s backwards, blink 1s step-end ${typeDelay + typeDuration}s infinite; }
    @keyframes reveal { from { transform: scaleX(0); } }
    @keyframes caret { from { transform: translateX(-${titleWidth}px); } }
    @keyframes blink { 50% { opacity: 0; } }
    .wave-back { opacity: 0.12; animation: drift-left 18s linear infinite; }
    .wave-front { opacity: 0.18; animation: drift-right 12s linear infinite; }
    @keyframes drift-left { to { transform: translateX(-320px); } }
    @keyframes drift-right { from { transform: translateX(-260px); } to { transform: translateX(0); } }
    @media (prefers-reduced-motion: reduce) { .in, .bar, .typing, .caret, .wave-back, .wave-front { animation: none; } }
  </style>

  <g mask="url(#edges)"><g mask="url(#bottom)">
    <path class="wave-back" d="${wave(208, 12, 320)}" fill="url(#accent)" />
    <path class="wave-front" d="${wave(224, 9, 260)}" fill="url(#accent)" />
  </g></g>

  <text x="500" y="40" text-anchor="middle" class="mono prompt in">~/${handle} $ whoami</text>
  <text x="500" y="118" text-anchor="middle" class="sans name in" fill="url(#accent)" style="animation-delay: .15s">${name}</text>
  <rect class="bar" x="455" y="138" width="90" height="4" rx="2" fill="url(#accent)" />
  <text x="${titleLeft}" y="180" textLength="${titleWidth}" lengthAdjust="spacingAndGlyphs" class="sans title" clip-path="url(#typed)">${title}</text>
  <rect class="caret" x="${titleLeft + titleWidth + 4}" y="161" width="2.5" height="24" rx="1" />
</svg>
`;
}
