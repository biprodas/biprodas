import Link from "next/link";
import { ArrowRightIcon, ArrowUpIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { availability, profile } from "@/content/profile";
import { getLink, links } from "@/content/links";
import { isEnabled } from "@/config/site";
import { showTestimonials } from "@/content/testimonials";
import { nav } from "@/lib/nav";
import { PlatformIcon } from "@/components/platform-icon";
import { LocalTime } from "./local-time";
import { cn } from "@/lib/utils";

const label = "font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-ink-2 uppercase";
const link = "text-muted-foreground transition-colors hover:text-primary";

const elsewhere = links.filter((l) => l.platform !== "website");
const academic = getLink("website");

// Certifications and testimonials sit outside the main menu, so the footer is where they get a link.
// Research is in the menu but sits here too, to keep the Pages column short.
const pages = nav.filter((n) => n.href !== "/research");
const more = [
  ...nav.filter((n) => n.href === "/research"),
  ...(isEnabled("certifications") ? [{ href: "/certifications", label: "Certifications" }] : []),
  ...(showTestimonials && isEnabled("testimonials") ? [{ href: "/testimonials", label: "Testimonials" }] : []),
];

export function Footer() {
  return (
    <footer className="page mt-24 pb-10 text-[0.84rem] text-muted-foreground">
      <div className="wide border-t pt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[2.4fr_0.65fr_1fr_1fr]">
          <div>
            <p className="font-semibold text-foreground">{profile.name}</p>
            <p className="mt-0.5 text-meta">{profile.role}</p>
            <p className="mt-3 max-w-[38ch] leading-relaxed">
              I design software that holds up in production: multi-tenant SaaS, ERP, FinTech, and real-time AI.
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
            <Link href="/contact" className={cn(buttonVariants(), "mt-5 h-9 px-3.5 text-[0.8rem]")}>
              Get in touch
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </div>
          <nav aria-label="Footer">
            <p className={label}>Pages</p>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-1">
              {pages.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={link}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {more.length > 0 && (
            <nav aria-label="More pages">
              <p className={label}>More</p>
              <ul className="mt-2.5 grid gap-1.5">
                {more.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className={link}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div>
            <p className={label}>Elsewhere</p>
            <ul className="mt-2.5 grid gap-1.5">
              {elsewhere.map((e) => (
                <li key={e.url}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${link} group inline-flex items-center gap-1.5`}
                  >
                    <PlatformIcon platform={e.platform} className="size-3.5 shrink-0" />
                    {e.label}
                    <ArrowUpRightIcon
                      aria-hidden
                      className="size-3 opacity-60 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className={`${link} inline-flex items-center gap-1.5`}>
                  <PlatformIcon platform="email" className="size-3.5 shrink-0" />
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
