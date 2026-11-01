import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section } from "@/components/page";
import { certifications } from "@/content/skills";
import type { Certification } from "@/content/types";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Biprodas Roy's certifications, grouped by issuer, with verification links.",
  alternates: { canonical: "/certifications" },
};

const newestFirst = (a: Certification, b: Certification) =>
  b.issued.localeCompare(a.issued) || a.title.localeCompare(b.title);

/** Issuers ordered by their most recent certification; certifications newest first within each. */
function byIssuer() {
  const groups = new Map<string, Certification[]>();
  for (const c of [...certifications].sort(newestFirst)) {
    groups.set(c.issuer, [...(groups.get(c.issuer) ?? []), c]);
  }
  return [...groups];
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const linkClass = "inline-flex items-center gap-1 text-[0.82rem] font-semibold text-ink-2 hover:text-primary";

export default function CertificationsPage() {
  const groups = byIssuer();

  return (
    <>
      <header>
        <Eyebrow>Certifications</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">Certifications</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
          Credentials I&apos;ve earned, grouped by issuer and newest first. Verify opens the issuer&apos;s record of the
          credential; About opens the certification&apos;s official page. The skills they back up are on the{" "}
          <Link href="/skills" className="prose-link">
            skills page
          </Link>
          .
        </p>
        <p className="mt-4 text-[0.82rem] text-muted-foreground">
          {certifications.length} certifications · {groups.length} issuers
        </p>
        <nav aria-label="Issuers" className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.86rem]">
          {groups.map(([issuer, list]) => (
            <a key={issuer} href={`#${slug(issuer)}`} className="prose-link">
              {issuer} <span className="text-muted-foreground">{list.length}</span>
            </a>
          ))}
        </nav>
      </header>

      {groups.map(([issuer, list]) => (
        <Section key={issuer} title={issuer} id={slug(issuer)}>
          <ul className="border-t border-foreground/70">
            {list.map((c) => {
              const details = [
                `Issued ${formatDate(c.issued)}`,
                c.expires && `valid until ${formatDate(c.expires)}`,
                c.credentialId && `ID ${c.credentialId}`,
              ].filter(Boolean);
              return (
                <li
                  key={c.id}
                  id={c.id}
                  className="group grid scroll-mt-6 grid-cols-[4rem_1fr] items-baseline gap-x-4 gap-y-1 border-b py-4 sm:grid-cols-[4.5rem_1fr_auto]"
                >
                  <span className="text-[0.82rem] text-muted-foreground tabular-nums transition-colors group-hover:text-primary">
                    {c.issued.slice(0, 4)}
                  </span>
                  <div>
                    <h3 className="leading-snug font-semibold transition-colors group-hover:text-primary">{c.title}</h3>
                    <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{details.join(" · ")}</p>
                    {c.description && <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">{c.description}</p>}
                    {c.skills && c.skills.length > 0 && (
                      <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Skills covered">
                        {c.skills.map((s) => (
                          <li
                            key={s}
                            className="rounded-sm border bg-background px-2 py-0.5 text-[0.78rem] leading-snug text-ink-2"
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {(c.url || c.infoUrl) && (
                    <div className="col-start-2 flex gap-4 sm:col-start-3 sm:justify-end">
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Verify ${c.title} (opens in a new tab)`}
                          className={linkClass}
                        >
                          Verify <ArrowUpRightIcon className="size-3.5" />
                        </a>
                      )}
                      {c.infoUrl && (
                        <a
                          href={c.infoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`About ${c.title} (opens in a new tab)`}
                          className={linkClass}
                        >
                          About <ArrowUpRightIcon className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>
      ))}
    </>
  );
}
