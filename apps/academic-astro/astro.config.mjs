// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

/** After a build, list the placeholder fields still in use so it's clear which YAML to fill. */
function placeholderReport() {
  return /** @type {import("astro").AstroIntegration} */ ({
    name: "placeholder-report",
    hooks: {
      "astro:build:done": async ({ logger }) => {
        const { placeholderReport } = await import("./src/lib/data.ts");
        const keys = placeholderReport();
        if (keys.length === 0) return logger.info("no placeholder content in use");
        logger.warn(
          `${keys.length} fields are showing PLACEHOLDER content (src/content/placeholders.ts).\n` +
            `Fill them in packages/content/data to replace it:\n` +
            keys.map((k) => `  · ${k}`).join("\n"),
        );
      },
    },
  });
}

export default defineConfig({
  site: "https://biprodas.com",
  trailingSlash: "always",
  integrations: [sitemap(), placeholderReport()],
  vite: {
    plugins: [tailwindcss()],
  },
});
