import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — SVET AI',
  description: 'AI-powered personal assistant plans. From Starter to Business — choose the plan that fits.',
};

/* ════════════════════════════════════════════════
   SVET AI — SUBSCRIPTION PRICING
   ════════════════════════════════════════════════ */

const PLANS = [
  {
    name: 'Starter',
    price: 23,
    period: '/mo',
    highlight: false,
    features: [
      'Personal AI assistant',
      'Chat & task management',
      'Basic integrations',
      '24h FREE with $100+ clothing order',
    ],
  },
  {
    name: 'Builder',
    price: 69,
    period: '/mo',
    highlight: true,
    features: [
      'Full AI capabilities',
      'Build, create, launch projects',
      'Advanced integrations',
      'Priority support',
      'Custom workflows',
    ],
  },
  {
    name: 'Ultra',
    price: 99,
    period: '/mo',
    highlight: false,
    features: [
      'Personal AI + self-hostable',
      'Transfer to your own server',
      'Full source access',
      'Unlimited usage',
      'White-label ready',
    ],
  },
  {
    name: 'Business',
    price: 299,
    period: '/mo',
    highlight: false,
    features: [
      'Enterprise-grade AI',
      'Team collaboration',
      'Custom integrations',
      'Dedicated support',
      'SSO & admin controls',
      'SLA guarantee',
    ],
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
  return (
    <>
      {/* Promo banner */}
      <div className="pricing-promo-banner">
        🎁 Buy $100+ of SVET clothing → get 24h Starter FREE
      </div>

      <section className="section" style={{ paddingTop: 140 }}>
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">AI Subscriptions</span>
            <h1 className="section-header__title">CHOOSE YOUR PLAN</h1>
            <p className="section-header__desc">
              AI-powered personal assistant. Build, create, and launch with SVET.
            </p>
          </div>

          {/* Plans grid */}
          <div className="pricing-grid">
            {PLANS.map(plan => (
              <div key={plan.name} className={`pricing-card ${plan.highlight ? 'pricing-card--popular' : ''}`}>
                {plan.highlight && <div className="pricing-card__popular-tag">MOST POPULAR</div>}
                <h3 className="pricing-card__name">{plan.name}</h3>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">${plan.price}</span>
                  <span className="pricing-card__period">{plan.period}</span>
                </div>
                <ul className="pricing-card__features">
                  {plan.features.map((f, i) => (
                    <li key={i} className="pricing-card__feature">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`pricing-card__cta ${plan.highlight ? 'pricing-card__cta--highlight' : ''}`}>
                  Get {plan.name}
                </button>
              </div>
            ))}
          </div>

          {/* Free tier promo */}
          <div className="pricing-free-promo">
            <div className="pricing-free-promo__icon">🎁</div>
            <div>
              <h3 className="pricing-free-promo__title">FREE 24h Starter Access</h3>
              <p className="pricing-free-promo__desc">
                Spend $100+ on SVET clothing and unlock 24 hours of Starter AI for free. No credit card needed for the trial.
              </p>
            </div>
            <Link href="/shop" className="pricing-free-promo__link">
              Shop Now →
            </Link>
          </div>

          {/* Payment methods */}
          <div className="pricing-payments">
            <h3 className="pricing-payments__title">Payment Methods</h3>
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
