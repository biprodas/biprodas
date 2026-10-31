import { loadContent } from "./index.ts";

try {
  const c = loadContent();
  const problems: string[] = [];

  const collections = {
    experience: c.experience,
    education: c.education,
    projects: c.projects,
    publications: c.publications,
    talks: c.talks,
    teaching: c.teaching,
    awards: c.awards,
    certifications: c.certifications,
    testScores: c.testScores,
  };

  for (const [name, items] of Object.entries(collections)) {
    const ids = items.map((i) => i.id);
    const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    if (dupes.length) problems.push(`${name}: duplicate ids ${dupes.join(", ")}`);
  }

  const experienceIds = new Set(c.experience.map((e) => e.id));
  const projectIds = new Set(c.projects.map((p) => p.id));
  const ref = (from: string, kind: string, id: string | undefined, known: Set<string>) => {
    if (id && !known.has(id)) problems.push(`${from}: unknown ${kind} id "${id}"`);
  };
  for (const e of c.experience) for (const p of e.projects) ref(`experience.${e.id}`, "project", p, projectIds);
  for (const p of c.projects) ref(`projects.${p.id}`, "experience", p.experience, experienceIds);
  for (const t of c.teaching) ref(`teaching.${t.id}`, "experience", t.experience, experienceIds);

  if (problems.length) throw new Error(`Invalid content:\n${problems.map((p) => `✖ ${p}`).join("\n")}`);

  const counts = Object.entries({ ...collections, skills: c.skills })
    .map(([name, items]) => `${items.length} ${name}`)
    .join(", ");
  console.log(`content ok: ${counts}`);
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}
