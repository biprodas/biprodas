import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnvelopeSimpleIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/page";
import { Quote } from "@/components/testimonials/quote";
import { isEnabled } from "@/config/site";
import { getLink } from "@/content/links";
import { profile } from "@/content/profile";
import { indexTestimonials, testimonialsAreSample } from "@/content/testimonials";
import { featuredTestimonials, testimonials } from "@/content/testimonials-content";
import type { TestimonialRelationship } from "@/content/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `What clients, managers and engineers say about working with ${profile.name}.`,
  alternates: { canonical: "/testimonials" },
  ...(indexTestimonials ? {} : { robots: { index: false, follow: false } }),
};

const groups: { title: string; id: string; kinds: TestimonialRelationship[] }[] = [
  { title: "Clients", id: "clients", kinds: ["client"] },
  { title: "Managers & leads", id: "managers", kinds: ["manager"] },
  { title: "Colleagues & mentees", id: "colleagues", kinds: ["colleague", "mentee"] },
];

export default function TestimonialsPage() {
  if (!isEnabled("testimonials") || testimonials.length === 0) notFound();
  const lead = featuredTestimonials[0] ?? testimonials[0];
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
        <p className="mt-2 text-muted-foreground">
          From clients, managers and engineers I&apos;ve worked with. Where a quote was first posted elsewhere, it links
          to the original.
        </p>
      </header>

      <section aria-label="Featured testimonial" className="wide mt-12 border-y border-foreground/70 py-8">
        <Quote t={lead} size="large" />
      </section>

      {groups.map((g) => {
        const list = testimonials.filter((t) => t.id !== lead.id && g.kinds.includes(t.relationship));
        if (list.length === 0) return null;
        return (
          <Section key={g.id} title={g.title} id={g.id} className="wide">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
              {list.map((t) => (
                <li key={t.id} className="border-l-2 border-border pl-5">
                  <Quote t={t} />
                </li>
              ))}
            </ul>
          </Section>
        );
      })}

      <Section title="Worked with me?" id="recommend" className="wide">
        <div className="border bg-sidebar px-6 py-5">
          <p className="leading-relaxed">
            A few lines on what we built and how it went help the next team decide. A LinkedIn recommendation is
            easiest, since it stays verifiable.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "h-9 px-3.5 text-sm")}
              >
                <LinkedinLogoIcon data-icon="inline-start" />
                Write a LinkedIn recommendation
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
      </Section>
    </>
  );
}
