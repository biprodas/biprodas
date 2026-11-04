import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

/** Small uppercase mono label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 bg-primary" />
      {children}
    </p>
  );
}

/** Top of every inner page: eyebrow, title, optional lede. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-14", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">{title}</h1>
      {lede && <p className="mt-2 text-muted-foreground">{lede}</p>}
    </header>
  );
}

/**
 * A titled block: heading followed by a dotted rule. Add `wide` to span into the notes column.
 * `action` (e.g. a view toggle) sits at the end of the heading row.
 */
export function Section({
  title,
  id,
  children,
  className,
  action,
}: {
  title: string;
  id?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  const heading = (
    <h2
      id={id && `${id}-h`}
      className={cn("flex items-center gap-4 text-2xl font-semibold", action ? "min-w-0 flex-1" : "mb-6")}
    >
      <span>{title}</span>
      <span
        aria-hidden
        className="h-px flex-1 bg-[linear-gradient(to_right,var(--border)_60%,transparent_60%)] bg-size-[6px_1px]"
      />
    </h2>
  );
  return (
    <section aria-labelledby={id && `${id}-h`} id={id} className={cn("mt-16 scroll-mt-6", className)}>
      {action ? (
        <div className="mb-6 flex items-center gap-4">
          {heading}
          {action}
        </div>
      ) : (
        heading
      )}
      {children}
    </section>
  );
}

/** Side note: floats into the notes column on wide screens, an inline callout otherwise. */
export function MarginNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className="margin-note">
      <p className="mb-1 font-mono text-xs font-semibold tracking-[0.14em] text-ink-2 uppercase">{label}</p>
      {children}
    </aside>
  );
}

/** "All 7 projects →" style link at the end of a section. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="mt-5">
      <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary">
        {children}
        <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </p>
  );
}

/** Small bordered tag for a technology or topic. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block border bg-card px-1.5 py-px font-mono text-xs text-ink-2", className)}>
      {children}
    </span>
  );
}
