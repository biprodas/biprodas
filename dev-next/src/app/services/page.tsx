import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, MoreLink, Section, Tag } from "@/components/page";
import { Quote } from "@/components/testimonials/quote";
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
      <header>
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">Work with me</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
          I build and fix the systems behind SaaS products, ERPs and FinTech platforms, for founders and teams who need
          a senior engineer. Open a service for the details and the work behind it.
        </p>
        <div className="mt-6">
          <HireActions />
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
                <p className="text-[0.78rem] text-muted-foreground">
                  <span className="font-mono text-primary">{pad2(i + 1)}</span> · {s.category}
                </p>
                <h3 className="mt-1.5 text-[1.12rem] leading-snug font-semibold">
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
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">{s.shortDescription}</p>
                <ul className="dashes mt-3 text-[0.86rem] text-ink-2">
                  {s.offerings.slice(0, MAX_OFFERINGS).map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                  {extra > 0 && <li className="text-muted-foreground">+{extra} more</li>}
                </ul>
                <div className="mt-auto pt-5">
                  {proof.length > 0 ? (
                    <p className="relative text-[0.8rem] text-muted-foreground">
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

      {isEnabled("testimonials") && featuredTestimonials.length > 0 && (
        <Section title="What clients say" id="testimonials" className="wide">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {featuredTestimonials.slice(0, 2).map((t) => (
              <li key={t.id} className="border-l-2 border-primary/50 pl-5">
                <Quote t={t} />
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
                <p className="text-[0.92rem] leading-relaxed text-ink-2">{e.body}</p>
                <p className="mt-1 text-[0.8rem] text-muted-foreground">Best for: {e.bestFor}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.88rem] text-muted-foreground">
          No fixed price list: every project is quoted on its scope.
        </p>
      </Section>

      <Section title="How a project runs" id="process" className="wide">
        <ol className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {process.map((p, i) => (
            <li key={p.title} className="group grid grid-cols-[3.25rem_1fr] items-start gap-x-3">
              <span
                aria-hidden
                className="pt-0.5 text-[2.1rem] leading-none font-semibold text-[color-mix(in_oklab,var(--primary)_55%,var(--background))] tabular-nums transition-colors duration-300 group-hover:text-primary"
              >
                {pad2(i + 1)}
              </span>
              <div>
                <h3 className="text-[1rem] leading-snug font-semibold transition-colors duration-300 group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-1 text-[0.92rem] leading-[1.7] text-ink-2">{p.body}</p>
              </div>
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
          <p className="mt-4 border-t pt-3 text-[0.8rem] text-muted-foreground">
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
