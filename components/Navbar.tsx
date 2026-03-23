'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useState, useEffect } from 'react';
import { getMe, SvetUser } from '@/lib/auth';
import { useI18n } from '@/lib/i18n-provider';

export function Navbar() {
  const { count } = useCart();
  const { t, locale, setLocale } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
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
            <Link href="/shop" className="nav__link">{t('nav.shop')}</Link>
            <Link href="/pricing" className="nav__link">{t('nav.pricing')}</Link>
            <Link href="/community" className="nav__link">{t('nav.community')}</Link>
            <Link href="/about" className="nav__link">{t('nav.philosophy')}</Link>
            <Link href="/cart" className="nav__cart">
              {t('nav.cart')}
              {count > 0 && <span className="nav__cart-count">{count}</span>}
            </Link>

            {/* Language switcher */}
            <button
              className="nav__lang-btn"
              onClick={() => setLocale(locale === 'en' ? 'ru' : 'en')}
              aria-label="Switch language"
            >
              {locale === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
            </button>

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
          <div className="mobile-menu__inner">
            <Link href="/shop" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.shop').toUpperCase()}</Link>
            <Link href="/pricing" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.pricing').toUpperCase()}</Link>
            <Link href="/community" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.community').toUpperCase()}</Link>
            <Link href="/about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>{t('nav.philosophy').toUpperCase()}</Link>
            <Link href="/cart" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
              {t('nav.cart').toUpperCase()} {count > 0 && `(${count})`}
            </Link>

            <div className="mobile-menu__divider" />

            {/* Language switcher in mobile */}
            <button
              className="mobile-menu__lang-btn"
              onClick={(e) => {
                e.stopPropagation();
                setLocale(locale === 'en' ? 'ru' : 'en');
              }}
            >
              {locale === 'en' ? '🇷🇺 Русский' : '🇬🇧 English'}
            </button>

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
