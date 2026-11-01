import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

/** Small uppercase mono label above a heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 font-mono text-[0.66rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 bg-primary" />
      {children}
    </p>
  );
}

/** Top of every inner page: eyebrow, title, optional lede. */
export function PageHeader({ eyebrow, title, lede }: { eyebrow: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <header className="mb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">{title}</h1>
      {lede && <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">{lede}</p>}
    </header>
  );
}

/** A titled block: heading followed by a dotted rule. Add `wide` to span into the notes column. */
export function Section({
  title,
  id,
  children,
  className,
}: {
  title: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby={id && `${id}-h`} id={id} className={cn("mt-16 scroll-mt-6", className)}>
      <h2 id={id && `${id}-h`} className="mb-6 flex items-center gap-4 text-[1.4rem] font-semibold">
        <span>{title}</span>
        <span
          aria-hidden
          className="h-px flex-1 bg-[linear-gradient(to_right,var(--border)_60%,transparent_60%)] bg-size-[6px_1px]"
        />
      </h2>
      {children}
    </section>
  );
}

/** Side note: floats into the notes column on wide screens, an inline callout otherwise. */
export function MarginNote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className="margin-note">
      <p className="mb-1 font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-ink-2 uppercase">{label}</p>
      {children}
    </aside>
  );
}

/** "All 7 projects →" style link at the end of a section. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="mt-5">
      <Link href={href} className="group inline-flex items-center gap-1.5 text-[0.9rem] font-medium hover:text-primary">
        {children}
        <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </p>
  );
}

/** Small bordered tag for a technology or topic. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block border bg-card px-1.5 py-px font-mono text-[0.66rem] text-ink-2", className)}>
      {children}
    </span>
  );
}
