// openkrak-web/app/components/Nav.tsx
"use client";
export function Nav() {
  return (
    <nav className="fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 72px", background: "#fff", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #f0f0f0" }}>
      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px", color: "#0a0a0a", letterSpacing: "0.02em" }}>OPENKRAK</span>
      <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
        <a href="#tutorial" className="nav-link">Tutorial</a>
        <a href="https://github.com/FrnzJulianBergmann/openkrak" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
        <a href="https://www.npmjs.com/package/openkrak-mcp" target="_blank" rel="noopener noreferrer" className="nav-link">npm</a>
        <button onClick={() => (window as any).__okModal("monthly")} className="get-started-btn">Get Pro</button>
      </div>
    </nav>
  );
}
