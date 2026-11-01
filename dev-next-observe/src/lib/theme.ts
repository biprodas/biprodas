export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

/**
 * Runs inline in <head>, before first paint: applies the stored theme, or the system setting when none is
 * stored, and keeps following the system until the visitor picks one. Kept as plain ES5 in a string.
 */
export const themeScript = `(function(){
var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: light)");
function stored(){try{return localStorage.getItem("${THEME_KEY}")}catch(e){return null}}
function apply(){var t=stored();d.setAttribute("data-theme",t==="light"||t==="dark"?t:(m.matches?"light":"dark"))}
apply();
m.addEventListener("change",function(){if(!stored())apply()});
})()`;
