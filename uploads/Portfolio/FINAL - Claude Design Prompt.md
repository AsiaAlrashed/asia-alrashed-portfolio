Build me a personal portfolio website that looks and behaves EXACTLY like the reference site andreigorskikh.digital (same design language, layout patterns, fonts, single-orange accent, and interactions), but with my content. I am Ahmed Soubhi Aljundi, an Agentic AI and Automation Engineer in Dubai. The site's one job is to make a hiring manager believe my work is real by showing actual product screenshots next to honest numbers.

STEP 1, connect and import my design project:
Use the claude_design MCP server. Endpoint https://api.anthropic.com/v1/design/mcp . Authenticate by running /design-login . Import this project for tone and components: https://claude.ai/design/p/b1dc131a-26d3-426f-a7bd-cfaae459cc25?file=ocean-ai%2FOcean+AI+Insights.html . Also look at "How Haider AI Works.html" in the same project for the editorial voice. Then build the full site in the reference's style described below.

STEP 2, read my content and rules from these local files:
- C:\Users\ardjood\Desktop\Portfolio\Portfolio - Full Context.md  (all facts, exact numbers, honesty flags, and the "Claims to avoid" list. This is the single source of truth.)
- C:\Users\ardjood\Desktop\Portfolio\projects.html  (my Projects section, already built in the reference layout with real copy, tags, metrics, and image mapping. Reuse it.)
- C:\Users\ardjood\Desktop\Portfolio\assets\  (all proof images the site uses. Do not invent screenshots.)
Everything you write must agree with the context file.

EXACT DESIGN SYSTEM (copy the reference precisely):
- Fonts, all free on Google Fonts: Instrument Serif for every heading, statement, and giant section name; Geist for body and paragraph text; Geist Mono for all small labels, nav, clocks, tags, years, and meta; Doto for the live clock digits only (a dot-matrix look).
- Colors: white background #FFFFFF, ink #171819, one accent orange #FF5900, muted grey #8A857D, tag-chip grey #EFEBE4 with a hairline border rgba(23,24,25,.12). The hero has a vertical burnt-orange to white gradient (deep #B4531F to #E0662A at the top, fading to white by mid-viewport).
- Type scale (responsive clamp): giant section names ("Projects", "Expertise") clamp(4rem,15vw,12.5rem) in orange with about -0.02em letter-spacing; hero and project titles clamp(2.4rem,5vw,4rem); card titles clamp(1.8rem,3.5vw,2.5rem); small serif section labels about 3rem; body 1.05 to 1.3rem line-height 1.45; mono labels 11 to 18px uppercase with about -0.01em letter-spacing.
- Tag chips: light warm-grey rounded pills with a hairline border and small uppercase Geist Mono text.
- Motion, reproduce the behavior with any tech: live clocks ticking every second in Doto digits; a sticky transparent header whose text flips color between white over the hero and dark ink over white sections (mix-blend-mode difference or a scroll-based swap); smooth eased scrolling; scroll-reveal fade-and-rise with a small stagger as sections enter; a slowly rotating circular badge near the "Projects" title; hover states that scale project images up slightly and lift them, plus link underline or opacity shifts and chip lightening; respect prefers-reduced-motion by disabling reveals and spins.

SECTIONS TO BUILD (same order and patterns as the reference), with my content:

1) Header, sticky and transparent. Left: a small boxed monogram "AS" and the mono word "WORKS". Center: two live clocks, "DUBAI, UAE" (GMT+4) and "BAGHDAD, IRAQ" (GMT+3), with Doto digits and mono AM/PM labels. Right: mono "CONTACT ME" and a round avatar (leave a clearly marked photo slot until I give you my headshot).

2) Hero, full viewport, burnt-orange to white gradient, a faint very-large circle outline behind the center. Centered Instrument Serif statement in white: "Building AI agents and automation that run real sales and logistics operations." Below it, a frosted profile card: a small orange square avatar (photo slot), my name "Ahmed Soubhi Aljundi" in mono, my role "Agentic AI & Automation Engineer" in mono, and an orange "OPEN TO WORK *" label in the card's top-right. Flank the card with tiny orange corner letters A and S. An optional subtle 3D or gradient-blob accent.

