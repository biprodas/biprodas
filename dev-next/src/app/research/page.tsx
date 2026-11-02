import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, ArrowUpRightIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/page";
import { CopyBibtex } from "@/components/research/copy-bibtex";
import { getLink } from "@/content/links";
import { profile } from "@/content/profile";
import { indexResearch, researchIsSample } from "@/content/research";
import { research } from "@/content/research-content";
import type { Publication, PublicationLink, PublicationStatus, PublicationType } from "@/content/types";
import { bibtex } from "@/lib/bibtex";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { isEnabled } from "@/config/site";

export const metadata: Metadata = {
  title: "Research",
  description: `${profile.name}'s research interests, publications and talks, from real-time AI to multi-tenant data systems.`,
  alternates: { canonical: "/research" },
  ...(indexResearch ? {} : { robots: { index: false, follow: false } }),
};

const typeLabel: Record<PublicationType, string> = {
  journal: "Journal article",
  conference: "Conference paper",
  workshop: "Workshop paper",
  preprint: "Preprint",
  thesis: "Thesis",
  "book-chapter": "Book chapter",
  "technical-report": "Technical report",
  poster: "Poster",
};

const statusLabel: Record<PublicationStatus, string> = {
  published: "",
  accepted: "Accepted",
  "under-review": "Under review",
  submitted: "Submitted",
  "in-preparation": "In preparation",
};

const linkLabel: Record<PublicationLink["kind"], string> = {
  pdf: "PDF",
  doi: "DOI",
  arxiv: "arXiv",
  code: "Code",
  slides: "Slides",
  video: "Video",
};

const linkClass = "inline-flex items-center gap-1 text-[0.82rem] font-semibold text-ink-2 hover:text-primary";

function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="mt-0.5 text-[0.9rem] text-ink-2">
      {authors.map((a, i) => (
        <span key={a}>
          {i > 0 && (i === authors.length - 1 ? " and " : ", ")}
          {a === profile.name ? <strong className="font-semibold text-foreground">{a}</strong> : a}
        </span>
      ))}
    </p>
  );
}

function PublicationEntry({ p }: { p: Publication }) {
  const status = statusLabel[p.status];
  return (
    <li
      id={p.id}
      className="group grid scroll-mt-6 grid-cols-[4rem_1fr] items-baseline gap-x-4 border-b py-4 sm:grid-cols-[4.5rem_1fr]"
    >
      <span className="text-[0.82rem] text-muted-foreground tabular-nums transition-colors group-hover:text-primary">
        {p.date.slice(0, 4)}
      </span>
      <div>
        <h3 className="leading-snug font-semibold transition-colors group-hover:text-primary">{p.title}</h3>
        <Authors authors={p.authors} />
        <p className="mt-0.5 text-[0.8rem] text-muted-foreground">
          {[p.venueShort ? `${p.venue} (${p.venueShort})` : p.venue, typeLabel[p.type]].join(" · ")}
          {status && <span className="font-semibold text-primary"> · {status}</span>}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {p.links.map((l) => (
            <a key={l.kind} href={l.url} className={linkClass}>
              {linkLabel[l.kind]} <ArrowUpRightIcon aria-hidden className="size-3.5" />
            </a>
          ))}
          <CopyBibtex bibtex={bibtex(p)} title={p.title} />
        </div>
        {p.abstract && (
          <details className="group/abstract mt-2">
            <summary className="cursor-pointer text-[0.82rem] font-semibold text-ink-2 select-none hover:text-primary">
              Abstract
            </summary>
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-2">{p.abstract}</p>
            {p.keywords && p.keywords.length > 0 && (
              <p className="mt-1.5 text-[0.8rem] text-muted-foreground">Keywords: {p.keywords.join(", ")}</p>
            )}
          </details>
        )}
      </div>
    </li>
  );
}

