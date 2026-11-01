import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { extraPages, nav } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...nav.map((n) => n.href), ...extraPages, ...projects.map((p) => `/projects/${p.slug}`)];
  return paths.map((path) => ({ url: new URL(path, profile.site).toString() }));
}
