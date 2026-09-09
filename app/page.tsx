"use client";
import { useEffect, useState } from "react";

function TokenCounter() {
  useEffect(() => {
    function fmt(n: number): string {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function animate(el: HTMLElement, target: number) {
      const start = performance.now();
      const duration = 2200;
      function step(now: number) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.floor(ease * target));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(target);
      }
      requestAnimationFrame(step);
    }
    let done = false;
    const el = document.getElementById("token-count");
    const elAll = document.getElementById("token-count-all");
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        observer.disconnect();
        fetch("https://openkrak-license-server.openkrak.workers.dev/v3/token-count")
          .then(r => r.json())
          .then((d: { this_month?: number; all_time?: number }) => {
            if (el) animate(el, d.this_month || 0);
            if (elAll) animate(elAll, d.all_time || 0);
          }).catch(() => {});
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return null;
}

function CopyButton() {
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLButtonElement>("[data-copy]");
    btns.forEach(btn => {
      btn.onclick = () => {
        navigator.clipboard.writeText(btn.dataset.copy || "").then(() => {
          const orig = btn.textContent;
          btn.textContent = "Copied!";
          btn.style.color = "#166534";
          setTimeout(() => { btn.textContent = orig; btn.style.color = ""; }, 1500);
        });
      };
    });
  }, []);
  return null;
}

