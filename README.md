# Human in the Loop (HITL) — AI Specialist Directory

> The verified directory of AI specialists who build systems with real human accountability.

Built with **Next.js (App Router)**, **Tailwind CSS**, **PostgreSQL (Supabase)** with Row Level Security, and Stripe Billing for specialist listings. Case studies are not required to be listed.

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
   ADMIN_REVIEW_TOKEN=          # required; no default. A long random value.
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
4. Restart `npm run dev`. The demo banner disappears and all reads/writes hit your Supabase instance.
5. For billing columns and the referral ledger, also run [`db/migration_stripe_billing.sql`](db/migration_stripe_billing.sql) if the database was created before that migration.

---

## Stripe billing

Specialist plans use Stripe-hosted Checkout in subscription mode (flexible billing). The free 30 days are tracked in the app. No card is collected at signup, and there is no Stripe trial. Paying during those 30 days starts the paid plan immediately. After day 30 without a plan, or when a subscription ends, the listing becomes limited (no website, social, contact, or match eligibility).

The public site is a static export. Checkout, the Customer Portal, webhooks, and the day-30 limiter are Cloudflare Pages Functions in `functions/api/stripe/`. They use the Stripe Node SDK's fetch HTTP client and `constructEventAsync` so they can run on the edge.

Use a **restricted API key** (`rk_test_…` in a [Stripe sandbox](https://docs.stripe.com/sandboxes), `rk_live_…` only in production). Do not use a secret key (`sk_`) if a restricted key can do the job. Suggested permissions: Checkout Sessions write, Customers write, Subscriptions write, Billing Portal sessions write, Prices read, Products read, Invoices read.

| Variable | Secret? | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | Yes | Restricted key. Cloudflare secret. Never in git. |
| `STRIPE_WEBHOOK_SECRET` | Yes | `whsec_…` for `POST /api/stripe/webhook`. |
| `STRIPE_AUTOMATIC_TAX` | No | Default `false`. This build never sends `automatic_tax.enabled`, even if the value is `true`, until a Stripe Tax registration is active. Prices are tax-exclusive. |
| `NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED` | No | `true` only when the server key is set. Plan buttons start checkout only when the URL has `?expert=<expert uuid>`. Otherwise they scroll to the application form. |
| `NEXT_PUBLIC_SITE_URL` | No | Success, cancel, and portal return URLs. |
| `CRON_SECRET` | Yes | Bearer token for `POST /api/stripe/limit-expired`. |
| `CLOUDFLARE_DEPLOY_HOOK_URL` | Yes | Pages deploy hook. Rebuilds the static site after a public listing change. |

The public site is a static export, so a newly published, upgraded, downgraded, or expired listing shows up on the next build. Pages Functions POST `CLOUDFLARE_DEPLOY_HOOK_URL` when:

- an admin review publishes a listing or changes verification (`updateExpertReviewStatus`)
- the Stripe webhook writes `listing_plan` or `profile_mode`
- `POST /api/stripe/limit-expired` flips profiles to limited (the manual `scripts/limit-expired-listings.ts` script does the same)

Create the hook in the Cloudflare Pages project: **Settings → Builds → Deploy hooks**, branch **`master`**. Copy the URL into an encrypted Production environment variable named `CLOUDFLARE_DEPLOY_HOOK_URL` (Settings → Environment variables). Do not commit it. Functions read it from `context.env` at runtime; the static build does not need it.

If the variable is unset, those actions log `[deploy-hook] skipped` and continue. If the POST fails, they log the failure and still return success. A burst of changes inside 90 seconds collapses to one build: the function claims the window in memory, and Pages Functions in the same location also share that claim through the Workers Cache API. A failed POST drops the claim so the next change can retry.

Subscribe the webhook endpoint to: `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`, and `charge.refunded` (referral reversals).

Create the sandbox catalog (not run by the build):

```bash
STRIPE_SECRET_KEY=rk_test_... npx tsx scripts/create-stripe-catalog.ts
```

The script rejects live keys. Extra categories are $9.99/month (`extra_category_monthly`) or $79/year (`extra_category_yearly`). Referral commissions are 30% of the invoice pre-tax amount, stored in `referral_ledger` for manual payout. Stripe Connect is not used.

One more thing: if you later charge US customers tax, Stripe Tax only collects where you have an active registration. Do not turn on automatic tax before that. See [Collect taxes for recurring payments](https://docs.stripe.com/billing/taxes/collect-taxes.md).

### Apply first, then pay

A visit to `/apply` with no expert id does not open Checkout. The plan buttons say **Apply free first** and go to the form. Checkout runs only from a personal pay link:

```text
https://findaipros.com/apply?expert=<expert uuid>#pricing
```

`personalPayLink(expertId)` in `src/lib/billing/pay-link.ts` builds that URL for reminder emails. Replace `<expert uuid>` with `experts.id` for that applicant.

After the form is submitted, Tally should redirect to `/apply/thanks` with the Submission ID. In the form **Nq5NDp** settings, turn on **Redirect on completion** and set:

```text
https://findaipros.com/apply/thanks?submissionId=
```

Click at the end of that URL, type `@`, and choose **Submission ID** (Tally’s label: “Unique identifier of a response”). Do not type the id by hand. The thanks page also accepts `?responseId=` for the same value. It looks up only that submission and links to the personal pay URL. If the webhook has not stored an expert yet, the page says the free listing is being reviewed and that a personal pay link will come by email.

No new database migration is required. The lookup uses `tally_submissions.response_id` and `tally_submissions.submission_id`. If a paid Checkout Session still arrives with no `expert_id`, the webhook matches `customer_details.email` to exactly one `applications.contact_email`. Zero matches or more than one expert are logged as `stripe_checkout_unlinked` and left for a manual fix.

---

## 📐 Architecture & Security

```
Next.js 16.4.1 (App Router)  ─┐
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

- **Separation of Concerns:** Publication and sponsorship are separate from payment. The `is_verified` column remains in the database and is not shown on the site.
- **References:** Case studies are not required to be listed. When an application record exists, a reference we can contact is still required before an admin marks the row verified. Payment does not change that.
- **Private Data Protection:** Applicant contact emails, legal entity details, private repositories, and reviewer notes live in private tables (`applications`, `match_requests`) with zero anonymous RLS read policies.

---

## 🗺️ Routes & Pages

| Route | Description |
|---|---|
| `/` | Homepage with positioning, categories, specialists, and comparison matrix |
| `/experts` | Searchable directory with category, tool stack, and budget filters |
| `/experts/[slug]` | Individual specialist profile with case studies & HITL oversight mechanism |
| `/categories/[slug]` | Category hub with taxonomy metadata, typical stack, and specialists |
| `/apply` | Specialist application. A new profile is free for 30 days. Listing prices sit above the form. Checkout starts only from `?expert=<expert uuid>`. |
| `/apply/thanks` | Page Tally redirects to after submit. Resolves that submission to a personal pay link. |
| `/match` | Private founder concierge matchmaking intake form |
| `/admin` | Private review page. Cloudflare Pages requires `ADMIN_REVIEW_TOKEN` before the HTML is served. |
| `/about` | Accountability standard, references requirement, and listing prices |
| `/api/experts` | Public REST API endpoint for filtering published specialists |
| `/api/categories` | Public REST API endpoint for category hubs taxonomy |
| `/api/apply` | Intake API endpoint for specialist submissions |
| `/api/match` | Intake API endpoint for founder matchmaking inquiries |
| `/api/health` | System health and configuration check |
| `/sitemap.xml`, `/robots.txt` | Dynamic SEO plumbing (demo profiles automatically excluded) |

---

## 🔐 Administrative Review Access

`/admin` is not linked from the public site. On Cloudflare Pages, `functions/_middleware.ts` refuses the route unless `ADMIN_REVIEW_TOKEN` is set, then asks for that token before serving the page. Review actions in the data layer use the same variable and fail when it is missing. Set a long random value in the Cloudflare Pages environment. Do not commit it.
