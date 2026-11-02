import { existsSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/content/profile";

/** True once the resume PDF is in public/, so pages don't offer a link that 404s. Checked at build time. */
export const hasResume = existsSync(join(process.cwd(), "public", profile.resume));
