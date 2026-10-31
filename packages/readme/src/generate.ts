// Renders the content-driven parts of the GitHub profile: the blocks of the root README.md
// between `<!-- content:<name>:start -->` and `<!-- content:<name>:end -->`, and the header and
// footer SVGs in assets/.
//   node src/generate.ts          rewrite README.md and assets/*.svg
//   node src/generate.ts --check  exit 1 if any of them is out of date

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  certifications,
  profile,
  projects,
  skills,
} from "@biprodas/content";
import { footerSvg, headerSvg } from "./header-svg.ts";

const site = "engineering";
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const readmePath = repoRoot + "README.md";
const headerPath = fileURLToPath(new URL("../assets/header.svg", import.meta.url));
const footerPath = fileURLToPath(new URL("../assets/footer.svg", import.meta.url));
/** Repo-relative, forward slashes: how README.md references an asset. */
const src = (path: string) => relative(repoRoot, path).replace(/\\/g, "/");

// Logos for the tech stack, keyed by skill name in skills.yaml. Only skills with a logo are
// shown; groups left without any are skipped.
//   "ts"            → skillicons.dev id (https://github.com/tandpfun/skill-icons)
//   "tile:openai"   → local tile in assets/icons/, built by src/build-icons.ts
// One skill can map to several logos (e.g. "OpenAI/Anthropic APIs").
type Logo = { id: string; label: string };
const logos: Record<string, Logo[]> = {
  TypeScript: [{ id: "ts", label: "TypeScript" }],
  JavaScript: [{ id: "js", label: "JavaScript" }],
  Python: [{ id: "py", label: "Python" }],
  Java: [{ id: "java", label: "Java" }],
  "C++": [{ id: "cpp", label: "C++" }],
  React: [{ id: "react", label: "React" }],
  "Next.js": [{ id: "nextjs", label: "Next.js" }],
  "Tailwind CSS": [{ id: "tailwind", label: "Tailwind CSS" }],
  "TanStack Query": [{ id: "tile:reactquery", label: "TanStack Query" }],
  Redux: [{ id: "redux", label: "Redux" }],
  "shadcn/ui": [{ id: "tile:shadcnui", label: "shadcn/ui" }],
  "Node.js": [{ id: "nodejs", label: "Node.js" }],
  NestJS: [{ id: "nestjs", label: "NestJS" }],
  Express: [{ id: "express", label: "Express" }],
  FastAPI: [{ id: "fastapi", label: "FastAPI" }],
  GraphQL: [{ id: "graphql", label: "GraphQL" }],
  PostgreSQL: [{ id: "postgres", label: "PostgreSQL" }],
  Redis: [{ id: "redis", label: "Redis" }],
  MongoDB: [{ id: "mongodb", label: "MongoDB" }],
  MySQL: [{ id: "mysql", label: "MySQL" }],
  DynamoDB: [{ id: "dynamodb", label: "DynamoDB" }],
  TypeORM: [{ id: "tile:typeorm", label: "TypeORM" }],
  Prisma: [{ id: "prisma", label: "Prisma" }],
  "AWS (EC2, S3, Lambda, RDS)": [{ id: "aws", label: "AWS" }],
  Docker: [{ id: "docker", label: "Docker" }],
  "CI/CD (GitHub Actions)": [{ id: "githubactions", label: "GitHub Actions" }],
  Nginx: [{ id: "nginx", label: "Nginx" }],
  Vercel: [{ id: "vercel", label: "Vercel" }],
  Linux: [{ id: "linux", label: "Linux" }],
  "VS Code": [{ id: "vscode", label: "VS Code" }],
  Git: [{ id: "git", label: "Git" }],
  GitHub: [{ id: "github", label: "GitHub" }],
  JWT: [{ id: "tile:jsonwebtokens", label: "JWT" }],
  "OpenAI/Anthropic APIs": [
    { id: "tile:openai", label: "OpenAI" },
    { id: "tile:anthropic", label: "Anthropic" },
  ],
  LangGraph: [{ id: "tile:langchain", label: "LangGraph" }],
};

/** skills.yaml groups left out of the README tech stack (still used by the sites and CV). */
const hiddenGroups = new Set(["Security & Auth", "AI & LLMs"]);

/** projects.yaml ids left out of the README (still used by the sites and CV). */
const hiddenProjects = new Set(["larmts"]);

const html = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const iconSize = 32;
const iconGap = "&nbsp;&nbsp;";
const iconsDir = fileURLToPath(new URL("../assets/icons/", import.meta.url));

/** Issuer logos for the certifications list, keyed by `issuer` in certifications.yaml. */
const issuerLogos: Record<string, Logo> = {
  "Amazon Web Services": { id: "aws", label: "AWS" },
  HackerRank: { id: "tile:hackerrank", label: "HackerRank" },
};

/** Escapes text for a shields.io static badge path segment ("-" and "_" are separators). */
const badgeText = (s: string) => encodeURIComponent(s.replace(/-/g, "--").replace(/_/g, "__"));

