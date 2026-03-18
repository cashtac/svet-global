'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useState, useEffect } from 'react';
import { getMe, SvetrixUser } from '@/lib/auth';

export function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [user, setUser] = useState<SvetrixUser | null>(null);

  useEffect(() => {
    getMe().then(u => setUser(u));
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          {/* Ecosystem indicator + Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/" className="nav__logo">SVET</Link>
            <span className="nav__ecosystem-tag">by Svetrix</span>
          </div>

          {/* Desktop links */}
          <div className="nav__links">
            <Link href="/shop" className="nav__link">Shop</Link>
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

            {/* Ecosystem grid button */}
            <div style={{ position: 'relative' }}>
              <button
                className="nav__ecosystem-btn"
                onClick={() => setEcosystemOpen(!ecosystemOpen)}
                aria-label="Svetrix Ecosystem"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              </button>

              {/* Ecosystem dropdown */}
              {ecosystemOpen && (
                <>
                  <div className="nav__ecosystem-backdrop" onClick={() => setEcosystemOpen(false)} />
                  <div className="nav__ecosystem-dropdown">
                    <div className="nav__ecosystem-header">Svetrix Ecosystem</div>
                    <a href="https://svetrix.com" target="_blank" rel="noopener noreferrer" className="nav__ecosystem-item">
                      <span className="nav__ecosystem-icon">⚡</span>
                      <div>
                        <div className="nav__ecosystem-name">Svetrix OS</div>
                        <div className="nav__ecosystem-desc">Intelligent platform</div>
                      </div>
                    </a>
                    <a href="https://svetrix.com/maestro" target="_blank" rel="noopener noreferrer" className="nav__ecosystem-item">
                      <span className="nav__ecosystem-icon">🧠</span>
                      <div>
                        <div className="nav__ecosystem-name">Svetrix AI</div>
                        <div className="nav__ecosystem-desc">AI Maestro assistant</div>
                      </div>
                    </a>
                    <div className="nav__ecosystem-item nav__ecosystem-item--active">
                      <span className="nav__ecosystem-icon">☀</span>
                      <div>
                        <div className="nav__ecosystem-name">SVET</div>
                        <div className="nav__ecosystem-desc">You are here</div>
                      </div>
                    </div>
                    <div className="nav__ecosystem-divider" />
                    {user ? (
                      <Link href="/account" className="nav__ecosystem-signin" onClick={() => setEcosystemOpen(false)}>
                        My Account
                      </Link>
                    ) : (
                      <Link href="/login" className="nav__ecosystem-signin" onClick={() => setEcosystemOpen(false)}>
                        Sign in with Svetrix
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
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
                Sign in with Svetrix →
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
