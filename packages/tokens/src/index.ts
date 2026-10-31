// Brand-neutral primitives shared by every app. Colors, fonts and motion are
// deliberately absent: each app owns its own visual identity.

export const space = {
  0: "0", 1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem", 6: "1.5rem",
  8: "2rem", 12: "3rem", 16: "4rem", 24: "6rem", 32: "8rem",
} as const;

// Modular type scale (ratio 1.25), in rem.
export const fontSize = {
  xs: "0.64rem", sm: "0.8rem", base: "1rem", lg: "1.25rem", xl: "1.563rem",
  "2xl": "1.953rem", "3xl": "2.441rem", "4xl": "3.052rem", "5xl": "3.815rem",
} as const;

export const radius = { none: "0", sm: "0.25rem", md: "0.5rem", lg: "1rem", full: "9999px" } as const;

export const breakpoint = { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem" } as const;

export const measure = { prose: "68ch", wide: "80rem" } as const;
