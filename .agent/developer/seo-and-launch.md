# SEO and launch

## SEO

Makhana is the lead term, in line with the Google listing. Search volumes have not been researched, so validate keywords with a tool before writing final copy.

| Page | Target intent |
|---|---|
| Home | makhana supplier, healthy snacks wholesaler, Pune |
| Makhana | makhana supplier India, fox nuts wholesale, bulk makhana |
| Raw makhana | raw makhana by grade, makhana sizes |
| Flavoured makhana | flavoured makhana bulk, private label |
| Puffs | jowar, quinoa, chickpea and millet puffs wholesale |
| Freeze-dried fruits | freeze dried fruit supplier India |
| Private label | private label makhana, snack private label India |
| Export | makhana exporter India (use only if truthful, see Q14) |

Technical basics:

- Unique title and description per page, canonical URLs, generated `sitemap.xml` and `robots.txt`
- JSON-LD: `Organization`, `LocalBusiness` and `BreadcrumbList`, plus `FAQPage` where FAQs are visible
- Do not use `Product` schema with fake offers. No prices exist, so do not invent an `Offer`
- Name, address and phone must match the Google listing exactly
- Update the Google Business Profile with the website URL after launch

## Performance

Targets on mobile: LCP under 2.5s, INP under 200ms, CLS under 0.1. Use `next/image` with explicit sizes, self-hosted fonts and minimal client JavaScript.

## Launch gates

Do not launch until all are true.

**Client**
- [ ] Domain registered and connected (Q1)
- [ ] Enquiry routing agreed and a real test enquiry received (Q2)
- [ ] Legal name confirmed for footer and policies (Q4)
- [ ] Real product images, or client signs off on the alternative (Q6)
- [ ] All published claims verified (Q5)
- [ ] Client has approved all copy

**Technical**
- [ ] Sending domain verified with SPF, DKIM and DMARC
- [ ] No `draft` content or `TODO(client)` in production
- [ ] Failed email and failed storage paths tested
- [ ] Spam protection and rate limit working
- [ ] Privacy policy and terms published
- [ ] Cookie consent handled if analytics requires it for target markets
- [ ] Lighthouse and accessibility checks passed
- [ ] Sitemap submitted to Google Search Console
- [ ] Analytics events firing
- [ ] Tested on a real mid-range phone
