import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section, Tag } from "@/components/page";
import { ProjectEntry } from "@/components/projects/project-entry";
import { JsonLd } from "@/components/json-ld";
import { HireActions } from "@/components/services/actions";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { getService, indexedServices, services } from "@/content/services";
import { pad2 } from "@/lib/format";
import { serviceSchema } from "@/lib/service-schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    // Thin pages stay out of search until their copy is written (see indexedServices).
    ...(indexedServices.has(service.slug) ? {} : { robots: { index: false, follow: true } }),
  };
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 border-b py-2.5 last:border-0">
      <dt className="text-meta">{label}</dt>
      <dd className="text-[0.9rem]">{children}</dd>
    </div>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const i = services.indexOf(service);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];
  const relatedProjects = service.relatedProjects.map((slug) => getProject(slug)!);
  const roles = service.relatedExperience.map((id) => experience.find((e) => e.id === id)!);

  return (
    <article>
      <JsonLd data={{ "@context": "https://schema.org", ...serviceSchema(service) }} />
      <Link href="/services" className="inline-flex items-center gap-1 text-meta hover:text-primary">
        <ArrowLeftIcon className="size-3" /> All services
      </Link>

      <header className="mt-8 mb-10">
        <Eyebrow>Service {pad2(i + 1)}</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">{service.title}</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">{service.shortDescription}</p>
        <div className="mt-6">
          <HireActions subject={`Project enquiry: ${service.title}`} linkedin />
        </div>
      </header>

      <dl className="border-y">
        <Row label="Area">{service.category}</Row>
        {service.technologies.length > 0 && (
          <Row label="Stack">
            <ul className="flex flex-wrap gap-1">
              {service.technologies.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </Row>
        )}
        {roles.length > 0 && (
          <Row label="Roles">
            <ul>
              {roles.map((r) => (
                <li key={r.id}>
                  <Link href="/experience" className="prose-link">
                    {r.company.name}
                  </Link>
                  <span className="text-muted-foreground"> · {r.positions[0].title}</span>
                </li>
              ))}
            </ul>
          </Row>
        )}
      </dl>

      <Section title="Overview" id="overview">
        <div className="space-y-4 leading-[1.75] text-ink-2">
          {service.description.split("\n\n").map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </Section>

      <Section title="What's included" id="offerings">
        <ul className="dashes">
          {service.offerings.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Section>

      {relatedProjects.length > 0 && (
        <Section title="Related work" id="work">
          <div>
            {relatedProjects.map((p, n) => (
              <ProjectEntry key={p.slug} project={p} number={pad2(n + 1)} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Start a project" id="start">
        <div className="border bg-sidebar px-6 py-5">
          <p className="leading-relaxed">
            Tell me what you&apos;re building, where it&apos;s stuck, and when you need it. I&apos;ll reply with
            questions or a proposal.
          </p>
          <div className="mt-4">
            <HireActions subject={`Project enquiry: ${service.title}`} linkedin />
          </div>
          <p className="mt-4 border-t pt-3 text-[0.8rem] text-muted-foreground">
            How engagements, pricing and handover work:{" "}
            <Link href="/services#engagements" className="prose-link">
              ways to work together
            </Link>
            .
          </p>
        </div>
      </Section>

      <nav aria-label="More services" className="mt-16 grid grid-cols-2 border-y">
        <Link href={`/services/${prev.slug}`} className="group py-4 pr-4">
          <span className="flex items-center gap-1 text-meta">
            <ArrowLeftIcon className="size-3" /> Previous
          </span>
          <span className="mt-0.5 block font-semibold group-hover:text-primary">{prev.title}</span>
        </Link>
        <Link href={`/services/${next.slug}`} className="group border-l py-4 pl-4 text-right">
          <span className="flex items-center justify-end gap-1 text-meta">
            Next <ArrowRightIcon className="size-3" />
          </span>
          <span className="mt-0.5 block font-semibold group-hover:text-primary">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
