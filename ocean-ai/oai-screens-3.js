/* ════════════════════════════════════════════════════════════════
   OCEAN AI INSIGHTS, SCREENS (part 3)
   Risk & Review · Question Intelligence · Quality/Test Lab
   Evidence Explorer · Data Pipeline
   ════════════════════════════════════════════════════════════════ */
(function () {
  const D = window.OAI, U = window.OAIUI;
  const S = (window.OAISCREENS = window.OAISCREENS || {});
  const fmt = U.fmt;

  // open a lead in the evidence drawer (shared)
  window.OAI_openLead = function (id) {
    const ev = D.evidence.find((e) => e.id === id) || D.evidence[0];
    const facts = [["Intent", ev.intent], ["Cargo", ev.cargo], ["Quantity", ev.qty], ["Origin", ev.origin], ["Destination", ev.dest], ["Method", ev.method], ["Risk", ev.risk], ["Buying signal", ev.signal], ["Fields", ev.fields + "/4"], ["Recommended", ev.rec]];
    U.openDrawer(`<div class="dr-eyebrow">Evidence · ${ev.channel} · ${ev.lang.toUpperCase()}</div>
      <h2 class="dr-title">${ev.id}</h2>
      <div style="display:flex;gap:8px;margin:12px 0 18px"><span class="pill teal">${ev.stage}</span><span class="pill ${ev.signal === "Strong" ? "green" : "gold"}">${ev.signal} signal</span>${ev.hot ? '<span class="pill red">HOT · ignored</span>' : ""}</div>
      ${ev.note ? `<div class="callout ${ev.hot ? "red" : ""}" style="margin-bottom:18px">${ev.note}</div>` : ""}
      <div class="dr-section"><div class="dr-h">AI fact sheet</div>
        <div class="factsheet">${facts.map(([k, v]) => `<div class="fr"><span>${k}</span><b>${U.esc(v)}</b></div>`).join("")}</div></div>
      <div class="dr-section"><div class="dr-h">Conversation (redacted)</div>
        <div class="chat">${ev.msgs.map((m) => `<div class="msg ${m.who}"><div class="who"><span>${m.who === "ai" ? "Haider AI" : m.who === "sales" ? "Sales" : "Client"}</span>${m.sec ? `<span>+${m.sec}s</span>` : ""}</div>${U.esc(m.t)}</div>`).join("")}</div></div>
      <div class="dr-section"><div class="dr-h">Evidence message IDs</div><div class="dr-ev">${ev.evIds.map((e) => `<code>${e}</code>`).join("")}</div></div>
      <div class="dr-foot">PII hidden by default · odoo_lead_conversations_2026-06-11.redacted.jsonl</div>`);
  };

  // ─────────────────────────────────────────  RISK & REVIEW
  S.risk = {
    nav: "Risk & Review Center", icon: "shield", group: "INTELLIGENCE",
    title: "Risk & Review Center", eyebrow: "AI triages risk, humans keep judgment",
    sub: "The AI does not blindly reject. It routes the hard cases to people, and protects against its own false positives.",
    render() {
      return `
      <div class="grid g3">
        ${U.stat({ num: 6817, label: "No-risk leads", sub: "95.0% clear to flow", accent: "var(--green)" })}
        ${U.stat({ num: 340, label: "Restricted (legal) cargo", sub: "4.7% · automate after validation", accent: "var(--gold)" })}
        ${U.stat({ num: 16, label: "Prohibited (AI-flagged)", sub: "0.2% · noisy → human review", accent: "var(--red)" })}
      </div>

      <div class="grid g2 mt-lg" style="grid-template-columns:1fr 1fr">
        <div class="panel">
          <div class="panel-h"><div class="t">Review queues</div><div class="tag">triage, not rejection</div></div>
          <div class="grid" style="gap:10px">
            ${D.reviewBuckets.map((b) => `<div class="rule ${b.tone === "red" ? "high-risk" : b.tone === "gold" ? "medium" : "low"}" style="cursor:default">
              <div class="rule-rank"></div>
              <div class="rule-body"><div class="rname">${b.name}</div><div class="rtrig">${b.mode}</div></div>
              <div class="rule-right"><div class="rule-count"><b>${fmt(b.n)}</b><span>leads</span></div></div></div>`).join("")}
          </div>
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">False-positive guardrails</div><div class="tag">where blind rejection fails</div></div>
          <div class="note" style="margin-bottom:14px">Conceptual traps the design must protect against, these route to a human instead of an automatic block.</div>
          <div class="grid" style="gap:12px">
            ${D.falsePositives.map((f) => `<div class="callout gold"><b>${f.trap}</b>, ${f.why}</div>`).join("")}
          </div>
          <div class="callout red" style="margin-top:16px">The prohibited classifier is noisy at 16 leads. It never auto-acts, every case is confirmed by a person.</div>
        </div>
      </div>

      <div class="panel mt-lg">
        <div class="panel-h"><div class="t">Risk distribution</div><div class="tag">7,173 leads</div></div>
        ${U.hbars(D.risk.map((r) => ({ label: r.name, pct: r.pct, valueText: fmt(r.n), color: r.color })), { max: 95 })}
        <div class="callout" style="margin-top:16px">Design principle: <b>AI triages risk and routes judgment to humans</b>, it protects operations without over-blocking.</div>
      </div>`;
    },
  };

  // ─────────────────────────────────────────  QUESTION INTELLIGENCE
  S.questions = {
    nav: "Question Intelligence", icon: "help", group: "INTELLIGENCE",
    title: "Customer Question Intelligence", eyebrow: "What customers repeatedly ask",
    sub: "A ready-made FAQ priority list. Each topic shows volume, common wording, and which flow should answer it automatically.",
    render() {
      return `
      <div class="grid g2" style="grid-template-columns:1fr 1.4fr;align-items:start">
        <div class="panel">
          <div class="panel-h"><div class="t">Topic volume</div><div class="tag">share of leads</div></div>
          ${U.hbars(D.askedAbout.map((q) => ({ label: q.name, pct: q.pct, valueText: q.pct + "%", color: "var(--teal)" })), { max: 37.1 })}
        </div>
        <div class="grid" style="gap:12px">
          ${D.askedAbout.map((q) => `<div class="panel glow" style="padding:18px 20px">
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px">
              <div style="font-size:16px;font-weight:700">${q.name}</div>
              <div class="bignum" style="font-size:22px;color:var(--gold)">${fmt(q.n)} <span style="font-size:13px;color:var(--muted)">· ${q.pct}%</span></div>
            </div>
            <div class="note" style="margin-top:8px"><span class="divtag">Common wording</span><br>${U.esc(q.wording)}</div>
            <div class="callout" style="margin-top:10px;font-size:13px"><span class="divtag" style="color:var(--teal)">Suggested fix</span><br>${q.fix}</div>
          </div>`).join("")}
        </div>
      </div>`;
    },
  };

  // ─────────────────────────────────────────  QUALITY & TEST LAB
  S.quality = {
    nav: "Quality & Test Lab", icon: "check", group: "GOVERNANCE",
    title: "Quality & Test Lab", eyebrow: "Governance & reliability, not just insight",
    sub: "Can we trust this analysis? Deep test coverage, a trust score, and the fixes the audit discovered.",
    render() {
      const pass = D.tests.filter((t) => t.status === "pass").length;
      const warn = D.tests.filter((t) => t.status === "warn").length;
      const fail = D.tests.filter((t) => t.status === "fail").length;
      const watch = D.tests.filter((t) => t.status !== "pass" || t.sev === "high");
      return `
      <div class="grid g4">
        ${U.stat({ num: D.trust.dislikePct, dec: 2, suffix: "%", label: "AI dislike rate", sub: "11 of 24,957 messages", accent: "var(--green)" })}
        ${U.stat({ num: pass, suffix: "/" + D.tests.length, label: "Deep tests passing", sub: `${warn} warn · ${fail} fail`, accent: "var(--teal)" })}
        ${U.stat({ num: 2, label: "Fixes from audit", sub: "shipped to active flows", accent: "var(--gold)" })}
        ${U.stat({ num: 0, label: "PII exposed in UI", sub: "redacted by default", accent: "var(--green)" })}
      </div>

      <div class="grid g2 mt-lg" style="grid-template-columns:1fr 1.3fr;align-items:start">
        <div class="panel" style="background:linear-gradient(120deg,rgba(46,158,91,0.1),transparent)">
          <div class="panel-h"><div class="t">Trust score</div><div class="tag">composite</div></div>
          <div style="display:flex;align-items:center;gap:24px">
            ${U.donut([{ pct: 91, color: "var(--green)" }, { pct: 9, color: "rgba(255,255,255,0.1)" }], { size: 160, stroke: 22, center: `<b style="font-size:34px">91</b><span>/ 100</span>` })}
            <div class="legend" style="flex:1">
              <div class="li"><span class="sw" style="background:var(--green)"></span><span>Dislike rate 0.04%</span></div>
              <div class="li"><span class="sw" style="background:var(--green)"></span><span>${pass}/${D.tests.length} tests pass</span></div>
              <div class="li"><span class="sw" style="background:var(--gold)"></span><span>${warn} warnings tracked</span></div>
              <div class="li"><span class="sw" style="background:var(--red)"></span><span>${fail} regression open</span></div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">Fixes discovered by audit</div><div class="tag">known issues → fixed</div></div>
          <div class="grid" style="gap:12px">
            ${D.fixes.map((f) => `<div class="callout"><span class="divtag" style="color:var(--green)">Fixed</span> · ${f.head}<div class="note" style="margin-top:6px">${f.body}</div></div>`).join("")}
          </div>
        </div>
      </div>

      <div class="panel mt-lg">
        <div class="panel-h"><div class="t">Deep test matrix</div><div class="tag">deep_test_results.json · click a scenario to see more</div></div>
        <div class="tmatrix">
          ${D.tests.map((t) => `<div class="tcell ${t.status}" data-test="${t.id}">
            <div class="tcell-id">${t.id} <span class="tstatus ${t.status}"></span></div>
            <div class="tcell-title">${t.title}</div></div>`).join("")}
        </div>
      </div>

      <div class="panel mt-lg" style="border-color:rgba(229,72,77,0.35)">
        <div class="panel-h"><div class="t" style="color:var(--red)">Regression watchlist</div><div class="tag">failed or high-risk</div></div>
        <div class="grid" style="gap:8px">
          ${watch.map((t) => `<div class="rule ${t.status === "fail" ? "high-risk" : "medium"}" data-test="${t.id}">
            <div class="rule-rank"><span class="tstatus ${t.status}"></span></div>
            <div class="rule-body"><div class="rname">${t.id}</div><div class="rtrig">${t.title}</div></div>
            <div class="rule-right"><span class="pill ${t.status === "fail" ? "red" : "gold"}">${t.status}</span><span class="pill gray">sev ${t.sev}</span><span class="more-tag">Details ›</span></div></div>`).join("")}
        </div>
      </div>`;
    },
    init(root) {
      root.querySelectorAll("[data-test]").forEach((el) => el.addEventListener("click", () => {
        const t = D.tests.find((x) => x.id === el.dataset.test);
        const exp = { "DT-24": "Detect repeated price-only turns and break the loop with a handoff.", "DT-21": "Treat thyme/herbs as food, never as narcotics.", "DT-11": "Classify a single refrigerator as a large physical item, not a small parcel." }[t.id] || "Behave per the scenario specification.";
        const obs = { fail: "Loop not broken, bot repeated the price answer instead of handing off.", warn: "Mostly correct but edge wording can mislead the classifier.", pass: "Observed behavior matched the expected behavior." }[t.status];
        U.openDrawer(`<div class="dr-eyebrow">Deep test · severity ${t.sev}</div><h2 class="dr-title">${t.id}</h2>
          <div style="margin:14px 0"><span class="pill ${t.status === "pass" ? "green" : t.status === "warn" ? "gold" : "red"}">${t.status.toUpperCase()}</span></div>
          <p class="dr-def">${t.title}</p>
          <div class="dr-section"><div class="dr-h">Expected behavior</div><p class="dr-def">${exp}</p></div>
          <div class="dr-section"><div class="dr-h">Observed behavior</div><p class="dr-def">${obs}</p></div>
          <div class="dr-foot">Source: exports/deep_test_results.json</div>`);
      }));
    },
  };

  // ─────────────────────────────────────────  EVIDENCE EXPLORER
  S.evidence = {
    nav: "Evidence Explorer", icon: "search", group: "GOVERNANCE",
    title: "Evidence Explorer", eyebrow: "Every number is explainable",
    sub: "Search by lead, intent, cargo, route, stage, rule, risk, channel or date. PII is hidden by default.",
    render() {
      const fg = (h, items) => `<div class="fgroup"><div class="fg-h">${h}</div>${items.map((i) => `<label><input type="checkbox" ${i.on ? "checked" : ""}>${i}</label>`).join("")}</div>`;
      return `
      <div class="ev-layout">
        <div class="ev-filters">
          <div class="fgroup"><div class="fg-h">Search</div>
            <input id="evsearch" placeholder="Lead ID, cargo…" style="width:100%;background:var(--navy-2);border:1px solid var(--line);border-radius:8px;padding:8px 10px;color:var(--ink);font-family:var(--mono);font-size:12px"></div>
          ${fg("Intent", ["wants_to_ship", "info_only", "price_only", "spam"])}
          ${fg("Stage", ["New", "Qualified", "Shein", "Review"])}
          ${fg("Channel", ["WhatsApp", "Instagram", "Messenger"])}
          ${fg("Risk", ["None", "Restricted", "Prohibited"])}
        </div>
        <div>
          <div class="panel-h" style="margin-bottom:14px"><div class="src">${D.evidence.length} of 7,173 lead conversations · redacted</div><span class="pill teal">PII hidden</span></div>
          <div class="ev-list" id="evlist">
            ${D.evidence.map((e) => `<div class="lead" data-lead="${e.id}">
              <div class="lead-top"><span class="lead-id">${e.id} · ${e.channel} · ${e.lang.toUpperCase()}</span>
                <span class="pill ${e.signal === "Strong" ? "green" : "gold"}">${e.signal}</span></div>
              <div class="lead-cargo">${e.cargo} · ${e.qty}</div>
              <div class="lead-meta"><span>${e.origin}→${e.dest}</span><span>${e.method}</span><span>${e.fields}/4 fields</span><span>→ ${e.rec}</span></div>
              ${e.hot ? '<div class="note" style="color:var(--red)">⚠ '+e.note+'</div>' : ""}
            </div>`).join("")}
          </div>
          <div class="note" style="margin-top:16px;text-align:center">Click any lead → fact sheet, conversation timeline, and evidence message IDs.</div>
        </div>
      </div>`;
    },
    init(root) {
      root.querySelectorAll("[data-lead]").forEach((el) => el.addEventListener("click", () => window.OAI_openLead(el.dataset.lead)));
      const search = root.querySelector("#evsearch");
      if (search) search.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        root.querySelectorAll("#evlist .lead").forEach((l) => { l.style.display = l.textContent.toLowerCase().includes(q) ? "" : "none"; });
      });
    },
  };

  // ─────────────────────────────────────────  DATA PIPELINE
  const PI = {
    archive: '<path d="M3 8h18M5 8v11h14V8M3 8l2-4h14l2 4M10 12h4"/>', db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    layers: '<path d="M12 2 2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5"/>', export: '<path d="M12 3v12M8 7l4-4 4 4M5 15v4a2 2 0 002 2h10a2 2 0 002-2v-4"/>',
    wrench: '<path d="M14 7a4 4 0 01-5 5l-6 6 2 2 6-6a4 4 0 005-5l-2 2-2-2 2-2z"/>', shield: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"/>',
    brain: '<path d="M9 3a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 0V6a3 3 0 00-3-3zM15 3a3 3 0 013 3 3 3 0 012 5"/>', rules: '<path d="M4 6h16M4 12h16M4 18h10M18 16l2 2 3-3" />',
    deck: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>', ocean: '<path d="M3 12c2 0 2 2 4.5 2S9.5 12 12 12s2.5 2 4.5 2 2.5-2 4.5-2M3 17c2 0 2 2 4.5 2s2.5-2 4.5-2 2.5 2 4.5 2 2.5-2 4.5-2"/>',
  };
  S.pipeline = {
    nav: "Data Pipeline", icon: "flow", group: "GOVERNANCE",
    title: "Data Pipeline & Trust Layer", eyebrow: "How the analysis was created",
    sub: "From recovered backup to live insight, every step counted, dated, and reproducible.",
    render() {
      return `
      <div class="grid g4">
        ${U.stat({ num: 7239, label: "Records recovered", sub: "from Odoo backup", accent: "var(--teal)" })}
        ${U.stat({ num: 7173, label: "Conversations exported", sub: "66 skipped (no messages)", accent: "var(--ink)" })}
        ${U.stat({ num: 88658, label: "Messages labeled", sub: "Arabic mojibake repaired", accent: "var(--gold)" })}
        ${U.stat({ num: 21, label: "Rules generated", sub: "+ deck + this module", accent: "var(--green)" })}
      </div>

      <div class="grid g2 mt-lg" style="grid-template-columns:1.3fr 1fr;align-items:start">
        <div class="panel">
          <div class="panel-h"><div class="t">Pipeline</div><div class="tag">backup → insight</div></div>
          <div class="pipe">
            ${D.pipeline.map((p) => `<div class="pstep">
              <div class="pic"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${PI[p.icon] || ""}</svg></div>
              <div class="pbody"><div class="pname">${p.step}</div><div class="psrc">${U.esc(p.src)}</div></div>
              <div class="pn">${p.n}</div></div>`).join("")}
          </div>
        </div>
        <div>
          <div class="panel">
            <div class="panel-h"><div class="t">Data freshness</div><div class="tag"></div></div>
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px"><span class="dot-live"></span><b style="font-family:var(--mono);font-size:15px">Fresh · ${D.snapshot.sourceDate}</b></div>
            <div class="note">Generated ${D.snapshot.generatedAt}. Phase 1 loads a static snapshot; a later cron/import sync refreshes metrics.</div>
            <div class="callout" style="margin-top:14px">Redaction: <b>unredacted retained, redacted variant served to UI.</b> Unredacted access requires manager/admin and is logged.</div>
          </div>
          <div class="panel mt">
            <div class="panel-h"><div class="t">Source artifacts</div><div class="tag">cited in UI</div></div>
            <div style="display:flex;flex-direction:column;gap:8px;font-family:var(--mono);font-size:11.5px;color:var(--muted)">
              ${["odoo_lead_conversations_2026-06-11.summary.json", "odoo_lead_rule_summary.json", "deep_test_results.json", "odoo_lead_ai_labels.jsonl", "ceo-insights-from-7173-conversations.md", "odoo-stage-shifting-rules-DISCOVERED.md"].map((f) => `<div class="src">${f}</div>`).join("")}
            </div>
          </div>
          <button class="tb-btn" style="width:100%;justify-content:center;margin-top:14px;padding:12px" onclick="OAIUI.openDrawer('<div class=\\'dr-eyebrow\\'>Concept</div><h2 class=\\'dr-title\\'>Re-run import</h2><p class=\\'dr-def\\'>In production this triggers the export → label → summarize pipeline against a fresh Odoo backup, then publishes a new snapshot. Managers and admins only.</p>')">↻ Re-run import (concept)</button>
        </div>
      </div>

      <div class="callout gold mt-lg" style="font-size:15px">Data note, 7,173 exported lead conversations; 7,175 raw conversation leads in source statistics; 7,239 CRM leads seen in backup (66 skipped).</div>`;
    },
  };

})();
