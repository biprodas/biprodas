import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusBadge } from "@/components/StatusBadge";
import { products } from "@/content/projects";
import { skyCoordinates } from "@/lib/hash";
import { buttonGhost, chip, cn, container, eyebrow, panel } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Products",
  description: "Independent products Biprodas Roy designs, builds and runs: Akaunty, Cloud Prep and School ERP.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className={cn(container, "pt-16 sm:pt-24")}>
      <SectionHeading as="h1" index="02" label="Products" title="Built, shipped and run by one person">
        Client work teaches you how systems fail. Running your own product teaches you what users actually do. These are
        the products where I own every layer — idea, architecture, billing and the support inbox.
      </SectionHeading>

      <ol className="space-y-6">
        {products.map((p, i) => (
          <li key={p.slug} className={cn(panel, "grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]")}>
            <div>
              <p className={cn(eyebrow, "flex flex-wrap items-center gap-3")}>
                <span className="text-signal">P-{String(i + 1).padStart(2, "0")}</span>
                <span>{skyCoordinates(p.slug)}</span>
              </p>
              <h2 className="mt-4 font-display text-4xl text-ink">{p.title}</h2>
              {p.status && (
                <p className="mt-3">
                  <StatusBadge status={p.status} />
                </p>
              )}
              <p className="mt-5 leading-8 text-muted">{p.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/work/${p.slug}`} className={buttonGhost}>
                  {p.caseStudy ? "Case study" : "Details"} →
                </Link>
                {p.links.map((l) => (
                  <a key={l.url} href={l.url} className={buttonGhost}>
                    {l.kind === "repo" ? "Source" : "Open"} ↗
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <ul className="space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-7 text-muted">
                    <span aria-hidden className="text-aurora">
                      ✦
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className={chip}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
