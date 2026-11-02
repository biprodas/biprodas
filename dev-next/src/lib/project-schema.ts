import { profile } from "@/content/profile";
import type { Project } from "@/content/types";

const abs = (path: string) => new URL(path, profile.site).toString();

/** schema.org graph for a case-study page: the breadcrumb trail and the case study, which is about the software. */
export function projectSchema(p: Project) {
  const url = abs(`/projects/${p.slug}`);
  const author = { "@type": "Person", name: profile.name, url: profile.site };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Projects", item: abs("/projects") },
          { "@type": "ListItem", position: 3, name: p.shortTitle ?? p.title, item: url },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: `${p.title} case study`,
        headline: `${p.title}: ${p.summary}`.slice(0, 110),
        description: p.description ?? p.summary,
        url,
        image: `${url}/opengraph-image`,
        inLanguage: "en",
        author,
        keywords: [...p.domains, ...p.topics, ...p.technologies].join(", "),
        about: {
          "@type": "SoftwareApplication",
          name: p.title,
          description: p.summary,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          ...(p.liveUrl ? { url: p.liveUrl } : {}),
          ...(p.sourceUrl ? { codeRepository: p.sourceUrl } : {}),
          ...(p.features?.length ? { featureList: p.features } : {}),
          creator: author,
        },
      },
    ],
  };
}
