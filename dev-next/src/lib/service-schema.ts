import { profile } from "@/content/profile";
import type { Service } from "@/content/services";

/** schema.org Service for one service page, with Biprodas as the provider. */
export function serviceSchema(s: Service) {
  return {
    "@type": "Service",
    name: s.title,
    description: s.shortDescription,
    serviceType: s.category,
    url: new URL(`/services/${s.slug}`, profile.site).toString(),
    areaServed: "Worldwide",
    provider: { "@type": "Person", name: profile.name, url: profile.site },
  };
}
