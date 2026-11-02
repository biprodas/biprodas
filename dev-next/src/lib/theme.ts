import { siteConfig } from "@/config/site";

const fallback =
  siteConfig.appearance.theme === "system"
    ? 'matchMedia("(prefers-color-scheme: dark)").matches'
    : String(siteConfig.appearance.theme === "dark");

/**
 * Theme = the `dark` class on <html>. This inline script runs before first paint
 * (Next.js docs: "Preventing flash before hydration"): a saved choice wins,
 * otherwise siteConfig.appearance.theme.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":${fallback};document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // Storage blocked: the toggle still works for this page view.
  }
}
