'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';
import { useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════════════
   /chain — The Engagement Chain System
   ════════════════════════════════════════════════ */

const CHAIN_SLOTS = [
  { id: 'precision', emoji: '🪲', nameKey: 'chain.slot.precision', descKey: 'chain.slot.precision.desc' },
  { id: 'creation',  emoji: '🐝', nameKey: 'chain.slot.creation',  descKey: 'chain.slot.creation.desc' },
  { id: 'light',     emoji: '☀️', nameKey: 'chain.slot.light',     descKey: 'chain.slot.light.desc' },
  { id: 'vision',    emoji: '🦅', nameKey: 'chain.slot.vision',    descKey: 'chain.slot.vision.desc' },
  { id: 'memory',    emoji: '🐋', nameKey: 'chain.slot.memory',    descKey: 'chain.slot.memory.desc' },
  { id: 'grace',     emoji: '🐆', nameKey: 'chain.slot.grace',     descKey: 'chain.slot.grace.desc' },
  { id: 'endurance', emoji: '🐻', nameKey: 'chain.slot.endurance', descKey: 'chain.slot.endurance.desc' },
  { id: 'power',     emoji: '🌿', nameKey: 'chain.slot.power',     descKey: 'chain.slot.power.desc' },
  { id: 'eternity',  emoji: '🦁', nameKey: 'chain.slot.eternity',  descKey: 'chain.slot.eternity.desc' },
];

function ChainSlot({ slot, index, filled }: { slot: typeof CHAIN_SLOTS[0]; index: number; filled: boolean }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`chain-slot fade-in-up ${filled ? 'chain-slot--filled' : ''}`} ref={ref} style={{ animationDelay: `${index * 100}ms` }}>
      <div className="chain-slot__number">{String(index + 1).padStart(2, '0')}</div>
      <div className={`chain-slot__circle ${filled ? 'chain-slot__circle--filled' : ''}`}>
        <span className="chain-slot__emoji">{slot.emoji}</span>
        {filled && <div className="chain-slot__glow" />}
      </div>
      <div className="chain-slot__info">
        <h3 className="chain-slot__name">{t(slot.nameKey as any)}</h3>
        <p className="chain-slot__desc">{t(slot.descKey as any)}</p>
      </div>
      {index < 8 && <div className="chain-slot__connector" />}
    </div>
  );
}

export default function ChainPage() {
  const { t } = useI18n();
  // Demo: first slot filled (first visit)
  const [filledSlots, setFilledSlots] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    // Animate filling on page load for demo effect
    const timer = setTimeout(() => setFilledSlots(new Set([0])), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="chain-page">
      <div className="section__container">
        <div className="section-header" style={{ paddingTop: 120 }}>
          <span className="section-header__label" style={{ color: '#C9A84C' }}>{t('chain.label' as any)}</span>
          <h1 className="section-header__title">{t('chain.title' as any)}</h1>
          <p className="section-header__desc">{t('chain.desc' as any)}</p>
        </div>

        {/* Visual Chain */}
        <div className="chain-visual">
          <div className="chain-visual__track">
            {CHAIN_SLOTS.map((slot, i) => (
              <div key={slot.id} className={`chain-visual__node ${filledSlots.has(i) ? 'chain-visual__node--active' : ''}`}>
                <span>{slot.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed slots */}
        <div className="chain-list">
          {CHAIN_SLOTS.map((slot, i) => (
            <ChainSlot key={slot.id} slot={slot} index={i} filled={filledSlots.has(i)} />
          ))}
        </div>

        {/* SVET COMPLETE reward */}
        <div className="chain-complete">
          <div className="chain-complete__badge">✦ SVET COMPLETE ✦</div>
          <h2 className="chain-complete__title">{t('chain.complete.title' as any)}</h2>
          <p className="chain-complete__desc">{t('chain.complete.desc' as any)}</p>
          <div className="chain-complete__rewards">
            <div className="chain-complete__reward">🎁 {t('chain.complete.r1' as any)}</div>
            <div className="chain-complete__reward">📜 {t('chain.complete.r2' as any)}</div>
            <div className="chain-complete__reward">🏆 {t('chain.complete.r3' as any)}</div>
          </div>
          <Link href="/shop" className="chain-complete__cta">{t('chain.complete.cta' as any)}</Link>
        </div>
      </div>
    </section>
  );
}
