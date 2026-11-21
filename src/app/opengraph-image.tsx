import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#08080a",
        color: "#f2efe9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, background: "#ff5a1f" }} />
        {siteConfig.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          {siteConfig.hero.headline}
        </div>
        <div style={{ fontSize: 32, color: "#a09d96" }}>{siteConfig.tagline}</div>
      </div>
    </div>,
    size,
  );
}
