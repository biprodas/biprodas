import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnvelopeSimpleIcon, LinkedinLogoIcon, SealCheckIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/page";
import { circleOf } from "@/components/testimonials/parts";
import { Spotlight } from "@/components/testimonials/spotlight";
import { TestimonialWall } from "@/components/testimonials/testimonial-wall";
import { isEnabled } from "@/config/site";
import { getLink } from "@/content/links";
import { profile } from "@/content/profile";
import { indexTestimonials, testimonialsAreSample } from "@/content/testimonials";
import { featuredTestimonials, testimonials } from "@/content/testimonials-content";
import { yearRange } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `What clients, managers and engineers say about working with ${profile.name}.`,
  alternates: { canonical: "/testimonials" },
  ...(indexTestimonials ? {} : { robots: { index: false, follow: false } }),
};

/** Counts for the strip under the header, all derived from the testimonials themselves. */
function stats() {
  const dates = testimonials.flatMap((t) => (t.date ? [t.date] : [])).sort();
  const clients = testimonials.filter((t) => circleOf(t) === "clients").length;
  return [
    { label: "Recommendations", value: String(testimonials.length) },
    { label: "From clients", value: String(clients) },
    { label: "From teammates", value: String(testimonials.length - clients) },
    ...(dates.length ? [{ label: "Written", value: yearRange(dates[0], dates[dates.length - 1]) }] : []),
  ];
}

export default function TestimonialsPage() {
  if (!isEnabled("testimonials") || testimonials.length === 0) notFound();
  const lead = featuredTestimonials[0] ?? testimonials[0];
  const rest = testimonials.filter((t) => t.id !== lead.id);
  const linkedin = getLink("linkedin");

  return (
    <>
      {testimonialsAreSample && (
        <p
          role="note"
          className="wide mb-8 border border-dashed border-primary/60 bg-wash px-4 py-3 text-sm leading-relaxed text-ink-2"
        >
          <strong className="font-semibold text-foreground">Sample content.</strong> These people and quotes are
          invented to design this page. It only appears in development; production hides the page until real
          testimonials are added to <code className="font-mono text-sm">src/content/testimonials.ts</code>.
        </p>
      )}

      <header>
        <Eyebrow>Testimonials</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          What people say about working with me
        </h1>
        <p className="mt-3 leading-relaxed text-ink-2">
          Clients who hired me, the leads I reported to, and the engineers I built and learned alongside, across{" "}
          {profile.yearsOfExperience}+ years of shipping software.
        </p>
        <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
          <SealCheckIcon aria-hidden weight="duotone" className="mt-0.5 size-4 shrink-0 text-primary" />
          Every quote is copied word for word from where it was first posted, and links back to the original.
        </p>
      </header>

      <dl className="wide mt-10 grid grid-cols-2 border-y sm:grid-cols-4">
        {stats().map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "px-4 py-4 first:pl-0 sm:py-5",
              i % 2 === 1 && "border-l",
              i >= 2 && "border-t sm:border-t-0",
              i === 2 && "pl-0 sm:border-l sm:pl-4",
            )}
          >
            <dt className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {s.label}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Featured testimonial" className="wide mt-12">
        <Spotlight t={lead} />
      </section>

      {rest.length > 0 && (
        <Section title="More in their words" id="all" className="wide">
          <TestimonialWall testimonials={rest} />
        </Section>
      )}

      <section aria-labelledby="recommend-h" id="recommend" className="wide mt-16 scroll-mt-6">
        <div className="grid gap-6 border bg-sidebar px-6 py-7 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <Eyebrow>Worked with me?</Eyebrow>
            <h2 id="recommend-h" className="mt-3 text-xl font-semibold">
              I&apos;d be glad to hear how it went
            </h2>
            <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink-2">
              A few lines on what we built help the next team decide. A LinkedIn recommendation is easiest, since it
              stays verifiable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 md:flex-col md:items-stretch">
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "h-9 px-3.5 text-sm")}
              >
                <LinkedinLogoIcon data-icon="inline-start" />
                Write a recommendation
              </a>
            )}
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Testimonial")}`}
              className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3.5 text-sm")}
            >
              <EnvelopeSimpleIcon data-icon="inline-start" />
              Send one by email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
