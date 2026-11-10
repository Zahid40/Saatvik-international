# Snack Munch | Next.js website

Complete Next.js App Router source for the Snack Munch storefront with Saatvik International branding.

## Run locally

Install Node.js 22.13 or newer. Extract the ZIP, open a terminal in the project folder, and run:

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages and assets

| Route | Function |
| --- | --- |
| `/` | Homepage with rotating flavour hero, ticker, craving tiles and the full lineup |
| `/collection` | Collection banner, flavour filters and product cards |
| `/checkout` | Enquiry form and selection summary |
| `POST /api/enquiries` | Validates and saves the enquiry, then returns a reference ID |

The header, search, wishlist and cart drawer are shared across pages. The bag and wishlist are saved in the browser. Product photos, logo, collection banner, fonts and licences are in `public/assets/`.

## Enquiry storage

SQLite creates `data/enquiries.sqlite` on the first successful submission. Each record contains the reference ID, submitted contact details, item quantities and timestamp. Open the `enquiries` table in a SQLite client to review submissions.

Set `ENQUIRY_DB_PATH` to a writable file on a persistent volume for a hosted installation. Back up that file and restrict access to it because it contains contact details. Use a Node.js host with persistent storage for the SQLite implementation included here. If your reverse proxy changes the request URL, set `ENQUIRY_PUBLIC_ORIGIN` to the externally visible origin, such as `https://shop.example.com`, with no trailing slash.

The checkout accepts enquiries only and collects no payments. The ZIP contains the database schema and starts with an empty database. The standalone Next.js app uses its own SQLite file and does not inherit the hosted Sites sign-in gate or live enquiry records.

## Production build

```sh
npm run build
npm start
```
