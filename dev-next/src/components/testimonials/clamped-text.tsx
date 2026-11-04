"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/**
 * Clamps long text to a few lines with a "See more" toggle. Text that would hide only a line or so
 * is shown in full instead, so the button never reveals just a few words. Screen readers always get
 * the full text.
 */
export function ClampedText({
  children,
  clamp,
  className,
}: {
  children: ReactNode;
  /** A static Tailwind class such as "line-clamp-5". */
  clamp: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [fits, setFits] = useState(false);
  const [overflows, setOverflows] = useState(false);

  // Measured once with the clamp applied, at the width the card first renders.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const hidden = el.scrollHeight - el.clientHeight;
    const line = parseFloat(getComputedStyle(el).lineHeight) || 24;
    if (hidden > line * 1.5) setOverflows(true);
    else setFits(true);
  }, []);

  return (
    <div>
      <div ref={ref} className={cn(className, !open && !fits && clamp)}>
        {children}
      </div>
      {(overflows || open) && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-2 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-foreground"
        >
          {open ? "See less" : "See more"}
          {open ? <CaretUpIcon aria-hidden className="size-3.5" /> : <CaretDownIcon aria-hidden className="size-3.5" />}
        </button>
      )}
    </div>
  );
}
