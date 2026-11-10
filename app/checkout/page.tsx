import Link from 'next/link';
import { EnquiryCheckout } from './enquiry-checkout';
export const metadata = { title: 'Enquiry Checkout | Snack Munch' };

export default function Page() {
  return (
    <main id="main" className="checkout-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/catalog">Catalog</Link><span aria-hidden="true">/</span><span aria-current="page">Enquiry checkout</span></nav>
      <header className="checkout-heading">
        <span className="eyebrow">SNACK MUNCH ENQUIRIES</span>
        <h1>Enquiry Checkout</h1>
        <p>Tell us how to reach you and send your selection to Saatvik International.</p>
      </header>
      <EnquiryCheckout />
    </main>
  );
}
