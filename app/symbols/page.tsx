'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';
import { useEffect, useRef } from 'react';

/* ════════════════════════════════════════════════
   /symbols — The 9 Symbols of SVET
   ════════════════════════════════════════════════ */

const SYMBOLS = [
  {
    id: 'scarab',
    emoji: '🪲',
    svgPath: 'M12 2C8 2 5.5 5 5.5 8.5c0 2 1 3.5 2.5 4.5v3c0 .5.2 1 .6 1.4l3 3c.3.3.6.1.6-.3V17c0-.3.2-.5.5-.5h.6c.3 0 .5.2.5.5v2.1c0 .4.3.6.6.3l3-3c.4-.4.6-.9.6-1.4v-3c1.5-1 2.5-2.5 2.5-4.5C18.5 5 16 2 12 2zm-2 7a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z',
    nameKey: 'symbols.scarab',
    meaningKey: 'symbols.scarab.meaning',
    descKey: 'symbols.scarab.desc',
  },
  {
    id: 'eagle',
    emoji: '🦅',
    svgPath: 'M12 2L4 8l2 2-2 4 4-1 4 9 4-9 4 1-2-4 2-2-8-6zm0 4a1 1 0 110 2 1 1 0 010-2z',
    nameKey: 'symbols.eagle',
    meaningKey: 'symbols.eagle.meaning',
    descKey: 'symbols.eagle.desc',
  },
  {
    id: 'bear',
    emoji: '🐻',
    svgPath: 'M5 8a3 3 0 016 0v1h2V8a3 3 0 016 0c0 1-.5 1.8-1.2 2.4.1.5.2 1 .2 1.6 0 2.5-1 4.5-2.5 5.8v2.2a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2.2C6 16.5 5 14.5 5 12c0-.6.1-1.1.2-1.6C4.5 9.8 4 9 4 8a1 1 0 011 0zm5 5a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm-3 2c0 .5.4 1 1 1s1-.5 1-1h-2z',
    nameKey: 'symbols.bear',
    meaningKey: 'symbols.bear.meaning',
    descKey: 'symbols.bear.desc',
  },
  {
    id: 'snowleopard',
    emoji: '🐆',
    svgPath: 'M4 11c0-3.3 3.6-7 8-7s8 3.7 8 7c0 2-1 3.5-2.5 4.5l1.5 3.5h-3l-1-2h-6l-1 2H5l1.5-3.5C5 14.5 4 13 4 11zm6 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm-2 1.5c.8 0 1.5-.3 1.5-.7s-.7-.3-1.5-.3-1.5-.1-1.5.3.7.7 1.5.7z',
    nameKey: 'symbols.snowleopard',
    meaningKey: 'symbols.snowleopard.meaning',
    descKey: 'symbols.snowleopard.desc',
  },
  {
    id: 'jaguar',
    emoji: '🐆',
    svgPath: 'M3 10c0-3 2.7-6 6-6 1 0 2 .3 3 1 1-.7 2-1 3-1 3.3 0 6 3 6 6 0 2-1 3.8-2.5 5L20 18h-3l-1.5-2H15c-1.1 2-3.1 3-5 3a7 7 0 01-7-9zm6 0a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z',
    nameKey: 'symbols.jaguar',
    meaningKey: 'symbols.jaguar.meaning',
    descKey: 'symbols.jaguar.desc',
  },
  {
    id: 'whale',
    emoji: '🐋',
    svgPath: 'M3 12c0-4 3.6-7 8-7 .5-1.5 1.5-3 3-3 0 1-.5 2-1 2.5 2.5 1 4.5 3.5 4.5 6.5 0 2-1 4-2.5 5.5l-2.5-1 1 3.5c-1 .5-2 .5-3 .5h-1l1-3-3 1C4.5 16 3 14 3 12zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z',
    nameKey: 'symbols.whale',
    meaningKey: 'symbols.whale.meaning',
    descKey: 'symbols.whale.desc',
  },
  {
    id: 'bee',
    emoji: '🐝',
    svgPath: 'M12 2c-1 0-2 .5-2.5 1.5L8 3C6.5 3 5 4.5 5 6.5 5 8 6 9.5 7 10.5V14c0 2 1 3.5 2.5 4.5L12 22l2.5-3.5C16 17.5 17 16 17 14v-3.5c1-1 2-2.5 2-4.5C19 4.5 17.5 3 16 3l-1.5.5C14 2.5 13 2 12 2zm-1 7a1 1 0 110-2 1 1 0 010 2zm2 0a1 1 0 110-2 1 1 0 010 2zM9 12h6M9 14h6',
    nameKey: 'symbols.bee',
    meaningKey: 'symbols.bee.meaning',
    descKey: 'symbols.bee.desc',
  },
  {
    id: 'wasp',
    emoji: '🪲',
    svgPath: 'M12 2c-1.5 0-3 1-3 2.5v1c-2.5 1-4 3.5-4 6 0 1.5.5 3 1.5 4l1 3.5c.5 1 1.5 2 3 2h3c1.5 0 2.5-1 3-2l1-3.5c1-1 1.5-2.5 1.5-4 0-2.5-1.5-5-4-6v-1c0-1.5-1.5-2.5-3-2.5zm-1.5 8a1 1 0 110-2 1 1 0 010 2zm3 0a1 1 0 110-2 1 1 0 010 2zM9.5 13h5M9.5 15h5',
    nameKey: 'symbols.wasp',
    meaningKey: 'symbols.wasp.meaning',
    descKey: 'symbols.wasp.desc',
  },
  {
    id: 'lion',
    emoji: '🦁',
    svgPath: 'M12 2C8 2 5 4.5 5 8c-1.5.5-3 2-3 4 0 1.5 1 3 2 4v2c0 2.5 2.5 4 5 4h6c2.5 0 5-1.5 5-4v-2c1-1 2-2.5 2-4 0-2-1.5-3.5-3-4 0-3.5-3-6-7-6zm-2 8a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2zm-2 2c1.1 0 2 .4 2 1s-.9 1-2 1-2-.4-2-1 .9-1 2-1z',
    nameKey: 'symbols.lion',
    meaningKey: 'symbols.lion.meaning',
    descKey: 'symbols.lion.desc',
  },
];