/** One light/dark-aware logo, with the label as alt text and tooltip. */
function icon({ id, label }: Logo, size = iconSize): string {
  const url = (theme: string) =>
    id.startsWith("tile:")
      ? src(`${iconsDir}${id.slice(5)}-${theme}.svg`)
      : `https://skillicons.dev/icons?i=${id}&theme=${theme}`;
  const name = html(label);
  return (
    `<picture><source media="(prefers-color-scheme: dark)" srcset="${url("dark")}" />` +
    `<img alt="${name}" title="${name}" src="${url("light")}" height="${size}" /></picture>`
  );
}


const blocks: Record<string, () => string> = {
  header: () => {
    const p = profile();
    const alt = html(`${p.name} — ${p.headline.engineering}`);
    return `<p align="center">\n  <img alt="${alt}" src="${src(headerPath)}" width="100%" />\n</p>`;
  },

  footer: () => `<p align="center">\n  <img alt="" src="${src(footerPath)}" width="100%" />\n</p>`,

  motto: () => {
    const { tagline } = profile();
    return tagline ? `<p align="center"><i>“${html(tagline)}”</i></p>` : "";
  },

  // Two-column grid of project cards. Markdown inside <td> needs the blank lines around it.
  projects: () => {
    const cards = projects(site)
      .filter((p) => !hiddenProjects.has(p.id))
      .slice(0, 6)
      .map((p) => {
        const live = p.links.find((l) => l.kind === "live");
        const repo = p.links.find((l) => l.kind === "repo");
        const buttons = [
          live &&
            `<a href="${live.url}"><img alt="Live" src="https://img.shields.io/badge/Live-${badgeText(new URL(live.url).host)}-0EA5E9?style=flat-square&logo=googlechrome&logoColor=white" /></a>`,
          repo &&
            `<a href="${repo.url}"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-Source-181717?style=flat-square&logo=github&logoColor=white" /></a>`,
        ].filter(Boolean);
        const lines = [
          `#### ${p.title}`,
          p.topics.length ? `<sub>${p.topics.map(html).join(" · ")}</sub>` : "",
          p.summary,
          p.tech.slice(0, 6).map((t) => `\`${t}\``).join(" "),
          buttons.join(" "),
        ];
        return lines.filter(Boolean).join("\n\n");
      });
    const rows: string[] = [];
    for (let i = 0; i < cards.length; i += 2) {
      const cells = cards
        .slice(i, i + 2)
        .map((c) => `<td width="50%" valign="top">\n\n${c}\n\n</td>`)
        .join("\n");
      rows.push(`<tr>\n${cells}\n</tr>`);
    }
    return ["<table>", ...rows, "</table>"].join("\n");
  },

  stack: () => {
    const rows = skills(site).flatMap((g) => {
      if (hiddenGroups.has(g.group)) return [];
      const imgs = g.items.flatMap((s) => logos[s.name] ?? []).map(icon);
      if (!imgs.length) return [];
      // GitHub sizes tables to their content; a 100%-wide cell makes the table fill the
      // page. Non-breaking spaces keep the category label on one line.
      const label = html(g.group).replace(/ /g, "&nbsp;");
      return [
        `  <tr>\n    <td><b>${label}</b></td>\n    <td width="100%">${imgs.join(iconGap)}</td>\n  </tr>`,
      ];
    });
    return ["<table>", ...rows, "</table>"].join("\n");
  },

  certifications: () =>
    certifications(site)
      .map((c) => {
        const link = c.url ?? c.infoUrl;
        const title = link ? `[${c.title}](${link})` : c.title;
        const logo = issuerLogos[c.issuer];
        return `- ${logo ? `${icon(logo, 20)}&nbsp; ` : ""}**${title}** · ${c.issuer}`;
      })
      .join("\n"),
};

function render(readme: string): string {
  let out = readme.replace(/\r\n/g, "\n");
  for (const [name, build] of Object.entries(blocks)) {
    const start = `<!-- content:${name}:start -->`;
    const end = `<!-- content:${name}:end -->`;
    const i = out.indexOf(start);
    const j = out.indexOf(end);
    if (i === -1 || j === -1 || j < i) throw new Error(`README.md: missing marker pair for "${name}"`);
    out = `${out.slice(0, i + start.length)}\n${build()}\n${out.slice(j)}`;
  }
  return out;
}

const lf = (s: string) => s.replace(/\r\n/g, "\n");

try {
  const read = (path: string) => (existsSync(path) ? readFileSync(path, "utf8") : "");
  const readme = read(readmePath);
  const outputs = [
    { path: readmePath, current: readme, next: render(readme) },
    { path: headerPath, current: read(headerPath), next: headerSvg(profile()) },
    { path: footerPath, current: read(footerPath), next: footerSvg() },
  ];

  if (process.argv.includes("--check")) {
    const stale = outputs.filter((o) => o.next !== lf(o.current));
    if (stale.length) {
      const files = stale.map((o) => relative(repoRoot, o.path)).join(", ");
      console.error(`Out of date with packages/content: ${files}. Run \`pnpm readme\`.`);
      process.exit(1);
    }
    console.log("README.md and assets up to date");
  } else {
    for (const o of outputs) {
      mkdirSync(dirname(o.path), { recursive: true });
      writeFileSync(o.path, o.current.includes("\r\n") ? o.next.replace(/\n/g, "\r\n") : o.next);
    }
    console.log("README.md and assets updated");
  }
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}
