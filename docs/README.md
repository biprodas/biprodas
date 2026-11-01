# biprodas

Biprodas Roy's GitHub profile and personal sites. The root `README.md` is the GitHub profile README, so keep it that way. Project docs live here.

| Path | What | Domain |
|---|---|---|
| `README.md` + `readme/` | GitHub profile README (hand-written) and its images | github.com/biprodas |
| `data/` | Master data: everything about Biprodas, in YAML. Not imported by anything | — |
| `academic/` | Academic site (Astro, "research notebook" design) | biprodas.com |
| `dev/` | Engineering portfolio (Next.js), not yet scaffolded | biprodas.dev |

There's no workspace, no shared packages and no Turborepo. Each site is a standalone project with its own
`package.json`, lockfile and `node_modules`.

## Data

`data/` is the master copy: full profile, experience, education, projects, skills, publications and so on.
Each site keeps its own curated copy in its own folder (`academic/src/data/`) and rewords it for its audience.
To change a fact, edit `data/` first, then copy the change into each site that shows it.

Items can carry `audience: academic | engineering | both` in the master as a hint for curation. The site
copies keep the tag, and the academic site still filters on it.

Photos live in `data/assets/`. `assets/profile/biprodas-roy.jpeg` is the portrait. `avatar-style-reference.png` is
a style reference for an illustrated avatar, not a photo of Biprodas, so don't publish it as the portrait.
Copy the images a site uses into that site (`academic/src/assets/`).

## Academic site (`academic/`)

```sh
cd academic
pnpm install           # needs pnpm 12 (pinned in package.json "packageManager")
pnpm dev               # http://localhost:4321
pnpm build
pnpm check-types
```

Static Astro 7 + Tailwind v4. Routes: `/` (About), `/research`, `/projects`, `/projects/[id]`, `/journey`, `/skills`, `/contact`; `/about` → `/` and `/work/*` → `/projects/*` redirect (sidebar order lives in `src/lib/nav.ts`).
The sidebar's **Download CV** button serves `public/cv.pdf` (or the path in `cv.academic` in `profile.yaml`); the build warns while that file is missing.

**Data.** YAML in `src/data/`, validated with Zod (`src/data/schema.ts`) by the loader in `src/data/index.ts`,
which also checks for duplicate ids and broken id references. Invalid data fails the build. Pages read it through
`src/lib/data.ts`.

**Styling.** Tailwind v4 utilities in the markup. Colours, fonts and the type scale are theme tokens in `src/styles/global.css`
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

**Vercel.** Root directory `academic`, framework Astro, output `dist`. Static output needs no adapter. Node ≥ 22.18.
Set the env var `ENABLE_EXPERIMENTAL_COREPACK=1` so Vercel installs with the pinned pnpm 12 instead of guessing from the lockfile.
`academic/vercel.json` skips the build when a commit doesn't touch `academic/`.

## Profile README

`README.md` is hand-written. Its header and footer images and the tech-stack tiles are static files in `readme/`;
edit them directly.
