'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand */}
        <div className="footer__brand">SVET</div>
        <p className="footer__tagline">{t('footer.tagline')}</p>

        {/* Store links */}
        <div className="footer__links">
          <Link href="/shop" className="footer__link">{t('nav.shop')}</Link>
          <Link href="/about" className="footer__link">{t('nav.about')}</Link>
          <Link href="/cart" className="footer__link">{t('nav.cart')}</Link>
        </div>

        {/* Socials */}
        <div className="footer__socials">
          <span className="footer__social" aria-label="Discord" style={{ cursor: 'default' }}>
            <svg width="20" height="20" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1 4.9C55.6 2.8 50.7 1.3 45.7.4c-.1 0-.2 0-.2.1-.6 1.1-1.3 2.6-1.8 3.7-5.5-.8-10.9-.8-16.3 0-.5-1.2-1.2-2.6-1.8-3.7 0-.1-.1-.1-.2-.1C20.3 1.3 15.4 2.8 10.9 4.9c0 0-.1 0-.1.1C1.6 18.7-.9 32.1.3 45.4v.2c6.1 4.5 12 7.2 17.7 9 .1 0 .2 0 .2-.1 1.4-1.9 2.6-3.8 3.6-5.9.1-.1 0-.3-.1-.3-2-.8-3.8-1.7-5.6-2.7-.1-.1-.1-.3 0-.4.4-.3.8-.6 1.1-.9.1-.1.1-.1.2 0 11.6 5.3 24.2 5.3 35.7 0h.2c.4.3.7.6 1.1.9.1.1.1.3 0 .4-1.8 1-3.6 1.9-5.6 2.7-.1.1-.2.2-.1.3 1.1 2.1 2.3 4 3.6 5.9.1.1.1.1.2.1 5.8-1.8 11.7-4.5 17.8-9 0 0 .1-.1.1-.2 1.5-15.3-2.5-28.6-10.5-40.4 0 0 0-.1-.1-.1z"/></svg>
          </span>
          <a href="https://instagram.com/svet.global" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://tiktok.com/@svet.global" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="TikTok">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.2a8.16 8.16 0 0 0 4.29 1.2V7a4.85 4.85 0 0 1-.4-.31z"/></svg>
          </a>
          <a href="https://x.com/svetglobal" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="X / Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
          </a>
        </div>

        {/* Account */}
        <div className="footer__account">
          <Link href="/login" className="footer__signin">
            {t('nav.signin')}
          </Link>
          <span className="footer__account-desc">{t('footer.oneAccount')}</span>
        </div>

        <p className="footer__copy">© {year} SVET. {t('footer.rights')}</p>
      </div>
    </footer>
  );
}
