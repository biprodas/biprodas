# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This repo has two jobs

1. It is the **GitHub profile repo** (`biprodas/biprodas`). The root `README.md` renders on github.com/biprodas.
   - Never replace the root `README.md` with project docs.
   - Never add `.github/README.md`. It would take priority over the root README on the repo page.
   - The repo must stay public.
   - Monorepo docs live in `docs/README.md`.
   - The README is partly generated. Blocks between `<!-- content:<name>:start/end -->` markers are rendered from `packages/content` by `packages/readme/src/generate.ts`. Never hand-edit inside the markers: change the YAML and run `pnpm readme`. Everything outside the markers is hand-written. The header and footer images `packages/readme/assets/{header,footer}.svg` are also generated, by `src/header-svg.ts`; the header's text comes from `profile.yaml`. Don't edit them by hand. `pnpm validate` fails if any of these files is stale.
   - The README tech stack shows only skills that have a logo in the `logos` map in `generate.ts`, which uses skillicons.dev ids or local `tile:<slug>` tiles. Tiles are built from Simple Icons by `pnpm --filter @biprodas/readme icons` (`src/build-icons.ts`) and committed in `assets/icons/`.
2. It is a **pnpm + Turborepo monorepo** for Biprodas Roy's personal sites:
   - `apps/academic-astro`: Astro, deployed to biprodas.com. Audience: MS/PhD committees and researchers. Engineering readers are secondary.
   - `apps/dev`: Next.js App Router, deployed to biprodas.dev. Audience: recruiters and clients. Creative and interactive.
   - `apps/academic-astro` is scaffolded (Astro 7, static, "research notebook" design). `apps/dev` is not yet. Both deploy as separate Vercel projects from this repo.
   - `apps/academic-astro/src/content/placeholders.ts` holds invented stand-in copy, shown only while the matching YAML field is empty. It is the one place invented text is allowed. Never move it into the YAML. `src/lib/data.ts` merges real data with these placeholders.

## Commands

The repo pins pnpm 12 (`packageManager` in `package.json`). Turbo needs a matching `pnpm` binary on PATH; an older pnpm earlier on PATH fails with a version error.

```sh
pnpm install
pnpm validate            # content schema + id/reference checks + README freshness (turbo runs it before every build)
pnpm readme              # regenerate the content blocks in the root README.md
pnpm check-types         # tsc across all packages
pnpm build | pnpm dev    # turbo run build/dev
pnpm turbo run <task> --filter=@biprodas/content   # single package
node packages/content/src/validate.ts               # validate content directly
```

There is no test runner or linter configured yet.

## Architecture

**`packages/content` is the single source of truth.**
- All personal data lives there: profile, experience, education, projects, awards and skills. It is stored as YAML in `packages/content/data/`.
- `src/schema/index.ts` validates the data with Zod v4. `src/index.ts` loads it with typed loaders.
- Apps import it at **build time**. There is no CMS, database or runtime API.
- Planned additions:
  - `publications.bib`, for BibTeX publications
  - MDX case studies
  - a CV/résumé PDF generated from this data with Typst
  - a profile README generated from this data

**Audience slicing.**
- Items carry `audience: academic | engineering | both`.
- Apps fetch only their slice with selectors such as `projects("academic")` or `experience("engineering")`. Items tagged `both` appear on both sites.
- Projects can carry per-site fields: `researchSummary` (used by .com) and `caseStudy` (used by .dev).
- When adding a new content type, follow the same pattern: add a Zod schema, add it to the `Content` object, add a YAML file, and add a selector that uses `forSite`.

**Share data and primitives, not visual components.**
- `packages/tokens` holds brand-neutral primitives: spacing, type scale, radii and breakpoints. They exist as TS in `src/index.ts` and as a Tailwind v4 `@theme` file in `primitives.css`, and the two must be kept in sync.
- Colors, fonts and motion belong to each app, so the two sites keep distinct design identities.
- Shared React code, if any, should be headless, so it works both in Next.js and as Astro islands.

**TypeScript without a build step.**
- Packages export raw `.ts` (`"exports": "./src/index.ts"`) and use `.ts` extensions in relative imports. This relies on `allowImportingTsExtensions` and `erasableSyntaxOnly`.
- Node 22.18+ runs these files directly through type stripping. Don't use enums, namespaces or parameter properties.
- The shared tsconfig is `packages/config/tsconfig.base.json`.

## Content rules

- Seed data contains `TODO`s. Only fill them in with facts the user provides.
- Never invent education, publications, awards or dates.
- Dates are `YYYY` or `YYYY-MM`. `end` may be `"present"`.
