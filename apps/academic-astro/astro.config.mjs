// @ts-check
import { existsSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { iconInclude } from "./src/lib/icons.ts";
import tailwindcss from "@tailwindcss/vite";

/** After a build, list the placeholder fields still in use so it's clear which YAML to fill. */
function placeholderReport() {
  return /** @type {import("astro").AstroIntegration} */ ({
    name: "placeholder-report",
    hooks: {
      "astro:build:done": async ({ logger }) => {
        const { placeholderReport, profile } = await import("./src/lib/data.ts");
        if (!profile.cv && !existsSync(new URL("./public/cv.pdf", import.meta.url))) {
          logger.warn(
            "No CV PDF yet: the Download CV button links to /cv.pdf. Add apps/academic-astro/public/cv.pdf or set cv.academic in profile.yaml.",
          );
        }
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
  // The About page became the home page.
  redirects: { "/about": "/" },
  // astro-icon inlines SVGs at build time; `include` keeps only the icons the site uses.
  integrations: [icon({ include: iconInclude }), sitemap(), placeholderReport()],
  vite: {
    plugins: [tailwindcss()],
  },
});
