/** Repeated class lists. One-off styling stays inline in the markup. */
export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
export const eyebrow = "font-mono text-[0.7rem] tracking-[0.2em] text-dim uppercase";
export const panel = "rounded-panel border border-line bg-deep/70 backdrop-blur-sm";
export const panelHover =
  "transition-colors duration-300 hover:border-line-strong hover:bg-surface/80 focus-within:border-line-strong";
export const chip = "rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.7rem] text-muted";
export const textLink =
  "text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:decoration-signal";
export const buttonPrimary =
  "inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-void transition hover:bg-signal";
export const buttonGhost =
  "inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition hover:border-ink";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
