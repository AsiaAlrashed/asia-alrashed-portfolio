# Prompt to paste into a Claude Design session

Copy everything below the line into a new Claude Design chat. It tells the agent to import your existing design project, read the full context file, and build the portfolio. Keep the two files together (`Portfolio - Full Context.md` sits next to this file), because the prompt tells the agent to read it.

Before you paste: make sure the Claude Design session can read local files at `C:\Users\ardjood\Desktop\Portfolio\` and open the PDFs listed under "Assets." If it cannot read local files, attach the context file and the PDFs to the chat instead.

---

## Role and goal

You are a senior product designer and front-end engineer. Build me a personal portfolio website that proves I build real, production AI and full-stack systems. I am Ahmed Soubhi Aljundi, an Agentic AI and Automation Engineer in Dubai. The site's one job: make a hiring manager believe the work is real by showing the actual product screenshots and decks next to honest numbers.

## Step 1: import my existing design as the base

Use the claude_design MCP server to import my design project, then build on it.
- MCP endpoint: `https://api.anthropic.com/v1/design/mcp`
- Authenticate first by running `/design-login`.
- Import this project: `https://claude.ai/design/p/b1dc131a-26d3-426f-a7bd-cfaae459cc25?file=ocean-ai%2FOcean+AI+Insights.html`
- Use `ocean-ai/Ocean AI Insights.html` as the visual base and reference. Match its look, spacing, type, and color system, then extend it into the full multi-section portfolio described below. If the import fails, tell me, and fall back to the design direction described under "Design direction."

## Step 2: read the full context before writing any copy

Read this file for all facts, exact numbers, honesty rules, and asset paths:
`C:\Users\ardjood\Desktop\Portfolio\Portfolio - Full Context.md`

That document is the single source of truth. Everything you write on the site must agree with it. It also lists a "Claims to avoid" section: follow it exactly. If a fact is not in that document or in the assets below, do not invent it.

## Design direction

A "Live dashboard" aesthetic (I already chose this): dark, oceanic background, a single bright accent (cyan or electric blue), count-up metric tiles, a live Dubai clock, subtle scroll-reveal motion, and a monospace touch for labels and numbers. Distinctive display font paired with a clean body font. It should feel like an operator's control tower, not a generic template. Match the imported Ocean AI Insights design first; only deviate where the portfolio needs sections it does not have.

Respect reduced-motion settings. Make it fully responsive (mobile first). Keep it fast and self-contained.

## Page structure to build

1. **Hero:** my name, the title "Agentic AI and Automation Engineer," Dubai, one line ("I build AI agents and automation that run real sales and logistics operations"), an "open to work" pill, and a slot for my photo. Buttons: View work, Résumé, LinkedIn, GitHub.
2. **Live metric row:** count-up tiles using the measured numbers from the context file. Suggested mix, one per system: `88,000+ chat messages handled by AI`, `41-second median reply`, `only 31% needed a human`, `19 custom Odoo modules`, `~24,900 shipments run`.
3. **Case study 1, the AI sales agent ("Haydar"):** what it does, a simple 7-step pipeline diagram, the confidence-gating idea (answers only when sure, else hands off to a human), and the numbers. Proof: the "88,000 Conversations" deck, the CEO insights, the /playground UI, and the golden-eval safety net.
4. **Case study 2, the Odoo 18 CRM, manager control tower, and chat workspace:** open with the problem (from the OG-CRM pitch), then the three modules (Executive Control Tower, per-rep New CRM, chat workspace), using the real Odoo screenshots as hero visuals. Add an honest "how it was built" note (custom OWL components extending stock Odoo, hand-written SQL for KPIs).
5. **Case study 3, OG Tech Operations Suite (also called Logestechs):** the six-module logistics, fulfillment, and accounting platform, plus the OG TECH driver app and branded client portals, now being productized to sell to other logistics companies. Use the sales-deck and manual screenshots as hero visuals. Honest framing: main full-stack contributor on a team.
6. **The stack:** grouped chips (Agentic AI and LLM, Automation and Integration, Data and Vector, Full-Stack and Mobile, Cloud and DevOps). Pull the groupings from the context file.
7. **How I work / principles:** honesty and proof, guardrails first, ship to production, measure everything.
8. **About and contact:** short bio, my photo, email, phone, LinkedIn, GitHub, and a résumé download.

If I want a tighter site, you can fold WaslWeb, du, Sharjah, NeuroFlex, and Education into a compact "More" section, but the three case studies above are the centerpiece.

## Projects section (already designed, reuse it exactly)

I have already built the Projects section for you, in the exact reference layout I want (like andreigorskikh.digital): a huge serif "Projects" heading with a count, then one block per project with a large product image on the left, and on the right a year tag, a serif title, a short first-person description, a "how it is built" line, monospace tag chips, a metrics row, and a horizontal "Infrastructure and proof" gallery strip of screenshots underneath.

