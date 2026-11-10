import { Icon } from './visuals';

export const products = [
  { id: 'masala', name: 'Desi AF Masala', mood: 'Desi & punchy', note: 'Bold, spice-forward crunch.', tint: '#e6d8f5' },
  { id: 'cheese', name: 'Sigma Chad Cheese', mood: 'Rich & cheesy', note: 'Big, savoury cheese flavour.', tint: '#ffe5a1' },
  { id: 'peri', name: 'Goated Peri Peri', mood: 'Hot & fiery', note: 'A chilli kick in every bite.', tint: '#fbd1c5' },
  { id: 'onion', name: 'No Cap Cream N’ Onion', mood: 'Creamy & mellow', note: 'Mellow cream and tangy onion.', tint: '#cde8cc' }
];

export function quantityTotal(quantities) {
  return Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
}

export function AddButton({ product, onAdd }) {
  return (
    <button type="button" className="button primary add-button" onClick={onAdd} aria-label={`Add ${product.name} to cart`}>
      <Icon name="cart-icon" />
      <span>Add to cart</span>
      <span className="add-plus" aria-hidden="true">+</span>
    </button>
  );
}
