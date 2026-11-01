/** FNV-1a: a small, stable string hash. Same input, same number, on server and client. */
export function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Mulberry32: a seeded PRNG returning floats in [0, 1). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Decorative sky coordinates derived from a slug, e.g. "RA 04h 12m · DEC +27°". */
export function skyCoordinates(slug: string): string {
  const rand = seededRandom(hashString(slug));
  const h = Math.floor(rand() * 24);
  const m = Math.floor(rand() * 60);
  const dec = Math.round(rand() * 160 - 80);
  const sign = dec >= 0 ? "+" : "−";
  return `RA ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m · DEC ${sign}${Math.abs(dec)}°`;
}
