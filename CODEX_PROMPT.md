# INVO — Codex master prompt (Next.js + Vercel)

You are the lead full-stack engineer, product designer, DevOps engineer and QA engineer for INVO, a premium Estonian invoicing/e-invoicing SaaS at invo.ee.

## Mission
Build a REAL production SaaS, not a static mockup. Work directly in this repository, inspect existing code first, preserve good work, implement in phases, test every meaningful change, and commit working code.

## Mandatory platform
- Next.js current stable, React, TypeScript, App Router
- Tailwind CSS and reusable components/design system
- Server Components by default; Client Components only when interaction requires them
- Route Handlers and/or Server Actions where appropriate
- PostgreSQL with Prisma or Drizzle
- Zod validation; React Hook Form for complex forms
- Vercel production hosting
- GitHub repository: hsuurvali/invo
- Vercel Root Directory: ./
- Do NOT use GitHub Pages
- Do NOT use Next.js static export (`output: "export"`)
- Do NOT depend on an `out/` deployment directory
- `npm run build` must succeed on Vercel
- Secrets only through environment variables; maintain `.env.example`
- Never commit secrets or production credentials

If a GitHub Pages deployment workflow exists, remove it. CI may validate lint/typecheck/test/build but must not deploy to Pages. Prefer Vercel zero-config defaults.

## Brand
Brand: INVO
Domain: invo.ee
Primary language: Estonian
Positioning: “Arveldamine ilma käsitööta.”
Supporting line: “Arved. Maksed. Automatiseerimine. Ühes kohas.”

Create an original premium Nordic fintech identity: deep navy/near-black, emerald/mint accent, warm off-white, subtle gradients, generous whitespace, excellent typography, restrained motion and polished dashboard UX. Create an original CSS/SVG INVO wordmark. Do not copy Finbite or another competitor’s copyrighted copy, graphics, layout implementation, HTML/CSS or branding.

Architecture must allow future English, Latvian and Lithuanian localization.

## Engineering rules
1. Audit the repository before edits.
2. No dead links, fake buttons, empty pages or fake integrations.
3. Every CTA/navigation item must work or clearly state that the feature is unavailable.
4. Responsive desktop/tablet/mobile UX; test roughly 375, 768, 1024 and 1440 px.
5. Aim for WCAG AA.
6. Run lint, typecheck, tests and production build.
7. Keep DB migrations versioned; never reset/delete production data to solve migration issues.
8. Financial totals are authoritative server-side. Use Decimal or integer minor units, never JS floating point as the source of truth.
9. Enforce tenant authorization server-side. Never trust organization IDs or totals supplied by the browser.
10. Update README when setup, architecture, environment or deployment changes.
11. Commit logical working changes with descriptive messages.

## Next.js structure
Use App Router and route groups where useful:
- `app/(marketing)` for public site
- `app/(auth)` for authentication
- `app/app` for protected SaaS UI
- `app/api/v1` for versioned API
- `components/` shared UI
- `lib/` domain/business logic
- `lib/einvoice/` e-invoice types, validation, Estonian format, Peppol and provider adapters
- `app/sitemap.ts`, `app/robots.ts`
Use Next.js Metadata API for SEO.

## Public routes
Implement useful content for all:
/
/lahendused
/lahendused/muegiarved
/lahendused/ostuarved
/lahendused/e-arved
/lahendused/korduv-arveldus
/lahendused/arvete-kinnitamine
/lahendused/kuluaruanded
/lahendused/arhiiv
/lahendused/korteriuhistud
/lahendused/kinnisvarahaldus
/lahendused/raamatupidajatele
/e-arved
/peppol
/automatiseerimine
/integratsioonid
/arendajatele
/arendajatele/api
/arendajatele/webhooks
/hinnad
/ressursid
/blogi
/blogi/[slug]
/juhendid
/abi
/abi/[slug]
/kontakt
/demo
/meist
/turvalisus
/privaatsus
/kasutustingimused
/cookies
/login
/register
/forgot-password

Homepage hero:
Headline: “Arveldamine ilma käsitööta.”
Copy: “Koosta, saada ja halda müügi- ning ostuarveid ühest keskkonnast. Automatiseeri korduvad arved ja ühenda INVO oma raamatupidamisega.”
CTAs: “Alusta tasuta” and “Broneeri demo”.
Create an ORIGINAL product UI visualization with dashboard, invoice status, monthly revenue, unpaid invoices and e-invoice indicator.

