import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/page";
import { Faq } from "@/components/services/faq";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { engagements, faq, hiring, process, services } from "@/content/services";
import { pad2 } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: `Hire ${profile.name} for SaaS and MVP builds, ERP and FinTech systems, AI features, APIs, architecture reviews and consultancy.`,
  alternates: { canonical: "/services" },
};

const quote = `mailto:${profile.email}?subject=${encodeURIComponent("Project enquiry")}`;
const orgName = (id: string) => experience.find((e) => e.id === id)?.org;

function Actions() {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a href={quote} className={cn(buttonVariants(), "h-9 px-3.5 text-[0.8rem]")}>
        <EnvelopeSimpleIcon data-icon="inline-start" />
        Request a quote
      </a>
      {hiring.upwork && (
        <a
          href={hiring.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3.5 text-[0.8rem]")}
        >
          Hire me on Upwork
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <header>
        <Eyebrow>Services</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">Work with me</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
          I build and fix the systems behind SaaS products, ERPs and FinTech platforms, for founders and teams who need
          a senior engineer. Each service below links to work I&apos;ve shipped.
        </p>
        <div className="mt-6">
          <Actions />
        </div>
      </header>

      <Section title="What I do" id="services" className="wide">
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {services.map((s) => {
            const proof = [
              ...(s.projects ?? []).map((slug) => {
                const p = getProject(slug)!;
                return { key: slug, label: p.shortTitle ?? p.title, href: `/projects/${slug}` };
              }),
              ...(s.experience ?? []).map((id) => ({ key: id, label: orgName(id)!, href: "/experience" })),
            ];
            return (
              <li
                key={s.id}
                id={s.id}
                className="group flex scroll-mt-6 flex-col border bg-card px-5 pt-4 pb-5 transition-colors hover:border-primary/40 hover:bg-[color-mix(in_oklab,var(--primary)_4%,var(--card))]"
              >
                <h3 className="text-[1.02rem] font-semibold transition-colors group-hover:text-primary">{s.title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-[1.65] text-ink-2">{s.body}</p>
                {proof.length > 0 && (
                  <p className="mt-auto pt-3 text-[0.8rem] text-muted-foreground">
                    Seen in{" "}
                    {proof.map((x, i) => (
                      <span key={x.key}>
                        {i > 0 && ", "}
                        <Link href={x.href} className="prose-link text-ink-2">
                          {x.label}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Ways to work together" id="engagements">
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

      <Section title="How a project runs" id="process">
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

      <Section title="Questions" id="faq">
        <Faq items={faq} />
      </Section>

      <Section title="Start a project" id="start">
        <div className="border bg-sidebar px-6 py-5">
          <p className="leading-relaxed">
            Tell me what you&apos;re building, where it&apos;s stuck, and when you need it. I&apos;ll reply with
            questions or a proposal.
          </p>
          <div className="mt-4">
            <Actions />
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
