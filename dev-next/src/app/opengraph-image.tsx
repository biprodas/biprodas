import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} · Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f9f8f5", color: "#1f2328" }}>
      <div
        style={{ width: 300, height: "100%", display: "flex", background: "#f3f1ec", borderRight: "2px solid #e3dfd6" }}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px" }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#6b7079", letterSpacing: 4 }}
        >
          <div style={{ width: 12, height: 12, background: "#33598a" }} />
          BIPRODAS.DEV
        </div>
        <div style={{ marginTop: 28, fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>{profile.name}</div>
        <div style={{ marginTop: 16, fontSize: 32, color: "#3f454d" }}>{profile.role}</div>
        <div style={{ marginTop: 40, fontSize: 26, color: "#6b7079", maxWidth: 720 }}>{profile.intro}</div>
      </div>
    </div>,
    size,
  );
}
