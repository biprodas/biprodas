import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, MoreLink, Section, Tag } from "@/components/page";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { featuredTestimonials } from "@/content/testimonials-content";
import { JsonLd } from "@/components/json-ld";
import { HireActions } from "@/components/services/actions";
import { Faq } from "@/components/services/faq";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { engagements, faq, process, services } from "@/content/services";
import { pad2 } from "@/lib/format";
import { serviceSchema } from "@/lib/service-schema";
import { isEnabled } from "@/config/site";

export const metadata: Metadata = {
  title: "Services: SaaS, ERP, FinTech and AI development",
  description: `Hire ${profile.name} for SaaS and MVP development, ERP and FinTech systems, AI features, APIs, architecture reviews, cloud and DevOps, and consultancy.`,
  alternates: { canonical: "/services" },
};

const orgName = (id: string) => experience.find((e) => e.id === id)?.company.name;
const MAX_OFFERINGS = 3;

/** "What clients say": featured client testimonials only (managers and teammates live on /testimonials). */
const clientQuotes = featuredTestimonials.filter((t) => t.relationship === "client").slice(0, 2);

export default function ServicesPage() {
  if (!isEnabled("services")) notFound();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: serviceSchema(s) })),
        }}
      />
      <header className="wide">
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          Let&apos;s build something together
        </h1>
        <p className="mt-2 text-muted-foreground">
          I help founders, startups, and growing businesses build, improve, and scale SaaS products, ERP systems, and
          FinTech platforms — from first ideas to established production systems ready for the next stage of growth.
          Explore the services below to see how we can work together.
        </p>
        <div className="mt-6">
          <HireActions linkedin />
        </div>
      </header>

      <Section title="What I do" id="services" className="wide">
        <ul className="grid grid-cols-1 gap-px overflow-hidden border bg-border md:grid-cols-2">
          {services.map((s, i) => {
            const proof = [
              ...s.relatedProjects.map((slug) => {
                const p = getProject(slug)!;
                return { key: slug, label: p.shortTitle ?? p.title, href: `/projects/${slug}` };
              }),
              ...s.relatedExperience.map((id) => ({ key: id, label: orgName(id)!, href: "/experience" })),
            ];
            const extra = s.offerings.length - MAX_OFFERINGS;
            return (
              <li
                key={s.slug}
                id={s.slug}
                className="group relative flex scroll-mt-6 flex-col bg-card p-6 transition-colors duration-300 focus-within:bg-[color-mix(in_oklab,var(--primary)_5%,var(--card))] hover:bg-[color-mix(in_oklab,var(--primary)_5%,var(--card))]"
              >
                {/* Accent rule that draws across the top on hover/focus, as on project cards. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono text-primary">{pad2(i + 1)}</span> · {s.category}
                </p>
                <h3 className="mt-1.5 text-lg leading-snug font-semibold">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group/title inline-flex items-baseline gap-1.5 transition-colors after:absolute after:inset-0 hover:text-primary focus-visible:text-primary"
                  >
                    {s.title}
                    <ArrowRightIcon
                      aria-hidden
                      className="size-3.5 shrink-0 -translate-x-1 self-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible/title:translate-x-0 group-focus-visible/title:opacity-100 motion-reduce:transition-none"
                    />
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.shortDescription}</p>
                <ul className="dashes mt-3 text-sm text-ink-2">
                  {s.offerings.slice(0, MAX_OFFERINGS).map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                  {extra > 0 && <li className="text-muted-foreground">+{extra} more</li>}
                </ul>
                <div className="mt-auto pt-5">
                  {proof.length > 0 ? (
                    <p className="relative text-sm text-muted-foreground">
                      Seen in{" "}
                      {proof.map((x, n) => (
                        <span key={x.key}>
                          {n > 0 && ", "}
                          <Link href={x.href} className="prose-link text-ink-2">
                            {x.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  ) : (
                    <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                      {s.technologies.map((t) => (
                        <li key={t}>
                          <Tag className="bg-background">{t}</Tag>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {isEnabled("testimonials") && clientQuotes.length > 0 && (
        <Section title="What clients say" id="testimonials" className="wide">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {clientQuotes.map((t) => (
              <li key={t.id}>
                <TestimonialCard quotes={[t]} className="h-full" />
              </li>
            ))}
          </ul>
          <MoreLink href="/testimonials">All testimonials</MoreLink>
        </Section>
      )}

      <Section title="Ways to work together" id="engagements" className="wide">
        <ul className="border-t border-foreground/70">
          {engagements.map((e) => (
            <li
              key={e.id}
              className="group grid grid-cols-1 gap-x-6 gap-y-1 border-b py-4 sm:grid-cols-[11rem_minmax(0,1fr)]"
            >
              <h3 className="font-semibold transition-colors group-hover:text-primary">{e.title}</h3>
              <div>
                <p className="text-sm leading-relaxed text-ink-2">{e.body}</p>
                <p className="mt-1 text-sm text-muted-foreground">Best for: {e.bestFor}</p>
                {"link" in e && (
                  <Link href={e.link.href} className="mt-1.5 inline-block text-sm prose-link text-ink-2">
                    {e.link.label}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">No fixed price list: every project is quoted on its scope.</p>
      </Section>

      <Section title="How a project runs" id="process" className="wide">
        <p className="-mt-2 mb-8 max-w-(--spacing-main) text-muted-foreground">
          Four steps from first message to handover. You see working software throughout, not just at the end.
        </p>
        <ol className="grid grid-cols-1 gap-y-8 md:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.title} className="group relative pl-12 md:pt-12 md:pr-6 md:pl-0">
              {/* Connector to the next step: vertical on phones, horizontal from md. */}
              <span
                aria-hidden
                className="absolute top-8 -bottom-8 left-3.5 w-px bg-border group-last:hidden md:top-3.5 md:right-0 md:bottom-auto md:left-8 md:h-px md:w-auto"
              />
              <span
                aria-hidden
                className="absolute top-0 left-0 grid size-7 place-items-center border bg-card font-mono text-xs text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
              >
                {pad2(i + 1)}
              </span>
              <h3 className="text-base leading-snug font-semibold transition-colors duration-300 group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink-2">{p.body}</p>
              <p className="mt-3 flex items-start gap-1.5 text-[0.8rem] leading-snug text-foreground">
                <CheckIcon aria-hidden className="mt-0.5 size-3.5 shrink-0 text-primary" />
                {p.outcome}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Questions" id="faq" className="wide">
        <Faq items={faq} />
      </Section>

      <Section title="Start a project" id="start" className="wide">
        <div className="border bg-sidebar px-6 py-5">
          <p className="leading-relaxed">
            Tell me what you&apos;re building, where it&apos;s stuck, and when you need it. I&apos;ll reply with
            questions or a proposal.
          </p>
          <div className="mt-4">
            <HireActions linkedin />
          </div>
          <p className="mt-4 border-t pt-3 text-sm text-muted-foreground">
            Prefer to see the work first? Browse the{" "}
            <Link href="/projects" className="prose-link">
              case studies
            </Link>{" "}
            or the{" "}
            <Link href="/contact" className="prose-link">
              contact page
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
