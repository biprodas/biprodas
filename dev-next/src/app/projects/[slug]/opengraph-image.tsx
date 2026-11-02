import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const alt = `Project case study by ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Same palette as the site-wide card in app/opengraph-image.tsx.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  const name = project ? (project.shortTitle ?? project.title) : profile.name;
  const stack = project?.technologies.slice(0, 6) ?? [];

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f9f8f5", color: "#1f2328" }}>
      <div style={{ width: 24, height: "100%", display: "flex", background: "#33598a" }} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#6b7079", letterSpacing: 4 }}
        >
          <div style={{ width: 12, height: 12, background: "#33598a" }} />
          BIPRODAS.DEV / CASE STUDY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: name.length > 24 ? 68 : 88, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {name}
          </div>
          {project && (
            <div style={{ marginTop: 24, fontSize: 30, color: "#3f454d", lineHeight: 1.35, maxWidth: 960 }}>
              {project.summary}
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 760 }}>
            {stack.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  border: "2px solid #e3dfd6",
                  padding: "6px 14px",
                  fontSize: 22,
                  color: "#3f454d",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, color: "#6b7079" }}>{profile.name}</div>
        </div>
      </div>
    </div>,
    size,
  );
}
