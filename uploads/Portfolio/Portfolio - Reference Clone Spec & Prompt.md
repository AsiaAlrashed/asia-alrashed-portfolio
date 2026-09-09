# Clone of andreigorskikh.digital — design spec and Claude Design prompt

This file has two parts. Part A is a deep, verified documentation of the reference site's design (I inspected it live in a browser, reading its real fonts, colors, and structure). Part B is the paste-in prompt for a Claude Design session to rebuild the same site with Ahmed's content.

The reference is built in **Framer**. We are rebuilding the same look and patterns as a clean, hand-coded site (or in Claude Design), not copying its code.

---

# PART A: Design documentation (verified from the live site)

## The feeling
Minimal editorial meets monospace-tech, with one hot accent. Lots of white space, a large elegant serif for anything expressive, a mono typeface for all the small "system" labels, and a single burnt-orange accent that carries the whole brand. It reads like a designer's control panel: live clocks, tiny uppercase mono labels, and giant serif section names.

## Fonts (all free, all on Google Fonts)
- **Instrument Serif** (400, and 400 italic): every heading, every big statement, every section name, every project and card title. This is the personality of the site.
  - Hero statement: 64px, line-height ~1.1, letter-spacing about -0.015em.
  - Giant section names ("Projects", "Expertise"): 200px and up (scale it responsively), letter-spacing about -0.02em, in the orange accent.
  - Project titles and card titles: 64px and 40px.
  - Small section labels ("Works", "Work principles", "Work experience"): 48px.
- **Geist** (400/500/700): body and paragraph text. Descriptions, the manifesto sub-copy, the expertise intro. Around 18 to 21px, line-height ~1.4, color near-black.
- **Geist Mono** (400/700): every small label and "system" element. The nav word "WORKS", the clock labels and AM/PM (GMT) text, the "AVAILABLE FOR WORK" tag, the profile name and role, project years like "(2025)", the grey tag chips, the "Proof of work" label, agency names, footer links. Always uppercase or small-caps feel, tight negative letter-spacing (about -0.01em).
- **Doto** (500/700): used for ONE thing only, the live clock digits (a dot-matrix look), small (about 16px). It makes the clocks feel like a hardware readout.

## Colors
- Background: pure white `#FFFFFF`.
- Ink (near-black): `#171819`.
- Accent orange: `#FF5900` (this is the exact site accent). Used for the giant section names, the year tags, the "AVAILABLE FOR WORK" label, the rotating badge, small dots, and hover accents.
- Muted grey for secondary text: around `#8A857D`.
- Tag chip background: a light warm grey, around `#EFEBE4`, with a hairline border `rgba(23,24,25,.12)`.
- Hero gradient: a vertical burnt-orange to white. Deep, slightly brown-orange at the very top (around `#B4531F` to `#E0662A`) fading down to white by mid-viewport. The header sits on the dark part, so its text is white there and flips to dark ink further down the page.

## Layout and sections (top to bottom)
1. **Sticky header (transparent, blends over the page).** Left: a small square monogram (two boxed letters, "A" and "G") plus the mono word "WORKS". Center: two live clocks, each = a mono city label (e.g. "NOVI SAD, SERBIA"), then two Doto digit boxes for hours and minutes, then mono "AM (GMT+1)". Right: mono "CONTACT ME" and a small round avatar photo. The header uses a blend so its text is white over the dark hero and dark over white sections.
2. **Hero (full viewport).** The burnt-orange to white gradient. A faint very-large circle outline sits behind the center. A centered Instrument Serif statement in white ("Making complex interface design for companies and brands that move forward"). Below it, a frosted "profile card": a small orange square avatar (an emoji-style headshot), the name in mono, the role in mono ("UI-designer, team-lead"), and an orange "AVAILABLE FOR WORK *" label in the top-right of the card. Two tiny orange corner letters (A on the left, G on the right) flank the card. A subtle Spline 3D accent is embedded (optional; can be a CSS gradient blob instead).
3. **Manifesto / Work principles (white).** A big centered Instrument Serif statement ("I design digital products end to end, combining reliable functionality with high-quality UI aligned to brand strategy. I work with agencies and private clients."), with a circled letter A on the far left and G on the far right, and a small orange dot as a divider. Then a three-column row of numbered principle cards: each card has a small mono number chip ("01", "02", "03", the active one in orange), thin card borders, and an Instrument Serif 40px title (for example "Stable qualitate result preventing mistakes", "End-to-end knowledge of digital product creation", "UI shaped by brand identity and strategy").
4. **Projects.** A giant orange Instrument Serif "Projects" (about 200px) with a small mono count "(6)" as a superscript, and a large rotating "©"-style circle badge to the right. Then one row per project: a big product/device mockup on a soft pastel-gradient rounded panel on the left, and on the right a mono year "(2025)" in orange (top-right), an Instrument Serif 64px title, a short Geist description, and a set of grey mono tag chips ("UX-RESEARCH", "UI-DESIGN", "DESIGN SYSTEM", "DEV CONTROL", "WEB-DESIGN"). A "View all" link at the end.
5. **Expertise.** A giant Instrument Serif "Expertise" (about 200px) and a short Geist intro paragraph ("I design websites for e-commerce, Web3, and tech companies, handling full project...").
6. **Work experience.** A 48px Instrument Serif "Work experience" heading, a mono "Proof of work" label, and a list of roles/agencies (agency names in Geist Mono, with years and short descriptions). Reads like a timeline or a set of rows.
7. **Skillset and soft knowledge.** A 48px Instrument Serif heading and a set of skill chips.
8. **Footer.** A row of mono social links (Linked In, Dprofile, Behance, Dribbble, Telegram) on the left, the email on the right, plus "Get in touch", a privacy-policy link, and a small scroll-to-top arrow.