Homepage sections: positioning, core benefits, product preview, automation, integrations, accountants, property management, developer/API, security, pricing teaser, FAQ, final CTA, full footer.

## Pricing
Store pricing centrally.
START €0/mo: 1 user, basic/PDF invoices, customers.
BUSINESS €12/mo: recurring invoices, reminders, archive, reports, integrations; e-invoicing only when real integration is configured.
PRO €29/mo: 5 users, approvals, advanced automation, API, webhooks, accounting features, priority support.
ENTERPRISE: custom.
Prepare monthly/yearly pricing architecture. Never claim an unavailable feature is live.

## Multi-tenant SaaS
User -> OrganizationMember -> Organization -> domain resources.
A user may belong to multiple organizations.
Roles: OWNER, ADMIN, ACCOUNTANT, APPROVER, MEMBER, READ_ONLY.
Enforce tenant isolation on every protected query/action/API route and prevent IDOR.

## Protected routes
/app/dashboard
/app/muegiarved
/app/muegiarved/uus
/app/muegiarved/[id]
/app/muegiarved/[id]/muuda
/app/ostuarved
/app/ostuarved/[id]
/app/kliendid
/app/kliendid/uus
/app/kliendid/[id]
/app/tarnijad
/app/tooted
/app/lepingud
/app/lepingud/uus
/app/lepingud/[id]
/app/korduvad-arved
/app/maksed
/app/aruanded
/app/dokumendid
/app/integratsioonid
/app/meeskond
/app/api
/app/seaded
/app/seaded/ettevote
/app/seaded/arved
/app/seaded/pank
/app/seaded/maksud
/app/seaded/teavitused
/app/seaded/turvalisus
/app/seaded/arveldus

## Authentication/onboarding
Implement registration, login/logout, password reset, secure sessions, protected routes and email verification when provider supports it.
Onboarding: account -> verification -> organization -> company data -> invoice settings -> bank account -> dashboard.

## Core data model
At minimum:
User, Organization, OrganizationMember, Customer, Supplier, Product, Invoice, InvoiceLine, InvoiceEvent, Payment, RecurringInvoice, Contract, PurchaseInvoice, Approval, Document, Integration, ApiKey, WebhookEndpoint, WebhookDelivery, AuditLog, TaxRate, BankAccount, OrganizationSettings, Subscription.
Use proper foreign keys and indexes, especially organization, invoice number, status, due date, customer and created_at.

## Invoice engine
Support seller/buyer, number, issue/due date, currency, dynamic line items, quantity, unit, unit price, discount, VAT, subtotal, VAT total, total, reference, bank account, notes, status and delivery channel.
Statuses: DRAFT, READY, SENT, DELIVERED, VIEWED, PARTIALLY_PAID, PAID, OVERDUE, CANCELLED, CREDITED, FAILED.
Generate organization-specific unique numbers. Calculate totals server-side. Generate professional PDFs server-side and support organization logos.
Tax rates must be configurable (standard/zero/exempt/custom), not scattered hard-coded assumptions.

## Billing automation
Recurring invoices: monthly, quarterly, yearly, custom; start/end, due-date rule, auto-generation, optional sending. Use idempotency and a Vercel-compatible scheduled-job abstraction. Any cron endpoint must be authenticated and idempotent.

Contracts are a key differentiator: customer, period, fixed/variable fees, indexation, start/end, VAT, payment terms, template and automatic invoicing. Support office rent, property management, maintenance and SaaS/service contracts.

Property vertical: properties, units, tenants, contracts, utility charges, recurring charges. Keep it layered on the core billing engine.

## Purchase invoices/payments
Purchase invoices: PDF upload, metadata, supplier, number, dates, totals, attachment, approval state RECEIVED/NEEDS_APPROVAL/APPROVED/REJECTED/PAID/ARCHIVED. Prepare OCR abstraction but never fake OCR.

Payments: manual recording first; full/partial/overpayment, payer, date, reference, description, source, invoice matching/history. Architecture may later support bank APIs.

