'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useState } from 'react';

/* ════════════════════════════════════════════════
   SVET Navbar — English only, no lang switcher
   ════════════════════════════════════════════════ */

export function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          {/* Brand */}
          <Link href="/" className="nav__logo">SVET</Link>

          {/* Desktop links */}
          <div className="nav__links">
            <Link href="/shop" className="nav__link">Shop</Link>
            <Link href="/about" className="nav__link">About</Link>
            <Link href="/support" className="nav__link">Support</Link>
            <Link href="/cart" className="nav__cart">
              Cart
              {count > 0 && <span className="nav__cart-count">{count}</span>}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className={`nav__hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu__inner" onClick={e => e.stopPropagation()}>
            <Link href="/shop" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>SHOP</Link>
            <Link href="/about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
            <Link href="/support" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>SUPPORT</Link>
            <Link href="/cart" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
              CART {count > 0 && `(${count})`}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
