"use client";

import { useState } from "react";
import type { Testimonial } from "@/content/types";
import { cn } from "@/lib/utils";
import { circleOf, type Circle } from "./parts";
import { groupByPerson, TestimonialCard } from "./testimonial-card";

const filters: { id: Circle | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "clients", label: "Clients" },
  { id: "teammates", label: "Teammates" },
];

/** Masonry of testimonial cards with a clients / teammates filter. Renders everything without JS. */
export function TestimonialWall({ testimonials }: { testimonials: Testimonial[] }) {
  const [filter, setFilter] = useState<Circle | "all">("all");
  const count = (id: Circle | "all") =>
    id === "all" ? testimonials.length : testimonials.filter((t) => circleOf(t) === id).length;
  const visible = filter === "all" ? testimonials : testimonials.filter((t) => circleOf(t) === filter);
  const options = filters.filter((f) => count(f.id) > 0);

  return (
    <div>
      {options.length > 2 && (
        <div className="mb-6 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter testimonials">
          {options.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 border px-3 py-1 font-mono text-xs transition-colors",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-ink-2 hover:border-primary/50 hover:text-primary",
              )}
            >
              {f.label}
              <span className={cn("tabular-nums", filter === f.id ? "opacity-75" : "text-muted-foreground")}>
                {count(f.id)}
              </span>
            </button>
          ))}
          <span className="ml-auto text-meta" aria-live="polite">
            {visible.length} of {testimonials.length}
          </span>
        </div>
      )}
      <ul className="gap-5 md:columns-2">
        {groupByPerson(visible).map((quotes) => (
          <li key={quotes[0].id} className="mb-5 break-inside-avoid">
            <TestimonialCard quotes={quotes} />
          </li>
        ))}
      </ul>
    </div>
  );
}