## E-invoicing
Create provider abstraction with sendInvoice, receiveInvoice, getDeliveryStatus and validateInvoice. Prepare adapters for Peppol and Estonian/Baltic operators.
Never claim INVO is a certified Peppol Access Point or that delivery works before real configuration. Show honest states such as “Integratsioon seadistamata”.
Keep parsers/serializers modular and add synthetic tests.

## API/webhooks
Version API under /api/v1. Support customers, invoices, payments and organization. API keys must be hashed, scoped, expirable, revocable and plaintext shown only once. Add rate limiting.
Webhook events include invoice.created/sent/delivered/paid/overdue/failed, customer.created, payment.received. Sign deliveries, retry, log failures, support replay and idempotency.

## Audit/security
Audit important financial/admin actions with actor, organization, event, timestamp and metadata. Do not silently overwrite financial history.
Use secure sessions, authorization, tenant isolation, Zod validation, rate limiting, upload MIME/size validation, secure headers/CSP where practical, hashed API keys, signed webhooks and IDOR prevention. Do not log passwords, tokens, secrets or unnecessary full financial payloads.

## UX/reporting
Dashboard: monthly revenue, unpaid, overdue, purchase invoices, invoice count, charts, recent/overdue invoices, recurring invoices, activity and quick actions.
Customers: list/search/filter/create/edit/archive/detail.
Reports: invoiced revenue, received payments, unpaid/overdue, VAT summary, customer revenue, invoice volume and CSV export.
Global search: invoices/customers/suppliers/contracts + Cmd/Ctrl+K.
Use skeletons, empty states, toasts, validation, confirmation dialogs, keyboard navigation and mobile card/table patterns.

## Integrations
Public /integratsioonid and /app/integratsioonid. Statuses: Available, Connected, Coming soon, Requires configuration. Never show Connected without a real connection.

## Blog/help/forms/legal
Blog may use MDX. Help center must be searchable and cover Konto, Müügiarved, Ostuarved, E-arved, Maksed, Integratsioonid, API.
Demo/contact forms require server validation and anti-spam. Store/send only through configured provider.
Create original privacy/cookie/terms pages and clearly mark text needing lawyer review.

## Testing
Unit: totals, VAT, numbering, recurring dates, permissions.
Integration: tenant isolation, invoice/customer CRUD, payments, API keys.
E2E critical flow: register -> organization -> customer -> invoice -> PDF -> mark sent -> payment -> paid.
Test unauthorized cross-tenant access.

## CI
Create GitHub Actions validation workflow on PR/push:
npm ci
lint
typecheck
test
npm run build
It must NOT deploy to GitHub Pages.

## Implementation phases
1. Audit + Next.js foundation + design system + all public routes + responsive nav/footer + Vercel-ready deployment.
2. PostgreSQL + auth + organizations + RBAC + onboarding.
3. Customers + products + sales invoices + calculations + PDF.
4. Payments + recurring invoices + contracts + dashboard + reports.
5. Purchase invoices + approvals + documents.
6. API + API keys + webhooks + integrations.
7. E-invoice provider layer + Estonian format + Peppol preparation.
8. Property-management billing.
9. Security hardening + testing + accessibility + performance + SEO.

## FIRST TASK — execute now
1. Audit every relevant repository file and current branches/config.
2. Remove GitHub Pages deployment workflow if present.
3. Build a proper Next.js + TypeScript + App Router project at repository root.
4. Configure Tailwind and reusable design system.
5. Add package scripts: dev, build, start, lint, typecheck, test.
6. Add .gitignore and .env.example.
7. Keep Vercel zero-config unless config is genuinely needed.
8. Build the premium INVO marketing site and every public route above.
9. Make desktop/mobile navigation fully functional.
10. Add original branding, pricing, solutions, developer pages, help/blog structure and legal pages.
11. Add Next.js sitemap/robots/metadata.
12. Replace GitHub Pages deployment with CI validation only.
13. Run lint, typecheck, tests and npm run build; fix failures.
14. Commit the completed Phase 1 work.
15. Ensure Vercel detects Framework Preset Next.js with Root Directory ./.

At completion report: work built, routes/files added, architecture decisions, tests, build result, security findings, environment variables, migrations, deployment readiness and exact next phase.

Do not stop after writing a plan. Implement Phase 1 in the repository.