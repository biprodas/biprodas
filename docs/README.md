# biprodas — monorepo

Monorepo for Biprodas Roy's sites. The root `README.md` is the GitHub profile README — keep it that way; project docs live here.

| Path | What | Domain |
|---|---|---|
| `apps/academic` | Academic site (Astro) — not yet scaffolded | biprodas.com |
| `apps/dev` | Engineering portfolio (Next.js) — not yet scaffolded | biprodas.dev |
| `packages/content` | Single source of truth: YAML data + Zod schemas + typed loaders | — |
| `packages/readme` | Generates the content blocks of the root `README.md` (GitHub profile) | — |
| `packages/tokens` | Brand-neutral design primitives (spacing, type scale, radii) | — |
| `packages/config` | Shared tsconfig | — |

## Content

Edit YAML in `packages/content/data/`. Every item can carry `audience: academic | engineering | both`;
apps read only their slice via `projects("academic")`, `experience("engineering")`, etc.

```sh
corepack enable        # once, provides pnpm
pnpm install
pnpm validate          # schema, id/reference checks, README freshness (also runs before every build)
pnpm readme            # regenerate the profile README blocks after editing content
pnpm check-types
```
