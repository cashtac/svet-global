import Link from 'next/link';
import { getProducts, formatPrice, Product } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';

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

async function getProductsOrMock(): Promise<Product[]> {
  try {
    return await getProducts();
  } catch {
    return MOCK_PRODUCTS;
  }
}

export default async function Home() {
  const products = await getProductsOrMock();

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <div className="hero__bg-grid" />
        <div className="hero__content">
          <span className="hero__badge">ONE SUN · ONE ENERGY · ONE PLANET</span>
          <h1 className="hero__title">SVET</h1>
          <p className="hero__tagline">
            Not a trend. A way of life.<br />
            Clothing that connects us all.
          </p>
          <Link href="/shop" className="hero__cta">
            Discover SVET
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </Link>
        </div>
        <div className="hero__scroll-indicator">
          <div className="hero__scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="marquee">
        <div className="marquee__track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              <span className="marquee__item">ONE SUN ☀</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">ONE ENERGY</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">ONE PLANET 🌍</span>
              <span className="marquee__item" style={{ margin: '0 20px' }}>◆</span>
              <span className="marquee__item">FOR EVERYONE</span>
              <span className="marquee__item" style={{ margin: '0 20px', color: 'var(--accent)' }}>●</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="section">
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">Collection</span>
            <h2 className="section-header__title">WEAR THE LIGHT</h2>
            <p className="section-header__desc">
              Every piece carries a message. Every thread connects you to something bigger.
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
            <h3 className="feature__title">One Sun</h3>
            <p className="feature__desc">The same light warms everyone. Our designs reflect that universal connection.</p>
          </div>
          <div className="feature">
            <div className="feature__icon">⚡</div>
            <h3 className="feature__title">One Energy</h3>
            <p className="feature__desc">Everything moves as one. Crafted with intention, worn with purpose.</p>
          </div>
          <div className="feature">
            <div className="feature__icon">🌍</div>
            <h3 className="feature__title">One Planet</h3>
            <p className="feature__desc">We share this world. For everyone means for everyone — no exceptions.</p>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="philosophy">
        <div className="philosophy__container">
          <div>
            <h2 className="philosophy__title">WE ARE ALL CONNECTED</h2>
            <p className="philosophy__desc">
              SVET means light. Not a brand built on hype — a belief that everything is interconnected.
              We share one sun, breathe the same air, walk the same earth.
            </p>
            <p className="philosophy__desc">
              Our clothing isn't about standing out — it's about standing together.
              Every piece is a reminder that what connects us is greater than what divides us.
            </p>
            <div className="philosophy__stats">
              <div className="philosophy__stat">
                <span className="philosophy__stat-number">∞</span>
                <span className="philosophy__stat-label">Connections</span>
              </div>
              <div className="philosophy__stat">
                <span className="philosophy__stat-number">1</span>
                <span className="philosophy__stat-label">Planet</span>
              </div>
              <div className="philosophy__stat">
                <span className="philosophy__stat-number">ALL</span>
                <span className="philosophy__stat-label">For Everyone</span>
              </div>
            </div>
          </div>
          <div className="philosophy__visual">☀️</div>
        </div>
      </section>

      {/* ═══ SVETRIX ECOSYSTEM ═══ */}
      <section className="ecosystem-banner">
        <div className="ecosystem-banner__container">
          <div className="ecosystem-banner__label">SVETRIX ECOSYSTEM</div>
          <h2 className="ecosystem-banner__title">ONE ACCOUNT. EVERYTHING.</h2>
          <p className="ecosystem-banner__desc">
            Like Google — but Svetrix. One account gives you access to the entire ecosystem.
            Your platform, your AI, your clothing. All connected.
          </p>
          <div className="ecosystem-banner__grid">
            <a href="https://svetrix.com" target="_blank" rel="noopener noreferrer" className="ecosystem-banner__card">
              <div className="ecosystem-banner__card-icon">⚡</div>
              <div className="ecosystem-banner__card-name">Svetrix OS</div>
              <div className="ecosystem-banner__card-desc">Intelligent platform</div>
            </a>
            <a href="https://svetrix.com/maestro" target="_blank" rel="noopener noreferrer" className="ecosystem-banner__card">
              <div className="ecosystem-banner__card-icon">🧠</div>
              <div className="ecosystem-banner__card-name">Svetrix AI</div>
              <div className="ecosystem-banner__card-desc">AI Maestro assistant</div>
            </a>
            <div className="ecosystem-banner__card ecosystem-banner__card--active">
              <div className="ecosystem-banner__card-icon">☀</div>
              <div className="ecosystem-banner__card-name">SVET</div>
              <div className="ecosystem-banner__card-desc">You are here</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
