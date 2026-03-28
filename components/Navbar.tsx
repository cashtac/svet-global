'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useState, useEffect, useRef } from 'react';
import { getMe, SvetUser } from '@/lib/auth';
import { useI18n } from '@/lib/i18n-provider';
import { LOCALE_LABELS, LOCALE_LIST, type Locale } from '@/lib/i18n';

export function Navbar() {
  const { count } = useCart();
  const { t, locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [user, setUser] = useState<SvetUser | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMe().then(u => setUser(u));
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const nextLocale = (current: Locale): Locale => {
    const idx = LOCALE_LIST.indexOf(current);
    return LOCALE_LIST[(idx + 1) % LOCALE_LIST.length];
  };

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
            <Link href="/shop" className="nav__link">{t('nav.shop')}</Link>
            <Link href="/ai" className="nav__link">{t('nav.ai')}</Link>
            <Link href="/pricing" className="nav__link">{t('nav.pricing')}</Link>
            <Link href="/symbols" className="nav__link">{t('nav.symbols' as any)}</Link>
            <Link href="/chain" className="nav__link nav__link--hide-sm">{t('nav.chain' as any)}</Link>
            <Link href="/insight" className="nav__link nav__link--hide-sm">{t('nav.insight' as any)}</Link>
            <Link href="/sustainability" className="nav__link nav__link--hide-sm">{t('nav.sustainability' as any)}</Link>
            <Link href="/cart" className="nav__cart">
              {t('nav.cart')}
              {count > 0 && <span className="nav__cart-count">{count}</span>}
            </Link>
            <Link href="/profile" className="nav__profile-icon" aria-label="Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </Link>

            {/* Language dropdown */}
            <div className="nav__lang-wrap" ref={langRef}>
              <button
                className="nav__lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Switch language"
              >
                {LOCALE_LABELS[locale].split(' ')[0]} {locale.toUpperCase()}
              </button>
              {langOpen && (
                <div className="nav__lang-dropdown">
                  {LOCALE_LIST.map(l => (
                    <button
                      key={l}
                      className={`nav__lang-option ${l === locale ? 'active' : ''}`}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                    >
                      {LOCALE_LABELS[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
              <Link href="/login" className="nav__link">{t('nav.signin')}</Link>
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
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu__inner" onClick={e => e.stopPropagation()}>
            <Link href="/shop" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.shop').toUpperCase()}</Link>
            <Link href="/ai" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.ai').toUpperCase()}</Link>
            <Link href="/pricing" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.pricing').toUpperCase()}</Link>
            <Link href="/symbols" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.symbols' as any).toUpperCase()}</Link>
            <Link href="/chain" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.chain' as any).toUpperCase()}</Link>
            <Link href="/insight" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.insight' as any).toUpperCase()}</Link>
            <Link href="/sustainability" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.sustainability' as any).toUpperCase()}</Link>
            <Link href="/profile" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.profile' as any).toUpperCase()}</Link>
            <Link href="/cart" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
              {t('nav.cart').toUpperCase()} {count > 0 && `(${count})`}
            </Link>

            <div className="mobile-menu__divider" />

            {/* Language grid in mobile */}
            <div className="mobile-menu__lang-grid">
              {LOCALE_LIST.map(l => (
                <button
                  key={l}
                  className={`mobile-menu__lang-option ${l === locale ? 'active' : ''}`}
                  onClick={() => setLocale(l)}
                >
                  {LOCALE_LABELS[l]}
                </button>
              ))}
            </div>

            <div className="mobile-menu__divider" />

            {user ? (
              <Link href="/account" className="mobile-menu__account" onClick={() => setMenuOpen(false)}>
                {t('nav.myaccount')}
              </Link>
            ) : (
              <Link href="/login" className="mobile-menu__signin" onClick={() => setMenuOpen(false)}>
                {t('nav.signin')} →
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
