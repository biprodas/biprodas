/// <reference types="vitest/config" />
// Vitest runs with this project's Astro/Vite settings (see the Astro testing guide).
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
