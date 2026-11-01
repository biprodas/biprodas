import type { ReactNode } from "react";
import { cn, eyebrow } from "@/lib/ui";

/** Section title with a mono "catalogue" label, e.g. §02 · OBSERVATION LOG. */
export function SectionHeading({
  index,
  label,
  title,
  children,
  as: Tag = "h2",
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 max-w-3xl space-y-4">
      <p className={cn(eyebrow, "flex items-center gap-3")}>
        <span className="text-signal">§{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span>{label}</span>
      </p>
      <Tag className={cn("font-display text-ink", Tag === "h1" ? "text-title" : "text-4xl sm:text-5xl")}>{title}</Tag>
      {children && <div className="text-lg leading-8 text-muted">{children}</div>}
    </div>
  );
}
