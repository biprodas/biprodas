"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { toggleTheme } from "@/lib/theme";

export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cn(
        "inline-grid cursor-pointer place-items-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-wash hover:text-primary [&_svg]:size-[1.05rem]",
        className,
      )}
    >
      {/* Both icons render; CSS picks one, so server and client markup match. */}
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