- The working section is at `C:\Users\ardjood\Desktop\Portfolio\projects.html`. Read it. Reuse its structure, its copy, its tags, its metrics, and its exact image mapping. Re-skin it to match the imported Ocean AI Insights design system (you may adapt the colors and fonts to the site theme), but keep the reference layout (big image left, text and tags right, year tag, proof-gallery strip).
- All proof images are already rendered into `C:\Users\ardjood\Desktop\Portfolio\assets\`. Use these exact files. Do not invent screenshots.
- The four projects, in order, with their hero image: (1) OG Tech Operations Suite / Logestechs, hero `assets/ogtech-03.png`; (2) Ocean Gate CRM and Chat (Odoo 18), hero `assets/odoo-admin-dashboard.png`; (3) Haydar, the AI sales agent, hero `assets/ai-how-it-works.png`; (4) AI Conversation Intelligence (sales and marketing under one project), hero `assets/ai-88k.png`.
- Asset groups in `assets/`: `ogtech-01..11` (logistics platform deck slides: dashboards, shipments, shipping manager, warehouse, fulfillment, accounting, driver app, client portals), `odoo-*` and `crm-01..10` (the Odoo CRM, chat workspace, per-rep view, AI assistant, train-the-bot, knowledge base), `ai-how-it-works`, `ai-88k`, `ai-lead-staging`, `ai-playground` (the AI agent and the conversation-intelligence decks), and `ai-resync-*` (Pinecone re-sync proof).
- The `*` on "95.1% routing accuracy" in project 3 must keep a small footnote: routing accuracy on a 47-case Arabic test suite, not overall answer-correctness.

## Assets (read these for screenshots and copy)

- The finished Projects section: `C:\Users\ardjood\Desktop\Portfolio\projects.html`, with all its images in `C:\Users\ardjood\Desktop\Portfolio\assets\`.
- Résumé (latest): `C:\Users\ardjood\Downloads\Ahmed Soubhi Aljundi Resume.pdf`
- Odoo CRM proof: pitch deck `C:\Users\ardjood\Desktop\OG-CRM — Pitch (EN).pdf`, manual `C:\Users\ardjood\Downloads\Odoo crm MANUAL-EN.pdf`, and 23 annotated screenshots in `C:\Users\ardjood\Desktop\custom_addons\docs\assets\screenshots\`.
- OG Tech (logistics) proof: sales deck `C:\Users\ardjood\Downloads\OG Tech Operations Suite — Sales Deck-english (1).pdf` and manuals `C:\Users\ardjood\Downloads\Client-User-Manual.pdf`. Pull the module screenshots from these.
- AI agent proof: decks in `C:\Users\ardjood\Desktop\AI_chatbot\docs\deck\` and `...\AI_chatbot\.tmp\design_bundle\ai-docs\project\`, CEO insights `...\AI_chatbot\docs\ceo-insights-from-7173-conversations.md`, and screenshots in `...\AI_chatbot\.tmp\design_bundle\ai-docs\project\screenshots\`.
- My photo: I will provide an edited headshot for the hero and About sections. Leave a clearly marked slot until I hand it over.
- Links: I will provide my final LinkedIn and GitHub URLs. Use `linkedin.com/in/ahmed-soubhi-aljundi` and `github.com/AhmedSoubhi` as defaults until then.
- Résumé button: link to the résumé PDF I choose (I will tell you which file to place in the site folder).

When you use a screenshot as proof, put honest numbers next to it. Do not write a number on the page that a viewer can see is different in the image beside it.

## Content and honesty rules (hard constraints)

1. **No em dashes anywhere.** Use commas, colons, parentheses, or separate sentences.
2. **Plain, simple language.** Assume a non-technical recruiter may read it. Put deep jargon in a small tech tag, not the headline.
3. **Say "OpenAI," never a model version.** Capabilities like "reads voice notes" and "reads photos" are fine.
4. **Use the measured numbers from the context file, not the inflated résumé figures, wherever a screenshot is shown.** Specifically: the AI agent handled about 88,000 messages / 7,173 leads / 24,955 AI replies (not 200,000 or 74,865); the logistics platform shows about 24,900 shipments and 438 clients (not 160,000 / 110,000 / 90,000).
5. **Do not claim:** "autonomously resolved 69%" (say "only 31% ever needed a human"); "real-time dashboards" (only the chat inbox is real-time); hot-lead "alerts" (it flags and queues, it does not notify); a shift or end-of-day recap feature; "sole" or "lead" architect (I was a main and top contributor on team projects). The "95.1%" figure is routing accuracy on a small Arabic test set, always qualify it.
6. **Never publish any secret or token.** Do not paste raw source from my Odoo repo; it contains real production keys. Use screenshots, decks, and manuals as proof, never code with secrets.
7. **Treat the OG Tech sales-deck marketing stats as sales claims, not measured results** (several are placeholder tokens in the deck). Do not present them as my measured outcomes.

## Deliverable

A polished, responsive, self-contained portfolio (a single HTML file with inlined CSS and JS is fine, or a small clean project). Include clearly marked placeholders for my photo, the real screenshots, and my final links, so I can drop them in. Show me the result and tell me exactly which placeholders still need my assets.
