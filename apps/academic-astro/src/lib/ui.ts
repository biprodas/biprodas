// Tailwind class lists reused across pages. One-off styles stay inline in the markup;
// only combinations that repeat live here, so each pattern is defined once.

export const ui = {
  /** Page <h1> */
  pageTitle:
    "text-[clamp(2rem,1.5rem+2.2vw,2.9rem)] leading-[1.12] font-semibold tracking-[-0.01em]",
  /** Intro paragraph under a page title */
  lede: "mt-[1.1rem] text-[1.16rem] leading-[1.55] text-ink-2",
  /** "See more" link line at the end of a section */
  more: "mt-5 text-[0.95rem]",
  /** Running text: paragraph spacing and hyphenation */
  prose: "space-y-4 [&_p]:hyphens-auto",
  /** Filled call-to-action */
  btnPrimary:
    "inline-flex items-center gap-2 rounded-full bg-pen px-5 py-2 font-sans text-[0.92rem] font-semibold text-paper no-underline transition-colors hover:bg-ink hover:text-paper",
  /** Two-column list: a short label/date, then the item; ruled rows */
  compact: "*:grid *:grid-cols-[5.5rem_1fr] *:gap-3 *:border-b *:border-rule *:py-[0.55rem]",
  /** Secondary line inside a compact row */
  sub: "text-[0.9rem] text-muted",
  /** Label + value list (contact, languages) */
  pairs: "grid gap-1.5 *:grid *:grid-cols-[7rem_1fr] *:items-baseline *:gap-2.5",
  /** Label in a `pairs` row */
  pairLabel: "text-muted italic",
  /** Stacked entries (journey, teaching) */
  entries: "grid gap-[2.1rem]",
  entryTitle: "text-[1.16rem] font-semibold",
  entryOrg: "text-ink-2 italic",
  /** Inline list of short terms (tech stack, coursework) */
  tags: "flex flex-wrap gap-x-[0.9rem] gap-y-0.5 text-[0.86rem] text-muted",
  /** Small rounded pill for a single term (skills) */
  pill: "inline-flex items-center rounded-full border border-rule bg-card px-2.5 py-0.5 font-sans text-[0.8rem] leading-snug text-ink-2",
  /** Card surface used for grouped content */
  card: "rounded-2xl border border-rule bg-card",
  /** Small capitals label inside a card */
  cardLabel: "font-sans text-[0.66rem] font-bold tracking-[0.16em] text-muted uppercase",
  /** Quoted / highlighted block with a pen-blue rule */
  noteBox: "border-l-2 border-pen py-0.5 pl-[0.9rem] text-ink-2",
  /** Dotted divider */
  dotted: "h-[2px] border-0 bg-[radial-gradient(circle,var(--rule)_1px,transparent_1.5px)] bg-size-[8px_2px] bg-repeat-x",
  /** Ruled list of short titled items (interests, principles, questions) */
  ruledList: "*:border-b *:border-rule *:py-[0.85rem] *:first:pt-0",
} as const;
