'use client';

import Link from 'next/link';
import { getProducts, formatPrice, Product } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { useI18n } from '@/lib/i18n-provider';
import { useEffect, useState } from 'react';

// Mock data for when API is not running
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'SVET Logo Long Sleeve', slug: 'svet-logo-long-sleeve',
    shortDescription: 'Wear light. Spread warmth. One Sun connects us all.',
    price: 8500, currency: 'USD', images: ['/images/long-sleeve.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'SVET', color: 'Yellow / Red Print',
    category: 'TOPS', status: 'ACTIVE',
  },
  {
    id: '2', name: 'SVET Hoodie & Pants Set', slug: 'svet-hoodie-pants-set',
    shortDescription: 'Top and bottom, moving as one. One Energy in every fiber.',
    price: 18000, currency: 'USD', images: ['/images/hoodie-set.png'],
    sizes: ['S', 'M', 'L', 'XL'], badge: '3 WAYS', color: 'Forest Green',
    category: 'SETS', status: 'ACTIVE',
  },
  {
    id: '3', name: 'SVET Logo Tee 3-Pack', slug: 'svet-logo-tee-3pack',
    shortDescription: 'Three tees, one message. One Planet, many ways to share.',
    price: 6500, currency: 'USD', images: ['/images/tee-pack.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'SVET', color: 'Black / White / Red',
    category: 'TOPS', status: 'ACTIVE',
  },
  {
    id: '4', name: 'SVET Embroidered Cap', slug: 'svet-embroidered-cap',
    shortDescription: 'Crown yourself in light. For everyone, everywhere.',
    price: 4500, currency: 'USD', images: ['/images/cap.png'],
    sizes: ['ONE SIZE'], badge: 'SVET', color: 'Black',
    category: 'ACCESSORIES', status: 'ACTIVE',
  },
];

export default function Home() {
  const { t } = useI18n();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    getProducts().then(p => setProducts(p)).catch(() => setProducts(MOCK_PRODUCTS));
  }, []);

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

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="section">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">{t('home.featuredLabel')}</span>
            <h2 className="section-header__title">{t('home.wearTheLight')}</h2>
            <p className="section-header__desc">
              {t('home.featuredDesc')}
            </p>
          </div>
          <div className="products">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
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
                <span className="philosophy__stat-number">ALL</span>
                <span className="philosophy__stat-label">{t('home.forEveryone')}</span>
              </div>
            </div>
          </div>
          <div className="philosophy__visual">☀️</div>
        </div>
      </section>

      {/* ═══ COMMUNITY ═══ */}
      <section className="ecosystem-banner">
        <div className="ecosystem-banner__container">
          <div className="ecosystem-banner__label">{t('home.connectionTokens')}</div>
          <h2 className="ecosystem-banner__title">{t('home.joinConnection')}</h2>
          <p className="ecosystem-banner__desc">{t('home.communityDesc')}</p>
          <div className="ecosystem-banner__grid">
            <div className="ecosystem-banner__card">
              <div className="ecosystem-banner__card-icon">🛒</div>
              <div className="ecosystem-banner__card-name">{t('home.buy')}</div>
              <div className="ecosystem-banner__card-desc">{t('home.buyDesc')}</div>
            </div>
            <div className="ecosystem-banner__card">
              <div className="ecosystem-banner__card-icon">📸</div>
              <div className="ecosystem-banner__card-name">{t('home.share')}</div>
              <div className="ecosystem-banner__card-desc">{t('home.shareDesc')}</div>
            </div>
            <div className="ecosystem-banner__card">
              <div className="ecosystem-banner__card-icon">👋</div>
              <div className="ecosystem-banner__card-name">{t('home.refer')}</div>
              <div className="ecosystem-banner__card-desc">{t('home.referDesc')}</div>
            </div>
            <div className="ecosystem-banner__card">
              <div className="ecosystem-banner__card-icon">💬</div>
              <div className="ecosystem-banner__card-name">{t('home.engage')}</div>
              <div className="ecosystem-banner__card-desc">{t('home.engageDesc')}</div>
            </div>
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/community" className="hero__cta" style={{ marginTop: 0 }}>
              {t('home.learnMore')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
