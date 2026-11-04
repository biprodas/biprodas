import type { Testimonial } from "@/content/types";
import { formatDate } from "@/lib/format";
import { ClampedText } from "./clamped-text";
import { Avatar, Person, QuoteText, RelationshipTag, SourceLink } from "./parts";

/** The lead testimonial: who said it on the left, the full quote large on the right. */
export function Spotlight({ t }: { t: Testimonial }) {
  return (
    <figure
      id={t.id}
      className="relative grid scroll-mt-6 grid-cols-1 overflow-hidden border border-foreground/15 bg-card md:grid-cols-[13rem_minmax(0,1fr)]"
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
      <figcaption className="order-last flex flex-col gap-4 border-t bg-sidebar px-6 py-5 md:order-first md:justify-between md:border-t-0 md:border-r md:py-7">
        <div className="flex items-center gap-4 md:flex-col md:items-start">
          <Avatar name={t.name} src={t.avatar} size={64} />
          <Person t={t} />
        </div>
        <div className="space-y-1.5">
          <RelationshipTag t={t} />
          <p className="flex flex-wrap items-center gap-x-2 text-meta">
            {t.date && <time dateTime={t.date}>{formatDate(t.date)}</time>}
            {t.date && t.source && <span aria-hidden>·</span>}
            <SourceLink t={t} />
          </p>
        </div>
      </figcaption>
      <blockquote className="relative px-6 pt-12 pb-8 sm:px-9 md:pt-14 md:pb-10">
        <span
          aria-hidden
          className="pointer-events-none absolute top-2 left-5 font-serif text-[5.5rem] leading-none text-primary/25 select-none sm:left-8"
        >
          &ldquo;
        </span>
        <ClampedText clamp="line-clamp-7" className="text-[0.97rem] leading-[1.75] text-pretty text-ink-2">
          <QuoteText t={t} />
        </ClampedText>
      </blockquote>
    </figure>
  );
}
