// openkrak-web/app/components/Stats.tsx
"use client";
import { useEffect } from "react";

const STAT_CARDS = [
  ["~500", "tokens delivered to LLM instead of 50,000+ raw lines"],
  ["20-80%", "token reduction depending on task complexity"],
  ["6 steps", "automated analysis, zero config, zero prompting required"],
];

export function TokenCounter() {
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

export function Stats() {
  return (
    <>
      <section style={{ padding: "0 72px 80px", maxWidth: "1200px", width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
        {STAT_CARDS.map(([stat, desc], i) => (
          <div key={i} className="stat-card">
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(14px, 2vw, 24px)", color: "#0a0a0a", marginBottom: "16px", lineHeight: 1.5 }}>{stat}</div>
            <div style={{ fontSize: "14px", color: "#777", lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </section>

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
    </>
  );
}