export default function ResearchPage() {
  if (!isEnabled("research")) notFound();
  if (!research) notFound();
  const { statement, interests, publications, talks } = research;
  const pubs = [...publications].sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);
  const academic = getLink("website");
  const counts = [
    publications.length > 0 && `${publications.length} publications`,
    talks.length > 0 && `${talks.length} talks and posters`,
    interests.length > 0 && `${interests.length} research interests`,
  ].filter(Boolean);

  return (
    <>
      {researchIsSample && (
        <p
          role="note"
          className="wide mb-8 border border-dashed border-primary/60 bg-wash px-4 py-3 text-[0.86rem] leading-relaxed text-ink-2"
        >
          <strong className="font-semibold text-foreground">Sample content.</strong> Everything below is invented to
          design this page. It only appears in development; production hides the page until real research is added to{" "}
          <code className="font-mono text-[0.8rem]">src/content/research.ts</code>.
        </p>
      )}

      <header>
        <Eyebrow>Research</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">Research & publications</h1>
        {statement[0] && <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">{statement[0]}</p>}
        {statement.slice(1).map((para) => (
          <p key={para} className="mt-3 leading-relaxed text-ink-2">
            {para}
          </p>
        ))}
        {counts.length > 0 && <p className="mt-4 text-[0.82rem] text-muted-foreground">{counts.join(" · ")}</p>}
      </header>

      {interests.length > 0 && (
        <Section title="Questions I'm working on" id="interests" className="wide">
          <ul className="border-t border-foreground/70">
            {interests.map((r) => (
              <li
                key={r.topic}
                className="group grid grid-cols-1 gap-x-6 gap-y-1 border-b py-4 sm:grid-cols-[minmax(0,1fr)_12rem]"
              >
                <div>
                  <h3 className="font-semibold transition-colors group-hover:text-primary">{r.topic}</h3>
                  <p className="mt-0.5 text-[0.92rem] leading-relaxed text-ink-2">{r.note}</p>
                </div>
                {r.origin && (
                  <p className="text-[0.8rem] text-muted-foreground sm:pt-0.5 sm:text-right">
                    Grew out of{" "}
                    <Link href={r.origin.href} className="prose-link text-ink-2">
                      {r.origin.label}
                    </Link>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {pubs.length > 0 && (
        <Section title="Publications" id="publications" className="wide">
          <ul className="border-t border-foreground/70">
            {pubs.map((p) => (
              <PublicationEntry key={p.id} p={p} />
            ))}
          </ul>
        </Section>
      )}

      {talks.length > 0 && (
        <Section title="Talks & posters" id="talks" className="wide">
          <ul className="border-t border-foreground/70">
            {talks.map((t) => (
              <li
                key={t.id}
                className="group grid grid-cols-[4rem_1fr] items-baseline gap-x-4 border-b py-3 sm:grid-cols-[4.5rem_1fr_auto]"
              >
                <span className="text-[0.82rem] text-muted-foreground tabular-nums">{formatDate(t.date)}</span>
                <div>
                  <h3 className="leading-snug font-semibold transition-colors group-hover:text-primary">{t.title}</h3>
                  <p className="mt-0.5 text-[0.8rem] text-muted-foreground">
                    {[t.event, t.online ? "Online" : t.location, t.kind[0].toUpperCase() + t.kind.slice(1)]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                {t.links.length > 0 && (
                  <div className="col-start-2 flex gap-4 sm:col-start-3">
                    {t.links.map((l) => (
                      <a key={l.url + l.kind} href={l.url} className={linkClass}>
                        {l.kind[0].toUpperCase() + l.kind.slice(1)}{" "}
                        <ArrowUpRightIcon aria-hidden className="size-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Collaborate" id="collaborate" className="wide">
        <div className="border bg-sidebar px-6 py-5">
          <p className="leading-relaxed">
            Working on something close to these questions, or want a practitioner&apos;s view on a paper? I&apos;m happy
            to talk.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Research")}`}
              className={cn(buttonVariants(), "h-9 px-3.5 text-[0.8rem]")}
            >
              <EnvelopeSimpleIcon data-icon="inline-start" />
              Email about research
            </a>
            {academic && (
              <a
                href={academic.url}
                className={cn(buttonVariants({ variant: "outline" }), "group h-9 px-3.5 text-[0.8rem]")}
              >
                Full academic profile
                <ArrowRightIcon data-icon="inline-end" className="transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
