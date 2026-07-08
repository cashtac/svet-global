'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useState } from 'react';
import { isRussia } from '@/lib/locale';

/* ════════════════════════════════════════════════
   SVET Navbar — Locale-aware (RU / EN)
   ════════════════════════════════════════════════ */

const ru = isRussia();

const NAV = {
  shop:    ru ? 'Магазин' : 'Shop',
  about:   ru ? 'О нас' : 'About',
  support: ru ? 'Помощь' : 'Support',
  cart:    ru ? 'Корзина' : 'Cart',
};

export function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          <Link href="/" className="nav__logo">SVET</Link>

          <div className="nav__links">
            <Link href="/shop" className="nav__link">{NAV.shop}</Link>
            <Link href="/about" className="nav__link">{NAV.about}</Link>
            <Link href="/support" className="nav__link">{NAV.support}</Link>
            <Link href="/cart" className="nav__cart">
              {NAV.cart}
              {count > 0 && <span className="nav__cart-count">{count}</span>}
            </Link>
          </div>

          <button className={`nav__hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu__inner" onClick={e => e.stopPropagation()}>
            <Link href="/shop" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{NAV.shop.toUpperCase()}</Link>
            <Link href="/about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{NAV.about.toUpperCase()}</Link>
            <Link href="/support" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{NAV.support.toUpperCase()}</Link>
            <Link href="/cart" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
              {NAV.cart.toUpperCase()} {count > 0 && `(${count})`}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
