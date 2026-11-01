import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { themeScript } from "@/lib/theme";
import { profile } from "@/content/profile";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const description = `${profile.name}, software engineer: multi-tenant SaaS, FinTech ledgers and real-time AI systems. Projects, experience and skills.`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: `${profile.name} · Software Engineer`, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.site }],
  openGraph: { type: "profile", siteName: profile.name, title: `${profile.name} · Software Engineer`, description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#15171b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", geistSans.variable, jetbrainsMono.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="absolute -top-12 left-4 z-50 bg-foreground px-3 py-1.5 text-background focus:top-4">
          Skip to content
        </a>
        <div className="grid grid-cols-1 lg:grid-cols-[var(--spacing-side)_minmax(0,1fr)]">
          <Sidebar />
          <div className="min-w-0">
            <main id="main" className="page pt-10 lg:pt-18">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
