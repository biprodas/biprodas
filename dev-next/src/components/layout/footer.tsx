import Link from "next/link";
import { ArrowRightIcon, ArrowUpIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { availability, profile } from "@/content/profile";
import { getLink, links } from "@/content/links";
import { nav } from "@/lib/nav";
import { LocalTime } from "./local-time";
import { cn } from "@/lib/utils";

const label = "font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-ink-2 uppercase";
const link = "text-muted-foreground transition-colors hover:text-primary";

const elsewhere = links.filter((l) => l.platform !== "website");
const academic = getLink("website");

export function Footer() {
  return (
    <footer className="page mt-24 pb-10 text-[0.84rem] text-muted-foreground">
      <div className="wide border-t pt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-semibold text-foreground">{profile.name}</p>
            <p className="mt-0.5 text-meta">{profile.role}</p>
            <p className="mt-3 max-w-[38ch] leading-relaxed">
              I design software that holds up in production: multi-tenant SaaS, ERP, FinTech and real-time AI.
              {availability.open && " Available for remote roles and contracts."}
              {academic && (
                <>
                  {" "}
                  My research lives at{" "}
                  <a href={academic.url} target="_blank" rel="noopener noreferrer" className="prose-link">
                    {academic.handle ?? academic.label}
                  </a>
                  .
                </>
              )}
            </p>
            <Link href="/contact" className={cn(buttonVariants(), "group mt-5 h-9 px-3.5 text-[0.8rem]")}>
              Get in touch
              <ArrowRightIcon data-icon="inline-end" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <nav aria-label="Footer">
            <p className={label}>Pages</p>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={link}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={label}>Elsewhere</p>
            <ul className="mt-2.5 grid gap-1.5">
              {elsewhere.map((e) => (
                <li key={e.url}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link} group inline-flex items-center gap-1`}
                  >
                    {e.label}
                    <ArrowUpRightIcon
                      aria-hidden
                      className="size-3 opacity-60 transition-transform group-hover:translate-x-px group-hover:-translate-y-px motion-reduce:transition-none"
                    />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className={link}>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t pt-4 text-meta">
          <p>© 2026 {profile.name}</p>
          <p className="lg:hidden">
            {profile.location.city}, {profile.location.country} · <LocalTime /> local time ({profile.utcOffset})
          </p>
          <a href="#main" className={`${link} inline-flex items-center gap-1`}>
            Back to top <ArrowUpIcon aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
