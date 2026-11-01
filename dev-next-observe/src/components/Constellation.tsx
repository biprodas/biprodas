import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { placeStars, type Point } from "@/lib/constellation";
import { skyCoordinates } from "@/lib/hash";
import { cn } from "@/lib/ui";

const BOX = 140;
const C = BOX / 2;

function Path({ points, className }: { points: Point[]; className: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden
    >
      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 6"
        vectorEffect="non-scaling-stroke"
        className="text-line-strong"
      />
    </svg>
  );
}

/** Every project as a star. Hover or focus one to draw its constellation. */
export function Constellation({ projects }: { projects: Project[] }) {
  const placements = placeStars(projects.map((p) => p.slug));

  return (
    <div className="relative overflow-hidden rounded-panel border border-line bg-deep/40">
      {/* Graticule: a faint RA/DEC grid with edge ticks. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-size-[12.5%_25%] opacity-40 max-md:bg-size-[25%_12.5%]"
      />
      <div aria-hidden className="pointer-events-none absolute top-3 left-4 font-mono text-[0.65rem] text-dim">
        FIELD 01 · PROJECTS
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 bottom-3 font-mono text-[0.65rem] text-dim max-sm:hidden"
      >
        ◆ product · ● client work
      </div>

      <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/8]">
        <Path points={placements.map((p) => p.narrow)} className="md:hidden" />
        <Path points={placements.map((p) => p.wide)} className="max-md:hidden" />

        <ul>
          {projects.map((project, i) => {
            const { wide, narrow, satellites } = placements[i];
            const isProduct = project.kind === "product";
            const style = {
              "--x": `${wide.x}%`,
              "--y": `${wide.y}%`,
              "--mx": `${narrow.x}%`,
              "--my": `${narrow.y}%`,
            } as CSSProperties;
            return (
              <li
                key={project.slug}
                className="absolute top-(--my) left-(--mx) md:top-(--y) md:left-(--x)"
                style={style}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group relative flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg focus-visible:outline-offset-8"
                >
                  <svg
                    viewBox={`0 0 ${BOX} ${BOX}`}
                    width={BOX}
                    height={BOX}
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
                  >
                    {satellites.map((s, j) => {
                      const from = j === 0 ? { x: 0, y: 0 } : satellites[j - 1];
                      return (
                        <line
                          key={`l${j}`}
                          x1={C + from.x}
                          y1={C + from.y}
                          x2={C + s.x}
                          y2={C + s.y}
                          pathLength={1}
                          stroke="currentColor"
                          strokeWidth="0.8"
                          className={cn("constellation-line", isProduct ? "text-aurora" : "text-signal")}
                        />
                      );
                    })}
                    {satellites.map((s, j) => (
                      <circle
                        key={`s${j}`}
                        cx={C + s.x}
                        cy={C + s.y}
                        r={1.3}
                        className="fill-dim transition-colors duration-500 group-hover:fill-ink"
                      />
                    ))}
                  </svg>

                  <span
                    aria-hidden
                    className={cn(
                      "relative block size-3 rotate-45 transition-transform duration-300 group-hover:scale-125",
                      isProduct
                        ? "bg-aurora shadow-[0_0_18px_4px] shadow-aurora/40"
                        : "rounded-full bg-signal shadow-[0_0_18px_4px] shadow-signal/40",
                      project.featured && "animate-pulse-star",
                    )}
                  />
                  <span className="mt-4 w-32 text-center sm:w-36">
                    <span className="block text-sm leading-tight font-medium text-ink transition-colors group-hover:text-signal">
                      {project.shortTitle ?? project.title}
                    </span>
                    <span className="mt-1 block font-mono text-[0.6rem] text-dim">{skyCoordinates(project.slug)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
