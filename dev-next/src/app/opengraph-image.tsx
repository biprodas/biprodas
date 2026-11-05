import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PHOTO_WIDTH = 440;

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "src/assets/biprodas-roy.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f9f8f5", color: "#1f2328" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> only */}
      <img
        src={photoSrc}
        alt=""
        width={PHOTO_WIDTH}
        height={size.height}
        style={{ width: PHOTO_WIDTH, height: "100%", objectFit: "cover", objectPosition: "50% 25%" }}
      />
      <div style={{ width: 10, height: "100%", display: "flex", background: "#33598a" }} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#6b7079", letterSpacing: 4 }}
        >
          <div style={{ width: 12, height: 12, background: "#33598a" }} />
          BIPRODAS.DEV
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ marginTop: 20, fontSize: 30, color: "#33598a" }}>{profile.role}</div>
          <div style={{ marginTop: 32, fontSize: 26, color: "#3f454d", lineHeight: 1.4 }}>{profile.bio}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#6b7079" }}>
          {`${profile.location.city}, ${profile.location.country} · Remote · ${profile.utcOffset}`}
        </div>
      </div>
    </div>,
    size,
  );
}
