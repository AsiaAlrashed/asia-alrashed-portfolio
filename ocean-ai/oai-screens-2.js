/* ════════════════════════════════════════════════════════════════
   OCEAN AI INSIGHTS, SCREENS (part 2)
   Cargo & Route Demand · SHEIN · Stage & Rule Mining Lab
   ════════════════════════════════════════════════════════════════ */
(function () {
  const D = window.OAI, U = window.OAIUI;
  const S = (window.OAISCREENS = window.OAISCREENS || {});
  const fmt = U.fmt;

  // ─────────────────────────────────────────  CARGO & ROUTE DEMAND
  S.cargo = {
    nav: "Cargo & Route Demand", icon: "ship", group: "REVENUE",
    title: "Cargo & Route Demand", eyebrow: "What Iraq buys & where demand flows",
    sub: "The AI read of every chat. China + UAE supply two-thirds of demand; Baghdad receives most of it.",
    render() {
      const W = 1000, H = 560;
      const px = (x) => (x / 100) * W, py = (y) => (y / 100) * H;
      const baghdad = D.destinations[0];
      // route lines from each origin to Baghdad (primary hub)
      const lines = D.origins.map((o, i) => {
        const x1 = px(o.x), y1 = py(o.y), x2 = px(baghdad.x), y2 = py(baghdad.y);
        const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 60 - i * 8;
        const hot = o.leads > 1000;
        return `<path class="route-line ${hot ? "hot" : ""}" data-draw d="M${x1},${y1} Q${mx},${my} ${x2},${y2}"></path>`;
      }).join("");
      const originNodes = D.origins.map((o) => {
        const r = 4 + Math.min(14, Math.sqrt(o.leads) / 4);
        return `<g class="rnode" data-route="${o.name}">
          <circle class="node-dot" cx="${px(o.x)}" cy="${py(o.y)}" r="${r}"></circle>
          <circle cx="${px(o.x)}" cy="${py(o.y)}" r="${r + 6}" fill="none" stroke="rgba(22,194,194,0.3)"></circle>
          <text class="node-label ${o.leads < 200 ? "dim" : ""}" x="${px(o.x) + r + 8}" y="${py(o.y) + 4}">${o.name} · ${fmt(o.leads)}</text></g>`;
      }).join("");
      const destNodes = D.destinations.map((d) => {
        const r = 3 + Math.min(12, Math.sqrt(d.leads) / 4);
        return `<g><circle class="node-dot dest" cx="${px(d.x)}" cy="${py(d.y)}" r="${r}"></circle>
          <text class="node-label ${d.leads < 100 ? "dim" : ""}" x="${px(d.x) - r - 8}" y="${py(d.y) + 4}" text-anchor="end">${d.name} · ${fmt(d.leads)}</text></g>`;
      }).join("");
      return `
      <div class="grid g4">
        ${U.stat({ num: 1294, label: "China origin leads", sub: "≈34% of stated origin", accent: "var(--teal)" })}
        ${U.stat({ num: 1220, label: "UAE origin leads", sub: "≈32% of stated origin", accent: "var(--teal)" })}
        ${U.stat({ num: 1319, label: "Baghdad destination", sub: "#1 named city", accent: "var(--gold)" })}
        ${U.stat({ num: D.unsupportedRoute.ruleTotal, label: "Unsupported-route demand", sub: "7.6% · ~300 firmly out-of-network", accent: "var(--red)" })}
      </div>

      <div class="panel mt-lg">
        <div class="panel-h"><div class="t">Origin → destination lanes</div><div class="tag">click a glowing lane to see more</div></div>
        <div class="routemap">
          <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
            <defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="rgba(255,255,255,0.04)"/></pattern></defs>
            <rect width="${W}" height="${H}" fill="url(#grid)"></rect>
            ${lines}${destNodes}${originNodes}
          </svg>
        </div>
        <div class="grid g3 mt">
          <div class="callout">China + UAE supply about <b class="kfig">two-thirds</b> of all demand.</div>
          <div class="callout gold">Baghdad alone draws <b class="kfig">1,319</b> destination leads.</div>
          <div class="callout red">~300 leads asked for routes we don't serve, measurable demand if we want it.</div>
        </div>
      </div>

      <div class="grid g3 mt-lg">
        <div class="panel">
          <div class="panel-h"><div class="t">Cargo categories</div><div class="tag">stated cargo</div></div>
          ${U.hbars(D.cargo.map((c) => ({ label: c.name, value: c.leads, pct: c.leads, valueText: fmt(c.leads), color: c.shein ? "var(--gold)" : "var(--teal)" })), { max: 543 })}
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">Shipping method</div><div class="tag">7,173 leads</div></div>
          ${U.hbars(D.shippingMethod.map((m) => ({ label: m.name, pct: m.pct, valueText: m.pct + "%", color: m.color, dim: m.name === "Unknown" })), { max: 60.1 })}
          <div class="note" style="margin-top:12px">60% leave method unstated, a prompt-design opportunity.</div>
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">Shipment scale</div><div class="tag">7,173 leads</div></div>
          ${U.hbars(D.scale.map((m) => ({ label: m.name, pct: m.pct, valueText: m.pct + "%", color: m.name === "Container" ? "var(--gold)" : "var(--teal)", dim: m.name === "Unknown" })), { max: 56.1 })}
        </div>
      </div>`;
    },
    init(root) {
      root.querySelectorAll(".rnode").forEach((g) => g.addEventListener("click", () => {
        const name = g.dataset.route; const o = D.origins.find((x) => x.name === name);
        U.openDrawer(`<div class="dr-eyebrow">Route origin</div><h2 class="dr-title">${name} → Iraq</h2>
          <div class="dr-value">${fmt(o.leads)}</div><p class="dr-def">Lead conversations stating ${name} as origin${o.pct ? `, about ${o.pct}% of all stated origins` : ""}. Top destination is Baghdad; dominant method is sea.</p>
          <div class="dr-meta"><div><span>Top cargo</span><code>Clothes & electronics</code></div><div><span>Top method</span><code>Sea</code></div><div><span>Source</span><code>odoo_lead_rule_summary.json</code></div></div>`);
      }));
    },
  };

  // ─────────────────────────────────────────  SHEIN
  S.shein = {
    nav: "SHEIN Segment", icon: "spark", group: "REVENUE",
    title: "SHEIN Segment Command Center", eyebrow: "A proven high-conversion lane",
    sub: "SHEIN is not a side case. It converts 4.6× the company average and deserves a dedicated high-speed flow.",
    accent: "gold",
    render() {
      const sh = D.shein;
      const maxF = sh.funnel[0].n;
      return `
      <div class="grid g4">
        ${U.stat({ num: sh.requests, label: "SHEIN requests", sub: "7.6% of everything", accent: "var(--gold)" })}
        ${U.stat({ num: sh.conversion, dec: 2, suffix: "%", label: "SHEIN conversion", sub: "from the deck analysis", accent: "var(--green)" })}
        ${U.stat({ num: sh.multiple, dec: 1, suffix: "×", label: "vs company average", sub: "company avg 1.2%", accent: "var(--gold)" })}
        ${U.stat({ num: 30, label: "Won (illustrative)", sub: "from SHEIN funnel", accent: "var(--ink)" })}
      </div>

      <div class="grid g2 mt-lg" style="grid-template-columns:1.2fr 1fr">
        <div class="panel" style="background:linear-gradient(120deg,rgba(229,181,103,0.1),transparent)">
          <div class="panel-h"><div class="t">SHEIN funnel</div><div class="tag">inquiry → won</div></div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:6px">
            ${sh.funnel.map((f, i) => {
        const w = (f.n / maxF) * 100;
        return `<div style="display:flex;align-items:center;gap:14px">
                <div style="width:160px;font-size:13px;color:var(--muted)">${f.stage}</div>
                <div style="flex:1;height:38px;background:var(--track);border-radius:8px;overflow:hidden">
                  <div data-grow="${w.toFixed(0)}" style="height:100%;width:0;border-radius:8px;background:linear-gradient(90deg,var(--gold),#c9923f);transition:width 1.1s cubic-bezier(.2,.7,.3,1);display:flex;align-items:center;padding-left:14px">
                    <b style="font-family:var(--mono);color:var(--navy);font-weight:700">${fmt(f.n)}</b></div></div></div>`;
      }).join("")}
          </div>
          <div class="callout gold" style="margin-top:18px">A dedicated SHEIN lane should get faster handoff at the address/PDF step, where the funnel narrows most.</div>
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">The fixed offer</div><div class="tag">AI answers instantly</div></div>
          <div class="grid g2" style="gap:14px;margin-top:4px">
            <div><div class="divtag">Price</div><div class="bignum" style="font-size:30px;color:var(--gold)">${sh.pricePerKg}</div><div class="note">UAE → Baghdad warehouse</div></div>
            <div><div class="divtag">Delivery</div><div class="bignum" style="font-size:30px;color:var(--gold)">${sh.deliveryFee}</div><div class="note">per parcel</div></div>
            <div><div class="divtag">Timing</div><div class="bignum" style="font-size:30px;color:var(--gold)">${sh.timing}</div><div class="note">typical window</div></div>
            <div><div class="divtag">Route</div><div class="bignum" style="font-size:21px;color:var(--ink);margin-top:8px">${sh.route}</div></div>
          </div>
          <div class="note" style="margin-top:18px;border-top:1px solid var(--line);padding-top:14px">Flow: <b>SHEIN inquiry → address/PDF → customer details → handoff → won.</b> Verified by deep tests DT-18 & DT-19.</div>
        </div>
      </div>

      <div class="panel mt-lg" style="display:flex;align-items:center;gap:30px">
        <div style="flex:1">
          <div class="eyebrow" style="color:var(--gold)">Recommendation</div>
          <div style="font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.2">SHEIN is a product line of its own.</div>
        </div>
        <div class="note" style="flex:1.4">543 requests at 5.52% conversion is the clearest specialization signal in the data. A dedicated lane, instant pricing, fast address capture, priority handoff, should lift this segment further while freeing general agents.</div>
      </div>`;
    },
  };

  // ─────────────────────────────────────────  STAGE & RULE MINING LAB
  S.rules = {
    nav: "Stage Rule Lab", icon: "rules", group: "INTELLIGENCE",
    title: "Stage & Rule Mining Lab", eyebrow: "Messy chat → explainable CRM automation",
    sub: "A control room of staging rules. Every rule is explainable, gated, and scoped to Automate, Suggest, or Keep. Click any rule for evidence.",
    render() {
      const order = ["manual_override", "prohibited_item", "restricted_item", "unsupported_route", "full_vehicle", "shein", "qualified_4_fields", "qualified_3plus_fields", "strong_buying", "container_plus_number", "sales_handshake", "goods_ready", "supplier_link_shared", "reseller_or_business", "mixed_or_vague_goods", "small_personal_non_shein", "price_only", "info_only", "explicit_rejection", "silent_after_question", "spam_or_wrong_number", "job_seeker"];
      const rules = order.map((id) => D.rules.find((r) => r.id === id)).filter(Boolean);
      const counts = { Automate: D.rules.filter((r) => r.mode === "Automate").length, Suggest: D.rules.filter((r) => r.mode === "Suggest").length, Review: D.rules.filter((r) => r.mode === "Review").length, Keep: D.rules.filter((r) => r.mode === "Keep").length };
      return `
      <div class="grid g4">
        ${U.stat({ num: D.rules.length, label: "Candidate rules", sub: "mined from 7,173 leads", accent: "var(--teal)" })}
        ${U.stat({ num: counts.Automate, label: "Safe to automate", sub: "after precision gate", accent: "var(--green)" })}
        ${U.stat({ num: counts.Suggest + counts.Review, label: "Suggest / review only", sub: "human stays in the loop", accent: "var(--gold)" })}
        ${U.stat({ num: 2375, label: "Safe auto-Lost", sub: "silent >6h, ≤2 fields", accent: "var(--red)" })}
      </div>

      <div class="grid g2 mt-lg" style="grid-template-columns:1.6fr 1fr">
        <div class="panel">
          <div class="panel-h"><div class="t">Rule ladder</div><div class="tag">priority order · click any rule to see more</div></div>
          <div class="ladder">
            ${rules.map((r, i) => `<div class="rule ${r.safety}" data-rule="${r.id}">
              <div class="rule-rank">${String(i + 1).padStart(2, "0")}</div>
              <div class="rule-body"><div class="rname">${r.name}</div><div class="rtrig">${r.trigger} → ${r.stage}</div></div>
              <div class="rule-right">
                <div class="rule-count">${r.n != null ? `<b>${fmt(r.n)}</b><span>${r.pct != null ? r.pct + "%" : "leads"}</span>` : `<b>n/a</b><span>protected</span>`}</div>
                <div class="mode-tag mode-${r.mode}">${r.mode}</div>
                <span class="more-tag">Details ›</span>
              </div></div>`).join("")}
          </div>
        </div>
        <div>
          <div class="panel">
            <div class="panel-h"><div class="t">Field completion</div><div class="tag">qualification facts</div></div>
            ${U.hbars(D.fields.map((f) => ({ label: f.name, pct: f.pct, valueText: fmt(f.n), color: f.name === "4 fields" ? "var(--green)" : f.name === "0 fields" ? "var(--neutral)" : "var(--teal)" })), { max: 30.7 })}
            <div class="callout" style="margin-top:14px">3+ fields: <b class="kfig">3,404</b> (47.5%), nearly half are quote-ready or close.</div>
          </div>
          <div class="panel mt">
            <div class="panel-h"><div class="t">Intent</div><div class="tag">AI classification</div></div>
            ${U.hbars(D.intent.slice(0, 5).map((it) => ({ label: it.name, pct: it.pct, valueText: it.pct + "%", color: it.color })), { max: 46.9 })}
          </div>
          <div class="panel mt">
            <div class="panel-h"><div class="t">Route support</div><div class="tag"></div></div>
            ${U.hbars([{ label: "Supported", pct: 56.6, valueText: "4,062", color: "var(--green)" }, { label: "Unknown", pct: 35.8, valueText: "2,568", color: "var(--neutral)" }, { label: "Unsupported", pct: 7.6, valueText: "543", color: "var(--red)" }], { max: 56.6 })}
          </div>
        </div>
      </div>`;
    },
    init(root) {
      root.querySelectorAll("[data-rule]").forEach((el) => el.addEventListener("click", () => {
        const r = D.rules.find((x) => x.id === el.dataset.rule);
        U.openDrawer(`<div class="dr-eyebrow">Staging rule</div><h2 class="dr-title">${r.name}</h2>
          <div style="display:flex;gap:8px;margin:14px 0"><span class="mode-tag mode-${r.mode}">${r.mode}</span><span class="pill ${r.safety === "safe" ? "green" : r.safety.includes("risk") || r.safety === "validate-first" ? "red" : "gold"}">${r.safety}</span></div>
          ${r.n != null ? `<div class="dr-value">${fmt(r.n)}${r.pct != null ? ` <span style="font-size:18px;color:var(--muted)">· ${r.pct}%</span>` : ""}</div>` : ""}
          <p class="dr-def"><b>Trigger:</b> ${r.trigger}.<br><b>Target stage:</b> ${r.stage}.</p>
          <div class="dr-section"><div class="dr-h">Why ${r.mode.toLowerCase()}</div><p class="dr-def">${r.gate}</p></div>
          <div class="dr-section"><div class="dr-h">Acceptance gate</div><p class="dr-def">Dry-run on the labeled sample → measure precision → human review of disagreements → enable. ${r.noisy ? "<b style='color:var(--red)'>Classifier is noisy, never auto-acts.</b>" : ""}</p></div>
          <div class="dr-section"><div class="dr-h">Evidence samples</div><div class="dr-ev">${r.evidence.map((e) => `<code>${e}</code>`).join("")}</div></div>
          <div class="dr-foot">Source: odoo_lead_rule_summary.json · odoo-stage-shifting-rules-DISCOVERED.md</div>`);
      }));
    },
  };

})();
