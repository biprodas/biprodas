import {
  BriefcaseIcon,
  CodeIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  GlobeIcon,
  GraduationCapIcon,
  IdentificationCardIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { Platform } from "@/content/types";

const icons = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  upwork: BriefcaseIcon,
  x: XLogoIcon,
  website: GlobeIcon,
  email: EnvelopeSimpleIcon,
  codeforces: CodeIcon,
  leetcode: CodeIcon,
  scholar: GraduationCapIcon,
  orcid: IdentificationCardIcon,
} satisfies Record<Platform, unknown>;

export function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
  const Icon = icons[platform];
  return <Icon aria-hidden className={className} />;
}
