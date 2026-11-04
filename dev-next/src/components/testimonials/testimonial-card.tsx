import Link from "next/link";
import type { Testimonial } from "@/content/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ClampedText } from "./clamped-text";
import { Avatar, Person, QuoteText, RelationshipTag, SourceLink } from "./parts";

/** One person's testimonials, newest first; people who left several reviews share a card. */
export function groupByPerson(list: Testimonial[]): Testimonial[][] {
  const groups = new Map<string, Testimonial[]>();
  for (const t of list) {
    const key = t.linkedinUrl ?? t.name;
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }
  return [...groups.values()];
}

/** Card: relationship, the quote(s) with their date and source, then who said it. */
export function TestimonialCard({ quotes, className }: { quotes: Testimonial[]; className?: string }) {
  const person = quotes[0];
  return (
    <figure
      id={person.id}
      className={cn(
        "flex scroll-mt-6 flex-col border bg-card p-6 transition-colors duration-300 hover:border-primary/35 hover:bg-[color-mix(in_oklab,var(--primary)_4%,var(--card))]",
        className,
      )}
    >
      <RelationshipTag t={person} />
      <div className="mt-4 flex-1 divide-y divide-dashed">
        {quotes.map((t) => (
          <div key={t.id} id={t.id === person.id ? undefined : t.id} className="py-4 first:pt-0 last:pb-0">
            <blockquote className="text-[0.97rem] leading-[1.75] text-ink-2">
              <ClampedText clamp="line-clamp-5">
                <span aria-hidden className="mr-0.5 font-serif text-primary/70">
                  &ldquo;
                </span>
                <QuoteText t={t} />
                <span aria-hidden className="ml-0.5 font-serif text-primary/70">
                  &rdquo;
                </span>
              </ClampedText>
            </blockquote>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 text-meta">
              {t.workedOn && (
                <>
                  <Link href={t.workedOn.href} className="text-ink-2 transition-colors hover:text-primary">
                    {t.workedOn.label}
                  </Link>
                  <span aria-hidden>·</span>
                </>
              )}
              {t.date && <time dateTime={t.date}>{formatDate(t.date)}</time>}
              {t.date && t.source && <span aria-hidden>·</span>}
              <SourceLink t={t} />
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
        <Avatar name={person.name} src={person.avatar} size={40} />
        <Person t={person} className="text-[0.92rem]" />
      </figcaption>
    </figure>
  );
}
