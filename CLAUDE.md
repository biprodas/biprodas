# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This repo has two jobs

1. It is the **GitHub profile repo** (`biprodas/biprodas`). The root `README.md` renders on github.com/biprodas.
   - Never replace the root `README.md` with project docs.
   - Never add `.github/README.md`. It would take priority over the root README on the repo page.
   - The repo must stay public.
   - Monorepo docs live in `docs/README.md`.
2. It is a **pnpm + Turborepo monorepo** for Biprodas Roy's personal sites:
   - `apps/academic`: Astro, deployed to biprodas.com. Audience: MS/PhD committees and researchers. Engineering readers are secondary.
   - `apps/dev`: Next.js App Router, deployed to biprodas.dev. Audience: recruiters and clients. Creative and interactive.
   - Neither app is scaffolded yet. Both deploy as separate Vercel projects from this repo. The architecture plan was approved before implementation.

## Commands

pnpm may not be on PATH. Use `corepack pnpm …`, or run `corepack enable` once. Turbo itself needs a `pnpm` binary on PATH.

```sh
pnpm install
pnpm validate            # content schema + duplicate-id check (turbo runs it before every build)
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
