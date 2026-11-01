import Link from "next/link";
import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import { profile } from "@/content/profile";
import { nav } from "@/lib/nav";

const label = "font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-ink-2 uppercase";
const link = "text-muted-foreground transition-colors hover:text-primary";

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
              <li>
                <a href={profile.social.github} className={link}>
                  GitHub
                </a>
              </li>
              <li>
                <a href={profile.social.linkedin} className={link}>
                  LinkedIn
                </a>
              </li>
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
          <a href="#main" className={`${link} inline-flex items-center gap-1`}>
            Back to top <ArrowUpIcon aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
