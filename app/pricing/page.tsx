'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';
import type { TranslationKey } from '@/lib/i18n';

/* ════════════════════════════════════════════════
   SVET AI — SUBSCRIPTION PRICING
   ════════════════════════════════════════════════ */

interface Plan {
  name: string;
  price: number;
  period: string;
  highlight: boolean;
  featureKeys: TranslationKey[];
}

const PLANS: Plan[] = [
  {
    name: 'Starter', price: 23, period: '/mo', highlight: false,
    featureKeys: ['plan.starter.f1', 'plan.starter.f2', 'plan.starter.f3', 'plan.starter.f4'],
  },
  {
    name: 'Builder', price: 69, period: '/mo', highlight: true,
    featureKeys: ['plan.builder.f1', 'plan.builder.f2', 'plan.builder.f3', 'plan.builder.f4', 'plan.builder.f5'],
  },
  {
    name: 'Ultra', price: 99, period: '/mo', highlight: false,
    featureKeys: ['plan.ultra.f1', 'plan.ultra.f2', 'plan.ultra.f3', 'plan.ultra.f4', 'plan.ultra.f5'],
  },
  {
    name: 'Business', price: 299, period: '/mo', highlight: false,
    featureKeys: ['plan.business.f1', 'plan.business.f2', 'plan.business.f3', 'plan.business.f4', 'plan.business.f5', 'plan.business.f6'],
  },
];

const PAYMENT_METHODS = [
  { name: 'Stripe', icon: '💳', status: 'active' as const },
  { name: 'Apple Pay', icon: '🍎', status: 'active' as const },
  { name: 'Google Pay', icon: '🔵', status: 'active' as const },
  { name: 'Crypto', icon: '₿', status: 'soon' as const },
  { name: 'Telegram Stars', icon: '⭐', status: 'soon' as const },
];

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Promo banner */}
      <div className="pricing-promo-banner">
        {t('pricing.banner')}
      </div>

      <section className="section" style={{ paddingTop: 140 }}>
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">{t('pricing.label')}</span>
            <h1 className="section-header__title">{t('pricing.title')}</h1>
            <p className="section-header__desc">
              {t('pricing.desc')}
            </p>
          </div>

          {/* Plans grid */}
          <div className="pricing-grid">
            {PLANS.map(plan => (
              <div key={plan.name} className={`pricing-card ${plan.highlight ? 'pricing-card--popular' : ''}`}>
                {plan.highlight && <div className="pricing-card__popular-tag">{t('pricing.popular')}</div>}
                <h3 className="pricing-card__name">{plan.name}</h3>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">${plan.price}</span>
                  <span className="pricing-card__period">{plan.period}</span>
                </div>
                <ul className="pricing-card__features">
                  {plan.featureKeys.map((fk, i) => (
                    <li key={i} className="pricing-card__feature">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {t(fk)}
                    </li>
                  ))}
                </ul>
                <button className={`pricing-card__cta ${plan.highlight ? 'pricing-card__cta--highlight' : ''}`}>
                  {t('pricing.get')} {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Free tier promo */}
          <div className="pricing-free-promo">
            <div className="pricing-free-promo__icon">🎁</div>
            <div>
              <h3 className="pricing-free-promo__title">{t('pricing.freeTitle')}</h3>
              <p className="pricing-free-promo__desc">
                {t('pricing.freeDesc')}
              </p>
            </div>
            <Link href="/shop" className="pricing-free-promo__link">
              {t('pricing.shopNow')}
            </Link>
          </div>

          {/* Payment methods */}
          <div className="pricing-payments">
            <h3 className="pricing-payments__title">{t('pricing.paymentTitle')}</h3>
            <div className="pricing-payments__grid">
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.name} className={`pricing-payment ${pm.status === 'soon' ? 'pricing-payment--soon' : ''}`}>
                  <span className="pricing-payment__icon">{pm.icon}</span>
                  <span className="pricing-payment__name">{pm.name}</span>
                  {pm.status === 'active'
                    ? <span className="pricing-payment__status pricing-payment__status--active">✅</span>
                    : <span className="pricing-payment__status pricing-payment__status--soon">🔜</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
