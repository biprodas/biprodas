import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...nav.map((n) => ({ url: `${site.url}${n.href}`, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/writing/${p.slug}`, priority: 0.6 })),
  ];
}
