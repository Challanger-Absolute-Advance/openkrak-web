"use client";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>

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
        .engine-row:hover .row-index { color: #0a0a0a; }
        .row-index { font-size: 13px; color: #ddd; padding-top: 4px; transition: color 0.3s; }
        .stat-card { padding: 48px 40px; transition: background 0.3s; background: #f7f7f7; }
        .stat-card:hover { background: #f0f0f0; }
        .code-box { background: #f5f5f5; padding: 16px 24px; font-size: 13px; color: #0a0a0a !important; font-family: monospace; width: 100%; letter-spacing: 0.02em; box-sizing: border-box; }
        .get-started-btn { color: #fff !important; background: #0a0a0a; padding: 10px 22px; font-size: 13px; font-weight: 600; letter-spacing: 0.02em; cursor: pointer; border: none; }
        .get-started-btn:hover { background: #333; }
        .founder-row { padding: 22px 0; display: grid; grid-template-columns: 150px 1fr; gap: 32px; border-top: 1px solid #f0f0f0; }
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
        .step-num { fontFamily: "'Press Start 2P', monospace"; font-size: 10px; color: #bbb; margin-bottom: 12px; }
        .agent-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; font-size: 12px; font-weight: 600; border: 1px solid #e8e8e8; }
        .badge-on { background: #f0fff4; border-color: #86efac; color: #166534; }
        .badge-soon { background: #f9f9f9; border-color: #e8e8e8; color: #999; }
      `}</style>

      {/* Nav */}
      <nav className="fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 72px", background: "#fff", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #f0f0f0" }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px", color: "#0a0a0a", letterSpacing: "0.02em" }}>OPENKRAK</span>
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <a href="https://github.com/FrnzJulianBergmann/openkrak" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
          <a href="https://www.npmjs.com/package/openkrak-mcp" target="_blank" rel="noopener noreferrer" className="nav-link">npm</a>
          <button onClick={() => (window as any).__okModal("monthly")} className="get-started-btn">Get Pro</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "120px 72px 100px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div className="fade-up d1" style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
          <span className="agent-badge badge-on">✓ OpenCode</span>
          <span className="agent-badge badge-soon">Claude Code — soon</span>
          <span className="agent-badge badge-soon">Codex — soon</span>
          <span className="agent-badge badge-soon">Cursor — soon</span>
        </div>
        <h1 className="fade-up d1" style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#0a0a0a", maxWidth: "900px", marginBottom: "40px" }}>
          Your codebase, pre-computed{" "}
          <span style={{ color: "#bbb" }}>before the LLM sees a single token.</span>
        </h1>
        <div className="fade-up d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
          <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#555", fontWeight: 400 }}>
            OpenKrak runs the Dorchester engine on your repo — dependency graphs, hotspot scoring, blast radius analysis — and delivers a structured 500-token brief to the LLM before it touches a single file.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#bbb", letterSpacing: "0.08em", marginBottom: "4px" }}>INSTALL</div>
            <div className="code-box">npm install -g openkrak-mcp</div>
            <button
              onClick={() => (window as any).__okModal("monthly")}
              style={{ background: "#0a0a0a", color: "#fff", border: "none", padding: "16px 32px", fontSize: "14px", fontWeight: 600, letterSpacing: "0.02em", cursor: "pointer", fontFamily: "inherit" }}>
              Go Pro — $8/month
            </button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ padding: "0 72px 100px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "48px" }}>QUICK START — OPENCODE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0", border: "1px solid #e8e8e8" }}>
          {[
            { num: "01", title: "Install", code: "npm install -g openkrak-mcp", desc: "One command. No config needed for free tier." },
            { num: "02", title: "Add to OpenCode", code: `"mcp": {\n  "openkrak": {\n    "type": "local",\n    "enabled": true,\n    "command": ["openkrak-mcp"]\n  }\n}`, desc: "Paste into ~/.config/opencode/opencode.jsonc" },
            { num: "03", title: "Restart OpenCode", code: null, desc: 'You should see "openkrak Connected" in the top-right MCP panel.' },
            { num: "04", title: "Start coding", code: "analyze_repo /path/to/repo", desc: "OpenKrak runs automatically before every coding task." },
          ].map((step, i) => (
            <div key={i} style={{ padding: "36px 28px", borderLeft: i > 0 ? "1px solid #e8e8e8" : "none" }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", marginBottom: "16px" }}>{step.num}</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a0a0a", marginBottom: "16px" }}>{step.title}</div>
              {step.code && (
                <div style={{ background: "#f5f5f5", padding: "12px 16px", fontFamily: "monospace", fontSize: "11px", color: "#0a0a0a", marginBottom: "16px", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{step.code}</div>
              )}
              <div style={{ fontSize: "13px", color: "#777", lineHeight: 1.65 }}>{step.desc}</div>
            </div>
          ))}
        </div>

        {/* Toggle */}
        <div style={{ marginTop: "24px", padding: "28px 32px", background: "#f7f7f7", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#bbb", letterSpacing: "0.1em", marginBottom: "12px" }}>TURN ON / OFF</div>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.7 }}>Change <code style={{ background: "#eee", padding: "1px 5px" }}>enabled</code> in your config, then restart OpenCode.</p>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", color: "#0a0a0a", fontWeight: 700, marginBottom: "8px" }}>ON</div>
              <div className="code-box" style={{ fontSize: "12px" }}>{`"enabled": true`}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", color: "#999", fontWeight: 700, marginBottom: "8px" }}>OFF</div>
              <div className="code-box" style={{ fontSize: "12px" }}>{`"enabled": false`}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Engine */}
      <section style={{ padding: "80px 72px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div className="fade-up d1" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "60px" }}>THE ENGINE</div>
        {[
          { index: "/1", label: "Scan every file, map every dependency", title: "DeepStrike", desc: "Full static analysis across your entire repo. Every import, every export, every coupling — resolved before the LLM ever runs.", delay: "0.1s" },
          { index: "/2", label: "Rank complexity, surface risk", title: "Hotspot Registry", desc: "Files ranked by change frequency, coupling density, and cognitive load. The LLM goes where it matters.", delay: "0.2s" },
          { index: "/3", label: "Trace impact across the codebase", title: "Blast Radius", desc: "Change one file — know exactly what breaks. Dependency chains mapped before you commit.", delay: "0.3s" },
          { index: "/4", label: "Structured context, not raw tokens", title: "Mahadata", desc: "500-token execution brief instead of 50,000 tokens of raw code. The LLM reads signal, not noise.", delay: "0.4s" },
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
          ["~500", "tokens delivered to LLM instead of 50,000+ raw lines"],
          ["20–80%", "token reduction depending on task complexity"],
          ["6 steps", "automated analysis — zero config, zero prompting required"],
        ].map(([stat, desc], i) => (
          <div key={i} className="stat-card">
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(14px, 2vw, 24px)", color: "#0a0a0a", marginBottom: "16px", lineHeight: 1.5 }}>{stat}</div>
            <div style={{ fontSize: "14px", color: "#777", lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </section>

      {/* Plans */}
      <section style={{ padding: "80px 72px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "12px" }}>PLANS</div>
        <p style={{ fontSize: "14px", color: "#999", marginBottom: "48px", maxWidth: "560px", lineHeight: 1.7 }}>
          Free tier: 15 queries per 24-hour rolling window, no account needed. Pro: unlimited. Activate with{" "}
          <span style={{ fontFamily: "monospace", background: "#f5f5f5", padding: "2px 6px", fontSize: "12px", color: "#0a0a0a" }}>OPENKRAK_KEY=your-key</span> in your MCP config.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", alignItems: "stretch" }}>

          {/* Free */}
          <div style={{ border: "1px solid #e8e8e8", padding: "36px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#bbb", letterSpacing: "0.1em", marginBottom: "20px" }}>FREE</div>
            <div style={{ fontSize: "44px", fontWeight: 700, color: "#0a0a0a", lineHeight: 1, marginBottom: "4px" }}>$0</div>
            <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "28px" }}>forever</div>
            <div style={{ fontSize: "13px", color: "#777", marginBottom: "20px", lineHeight: 1.6 }}>
              Full MCP server. 15 queries per 24h rolling window — no account, no signup required.
            </div>
            <div style={{ flex: 1 }}>
              {["Full Dorchester analysis", "All 4 MCP tools", "15 queries / 24h rolling", "No account required"].map((f, i) => (
                <div key={f} className={`feature-row${i > 0 ? " feature-divider" : ""}`}>
                  <span style={{ color: "#bbb", flexShrink: 0 }}>—</span>
                  <span style={{ color: "#555" }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://www.npmjs.com/package/openkrak-mcp" target="_blank" rel="noopener noreferrer" className="plan-btn plan-btn-outline" style={{ display: "block", textAlign: "center" }}>
              Install Free
            </a>
          </div>

          {/* Monthly */}
          <div style={{ border: "2px solid #0a0a0a", padding: "36px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#0a0a0a", letterSpacing: "0.1em", marginBottom: "20px" }}>PRO MONTHLY</div>
            <div style={{ fontSize: "44px", fontWeight: 700, color: "#0a0a0a", lineHeight: 1, marginBottom: "4px" }}>$8</div>
            <div style={{ fontSize: "13px", color: "#bbb", marginBottom: "28px" }}>per month · 31-day license key</div>
            <div style={{ fontSize: "13px", color: "#777", marginBottom: "20px", lineHeight: 1.6 }}>
              Unlimited queries. No daily cap — Dorchester runs on every session, every task.
            </div>
            <div style={{ flex: 1 }}>
              {[
                ["Everything in Free", true],
                ["Unlimited queries", true],
                ["31-day license key via email", true],
                ["No subscription, no auto-renewal", true],
              ].map(([f, bold], i) => (
                <div key={f as string} className={`feature-row${i > 0 ? " feature-divider" : ""}`}>
                  <span className="check">✓</span>
                  <span style={{ color: bold ? "#0a0a0a" : "#555", fontWeight: bold ? 500 : 400 }}>{f as string}</span>
                </div>
              ))}
            </div>
            <button onClick={() => (window as any).__okModal("monthly")} className="plan-btn plan-btn-light">
              Get Monthly — $8
            </button>
          </div>

          {/* Annual */}
          <div style={{ background: "#0a0a0a", padding: "36px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#fff", letterSpacing: "0.1em" }}>PRO ANNUAL</div>
              <span style={{ background: "#fff", color: "#0a0a0a", fontSize: "9px", fontWeight: 800, padding: "3px 8px", letterSpacing: "0.05em" }}>SAVE 30%</span>
            </div>
            <div style={{ fontSize: "44px", fontWeight: 700, color: "#fff", lineHeight: 1, marginBottom: "4px" }}>$67</div>
            <div style={{ fontSize: "13px", color: "#555", marginBottom: "4px" }}>per year · 366-day key</div>
            <div style={{ fontSize: "12px", color: "#444", marginBottom: "28px" }}>≈ $5.60/month</div>
            <div style={{ flex: 1 }}>
              {[
                ["Everything in Pro Monthly", true],
                ["366-day license key", true],
                ["Save $28.80 vs monthly", true],
              ].map(([f, bold], i) => (
                <div key={f as string} className={`feature-row-dark${i > 0 ? " feature-divider-dark" : ""}`}>
                  <span className="check-dark">✓</span>
                  <span style={{ color: bold ? "#fff" : "#888", fontWeight: bold ? 500 : 400 }}>{f as string}</span>
                </div>
              ))}
            </div>
            <button onClick={() => (window as any).__okModal("annual")} className="plan-btn plan-btn-dark">
              Get Annual — $67
            </button>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "#bbb", marginTop: "24px", textAlign: "center" }}>
          Secure checkout via Payhip · License key delivered instantly to your email · No subscription, no auto-renewal
        </p>
      </section>

      {/* Vision */}
      <section style={{ padding: "80px 72px", background: "#f7f7f7" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "48px" }}>VISION</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              A global technology company,{" "}
              <span style={{ color: "#bbb" }}>built by one person.</span>
            </h2>
            <div>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#555", marginBottom: "24px" }}>
                OpenKrak is not a side project. It is the foundation of a global technology company — built to operate at universal scale, without the overhead of consensus, hierarchy, or institutional permission.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#555" }}>
                The thesis is simple: software development is the largest white-collar market on earth. The tools that dominate it will be worth more than the companies they serve. OpenKrak is built to own that position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: "80px 72px", maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "60px" }}>FOUNDER</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "48px" }}>Faiz Hamizan.</h2>
            <p style={{ fontSize: "32px", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.2, letterSpacing: "-0.02em" }}>"One dot of<br />a blackhole."</p>
          </div>
          <div>
            {[
              ["PHILOSOPHY", "Move fast. Break things. Rebuild better. Bureaucracy is the enemy of output. Anti-rigidity in all forms — the only acceptable standard is dominance."],
              ["APPROACH", "Finance-first. Not an engineer who learned business — a capitalist who learned to build. Spots monopoly gaps before writing a single line."],
              ["IDEOLOGY", "Aggressive capitalism. Libertarian to the core. One man against the world — not as rebellion, but as the only logical operating mode."],
              ["LANGUAGES", "Indonesian (native) · American English (fluent) · British English (fluent) · German (proficient)"],
              ["DOMAINS", "Market strategy · Monopoly design · Investment logic · Product vision · Solo execution · CFO-mode finance"],
            ].map(([label, text]) => (
              <div key={label as string} className="founder-row">
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "#bbb", letterSpacing: "0.12em", paddingTop: "3px", lineHeight: 1.8 }}>{label}</div>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.75 }}>{text as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <div id="ok-modal-bg" style={{ display: "none", position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", maxWidth: "480px", width: "90%", padding: "48px 40px", position: "relative" }}>
          <button id="ok-modal-close" style={{ position: "absolute", top: "16px", right: "20px", background: "none", border: "none", fontSize: "20px", color: "#bbb", cursor: "pointer" }}>×</button>
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#bbb", letterSpacing: "0.15em", marginBottom: "24px" }}>SECURE CHECKOUT</div>
          <h2 id="ok-modal-title" style={{ fontSize: "22px", fontWeight: 700, color: "#0a0a0a", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "16px" }}></h2>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.75, marginBottom: "24px" }}>
            You will be redirected to <strong style={{ color: "#0a0a0a" }}>Payhip</strong> — secure checkout, instant license key delivery to your email.
          </p>
          <div style={{ background: "#f7f7f7", padding: "20px 24px", marginBottom: "32px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#0a0a0a", letterSpacing: "0.05em", marginBottom: "12px" }}>WHAT HAPPENS NEXT</div>
            {[
              "Complete checkout on Payhip",
              "License key sent instantly to your email",
              'Add key to OpenCode config: "OPENKRAK_KEY": "your-key"',
              "Unlimited queries, active immediately",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", fontSize: "13px", color: "#555", padding: "6px 0", borderTop: i > 0 ? "1px solid #eee" : "none" }}>
                <span style={{ color: "#bbb", flexShrink: 0 }}>{i + 1}.</span>{s}
              </div>
            ))}
          </div>
          <button id="ok-modal-confirm" style={{ background: "#0a0a0a", color: "#fff", border: "none", padding: "15px", fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "100%", marginBottom: "10px", fontFamily: "inherit" }}>
            Continue to Checkout
          </button>
          <button id="ok-modal-cancel" style={{ background: "transparent", color: "#bbb", border: "none", padding: "10px", fontSize: "13px", cursor: "pointer", width: "100%", fontFamily: "inherit" }}>Cancel</button>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        var _okUrl = "";
        var _bg = document.getElementById("ok-modal-bg");
        var _title = document.getElementById("ok-modal-title");
        var _confirm = document.getElementById("ok-modal-confirm");
        var _cancel = document.getElementById("ok-modal-cancel");
        var _close = document.getElementById("ok-modal-close");
        window.__okModal = function(plan) {
          _okUrl = plan === "annual" ? "https://payhip.com/b/0BuUl" : "https://payhip.com/b/yNFQB";
          _title.textContent = plan === "annual" ? "OpenKrak Pro Annual — $67" : "OpenKrak Pro Monthly — $8";
          _bg.style.display = "flex";
        };
        function closeModal() { _bg.style.display = "none"; }
        _confirm.onclick = function() { window.open(_okUrl, "_blank"); closeModal(); };
        _cancel.onclick = closeModal;
        _close.onclick = closeModal;
        _bg.onclick = function(e) { if(e.target === _bg) closeModal(); };
      `}} />

      {/* Footer */}
      <footer style={{ padding: "32px 72px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0a0a0a" }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#444" }}>OPENKRAK</span>
        <span style={{ fontSize: "13px", color: "#444" }}>MIT License · © 2026 Faiz Hamizan</span>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="https://github.com/FrnzJulianBergmann/openkrak" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#444" }}>GitHub</a>
          <a href="https://www.npmjs.com/package/openkrak-mcp" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#444" }}>npm</a>
        </div>
      </footer>

    </main>
  );
}
