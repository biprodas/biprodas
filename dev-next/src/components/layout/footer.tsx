import Link from "next/link";
import { ArrowRightIcon, ArrowUpIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { hiring } from "@/content/services";
import { nav } from "@/lib/nav";
import { cn } from "@/lib/utils";

const label = "font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-ink-2 uppercase";
const link = "text-muted-foreground transition-colors hover:text-primary";

// Contact is left out of the page list: the "Get in touch" button covers it.
const pages = nav.filter((n) => n.href !== "/contact");

const elsewhere = [
  { label: "GitHub", href: profile.social.github },
  { label: "LinkedIn", href: profile.social.linkedin },
  ...(hiring.upwork ? [{ label: "Upwork", href: hiring.upwork }] : []),
];

export function Footer() {
  return (
    <footer className="page mt-24 pb-10 text-[0.84rem] text-muted-foreground">
      <div className="wide border-t pt-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-semibold text-foreground">{profile.name}</p>
            <p className="mt-0.5 text-meta">{profile.role}</p>
            <p className="mt-3 max-w-[34ch] leading-relaxed">
              Built with Next.js and shadcn/ui. The research side of my work lives at{" "}
              <a href={profile.academicSite} className="prose-link">
                biprodas.com
              </a>
              .
            </p>
            <Link href="/contact" className={cn(buttonVariants(), "group mt-5 h-9 px-3.5 text-[0.8rem]")}>
              Get in touch
              <ArrowRightIcon data-icon="inline-end" className="transition-transform group-hover:translate-x-0.5" />
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
          <div>
            <p className={label}>Elsewhere</p>
            <ul className="mt-2.5 grid gap-1.5">
              {elsewhere.map((e) => (
                <li key={e.href}>
                  <a href={e.href} className={`${link} group inline-flex items-center gap-1`}>
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
          <p>
            © 2026 {profile.name} · {profile.location.city}, {profile.location.country} ({profile.utcOffset})
          </p>
          <a href="#main" className={`${link} inline-flex items-center gap-1`}>
            Back to top <ArrowUpIcon aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
