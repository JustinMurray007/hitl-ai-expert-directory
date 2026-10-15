Human in the Loop — Launch Strategy & Implementation Plan
Status: Draft for build session — Oct 2026
Brand: "Human in the Loop" (HITL) — tentative; confirm trademark/domain before committing.

1. Positioning
Tagline: The verified directory of AI specialists who build systems with real human accountability.
One-line pitch: A directory of AI experts for SMBs where every listed expert must prove how a human stays in the loop — not just what model they wired up.
Core differentiator (vs Upwork / Clutch / generic AI directories):
Every listed profile must answer one mandatory field no other directory enforces:
"What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case?"
This is the single trust moat. It filters out prompt-wrapper agencies before they ever get listed.

2. Target Personas
Buyer: "Burned-out Founder" (primary)
SMB owner / solo operator, 5–50 employees, non-technical
Problem: wants AI automation for lead intake, reporting, support, or SOPs
Fear: handing brand reputation to a hallucinating black box or being abandoned by a consultant after go-live
Search intent: operational bottlenecks ("invoice extraction", "24/7 lead response"), not "LangChain engineer"
Seller: "Accountable AI Specialist" (secondary)
Fractional AI ops consultant, small automation agency, or senior automation architect
Wants qualified SMB leads, not Upwork race-to-the-bottom bidding
Differentiates on reliability, guardrails, and post-launch maintenance — not just speed

3. Category Taxonomy (how buyers search)
#
Category (slug)
Buyer problem
Typical stack
1
Operations & Workflow Automation (operations-workflow-automation)
CRM syncing, invoice processing, PDF extraction, internal handoffs
Make, Zapier, n8n, OpenAI/Anthropic, Supabase
2
Sales & Lead Qualification (sales-lead-qualification)
24/7 inbound response, call routing, lead scoring, outreach triage
Bland.ai, Vapi, Retell, Twilio, HubSpot, Zoho
3
Customer Support & Knowledge Bases (customer-support-knowledge-base)
FAQ accuracy from internal docs, ticket triage
RAG, Pinecone, Chatbase, Zendesk AI
4
Marketing & Programmatic Content (marketing-programmatic-content)
Review generation, local SEO workflows, automated estimate follow-ups
Google Workspace, GA4/GTM, GoHighLevel
5
Executive & Personal AI Ops (executive-personal-ai-ops)
Scheduling, email triage, meeting action-item digestion, personal SOPs
Claude, Gemini Workspaces, Perplexity, Cursor/Ollama

Rule: Experts can select at most 3 categories. Keep taxonomy flat at launch — no nested industry × location × tool fan-out.

4. Listing Tiers & Vetting
Tier
Cost
What it includes
Vetting bar
Community (Basic)
Free
Public profile, tool tags, portfolio links, booking CTA
Auto-approval on publish (self-reported)
Verified HITL Expert
Paid (TBD)
Verified badge, top-of-category placement, featured in newsletter, direct matchmaking eligibility
Identity + entity check, ≥2 reviewed production case studies, guardrail interview
Featured / Sponsor Spotlight
Premium monthly
Pinned top of category hub, newsletter feature
Requires Verified tier + active sponsorship

Pricing is a hypothesis, not a commitment. Suggested starting points from the brief: $29–$79/mo verified; $199/mo featured. Test with first 10 experts before publishing a rate card.
Two case studies rule
Verification requires two reviewed production implementations with quantifiable outcomes and a demonstrable human-oversight mechanism. An applicant may submit with one to start; verification is not granted until the second is reviewed. (The application form asks for the strongest one first.)
Vetting checklist (applied before granting Verified)
1. Guardrail verification — expert articulates a concrete human fallback (approval queue, Slack webhook, confidence threshold routing, exception quarantine). "100% autonomous / zero-touch" = automatic rejection.
2. Entity & identity — active domain, real LinkedIn, verifiable business registration.
3. Execution artifact — Loom demo, code repo, or detailed architecture walkthrough of a live workflow.

