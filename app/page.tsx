'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/api';
import { useI18n } from '@/lib/i18n-provider';
import catalogData from '@/data/products.json';
import { useCart } from '@/lib/cart';
import { useState } from 'react';

/* ════════════════════════════════════════════════
   SVET HOMEPAGE — Uses real catalog from products.json
   No more mock data. Featured products pulled from catalog.
   ════════════════════════════════════════════════ */

// Get the first 4 featured/best products from the real catalog
const FEATURED = catalogData.products
  .filter(p => p.featured || p.badge === 'NEW')
  .slice(0, 4);

// If fewer than 4 featured, fill from catalog
const HOMEPAGE_PRODUCTS = FEATURED.length >= 4
  ? FEATURED
  : [...FEATURED, ...catalogData.products.filter(p => !FEATURED.includes(p))].slice(0, 4);

const PLACEHOLDER_SVG = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="400" height="500" fill="#111"/><rect x="20" y="20" width="360" height="460" rx="16" fill="none" stroke="#222" stroke-width="1"/><text x="200" y="220" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="#333" letter-spacing="8">SVET</text><text x="200" y="260" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#444" letter-spacing="4">COMING SOON</text><circle cx="200" cy="340" r="24" fill="none" stroke="#C9A84C" stroke-width="1" opacity="0.3"/><text x="200" y="345" text-anchor="middle" font-size="16" fill="#C9A84C" opacity="0.4">☀</text></svg>')}`;

function FeaturedCard({ product }: { product: typeof catalogData.products[number] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price_preorder * 100,
      size: product.sizes[0],
      image: product.image_main,
      slug: product.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product/svet-${product.id}`} className="product-card">
      {product.badge && <span className="product-card__badge">{product.badge}</span>}
      <div className="product-card__image-wrap">
        <img
          src={product.image_main}
          alt={product.name}
          className="product-card__image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = PLACEHOLDER_SVG;
          }}
        />
      </div>
      <div className="product-card__info">
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__color">{product.color}</div>
        <div className="product-card__price">
          <span>${product.price_preorder}</span>
          <span style={{ fontSize: 12, color: '#555', textDecoration: 'line-through', marginLeft: 8 }}>${product.price_retail}</span>
        </div>
        <button
          className={`product-card__quick-add ${added ? 'added' : ''}`}
          onClick={handleQuickAdd}
        >
          {added ? '✓ ADDED' : 'QUICK ADD'}
        </button>
      </div>
    </Link>
  );
}

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

      {/* ═══ FEATURED PRODUCTS — Real Catalog ═══ */}
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
            {HOMEPAGE_PRODUCTS.map(product => (
              <FeaturedCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/shop" className="hero__cta" style={{ marginTop: 0 }}>
              VIEW ALL {catalogData.products.length} PRODUCTS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
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
