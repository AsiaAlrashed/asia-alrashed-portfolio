/* ════════════════════════════════════════════════════════════════
   OCEAN AI INSIGHTS, UI HELPERS
   Formatting, count-up, SVG donuts, bars, drawer, route map.
   ════════════════════════════════════════════════════════════════ */
window.OAIUI = (function () {
  const U = {};

  // ── Formatting ──
  U.fmt = (n) => n == null ? "" : n.toLocaleString("en-US");
  U.esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ── Count-up: animate every [data-count] under root ──
  U.animateCounts = function (root) {
    root.querySelectorAll("[data-count]").forEach((el) => {
      if (el.dataset.done) return;
      el.dataset.done = "1";
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      // No count-up animation: show the real final number immediately.
      el.textContent = prefix + (dec > 0 ? target.toFixed(dec) : target.toLocaleString("en-US")) + suffix;
    });
  };

  // ── Grow bars: [data-grow] sets width to data-grow% over time ──
  U.animateBars = function (root) {
    root.querySelectorAll("[data-grow]").forEach((el, i) => {
      if (el.dataset.gdone) return;
      el.dataset.gdone = "1";
      const w = el.dataset.grow;
      el.style.width = "0%";
      setTimeout(() => { el.style.width = w + "%"; }, 80 + i * 45);
    });
  };

  U.activate = function (root) {
    U.animateCounts(root);
    U.animateBars(root);
    root.querySelectorAll("[data-draw]").forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 0;
      if (!len) return;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      requestAnimationFrame(() => {
        p.style.transition = "stroke-dashoffset 1.6s ease";
        p.style.strokeDashoffset = "0";
      });
    });
  };

  // ── SVG donut (segments: [{pct, color, label}]) ──
  U.donut = function (segments, opts = {}) {
    const size = opts.size || 200;
    const stroke = opts.stroke || 26;
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    let acc = 0;
    const arcs = segments.map((s) => {
      const len = (s.pct / 100) * c;
      const dash = `${len} ${c - len}`;
      const off = -acc * c / 100;
      acc += s.pct;
      return `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none"
        stroke="${s.color}" stroke-width="${stroke}" stroke-dasharray="${dash}"
        stroke-dashoffset="${off}" transform="rotate(-90 ${size / 2} ${size / 2})"
        stroke-linecap="butt"></circle>`;
    }).join("");
    const center = opts.center ? `<div class="donut-center">${opts.center}</div>` : "";
    return `<div class="donut-wrap" style="width:${size}px;height:${size}px">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${arcs}</svg>${center}</div>`;
  };

  // ── Horizontal bar list ──
  // items: [{label, value, pct, color, sub}]
  U.hbars = function (items, opts = {}) {
    const max = opts.max || Math.max(...items.map((i) => i.pct != null ? i.pct : i.value));
    return `<div class="hbars">` + items.map((it) => {
      const pct = it.pct != null ? it.pct : it.value;
      const w = (pct / max) * 100;
      const valTxt = it.valueText != null ? it.valueText : (it.value != null ? U.fmt(it.value) : pct + "%");
      return `<div class="hbar ${it.dim ? "dim" : ""}">
        <div class="hbar-label">${U.esc(it.label)}</div>
        <div class="hbar-track"><div class="hbar-fill" data-grow="${w.toFixed(1)}" style="background:${it.color || "var(--teal)"}"></div></div>
        <div class="hbar-val">${valTxt}</div>
      </div>`;
    }).join("") + `</div>`;
  };

  // ── Stat card ──
  U.stat = function (o) {
    // o: {num, dec, prefix, suffix, label, sub, accent, metric}
    const accent = o.accent || "var(--teal)";
    return `<div class="stat ${o.big ? "stat-big" : ""}" ${o.metric ? `data-metric="${o.metric}"` : ""}>
      <div class="stat-num" style="color:${accent}"><span data-count="${o.num}" ${o.dec ? `data-dec="${o.dec}"` : ""} ${o.prefix ? `data-prefix="${U.esc(o.prefix)}"` : ""} ${o.suffix ? `data-suffix="${U.esc(o.suffix)}"` : ""}>0</span></div>
      <div class="stat-label">${o.label}</div>
      ${o.sub ? `<div class="stat-sub">${o.sub}</div>` : ""}
      ${o.metric ? `<div class="stat-explain">Click to see more ›</div>` : ""}
    </div>`;
  };

  // ── Drawer ──
  let drawerEl, scrimEl;
  U.initDrawer = function () {
    scrimEl = document.createElement("div");
    scrimEl.className = "drawer-scrim";
    drawerEl = document.createElement("aside");
    drawerEl.className = "drawer";
    document.body.appendChild(scrimEl);
    document.body.appendChild(drawerEl);
    scrimEl.addEventListener("click", U.closeDrawer);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") U.closeDrawer(); });
  };
  U.openDrawer = function (html) {
    drawerEl.innerHTML = `<button class="drawer-close" onclick="OAIUI.closeDrawer()">✕</button>` + html;
    drawerEl.classList.add("open");
    scrimEl.classList.add("open");
    OAIUI.activate(drawerEl);
  };
  U.closeDrawer = function () {
    if (drawerEl) drawerEl.classList.remove("open");
    if (scrimEl) scrimEl.classList.remove("open");
  };

  // ── Explain-this-number drawer content ──
  U.explain = function (m) {
    // m: {title, value, def, source, related, evidence}
    return `<div class="dr-eyebrow">Explain this number</div>
      <h2 class="dr-title">${m.title}</h2>
      <div class="dr-value">${m.value}</div>
      <p class="dr-def">${m.def}</p>
      <div class="dr-meta">
        <div><span>Source</span><code>${U.esc(m.source)}</code></div>
        <div><span>Generated</span><code>${OAI.snapshot.generatedAt}</code></div>
        <div><span>Window</span><code>${OAI.snapshot.window}</code></div>
      </div>
      ${m.related ? `<div class="dr-section"><div class="dr-h">Related</div>${m.related}</div>` : ""}
      ${m.evidence ? `<div class="dr-section"><div class="dr-h">Evidence samples</div><div class="dr-ev">${m.evidence.map((e) => `<code>${e}</code>`).join("")}</div></div>` : ""}
      <div class="dr-foot">Every number links back to evidence.</div>`;
  };

  // metric registry for explain drawer
  U.metrics = {};
  U.registerMetric = (key, obj) => { U.metrics[key] = obj; };
  U.explainMetric = (key) => { const m = U.metrics[key]; if (m) U.openDrawer(U.explain(m)); };

  return U;
})();
