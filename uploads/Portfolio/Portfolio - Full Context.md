# Portfolio Full Context (source of truth)

This document is the complete, detailed brief for building Ahmed Soubhi Aljundi's personal portfolio website. It is written to be handed to another AI session (for example a Claude Design session) so it can build the site with full, accurate context. Every system below was extracted directly from the real codebases, the real Odoo user manual, the OG-CRM pitch deck, and the mined conversation data.

Read the "Honesty and credibility rules" and "Claims to avoid" sections before writing any copy. A portfolio shows proof, so the numbers on the page must match the numbers in the screenshots.

---

## 1. How to use this document

- Facts are tagged `[MEASURED]` (verified in real code, data files, or config), `[USER FIGURE]` (Ahmed's chosen figure, defensible in an interview but not code-verified), or `[VISION]` (part of the product story, not implemented in the code that was reviewed).
- When a claim has a proof asset (a screenshot, a deck, a manual), the asset path is listed so it can be shown on the page next to the claim.
- Follow the writing rules. They are hard constraints from Ahmed.

---

## 2. Candidate

- **Name:** Ahmed Soubhi Aljundi
- **Title / target role:** Agentic AI and Automation Engineer (also a strong full-stack developer)
- **Location:** Dubai, UAE
- **Phone:** +971 56 270 0521
- **Email:** ahmedsoubhi.2002@gmail.com (work email on file: ahmedsoubhi@oceangate.co)
- **LinkedIn:** linkedin.com/in/ahmed-soubhi-aljundi
- **GitHub:** github.com/AhmedSoubhi
- **Education:** B.Sc. Computer Engineering, Ajman University, 2024
- **Languages:** Arabic (native), English (fluent)
- **One-line positioning:** builds AI agents and automation that run real, high-volume sales and logistics operations, from the LLM pipeline to the CRM and the dashboards.

---

## 3. Company context (current role)

- **Employer:** Ocean Gate (Ocean Gate Line Shipping Co. L.L.C, also referred to as "Ocean Gate Logistics Solutions"), Dubai.
- **Business:** freight forwarding and logistics. Ships cargo into Iraq (sea, air, and land) from China, the UAE, the Gulf, and Turkey. Also does e-commerce fulfillment, warehousing in Iraq, packing, and last-mile courier delivery across Iraqi provinces.
- **Role:** Agentic AI and Automation Engineer, Full-Stack Developer.
- **Dates:** Nov 2025 to Present.
- **Customer languages:** Iraqi-dialect Arabic and English.

---

## 4. Writing rules (hard constraints)

1. **No em dashes, ever.** Ahmed calls them the "AI dash." Use commas, colons, parentheses, or separate sentences. This applies to every line of copy on the site.
2. **Plain, simple language.** Assume the reader may be a non-technical recruiter. Explain in everyday words. Put deep jargon in a small "tech" tag or a technical detail line, not the main headline.
3. **Do not name specific AI model versions in the body.** Say "OpenAI" instead of any GPT or model version. Capabilities like "reads voice notes," "reads photos," and "speech to text" are fine to state.
4. **Voice for each item:** lead with what the system does and why it matters, then the proof number, then the technology in a small tag. Example shape: "Built X that does Y, handling Z. (Tech, tech, tech.)"
5. **Honesty over hype.** A slightly smaller claim that is fully backed by a screenshot beats an impressive claim that the proof contradicts.

---

## 5. The portfolio's job (the credibility principle)

The site has one job: make a hiring manager believe Ahmed builds real, production AI and full-stack systems, by showing the actual work next to honest numbers.

Because the site shows real screenshots and real decks, the numbers written on the page must agree with the numbers visible in those images. Do not write "200,000 messages" next to a screenshot that says "88,658." Use the measured numbers for anything shown as proof. See each system's "Numbers" block for the measured figure and the résumé figure side by side.

---

## 6. The systems

There are three real codebases plus the mined-data and pitch deliverables. Present them as a small number of strong, deep case studies rather than a long shallow list.

---

### System 1: AI Sales Agent ("Haydar") + Conversation Intelligence

**Repo:** `C:\Users\ardjood\Desktop\AI_chatbot`
**Names in code:** "Haydar" / "Haider AI" (the customer-facing persona), "OceanGate Line" (the client), "Logestechs" (the app title and Pinecone index prefix).

#### What it is (plain language)
A backend AI sales agent that plugs into the company's WhatsApp, Instagram, and Messenger channels (through n8n). For every incoming customer message it reads the whole conversation, works out what the customer wants to ship, pulls the approved company answer from a knowledge base, replies in Iraqi-dialect Arabic or English, collects the details needed to quote a shipment, and decides when to hand the lead to a human. It returns structured data (lead status, confidence, handoff flag, extracted facts, how many qualifying questions are answered) that n8n writes back into the Odoo CRM.

Paired with it is a **chat reader / rule miner**: an offline pipeline that took a full Odoo database backup, rebuilt every historical conversation (7,173 leads, about 88,700 messages), had a cheap LLM read each conversation and emit a structured fact sheet, then turned that into sales and marketing intelligence plus a proposed set of CRM stage-shifting rules.

#### How it was built (architecture)
- Two independent **FastAPI** apps in one repo: the live chatbot API (`app/`, title "Logestechs AI Chatbot") and the offline miner (`mining/`, title "OceanGate Stage-Rule Miner").
- Core reply pipeline (in `app/services/chatbot.py`, roughly 3,000 lines of commented business logic), in strict precedence order:
  1. Acknowledgment / loop guard (returns instantly with no LLM call for pure "ok / thanks / emoji" messages, which breaks the post-handoff "ok" loop).
  2. LLM extraction into a structured `ExtractedState` (cargo, quantity, origin, destination, method, intent, language, restricted-item flag, container flags, SHEIN flag, shipment-size class, evidence), then deterministic post-processing.
  3. Two-pass knowledge-base search: one general reranked search, one sales-knowledge-base-only reranked search.
  4. Guards in order: prohibited cargo (regex) then per-route restricted cargo (curated table) then absolute route bans then small-personal-shipment handoff.
  5. Knowledge-base direct answer (only when the customer is actually asking a question).
  6. Deterministic business rules if nothing above fired (greeting, FAQ, SHEIN, pricing, route validation, intake, three-ask handoff).
  7. Reply LLM turns the chosen action into a natural customer message under heavy style rules (Iraqi Arabic, never reveal being an AI, one consolidated question, never re-ask an answered field, never quote a price number).
- Design philosophy stated in the code: the LLM extracts state, the knowledge base is always searched and can override hardcoded rules (so the sales team edits behavior from Odoo, not from code), deterministic rules apply only when the knowledge base has no match, then the LLM writes the final styled reply.
- Stateless backend: n8n passes the full conversation history each turn.

#### Retrieval / RAG design (the genuinely hard part)
- Bilingual (Arabic Iraqi-dialect) RAG done carefully: question-only symmetric embeddings, a multilingual cross-encoder reranker chosen because raw cosine similarity collapses on short Arabic queries, Arabic diacritic and letter-form normalization, and Arabic-Indic digit handling.
- Wide recall then rerank: pull 20 candidates, rerank with the cross-encoder, return the top 6.
- Multi-gate answer confidence: an answer is only served if it clears a raw rerank score bar (0.5), a cosine sanity floor (0.45), and a win margin (0.15). Sensitive topics (restricted goods, safety) require even more confidence or the bot hands off instead of guessing. Human sales corrections outrank the bot's own knowledge base.
- Self-healing reranker: any rerank error falls back to cosine order, and after 5 consecutive failures it disables itself for the process so chat is never slowed.
- Dedup-on-write: before saving a new Q&A it checks for a near-duplicate (0.92 similarity) and warns Odoo.

#### Standout engineering
- Layered decision engine with explicit precedence, every guard fail-open, so no single component can break the chat.
- Live, no-code business control: the sales team edits Q&A and restricted-cargo lists in Odoo and a 60-second cache makes changes go live with no redeploy.
- Data-recovery work: reconstructing conversations from a truncated Odoo backup ZIP by reading the raw zlib stream, plus repairing Arabic mojibake, turning a broken backup into a clean 7,173-lead dataset.
- Cheap-model-at-scale mining: structured-output labeling of all 7,173 conversations for about 5 US dollars, with resume/checkpoint, concurrency, and model fallback.
- A golden-eval safety net: 47 real conversations replayed on every change, with checkers for language purity, routing, handoff precision and recall, and an Arabic LLM-as-judge, gating merges so fixes never regress.

#### Numbers
Measured, from the 2026-06-11 backup and the mined summary files. These are the figures to show on the portfolio because the proof deck displays them.
- **7,173 leads** with messages (7,239 seen). `[MEASURED]`
- **About 88,000 messages** total: 50,604 from customers, 24,955 from the AI, 13,093 from sales. `[MEASURED]`
- Channel mix: WhatsApp about 90% (79,925), Instagram about 9% (7,771), Messenger about 1% (956). `[MEASURED]`
- **Median AI reply 41 seconds** vs **8.2 hours** for the first human reply. `[MEASURED]`
- **Only 31% of leads (2,230) ever got a human message.** Safe phrasing: "only 31% ever needed a human." `[MEASURED]`
- **51.4% of messages arrive outside working hours** (evenings, nights, weekends). `[MEASURED]`
- **95.3% of replies within 6 hours.** `[MEASURED]`
- **Win rate 4.3x higher when a human is involved** (2.47% with a human vs 0.57% bot-only). `[MEASURED]`
- **Only 11 of 24,955 AI messages were ever disliked (0.04%).** `[MEASURED]`
- **2,202 leads gave all 4 qualifying facts (30.7%); 3,404 gave 3 or more (47.5%).** The résumé's "2,200+ ready-to-buy leads" maps to this. `[MEASURED]`
- Strong buying signal in 25.4% of leads (1,825). `[MEASURED]`
- Busiest day 17 Mar 2026: 1,259 messages from 170 customers. `[MEASURED]`
- Top cargo: clothes and shoes 533, electronics 300, car parts 203, machines 203. `[MEASURED]`
- Golden eval: **95.1% routing accuracy on a 47-case Arabic test suite.** This is routing accuracy, not answer-correctness. `[MEASURED]`
- Mining labeled 7,173 leads with 0 failures for about 5 US dollars. `[MEASURED]`

Résumé (chosen) figures, for reference: 21,000+ leads, 74,865 AI replies, 200,000+ messages read. These are roughly 3x the measured single-backup values (Ahmed's reasoning: the older Odoo database held about triple the volume). `[USER FIGURE]` Do not print these next to a screenshot that shows 88,658.

#### Tech (reference, keep model names out of the body)
Python 3.12, FastAPI, LangChain, OpenAI (chat, embeddings, structured outputs, reasoning), Pinecone serverless (vector database plus hosted reranker), 3072-dimension embeddings, a multilingual cross-encoder reranker, Docker, AWS App Runner and ECR, boto3. Odoo is the system of record; n8n orchestrates the channels. Installed versions seen: fastapi 0.135, langchain 0.3.28, langchain-openai 0.3.35, openai 2.29, pinecone 6.0.2, tiktoken 0.12, numpy 2.4.

#### Proof assets
- CEO insights brief: `C:\Users\ardjood\Desktop\AI_chatbot\docs\ceo-insights-from-7173-conversations.md`
- Animated deck "What 88,000 Conversations Reveal About OceanGate": `...\AI_chatbot\docs\deck\OceanGate 88K Conversations.html`
- "How Haider AI Works.html" and "Smart Lead Staging.html" (also a .pptx export) in the same deck folder and in `...\AI_chatbot\.tmp\design_bundle\ai-docs\project\`
- The stage-rule proposal: `...\AI_chatbot\docs\odoo-stage-shifting-rules-DISCOVERED.md`
- The golden-eval methodology: `...\AI_chatbot\docs\golden-plan.md` and `...\AI_chatbot\tests\golden\README.md`
- A live `/playground` test UI served by the app (`app/static/playground.html`) that can be screenshotted.
- 8 Pinecone re-sync proof screenshots in `...\AI_chatbot\.tmp\design_bundle\ai-docs\project\screenshots\` (`01-check.png` / `01-resync.png` through `04-*`).
- The n8n workflow exports in `...\AI_chatbot\docs\n8n\` (production, IG, messenger, whatsapp) prove the live channel integration.

Note: there are almost no ready-made UI images. For portfolio visuals, screenshot the HTML decks and the `/playground` UI.

#### Honesty flags
- "200k messages" is not verified anywhere in the repo. The verified number is about 88,000. Use 88,000+ on the site.
- The stage-shifting rule ladder is a **proposal with a dry-run-first plan**, not confirmed always-on automation. Say "designed" or "proposed," not "runs automatically," unless confirmed.
- The reply model IDs in the config are unusual identifiers. Just say "OpenAI." Do not print a version number.

---

### System 2: Custom Odoo 18 Sales CRM, Manager Control Tower, and Chatting System

**Repo:** `C:\Users\ardjood\Desktop\custom_addons` (custom modules sit at the top level; the `enterprise/` folder is stock Odoo 18 Enterprise vendor code and is not Ahmed's work).

#### What it is (plain language)
A set of custom Odoo 18 apps that let the whole company run on one screen. Three pillars:
1. **A social-media sales CRM.** Customers message on WhatsApp, Instagram, and Messenger. The AI agent answers automatically and every conversation becomes a CRM lead. Leads are auto-qualified by how many of four intake questions the customer answered, auto-lost if they go silent, and handed to a human when needed.
2. **A manager "Executive Control Tower" dashboard.** Admins see live KPIs: leads per stage, won deals and money, per-rep scorecards, call statistics from the office phone system, messaging response times, overdue conversations, and a cash and accounting panel (bank balances, invoices needing approval, vendor bills). Managers set weekly and monthly targets per rep.
3. **A full-screen chatting workspace.** A custom messaging UI (not stock Odoo chat) where reps handle all three channels, send text, attachments, and voice notes, add internal notes, reassign leads, teach the bot by disliking a bad answer, and see a live customer sidebar.

Supporting apps: a per-rep "New CRM (My Performance)" view, a marketing dashboard (Meta ad sync), an e-commerce dashboard, an HR dashboard (UAE payroll), a quick-booking and invoice-approval workflow, a click-to-call softphone, and a branded login page.

#### How it was built (architecture)
- Standard Odoo module architecture: each feature is a module with Python ORM models, XML views, security CSV and record rules, seed data and `ir.cron` jobs, HTTP/JSON controllers, and frontend assets. Most custom models extend stock models (`crm.lead`, `discuss.channel`, `res.users`, `account.move`, `mail.message`) rather than replacing them, so it stays upgrade-safe.
- The dashboards and chat workspace are custom **OWL** (Odoo's React-like web framework) single-page components registered as client actions, with paired JavaScript, QWeb XML templates, and SCSS.
- KPI aggregation uses hand-written parameterized SQL over `mail_message` and `discuss_channel_member` for speed and correctness.
- Inbound chat pipeline: n8n and the external FastAPI AI backend receive the customer message, call the AI, then POST into Odoo REST endpoints under `/v1/lead/...`. Odoo creates or finds the contact and lead, saves the message, runs round-robin assignment and the qualification ladder, and pushes a real-time bus event so the open chat refreshes live. Outbound replies go back out through the Meta Graph API.
- Live services referenced in code: an AWS App Runner AI backend, Meta Graph API v23.0 (including the server-side Conversions API), a Yeastar P-Series PBX (webhook plus WebRTC softphone), and PostgreSQL. Production host: `portal.oceangate.co`.

#### Key features
- **Manager dashboard:** per-stage lead counts (New, Review, Qualified, Potential, Follow Up), Won leads with expected revenue and net profit, Lost leads, total leads, overdue leads (configurable 2 / 6 / 12 / 24 hour cutoff, 24h is the critical tier), leads to reconnect (silent 14+ days then returned), leads reached, messages read, total replies, calls made and average call duration, an "AI saved time" figure, a Sales Teams Top 3 leaderboard with per-rep drill-down, and a WhatsApp / Instagram / Messenger channel breakdown. Plus a full accounting control tower (bank safes, customer invoices, vendor bills, invoices needing approval, pending bookings).
- **Targets:** managers set and version per-rep targets (calls, leads reached, messages read, replies, response time in minutes, call duration, net profit). Saving a new target archives the old one so a history is kept.
- **Per-rep "New CRM (My Performance)":** the exact same layout as the manager dashboard, auto-scoped to the logged-in rep's own leads, with cash balances and approve/reject hidden.
- **Chatting workspace:** conversation list with unread counts, filter chips (All / My Leads / Unread), live customer sidebar (name, channel, stage, expected revenue, contact data), send text / attachments / voice notes, message edit / delete / react, in-thread and cross-conversation search, per-conversation Bot ON/OFF toggle, Quick Book and freight Quotation actions, assign and reassign with a shared-visibility model, and internal notes.
- **AI handoff queue:** the bot flags a lead for a human, it appears in "Leads waiting for you," and the flag clears the moment a rep replies.
- **Dislike retraining loop:** a rep dislikes a bad bot answer, which opens a correction wizard, creates a knowledge-base row, and syncs it to the AI vector store. Re-editing a dislike updates the same vector (no duplicates).
- **Qualification ladder:** counts 4 intake facts (route as origin plus destination, cargo type, quantity or container size, shipping method). 3 answers means Qualified, 4 means Qualified plus Hot Lead. Restricted items go to Review, prohibited items go to Lost. A human stage change locks the lead so the bot and crons never touch it again.
- **Telephony:** Yeastar PBX call-stats ingestion (webhook plus CSV import with dual dedupe) and a click-to-call WebRTC softphone in the systray.
- **Quick Booking:** converts a won lead into a booking, generates customer invoices and vendor bills, and runs an approve/reject workflow.
- **Meta Conversions API:** server-side conversion events with SHA-256 hashed customer data.

#### Standout engineering
- Timezone-correct KPI windows: a bare date is localized to the viewer's timezone before converting to UTC, fixing a real bug where a Dubai user asking for one day silently dropped every lead created late the prior UTC day.
- Single-source-of-truth reconciliation: the overdue headline count and its drill-down list share one scope so they can never disagree. Code comments document past bugs that this fixed.
- Hand-written SQL that walks each conversation turn by turn to measure the gap from a customer message to the first human reply, treats an AI reply as closing a turn, and caps stale replies at 24 hours.
- Phone-to-channel matching that normalizes formatted and digit-only numbers to the last 8 digits so every counter agrees.
- Automatic, recursion-safe security-group membership driven by HR department, re-applied on upgrade.
- Defensive degradation everywhere: a half-installed module returns zeros instead of breaking the whole dashboard.

Scale of the core custom files: `new_chat_system` backend 5,211 lines and its OWL controller 5,141 lines, `admin_dashboard` frontend 2,085 lines, the lead intake API 1,728 lines, the CRM social model 1,439 lines, the dashboard lead model 1,520 lines.

#### Numbers
- **19 custom modules** at the top level (a few are third-party, see honesty flags). `[MEASURED]`
- **20+ KPIs** on the manager dashboard. `[MEASURED]`
- 7 sales stages (Won, Lost, New, Review, Qualified, Potential, Follow Up). `[MEASURED]`
- 6 custom scheduled jobs (Meta sync every 6h, Logestechs sync every 15 min, silent-lead auto-lose every 30 min, AI-sync retries every 10 min). `[MEASURED]`
- 32 restricted-cargo items seeded with Arabic and English aliases. `[MEASURED]`
- "AI saved time" baseline: 90 seconds per AI reply, measured live from real reply gaps when samples exist. `[MEASURED]`
- Bilingual user manual: English version 1,677 lines (about 13,444 words), plus an Arabic mirror and compiled PDFs. `[MEASURED]`
- 23 annotated product screenshots in the docs. `[MEASURED]`

#### Tech (reference)
Odoo 18 Enterprise, Python 3.12 (ORM plus raw SQL), OWL 2, JavaScript, QWeb/XML, SCSS, PostgreSQL, Odoo bus/websocket. Integrations: n8n, the AWS App Runner AI service, OpenAI, Meta Graph API and Conversions API v23.0, WhatsApp Cloud API, Yeastar P-Series PBX (OpenAPI plus Linkus WebRTC SDK), xlsxwriter for report export.

#### Proof assets (strongest set, use these heavily)
Product screenshots in `C:\Users\ardjood\Desktop\custom_addons\docs\assets\screenshots\`:
- Home / navigation: `00-home-apps.png`, `00-home-apps-sales.png`
- Manager control tower: `02-admin-overview.png`, `02-admin-overview-mid.png`, `02-admin-overview-bottom.png`, `02-admin-sales-team-modal.png`, `02-admin-salesperson-view.png`, `02-admin-set-goals.png`, `02-admin-set-target.png`, `02-admin-call-logs-modal.png`, `02-admin-approve-modal.png`, `02-admin-approve-modal-toggle-off.png`, `02-admin-vendor-bill-approvals-list.png`
- CRM dashboard: `03-crm-dashboard.png`, `03-crm-dashboard-sales.png`
- Chat workspace and AI: `04-chat-workspace.png`, `04-chat-conversation-detail.png`, `04-chat-filters.png`, `04-chat-dislike-modal.png`, `04-chat-bot-kb.png`, `04-chat-bot-kb-form.png`
- Per-rep New CRM: `05-new-crm-my-performance.png`, `05-new-crm-bottom.png`

Manual and pitch:
- Full manual: `...\custom_addons\docs\MANUAL-EN.md` and `...\docs\Odoo crm MANUAL-EN.pdf` (Arabic versions alongside).
- Pitch deck (13 slides with embedded screenshots): `C:\Users\ardjood\Desktop\OG-CRM — Pitch (EN).pdf`. Its structure is a good template for the portfolio story: the problem (scattered data, no shared view, repeated support), three modules on one Odoo core, module-by-module feature slides, a permissions matrix, and outcomes (every deal in one screen, reps onboard in a day, support answers cached, approvals stop slipping).

#### Honesty flags
- Not everything in `custom_addons` is Ahmed's. `tk_freight` is a purchased third-party app (TechKhedut) and `prometheus_exporter` is by Mint System. `crm_dashboard`, `marketing_dashboard`, and `ecommerce_dashboard` list other authors in their manifests. The genuinely custom core Ahmed built is `admin_dashboard`, `new_chat_system`, `partner_social_media`, `new_crm`, `quick_booking`, the two Yeastar modules, `whatsapp_auto_welcome`, `discuss_lead_link`, and `ocean_login`. Attribute honestly; do not claim the vendor apps.
- The manager and per-rep dashboards refresh on load, not live. The green "LIVE" pill is decorative. Only the chat inbox is real-time. Do not say "real-time dashboards."
- Hot leads are flagged and queued; the system does not send a notification or auto-assign a rep. Do not say "alerts" or "pings."
- There is no shift or end-of-day recap feature. Do not list one.
- **Security: real production secrets are hard-coded in this source** (a Meta access token and pixel ID in `partner_social_media/models/meta_capi.py`, a Yeastar webhook secret in `yeastar_call_stats/data/`). Never publish this code or these values. Use screenshots and the manual as proof, not raw source.

---

### System 3: OG Tech Operations Suite (the company's logistics, fulfillment, and accounting platform)

Also referred to as **"Logestechs"** (its earlier / internal name). The résumé uses "Logestechs"; the current productized name, in the sales deck and the user manuals, is **"OG Tech Operations Suite."** They are the same platform. Pick one name and use it consistently on the site. Recommended: lead with "OG Tech Operations Suite" (that is what the screenshots and deck show) and note "(also called Logestechs)" once.

**What you provided:** the `C:\Users\ardjood\Desktop\Frontend App` folder (only an early driver-app UI prototype), plus two strong proof documents in `Downloads`: the 16-slide sales deck and the 191-page multi-audience user manual.

#### What it is (plain language)
A full logistics operations platform that runs a courier and fulfillment business end to end: shipping, warehouse inventory, order fulfillment, driver dispatch, and cash accounting, all in one login. It is multi-branch, multi-tenant (each client can have several brands), and multi-role. It is being productized to sell to other logistics companies (the sales deck is addressed "for prospective partners"). Two front ends: a web portal (admins, managers, accountants, clients) and a mobile app called "OG TECH" (drivers, and optionally clients).

#### The six modules
1. **Shipments:** every parcel end to end, board (kanban) and table views, live status, smart filters, bulk actions on 1,000+ shipments, create shipment, print labels, and 14+ delivery stages (Submitted, Dispatch Queue, Assigned, Sorted, In Vehicle, Overdue, Delivered, Partially Delivered, Returned, Postponed, Canceled, Damaged, Closed).
2. **Shipping Manager:** driver roster with live online status and coverage zones, a map-based route and rerouting planner, bulk manual reassignment, and a full assign/reassign audit log.
3. **Warehouse:** products and inventory per fulfillment client, stock-in and stock-out with reasons, an append-only inventory-flow ledger, low-stock alerts, and reserved-versus-available quantities.
4. **Fulfillment:** a pick, pack, dispatch kanban (Created, Pending, Picked, Packed, Order Completed), picker assignment, and a completed order that automatically becomes a live shipment.
5. **Accounting:** safe lockers (cash box, petty cash, bank deposit), driver handover with expected-versus-counted cash reconciliation, client COD payouts, daily collection batches, per-driver per-zone pricing, product bundles, and append-only adjustments (no deletes, clean audit trail).
6. **Driver App (OG TECH mobile):** today's assigned shipments, mark delivered / partially delivered / returned / postponed, a barcode scanner (with a manual-entry fallback), COD collection, a personal finance and debt tracker, Google Maps directions, coverage areas, an availability toggle, and offline support that syncs when back on signal.

#### Standout engineering and product depth
- **WhatsApp-first accounts:** activation links and password resets go out over WhatsApp with a 6-digit code (no email leaks). Real, unusual, and well suited to the Iraqi market.
- **Role-based access done properly:** each of the 7 roles (admin, tracking manager, warehouse manager, accountant, driver, shipments/merchant client, fulfillment client) sees only its own sidebar and its own data.
- **Multi-branch, multi-tenant, multi-brand:** switch branches in one click and roll up every shipment and safe into one dashboard; a single fulfillment client can hold several brands.
- **Cash integrity:** append-only safe ledgers, expected-versus-counted driver handovers with a red difference flag, a daily batch close, and adjustments instead of deletes.
- **Client self-service portals:** branded shipments and fulfillment portals (web and mobile) so clients track their own parcels, inventory, and payouts, which cuts support calls.
- **A configurable stage engine, a Cities and Areas reference** (regions, cities, and villages with delivery cost and map coordinates that drive both routing and pricing), CSV import and export, and printable labels and reports.

#### Numbers
Use the figures visible in the screenshots you will show, because a viewer can read them off the images.

Visible in the deck and manual screenshots (production):
- **About 24,900 shipments** in the shipments table (the count reads 24,949; the board reads "Page 1 of 998" at 25 per page). `[MEASURED, from screenshot]`
- **438 client businesses.** `[MEASURED, from screenshot]`
- **60 drivers** (50 active). `[MEASURED, from screenshot]`
- **102 employees; 510 users** in the data-quality tool. `[MEASURED, from screenshot]`
- **32 fulfillment clients, 216 products, 14,600 units on hand** in the warehouse. `[MEASURED, from screenshot]`
- **22,430 fulfillment orders completed.** `[MEASURED, from screenshot]`
- Cash under management shown in the hundreds of millions of IQD (for example a client-due tile of IQD 171,587,600). `[MEASURED, from screenshot]`

Sales-deck marketing figures (aspirational; several are literally tagged `[STAT]` placeholder inside the deck): 3,000+ shipments per day per branch, 80% less COD reconciliation time, 35% fewer failed deliveries, 50% faster order processing, 60% fewer support calls, 50+ branches, 99.9% uptime, 10-minute client onboarding, 2-week go-live. Treat these as sales claims, not verified results.

Résumé figures: 160,000+ shipments, 110,000+ customers, 90,000+ COD collections, 7 roles. `[USER FIGURE]` Important: the visible screenshots show about 24,900 shipments and 438 clients, so the 160,000 / 110,000 / 90,000 figures do NOT match the proof and must not be printed next to these screenshots. See the honesty flags.

#### Tech (reference)
Web portal (admin plus branded client portals) and a cross-platform mobile app (OG TECH, iOS and Android, Arabic and English RTL). Production stack from prior context: Django and Django REST Framework, React and Vite, Flutter/Dart, PostgreSQL, JWT, AWS, Docker. WhatsApp Cloud API for auth and notifications, Google Maps for directions and routing, barcode/QR scanning, and offline sync.

#### Contribution (honest)
Ahmed was a **main / primary full-stack developer and the top individual code contributor** on a team of full-stack developers, across the web app, the mobile app, and the backend, owning shipments, warehouse and fulfillment, driver dispatch, and the COD and accounting flows. Do NOT claim sole or lead architect.

#### Proof assets (strong, use these as the case-study visuals)
- Sales deck (16 slides, real product screenshots of every module): `C:\Users\ardjood\Downloads\OG Tech Operations Suite — Sales Deck-english (1).pdf`. Best slides to screenshot: slide 3 (all modules fanned out), the main dashboard / Executive Control Tower, the shipments table, the shipping-manager driver coverage, the warehouse and fulfillment boards, accounting and safes, the driver-app phone mockups, and the client portals.
- User manuals (191 pages, four audiences: admin, driver, shipments client, fulfillment client), full of annotated screenshots: `C:\Users\ardjood\Downloads\Client-User-Manual.pdf`.
- The `Frontend App\my_app` folder is an early Flutter driver-app UI prototype (4 screens, mock data, still named `com.example.my_app`). Fine to mention as an early build, but the deck and manuals are the real proof.

#### Honesty flags
- The `Frontend App` folder alone is just an early driver prototype (mock data, no backend). The real platform lives in the deck and manuals. Do not present the prototype as the platform, and do not present the platform's screenshots as if they were the prototype.
- The visible shipment count is about 24,900, not 160,000. If you show a shipment count, use the number that matches the screenshot on screen (about 24,900, or "24,900+"). Keep any larger lifetime claim away from a screenshot that shows the smaller number.
- The deck's marketing stats (35% fewer failed deliveries, 80% less reconciliation, 99.9% uptime, etc.) are sales claims, and several are placeholder `[STAT]` tokens. Do not present them as measured outcomes.
- Not sole or lead architect. Team effort; Ahmed a primary and top contributor.
- "OG Tech" and "Logestechs" are the same platform under two names. Pick one and be consistent.

---

## 7. Other experience and projects (for a full CV site, optional)

- **WaslWeb AI Agency, AI Marketing Automation Engineer (Sep 2024 to Sep 2025), Dubai.** AI B2B prospecting agents that reached 1,000+ leads; WhatsApp and social booking chatbots for clinics and small businesses that drove 45% more appointments and 18% fewer no-shows; an AI marketing stack that auto-handled 350+ Google reviews to a 4.9-star average, reached 30% email reply rates, and cut response times by 60%. (LangChain, RAG, Pinecone, n8n.) `[USER FIGURE]`
- **du (Emirates Integrated Telecommunications), Infrastructure Service Delivery Engineer (Jul to Sep 2024), Dubai.** Improved RF call-handling efficiency by 15% and cut fiber-installation turnaround by 10%.
- **Sharjah Media Bureau, Full-Stack Web Developer (May to Jul 2024), Sharjah.** Grew engagement by 20% with a React and Firebase digital magazine; improved attendance tracking by 30% with a Flutter geolocation app.
- **Project: NeuroFlex, IoT rehabilitation glove (final-year project).** Captures 13 sensor channels of hand movement on an ESP32, streams live to the cloud, drives motor-assisted finger exercises that respond in under a second, with a therapist web portal (live dashboards, patient profiles, therapist-patient chat). (C++/Arduino, ESP32, Firebase, React.) GitHub: github.com/AhmedSoubhi/Neuroflex.

Decision for Ahmed: keep the portfolio a tight three-system showcase (AI agent, Odoo CRM, Logestechs), or add WaslWeb, du, Sharjah, NeuroFlex, and Education to make it a full CV site.

---

## 8. Master numbers table

| System | Measured (safe with visible proof) | Résumé figure (paper only) |
|---|---|---|
| AI sales agent | 7,173 leads, ~88,000 messages, 24,955 AI replies, only 31% needed a human, 41s vs 8.2h reply, 51% off-hours, 4.3x higher win rate with a human, 0.04% dislike rate, 95.1% routing on a 47-case Arabic suite | 21,000+ leads, 74,865 AI replies |
| Conversation intelligence | 2,202 leads gave all 4 qualifying facts, 1,825 strong-buying leads, ~88,000 messages mined for about $5 | 200,000+ messages, 2,200+ ready-to-buy leads, +40% KPI |
| Marketing intelligence | Meta ad sync, top cargo and lanes, channel and campaign attribution | +30% campaign reach and lead quality |
| Odoo CRM + chat | 19 custom modules, 20+ KPIs, 7 stages, 32 restricted items, 23 screenshots, 1,677-line bilingual manual | same |
| OG Tech Operations Suite (Logestechs) | ~24,900 shipments, 438 client businesses, 60 drivers, 102 staff, 32 fulfillment clients, 216 products, 22,430 fulfillment orders, 6 modules, 7 roles (all visible in screenshots) | 160,000+ shipments, 110,000+ customers, 90,000+ COD (do NOT show next to the screenshots) |
| WaslWeb | 1,000+ leads, +45% appointments, -18% no-shows, 30% email reply, 4.9 stars from 350+ reviews, -60% response time | same |

---

## 9. Claims to avoid (read before writing copy)

1. **"Autonomously resolved 69% of conversations."** Not tracked. The real measured proxy is that only 31% of leads ever needed a human. Say "only 31% ever needed a human" or "handled the bulk of conversations without a rep."
2. **"200,000 messages" shown next to the 88k deck.** Use 88,000+ for anything with visible proof.
3. **"95.1% accuracy" with no qualifier.** It is routing accuracy on a small Arabic golden set, not overall answer-correctness.
4. **"Real-time dashboards."** The manager and rep dashboards refresh on load. Only the chat inbox is real-time.
5. **Hot-lead "alerts" or "pings."** The CRM flags and queues; it does not notify or auto-assign.
6. **A shift or end-of-day recap feature.** Does not exist.
7. **"Sole" or "lead" architect** of Logestechs or the Odoo CRM. Both were team efforts; Ahmed was a primary and top contributor.
8. **Specific AI model version names in the body.** Use "OpenAI" plus the capability.
9. **OG Tech / Logestechs: a shipment count of 160,000 (or 110,000 customers, or 90,000 COD) shown next to the screenshots.** The visible production figure is about 24,900 shipments and 438 clients. Use numbers that match the images. Also: do not present the deck's marketing stats (35% fewer failed deliveries, 99.9% uptime, etc.) as measured results, and do not present the early driver prototype as the full platform.
10. **Publishing any hard-coded secret** from the Odoo source.

---

## 10. Approved résumé bullets (current wording, source of truth)

Ocean Gate, Agentic AI and Automation Engineer, Full-Stack Developer (Nov 2025 to Present):
1. Built an AI sales agent that handles customer chats across WhatsApp, Instagram, and Messenger, even turning voice notes and product photos into text it can read, then answers from the company knowledge base only when it is confident and passes anything off-topic, unusual, or uncertain to a human sales rep, so customers never get a made-up reply. (FastAPI, OpenAI, Pinecone, n8n, hand-built Odoo 18 CRM.)
2. Made the company reachable in seconds at any time of day, replying in about 41 seconds on average instead of the 8.2 hours a human used to take, and answering the 51% of messages that arrive outside the sales team's working hours. (n8n, Odoo 18.)
3. Made the agent qualify every lead on its own, reading the full conversation, scoring buying intent, then handing qualified leads to a human and marking them Waiting, flagging the most ready as Hot, and moving each lead through the right stage (Qualified, Review, Lost). (Odoo 18 CRM, OpenAI, LLM structured outputs.)
4. Built an AI conversation-intelligence system that read past customer and sales chat messages and auto-analyzes new conversations into monthly insights, scoring buying intent, revealing why deals are won or lost, measuring rep response and follow-up speed, and flagging high-intent leads going cold. (Python, LLM structured outputs, FastAPI, Odoo.)
5. Engineered a marketing-intelligence layer that turns conversation data into demand and campaign insights (top products and lanes, when and where leads are active, which channels and campaigns drive won, lost, and qualified leads). (LLM analysis, Odoo CRM, PostgreSQL.)
6. Built and customized a clean sales CRM in Odoo 18 where managers evaluate the whole team's KPIs and set targets, tracking the full funnel across 20+ KPIs, with each rep getting their own scoped version, paired with a chatting system that brings WhatsApp, Instagram, and Messenger into one place with assignment, notes, and a per-chat AI toggle. (Odoo 18, Python, OWL, PostgreSQL.)
7. Worked as a main full-stack developer on Logestechs, the company's logistics and delivery platform (Django REST API, React web app, Flutter mobile app), building the full flow from order intake to warehouse fulfillment, driver dispatch and proof of delivery, and cash-on-delivery reconciliation, across 7 user roles. (Django/DRF, React, Flutter, PostgreSQL.)

---

## 11. Suggested portfolio structure (content map)

1. **Hero:** name, the title "Agentic AI and Automation Engineer," Dubai, one line ("I build AI agents and automation that run real sales and logistics operations"), an "open to work" pill, and a photo slot. Primary buttons: View work, Résumé, LinkedIn, GitHub.
2. **Live metric row:** count-up tiles using measured numbers (for example: 88,000+ chat messages handled by AI, 41-second reply, only 31% needed a human, 19 custom Odoo modules, ~24,900 shipments run). Mixing one number from each system reads well.
3. **Case study 1, the AI sales agent:** what it does, the pipeline (a simple diagram of the 7 steps), the confidence-gating idea, the numbers, and proof (the 88K deck, the /playground UI, the golden-eval).
4. **Case study 2, the Odoo CRM and chat:** the problem (from the pitch deck), the three modules, the manager dashboard and per-rep view and chat workspace, with the real screenshots as the hero visuals, plus the honest "how it was built" note (custom OWL, extends stock Odoo, hand-written SQL KPIs).
5. **Case study 3, OG Tech Operations Suite (Logestechs):** the six-module logistics, fulfillment, and accounting platform (plus the OG TECH driver app and branded client portals), being productized for sale to other logistics companies. Use the sales-deck and manual screenshots as the hero visuals, and the honest framing as main full-stack contributor.
6. **The stack:** grouped chips (Agentic AI and LLM, automation and integration, data and vector, full-stack and mobile, cloud and DevOps).
7. **How I work / principles:** honesty about proof, guardrails first, ship to production, measure everything.
8. **About and contact:** short bio, photo, email, phone, LinkedIn, GitHub, and the résumé download.

Design direction chosen by Ahmed: a "Live dashboard" aesthetic (dark, oceanic, cyan accent, count-up metric tiles, subtle motion, a live Dubai clock). The base design to import is his own Claude Design project "Ocean AI Insights" (see the prompt file).

---

## 12. Assets quick reference (absolute paths)

- Résumé (latest): `C:\Users\ardjood\Downloads\Ahmed Soubhi Aljundi Resume.pdf`
- OG-CRM pitch deck (13 slides, Odoo CRM proof): `C:\Users\ardjood\Desktop\OG-CRM — Pitch (EN).pdf` (also in `Downloads`)
- OG Tech Operations Suite sales deck (16 slides, logistics platform proof): `C:\Users\ardjood\Downloads\OG Tech Operations Suite — Sales Deck-english (1).pdf`
- OG Tech Operations Suite user manuals (191 pages, admin + driver + 2 client manuals, many screenshots): `C:\Users\ardjood\Downloads\Client-User-Manual.pdf`
- Odoo CRM manual (also as PDF in Downloads): `C:\Users\ardjood\Downloads\Odoo crm MANUAL-EN.pdf`
- Odoo screenshots (23): `C:\Users\ardjood\Desktop\custom_addons\docs\assets\screenshots\`
- Odoo manual: `C:\Users\ardjood\Desktop\custom_addons\docs\MANUAL-EN.md` and `...\docs\Odoo crm MANUAL-EN.pdf`
- AI chatbot decks: `C:\Users\ardjood\Desktop\AI_chatbot\docs\deck\` and `...\AI_chatbot\.tmp\design_bundle\ai-docs\project\`
- AI chatbot CEO insights: `C:\Users\ardjood\Desktop\AI_chatbot\docs\ceo-insights-from-7173-conversations.md`
- AI chatbot proof screenshots (8): `C:\Users\ardjood\Desktop\AI_chatbot\.tmp\design_bundle\ai-docs\project\screenshots\`
- Logestechs driver prototype: `C:\Users\ardjood\Desktop\Frontend App\my_app\`
- Photo: to be provided by Ahmed (headshot for the hero and about sections).

Still needed from Ahmed to finish the site: the edited headshot photo, a decision on measured vs résumé numbers, confirmation of scope (3 systems vs full CV), and any real production Logestechs screenshots if he wants proof for that platform.
