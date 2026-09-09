/* ════════════════════════════════════════════════════════════════
   OCEAN AI INSIGHTS, SCREENS (part 1)
   Executive · Conversation · Sales Radar · Cargo/Route · SHEIN
   ════════════════════════════════════════════════════════════════ */
(function () {
  const D = window.OAI, U = window.OAIUI;
  const S = (window.OAISCREENS = window.OAISCREENS || {});
  const fmt = U.fmt;

  // register explain-this-number metrics
  U.registerMetric("total_messages", { title: "Total messages analyzed", value: "88,658", def: "Every message recovered from the CRM backup across all channels, July 2025 – June 2026: 50,604 from customers, 24,957 from Haider AI, 13,097 from the sales team.", source: "odoo_lead_conversations_2026-06-11.summary.json", evidence: ["m-44021", "m-51120", "m-60012"] });
  U.registerMetric("leads", { title: "Lead conversations analyzed", value: "7,173", def: "Lead conversations exported with at least one message. 7,239 CRM leads were seen in the backup; 66 were skipped (no messages). Raw conversation statistics in the deck count 7,175.", source: "odoo_lead_conversations_2026-06-11.summary.json", evidence: ["L-1190", "L-2204"] });
  U.registerMetric("ai_speed", { title: "Haider AI median reply time", value: "41 seconds", def: "Median time for Haider AI to reply to a customer message. 90.8% of AI replies land within 60 seconds; 98.5% within 5 minutes; a new customer is greeted in 44 seconds.", source: "ceo-insights-from-7173-conversations.md", related: U.hbars([{ label: "Within 60s", pct: 90.8, valueText: "90.8%", color: "var(--teal)" }, { label: "Within 5 min", pct: 98.5, valueText: "98.5%", color: "var(--green)" }]) });
  U.registerMetric("human_speed", { title: "Human first-reply median", value: "8.2 hours", def: "Median time for a customer to receive their first human reply. The slowest 10% of customers wait more than 23 hours, nearly a full day.", source: "ceo-insights-from-7173-conversations.md" });
  U.registerMetric("lift", { title: "Human conversion lift", value: "4.3×", def: "Win rate is 2.47% when a human joins the chat versus 0.57% bot-only, a lead that gets a human reply is 4.3× more likely to convert.", source: "ceo-insights-from-7173-conversations.md" });
  U.registerMetric("after_hours", { title: "After-hours demand", value: "51.4%", def: "Share of customer messages that arrive outside 09:00–18:00 Baghdad time. 24.9% arrive on the Friday/Saturday weekend. 23:00–02:00 is almost as busy as mid-morning.", source: "ceo-insights-from-7173-conversations.md" });
  U.registerMetric("hot_ignored", { title: "Hot leads ignored", value: "806", def: "Hot, ready-to-buy leads that were left unanswered in historical data. 44% of the hottest leads were ignored, the single largest pool of recoverable revenue.", source: "odoo_lead_rule_summary.json", evidence: ["L-806H"] });
  U.registerMetric("dislike", { title: "AI dislike rate", value: "0.04%", def: "Only 11 of 24,957 Haider AI messages were ever flagged 'disliked' by a customer, a 0.04% dislike rate across the entire bot history.", source: "ceo-insights-from-7173-conversations.md" });
  U.registerMetric("coverage", { title: "Customers who never met a human", value: "69%", def: "Of 7,175 leads, only 2,230 (31%) ever received a single message from a sales agent. 4,945 were handled entirely by Haider AI, or not at all.", source: "ceo-insights-from-7173-conversations.md" });

  // ─────────────────────────────────────────  EXECUTIVE
  S.executive = {
    nav: "Executive Overview", icon: "grid", group: "OVERVIEW",
    title: "Executive Overview", eyebrow: "Ocean AI · Command Center",
    render() {
      const h = D.headline, sp = D.speed, cov = D.coverage, ah = D.afterHours, op = D.opportunity, tr = D.trust;
      return `
      <div class="hero">
        <div class="eyebrow">The AI read the whole front door</div>
        <div class="hero-title">From <em>88,658 messages</em><br>to decisions.</div>
        <div class="hero-sub">The market is talking. This module shows exactly what it is saying, every number traced back to evidence.</div>
        <div class="hero-meta">
          <div class="hm"><b data-count="50604">0</b><span>Customer messages</span></div>
          <div class="hm"><b data-count="24957">0</b><span>Haider AI replies</span></div>
          <div class="hm"><b data-count="13097">0</b><span>Sales / human replies</span></div>
          <div class="hm"><b data-count="7173">0</b><span>Lead conversations</span></div>
        </div>
      </div>

      <div class="grid g4">
        ${U.stat({ num: h.totalMessages, label: "Total messages analyzed", sub: "Recovered, cleaned & labeled", accent: "var(--teal)", metric: "total_messages", big: false })}
        ${U.stat({ num: h.exportedLeads, label: "Lead conversations", sub: "7,239 seen · 66 skipped", accent: "var(--ink)", metric: "leads" })}
        ${U.stat({ num: sp.aiMedianSec, suffix: "s", label: "AI median reply time", sub: "Human median: 8.2 hours", accent: "var(--green)", metric: "ai_speed" })}
        ${U.stat({ num: cov.lift, dec: 1, suffix: "×", label: "Human conversion lift", sub: "2.47% vs 0.57% bot-only", accent: "var(--gold)", metric: "lift" })}
      </div>
      <div class="grid g4 mt">
        ${U.stat({ num: ah.afterHoursPct, dec: 1, suffix: "%", label: "Demand after hours", sub: "AI is the only night shift", accent: "var(--teal)", metric: "after_hours" })}
        ${U.stat({ num: cov.neverHumanPct, suffix: "%", label: "Never reached a human", sub: "4,945 of 7,175 leads", accent: "var(--red)", metric: "coverage" })}
        ${U.stat({ num: op.hotIgnored, label: "Hot leads ignored", sub: "44% of the hottest, unanswered", accent: "var(--red)", metric: "hot_ignored" })}
        ${U.stat({ num: tr.dislikePct, dec: 2, suffix: "%", label: "AI dislike rate", sub: "11 of 24,957 bot messages", accent: "var(--green)", metric: "dislike" })}
      </div>

      <div class="narrative mt-lg">
        <div class="n accent"><div class="nt">Demand is real.</div><div class="nd">China + UAE → Baghdad. Clothes & electronics lead. 7,173 conversations of stated intent.</div></div>
        <div class="n gold"><div class="nt">Customers live at night.</div><div class="nd">Half of all activity arrives outside working hours. The AI never clocks out.</div></div>
        <div class="n"><div class="nt">Human replies convert.</div><div class="nd">A human touch makes a sale 4.3× more likely, but only 31% of leads got one.</div></div>
        <div class="n warn"><div class="nt">We drop hot leads.</div><div class="nd">806 ready-to-buy customers were left unanswered. Not more leads, fewer dropped ones.</div></div>
      </div>

      <div class="grid g2 mt-lg">
        <div class="panel">
          <div class="panel-h"><div class="t">Human coverage</div><div class="tag">7,175 leads</div></div>
          <div style="display:flex;align-items:center;gap:30px;">
            ${U.donut([{ pct: 69, color: "rgba(229,72,77,0.85)" }, { pct: 31, color: "var(--teal)" }], { size: 180, stroke: 28, center: `<b>69%</b><span>no human</span>` })}
            <div class="legend" style="flex:1">
              <div class="li"><span class="sw" style="background:var(--teal)"></span><span>Got a human reply</span><b>2,230</b></div>
              <div class="li"><span class="sw" style="background:rgba(229,72,77,0.85)"></span><span>AI-only or no reply</span><b>4,945</b></div>
              <div class="callout" style="margin-top:6px">69% of customers never spoke to a human.</div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">The human multiplier</div><div class="tag">win rate</div></div>
          <div class="cmp" style="margin-top:8px">
            <div class="cmp-row"><div class="cmp-name">Bot-only</div>
              <div class="cmp-track"><div class="cmp-fill" data-grow="23" style="background:var(--neutral)"><b>0.57%</b></div></div></div>
            <div class="cmp-row"><div class="cmp-name">Human-assisted</div>
              <div class="cmp-track"><div class="cmp-fill" data-grow="100" style="background:var(--gold)"><b>2.47%</b></div></div></div>
          </div>
          <div class="callout gold" style="margin-top:20px">A human reply makes the sale <b class="kfig">4.3×</b> more likely. The staging rules point limited team time at the leads that deserve it.</div>
        </div>
      </div>

      <div class="panel mt-lg">
        <div class="panel-h"><div class="t">Source health</div><div class="tag">backup → SQL → JSONL → AI labels → insights</div></div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-family:var(--mono);font-size:12px;color:var(--muted)">
          <span class="pill green">● Backup ZIP</span><span>→</span>
          <span class="pill green">● dump.sql</span><span>→</span>
          <span class="pill green">● Postgres stg</span><span>→</span>
          <span class="pill green">● 7,173 JSONL</span><span>→</span>
          <span class="pill green">● AI labels</span><span>→</span>
          <span class="pill teal">● Insights</span>
          <span style="margin-left:auto" class="src">Last generated ${D.snapshot.generatedAt}</span>
        </div>
      </div>`;
    },
  };

  // ─────────────────────────────────────────  CONVERSATION INTELLIGENCE
  S.conversation = {
    nav: "Conversation Intelligence", icon: "chat", group: "OVERVIEW",
    title: "Conversation Intelligence", eyebrow: "Full communication volume & behavior",
    sub: "Every message, every channel, every hour. Click a bar to inspect example conversations from that window.",
    render() {
      const heat = D.hourly.map((v, i) => {
        const op = 0.06 + (v / 100) * 0.94;
        return `<div class="cell" title="${String(i).padStart(2, "0")}:00 · intensity ${v}" style="background:rgba(var(--heat-rgb),${op.toFixed(2)})"></div>`;
      }).join("");
      const axis = Array.from({ length: 24 }, (_, i) => `<span>${i % 3 === 0 ? String(i).padStart(2, "0") : ""}</span>`).join("");
      return `
      <div class="grid g3">
        <div class="panel">
          <div class="panel-h"><div class="t">Message split</div><div class="tag">88,658 total</div></div>
          ${U.hbars(D.msgSplit.map((m) => ({ label: m.who, value: m.n, pct: m.n, color: m.color })), { max: 50604 })}
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">Channel</div><div class="tag">by lead</div></div>
          <div style="display:flex;align-items:center;gap:20px">
            ${U.donut(D.channels.map((c) => ({ pct: c.pct, color: c.color })), { size: 130, stroke: 20, center: `<b style="font-size:22px">87%</b><span>WA</span>` })}
            <div class="legend" style="flex:1">
              ${D.channels.map((c) => `<div class="li"><span class="sw" style="background:${c.color}"></span><span>${c.name}</span><b>${c.pct}%</b></div>`).join("")}
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">Language</div><div class="tag">AI-detected</div></div>
          ${U.hbars(D.languages.map((l) => ({ label: l.name, pct: l.pct, valueText: l.pct + "%", color: l.color })), { max: 84.2 })}
          <div class="note" style="margin-top:14px">Haider AI handles Iraqi-dialect Arabic, code-switching, and English in one flow.</div>
        </div>
      </div>

      <div class="panel mt-lg">
        <div class="panel-h"><div class="t">24-hour activity</div><div class="tag">Baghdad time · click an hour to see more</div></div>
        <div class="heat">${heat}</div>
        <div class="heat-axis">${axis}</div>
        <div class="grid g3 mt-lg">
          <div class="callout"><b class="kfig">51.4%</b> of messages arrive outside 09:00–18:00.</div>
          <div class="callout gold"><b class="kfig">23:00–02:00</b> is almost as busy as mid-morning.</div>
          <div class="callout"><b class="kfig">24.9%</b> arrive on the Fri/Sat weekend.</div>
        </div>
      </div>

      <div class="grid g2 mt-lg">
        <div class="panel">
          <div class="panel-h"><div class="t">Weekday rhythm</div><div class="tag">relative volume</div></div>
          <div style="display:flex;align-items:flex-end;gap:14px;height:160px;margin-top:10px">
            ${D.weekdays.map((w) => `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;justify-content:flex-end">
              <div data-grow="${w.v}" style="width:100%;border-radius:6px 6px 0 0;height:0;background:${w.weekend ? "var(--gold)" : "var(--teal)"};transition:height 1s ease;align-self:stretch"></div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--muted)">${w.d}</span>
            </div>`).join("")}
          </div>
          <style>.panel [data-grow]{height:0}</style>
        </div>
        <div class="panel" style="display:flex;flex-direction:column;justify-content:center;background:linear-gradient(120deg,rgba(229,181,103,0.08),transparent)">
          <div class="eyebrow" style="color:var(--gold)">Night-shift insight</div>
          <div style="font-size:30px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;margin:6px 0 14px">Half of demand arrives when the team is offline.</div>
          <div class="note">For more than half of all customer activity, Haider AI is the only employee on duty. Its quality is the OceanGate brand at night.</div>
        </div>
      </div>`;
    },
    init(root) {
      root.querySelectorAll(".heat .cell").forEach((c) => c.addEventListener("click", () => {
        U.openDrawer(`<div class="dr-eyebrow">Time window</div><h2 class="dr-title">${c.title.split(" · ")[0]}</h2>
          <p class="dr-def">Example conversations from this hour bucket would load here from <code>odoo_lead_conversations_2026-06-11.jsonl</code>, filtered by message timestamp.</p>
          <div class="dr-section"><div class="dr-h">Sample</div>
          <div class="chat"><div class="msg client"><div class="who">Client · 23:14</div>اريد اشحن من الصين</div>
          <div class="msg ai"><div class="who">Haider AI · +38s</div>هلا عيني! شنو نوع البضاعة ومن وين لوين؟</div></div></div>`);
      }));
    },
  };

  // ─────────────────────────────────────────  SALES OPPORTUNITY RADAR
  S.radar = {
    nav: "Sales Opportunity Radar", icon: "target", group: "REVENUE",
    title: "Sales Opportunity Radar", eyebrow: "Missed money & handoff priorities",
    sub: "Not more leads, fewer dropped opportunities. The morning queue ranks overnight leads by AI opportunity score.",
    render() {
      const ev = D.buyingEvidence;
      const rings = [
        { label: "Ready to quote", n: 2202, r: 150 },
        { label: "Asked how to pay", n: 1135, r: 118 },
        { label: "Sent documents", n: 305, r: 88 },
        { label: "Goods ready", n: 122, r: 58 },
        { label: "Agreed price", n: 101, r: 30 },
      ];
      const cx = 180, cy = 180;
      const ringSvg = rings.map((rg, i) => `
        <circle cx="${cx}" cy="${cy}" r="${rg.r}" fill="none" stroke="rgba(22,194,194,${0.5 - i * 0.07})" stroke-width="1.5"></circle>
        <circle cx="${cx}" cy="${cy - rg.r}" r="5" fill="var(--teal)"></circle>
        <text x="${cx + 10}" y="${cy - rg.r + 4}" class="ring-label">${rg.label}</text>
        <text x="${cx + 10}" y="${cy - rg.r + 20}" class="ring-num">${fmt(rg.n)}</text>`).join("");
      const queue = [
        { id: "L-806H", score: 96, cargo: "40ft phones · ready to ship", meta: ["China→Basra", "Strong", "0 human replies"] },
        { id: "L-2890", score: 92, cargo: "Container clothes · agreed price", meta: ["China→Baghdad", "Strong", "8.4h idle"] },
        { id: "L-3500", score: 88, cargo: "Machinery · goods ready", meta: ["UAE→Baghdad", "Strong", "overnight"] },
        { id: "L-3120", score: 84, cargo: "Container #, full size given", meta: ["China→Erbil", "Strong", "asked how to pay"] },
        { id: "L-3410", score: 79, cargo: "Supplier link shared", meta: ["UAE→Najaf", "Strong", "11h idle"] },
        { id: "L-1500", score: 74, cargo: "3 fields · commercial", meta: ["Turkey→Baghdad", "Medium", "no reply"] },
      ];
      return `
      <div class="grid g4">
        ${U.stat({ num: D.opportunity.strongSignals, label: "Strong buying signals", sub: "25.4% of all leads", accent: "var(--green)" })}
        ${U.stat({ num: D.opportunity.hotIgnored, label: "Hot leads ignored", sub: "44% of the hottest", accent: "var(--red)", metric: "hot_ignored" })}
        ${U.stat({ num: D.opportunity.quoteReady4, label: "Quote-ready (4 fields)", sub: "only ~15% marked Qualified", accent: "var(--gold)" })}
        ${U.stat({ num: D.coverage.humanReplied, label: "Got human coverage", sub: `of 7,175 · ${fmt(D.coverage.aiOnlyOrNone)} did not`, accent: "var(--teal)" })}
      </div>

      <div class="grid g2 mt-lg" style="grid-template-columns:1fr 1.1fr">
        <div class="panel">
          <div class="panel-h"><div class="t">Opportunity radar</div><div class="tag">buying evidence rings</div></div>
          <div class="radar"><svg viewBox="0 0 360 360">${ringSvg}</svg></div>
          <div class="note" style="text-align:center">Inner rings = stronger commitment. The center is a customer who agreed a price.</div>
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">Morning queue simulator</div><div class="tag">if sales opens at 09:00</div></div>
          <div class="note" style="margin-bottom:14px">These are the highest-priority overnight leads, ranked by AI opportunity score.</div>
          <div class="grid" style="gap:10px">
            ${queue.map((q) => `<div class="lead" data-lead="${q.id}">
              <div class="lead-top"><span class="lead-id">${q.id}</span><span class="lead-score">${q.score}</span></div>
              <div class="lead-cargo">${q.cargo}</div>
              <div class="lead-meta">${q.meta.map((m) => `<span>${m}</span>`).join("")}</div>
            </div>`).join("")}
          </div>
        </div>
      </div>

      <div class="grid g2 mt-lg">
        <div class="panel">
          <div class="panel-h"><div class="t">Buying evidence</div><div class="tag">AI-extracted signals</div></div>
          ${U.hbars(ev.map((e) => ({ label: e.name, value: e.n, pct: e.pct, valueText: fmt(e.n), color: "var(--green)" })), { max: 22 })}
        </div>
        <div class="panel">
          <div class="panel-h"><div class="t">Response timing gap</div><div class="tag">AI vs human</div></div>
          <div class="cmp" style="margin-top:6px">
            <div class="cmp-row"><div class="cmp-name">Haider AI</div><div class="cmp-track"><div class="cmp-fill" data-grow="6" style="background:var(--teal)"><b style="white-space:nowrap">41s</b></div></div></div>
            <div class="cmp-row"><div class="cmp-name">Human first reply</div><div class="cmp-track"><div class="cmp-fill" data-grow="100" style="background:var(--red)"><b>8.2 hours</b></div></div></div>
          </div>
          <div class="callout red" style="margin-top:20px">The AI is fast. The handoff is slow. 95.3% of customers who reply do so within 6 hours, after that, the lead is usually gone.</div>
        </div>
      </div>`;
    },
    init(root) {
      root.querySelectorAll("[data-lead]").forEach((el) => el.addEventListener("click", () => window.OAI_openLead(el.dataset.lead)));
    },
  };

})();
