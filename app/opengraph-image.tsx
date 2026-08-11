import { ImageResponse } from "next/og";

export const alt = "Earnings Delta — See what changed. Verify why.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#050505",
        color: "#f4f4f0",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "64px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ background: "linear-gradient(135deg, #050505 20%, #343434 52%, #050505 82%)", display: "flex", inset: 0, opacity: 0.72, position: "absolute" }} />
      <div style={{ alignItems: "center", display: "flex", fontSize: 28, fontWeight: 700, gap: 18, position: "relative" }}>
        <div style={{ alignItems: "center", background: "#f4f4f0", borderRadius: 12, display: "flex", height: 52, justifyContent: "center", width: 52 }}>
          <svg viewBox="0 0 32 32" width="30" height="30"><path d="M16 5 6 27h20L16 5Z" fill="none" stroke="#050505" strokeWidth="3" strokeLinejoin="round" /></svg>
        </div>
        Earnings Delta
      </div>
      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ fontSize: 86, fontWeight: 700, letterSpacing: "-4px", lineHeight: 1.02 }}>See what changed.</div>
        <div style={{ fontSize: 86, fontWeight: 400, letterSpacing: "-4px", lineHeight: 1.02 }}>Verify why.</div>
      </div>
      <div style={{ color: "#b5b5ae", display: "flex", fontSize: 24, letterSpacing: "1px", position: "relative" }}>Evidence-first financial research</div>
    </div>,
    size,
  );
}
