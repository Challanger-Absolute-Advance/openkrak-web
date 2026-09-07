// openkrak-web/app/components/Hero.tsx
"use client";

const MCP_CONFIG = `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "openkrak": {
      "type": "local",
      "enabled": true,
      "command": ["npx", "openkrak-mcp"]
    }
  }
}`;

export function Hero() {
  return (
    <section style={{ padding: "120px 72px 100px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
      <div className="fade-up d1" style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
        <span className="agent-badge badge-on">&#10003; OpenCode Desktop</span>
        <span className="agent-badge badge-on">&#10003; OpenCode TUI</span>
        <span className="agent-badge badge-soon">Claude Code &mdash; soon</span>
        <span className="agent-badge badge-soon">Codex &mdash; soon</span>
        <span className="agent-badge badge-soon">Cursor &mdash; soon</span>
      </div>
      <h1 className="fade-up d1" style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#0a0a0a", maxWidth: "900px", marginBottom: "40px" }}>
        Your codebase, pre-computed{" "}
        <span style={{ color: "#bbb" }}>before the LLM sees a single token.</span>
      </h1>
      <div className="fade-up d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
        <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#555", fontWeight: 400 }}>
          OpenKrak runs the Dorchester engine on your repo &mdash; dependency graphs, hotspot scoring, blast radius analysis &mdash; and delivers a structured brief to the LLM before it touches a single file.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#bbb", letterSpacing: "0.08em", marginBottom: "4px" }}>INSTALL</div>
          <div className="code-block-wrap">
            <div className="code-box">npm install -g openkrak-mcp</div>
            <button className="copy-btn" data-copy="npm install -g openkrak-mcp">copy</button>
          </div>
          <button onClick={() => (window as any).__okModal("monthly")} style={{ background: "#0a0a0a", color: "#fff", border: "none", padding: "16px 32px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em", cursor: "pointer", fontFamily: "inherit" }}>
            Go Pro &mdash; $8/month
          </button>
        </div>
      </div>
    </section>
  );
}
