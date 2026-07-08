'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';
import { isRussia } from '@/lib/locale';

/* ════════════════════════════════════════════════
   SVET — BRAND LANDING PAGE (Locale-aware)
   ════════════════════════════════════════════════ */

const ru = isRussia();

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero__bg-grid" />
        <div className="hero__content">
          <span className="hero__badge">{t('home.badge')}</span>
          <h1 className="hero__title">SVET</h1>
          <p className="hero__tagline">
            {t('home.tagline')}<br />
            {t('home.tagline2')}
          </p>
          <Link href="/shop" className="hero__cta">
            {t('home.cta')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-line" />
          <span>{t('home.scroll')}</span>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <span className="marquee__item">{t('home.marquee.oneSun')}</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">{t('home.marquee.oneEnergy')}</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">{t('home.marquee.onePlanet')}</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">{t('home.marquee.forEveryone')}</span>
              <span className="marquee__item" style={{ margin: '0 20px', color: 'var(--accent)' }}>●</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ THE ORIGIN STORY ═══ */}
      <section className="section">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">{ru ? 'ЗНАЧЕНИЕ' : 'THE MEANING'}</span>
            <h2 className="section-header__title" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              SVET {ru ? 'значит' : 'means'} <em style={{ color: 'var(--cream)', fontStyle: 'normal' }}>{ru ? 'Свет' : 'Light'}</em>
            </h2>
            <p className="section-header__desc" style={{ maxWidth: 640, fontSize: 16, lineHeight: 1.9 }}>
              {ru
                ? 'В славянских языках СВЕТ — это не просто слово. Это свет, который открывает истину, объединяет людей и освещает то, что важно. Мы взяли это слово и построили вокруг него целый мир.'
                : 'In Slavic languages, SVET (СВЕТ) means light — the kind of light that reveals truth, connects people, and illuminates what matters. We took that word and built a world around it.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ═══ */}
      <section className="features">
        <div className="features__container">
          <div className="feature">
            <div className="feature__icon">☀</div>
            <h3 className="feature__title">{t('home.oneSun')}</h3>
            <p className="feature__desc">{t('home.oneSunDesc')}</p>
          </div>
          <div className="feature">
            <div className="feature__icon">⚡</div>
            <h3 className="feature__title">{t('home.oneEnergy')}</h3>
            <p className="feature__desc">{t('home.oneEnergyDesc')}</p>
          </div>
          <div className="feature">
            <div className="feature__icon">🌍</div>
            <h3 className="feature__title">{t('home.onePlanet')}</h3>
            <p className="feature__desc">{t('home.onePlanetDesc')}</p>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="philosophy">
        <div className="philosophy__container">
          <div>
            <h2 className="philosophy__title">{t('home.connected')}</h2>
            <p className="philosophy__desc">{t('home.connectedDesc1')}</p>
            <p className="philosophy__desc">{t('home.connectedDesc2')}</p>
            <div className="philosophy__stats">
              <div className="philosophy__stat">
                <span className="philosophy__stat-number">∞</span>
                <span className="philosophy__stat-label">{t('home.connections')}</span>
              </div>
              <div className="philosophy__stat">
                <span className="philosophy__stat-number">1</span>
                <span className="philosophy__stat-label">{t('home.planet')}</span>
              </div>
              <div className="philosophy__stat">
                <span className="philosophy__stat-number">{ru ? 'ВСЕ' : 'ALL'}</span>
                <span className="philosophy__stat-label">{t('home.forEveryone')}</span>
              </div>
            </div>
          </div>
          <div className="philosophy__visual">☀️</div>
        </div>
      </section>

      {/* ═══ BRAND TIMELINE ═══ */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">{ru ? 'НАШ ПУТЬ' : 'OUR JOURNEY'}</span>
            <h2 className="section-header__title">{ru ? 'История SVET' : 'The SVET Story'}</h2>
          </div>
          <div className="svet-timeline">
            <div className="svet-timeline__item">
              <div className="svet-timeline__dot" />
              <div className="svet-timeline__content">
                <div className="svet-timeline__year">{ru ? 'Идея' : 'The Idea'}</div>
                <p className="svet-timeline__text">
                  {ru
                    ? 'Родилась из простого убеждения: одежда должна нести смысл, а не просто стиль. Каждая нить должна связывать человека с чем-то большим.'
                    : 'Born from a simple belief: clothing should carry meaning, not just style. Every thread should connect the person wearing it to something bigger.'
                  }
                </p>
              </div>
            </div>
            <div className="svet-timeline__item">
              <div className="svet-timeline__dot" />
              <div className="svet-timeline__content">
                <div className="svet-timeline__year">{ru ? 'Философия' : 'The Philosophy'}</div>
                <p className="svet-timeline__text">
                  {ru
                    ? 'Одно Солнце. Одна Энергия. Одна Планета. Для Всех. — Четыре истины, ставшие нашим компасом. Не слоган. Образ жизни.'
                    : 'One Sun. One Energy. One Planet. For Everyone. — Four truths that became our compass. Not a tagline. A way of living.'
                  }
                </p>
              </div>
            </div>
            <div className="svet-timeline__item">
              <div className="svet-timeline__dot" />
              <div className="svet-timeline__content">
                <div className="svet-timeline__year">{ru ? 'Дизайн' : 'The Design'}</div>
                <p className="svet-timeline__text">
                  {ru
                    ? 'Плотные ткани премиум-качества. Объёмная вышивка. Винтажные стирки. Каждая вещь создана быть высказыванием, а не просто одеждой.'
                    : 'Premium heavyweight fabrics. Bubble embroidery. Vintage washes. Every piece designed to feel like a statement, not just a garment.'
                  }
                </p>
              </div>
            </div>
            <div className="svet-timeline__item">
              <div className="svet-timeline__dot svet-timeline__dot--active" />
              <div className="svet-timeline__content">
                <div className="svet-timeline__year" style={{ color: 'var(--accent)' }}>
                  {ru ? 'Сейчас — Предзаказ' : 'Now — Pre-Order'}
                </div>
                <p className="svet-timeline__text">
                  {ru
                    ? 'Первый дроп готов. 5 вещей. Худи, футболка, лонгслив, джоггеры и шапка. Закажите сейчас по эксклюзивным ценам предзаказа.'
                    : 'The first drop is ready. 5 pieces. Hoodie, tees, long sleeve, sweatpants, and a beanie. Pre-order now at exclusive launch prices before retail drop.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SVET FUND — COMING SOON TEASER ═══ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, rgba(201,168,76,0.03) 50%, var(--bg) 100%)' }}>
        <div className="section__container" style={{ textAlign: 'center', maxWidth: 640 }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.6 }}>🌱</div>
          <span className="section-header__label" style={{ color: 'var(--accent)' }}>
            {ru ? 'СКОРО' : 'COMING SOON'}
          </span>
          <h2 className="section-header__title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginTop: 12 }}>
            Svet Fund
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 16,
            lineHeight: 1.9,
            maxWidth: 520,
            margin: '16px auto 0',
          }}>
            {ru
              ? 'Часть от каждой покупки SVET пойдёт на проекты, которые несут свет — доступ к чистой энергии, образование и развитие сообществ. Фонд создаётся. Подробности скоро.'
              : 'A portion of every SVET purchase will go toward projects that bring light — clean energy access, education, and community infrastructure. The fund is being set up. Details soon.'
            }
          </p>
          <div style={{
            marginTop: 24,
            padding: '10px 24px',
            display: 'inline-block',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 20,
            fontSize: 12,
            letterSpacing: '0.15em',
            color: 'var(--accent)',
            fontWeight: 600,
          }}>
            {ru ? 'ЗАПУСК 2026' : 'LAUNCHING 2026'}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="ecosystem-banner">
        <div className="ecosystem-banner__container">
          <div style={{ fontSize: 48, marginBottom: 16 }}>☀</div>
          <h2 className="ecosystem-banner__title" style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}>
            {ru ? 'Носи Свет' : 'Wear the Light'}
          </h2>
          <p className="ecosystem-banner__desc" style={{ maxWidth: 500, fontSize: 16, lineHeight: 1.8 }}>
            {ru
              ? '5 вещей премиум-качества. Цены предзаказа. Бесплатная доставка.'
              : '5 premium pieces. Pre-order prices. Free shipping.'
            }
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/shop" className="hero__cta" style={{ marginTop: 0 }}>
              {ru ? 'КОЛЛЕКЦИЯ' : 'EXPLORE COLLECTION'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
            <Link href="/about" className="hero__cta hero__cta--outline" style={{ marginTop: 0 }}>
              {ru ? 'НАША ИСТОРИЯ' : 'OUR STORY'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