## Type scale (use responsive clamp)
- Giant section name: clamp(4rem, 15vw, 12.5rem), letter-spacing -0.02em, orange.
- Hero and project titles: clamp(2.4rem, 5vw, 4rem).
- Card titles: clamp(1.8rem, 3.5vw, 2.5rem).
- Small serif section labels: ~3rem.
- Body (Geist): 1.05 to 1.3rem, line-height 1.45.
- Mono labels: 11 to 18px, uppercase, letter-spacing -0.01em.

## Motion and interactions (reproduce the behavior, any tech)
- **Live clocks** ticking every second, digits in the Doto font.
- **Sticky header** that visually flips text color between white (over the hero) and dark (over white sections). A `mix-blend-mode: difference` on the header, or a scroll-based color swap, both work.
- **Smooth scrolling** (a Lenis-style eased scroll).
- **Scroll reveals**: sections and project rows fade and rise in with a small stagger as they enter the viewport.
- **The rotating "©" / circular badge** near the Projects title spins slowly.
- **Hover states**: project images scale up slightly and lift; links get an underline or opacity shift; tag chips lighten.
- **A subtle enlarging/magnetic cursor** is optional.
- **Respect prefers-reduced-motion**: disable the reveals and spins.

## Tech notes
- The reference is a Framer site. It loads a Spline 3D viewer for a small accent, and Framer's own motion runtime. You do not need Framer or Spline to reproduce the look. A hand-coded HTML/CSS/JS build (or a Claude Design build) with the fonts and colors above, plus IntersectionObserver reveals and a small smooth-scroll library, reproduces it faithfully.

---

# PART B: Paste this into a Claude Design session

Copy everything below the line. It rebuilds the same site as the reference, with Ahmed's content. Keep this file, the context file, `projects.html`, and the `assets` folder together so the agent can read them.

---

## Goal
Build me a personal portfolio website that looks and behaves EXACTLY like the reference site andreigorskikh.digital (same design language, same layout patterns, same fonts, same single-orange accent, same interactions), but with my content. I am Ahmed Soubhi Aljundi, an Agentic AI and Automation Engineer in Dubai. The design documentation above (Part A) is the spec. Match it precisely.

## Use my existing design project as a starting reference
Use the claude_design MCP server. Endpoint `https://api.anthropic.com/v1/design/mcp`. Authenticate by running `/design-login`. Import this project for tone and components: `https://claude.ai/design/p/b1dc131a-26d3-426f-a7bd-cfaae459cc25?file=ocean-ai%2FOcean+AI+Insights.html`. Also look at `How Haider AI Works.html` in the same project for the editorial voice. Then build the full site in the reference's style.

## Exact design system to use (from the reference)
- Fonts (Google Fonts): **Instrument Serif** for all headings, statements, and section names; **Geist** for body text; **Geist Mono** for all small labels, nav, clocks, tags, years, and meta; **Doto** for the live clock digits only.
- Colors: white background `#FFFFFF`, ink `#171819`, single accent orange `#FF5900`, muted grey `#8A857D`, tag-chip grey `#EFEBE4` with a hairline border. Hero has a vertical burnt-orange to white gradient.
- Keep the type scale, the mono uppercase labels with tight letter-spacing, the giant serif section names in orange, and the grey mono tag chips.
- Reproduce the motion: live clocks, sticky header that flips text color over dark vs light sections, smooth scroll, scroll-reveal fade-and-rise with stagger, a slowly rotating circular badge near "Projects", hover scale on project images, and prefers-reduced-motion support.

