import type { ArchitectureLayer } from "@/content/types";
import { cn, eyebrow } from "@/lib/ui";

/** A layered system sketch: each layer is a row, data flows top to bottom. */
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <figure className="rounded-panel border border-line bg-deep/60 p-4 sm:p-6">
      <ol className="space-y-0">
        {layers.map((layer, i) => (
          <li key={layer.label}>
            <div className="grid gap-3 sm:grid-cols-[7rem_1fr] sm:items-center">
              <p className={cn(eyebrow, "text-[0.65rem]")}>
                <span className="text-signal">L{i + 1}</span> {layer.label}
              </p>
              <ul className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line-strong bg-surface px-3 py-2 font-mono text-xs text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <div aria-hidden className="flex h-7 items-center sm:pl-[7.75rem]">
                <span className="ml-6 h-full w-px bg-[linear-gradient(to_bottom,var(--color-line-strong)_50%,transparent_50%)] bg-size-[1px_6px]" />
              </div>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">System layers, from the client down to data and external services.</figcaption>
    </figure>
  );
}
