"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { pad2 } from "@/lib/format";
import { domains, projects } from "@/content/projects";
import type { Domain } from "@/content/types";
import { ProjectEntry } from "./project-entry";

const ALL = "All";

/** The full project catalogue with a domain filter. */
export function ProjectList() {
  const [domain, setDomain] = useState<Domain | typeof ALL>(ALL);
  const visible = domain === ALL ? projects : projects.filter((p) => p.domains.includes(domain));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by domain">
        {[ALL, ...domains].map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={domain === d}
            onClick={() => setDomain(d as Domain | typeof ALL)}
            className={cn(
              "cursor-pointer border px-2.5 py-1 font-mono text-[0.7rem] transition-colors",
              domain === d
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card text-ink-2 hover:border-primary/50 hover:text-primary",
            )}
          >
            {d}
          </button>
        ))}
        <span className="ml-auto text-meta" aria-live="polite">
          {visible.length} of {projects.length}
        </span>
      </div>
      <div className="border-t pt-6">
        {visible.map((p) => (
          <ProjectEntry key={p.slug} project={p} number={pad2(projects.indexOf(p) + 1)} />
        ))}
      </div>
    </div>
  );
}
