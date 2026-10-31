// One-off: builds skillicons-style tiles (dark + light) for tools skillicons.dev doesn't cover,
// from Simple Icons (CC0). Output is committed to assets/icons/, so README generation and
// `--check` stay offline. Re-run after adding a slug:  node src/build-icons.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const simpleIconsVersion = "13.21.0";

/** Simple Icons slug → glyph color. Very dark brand colors fall back to mono so they stay visible. */
export const tiles: Record<string, string> = {
  reactquery: "#FF4154",
  shadcnui: "#000000",
  typeorm: "#FE0803",
  jsonwebtokens: "#000000",
  openai: "#412991",
  anthropic: "#191919",
  langchain: "#1C3C3C",
  hackerrank: "#00EA64",
};

// Match skillicons.dev tiles.
const theme = {
  dark: { bg: "#242938", mono: "#FFFFFF" },
  light: { bg: "#F4F2ED", mono: "#0F0F0F" },
};

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

function tile(path: string, color: string, mode: keyof typeof theme): string {
  const fill = luminance(color) < 0.2 ? theme[mode].mono : color;
  // 24×24 glyph scaled to 152px and centered in a 256px tile, like skillicons.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" fill="none"><rect width="256" height="256" fill="${theme[mode].bg}" rx="60"/><g transform="translate(52 52) scale(6.3333)"><path fill="${fill}" d="${path}"/></g></svg>\n`;
}

const outDir = fileURLToPath(new URL("../assets/icons/", import.meta.url));
mkdirSync(outDir, { recursive: true });

for (const [slug, color] of Object.entries(tiles)) {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/icons/${slug}.svg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const path = (await res.text()).match(/<path d="([^"]+)"/)?.[1];
  if (!path) throw new Error(`${slug}: no path in SVG`);
  for (const mode of ["dark", "light"] as const) {
    writeFileSync(`${outDir}${slug}-${mode}.svg`, tile(path, color, mode));
  }
  console.log(`icon ${slug}`);
}