5. Tech Architecture
Next.js 15 (App Router)  ─┐
  ├─ Static + SSG pages   │
  ├─ Tailwind CSS         │
  ├─ Server Actions       │
  └─ /api routes          │
                          ▼
                  Supabase (Postgres)
                  ├─ public: experts, categories, tools, case_studies
                  ├─ private: applications, review_notes
                  └─ RLS: public read-only, server-write only

Demo mode: If SUPABASE_URL is unset, the app runs against an in-memory/file-backed seed store so the UI and review workflow are fully exercisable locally. This is disclosed in the footer and never indexed.
Search/facets: Client-side fuzzy filter is sufficient under ~500 listings. Plan: add Typesense/Algolia only when inventory justifies it.
SEO plan (foundations only, this build):
robots.txt, sitemap.xml, canonical URLs, OpenGraph/Twitter meta
Programmatic hub template for each category (/experts/[category])
Individual profile pages (/experts/[category]/[slug])
Long-tail industry/tool/location pages are deferred until real inventory and substantive content exist. No mass page generation in MVP.

6. Monetization (phased)
Phase
Revenue
Rationale
1 (now)
None — free listings to seed inventory
Trust + volume first
2
Verified tier subscription
Gate behind demonstrated value
3
Featured/sponsor tier
Once category hubs have traffic
4
Concierge matchmaking
Founder submits need → we shortlist 2 verified experts → intro retainer or % fee

Sponsorships (voice AI vendors, automation platforms) are a Phase 3+ opportunity once traffic proves category hubs have an audience.

7. Phased Launch Checklist
Phase 0 — Foundations (this build)
[x] Strategy doc
[x] Supabase schema (corrected — see db/schema.sql)
[x] Next.js project scaffold, Tailwind, base components
[x] Home page, category hubs (/categories/[slug]), expert profile pages, apply form, matchmaking intake
[x] Admin review view (publish/reject/verify/archive) with fail-closed token auth + session cookie
[x] Seed categories + tools + fictional demo experts (clearly labeled)
[x] Demo vs. connected mode toggle
[x] Server-side verification gate: 2 reviewer-confirmed case studies required
Phase 1 — Go live with inventory
[ ] Create Supabase project, run migration
[ ] Manually onboard 5–10 real experts (personal outreach, comp'd listings)
[ ] Replace demo data with real listings
[ ] Point domain, deploy (Vercel recommended)
Phase 2 — Revenue & verification at scale
[ ] Stripe integration for Verified tier
[ ] Admin dashboard for reviewer notes, evidence audit trail
[ ] Newsletter + matchmaking intake go live
[ ] Add real testimonials and reference links
Phase 3 — Programmatic SEO
[ ] Only after 20+ verified experts per category hub
[ ] Generate long-tail pages with substantive, non-thin content
[ ] Add Typesense/Algolia if inventory exceeds ~500 listings

8. Risks & Mitigations
Risk
Mitigation
Cold-start (no experts)
Comp first 10–20 listings; run founder interviews as content
Trust collapse from bad actors
Strict two-case-study + guardrail-interview verification; publish rejection criteria
Thin-content SEO penalty
Do not ship programmatic pages until inventory + real copy exist
"Human in the Loop" trademark conflict
Run clearance search before any paid domain/marketing spend
Dependency on Supabase
Keep data layer abstracted (single store.ts interface) so swap-out is cheap


9. Files & Structure
hitl/
├── STRATEGY.md           ← this doc
├── db/
│   └── schema.sql        ← corrected Postgres/Supabase schema
├── next.js app (app/)
│   ├── page.tsx          ← home
│   ├── experts/
│   │   ├── page.tsx      ← directory (filters)
│   │   └── [slug]/page.tsx ← expert profile
│   ├── categories/
│   │   └── [slug]/page.tsx ← category hub
│   ├── apply/            ← expert application intake
│   ├── match/            ← founder matchmaking intake
│   ├── admin/            ← private review queue
│   └── api/              ← server actions / routes
├── src/
│   ├── lib/
│   │   ├── store.ts      ← Supabase or demo-mode data layer
│   │   ├── validation.ts ← zod schemas
│   │   └── seed.ts       ← fictional demo data (labeled)
│   └── components/       ← UI
└── README.md             ← setup, run, deploy instructions
