import { describe, expect, it } from "vitest";
import { themeScript } from "./theme";

/** Runs the inline script against a fake document, storage and media query. */
function run({ stored, systemLight }: { stored: string | null; systemLight: boolean }) {
  const attrs: Record<string, string> = {};
  let onSystemChange: (() => void) | undefined;
  const media = {
    matches: systemLight,
    addEventListener: (_: string, fn: () => void) => (onSystemChange = fn),
  };
  const env = {
    document: { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } },
    window: { matchMedia: () => media },
    localStorage: { getItem: () => stored },
  };
  new Function("document", "window", "localStorage", themeScript)(env.document, env.window, env.localStorage);
  return {
    theme: () => attrs["data-theme"],
    changeSystem(light: boolean) {
      media.matches = light;
      onSystemChange?.();
    },
  };
}

describe("themeScript", () => {
  it("follows the system when nothing is stored", () => {
    expect(run({ stored: null, systemLight: true }).theme()).toBe("light");
    expect(run({ stored: null, systemLight: false }).theme()).toBe("dark");
  });

  it("prefers the stored choice", () => {
    expect(run({ stored: "dark", systemLight: true }).theme()).toBe("dark");
    expect(run({ stored: "light", systemLight: false }).theme()).toBe("light");
  });

  it("ignores junk in storage", () => {
    expect(run({ stored: "purple", systemLight: false }).theme()).toBe("dark");
  });

  it("tracks system changes only without a stored choice", () => {
    const free = run({ stored: null, systemLight: false });
    free.changeSystem(true);
    expect(free.theme()).toBe("light");

    const pinned = run({ stored: "dark", systemLight: false });
    pinned.changeSystem(true);
    expect(pinned.theme()).toBe("dark");
  });
});
