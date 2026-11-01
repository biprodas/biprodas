import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { seededRandom } from "@/lib/hash";

export const alt = "Biprodas Roy — Digital Observatory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const rand = seededRandom(630);
  const stars = Array.from({ length: 140 }, () => ({
    x: rand() * size.width,
    y: rand() * size.height,
    r: 1 + rand() * 2.2,
    o: 0.2 + rand() * 0.7,
  }));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "radial-gradient(circle at 85% 0%, #1d1840 0%, #05070d 60%)",
        color: "#e8ebf4",
        fontFamily: "serif",
      }}
    >
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: 999,
            background: "#e8ebf4",
            opacity: s.o,
          }}
        />
      ))}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, width: "100%" }}>
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#f5bd63", fontFamily: "monospace" }}>
          {`DIGITAL OBSERVATORY · ${profile.coordinates}`}
        </div>
        <div style={{ fontSize: 120, marginTop: 24, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#a3abc0", fontFamily: "sans-serif" }}>
          {profile.roles.join(" · ")}
        </div>
      </div>
    </div>,
    size,
  );
}
