import { hashString, seededRandom } from "./hash";

export interface Point {
  x: number;
  y: number;
}

export interface Placement {
  slug: string;
  /** Position in percent of the map, for wide and narrow layouts. */
  wide: Point;
  narrow: Point;
  /** Satellite stars in px, relative to the main star, drawn as its constellation. */
  satellites: Point[];
}

function place(index: number, cols: number, rows: number, rand: () => number): Point {
  // Snake through the grid so the line between consecutive stars wanders instead of zig-zagging.
  const row = Math.floor(index / cols);
  const col = row % 2 === 0 ? index % cols : cols - 1 - (index % cols);
  const cellW = 100 / cols;
  const cellH = 100 / rows;
  return {
    x: round(col * cellW + cellW * (0.35 + rand() * 0.3)),
    y: round(row * cellH + cellH * (0.22 + rand() * 0.36)),
  };
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Deterministic star positions: the same slugs always produce the same sky. */
export function placeStars(slugs: string[]): Placement[] {
  const wideCols = 4;
  const narrowCols = 2;
  const wideRows = Math.max(1, Math.ceil(slugs.length / wideCols));
  const narrowRows = Math.max(1, Math.ceil(slugs.length / narrowCols));

  return slugs.map((slug, i) => {
    const rand = seededRandom(hashString(slug));
    const wide = place(i, wideCols, wideRows, rand);
    const narrow = place(i, narrowCols, narrowRows, rand);
    const count = 3 + Math.floor(rand() * 3);
    let angle = rand() * Math.PI * 2;
    const satellites = Array.from({ length: count }, () => {
      angle += 0.9 + rand() * 1.4;
      const radius = 22 + rand() * 38;
      return { x: round(Math.cos(angle) * radius), y: round(Math.sin(angle) * radius) };
    });
    return { slug, wide, narrow, satellites };
  });
}