3) Work principles, white background. A big centered Instrument Serif statement: "I build production AI and full-stack systems end to end, from the LLM pipeline to the CRM and the dashboards. I work with real, high-volume sales and logistics operations." Then three numbered principle cards in a row (mono number chips 01, 02, 03 with the first in orange; thin card borders; Instrument Serif titles): (01) "Proof over hype, every claim backed by a real screenshot"; (02) "Guardrails first, the AI answers only when it is sure and hands off to a human otherwise"; (03) "Shipped to production and measured, not demos".

4) Projects. This section is ALREADY BUILT for you at C:\Users\ardjood\Desktop\Portfolio\projects.html in this exact reference layout, with real screenshots. Read it and reuse its structure, copy, tags, metrics, and image mapping verbatim, then re-skin it to the imported design. It has four projects, in order: (1) OG Tech Operations Suite / Logestechs, hero assets/ogtech-03.png; (2) Ocean Gate CRM and Chat (Odoo 18), hero assets/odoo-admin-dashboard.png; (3) Haydar, the AI sales agent, hero assets/ai-how-it-works.png; (4) AI Conversation Intelligence, which combines the sales and marketing analysis into one project, hero assets/ai-88k.png. Keep the giant orange "Projects" title with a "(4)" count, the per-project rows (large image left; on the right a mono year tag, an Instrument Serif title, a short first-person description, a "how it is built" line, mono tag chips, and a metrics row), and the "Infrastructure and proof" horizontal gallery strip under each project. Keep the footnote that 95.1% is routing accuracy on a 47-case Arabic test set. All images are in C:\Users\ardjood\Desktop\Portfolio\assets\ ; use those exact files.

5) Expertise. A giant Instrument Serif "Expertise" and a short Geist intro: "I build agentic AI, automation, and full-stack systems for real sales and logistics operations, from RAG pipelines and confidence-gated agents to Odoo CRMs, live dashboards, and mobile apps." Then my stack grouped into chips, using the exact groups from the context file: Agentic AI and LLM, Automation and Integration, Data and Vector, Full-Stack and Mobile, Cloud and DevOps.

6) Work experience. A serif "Work experience" heading and a mono "Proof of work" label, then a list: Ocean Gate, Agentic AI and Automation Engineer (Nov 2025 to Present); WaslWeb AI Agency, AI Marketing Automation Engineer (Sep 2024 to Sep 2025); du, Infrastructure Service Delivery Engineer (Jul to Sep 2024); Sharjah Media Bureau, Full-Stack Web Developer (May to Jul 2024). Agency names in Geist Mono, with years and one-line descriptions taken from the context file.

7) Skillset. A serif heading and skill chips.

8) Footer. Mono social links (LinkedIn, GitHub) plus my email ahmedsoubhi.2002@gmail.com and phone +971 56 270 0521, a "Get in touch" link, and a small scroll-to-top arrow. Use linkedin.com/in/ahmed-soubhi-aljundi and github.com/AhmedSoubhi until I give finals.

CONTENT AND HONESTY RULES (hard constraints):
- No em dashes anywhere in the prose; use commas, colons, parentheses, or separate sentences.
- Plain, simple language; put deep jargon in small tech tags, not headlines.
- Say "OpenAI", never a model version. Capabilities like "reads voice notes" and "reads photos" are fine.
- Use the measured numbers wherever a screenshot is shown: the logistics platform shows about 24,900 shipments and 438 clients (NOT 160,000 / 110,000 / 90,000); the AI agent handled about 88,000 messages and 7,173 leads (NOT 200,000 / 74,865). Never write a number the image beside it contradicts.
- Do not claim "autonomously resolved 69%" (say "only 31% ever needed a human"), "real-time dashboards" (only the chat inbox is real-time), hot-lead "alerts" (it flags and queues, it does not notify), any shift or end-of-day recap feature, or "sole/lead architect" (I was a main and top contributor on team projects). Always qualify 95.1% as routing accuracy on a 47-case Arabic test set.
- Never publish any secret or token, and do not paste raw source from my Odoo repo (it contains real keys). Use screenshots, decks, and manuals as proof, never code with secrets.
- Treat the OG Tech sales-deck marketing stats (99.9% uptime, 35% fewer failed deliveries, etc.) as sales claims, not my measured outcomes.

DELIVERABLE:
A polished, responsive, self-contained portfolio that is visually indistinguishable in style from the reference (same fonts, same orange, same layout and motion), with my content. Include clearly marked placeholders for my headshot and my final LinkedIn and GitHub links, and tell me exactly which placeholders still need my assets.
