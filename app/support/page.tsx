'use client';

import { useState } from 'react';
import { isRussia } from '@/lib/locale';

/* ════════════════════════════════════════════════
   SVET SUPPORT PAGE — Locale-aware
   ════════════════════════════════════════════════ */

const ru = isRussia();

const FAQ = ru ? [
  {
    q: 'Когда отправят мой заказ?',
    a: 'В течение 1 месяца после предзаказа. Вы получите подтверждение на email.',
  },
  {
    q: 'Вы доставляете по всей России?',
    a: 'Да, бесплатная доставка по всей России.',
  },
  {
    q: 'Какие размеры доступны?',
    a: 'S, M, L, XL. Шапка — один размер.',
  },
  {
    q: 'Могу ли я отменить предзаказ?',
    a: 'Да, в течение 48 часов после заказа. Свяжитесь с нами в Instagram или Telegram.',
  },
  {
    q: 'Какие способы оплаты принимаются?',
    a: 'Банковские карты (Visa, Mastercard, Мир), СБП. Оплата полностью безопасна.',
  },
] : [
  {
    q: 'When does my order ship?',
    a: 'Within 1 month of pre-order. You\'ll get email confirmation.',
  },
  {
    q: 'Do you ship worldwide?',
    a: 'Yes. Free shipping worldwide.',
  },
  {
    q: 'What sizes are available?',
    a: 'S, M, L, XL. Beanie is one size.',
  },
  {
    q: 'Can I cancel my pre-order?',
    a: 'Yes, within 48 hours of ordering. Contact us via Instagram or email.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Visa, Mastercard, Apple Pay, Google Pay via Stripe. All payments are secure.',
  },
];

const CONTACT_CARDS = ru ? [
  { icon: '📸', label: 'INSTAGRAM', value: '@svet.global', href: 'https://instagram.com/svet.global' },
  { icon: '✈️', label: 'TELEGRAM', value: '@svetglobal', href: 'https://t.me/svetglobal' },
  { icon: '📧', label: 'EMAIL', value: 'support@svet.global', href: 'mailto:support@svet.global' },
] : [
  { icon: '📸', label: 'INSTAGRAM DM', value: '@svet.global', href: 'https://instagram.com/svet.global' },
  { icon: '✈️', label: 'TELEGRAM', value: '@svetglobal', href: 'https://t.me/svetglobal' },
  { icon: '📧', label: 'EMAIL', value: 'support@svet.global', href: 'mailto:support@svet.global' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 140, paddingBottom: 40 }}>
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">{ru ? 'МЫ ЗДЕСЬ' : "WE'RE HERE"}</span>
            <h1 className="section-header__title">{ru ? 'ПОМОЩЬ' : 'SUPPORT'}</h1>
            <p className="section-header__desc">
              {ru ? 'Мы всегда на связи. Пишите в любое время.' : "We're here. Reach out anytime."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 60 }}>
        <div className="section__container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
            maxWidth: 800,
            margin: '0 auto',
          }}>
            {CONTACT_CARDS.map(card => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('mailto') ? undefined : '_blank'}
                rel={card.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: '28px 24px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em' }}>{card.label}</div>
                <div style={{ color: '#C9A84C', fontSize: 13, marginTop: 6 }}>{card.value}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: 60, paddingBottom: 80 }}>
        <div className="section__container">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <span className="section-header__label">{ru ? 'ВОПРОСЫ' : 'FAQ'}</span>
            <h2 className="section-header__title" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
              {ru ? 'Частые вопросы' : 'Common Questions'}
            </h2>
          </div>

          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {FAQ.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid var(--border)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: 15,
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    letterSpacing: '0.02em',
                  }}
                >
                  {faq.q}
                  <span style={{
                    color: '#C9A84C',
                    fontSize: 18,
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.3s',
                    flexShrink: 0,
                    marginLeft: 16,
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 200 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: 14,
                    lineHeight: 1.8,
                    padding: '0 0 20px',
                    margin: 0,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
