import { existsSync } from "node:fs";
import { join } from "node:path";

/** Whether a file is in public/ at build time, so pages don't link to something that 404s. */
export const publicFileExists = (path: string) => existsSync(join(process.cwd(), "public", path));
