# biprodas.com: academic site

Biprodas Roy's academic site, for MS/PhD committees and researchers. Static Astro 7 + Tailwind v4, "research notebook" design.

```sh
npm install
npm run dev            # http://localhost:4321
npm run build          # also validates the data
npm run check-types
npm run format:check   # Prettier, including .astro files
npm test               # Vitest: unit tests in src/**/*.test.ts
```

Node 24 (`engines` in `package.json`; Vercel reads it too).

## Pages

`/` (About), `/research`, `/projects`, `/projects/[id]`, `/journey`, `/skills`, `/contact`, and a `404` page. `/about` redirects to `/` and
`/work/*` to `/projects/*`. The sidebar order lives in `src/lib/nav.ts`.

The sidebar's **Download CV** button serves `public/cv.pdf` (or the path in `cv` in `src/data/profile.yaml`). The build
warns while that file is missing.

## Data

YAML in `src/data/`. It's this site's curated copy of the master data in the repo-root [`data/`](../data/), reworded for
an academic audience. The loader in `src/data/index.ts` validates it with Zod (`src/data/schema.ts`) and checks for
duplicate ids and broken id references, so invalid data fails the build. Pages read it through `src/lib/data.ts`.

Images the site uses live in `src/assets/` and are looked up by the path in the YAML (`src/lib/images.ts`).

**Placeholders.** Fields that are still empty in the YAML (academic headline, summary, research interests and
statement, about, project `researchSummary`/`questions`, thesis, publications…) render invented stand-in text from
`src/lib/placeholders.ts`. In `npm run dev` they show a dotted amber underline (hover for the field name). Every build
prints the list still in use. Fill the YAML and each placeholder disappears; nothing invented lives in the YAML.

## Styling

Tailwind v4 utilities in the markup. Colours, fonts and the type scale are theme tokens in `src/styles/global.css`
(`bg-paper`, `text-ink-2`, `text-pen`, `border-rule`, `font-sans` …), and `dark:` follows both the toggle and the
system setting. Class lists that repeat across pages live in `src/lib/ui.ts`. `global.css` keeps only tokens, base
element styles and a few CSS-only mechanics (notebook grid, sidenotes, timeline markers, citation counters).

Icons use [astro-icon](https://www.astroicon.dev/) with Iconify sets: `fa6-brands` for logos, `lucide` for interface icons.
Map them in `src/lib/icons.ts` (only the icons listed there are bundled). Custom SVGs go in `src/icons/`.

## Navigation

Astro's `<ClientRouter />` (in `Base.astro`) swaps pages in place with hover prefetch instead of full reloads. The
sidebar doesn't animate between pages, and the saved theme is re-applied after each swap. Scripts that touch page
elements must run on `astro:page-load`, not just once.

## Deploy

Vercel project with Root Directory `academic-astro`, framework Astro, output `dist`. Static output needs no adapter.
`vercel.json` skips the build when a commit doesn't touch this folder, and redirects URLs without a trailing slash to the
slash form (matching `trailingSlash: "always"`), so `/foo` shows the site's own 404 page.
