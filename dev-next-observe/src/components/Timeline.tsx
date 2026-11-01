import type { Experience } from "@/content/types";
import { formatDuration, formatRange, monthsBetween } from "@/lib/dates";
import { chip, cn } from "@/lib/ui";

const EMPLOYMENT: Record<NonNullable<Experience["employment"]>, string> = {
  "full-time": "Full-time",
  contract: "Contract",
  founder: "Founder",
};

/** The career as an observation log: one entry per organisation, newest first. */
export function Timeline({ items, compact = false }: { items: Experience[]; compact?: boolean }) {
  return (
    <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-10">
      {items.map((item, i) => {
        const first = item.positions[item.positions.length - 1];
        const last = item.positions[0];
        const span = monthsBetween(first.start, last.end);
        return (
          <li key={item.slug} className="relative">
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 -left-[calc(1.5rem+4.5px)] size-2.5 rounded-full ring-4 ring-void sm:-left-[calc(2.5rem+4.5px)]",
                i === 0 ? "bg-signal" : "bg-line-strong",
              )}
            />
            <p className="font-mono text-xs text-dim">
              OBS-{String(items.length - i).padStart(2, "0")} · {formatRange(first.start, last.end)} ·{" "}
              {formatDuration(span)}
            </p>
            <h3 className="mt-2 text-xl font-medium text-ink">{item.org}</h3>
            <p className="mt-1 text-sm text-muted">
              {item.location}
              {item.mode === "remote" && " · Remote"}
              {item.employment && ` · ${EMPLOYMENT[item.employment]}`}
            </p>

            <ul className="mt-3 space-y-1">
              {item.positions.map((p) => (
                <li key={p.title} className="flex flex-wrap items-baseline gap-x-3 text-sm">
                  <span className="text-ink">{p.title}</span>
                  {item.positions.length > 1 && (
                    <span className="font-mono text-xs text-dim">{formatRange(p.start, p.end)}</span>
                  )}
                </li>
              ))}
            </ul>

            {compact ? (
              <p className="mt-3 max-w-2xl leading-7 text-muted">{item.summary}</p>
            ) : (
              <>
                <ul className="mt-4 max-w-3xl space-y-2.5">
                  {item.highlights.map((h) => (
                    <li key={h} className="relative pl-5 leading-7 text-muted">
                      <span aria-hidden className="absolute top-3 left-0 h-px w-2.5 bg-signal" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <li key={t} className={chip}>
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
