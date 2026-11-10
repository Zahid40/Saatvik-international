'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AddButton, products, quantityTotal } from './products';
import { Icon } from './visuals';

const packSize = 3;
const titles = {
  cart: 'Your snack bag',
  wishlist: 'Your wishlist',
  builder: 'Build your 3-pack',
  search: 'Find a flavour',
};

export function DrawerRow({ product, children }) {
  return (
    <div className="drawer-row">
      <img src={`/assets/${product.id}.jpg`} width="1536" height="1024" alt="" />
      <div>
        <strong>{product.name}</strong>
        <small>Roasted makhana · 75 g</small>
      </div>
      {children}
    </div>
  );
}

function Stepper({ product, quantity, onChange, incrementDisabled = false }) {
  return (
    <div className="stepper">
      <button type="button" aria-label={`Remove one ${product.name}`} disabled={quantity === 0} onClick={() => onChange(product.id, -1)}>−</button>
      <span aria-label={`Quantity ${quantity}`}>{quantity}</span>
      <button type="button" aria-label={`Add one ${product.name}`} disabled={incrementDisabled} onClick={() => onChange(product.id, 1)}>+</button>
    </div>
  );
}

function Cart({ quantities, onQuantityChange, onClose }) {
  const selected = products.filter(product => quantities[product.id]);
  if (selected.length === 0) {
    return (
      <>
        <p className="drawer-copy">Your bag is empty. Pick a flavour to get started.</p>
        <Link href="/catalog" className="button primary" onClick={onClose}>Explore the Catalog <Icon name="arrow" /></Link>
      </>
    );
  }
  return (
    <>
      <p className="drawer-copy">Review your selection before sending an enquiry.</p>
      {selected.map(product => (
        <DrawerRow key={product.id} product={product}>
          <Stepper product={product} quantity={quantities[product.id]} onChange={onQuantityChange} />
        </DrawerRow>
      ))}
      <div className="drawer-footer cart-footer">
        <div className="cart-total"><span>Total jars</span><strong>{quantityTotal(quantities)}</strong></div>
        <Link className="button primary" href="/checkout" onClick={onClose}>Checkout <Icon name="arrow" /></Link>
        <p>Enquiry only · No payment collected</p>
      </div>
    </>
  );
}

function Wishlist({ wishlist, onAdd, onRemove, onClose }) {
  const saved = products.filter(product => wishlist.includes(product.id));
  if (!saved.length) {
    return (
      <>
        <p className="drawer-copy">Your wishlist is empty. Tap a heart on any flavour to save it.</p>
        <Link className="button primary" href="/catalog" onClick={onClose}>Explore the Catalog <Icon name="arrow" /></Link>
      </>
    );
  }
  return (
    <>
      <p className="drawer-copy">Your saved flavours are right here.</p>
      {saved.map(product => (
        <DrawerRow key={product.id} product={product}>
          <div className="wishlist-row-actions">
            <AddButton product={product} onAdd={() => onAdd(product)} />
            <button type="button" className="wishlist-remove" aria-label={`Remove ${product.name} from wishlist`}
              onClick={event => {
                const drawer = event.currentTarget.closest('dialog');
                onRemove(product, { announce: false });
                drawer.querySelector('.drawer-close').focus();
              }}>Remove</button>
          </div>
        </DrawerRow>
      ))}
    </>
  );
}

function PackBuilder({ onAddPack }) {
  const [pack, setPack] = useState({});
  const count = quantityTotal(pack);

  function changeSelection(id, delta) {
    setPack(current => {
      const quantity = (current[id] || 0) + delta;
      if (quantity < 0 || quantityTotal(current) + delta > packSize) return current;
      return { ...current, [id]: quantity };
    });
  }

  return (
    <>
      <p className="drawer-copy" role="status">Pick any three jars. <strong>{count} of {packSize} selected.</strong></p>
      {products.map(product => (
        <DrawerRow key={product.id} product={product}>
          <Stepper product={product} quantity={pack[product.id] || 0} onChange={changeSelection} incrementDisabled={count === packSize} />
        </DrawerRow>
      ))}
      <div className="drawer-footer">
        <button type="button" className="button primary builder-add" disabled={count !== packSize} onClick={() => onAddPack(pack)}>
          Add pack to bag <Icon name="arrow" />
        </button>
      </div>
    </>
  );
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/[’']/g, '');
}

function Search({ onAdd }) {
  const [query, setQuery] = useState('');
  const results = products.filter(product => normalize(`${product.name} ${product.note}`).includes(normalize(query)));

  return (
    <>
      <label htmlFor="flavour-search" className="search-label">Search the lineup</label>
      <input type="search" id="flavour-search" placeholder="Try cheese or peri peri" autoComplete="off" value={query} onChange={event => setQuery(event.target.value)} />
      <div id="search-results" aria-live="polite">
        {results.map(product => (
          <DrawerRow key={product.id} product={product}>
            <AddButton product={product} onAdd={() => onAdd(product)} />
          </DrawerRow>
        ))}
        {results.length === 0 && <p className="drawer-copy">No flavours found. Try cheese, masala, peri peri or onion.</p>}
      </div>
    </>
  );
}

export function Drawer({ panel, cart, wishlist, onClose, onAdd, onQuantityChange, onAddPack, onToggleFavourite }) {
  const ref = useRef(null);

  useEffect(() => {
    const drawer = ref.current;
    if (!panel) {
      if (drawer.open) drawer.close();
      return;
    }
    if (!drawer.open) drawer.showModal();
    drawer.scrollTop = 0;
    drawer.querySelector(panel === 'search' ? '#flavour-search' : '.drawer-close').focus();
  }, [panel]);

  function closeDrawer() {
    ref.current.close();
  }

  function closeOnBackdrop(event) {
    if (event.target !== ref.current) return;
    const { left, right, top, bottom } = ref.current.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) closeDrawer();
  }

  return (
    <dialog id="drawer" aria-labelledby="drawer-title" ref={ref} onClose={onClose} onClick={closeOnBackdrop}>
      <div className="drawer-header">
        <h2 id="drawer-title">{titles[panel]}</h2>
        <button className="icon-button drawer-close" type="button" aria-label="Close dialog" onClick={closeDrawer}>×</button>
      </div>
      <div id="drawer-content">
        {panel === 'cart' && <Cart quantities={cart} onQuantityChange={onQuantityChange} onClose={closeDrawer} />}
        {panel === 'wishlist' && <Wishlist wishlist={wishlist} onAdd={onAdd} onRemove={onToggleFavourite} onClose={closeDrawer} />}
        {panel === 'builder' && <PackBuilder onAddPack={onAddPack} />}
        {panel === 'search' && <Search onAdd={onAdd} />}
      </div>
    </dialog>
  );
}
