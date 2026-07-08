'use client';

import Link from 'next/link';
import { isRussia } from '@/lib/locale';

const ru = isRussia();

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand */}
        <div className="footer__brand">SVET</div>
        <p className="footer__tagline">
          {ru
            ? 'Одно Солнце · Одна Энергия · Одна Планета · Для Всех'
            : 'One Sun · One Energy · One Planet · For Everyone'
          }
        </p>

        {/* Store links */}
        <div className="footer__links">
          <Link href="/shop" className="footer__link">{ru ? 'Магазин' : 'Shop'}</Link>
          <Link href="/about" className="footer__link">{ru ? 'О нас' : 'About'}</Link>
          <Link href="/support" className="footer__link">{ru ? 'Помощь' : 'Support'}</Link>
          <Link href="/cart" className="footer__link">{ru ? 'Корзина' : 'Cart'}</Link>
        </div>

        {/* Socials */}
        <div className="footer__socials">
          <a href="https://instagram.com/svet.global" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://t.me/svetglobal" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Telegram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" /></svg>
          </a>
        </div>

        {/* Contact */}
        <div className="footer__account">
          <a href="https://t.me/svetrixhello" target="_blank" rel="noopener noreferrer" className="footer__signin">
            {ru ? 'Связаться с нами' : 'Contact Us'}
          </a>
          <span className="footer__account-desc">
            {ru ? 'Вопросы? Пишите в любое время.' : 'Questions? Reach out anytime.'}
          </span>
        </div>

        <div style={{ marginTop: 16 }}>
          <a href="mailto:support@svet.global" style={{ color: '#666', fontSize: 11, textDecoration: 'none', letterSpacing: '0.1em' }}>
            📧 support@svet.global
          </a>
        </div>

        <p className="footer__copy">
          © {year} SVET. {ru ? 'Все права защищены.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
