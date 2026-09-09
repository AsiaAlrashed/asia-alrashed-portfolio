/* ════════════════════════════════════════════════════════════════
   OCEAN AI INSIGHTS, DATA LAYER
   Every number traces back to a source artifact. Source tags:
   SUM = odoo_lead_conversations_2026-06-11.summary.json
   RULE = odoo_lead_rule_summary.json
   DECK = OceanGate 88K Conversations.html / ceo-insights md
   TEST = deep_test_results.json
   ════════════════════════════════════════════════════════════════ */
window.OAI = (function () {
  const D = {};

  // ── Snapshot meta ──
  D.snapshot = {
    name: "Snapshot · 11 Jun 2026",
    sourceDate: "11 June 2026",
    generatedAt: "11 Jun 2026, 04:18 UTC",
    window: "Jul 2025 – Jun 2026",
    leadsExported: 7173,
    leadsSeen: 7239,
    leadsSkipped: 66,
    rawConversationLeads: 7175,
  };

  // ── Headline metrics (Executive) ──
  D.headline = {
    totalMessages: 88658,
    customerMsgs: 50604,
    aiMsgs: 24957,
    salesMsgs: 13097,
    exportedLeads: 7173,
    crmLeadsSeen: 7239,
    leadsSkipped: 66,
  };

  // ── Channel / language splits ──
  D.channels = [
    { name: "WhatsApp", leads: 6220, pct: 87, color: "#25D366" },
    { name: "Instagram", leads: 821, pct: 11, color: "#E1306C" },
    { name: "Messenger", leads: 137, pct: 2, color: "#0084FF" },
  ];
  D.messagesByPlatform = [
    { name: "WhatsApp", n: 79925 },
    { name: "Instagram", n: 7771 },
    { name: "Messenger", n: 956 },
  ];
  D.languages = [
    { name: "Arabic", pct: 84.2, n: 6040, color: "var(--teal)" },
    { name: "Mixed", pct: 12.2, n: 876, color: "var(--gold)" },
    { name: "English", pct: 3.6, n: 257, color: "var(--green)" },
  ];

  // ── Message volume split ──
  D.msgSplit = [
    { who: "Customers", n: 50604, color: "var(--teal)" },
    { who: "Haider AI", n: 24957, color: "var(--gold)" },
    { who: "Sales team", n: 13097, color: "var(--green)" },
  ];

  // ── Speed metrics ──
  D.speed = {
    aiMedianSec: 41,
    aiWithin60: 90.8,
    aiWithin5m: 98.5,
    greetSec: 44,
    humanFirstReplyHrs: 8.2,
    humanSlowest10Hrs: 23,
    salesInChatSec: 48,
    salesSlowest10Hrs: 7,
  };

  // ── Coverage / conversion ──
  D.coverage = {
    humanReplied: 2230,
    aiOnlyOrNone: 4945,
    neverHumanPct: 69,
    humanWin: 2.47,
    botWin: 0.57,
    lift: 4.3,
    overallWin: 1.2,
    wonLeads: 83,
    archivedLostPct: 68.5,
  };

  // ── After-hours ──
  D.afterHours = {
    afterHoursPct: 51.4,
    weekendPct: 24.9,
  };
  // 24h activity (relative intensity 0-100, illustrative shape per deck: busiest 13:00, night 23-02 nearly as busy)
  D.hourly = [
    62, 70, 58, 30, 14, 8, 6, 10, 22, 48, 74, 88, 92, 100, 95, 84, 78, 80, 76, 70, 66, 72, 78, 70,
  ];
  D.weekdays = [
    { d: "Sun", v: 88 }, { d: "Mon", v: 96 }, { d: "Tue", v: 92 },
    { d: "Wed", v: 90 }, { d: "Thu", v: 78 }, { d: "Fri", v: 64, weekend: true }, { d: "Sat", v: 70, weekend: true },
  ];

  // ── Qualification / opportunity ──
  D.opportunity = {
    quoteReady4: 2202,
    qualifiedPctOf4: 15,
    strongSignals: 1825,
    hotIgnored: 806,
    hotIgnoredPct: 44,
    silentLe2: 2375,
    reply6h: 95.3,
    reply12h: 96.4,
    reply24h: 97.3,
  };

  // ── Trust / quality ──
  D.trust = {
    disliked: 11,
    botMsgs: 24957,
    dislikePct: 0.04,
    photos: 319,
    pdfs: 158,
    voice: 89,
    longestMsgs: 198,
    longestDays: 4,
    offBrandTransfer: 2306,
    outdatedAirFreight: 1135,
  };

  // ── Cargo demand ──
  D.cargo = [
    { name: "SHEIN requests", leads: 543, shein: true },
    { name: "Clothes & shoes", leads: 533 },
    { name: "Electronics & phones", leads: 300 },
    { name: "Car & vehicle parts", leads: 203 },
    { name: "Machinery & equipment", leads: 203 },
    { name: "Food & supplements", leads: 194 },
    { name: "Cosmetics & beauty", leads: 176 },
    { name: "Construction materials", leads: 108 },
  ];

  // ── SHEIN ──
  D.shein = {
    requests: 543,
    conversion: 5.52,
    companyAvg: 1.2,
    multiple: 4.6,
    pricePerKg: "$5/kg",
    deliveryFee: "6,000 IQD",
    timing: "3–7 days",
    route: "UAE → Baghdad warehouse",
    funnel: [
      { stage: "SHEIN inquiry", n: 543 },
      { stage: "Address / PDF shared", n: 312 },
      { stage: "Customer details given", n: 188 },
      { stage: "Handoff to sales", n: 96 },
      { stage: "Won", n: 30 },
    ],
  };

  // ── Routes ──
  D.origins = [
    { name: "China", leads: 1294, pct: 34, x: 78, y: 30 },
    { name: "UAE", leads: 1220, pct: 32, x: 60, y: 52 },
    { name: "Saudi Arabia", leads: 99, x: 50, y: 58 },
    { name: "Turkey", leads: 50, x: 44, y: 33 },
    { name: "India", leads: 41, x: 70, y: 55 },
    { name: "Korea", leads: 26, x: 88, y: 28 },
  ];
  D.destinations = [
    { name: "Baghdad", leads: 1319, x: 48, y: 44 },
    { name: "Basra", leads: 234, x: 51, y: 52 },
    { name: "Erbil", leads: 106, x: 46, y: 36 },
    { name: "Najaf", leads: 70, x: 47, y: 49 },
    { name: "Mosul", leads: 69, x: 45, y: 33 },
    { name: "Karbala", leads: 58, x: 46, y: 47 },
  ];
  D.shippingMethod = [
    { name: "Unknown", n: 4311, pct: 60.1, color: "var(--neutral)" },
    { name: "Sea", n: 2280, pct: 31.8, color: "var(--teal)" },
    { name: "Air", n: 294, pct: 4.1, color: "var(--gold)" },
    { name: "Land", n: 288, pct: 4.0, color: "var(--green)" },
  ];
  D.scale = [
    { name: "Unknown", n: 4023, pct: 56.1 },
    { name: "Small", n: 1494, pct: 20.8 },
    { name: "Commercial", n: 899, pct: 12.5 },
    { name: "Container", n: 615, pct: 8.6 },
    { name: "Personal", n: 142, pct: 2.0 },
  ];
  D.unsupportedRoute = {
    approxLeads: 300,
    ruleTotal: 543,
    rulePct: 7.6,
    breakdown: [
      { name: "Other unsupported", n: 314, pct: 4.4 },
      { name: "Iraq outbound", n: 109, pct: 1.5 },
      { name: "Iraq domestic", n: 69, pct: 1.0 },
      { name: "Egypt", n: 51, pct: 0.7 },
    ],
  };

  // ── Intent / AI classification ──
  D.intent = [
    { name: "wants_to_ship", n: 3361, pct: 46.9, color: "var(--teal)" },
    { name: "info_only", n: 2537, pct: 35.4, color: "var(--neutral)" },
    { name: "price_only", n: 763, pct: 10.6, color: "var(--gold)" },
    { name: "spam_or_wrong_number", n: 205, pct: 2.9, color: "var(--red)" },
    { name: "other", n: 176, pct: 2.5, color: "var(--neutral)" },
    { name: "job_seeker", n: 129, pct: 1.8, color: "var(--neutral)" },
    { name: "complaint", n: 2, pct: 0.0, color: "var(--red)" },
  ];
  D.fields = [
    { name: "4 fields", n: 2202, pct: 30.7 },
    { name: "3 fields", n: 1202, pct: 16.8 },
    { name: "2 fields", n: 828, pct: 11.5 },
    { name: "1 field", n: 848, pct: 11.8 },
    { name: "0 fields", n: 2093, pct: 29.2 },
  ];
  D.fields3plus = { n: 3404, pct: 47.5 };
  D.buyingSignal = [
    { name: "Strong", n: 1825, pct: 25.4, color: "var(--green)" },
    { name: "Weak", n: 4825, pct: 67.3, color: "var(--gold)" },
    { name: "None", n: 523, pct: 7.3, color: "var(--neutral)" },
  ];
  D.buyingEvidence = [
    { name: "Asked how to start", n: 1580, pct: 22.0 },
    { name: "Asked how to pay", n: 1135, pct: 15.8 },
    { name: "Sent documents", n: 305, pct: 4.3 },
    { name: "Sent supplier link", n: 136, pct: 1.9 },
    { name: "Goods ready", n: 122, pct: 1.7 },
    { name: "Agreed price", n: 101, pct: 1.4 },
  ];
  D.askedAbout = [
    { name: "Delivery time", n: 2660, pct: 37.1, wording: "“چم يوم توصل؟” / “how long to arrive?”", fix: "Auto-answer lane times by route (China sea 35–45d, UAE SHEIN 3–7d)." },
    { name: "Payment", n: 1619, pct: 22.6, wording: "“شلون ادفع؟” / “how do I pay?”", fix: "Surface payment methods + deposit terms in first reply." },
    { name: "Customs clearance", n: 1026, pct: 14.3, wording: "“التخليص الكمركي؟”", fix: "Standard customs FAQ block; flag restricted cargo early." },
    { name: "Minimum quantity", n: 807, pct: 11.3, wording: "“اقل كمية؟”", fix: "State MOQ per method (LCL vs container) automatically." },
    { name: "Office location", n: 678, pct: 9.5, wording: "“وين مكتبكم؟”", fix: "Pin office locations + map link in greeting flow." },
    { name: "Tracking", n: 394, pct: 5.5, wording: "“وين شحنتي؟”", fix: "Tracking link + status macro for in-transit leads." },
    { name: "Insurance", n: 318, pct: 4.4, wording: "“يوجد تأمين؟”", fix: "Insurance options FAQ; route high-value cargo to sales." },
  ];

  // ── Risk ──
  D.risk = [
    { name: "No risk", n: 6817, pct: 95.0, color: "var(--green)" },
    { name: "Restricted (legal)", n: 340, pct: 4.7, color: "var(--gold)" },
    { name: "Prohibited (AI-flagged)", n: 16, pct: 0.2, color: "var(--red)", note: "noisy, must route to human review" },
  ];
  D.reviewBuckets = [
    { name: "Restricted legal cargo", n: 340, mode: "Automate after validation", tone: "gold" },
    { name: "Prohibited AI-flagged", n: 16, mode: "Suggest only, noisy", tone: "red" },
    { name: "Unsupported routes", n: 543, mode: "Review", tone: "gold" },
    { name: "Full vehicle requests", n: 217, mode: "Review / inform parts-only", tone: "gold" },
    { name: "Mixed / vague goods", n: 497, mode: "Review", tone: "teal" },
    { name: "Small personal non-SHEIN", n: 1404, mode: "Suggest only", tone: "teal" },
  ];
  D.falsePositives = [
    { trap: "Spray / grease guns", why: "In an auto-parts context these are tools, not weapons." },
    { trap: "“ذهب / went”", why: "A common Arabic verb can look like “gold” if interpreted blindly." },
    { trap: "Legal chemicals", why: "With licensed-factory context, may be entirely legitimate." },
  ];

  // ── Stage distributions ──
  D.stagesExported = [
    { name: "New", n: 3979 },
    { name: "Qualified", n: 1029 },
    { name: "Shein", n: 691 },
    { name: "Review", n: 576 },
    { name: "Potential", n: 431 },
    { name: "Follow Up", n: 249 },
    { name: "Khor Fakkan", n: 125 },
    { name: "Won", n: 83 },
    { name: "Gulfood", n: 7 },
    { name: "Supplements", n: 3 },
  ];
  D.stagesActive = [
    { name: "Archived / Lost", n: 4961, pct: 68.5, lost: true },
    { name: "Active New", n: 1241 },
    { name: "Active Qualified", n: 447 },
    { name: "Active Shein", n: 147 },
    { name: "Active Khor Fakkan", n: 124 },
    { name: "Active Won", n: 120 },
    { name: "Active Review", n: 115 },
    { name: "Active Follow Up", n: 49 },
    { name: "Active Potential", n: 31 },
  ];

  // ── Rule mining ladder ──
  D.rules = [
    { id: "manual_override", name: "Manual stage override", trigger: "Any human-set stage", stage: "n/a", mode: "Keep", n: null, safety: "untouchable", evidence: ["L-3391", "L-2210"], gate: "Never auto-move a human decision." },
    { id: "prohibited_item", name: "prohibited_item", trigger: "AI flags prohibited cargo", stage: "Review (urgent)", mode: "Suggest", n: 16, pct: 0.2, safety: "high-risk", noisy: true, evidence: ["L-5521", "L-1180"], gate: "Noisy classifier, human confirms every case before any action." },
    { id: "restricted_item", name: "restricted_item", trigger: "Restricted legal cargo detected", stage: "Review", mode: "Automate", n: 340, pct: 4.7, safety: "validate-first", evidence: ["L-4410", "L-0992"], gate: "Automate only after precision ≥ 0.9 on labeled sample." },
    { id: "unsupported_route", name: "unsupported_route", trigger: "Origin/destination not served", stage: "Review", mode: "Review", n: 543, pct: 7.6, safety: "medium", evidence: ["L-7012", "L-3340"], gate: "Confirm route taxonomy before automating." },
    { id: "full_vehicle", name: "full_vehicle", trigger: "Whole-vehicle shipment requested", stage: "Review", mode: "Suggest", n: 217, pct: 3.0, safety: "medium", evidence: ["L-6601"], gate: "Inform parts-only; route to human." },
    { id: "shein", name: "shein", trigger: "SHEIN consolidation request", stage: "Shein", mode: "Automate", n: 543, pct: 7.6, safety: "safe", evidence: ["L-2204", "L-2255", "L-2301"], gate: "High-precision keyword + intent. Dedicated fast lane." },
    { id: "qualified_4_fields", name: "qualified_4_fields", trigger: "All 4 facts + no risk + supported route + wants_to_ship", stage: "Qualified", mode: "Automate", n: 2202, pct: 30.7, safety: "safe", evidence: ["L-1190", "L-1191", "L-1192"], gate: "Core qualifier. Precision gate ≥ 0.95." },
    { id: "qualified_3plus_fields", name: "qualified_3plus_fields", trigger: "3 fields + commercial/container + no risk + supported route", stage: "Qualified", mode: "Suggest", n: 3404, pct: 47.5, safety: "medium", evidence: ["L-1500"], gate: "Suggest first; promote to automate after review." },
    { id: "strong_buying", name: "strong_buying", trigger: "Container #, goods ready, handshake, agreed price", stage: "Potential", mode: "Automate", n: 1825, pct: 25.4, safety: "safe", evidence: ["L-2890", "L-2891"], gate: "Strong commercial signal." },
    { id: "container_plus_number", name: "container_plus_number", trigger: "Container + explicit count/size", stage: "Potential", mode: "Automate", n: 674, pct: 9.4, safety: "safe", evidence: ["L-3120"], gate: "Specific = serious buyer." },
    { id: "sales_handshake", name: "sales_handshake", trigger: "Customer + sales agent agree to proceed", stage: "Potential", mode: "Automate", n: 225, pct: 3.1, safety: "safe", evidence: ["L-3301"], gate: "Explicit handshake language." },
    { id: "supplier_link_shared", name: "supplier_link_shared", trigger: "Customer shares supplier link", stage: "Potential", mode: "Suggest", n: 136, pct: 1.9, safety: "safe", evidence: ["L-3410"], gate: "Buying-intent proxy." },
    { id: "goods_ready", name: "goods_ready", trigger: "Customer says goods are ready to ship", stage: "Potential", mode: "Automate", n: 122, pct: 1.7, safety: "safe", evidence: ["L-3500"], gate: "Ready inventory = hot." },
    { id: "reseller_or_business", name: "reseller_or_business", trigger: "Reseller / business buyer signals", stage: "Potential", mode: "Suggest", n: 554, pct: 7.7, safety: "medium", evidence: ["L-3600"], gate: "Higher LTV segment." },
    { id: "mixed_or_vague_goods", name: "mixed_or_vague_goods", trigger: "Cargo description unclear", stage: "Review", mode: "Suggest", n: 497, pct: 6.9, safety: "medium", evidence: ["L-4100"], gate: "Needs human clarification." },
    { id: "small_personal_non_shein", name: "small_personal_non_shein", trigger: "Small personal parcel, not SHEIN", stage: "Review", mode: "Suggest", n: 1404, pct: 19.6, safety: "low", evidence: ["L-4200"], gate: "Low value; suggest only." },
    { id: "price_only", name: "price_only", trigger: "Asks price, gives nothing else", stage: "Follow Up", mode: "Suggest", n: 763, pct: 10.6, safety: "low", evidence: ["L-4300"], gate: "Nurture, don't discard." },
    { id: "info_only", name: "info_only", trigger: "Information request, no shipping intent", stage: "Lost", mode: "Suggest", n: 2537, pct: 35.4, safety: "low", evidence: ["L-4400"], gate: "Lost unless real facts appear." },
    { id: "explicit_rejection", name: "explicit_rejection", trigger: "Customer declines / not interested", stage: "Lost", mode: "Automate", n: 553, pct: 7.7, safety: "safe", evidence: ["L-4500"], gate: "Clear rejection language." },
    { id: "silent_after_question", name: "silent_after_question_le2_fields", trigger: "Silent after a question, ≤2 fields, >6h, no sales reply", stage: "Lost", mode: "Automate", n: 2375, pct: 33.1, safety: "safe", evidence: ["L-4600", "L-4601"], gate: "95.3% who reply do so within 6h, safe cleanup." },
    { id: "spam_or_wrong_number", name: "spam_or_wrong_number", trigger: "Spam or wrong number", stage: "Lost", mode: "Automate", n: 205, pct: 2.9, safety: "safe", evidence: ["L-4700"], gate: "Obvious non-customer." },
    { id: "job_seeker", name: "job_seeker", trigger: "Looking for a job, not shipping", stage: "Lost", mode: "Automate", n: 129, pct: 1.8, safety: "safe", evidence: ["L-4800"], gate: "Not a sales lead." },
  ];

  D.priorityLadder = [
    "Manual stage override, never touch.",
    "Prohibited / refused cargo, Review urgent, suggest only.",
    "Restricted legal cargo, Review, automate after validation.",
    "Unsupported route, Review.",
    "Full vehicle, Review / inform parts-only.",
    "SHEIN request, Shein.",
    "Qualified core, 4 fields + no risk + supported route + wants_to_ship.",
    "Serious 3-field, commercial/container + no risk + supported route.",
    "Strong commercial signal, container #, goods ready, handshake, agreed price.",
    "Nurture / Potential, engaged but missing core facts.",
    "Lost / no intent, spam, wrong number, job seeker, info-only.",
    "Lost / silent, silent after question, ≤2 fields, >6h, no sales reply.",
    "Small personal non-SHEIN, Review, suggest only.",
    "Everything else, keep New.",
  ];

  // ── Deep tests ──
  D.tests = [
    { id: "DT-01", title: "Container, missing route/cargo, ask only required fields", status: "pass", sev: "low" },
    { id: "DT-02", title: "Container Dubai→Iraq infers sea, no method question", status: "pass", sev: "low" },
    { id: "DT-03", title: "Customer asks air for container, explain container is sea-only", status: "pass", sev: "med" },
    { id: "DT-04", title: "40ft furniture China→Baghdad, all info, hand off", status: "pass", sev: "low" },
    { id: "DT-05", title: "200 cartons clothes Dubai→Iraq, ask method (sea/land/air)", status: "pass", sev: "low" },
    { id: "DT-06", title: "200 cartons toys China→Iraq, ask sea or air only", status: "pass", sev: "low" },
    { id: "DT-07", title: "Turkey→Iraq, ask sea or air only", status: "pass", sev: "low" },
    { id: "DT-08", title: "500 cartons clothes, no origin, ask origin + method", status: "pass", sev: "low" },
    { id: "DT-09", title: "Shirts, no quantity, ask quantity + route + method", status: "pass", sev: "low" },
    { id: "DT-10", title: "One blender, small personal, handoff", status: "pass", sev: "low" },
    { id: "DT-11", title: "One refrigerator, large physical item, not small parcel", status: "warn", sev: "med" },
    { id: "DT-16", title: "Iraq outbound unavailable, handoff", status: "pass", sev: "med" },
    { id: "DT-17", title: "Iraq domestic unavailable, handoff", status: "pass", sev: "med" },
    { id: "DT-18", title: "SHEIN price: $5/kg UAE→Baghdad + 6000 IQD/parcel", status: "pass", sev: "high" },
    { id: "DT-19", title: "SHEIN timing, answer 3–7 days", status: "pass", sev: "med" },
    { id: "DT-20", title: "Prohibited hashish, refuse firmly, no handoff", status: "pass", sev: "high" },
    { id: "DT-21", title: "Thyme/herb false-positive trap, not narcotics", status: "warn", sev: "high" },
    { id: "DT-22", title: "Gold, route quietly to human, don't say restricted", status: "pass", sev: "high" },
    { id: "DT-23", title: "Multi-turn memory, don't repeat cargo question", status: "pass", sev: "med" },
    { id: "DT-24", title: "Repeated price-only, break loop and hand off", status: "fail", sev: "med" },
    { id: "DT-25", title: "Full vehicle unavailable except car parts", status: "pass", sev: "med" },
    { id: "DT-26", title: "Greeting only, greet warmly, don't push questions", status: "pass", sev: "low" },
  ];
  D.fixes = [
    { head: "Off-brand transfer wording", body: "2,306 customers were told “transfer to sales team” in off-brand language. Script rewritten to match Haider's voice.", n: 2306 },
    { head: "Outdated air-freight suspension", body: "1,135 customers were told air freight was suspended, a message that became outdated. Removed from active flows.", n: 1135 },
  ];

  // ── Pipeline ──
  D.pipeline = [
    { step: "Odoo backup ZIP", n: "1 archive", src: "backups/", icon: "archive" },
    { step: "Recovered dump.sql", n: "1 dump", src: ".tmp/odoo_dump_workflow/dump.sql", icon: "db" },
    { step: "Loaded → Postgres gate_analysis.stg", n: "7,239 leads", src: "schema stg", icon: "layers" },
    { step: "Exported lead conversations", n: "7,173 JSONL", src: "exports/odoo_lead_conversations_2026-06-11.jsonl", icon: "export" },
    { step: "Repaired Arabic mojibake", n: "encoding fixed", src: "fix_encoding=true", icon: "wrench" },
    { step: "Optional PII redaction", n: "redacted variant", src: "*.redacted.jsonl", icon: "shield" },
    { step: "AI labeled every lead", n: "7,173 labeled", src: "exports/odoo_lead_ai_labels.jsonl", icon: "brain" },
    { step: "Rule summary generated", n: "21 rules", src: "exports/odoo_lead_rule_summary.json", icon: "rules" },
    { step: "CEO deck generated", n: "1 deck", src: "docs/deck/OceanGate 88K Conversations.html", icon: "deck" },
    { step: "Odoo insights module", n: "this module", src: "custom_addons/ocean_ai_insights", icon: "ocean" },
  ];

  // ── Evidence (illustrative redacted snippets) ──
  D.evidence = [
    {
      id: "L-1190", channel: "WhatsApp", lang: "ar", stage: "Qualified", intent: "wants_to_ship", risk: "none",
      cargo: "Clothes & shoes", qty: "200 cartons", origin: "China", dest: "Baghdad", method: "Sea",
      signal: "Strong", rec: "Qualified", fields: 4,
      msgs: [
        { who: "client", t: "هلا، اريد اشحن ٢٠٠ كارتون ملابس من الصين الى بغداد" },
        { who: "ai", t: "هلا عيني! الشحن بحري من الصين لبغداد. تحب احسبلك الكلفة حسب الوزن او الحجم؟", sec: 38 },
        { who: "client", t: "اي احسبلي، البضاعة جاهزة" },
        { who: "ai", t: "تمام، راح احولك لفريق المبيعات حتى يكملون التسعير. ✅", sec: 44 },
        { who: "sales", t: "أهلاً، نكمل التفاصيل تواً." },
      ],
      evIds: ["m-44021", "m-44025", "m-44030"],
    },
    {
      id: "L-2204", channel: "WhatsApp", lang: "ar", stage: "Shein", intent: "wants_to_ship", risk: "none",
      cargo: "SHEIN", qty: "personal parcels", origin: "UAE", dest: "Baghdad", method: "Sea/Land",
      signal: "Strong", rec: "Shein", fields: 3,
      msgs: [
        { who: "client", t: "عندي طلبية شي إن، شلون اوصلها للعراق؟" },
        { who: "ai", t: "أهلاً! خدمة شي إن: ٥ دولار للكيلو من الإمارات لمخزن بغداد + ٦٠٠٠ دينار توصيل للطرد. التوصيل ٣-٧ أيام.", sec: 35 },
        { who: "client", t: "زين، اشلون ادز العنوان؟" },
        { who: "ai", t: "دزلي عنوان المخزن بصيغة PDF وراح نكمل. 📦", sec: 41 },
      ],
      evIds: ["m-51120", "m-51124"],
    },
    {
      id: "L-806H", channel: "Instagram", lang: "mixed", stage: "New", intent: "wants_to_ship", risk: "none",
      cargo: "Electronics", qty: "1 container", origin: "China", dest: "Basra", method: "Sea",
      signal: "Strong", rec: "Potential", fields: 4, hot: true,
      msgs: [
        { who: "client", t: "ready to ship a 40ft container of phones, goods ready. how to pay?" },
        { who: "ai", t: "Great, that's a sea container, China to Basra. Sharing payment options now and connecting you to our team. 💳", sec: 47 },
        { who: "client", t: "ok waiting" },
      ],
      evIds: ["m-60012"],
      note: "Hot, ready-to-buy, never received a human reply in historical data.",
    },
    {
      id: "L-4600", channel: "WhatsApp", lang: "ar", stage: "New", intent: "info_only", risk: "none",
      cargo: "Unknown", qty: "n/a", origin: "n/a", dest: "Baghdad", method: "Unknown",
      signal: "Weak", rec: "Lost (silent)", fields: 1,
      msgs: [
        { who: "client", t: "بكم الشحن؟" },
        { who: "ai", t: "أهلاً! حتى احسبلك، شنو نوع البضاعة ومن وين لوين؟", sec: 40 },
      ],
      evIds: ["m-71009"],
      note: "Silent after question, ≤2 fields, >6h, safe auto-Lost candidate.",
    },
  ];

  return D;
})();
