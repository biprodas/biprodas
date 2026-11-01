# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This repo has two jobs

1. It is the **GitHub profile repo** (`biprodas/biprodas`). The root `README.md` renders on github.com/biprodas.
   - Never replace the root `README.md` with project docs.
   - Never add `.github/README.md`. It would take priority over the root README on the repo page.
   - The repo must stay public.
   - Project docs live in `docs/README.md`.
   - The README is hand-written. Its images (header/footer SVGs, tech-stack icon tiles) are static files in `readme/`.
2. It holds Biprodas Roy's two personal sites, as **independent folders**. There is no workspace, no shared packages and no Turborepo.
   - `academic/`: Astro, deployed to biprodas.com. Audience: MS/PhD committees and researchers. Engineering readers are secondary.
   - `dev/`: Next.js App Router, deployed to biprodas.dev. Audience: recruiters and clients. Creative and interactive. Not yet scaffolded.
   - Each site has its own `package.json`, lockfile and `node_modules`, and deploys as its own Vercel project (Root Directory = the folder).
   - Don't add shared code between the sites. The designs are different on purpose.

## Data

- `data/` at the repo root is the **master copy**: YAML with everything about Biprodas, plus photos in `data/assets/`. Nothing imports it.
- Each site keeps its own **curated copy** and rewords it for its audience: `academic/src/data/*.yaml`. Wording may differ between the master and the sites; facts (dates, titles, institutions) should match.
- When the user changes a fact, update `data/` and every site copy that shows it.
- Items carry `audience: academic | engineering | both` as a curation hint. The academic loader still filters on it.

## Academic site (`academic/`)

```sh
cd academic
pnpm install      # pnpm 12 is pinned in package.json "packageManager"
pnpm dev
pnpm build        # also validates the data: Zod schema + duplicate-id/reference checks
pnpm check-types  # astro check
```

There is no test runner or linter configured yet.

- Static Astro 7, "research notebook" design.
- Data: `src/data/schema.ts` (Zod v4) and `src/data/index.ts` (loader, validation and selectors such as `projects("academic")`). Pages read it through `src/lib/data.ts`. When adding a content type: add a Zod schema, add it to `Content`, add a YAML file, add a selector.
- Styling: Tailwind v4 utilities in the markup. Theme tokens (colours, fonts, type scale, radii, breakpoints) and the few CSS-only mechanics live in `src/styles/global.css`; repeated class lists live in `src/lib/ui.ts`. Don't add new named CSS classes for one-off styling.
- `src/content/placeholders.ts` holds invented stand-in copy, shown only while the matching YAML field is empty. It is the one place invented text is allowed. Never move it into the YAML. `src/lib/data.ts` merges real data with these placeholders.
- Images used by the site live in `src/assets/` and are looked up by the path in the YAML (`src/lib/images.ts`).
- TypeScript uses `.ts` extensions in relative imports (`allowImportingTsExtensions`). Don't use enums, namespaces or parameter properties.

## Content rules

- Seed data contains `TODO`s. Only fill them in with facts the user provides.
- Never invent education, publications, awards or dates.
- Dates are `YYYY` or `YYYY-MM`. `end` may be `"present"`.
