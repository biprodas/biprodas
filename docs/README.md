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

Static Astro 7 + Tailwind v4. Routes: `/` (About), `/research`, `/projects`, `/projects/[id]`, `/journey`, `/skills`, `/contact`; `/about` → `/` and `/work/*` → `/projects/*` redirect (sidebar order lives in `src/lib/nav.ts`).
The sidebar's **Download CV** button serves `public/cv.pdf` (or the path in `cv.academic` in `profile.yaml`); the build warns while that file is missing.
All data comes from `packages/content` via `src/lib/data.ts`.

**Styling.** Tailwind v4 utilities in the markup. Colours and fonts are theme tokens in `src/styles/global.css`
(`bg-paper`, `text-ink-2`, `text-pen`, `border-rule`, `font-sans` …), and `dark:` follows both the toggle and the
system setting. Class lists that repeat across pages live in `src/lib/ui.ts`. `global.css` keeps only tokens, base
element styles and a few CSS-only mechanics (notebook grid, sidenotes, timeline markers, citation counters).

**Navigation.** Astro's `<ClientRouter />` (in `Base.astro`) swaps pages in place with hover prefetch instead of full
reloads. The sidebar doesn't animate between pages, and the saved theme is re-applied after each swap. Scripts that
touch page elements must run on `astro:page-load`, not just once.

Icons use [astro-icon](https://www.astroicon.dev/) with Iconify sets: `fa6-brands` for logos, `lucide` for interface icons.
Map them in `src/lib/icons.ts` (only the icons listed there are bundled). Custom SVGs go in `src/icons/`.

**Placeholders.** Fields that are still empty in the YAML (academic headline, summary, research interests and
statement, about, project `researchSummary`/`questions`, thesis, publications…) render invented stand-in text from
`src/content/placeholders.ts`. In `dev` they show a dotted amber underline (hover for the field name). Every build
prints the list still in use. Fill the YAML and each placeholder disappears; nothing invented lives in the YAML.

**Vercel.** Root directory `apps/academic-astro`, framework Astro, output `dist`. Static output needs no adapter.
Node ≥ 22.18 (the workspace packages are raw TypeScript).
Set the env var `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel installs with the pinned pnpm 12 instead of guessing from the lockfile.
