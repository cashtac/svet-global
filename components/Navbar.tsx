'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n-provider';
import { LOCALE_LABELS, LOCALE_LIST, type Locale } from '@/lib/i18n';

/* ════════════════════════════════════════════════
   SVET Navbar — Clean: Shop · About · Cart
   ════════════════════════════════════════════════ */

export function Navbar() {
  const { count } = useCart();
  const { t, locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <nav className="nav">
        <div className="nav__container">
          {/* Brand */}
          <Link href="/" className="nav__logo">SVET</Link>

          {/* Desktop links — Clean & focused */}
          <div className="nav__links">
            <Link href="/shop" className="nav__link">{t('nav.shop')}</Link>
            <Link href="/about" className="nav__link">{t('nav.about')}</Link>
            <Link href="/cart" className="nav__cart">
              {t('nav.cart')}
              {count > 0 && <span className="nav__cart-count">{count}</span>}
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
          </div>

          {/* Mobile hamburger */}
          <button className={`nav__hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu — Clean */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu__inner" onClick={e => e.stopPropagation()}>
            <Link href="/shop" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.shop').toUpperCase()}</Link>
            <Link href="/about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.about').toUpperCase()}</Link>
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
          </div>
        </div>
      )}
    </>
  );
}
