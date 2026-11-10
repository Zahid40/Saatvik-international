# Architecture

Next.js is accepted. Everything else here is proposed: see `decisions.md`. Use current stable versions at scaffold time and record them here.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS v4 and shadcn/ui (Base Nova) with tokens from `design-system.md` |
| Content | Typed files in `content/` |
| Validation | Zod, shared by client and server |
| Lead storage | Google Sheet through a service account |
| Email | Resend (needs a verified domain, so depends on Q1) |
| Spam | Honeypot, Cloudflare Turnstile, rate limit |
| Hosting | Vercel |
| Analytics | GA4 with Vercel Analytics |

## Rendering

- All marketing, category and product pages are statically generated with `generateStaticParams`.
- `/enquiry` is a static shell with a client-side list.
- The only server code is the enquiry submission.
- Client components are limited to the enquiry list, forms, mobile menu and any gallery.

## Proposed structure

```
src/
  app/
    (marketing)/          home, about, contact, services, legal
    products/             [category]/[product]
    enquiry/              list, form, thank-you
    actions/enquiry.ts    server action
    sitemap.ts  robots.ts
  components/             ui/, layout/, product/, enquiry/
  lib/
    catalog.ts            read and filter content; blocks drafts in production
    enquiry/              schema.ts, store.ts, notify.ts, whatsapp.ts
    seo.ts                metadata and JSON-LD helpers
content/                  categories.ts, products/*.ts, certifications.ts, company.ts
public/brand/             web-ready logo files
assets/brand/             source files, not served
```

`content/company.ts` is the single place for phone, email, address and GST. Do not hardcode them in components.

## Environment variables

Document every one in `.env.example`.

```
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
LEADS_SHEET_ID
RESEND_API_KEY
ENQUIRY_NOTIFY_TO
ENQUIRY_FROM
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_TURNSTILE_SITE_KEY
NEXT_PUBLIC_GA_ID
NEXT_PUBLIC_SITE_URL
```

## Testing

- Unit: enquiry schema, reference generation, WhatsApp message builder, draft filtering.
- Integration: failed email still stores the lead; failed storage shows the fallback to the buyer.
- End to end: add products, submit enquiry, see thank-you page. Also test on a mobile viewport.
