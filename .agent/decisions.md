# Decision log

`Accepted` means fixed by the client or the team. `Proposed` means the default plan, still awaiting team sign-off.

| # | Decision | Status | Why | Revisit if |
|---|---|---|---|---|
| 1 | Enquiry website, not e-commerce | Accepted (client, 2026-11-06) | Prices and orders are negotiated per business | Client asks for retail sales |
| 2 | Three main categories: Makhana, Puffs, Freeze-Dried Fruits | Proposed | Product notes are newer and more specific than the profile | Client answers Q7 |
| 3 | Website built with Next.js | Accepted (team, 2026-11-06) | Static output suits SEO; small server surface for enquiries | |
| 4 | Catalogue stored as typed files in the repo; no CMS in v1 | Proposed | About 10 to 15 products that change rarely; no CMS cost or setup | Client wants to edit products without a developer |
| 5 | Multi-product enquiry list held in the browser, plus a single-product quick enquiry | Proposed | Buyers often source several lines; it gives a cart-like flow with no order logic | Analytics show the list is unused |
| 6 | Leads saved to a Google Sheet, then emailed | Proposed | Client can view leads with no admin panel to build; durable if email fails | Volume or access control outgrows a Sheet (see `knowledge/approaches.md`) |
| 7 | WhatsApp is a parallel enquiry channel | Proposed | Normal for Indian B2B trade; depends on Q3 | Number is not on WhatsApp |
| 8 | English only in v1 | Proposed | Common language of trade for the target buyers | Client names markets that need another language |
| 9 | `.agent/` guidance structure, with `AGENTS.md` as entry point | Accepted (team, 2026-11-06) | Tool-neutral guidance modelled on Vercel eve's layout | |
| 10 | Next.js setup: App Router, TypeScript, Tailwind CSS, hosted on Vercel | Proposed | Current Next.js defaults; Vercel is the simplest host for it | Client has a hosting constraint |
