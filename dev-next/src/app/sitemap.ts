import type { MetadataRoute } from "next";
import { isEnabled, siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { indexedServices } from "@/content/services";
import { indexResearch } from "@/content/research";
import { extraPages, nav } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...nav.map((n) => n.href).filter((href) => href !== "/research" || indexResearch),
    ...extraPages,
    ...(isEnabled("projects") ? projects.map((p) => `/projects/${p.slug}`) : []),
    ...(isEnabled("services") ? [...indexedServices].map((slug) => `/services/${slug}`) : []),
  ];
  return paths.map((path) => ({ url: new URL(path, siteConfig.url).toString() }));
}