export default function Home() {
  const [client, setClient] = useState<"tui" | "desktop">("desktop");

  useEffect(() => {
    const bg = document.getElementById("ok-modal-bg") as HTMLElement | null;
    const title = document.getElementById("ok-modal-title") as HTMLElement | null;
    const confirm = document.getElementById("ok-modal-confirm") as HTMLElement | null;
    const cancel = document.getElementById("ok-modal-cancel") as HTMLElement | null;
    const close = document.getElementById("ok-modal-close") as HTMLElement | null;
    if (!bg || !title || !confirm || !cancel || !close) return;
    let okUrl = "";
    (window as any).__okModal = (plan: string) => {
      okUrl = plan === "annual" ? "https://payhip.com/b/0BuUl" : "https://payhip.com/b/yNFQB";
      title.textContent = plan === "annual" ? "OpenKrak Pro Annual - $67" : "OpenKrak Pro Monthly - $8";
      bg.style.display = "flex";
    };
    const closeModal = () => { bg.style.display = "none"; };
    confirm.onclick = () => { window.open(okUrl, "_blank"); closeModal(); };
    cancel.onclick = closeModal;
    close.onclick = closeModal;
    bg.onclick = (e: MouseEvent) => { if (e.target === bg) closeModal(); };
  }, []);

  const mcpConfig = `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "openkrak": {
      "type": "local",
      "enabled": true,
      "command": ["npx", "--yes", "openkrak-mcp"]
    }
  }
}`;

  const configPath = {
    desktop: {
      windows: `C:\\Users\\<username>\\.config\\opencode\\opencode.jsonc`,
      mac: `~/.config/opencode/opencode.jsonc`,
    },
    tui: {
      windows: `C:\\Users\\<username>\\.config\\opencode\\opencode.jsonc`,
      mac: `~/.config/opencode/opencode.jsonc`,
    },
  };

  const connectedNote = {
    desktop: `Restart OpenCode Desktop. Look for the green MCP dot in the bottom status bar — "openkrak Connected".`,
    tui: `Restart OpenCode TUI. Look for "openkrak Connected" in the top-right MCP panel.`,
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      <TokenCounter />
      <CopyButton />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-in { animation: fadeIn 0.6s ease both; }
        .d1 { animation-delay: 0.05s; } .d2 { animation-delay: 0.15s; }
        a { text-decoration: none; color: inherit; }
        .nav-link { color: #666 !important; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #0a0a0a !important; }
        .engine-row { display: grid; grid-template-columns: 80px 1fr 1fr; gap: 48px; align-items: start; padding: 48px 0; opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .row-index { font-size: 13px; color: #ddd; padding-top: 4px; transition: color 0.3s; }
        .stat-card { padding: 48px 40px; transition: background 0.3s; background: #f7f7f7; }
        .stat-card:hover { background: #f0f0f0; }
        .code-box { background: #f5f5f5; padding: 16px 24px; font-size: 13px; color: #0a0a0a !important; font-family: monospace; width: 100%; letter-spacing: 0.02em; box-sizing: border-box; }
        .code-block-wrap { position: relative; background: #f5f5f5; }
        .copy-btn { position: absolute; top: 8px; right: 10px; background: none; border: 1px solid #ddd; padding: 3px 10px; font-size: 11px; font-family: monospace; color: #999; cursor: pointer; transition: all 0.2s; }
        .copy-btn:hover { background: #0a0a0a; color: #fff; border-color: #0a0a0a; }
        .get-started-btn { color: #fff !important; background: #0a0a0a; padding: 10px 22px; font-size: 13px; font-weight: 600; letter-spacing: 0.02em; cursor: pointer; border: none; }
        .get-started-btn:hover { background: #333; }
        .feature-row { display: flex; gap: 12px; padding: 11px 0; font-size: 13px; }
        .feature-row-dark { display: flex; gap: 12px; padding: 11px 0; font-size: 13px; }
        .feature-divider { border-top: 1px solid #f0f0f0; }
        .feature-divider-dark { border-top: 1px solid #1a1a1a; }
        .check { color: #0a0a0a; font-weight: 700; flex-shrink: 0; }
        .check-dark { color: #fff; font-weight: 700; flex-shrink: 0; }
        .plan-btn { display: block; width: 100%; padding: 15px; text-align: center; font-size: 14px; font-weight: 700; letter-spacing: 0.02em; margin-top: 32px; box-sizing: border-box; cursor: pointer; transition: opacity 0.2s; border: none; font-family: inherit; }
        .plan-btn:hover { opacity: 0.85; }
        .plan-btn-light { background: #0a0a0a; color: #fff; }
        .plan-btn-outline { background: transparent; color: #0a0a0a; border: 1px solid #ddd !important; }
        .plan-btn-dark { background: #fff; color: #0a0a0a; }
        .agent-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; font-size: 12px; font-weight: 600; border: 1px solid #e8e8e8; }
        .badge-on { background: #f0fff4; border-color: #86efac; color: #166534; }
        .badge-soon { background: #f9f9f9; border-color: #e8e8e8; color: #999; }
        .tab-btn { padding: 8px 20px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; font-family: inherit; letter-spacing: 0.04em; transition: all 0.15s; }
        .tab-active { background: #0a0a0a; color: #fff; }
        .tab-inactive { background: #f5f5f5; color: #999; }
        .tutorial-step { display: grid; grid-template-columns: 32px 1fr; gap: 20px; padding: 20px 0; border-top: 1px solid #f0f0f0; }
        .tutorial-step:first-child { border-top: none; }
        .step-num { width: 28px; height: 28px; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; margin-top: 2px; }
      `}</style>

      {/* Nav */}
      <nav className="fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 72px", background: "#fff", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #f0f0f0" }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px", color: "#0a0a0a", letterSpacing: "0.02em" }}>OPENKRAK</span>
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <a href="#tutorial" className="nav-link">Tutorial</a>
          <a href="https://github.com/FrnzJulianBergmann/openkrak" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
          <a href="https://www.npmjs.com/package/openkrak-mcp" target="_blank" rel="noopener noreferrer" className="nav-link">npm</a>
          <button onClick={() => (window as any).__okModal("monthly")} className="get-started-btn">Get Pro</button>
        </div>
      </nav>

      {/* Hero */}
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
            OpenKrak runs the Dorchester engine on your repo &mdash; dependency graphs, hotspot scoring, blast radius analysis &mdash; and delivers a structured brief directly into Claude&rsquo;s context before it touches a single file. Built for Claude Code. Supports TypeScript, JavaScript, Python, Go, Rust, Java, and C#.
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

      {/* Tutorial */}
      <section id="tutorial" style={{ padding: "80px 72px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "16px" }}>TUTORIAL</div>
        <div style={{ display: "flex", gap: "0", marginBottom: "40px", alignItems: "center" }}>
          <button className={`tab-btn ${client === "desktop" ? "tab-active" : "tab-inactive"}`} onClick={() => setClient("desktop")}>OpenCode Desktop</button>
          <button className={`tab-btn ${client === "tui" ? "tab-active" : "tab-inactive"}`} onClick={() => setClient("tui")}>OpenCode TUI</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <div>
            {/* Steps */}
            <div className="tutorial-step">
              <div className="step-num">1</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a", marginBottom: "10px" }}>Install OpenKrak</div>
                <div className="code-block-wrap" style={{ marginBottom: "10px" }}>
                  <div style={{ background: "#f5f5f5", padding: "12px 16px", fontFamily: "monospace", fontSize: "12px", color: "#0a0a0a", paddingRight: "52px" }}>npm install -g openkrak-mcp</div>
                  <button className="copy-btn" data-copy="npm install -g openkrak-mcp">copy</button>
                </div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6 }}>Requires Node.js ≥ 18.</p>
              </div>
            </div>

            <div className="tutorial-step">
              <div className="step-num">2</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a", marginBottom: "10px" }}>Open your OpenCode config</div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6, marginBottom: "10px" }}>
                  {client === "desktop" ? "In OpenCode Desktop: Settings → MCP → Edit Config File. Or open manually:" : "Open the file directly:"}
                </p>
                <div style={{ background: "#f5f5f5", padding: "10px 14px", fontFamily: "monospace", fontSize: "11px", color: "#555", marginBottom: "6px" }}>
                  Windows: {configPath[client].windows}
                </div>
                <div style={{ background: "#f5f5f5", padding: "10px 14px", fontFamily: "monospace", fontSize: "11px", color: "#555" }}>
                  macOS / Linux: {configPath[client].mac}
                </div>
              </div>
            </div>

            <div className="tutorial-step">
              <div className="step-num">3</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a", marginBottom: "10px" }}>Add OpenKrak to the config</div>
                <div className="code-block-wrap">
                  <div style={{ background: "#f5f5f5", padding: "12px 16px", fontFamily: "monospace", fontSize: "11px", color: "#0a0a0a", whiteSpace: "pre-wrap", lineHeight: 1.6, paddingRight: "52px" }}>{mcpConfig}</div>
                  <button className="copy-btn" data-copy={mcpConfig}>copy</button>
                </div>
              </div>
            </div>

            <div className="tutorial-step">
              <div className="step-num">4</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a", marginBottom: "10px" }}>Restart OpenCode</div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6 }}>{connectedNote[client]}</p>
              </div>
            </div>

            <div className="tutorial-step">
              <div className="step-num">5</div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a", marginBottom: "10px" }}>Run your first analysis</div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6, marginBottom: "10px" }}>Open a repo in OpenCode and send:</p>
                <div className="code-block-wrap">
                  <div style={{ background: "#f5f5f5", padding: "12px 16px", fontFamily: "monospace", fontSize: "12px", color: "#0a0a0a", paddingRight: "52px" }}>analyze_repo on /path/to/your/repo</div>
                  <button className="copy-btn" data-copy="analyze_repo on /path/to/your/repo">copy</button>
                </div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6, marginTop: "10px" }}>OpenKrak also runs automatically when you give OpenCode a coding task — no manual invocation needed.</p>
              </div>
            </div>
          </div>

          {/* Tools reference */}
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#bbb", letterSpacing: "0.1em", marginBottom: "24px" }}>AVAILABLE TOOLS</div>
            {[
              { name: "analyze_repo", when: "Before any coding task on a new repo.", what: "Full pipeline. Returns dependency graph, hotspot rankings, blast radius, and threat matrix.", example: 'analyze_repo on /path/to/repo with objective "refactor auth module"' },
              { name: "get_mahadata", when: "When you need repo-wide context mid-session.", what: "Compact repo brief — structure, entry points, constraints, risk score.", example: "get_mahadata on /path/to/repo" },
              { name: "get_hotspots", when: "Before reviewing or refactoring.", what: "Ranked list of high-risk files by complexity, coupling, and change frequency.", example: "get_hotspots on /path/to/repo" },
              { name: "blast_radius", when: "Before modifying a critical file.", what: "Impact map — which files, modules, and APIs are affected.", example: "blast_radius on /path/to/repo for file src/api/routes/user.ts" },
            ].map((tool, i) => (
              <div key={tool.name} style={{ padding: "16px 0", borderTop: i > 0 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: 700, color: "#0a0a0a", marginBottom: "6px" }}>{tool.name}</div>
                <div style={{ fontSize: "12px", color: "#999", marginBottom: "4px" }}>When: {tool.when}</div>
                <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.6, marginBottom: "8px" }}>{tool.what}</div>
                <div className="code-block-wrap">
                  <div style={{ background: "#f5f5f5", padding: "8px 12px", fontFamily: "monospace", fontSize: "11px", color: "#555", paddingRight: "48px" }}>{tool.example}</div>
                  <button className="copy-btn" data-copy={tool.example}>copy</button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: "24px", padding: "20px", background: "#f7f7f7" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#0a0a0a", marginBottom: "8px" }}>Pro license</div>
              <p style={{ fontSize: "12px", color: "#777", lineHeight: 1.65, marginBottom: "10px" }}>Add your key to the MCP config to activate unlimited queries:</p>
              <div className="code-block-wrap">
                <div style={{ background: "#f5f5f5", padding: "10px 14px", fontFamily: "monospace", fontSize: "11px", color: "#0a0a0a", whiteSpace: "pre-wrap", paddingRight: "48px" }}>{`"env": {\n  "OPENKRAK_KEY": "your-key"\n}`}</div>
                <button className="copy-btn" data-copy={`"env": {\n  "OPENKRAK_KEY": "your-key"\n}`}>copy</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine */}
      <section style={{ padding: "80px 72px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div className="fade-up d1" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "60px" }}>THE ENGINE</div>
        {[
          { index: "/1", label: "Scan every file, map every dependency", title: "DeepStrike", desc: "Full static analysis across your entire repo. Every import, every export, every coupling resolved before the LLM ever runs.", delay: "0.1s" },
          { index: "/2", label: "Rank complexity, surface risk", title: "Hotspot Registry", desc: "Files ranked by change frequency, coupling density, and cognitive load. The LLM goes where it matters.", delay: "0.2s" },
          { index: "/3", label: "Trace impact across the codebase", title: "Blast Radius", desc: "Change one file and know exactly what breaks. Dependency chains mapped before you commit.", delay: "0.3s" },
          { index: "/4", label: "Structured context, not raw tokens", title: "Mahadata", desc: "Execution brief instead of 50,000 tokens of raw code. The LLM reads signal, not noise.", delay: "0.4s" },
        ].map((item) => (
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

      {/* Stats */}
      <section style={{ padding: "0 72px 80px", maxWidth: "1200px", width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
        {[
          ["~18K", "tokens total with Dorchester vs 59K–63K without — zero manual file reads"],
          ["70–92%", "token reduction benchmarked on real repositories"],
          ["10 tools", "available via MCP — topology, hotspots, blast radius, dead code, cycles, security, and more"],
        ].map(([stat, desc], i) => (
          <div key={i} className="stat-card">
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(14px, 2vw, 24px)", color: "#0a0a0a", marginBottom: "16px", lineHeight: 1.5 }}>{stat}</div>
            <div style={{ fontSize: "14px", color: "#777", lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </section>

      {/* Token Counter */}
      <section style={{ padding: "0 72px 80px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div style={{ background: "#0a0a0a", padding: "64px 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#444", letterSpacing: "0.15em", marginBottom: "24px" }}>THIS MONTH</div>
            <div id="token-count" style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "16px" }}>0</div>
            <div style={{ fontSize: "16px", color: "#555", lineHeight: 1.6 }}>tokens saved by OpenKrak.<br />Reset every month.</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#444", letterSpacing: "0.15em", marginBottom: "24px" }}>ALL TIME</div>
            <div id="token-count-all" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#666", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "16px" }}>0</div>
            <div style={{ fontSize: "14px", color: "#444", lineHeight: 1.6 }}>tokens never sent to an LLM.<br />Saved. Every analysis. Compounding.</div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "80px 72px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "12px" }}>PLANS</div>
        <p style={{ fontSize: "14px", color: "#999", marginBottom: "48px", maxWidth: "560px", lineHeight: 1.7 }}>
          Free tier: 15 queries per 24-hour rolling window, no account needed. Pro: unlimited. Activate with{" "}
          <span style={{ fontFamily: "monospace", background: "#f5f5f5", padding: "2px 6px", fontSize: "12px", color: "#0a0a0a" }}>OPENKRAK_KEY=your-key</span> in your MCP config.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", alignItems: "stretch" }}>
          <div style={{ border: "1px solid #e8e8e8", padding: "36px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#bbb", letterSpacing: "0.1em", marginBottom: "20px" }}>FREE</div>
            <div style={{ fontSize: "44px", fontWeight: 700, color: "#0a0a0a", lineHeight: 1, marginBottom: "4px" }}>$0</div>
            <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "28px" }}>forever</div>
            <div style={{ fontSize: "13px", color: "#777", marginBottom: "20px", lineHeight: 1.6 }}>Full MCP server. 15 queries per 24h rolling window, no account, no signup required.</div>
            <div style={{ flex: 1 }}>
              {["Full Dorchester analysis", "All 10 MCP tools", "15 queries / 24h rolling", "No account required"].map((f, i) => (
                <div key={f} className={`feature-row${i > 0 ? " feature-divider" : ""}`}>
                  <span style={{ color: "#bbb", flexShrink: 0 }}>-</span>
                  <span style={{ color: "#555" }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://www.npmjs.com/package/openkrak-mcp" target="_blank" rel="noopener noreferrer" className="plan-btn plan-btn-outline" style={{ display: "block", textAlign: "center" }}>Install Free</a>
          </div>
          <div style={{ border: "2px solid #0a0a0a", padding: "36px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#0a0a0a", letterSpacing: "0.1em", marginBottom: "20px" }}>PRO MONTHLY</div>
            <div style={{ fontSize: "44px", fontWeight: 700, color: "#0a0a0a", lineHeight: 1, marginBottom: "4px" }}>$8</div>
            <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "28px" }}>per month &middot; 31-day license key</div>
            <div style={{ fontSize: "13px", color: "#777", marginBottom: "20px", lineHeight: 1.6 }}>Unlimited queries. No daily cap. Dorchester runs on every session, every task.</div>
            <div style={{ flex: 1 }}>
              {[["Everything in Free", true], ["Unlimited queries", true], ["31-day license key via email", true], ["No subscription, no auto-renewal", true]].map(([f, bold], i) => (
                <div key={f as string} className={`feature-row${i > 0 ? " feature-divider" : ""}`}>
                  <span className="check">&#10003;</span>
                  <span style={{ color: bold ? "#0a0a0a" : "#555", fontWeight: bold ? 500 : 400 }}>{f as string}</span>
                </div>
              ))}
            </div>
            <button onClick={() => (window as any).__okModal("monthly")} className="plan-btn plan-btn-light">Get Monthly &mdash; $8</button>
          </div>
          <div style={{ background: "#0a0a0a", padding: "36px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#fff", letterSpacing: "0.1em" }}>PRO ANNUAL</div>
              <span style={{ background: "#fff", color: "#0a0a0a", fontSize: "9px", fontWeight: 800, padding: "3px 8px" }}>SAVE 30%</span>
            </div>
            <div style={{ fontSize: "44px", fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: "4px" }}>$67</div>
            <div style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>per year &middot; 366-day key</div>
            <div style={{ fontSize: "12px", color: "#444", marginBottom: "28px" }}>approx $5.60/month</div>
            <div style={{ flex: 1 }}>
              {[["Everything in Pro Monthly", true], ["366-day license key", true], ["Save $28.80 vs monthly", true]].map(([f, bold], i) => (
                <div key={f as string} className={`feature-row-dark${i > 0 ? " feature-divider-dark" : ""}`}>
                  <span className="check-dark">&#10003;</span>
                  <span style={{ color: bold ? "#fff" : "#888", fontWeight: bold ? 500 : 400 }}>{f as string}</span>
                </div>
              ))}
            </div>
            <button onClick={() => (window as any).__okModal("annual")} className="plan-btn plan-btn-dark">Get Annual &mdash; $67</button>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "#bbb", marginTop: "24px", textAlign: "center" }}>
          Secure checkout via Payhip &middot; License key delivered instantly to your email &middot; No subscription, no auto-renewal
        </p>
      </section>

      {/* Modal */}
      <div id="ok-modal-bg" style={{ display: "none", position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", maxWidth: "480px", width: "90%", padding: "48px 40px", position: "relative" }}>
          <button id="ok-modal-close" style={{ position: "absolute", top: "16px", right: "20px", background: "none", border: "none", fontSize: "20px", color: "#bbb", cursor: "pointer" }}>x</button>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "24px" }}>SECURE CHECKOUT</div>
          <h2 id="ok-modal-title" style={{ fontSize: "22px", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}></h2>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.75, marginBottom: "24px" }}>
            You will be redirected to <strong style={{ color: "#0a0a0a" }}>Payhip</strong> &mdash; secure checkout, instant license key delivery to your email.
          </p>
          <div style={{ background: "#f7f7f7", padding: "20px 24px", marginBottom: "32px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#0a0a0a", letterSpacing: "0.05em", marginBottom: "12px" }}>WHAT HAPPENS NEXT</div>
            {["Complete checkout on Payhip", "License key sent instantly to your email", "Add to OpenCode config: OPENKRAK_KEY=your-key", "Unlimited queries, active immediately"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#555", padding: "6px 0", borderTop: i > 0 ? "1px solid #eee" : "none" }}>
                <span style={{ color: "#bbb", flexShrink: 0 }}>{i + 1}.</span>{s}
              </div>
            ))}
          </div>
          <button id="ok-modal-confirm" style={{ background: "#0a0a0a", color: "#fff", border: "none", padding: "15px", fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "100%", marginBottom: "10px", fontFamily: "inherit" }}>Continue to Checkout</button>
          <button id="ok-modal-cancel" style={{ background: "transparent", color: "#bbb", border: "none", padding: "10px", fontSize: "13px", cursor: "pointer", width: "100%", fontFamily: "inherit" }}>Cancel</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "32px 72px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0a0a0a" }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#444" }}>OPENKRAK</span>
        <span style={{ fontSize: "13px", color: "#444" }}>MIT License &middot; 2026 &middot; A <a href="https://challanger-aa.vercel.app" style={{ color: "#555", textDecoration: "none" }}>Challanger Absolute Advance</a> product</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="https://github.com/FrnzJulianBergmann/openkrak" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#444" }}>GitHub</a>
          <a href="https://www.npmjs.com/package/openkrak-mcp" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#444" }}>npm</a>
        </div>
      </footer>
    </main>
  );
}
