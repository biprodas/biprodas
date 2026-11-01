"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { cn, container } from "@/lib/ui";
import { CommandPalette, type PaletteItem } from "./CommandPalette";
import { ThemeToggle } from "./ThemeToggle";

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-signal" aria-hidden>
      <path d="M12 2 13.6 10.4 22 12 13.6 13.6 12 22 10.4 13.6 2 12 10.4 10.4Z" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader({ paletteItems }: { paletteItems: PaletteItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-void/70 backdrop-blur-md">
      <div className={cn(container, "flex h-16 items-center justify-between gap-4")}>
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <Mark />
          <span className="font-mono text-sm tracking-wide text-ink">
            biprodas<span className="text-dim group-hover:text-signal">.dev</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    isActive(item.href) ? "bg-surface text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span className="mr-1.5 font-mono text-[0.65rem] text-dim">{item.code}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CommandPalette items={paletteItems} />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              {menuOpen ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3 7h14M3 13h14" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line md:hidden">
          <ul className={cn(container, "flex flex-col py-3")}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-baseline gap-3 py-3 text-lg",
                    isActive(item.href) ? "text-ink" : "text-muted",
                  )}
                >
                  <span className="font-mono text-xs text-dim">{item.code}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
