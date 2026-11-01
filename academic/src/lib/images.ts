// Images in src/assets, looked up by the path stored in the YAML
// (e.g. profile.avatar.src = "assets/profile/biprodasroy.png"), so Astro can optimise them.
// The glob is lazy: only images a page actually uses end up in the build.
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/**/*.{jpg,jpeg,png,webp,avif}");

export async function contentImage(src: string | undefined): Promise<ImageMetadata | undefined> {
  if (!src) return undefined;
  const key = Object.keys(files).find((k) => k.endsWith(`/${src.replace(/^\.?\//, "")}`));
  return key ? (await files[key]!()).default : undefined;
}
