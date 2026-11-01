# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This repo has two jobs

1. It is the **GitHub profile repo** (`biprodas/biprodas`). The root `README.md` renders on github.com/biprodas.
   - Never replace the root `README.md` with project docs.
   - Never add `.github/README.md`. It would take priority over the root README on the repo page.
   - The repo must stay public.
   - Project docs live in each folder's own README: `academic-astro/README.md`, `dev-next-observe/README.md`, `data/README.md`.
   - The README is hand-written. Its images (header/footer SVGs, tech-stack icon tiles) are static files in `readme/`.
2. It holds Biprodas Roy's two personal sites, as **independent folders**. There is no workspace, no shared packages and no Turborepo.
   - `academic-astro/`: Astro, deployed to biprodas.com. Audience: MS/PhD committees and researchers. Engineering readers are secondary.
   - `dev-next-observe/`: Next.js App Router, deployed to biprodas.dev. Audience: recruiters and clients. Creative and interactive ("Digital Observatory" design).
   - Each site uses npm and has its own `package.json`, `package-lock.json` and `node_modules`, and deploys as its own Vercel project (Root Directory = the folder).
   - Don't add shared code between the sites. The designs are different on purpose.

## Data

- `data/` at the repo root is the **master copy**: YAML with everything about Biprodas, plus photos in `data/assets/`. Nothing imports it.
- Each site keeps its own **curated copy** and rewords it for its audience: `academic-astro/src/data/*.yaml` and `dev-next-observe/src/content/*.ts`. Wording may differ between the master and the sites; facts (dates, titles, institutions) should match.
- When the user changes a fact, update `data/` and every site copy that shows it.
- Items carry `audience: academic | engineering | both` as a curation hint. The academic loader still filters on it.

## Academic site (`academic-astro/`)

```sh
cd academic-astro
npm install
npm run dev
npm run build        # also validates the data: Zod schema + duplicate-id/reference checks
npm run check-types  # astro check
npm test             # Vitest; tests sit next to the code as src/**/*.test.ts
npm run format       # Prettier (with prettier-plugin-astro); format:check in CI
```

There is no linter configured yet.

- Static Astro 7, "research notebook" design.
- Data: `src/data/schema.ts` (Zod v4) and `src/data/index.ts` (loader, validation and selectors such as `projects("academic")`). Pages read it through `src/lib/data.ts`. When adding a content type: add a Zod schema, add it to `Content`, add a YAML file, add a selector.
- Styling: Tailwind v4 utilities in the markup. Theme tokens (colours, fonts, type scale, radii, breakpoints) and the few CSS-only mechanics live in `src/styles/global.css`; repeated class lists live in `src/lib/ui.ts`. Don't add new named CSS classes for one-off styling.
- `src/lib/placeholders.ts` holds invented stand-in copy, shown only while the matching YAML field is empty. It is the one place invented text is allowed. Never move it into the YAML. `src/lib/data.ts` merges real data with these placeholders.
- Images used by the site live in `src/assets/` and are looked up by the path in the YAML (`src/lib/images.ts`).
- TypeScript uses `.ts` extensions in relative imports (`allowImportingTsExtensions`). Don't use enums, namespaces or parameter properties.

## Developer site (`dev-next-observe/`)

```sh
cd dev-next-observe
npm install
npm run dev
npm run build        # every route prerenders as static
npm run lint         # ESLint (next/core-web-vitals)
npm run check-types  # tsc --noEmit
npm test             # Vitest; tests sit next to the code as src/**/*.test.ts
npm run format       # Prettier (with prettier-plugin-tailwindcss); format:check in CI
```

- Next.js 16 with Cache Components, Partial Prefetching and the React Compiler. Read `dev-next-observe/AGENTS.md` and `node_modules/next/dist/docs/` before writing Next code. Don't call `new Date()` while rendering: Cache Components rejects it during prerender.
- Content: typed TS modules in `src/content/` (types in `src/content/types.ts`). Essay bodies are MDX in `src/content/writing/<slug>.mdx`; their metadata is in `src/content/posts.ts`. `src/content/content.test.ts` checks slugs and dates, and that featured projects have case studies.
- The user allowed invented narrative copy on this site: case-study prose, research directions, essays, principles. Every file with invented copy says so in a header comment. Facts (employers, titles, dates, project names, education, certifications) still come from `data/`. Reading lists cite real papers only.
- Styling: Tailwind v4 utilities. Tokens live in `src/app/globals.css` (`@theme`); repeated class lists live in `src/lib/ui.ts`. Dark is the default theme. Light ("printed star atlas") overrides the colour tokens under `:root[data-theme="light"]`; use the `light:` variant for anything tokens can't cover. `src/lib/theme.ts` sets `data-theme` before first paint (stored choice, else the system setting), and `ThemeToggle` switches it.
- Motion: `StarField` (canvas) and the CSS `.reveal` scroll animation both respect `prefers-reduced-motion`. Content must never depend on JS to become visible.

## Content rules

- Seed data contains `TODO`s. Only fill them in with facts the user provides.
- Never invent education, publications, awards or dates. On biprodas.dev, invented narrative copy is allowed (see above), but credentials and dates still are not.
- Dates are `YYYY` or `YYYY-MM`. `end` may be `"present"`.
