# biprodas.dev — Digital Observatory

Biprodas Roy's developer portfolio, for recruiters and clients. The design is a night sky: a canvas star field,
projects drawn as constellations, and coordinate-style labels throughout.

Next.js 16 (App Router, Cache Components, React Compiler), Tailwind CSS v4 and MDX. Every route is prerendered as
static HTML. Deployed on Vercel with Root Directory set to `dev-next-observe`.

## Commands

```sh
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
npm run check-types
npm test             # Vitest
npm run format       # Prettier; format:check in CI
```

## Structure

```
src/
  app/                 routes: /, /work, /work/[slug], /products, /research, /writing, /writing/[slug], /about
                       plus not-found, opengraph-image, sitemap, robots, icon
  components/          StarField (canvas), Constellation, Timeline, CommandPalette (⌘K or /), ...
  content/             everything the site says — edit these to change the copy
    types.ts
    profile.ts  experience.ts  projects.ts  research.ts  skills.ts  education.ts  posts.ts
    writing/<slug>.mdx essay bodies
  lib/                 dates, seeded hash/PRNG, constellation layout, posts, site config, shared class lists
  assets/              portrait (optimised by next/image)
```

## Editing content

- **Facts** (employers, titles, dates, projects, education, certifications) come from the master data in
  [`../data/`](../data/). Change them there first, then here.
- **Narrative copy** in files marked `Invented copy — replace with real content` is a stand-in: case-study prose,
  research directions, essays, principles. Replace it as real material becomes available.
- **New essay**: add an entry to `src/content/posts.ts` and a matching `src/content/writing/<slug>.mdx`.
- **New case study**: add a `caseStudy` to the project in `src/content/projects.ts`. Featured projects must have one;
  the content tests check this.
