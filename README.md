# INVO

Premium Estonian invoicing SaaS. Phase 1 is a public marketing site built with Next.js App Router, React, TypeScript and Tailwind CSS.

## Local development

Node.js 22 or newer. Run `npm ci` then `npm run dev`. Validate with `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`.

## Deployment

Import `hsuurvali/invo` into Vercel. Framework Preset: Next.js. Root Directory: `./`. No static export or custom output directory. The public Phase 1 site needs no environment variables. `.env.example` documents future configuration.

## Scope and architecture

Public pages are defined in `lib/content.ts`; shared layout and components live in `components/`. Prices are stored centrally. The dashboard is an illustration with sample data. The contact and demo forms prepare a message in the visitor's email application; there is no server-side submission or booking provider yet. Cookie preferences are saved in browser local storage; analytics and marketing trackers are not installed. The help panel searches curated local links and its messages view states that live chat is unavailable. Authentication, database, real invoicing, payment processing, e-invoice delivery and integrations are not yet available. Public pages state these limits explicitly. No user data is collected on the server.

Phase 2 adds PostgreSQL, secure authentication, organizations, membership roles and onboarding. Follow with customer and invoice domain models, server-side financial calculations and PDFs. Legal content requires counsel review before service launch.

