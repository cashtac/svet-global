'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useState, useEffect } from 'react';
import { getMe, SvetUser } from '@/lib/auth';

export function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [user, setUser] = useState<SvetUser | null>(null);

  useEffect(() => {
    getMe().then(u => setUser(u));
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" className="nav__logo">SVET</Link>
          </div>

          {/* Desktop links */}
          <div className="nav__links">
            <Link href="/shop" className="nav__link">Shop</Link>
            <Link href="/community" className="nav__link">Community</Link>
            <Link href="/about" className="nav__link">Philosophy</Link>
            <Link href="/cart" className="nav__cart">
              Cart
              {count > 0 && <span className="nav__cart-count">{count}</span>}
            </Link>

            {/* Account / Login */}
            {user ? (
              <Link href="/account" className="nav__link" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" style={{ width: 22, height: 22, borderRadius: '50%' }} />
                ) : (
                  <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                {user.name.split(' ')[0]}
              </Link>
            ) : (
              <Link href="/login" className="nav__link">Sign in</Link>
            )}


          </div>

          {/* Mobile hamburger */}
          <button className={`nav__hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 105,
          background: 'rgba(10,10,10,0.97)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={() => setMenuOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <Link href="/shop" style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, letterSpacing: '0.1em' }} onClick={() => setMenuOpen(false)}>SHOP</Link>
            <Link href="/community" style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, letterSpacing: '0.1em' }} onClick={() => setMenuOpen(false)}>COMMUNITY</Link>
            <Link href="/about" style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, letterSpacing: '0.1em' }} onClick={() => setMenuOpen(false)}>PHILOSOPHY</Link>
            <Link href="/cart" style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, letterSpacing: '0.1em' }} onClick={() => setMenuOpen(false)}>
              CART {count > 0 && `(${count})`}
            </Link>
            <div style={{ width: 40, height: 1, background: 'var(--border)', margin: '8px 0' }} />
            {user ? (
              <Link href="/account" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--accent)', letterSpacing: '0.1em' }} onClick={() => setMenuOpen(false)}>
                MY ACCOUNT →
              </Link>
            ) : (
              <Link href="/login" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.1em' }} onClick={() => setMenuOpen(false)}>
                Sign in →
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
