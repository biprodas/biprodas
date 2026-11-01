import type { ProductStatus } from "@/content/types";
import { cn } from "@/lib/ui";

const LABEL: Record<ProductStatus, string> = { live: "Live", building: "In orbit · building", sunset: "Sunset" };
const DOT: Record<ProductStatus, string> = { live: "bg-aurora", building: "bg-signal", sunset: "bg-dim" };

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", DOT[status], status === "live" && "animate-pulse-star")}
      />
      {LABEL[status]}
    </span>
  );
}
