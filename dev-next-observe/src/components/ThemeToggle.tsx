"use client";

import { THEME_KEY, type Theme } from "@/lib/theme";

/**
 * Switches between the night sky and the printed atlas. The icon is chosen in CSS from data-theme, so the
 * server render never has to guess the visitor's theme.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this page view only.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between dark and light theme"
      title="Switch theme"
      className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-ink"
    >
      {/* Moon in light mode (go dark), sun in dark mode (go light). */}
      <svg
        viewBox="0 0 20 20"
        className="size-4 light:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <circle cx="10" cy="10" r="3.5" />
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" />
      </svg>
      <svg
        viewBox="0 0 20 20"
        className="hidden size-4 light:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9Z" />
      </svg>
    </button>
  );
}