## Sections to build (same order and patterns as the reference), with my content

1. **Header (sticky, transparent).** Left: a boxed monogram "AS" and the mono word "WORKS". Center: two live clocks, "DUBAI, UAE" (GMT+4) and "BAGHDAD, IRAQ" (GMT+3), with Doto digits. Right: mono "CONTACT ME" and a round avatar (leave a clearly marked photo slot until I give you my headshot).

2. **Hero (full viewport, burnt-orange to white gradient).** Centered Instrument Serif statement in white: "Building AI agents and automation that run real sales and logistics operations." Below it, a frosted profile card: a small orange square avatar (photo slot), my name "Ahmed Soubhi Aljundi" in mono, my role "Agentic AI & Automation Engineer" in mono, and an orange "OPEN TO WORK *" label in the card's top-right. Flank it with tiny orange corner letters A and S. Optional subtle 3D or gradient-blob accent.

3. **Work principles (white).** A big centered Instrument Serif statement: "I build production AI and full-stack systems end to end, from the LLM pipeline to the CRM and the dashboards. I work with real, high-volume sales and logistics operations." Then three numbered principle cards (mono number chips 01/02/03, serif titles): (01) "Proof over hype, every claim backed by a real screenshot"; (02) "Guardrails first, the AI answers only when it is sure and hands off to a human otherwise"; (03) "Shipped to production and measured, not demos".

4. **Projects.** THIS SECTION IS ALREADY BUILT for you at `C:\Users\ardjood\Desktop\Portfolio\projects.html`, in this exact reference layout, with real screenshots. Read it and reuse its structure, copy, tags, metrics, and image mapping verbatim. It has four projects: (1) OG Tech Operations Suite (Logestechs), (2) Ocean Gate CRM and Chat (Odoo 18), (3) Haydar the AI sales agent, (4) AI Conversation Intelligence (sales and marketing under one project). All images are in `C:\Users\ardjood\Desktop\Portfolio\assets\`. Keep the giant orange "Projects" title with the "(4)" count, the per-project rows (big image left, year and title and description and tag chips right), and the "Infrastructure and proof" gallery strip under each. Keep the footnote that 95.1% is routing accuracy on a 47-case Arabic test set.

5. **Expertise.** A giant Instrument Serif "Expertise" and a short Geist intro: "I build agentic AI, automation, and full-stack systems for real sales and logistics operations, from RAG pipelines and confidence-gated agents to Odoo CRMs, live dashboards, and mobile apps." Then the stack grouped into chips (pull the exact groups from the context file: Agentic AI and LLM, Automation and Integration, Data and Vector, Full-Stack and Mobile, Cloud and DevOps).

6. **Work experience.** A serif "Work experience" heading and a mono "Proof of work" label, then a list: Ocean Gate, Agentic AI and Automation Engineer (Nov 2025 to Present); WaslWeb AI Agency, AI Marketing Automation Engineer (Sep 2024 to Sep 2025); du, Infrastructure Service Delivery Engineer (Jul to Sep 2024); Sharjah Media Bureau, Full-Stack Web Developer (May to Jul 2024). Agency names in Geist Mono, with years and one-line descriptions from the context file.

7. **Skillset.** A serif heading and skill chips.

8. **Footer.** Mono social links (LinkedIn, GitHub) plus my email `ahmedsoubhi.2002@gmail.com` and phone `+971 56 270 0521`, a "Get in touch" link, and a scroll-to-top arrow. Use `linkedin.com/in/ahmed-soubhi-aljundi` and `github.com/AhmedSoubhi` until I give finals.

## Content source and honesty rules
- Read `C:\Users\ardjood\Desktop\Portfolio\Portfolio - Full Context.md` for all facts, exact numbers, and the "Claims to avoid" list. Everything on the site must agree with it.
- Hard rules: no em dashes anywhere in the prose (use commas, colons, parentheses); plain simple language; say "OpenAI", never a model version; use the measured numbers wherever a screenshot is shown (about 24,900 shipments and 438 clients for the logistics platform, about 88,000 messages and 7,173 leads for the AI agent, NOT the inflated résumé figures); do not claim "autonomously resolved 69%", "real-time dashboards", hot-lead "alerts", any shift or recap feature, or "sole/lead architect"; always qualify 95.1% as routing accuracy on a 47-case Arabic test set; never publish any secret or raw source code.

## Deliverable
A polished, responsive, self-contained site that is visually indistinguishable in style from the reference (same fonts, same orange, same layout and motion), with my content. Mark clearly which placeholders still need my headshot and my final links.
