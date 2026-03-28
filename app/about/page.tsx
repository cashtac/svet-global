'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      {/* ═══ HERO — Full-bleed impact ═══ */}
      <section className="about-hero">
        <div className="about-hero__particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="about-hero__particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
              }}
            />
          ))}
        </div>
        <div className="about-hero__pulse" />
        <div className="about-hero__content">
          <span className="about-hero__badge">{t('about.badge')}</span>
          <h1 className="about-hero__title">{t('about.title')}</h1>
          <p className="about-hero__sub">{t('about.heroDesc')}</p>
          <div className="about-hero__scroll-hint">
            <div className="about-hero__scroll-line" />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee" style={{ borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <span className="marquee__item">{t('home.marquee.oneSun')}</span>
              <span className="marquee__item" style={{ margin: '0 20px', color: '#C9A84C' }}>◆</span>
              <span className="marquee__item">{t('home.marquee.oneEnergy')}</span>
              <span className="marquee__item" style={{ margin: '0 20px', color: '#C9A84C' }}>◆</span>
              <span className="marquee__item">{t('home.marquee.onePlanet')}</span>
              <span className="marquee__item" style={{ margin: '0 20px', color: '#C9A84C' }}>◆</span>
              <span className="marquee__item">{t('home.marquee.forEveryone')}</span>
              <span className="marquee__item" style={{ margin: '0 20px', color: 'var(--accent)' }}>●</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ MEANING SECTION — with visual accent ═══ */}
      <section className="about-meaning">
        <div className="about-meaning__container">
          <div className="about-meaning__accent">☀</div>
          <h2 className="about-meaning__title">{t('about.meaningTitle')}</h2>
          <p className="about-meaning__text">{t('about.meaningP1')}</p>
          <p className="about-meaning__text">{t('about.meaningP2')}</p>
          <p className="about-meaning__text about-meaning__text--highlight">{t('about.meaningP3')}</p>
        </div>
      </section>

      {/* ═══ THREE PILLARS — animated cards ═══ */}
      <section className="about-pillars">
        <div className="about-pillars__container">
          <div className="about-pillar">
            <div className="about-pillar__glow" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)' }} />
            <div className="about-pillar__icon">☀</div>
            <h3 className="about-pillar__title">{t('home.oneSun')}</h3>
            <p className="about-pillar__desc">{t('about.oneSunDesc')}</p>
          </div>
          <div className="about-pillar">
            <div className="about-pillar__glow" style={{ background: 'radial-gradient(circle, rgba(233,51,35,0.1) 0%, transparent 70%)' }} />
            <div className="about-pillar__icon">⚡</div>
            <h3 className="about-pillar__title">{t('home.oneEnergy')}</h3>
            <p className="about-pillar__desc">{t('about.oneEnergyDesc')}</p>
          </div>
          <div className="about-pillar">
            <div className="about-pillar__glow" style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%)' }} />
            <div className="about-pillar__icon">🌍</div>
            <h3 className="about-pillar__title">{t('home.onePlanet')}</h3>
            <p className="about-pillar__desc">{t('about.onePlanetDesc')}</p>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="about-stats">
        <div className="about-stats__item">
          <span className="about-stats__number">∞</span>
          <span className="about-stats__label">{t('home.connections')}</span>
        </div>
        <div className="about-stats__divider" />
        <div className="about-stats__item">
          <span className="about-stats__number">1</span>
          <span className="about-stats__label">{t('home.planet')}</span>
        </div>
        <div className="about-stats__divider" />
        <div className="about-stats__item">
          <span className="about-stats__number">ALL</span>
          <span className="about-stats__label">{t('home.forEveryone')}</span>
        </div>
      </section>

      {/* ═══ CLOSING CTA ═══ */}
      <section className="about-closing">
        <div className="about-closing__container">
          <h2 className="about-closing__title">{t('about.forEveryoneTitle')}</h2>
          <p className="about-closing__desc">{t('about.forEveryoneDesc')}</p>
          <div className="about-closing__cta-row">
            <Link href="/shop" className="hero__cta" style={{ marginTop: 0 }}>
              {t('home.learnMore')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </div>
          <p className="about-closing__svet">☀ SVET ☀</p>
        </div>
      </section>
    </>
  );
}
