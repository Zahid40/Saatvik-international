'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer } from './drawer';
import { products } from './products';

const ShopContext = createContext(null);
const bagKey = 'snack-munch-bag';
const wishlistKey = 'snack-munch-favourites';
const emptyBag = {};
const emptyWishlist = [];

function readBrowserValue(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeBrowserValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // This visit remains usable if browser storage is disabled.
  }
}

function readBag() {
  const saved = readBrowserValue(bagKey, emptyBag);
  return Object.fromEntries(products.flatMap(({ id }) =>
    Number.isSafeInteger(saved[id]) && saved[id] > 0 ? [[id, saved[id]]] : [],
  ));
}

export function useShop() {
  return useContext(ShopContext);
}

export function PanelButton({ panel, children, ...props }) {
  const { openPanel } = useShop();
  return <button {...props} type="button" onClick={() => openPanel(panel)}>{children}</button>;
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [panel, openPanel] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setCart(current => current ?? readBag());
    const saved = readBrowserValue(wishlistKey, emptyWishlist);
    setWishlist(current => current ?? products.filter(({ id }) => Array.isArray(saved) && saved.includes(id)).map(({ id }) => id));
    return () => clearTimeout(toastTimer.current);
  }, []);

  useEffect(() => {
    if (cart) writeBrowserValue(bagKey, cart);
  }, [cart]);

  useEffect(() => {
    if (wishlist) writeBrowserValue(wishlistKey, wishlist);
  }, [wishlist]);

  useEffect(() => {
    openPanel(null);
    const observer = 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? new IntersectionObserver(entries => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }, { threshold: 0.12 })
      : null;
    if (!observer) return;
    document.documentElement.classList.add('motion-ready');
    document.querySelectorAll('[data-reveal]').forEach(item => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [pathname]);

  function changeQuantity(id, delta) {
    setCart(current => {
      const bag = { ...(current ?? readBag()) };
      const quantity = (bag[id] || 0) + delta;
      if (quantity > 0) bag[id] = quantity;
      else delete bag[id];
      return bag;
    });
  }

  function removeSubmitted(items) {
    setCart(current => {
      const bag = { ...(current ?? readBag()) };
      for (const [id, count] of Object.entries(items)) {
        const remaining = (bag[id] || 0) - count;
        if (remaining > 0) bag[id] = remaining;
        else delete bag[id];
      }
      return bag;
    });
  }

  function addJar(product) {
    changeQuantity(product.id, 1);
    openPanel('cart');
  }

  function addPack(pack) {
    setCart(current => {
      const bag = { ...(current ?? readBag()) };
      for (const [id, quantity] of Object.entries(pack)) {
        if (quantity) bag[id] = (bag[id] || 0) + quantity;
      }
      return bag;
    });
    openPanel('cart');
  }

  function toggleFavourite(product, { announce = true } = {}) {
    const isSaved = wishlist?.includes(product.id);
    setWishlist(current => isSaved
      ? (current ?? emptyWishlist).filter(id => id !== product.id)
      : [...new Set([...(current ?? emptyWishlist), product.id])]);
    if (!announce) return;
    setToast(product.name + (isSaved ? ' removed from wishlist' : ' saved to wishlist'));
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2300);
  }

  return (
    <ShopContext.Provider value={{
      cart: cart ?? emptyBag, wishlist: wishlist ?? emptyWishlist, openPanel, addJar, toggleFavourite, removeSubmitted,
    }}>
      {children}
      <Drawer panel={panel} cart={cart ?? emptyBag} wishlist={wishlist ?? emptyWishlist}
        onClose={() => openPanel(null)} onAdd={addJar} onQuantityChange={changeQuantity}
        onAddPack={addPack} onToggleFavourite={toggleFavourite} />
      <div className={toast ? 'toast visible' : 'toast'} role="status" aria-live="polite">{toast}</div>
    </ShopContext.Provider>
  );
}
