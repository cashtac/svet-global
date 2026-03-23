'use client';

import { useI18n } from '@/lib/i18n-provider';
import { useEffect, useRef } from 'react';

/* ════════════════════════════════════════════════
   /insight — DID YOU KNOW? (Daily Insight)
   ════════════════════════════════════════════════ */

const CATEGORIES = [
  { emoji: '🏛️', label: 'History' },
  { emoji: '🧠', label: 'Psychology' },
  { emoji: '🌿', label: 'Nature' },
  { emoji: '💰', label: 'Business' },
  { emoji: '☀️', label: 'SVET Philosophy' },
];

const YESTERDAY_INSIGHT = 'The people who built the pyramids were paid workers, not slaves. They had healthcare, beer, and paid sick leave.';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div className="fade-in-up" ref={ref} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}

export default function InsightPage() {
  const { t } = useI18n();

  return (
    <section className="insight-page">
      <div className="section__container">
        <div className="section-header" style={{ paddingTop: 120 }}>
          <span className="section-header__label" style={{ color: '#C9A84C' }}>{t('insight.label' as any)}</span>
          <h1 className="section-header__title" style={{ fontSize: '2.5rem' }}>💡 {t('insight.title' as any)}</h1>
          <p className="section-header__desc">{t('insight.subtitle' as any)}</p>
        </div>

        {/* Today's Insight — LOCKED */}
        <FadeIn>
          <div className="insight-card insight-card--locked">
            <div className="insight-card__glow" />
            <div className="insight-card__lock">🔒</div>
            <h2 className="insight-card__title">TODAY&apos;S INSIGHT</h2>
            <p className="insight-card__locked-text">{t('insight.locked' as any)}</p>
            <button className="insight-card__unlock-btn">{t('insight.unlock' as any)}</button>
          </div>
        </FadeIn>

        {/* Yesterday's — FREE */}
        <FadeIn delay={100}>
          <div className="insight-card insight-card--free">
            <span className="insight-card__badge">FREE</span>
            <p className="insight-card__label">{t('insight.yesterday' as any)}</p>
            <blockquote className="insight-card__quote">&ldquo;{YESTERDAY_INSIGHT}&rdquo;</blockquote>
          </div>
        </FadeIn>

        {/* Categories */}
        <FadeIn delay={200}>
          <h3 className="insight-categories__title">{t('insight.categories' as any)}</h3>
          <div className="insight-categories">
            {CATEGORIES.map((c, i) => (
              <div key={i} className="insight-cat-tag">{c.emoji} {c.label}</div>
            ))}
          </div>
        </FadeIn>

        {/* Subscriber note */}
        <FadeIn delay={300}>
          <p className="insight-subscriber-note">✨ {t('insight.subscriberNote' as any)}</p>
        </FadeIn>
      </div>
    </section>
  );
}
