// Facts (URLs) mirror data/profile.yaml and data/services.yaml. INVENTED COPY: the descriptions.
import type { SocialLink, Platform } from "./types";

const allLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/biprodas",
    handle: "github.com/biprodas",
    description: "Code and public repositories.",
    visible: true,
    order: 1,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/biprodas-roy/",
    handle: "in/biprodas-roy",
    description: "Work history. You can message me there too.",
    visible: true,
    order: 2,
  },
  {
    platform: "upwork",
    label: "Upwork",
    url: "https://www.upwork.com/freelancers/~017dd9d645b9e068e4?mp_source=share",
    handle: "upwork.com",
    description: "Hire me through Upwork's contracts and payments.",
    visible: true,
    order: 3,
  },
  {
    platform: "website",
    label: "Academic site",
    url: "https://biprodas.com",
    handle: "biprodas.com",
    description: "The research side of my work.",
    visible: true,
    order: 4,
  },
];

export const links = allLinks.filter((l) => l.visible).sort((a, b) => a.order - b.order);

export const getLink = (platform: Platform) => links.find((l) => l.platform === platform);
