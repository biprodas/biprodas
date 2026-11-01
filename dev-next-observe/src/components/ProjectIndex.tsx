"use client";

import { useState, type ReactNode } from "react";
import type { ProjectKind } from "@/content/types";
import { cn } from "@/lib/ui";

type Filter = "all" | ProjectKind;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "product", label: "Products" },
  { value: "client", label: "Client work" },
];

/** Filter tabs over server-rendered cards. Each card arrives with its kind. */
export function ProjectIndex({ cards }: { cards: { slug: string; kind: ProjectKind; card: ReactNode }[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = cards.filter((c) => filter === "all" || c.kind === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f.value === "all" ? cards.length : cards.filter((c) => c.kind === f.value).length;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === f.value
                  ? "border-ink bg-ink text-void"
                  : "border-line text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {f.label} <span className="ml-1 font-mono text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((c) => (
          <li key={c.slug}>{c.card}</li>
        ))}
      </ul>
    </div>
  );
}
