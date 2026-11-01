import type { ReactNode } from "react";
import { cn } from "@/lib/ui";

/**
 * Fades and lifts content in as it scrolls into view, using a CSS scroll-driven animation (see `.reveal` in
 * globals.css). Without support, or with reduced motion, content is simply visible — never hidden behind JS.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
