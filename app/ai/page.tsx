'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';

const AI_CARDS = [
  { key: 'card1', icon: '☀️', emoji: '☀️' },
  { key: 'card2', icon: '📧', emoji: '📧' },
  { key: 'card3', icon: '🔍', emoji: '🔍' },
  { key: 'card4', icon: '📄', emoji: '📄' },
  { key: 'card5', icon: '📞', emoji: '📞' },
  { key: 'card6', icon: '🧠', emoji: '🧠' },
];

export default function AIPage() {
  const { t } = useI18n();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="ai-hero">
        <div className="ai-hero__particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="ai-hero__particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>
        <div className="ai-hero__pulse" />
        <div className="ai-hero__pulse ai-hero__pulse--2" />
        <div className="ai-hero__content">
          <span className="ai-hero__badge">SVET AI</span>
          <h1 className="ai-hero__title">{t('ai.hero')}</h1>
          <p className="ai-hero__sub">{t('ai.heroSub')}</p>
          <Link href="/pricing" className="ai-hero__cta">
            {t('ai.cta')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="ai-capabilities">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">{t('ai.capLabel')}</span>
            <h2 className="section-header__title">{t('ai.capTitle')}</h2>
            <p className="section-header__desc">{t('ai.capDesc')}</p>
          </div>
          <div className="ai-cards">
            {AI_CARDS.map((card, i) => (
              <div key={i} className="ai-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="ai-card__icon">{card.emoji}</div>
                <h3 className="ai-card__title">{t(`ai.${card.key}`)}</h3>
                <p className="ai-card__desc">{t(`ai.${card.key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING CALLOUT ═══ */}
      <section className="ai-pricing-callout">
        <div className="ai-pricing-callout__inner">
          <div className="ai-pricing-callout__glow" />
          <h2 className="ai-pricing-callout__title">{t('ai.pricingTitle')}</h2>
          <p className="ai-pricing-callout__promo">{t('ai.promoHighlight')}</p>
          <Link href="/pricing" className="ai-pricing-callout__cta">
            {t('ai.pricingCta')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
