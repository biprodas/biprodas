"use client";

import { useSyncExternalStore } from "react";
import { RowsIcon, SquaresFourIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type SkillArea = { slug: string; title: string; skills: { name: string; where: string[] }[] };

type View = "cards" | "list";
const storageKey = "skills-view";

let memory: View = "cards";
const listeners = new Set<() => void>();

function readView(): View {
  try {
    return localStorage.getItem(storageKey) === "list" ? "list" : "cards";
  } catch {
    return memory;
  }
}

function writeView(v: View) {
  memory = v;
  try {
    localStorage.setItem(storageKey, v);
  } catch {
    // Storage blocked: the in-memory value covers this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function Pill({ name, where }: { name: string; where: string[] }) {
  return (
    <li
      title={where.length ? `Used in ${where.join(", ")}` : undefined}
      className="group/pill inline-flex cursor-default items-center gap-1.5 rounded-sm border bg-background px-2 py-0.5 text-[0.82rem] leading-snug text-ink-2 transition-colors duration-150 hover:border-primary/60 hover:bg-wash hover:text-primary"
    >
      {name}
      {where.length > 0 && (
        <span className="text-[0.68rem] text-muted-foreground tabular-nums transition-colors group-hover/pill:text-primary">
          {where.length}
          <span className="sr-only"> {where.length === 1 ? "project or role" : "projects or roles"}</span>
        </span>
      )}
    </li>
  );
}

function Pills({ skills, className }: { skills: SkillArea["skills"]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {skills.map((s) => (
        <Pill key={s.name} {...s} />
      ))}
    </ul>
  );
}

const views = [
  { id: "cards", label: "Cards", icon: SquaresFourIcon },
  { id: "list", label: "List", icon: RowsIcon },
] as const;

export function SkillAreas({ areas }: { areas: SkillArea[] }) {
  const view = useSyncExternalStore(subscribe, readView, () => "cards" as const);

  return (
    <>
      <div role="group" aria-label="Layout" className="mb-4 flex justify-end">
        <div className="inline-flex border bg-card p-0.5">
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              onClick={() => writeView(v.id)}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 px-2.5 text-[0.78rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary",
                view === v.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary",
              )}
            >
              <v.icon aria-hidden className="size-3.5" />
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {areas.map((a) => (
            <section
              key={a.slug}
              aria-labelledby={`g-${a.slug}`}
              className="group border bg-card px-5 pt-4 pb-5 transition-colors duration-200 hover:border-primary/40 hover:bg-[color-mix(in_oklab,var(--primary)_4%,var(--card))]"
            >
              <h3
                id={`g-${a.slug}`}
                className="text-[1.02rem] font-semibold transition-colors duration-200 group-hover:text-primary"
              >
                {a.title}
              </h3>
              <Pills skills={a.skills} className="mt-3" />
            </section>
          ))}
        </div>
      ) : (
        <div className="border-t border-foreground/70">
          {areas.map((a) => (
            <section
              key={a.slug}
              aria-labelledby={`g-${a.slug}`}
              className="grid grid-cols-1 gap-x-6 gap-y-2 border-b py-3.5 sm:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <h3 id={`g-${a.slug}`} className="pt-0.5 text-[0.95rem] leading-snug font-semibold">
                {a.title}
              </h3>
              <Pills skills={a.skills} />
            </section>
          ))}
        </div>
      )}
    </>
  );
}