function SymbolCard({ symbol, index }: { symbol: typeof SYMBOLS[0]; index: number }) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="symbol-card fade-in-up" ref={cardRef} style={{ animationDelay: `${index * 80}ms` }}>
      <div className="symbol-card__icon-wrap">
        <svg className="symbol-card__svg" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d={symbol.svgPath} />
        </svg>
        <span className="symbol-card__emoji">{symbol.emoji}</span>
      </div>
      <h3 className="symbol-card__name">{t(symbol.nameKey as any)}</h3>
      <span className="symbol-card__meaning">{t(symbol.meaningKey as any)}</span>
      <p className="symbol-card__desc">{t(symbol.descKey as any)}</p>
    </div>
  );
}

export default function SymbolsPage() {
  const { t } = useI18n();

  return (
    <section className="symbols-page">
      <div className="section__container">
        <div className="section-header" style={{ paddingTop: 120 }}>
          <span className="section-header__label" style={{ color: '#C9A84C' }}>{t('symbols.label' as any)}</span>
          <h1 className="section-header__title">{t('symbols.title' as any)}</h1>
          <p className="section-header__desc">{t('symbols.desc' as any)}</p>
        </div>

        <div className="symbols-grid">
          {SYMBOLS.map((s, i) => (
            <SymbolCard key={s.id} symbol={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="symbols-bottom">
          <p className="symbols-bottom__text">{t('symbols.question' as any)}</p>
          <Link href="/pricing" className="symbols-bottom__cta">
            {t('symbols.cta' as any)}
          </Link>
        </div>
      </div>
    </section>
  );
}
