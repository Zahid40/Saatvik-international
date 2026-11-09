# Site map and content model

Depends on Q7 for the final categories.

```
/                                   Home
/products                           All categories
/products/makhana                   Category
/products/makhana/raw-makhana       Product
/products/makhana/flavoured-makhana Product (roasted and flavoured)
/products/puffs                     Category
/products/puffs/jowar-puffs         Product
/products/puffs/millet-puffs        Product (Q10)
/products/puffs/quinoa-puffs        Product
/products/puffs/chickpea-puffs      Product
/products/freeze-dried-fruits       Category, includes process explainer
/products/freeze-dried-fruits/mango and others (Q11)
/private-label                      Service, major conversion page
/wholesale                          Wholesale and bulk supply
/export                             Export supply (wording depends on Q14)
/about                              Vision, mission, why Saatvik
/contact                            Contact details, map, form
/enquiry                            Review list and submit
/enquiry/thank-you                  Confirmation with reference number
/privacy   /terms                   Legal
```

## Page goals

| Page | Must contain |
|---|---|
| Home | Clear statement of what is sold and to whom, three categories, services, trust strip (only confirmed items), enquiry call to action |
| Category | Short intro, product grid, category FAQ, enquiry call to action |
| Product | Name, description, options (size, flavour, form), packaging and MOQ or "on request", Add to enquiry, Quick enquiry, WhatsApp, related products |
| Private Label | Who it is for, what is handled, process steps, what to send us, enquiry form |
| Export | Supply capability, documents available (confirmed only), enquiry form |

## Navigation

Header: Products (category dropdown), Private Label, Wholesale, Export, About, Contact, Enquiry List with item count. On mobile, keep a persistent enquiry and WhatsApp action bar.

## Content model

Stored as typed files in `content/`. The type deliberately has no price field.

```ts
type Status = "confirmed" | "draft";          // draft never reaches production

interface Category {
  slug: string;
  name: string;
  intro: string;
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
}

interface Product {
  slug: string;
  categorySlug: string;
  name: string;
  summary: string;
  description: string;
  options: { label: string; values: string[] }[]; // e.g. Size: 4, 5, 6
  customisable?: string;                          // e.g. "Flavours customised on request"
  packaging?: string[];                           // undefined renders "on request"
  moq?: string;                                   // undefined renders "on request"
  images: { src: string; alt: string }[];
  status: Status;
  seo: { title: string; description: string };
}

interface Certification {
  name: string;
  number?: string;
  fileSrc?: string;
  status: Status;
}
```

Optional fields stay empty until the client confirms them. The build fails if a `draft` item would be rendered in production.
