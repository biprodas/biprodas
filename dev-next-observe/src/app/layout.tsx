import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { PaletteItem } from "@/components/CommandPalette";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StarField } from "@/components/StarField";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { nav, site } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: { type: "website", siteName: site.name, url: site.url, title: site.title, description: site.description },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
  ],
  colorScheme: "dark light",
};

const paletteItems: PaletteItem[] = [
  { label: "Home", href: "/", group: "Pages" },
  ...nav.map((n) => ({ label: n.label, href: n.href, group: "Pages", hint: n.code })),
  ...projects.map((p) => ({
    label: p.shortTitle ?? p.title,
    href: `/work/${p.slug}`,
    group: "Projects",
    hint: p.kind === "product" ? "product" : "client",
  })),
  ...posts.map((p) => ({ label: p.title, href: `/writing/${p.slug}`, group: "Writing" })),
  { label: "Email Biprodas", href: `mailto:${profile.email}`, group: "Contact" },
  ...profile.social.map((s) => ({ label: s.label, href: s.url, group: "Contact", hint: s.handle })),
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Sets data-theme before first paint; see src/lib/theme.ts. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* Nebula wash behind the stars. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(60rem_40rem_at_85%_-10%,color-mix(in_oklab,var(--color-nebula)_14%,transparent),transparent_70%),radial-gradient(50rem_30rem_at_-10%_30%,color-mix(in_oklab,var(--color-aurora)_7%,transparent),transparent_70%)]"
        />
        <StarField />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-void focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader paletteItems={paletteItems} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
