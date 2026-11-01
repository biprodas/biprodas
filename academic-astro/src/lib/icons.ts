// Icon names for astro-icon (Iconify sets), keyed by the platform names in profile.yaml `social`.
// Brand logos come from Font Awesome 6 Brands; interface icons from Lucide (Lucide has no brand logos).
// astro.config.mjs bundles exactly these icons via `iconInclude`.

export const socialIcons: Record<string, string> = {
  github: "fa6-brands:github",
  linkedin: "fa6-brands:linkedin",
  scholar: "fa6-brands:google-scholar",
  orcid: "fa6-brands:orcid",
  researchgate: "fa6-brands:researchgate",
  x: "fa6-brands:x-twitter",
};

export const uiIcons = {
  email: "lucide:mail",
  website: "lucide:globe",
  moon: "lucide:moon",
  sun: "lucide:sun",
  download: "lucide:download",
  location: "lucide:map-pin",
  arrow: "lucide:arrow-right",
  arrowUp: "lucide:arrow-up",
  clock: "lucide:clock",
  external: "lucide:arrow-up-right",
  lock: "lucide:lock",
} as const;

/** `include` option for the astro-icon integration: { set: [names] }. */
export const iconInclude: Record<string, string[]> = {};
for (const full of [...Object.values(socialIcons), ...Object.values(uiIcons)]) {
  const [set, name] = full.split(":") as [string, string];
  (iconInclude[set] ??= []).push(name);
}
