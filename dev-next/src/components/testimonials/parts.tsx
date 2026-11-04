import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { Testimonial, TestimonialRelationship } from "@/content/types";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

/** How each person knew me, phrased from my side. */
export const relationshipLabel: Record<TestimonialRelationship, string> = {
  client: "Hired me",
  manager: "Managed me",
  colleague: "Worked with me",
  mentee: "Mentored by me",
};

/** Clients vs everyone I shared a team with; the page filter and stats use these two groups. */
export type Circle = "clients" | "teammates";
export const circleOf = (t: Testimonial): Circle => (t.relationship === "client" ? "clients" : "teammates");

/** Photo when one exists (callers pass only checked paths), otherwise initials on the accent wash. */
export function Avatar({ name, src, size }: { name: string; src?: string; size: number }) {
  const box = { width: size, height: size };
  if (src) {
    return (
      <Image src={src} alt="" width={size} height={size} style={box} className="shrink-0 rounded-full object-cover" />
    );
  }
  return (
    <span
      aria-hidden
      style={{ ...box, fontSize: size * 0.34 }}
      className="grid shrink-0 place-items-center rounded-full bg-wash font-mono font-semibold text-primary ring-1 ring-primary/15 ring-inset"
    >
      {initials(name)}
    </span>
  );
}

/** The exact quote, with its `highlight` (a verbatim excerpt) set in full ink so the card can be skimmed. */
export function QuoteText({ t }: { t: Testimonial }) {
  const at = t.highlight ? t.quote.indexOf(t.highlight) : -1;
  if (!t.highlight || at < 0) return <>{t.quote}</>;
  return (
    <>
      {t.quote.slice(0, at)}
      <mark className="-mx-0.5 bg-transparent bg-[image:linear-gradient(transparent_42%,var(--highlight)_42%,var(--highlight)_94%,transparent_94%)] box-decoration-clone px-0.5 font-medium text-foreground">
        {t.highlight}
      </mark>
      {t.quote.slice(at + t.highlight.length)}
    </>
  );
}

/** Name (linked to their profile when known) over their position. */
export function Person({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <div className={cn("min-w-0 leading-snug", className)}>
      <p className="font-semibold text-foreground">
        {t.linkedinUrl ? (
          <a
            href={t.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            {t.name}
          </a>
        ) : (
          t.name
        )}
      </p>
      <p className="mt-0.5 text-[0.84rem] text-muted-foreground">
        {t.position}
        {t.company && ` · ${t.company}`}
      </p>
    </div>
  );
}

/** "LinkedIn ↗" / "Upwork ↗": where the words were first published. */
export function SourceLink({ t, className }: { t: Testimonial; className?: string }) {
  if (!t.source) return null;
  const host = /upwork\./.test(t.source.url) ? "Upwork" : /linkedin\./.test(t.source.url) ? "LinkedIn" : t.source.label;
  return (
    <a
      href={t.source.url}
      target="_blank"
      rel="noopener noreferrer"
      title={t.source.label}
      className={cn("inline-flex items-center gap-0.5 transition-colors hover:text-primary", className)}
    >
      {host}
      <ArrowUpRightIcon aria-hidden className="size-3" />
    </a>
  );
}

/** Small mono label for the relationship, with an accent square. */
export function RelationshipTag({ t }: { t: Testimonial }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[0.68rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
      <span
        aria-hidden
        className={cn("size-1.5", t.relationship === "client" ? "bg-primary" : "bg-muted-foreground/60")}
      />
      {relationshipLabel[t.relationship]}
    </p>
  );
}
