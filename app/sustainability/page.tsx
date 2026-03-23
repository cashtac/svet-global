'use client';

import { useI18n } from '@/lib/i18n-provider';
import { useEffect, useRef } from 'react';

/* ════════════════════════════════════════════════
   /sustainability — Mission & Commitments
   ════════════════════════════════════════════════ */

const COMMITMENTS = [
  { emoji: '🌱', key: 'sust.c1' },
  { emoji: '♻️', key: 'sust.c2' },
  { emoji: '🚢', key: 'sust.c3' },
  { emoji: '🤝', key: 'sust.c4' },
  { emoji: '🏭', key: 'sust.c5' },
];

const ANIMALS_SHORT = [
  { name: 'Eagle', meaning: 'Freedom' },
  { name: 'Scarab', meaning: 'Rebirth' },
  { name: 'Bear', meaning: 'Endurance' },
  { name: 'Snow Leopard', meaning: 'Grace' },
  { name: 'Jaguar', meaning: 'Power' },
  { name: 'Whale', meaning: 'Memory' },
  { name: 'Bee', meaning: 'Creation' },
  { name: 'Wasp', meaning: 'Precision' },
  { name: 'Lion', meaning: 'Eternity' },
];

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div className="fade-in-up" ref={ref} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}

export default function SustainabilityPage() {
  const { t } = useI18n();

  return (
    <section className="sust-page">
      <div className="section__container">
        {/* WHY WE EXIST */}
        <div className="section-header" style={{ paddingTop: 120 }}>
          <span className="section-header__label" style={{ color: '#C9A84C' }}>{t('sust.label' as any)}</span>
          <h1 className="section-header__title">{t('sust.title' as any)}</h1>
        </div>

        <FadeSection>
          <div className="sust-manifesto">
            <p className="sust-manifesto__text">{t('sust.manifesto1' as any)}</p>
            <p className="sust-manifesto__text">{t('sust.manifesto2' as any)}</p>
          </div>
        </FadeSection>

        {/* OUR COMMITMENTS */}
        <FadeSection delay={100}>
          <h2 className="sust-section-title">{t('sust.commitTitle' as any)}</h2>
          <div className="sust-commitments">
            {COMMITMENTS.map((c, i) => (
              <div key={i} className="sust-commit-card">
                <span className="sust-commit-card__emoji">{c.emoji}</span>
                <p className="sust-commit-card__text">{t(c.key as any)}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* THE ANIMALS */}
        <FadeSection delay={200}>
          <h2 className="sust-section-title">{t('sust.animalsTitle' as any)}</h2>
          <div className="sust-animals">
            {ANIMALS_SHORT.map((a, i) => (
              <div key={i} className="sust-animal-tag">
                <span className="sust-animal-tag__name">{a.name}</span>
                <span className="sust-animal-tag__dash">—</span>
                <span className="sust-animal-tag__meaning">{a.meaning}</span>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Final quote */}
        <FadeSection delay={300}>
          <blockquote className="sust-quote">
            {t('sust.quote' as any)}
          </blockquote>
        </FadeSection>
      </div>
    </section>
  );
}
