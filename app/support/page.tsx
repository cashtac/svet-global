'use client';

import { useState } from 'react';

/* ════════════════════════════════════════════════
   SVET SUPPORT PAGE
   Contact cards + FAQ
   ════════════════════════════════════════════════ */

const FAQ = [
  {
    q: 'When does my order ship?',
    a: 'Within 1 month of pre-order. You\'ll get email confirmation.',
  },
  {
    q: 'Do you ship worldwide?',
    a: 'Yes. Free shipping in the US. International shipping calculated separately.',
  },
  {
    q: 'What sizes are available?',
    a: 'S/M and L/XL. Caps are one size.',
  },
  {
    q: 'Can I cancel my pre-order?',
    a: 'Yes, within 48 hours of ordering. Contact us via Instagram or email.',
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 140, paddingBottom: 40 }}>
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">WE'RE HERE</span>
            <h1 className="section-header__title">SUPPORT</h1>
            <p className="section-header__desc">
              We're here. Reach out anytime.
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
            <a
              href="https://instagram.com/svet.global"
              target="_blank"
              rel="noopener noreferrer"
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
              <div style={{ fontSize: 28, marginBottom: 12 }}>📸</div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em' }}>INSTAGRAM DM</div>
              <div style={{ color: '#C9A84C', fontSize: 13, marginTop: 6 }}>@svet.global</div>
            </a>
            <a
              href="https://x.com/svetglobal"
              target="_blank"
              rel="noopener noreferrer"
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
              <div style={{ fontSize: 28, marginBottom: 12 }}>𝕏</div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em' }}>X / TWITTER</div>
              <div style={{ color: '#C9A84C', fontSize: 13, marginTop: 6 }}>@svetglobal</div>
            </a>
            <a
              href="mailto:support@svet.global"
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
              <div style={{ fontSize: 28, marginBottom: 12 }}>📧</div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em' }}>EMAIL</div>
              <div style={{ color: '#C9A84C', fontSize: 13, marginTop: 6 }}>support@svet.global</div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-secondary)', paddingTop: 60, paddingBottom: 80 }}>
        <div className="section__container">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <span className="section-header__label">FAQ</span>
            <h2 className="section-header__title" style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
              Common Questions
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
