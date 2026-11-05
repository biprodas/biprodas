import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { themeScript } from "@/lib/theme";
import { siteConfig } from "@/config/site";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const { seo } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: seo.defaultTitle, template: seo.titleTemplate },
  description: seo.defaultDescription,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  openGraph: {
    type: "profile",
    siteName: siteConfig.name,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    ...(seo.defaultImage ? { images: [seo.defaultImage] } : {}),
  },
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
    <html
      lang={siteConfig.language}
      data-animations={siteConfig.appearance.enableAnimations ? undefined : "off"}
      suppressHydrationWarning
      className={cn("antialiased", geistSans.variable, jetbrainsMono.variable)}
    >
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
        <Analytics />
      </body>
    </html>
  );
}
