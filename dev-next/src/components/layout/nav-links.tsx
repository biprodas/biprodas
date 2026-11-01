"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, sectionFor } from "@/lib/nav";
import { pad2 } from "@/lib/format";

export function NavLinks() {
  const current = sectionFor(usePathname())?.href;
  return (
    <nav className="lg:-mx-3" aria-label="Main">
      <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-0.5 lg:m-0 lg:grid lg:gap-0.5">
        {nav.map((n, i) => (
          <li key={n.href}>
            <Link
              href={n.href}
              aria-current={n.href === current ? "page" : undefined}
              className="group flex items-baseline gap-3 py-0.5 text-[0.9rem] text-ink-2 transition-colors hover:text-primary aria-[current=page]:font-semibold aria-[current=page]:text-foreground lg:relative lg:px-3 lg:py-1 lg:hover:bg-wash lg:aria-[current=page]:bg-wash lg:aria-[current=page]:after:absolute lg:aria-[current=page]:after:top-1/2 lg:aria-[current=page]:after:right-3.5 lg:aria-[current=page]:after:size-1 lg:aria-[current=page]:after:-translate-y-1/2 lg:aria-[current=page]:after:bg-primary"
            >
              <span
                aria-hidden
                className="hidden min-w-[1.1rem] font-mono text-[0.62rem] text-muted-foreground/70 group-aria-[current=page]:text-primary lg:inline"
              >
                {pad2(i + 1)}
              </span>
              {n.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
