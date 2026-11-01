# biprodas — monorepo

Monorepo for Biprodas Roy's sites. The root `README.md` is the GitHub profile README — keep it that way; project docs live here.

| Path | What | Domain |
|---|---|---|
| `apps/academic-astro` | Academic site (Astro, "research notebook" design) | biprodas.com |
| `apps/dev` | Engineering portfolio (Next.js) — not yet scaffolded | biprodas.dev |
| `packages/content` | Single source of truth: YAML data + Zod schemas + typed loaders | — |
| `packages/readme` | Generates the content blocks of the root `README.md` (GitHub profile) | — |
| `packages/tokens` | Brand-neutral design primitives (spacing, type scale, radii) | — |
| `packages/config` | Shared tsconfig | — |

## Content

Edit YAML in `packages/content/data/`. Every item can carry `audience: academic | engineering | both`;
apps read only their slice via `projects("academic")`, `experience("engineering")`, etc.

Images that belong to the content (portrait, project covers) live in `packages/content/assets/`.
`assets/profile/biprodas-roy.jpeg` is the portrait. `avatar-style-reference.png` is a style reference for an
illustrated avatar, not a photo of Biprodas, so don't publish it as the portrait.

```sh
# needs pnpm 12 (pinned in package.json "packageManager")
pnpm install
pnpm validate          # schema, id/reference checks, README freshness (also runs before every build)
pnpm readme            # regenerate the profile README blocks after editing content
pnpm check-types
```

## Academic site (`apps/academic-astro`)

```sh
pnpm --filter @biprodas/academic dev     # http://localhost:4321
pnpm turbo run build --filter=@biprodas/academic
```

Static Astro 7 + Tailwind v4. Routes: `/`, `/research`, `/work`, `/work/[id]`, `/journey`, `/about`, `/cv` (print-ready).
All data comes from `packages/content` via `src/lib/data.ts`.

**Placeholders.** Fields that are still empty in the YAML (academic headline, summary, research interests and
statement, about, project `researchSummary`/`questions`, thesis, publications…) render invented stand-in text from
`src/content/placeholders.ts`. In `dev` they show a dotted amber underline (hover for the field name). Every build
prints the list still in use. Fill the YAML and each placeholder disappears; nothing invented lives in the YAML.

**Vercel.** Root directory `apps/academic-astro`, framework Astro, output `dist`. Static output needs no adapter.
Node ≥ 22.18 (the workspace packages are raw TypeScript).
Set the env var `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel installs with the pinned pnpm 12 instead of guessing from the lockfile.
