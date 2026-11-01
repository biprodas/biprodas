import { describe, expect, it } from "vitest";
import { placeStars } from "./constellation";
import { hashString, seededRandom, skyCoordinates } from "./hash";

describe("hash", () => {
  it("is stable", () => {
    expect(hashString("pitchpool")).toBe(hashString("pitchpool"));
    expect(hashString("pitchpool")).not.toBe(hashString("akaunty"));
  });

  it("seeds the same sequence", () => {
    const a = seededRandom(42);
    const b = seededRandom(42);
    const seq = [a(), a(), a()];
    expect([b(), b(), b()]).toEqual(seq);
    for (const n of seq) expect(n >= 0 && n < 1).toBe(true);
  });

  it("formats sky coordinates", () => {
    expect(skyCoordinates("akaunty")).toMatch(/^RA \d{2}h \d{2}m · DEC [+−]\d{1,2}°$/);
  });
});

describe("placeStars", () => {
  const slugs = ["a", "b", "c", "d", "e", "f", "g"];

  it("is deterministic", () => {
    expect(placeStars(slugs)).toEqual(placeStars(slugs));
  });

  it("keeps every star inside the map, away from the edges", () => {
    for (const p of placeStars(slugs)) {
      for (const pt of [p.wide, p.narrow]) {
        expect(pt.x).toBeGreaterThan(5);
        expect(pt.x).toBeLessThan(95);
        expect(pt.y).toBeGreaterThan(3);
        expect(pt.y).toBeLessThan(97);
      }
      expect(p.satellites.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("gives each star its own grid cell", () => {
    const cells = placeStars(slugs).map((p) => `${Math.floor(p.wide.x / 25)}:${Math.floor(p.wide.y / 50)}`);
    expect(new Set(cells).size).toBe(slugs.length);
  });
});
