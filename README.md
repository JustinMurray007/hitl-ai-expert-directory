# Human in the Loop (HITL) — AI Specialist Directory

> The verified directory of AI specialists who build systems with real human accountability.

Built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Server Actions**, **PostgreSQL (Supabase)** with Row Level Security, and strict 2-case-study verification gates.

---

## ⚡ Quick Start (Local Demo Mode)

With no Supabase environment variables set, the application automatically runs in **Demo Mode** against clearly-labeled fictional seed data. You can browse the directory, test category and tool filters, submit an application, submit a founder match request, and test the full admin review workflow locally.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). A yellow **Demo mode** banner appears in the header whenever demo data is active.

---

## 🚀 Connecting Real Data (Supabase)

1. Create a PostgreSQL project on [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and paste the contents of [`db/schema.sql`](file:///c:/Users/Meerkat/Desktop/ai%20expert%20directory/db/schema.sql). Run the script to create tables, enums, triggers, RLS policies, and seed data.
3. Configure your `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Server-side only
   ADMIN_REVIEW_TOKEN=your-secure-admin-token
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
4. Restart `npm run dev`. The demo banner disappears and all reads/writes hit your Supabase instance.

---

## 📐 Architecture & Security

```
Next.js 15 (App Router)  ─┐
  ├─ Static + SSG pages   │
  ├─ Tailwind CSS         │
  ├─ Server Actions       │
  └─ /api routes          │
                          ▼
                  Supabase (Postgres)
                  ├─ public: experts, categories, tools, case_studies
                  ├─ private: applications, match_requests, review_notes
                  └─ RLS: public read-only, server-write only
```

- **Separation of Concerns:** Publication, verification, and sponsorship are three independent dimensions. Payment never confers verification.
- **Strict Verification Gate:** Setting an expert to `Verified` requires at least **two reviewer-confirmed production case studies** with demonstrable human oversight.
- **Private Data Protection:** Applicant contact emails, legal entity details, private repositories, and reviewer notes live in private tables (`applications`, `match_requests`) with zero anonymous RLS read policies.

---

## 🗺️ Routes & Pages

| Route | Description |
|---|---|
| `/` | Homepage with positioning, categories, verified specialists, and comparison matrix |
| `/experts` | Searchable directory with category, tool stack, budget, and verification filters |
| `/experts/[slug]` | Individual specialist profile with case studies & HITL oversight mechanism |
| `/categories/[slug]` | Category hub with taxonomy metadata, typical stack, and specialists |
| `/apply` | Multi-section specialist application with mandatory human guardrail disclosure |
| `/match` | Private founder concierge matchmaking intake form |
| `/admin` | Administrative review queue with token authentication & verification gate |
| `/about` | The HITL Standard, two-case-study rule, and pricing hypothesis |
| `/api/experts` | Public REST API endpoint for filtering published specialists |
| `/api/categories` | Public REST API endpoint for category hubs taxonomy |
| `/api/apply` | Intake API endpoint for specialist submissions |
| `/api/match` | Intake API endpoint for founder matchmaking inquiries |
| `/api/health` | System health and configuration check |
| `/sitemap.xml`, `/robots.txt` | Dynamic SEO plumbing (demo profiles automatically excluded) |

---

## 🔐 Administrative Review Access

Visit `/admin` to access the review queue:
- **Default Local Secret:** `hitl-admin-secret-2026`
- **Actions:** Publish, reject, archive, adjust sponsor rank, confirm case studies, and apply verified status.
