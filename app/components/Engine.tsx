// openkrak-web/app/components/Engine.tsx
"use client";

const ENGINE_STEPS = [
  { index: "/1", label: "Scan every file, map every dependency", title: "DeepStrike", desc: "Full static analysis across your entire repo. Every import, every export, every coupling resolved before the LLM ever runs.", delay: "0.1s" },
  { index: "/2", label: "Rank complexity, surface risk", title: "Hotspot Registry", desc: "Files ranked by change frequency, coupling density, and cognitive load. The LLM goes where it matters.", delay: "0.2s" },
  { index: "/3", label: "Trace impact across the codebase", title: "Blast Radius", desc: "Change one file and know exactly what breaks. Dependency chains mapped before you commit.", delay: "0.3s" },
  { index: "/4", label: "Structured context, not raw tokens", title: "Mahadata", desc: "Execution brief instead of 50,000 tokens of raw code. The LLM reads signal, not noise.", delay: "0.4s" },
];

export function Engine() {
  return (
    <section style={{ padding: "80px 72px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
      <div className="fade-up d1" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "60px" }}>THE ENGINE</div>
      {ENGINE_STEPS.map((item) => (
        <div key={item.index} className="engine-row" style={{ animationDelay: item.delay }}>
          <div className="row-index">{item.index}</div>
          <div>
            <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "14px" }}>{item.label}</div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "13px", color: "#0a0a0a", lineHeight: 1.7 }}>{item.title}</div>
          </div>
          <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.75 }}>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}
