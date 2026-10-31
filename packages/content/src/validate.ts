import { loadContent } from "./index.ts";

try {
  const c = loadContent();
  const ids = [...c.experience, ...c.education, ...c.projects, ...c.awards].map((i) => i.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) throw new Error(`Duplicate ids: ${[...new Set(dupes)].join(", ")}`);
  console.log(
    `content ok: ${c.experience.length} experience, ${c.education.length} education, ` +
      `${c.projects.length} projects, ${c.awards.length} awards, ${c.skills.length} skill groups`,
  );
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}
