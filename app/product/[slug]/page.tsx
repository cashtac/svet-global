'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useI18n } from '@/lib/i18n-provider';
import catalogData from '@/data/products.json';

/* ════════════════════════════════════════════════
   SVET — PRODUCT PAGE (reads from products.json)
   Clean, minimal, floating animation
   ════════════════════════════════════════════════ */

type Product = (typeof catalogData.products)[number];

function getRelated(current: Product): Product[] {
  // Same category first, then others
  return catalogData.products
    .filter(p => p.id !== current.id)
    .sort((a, b) => {
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, 3);
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items } = useCart();
  const { t } = useI18n();
  const slug = params.slug as string;

  // Match slug: can be "svet-hoodie-vintage" or "hoodie-vintage"
  const product = catalogData.products.find(p =>
    slug === `svet-${p.id}` || slug === p.id
  );

  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="section" style={{ paddingTop: 160, minHeight: '80vh', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 16 }}>Product Not Found</h1>
        <p style={{ color: '#888', marginBottom: 32 }}>This item is not available.</p>
        <Link href="/shop" className="pdp-btn pdp-btn--primary" style={{ display: 'inline-block', maxWidth: 300 }}>
          ← Back to Shop
        </Link>
      </section>
    );
  }

  const savings = product.price_retail - product.price_preorder;
  const savingsPercent = Math.round((savings / product.price_retail) * 100);
  const cartTotal = items.reduce((sum, i) => sum + i.price / 100, 0) + product.price_preorder;
  const qualifiesForFreeAI = cartTotal >= 100;
  const related = getRelated(product);
  const productSlug = `svet-${product.id}`;

  function handleAddToCart() {
    if (!selectedSize && product!.sizes.length > 1) return;
    addItem({
      productId: product!.id,
      name: product!.name,
      price: product!.price_preorder * 100,
      size: selectedSize || product!.sizes[0],
      image: product!.image,
      slug: productSlug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  // Parse details string into list
  const detailsList = product.details.split('. ').filter(Boolean);

  return (
    <section className="pdp">
      {/* Breadcrumb */}
      <div className="pdp__breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link>
        <span>/</span>
        <span className="pdp__breadcrumb-current">{product.name}</span>
      </div>

      <div className="pdp__grid">
        {/* Left: Product Image */}
        <div className="pdp__gallery">
          <div className="pdp__image-main">
            {product.badge && <span className="pdp__best-value">{product.badge}</span>}
            {product.preorder && <span className="pdp__preorder-tag">PRE-ORDER</span>}
            <img
              src={product.image}
              alt={product.name}
              className="pdp__img pdp__img--float"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="pdp__info">
          <div className="pdp__category">{product.category.toUpperCase()} / {product.subcategory.toUpperCase()}</div>
          <h1 className="pdp__name">{product.name}</h1>
          <p className="pdp__desc">{product.description}</p>

          {/* Price block */}
          <div className="pdp__price-block">
            <div className="pdp__prices">
              <span className="pdp__price">${product.price_preorder}</span>
              <span className="pdp__retail">${product.price_retail}</span>
            </div>
            <div className="pdp__save-badge">SAVE {savingsPercent}%</div>
          </div>

          {/* Color + Material */}
          <div className="pdp__meta">
            <div className="pdp__meta-item">
              <span className="pdp__meta-label">Color</span>
              <span className="pdp__meta-value">{product.color}</span>
            </div>
            <div className="pdp__meta-item">
              <span className="pdp__meta-label">Material</span>
              <span className="pdp__meta-value">{product.material}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="pdp__tags">
            {product.tags.map(tag => (
              <span key={tag} className="pdp__tag">{tag}</span>
            ))}
          </div>

          {/* Size selector */}
          <div className="pdp__sizes">
            <div className="pdp__sizes-label">
              SIZE
              {selectedSize && <span className="pdp__sizes-selected"> — {selectedSize}</span>}
            </div>
            <div className="pdp__sizes-grid">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`pdp__size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className={`pdp-btn pdp-btn--primary ${added ? 'pdp-btn--added' : ''}`}
            onClick={handleAddToCart}
            disabled={(product.sizes.length > 1 && !selectedSize) || added}
          >
            {added ? '✓ ADDED' : `PRE-ORDER — $${product.price_preorder}`}
          </button>

          {added && (
            <button className="pdp-btn pdp-btn--secondary" onClick={() => router.push('/cart')}>
              VIEW CART →
            </button>
          )}

          {/* Promotion */}
          <div className={`pdp__promo ${qualifiesForFreeAI ? 'pdp__promo--active' : ''}`}>
            <div className="pdp__promo-icon">{qualifiesForFreeAI ? '✅' : '🎁'}</div>
            <div className="pdp__promo-text">
              {qualifiesForFreeAI ? (
                <><strong>You qualify!</strong> 24h AI Starter FREE with your order.</>
              ) : (
                <><strong>Spend $100+ → 24h AI Starter FREE</strong><br />
                <span className="pdp__promo-remaining">Add ${Math.ceil(100 - cartTotal)} more</span></>
              )}
            </div>
          </div>

          {/* Shipping */}
          <div className="pdp__shipping">
            <div className="pdp__shipping-item">🌍 Worldwide Shipping</div>
            <div className="pdp__shipping-item">📦 Ships in ~1 month</div>
            <div className="pdp__shipping-item">🚚 Free on $100+</div>
            <div className="pdp__shipping-item">🔒 Stripe Secure</div>
          </div>

          {/* Details */}
          <details className="pdp__details">
            <summary>Product Details</summary>
            <ul className="pdp__details-list">
              {detailsList.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </details>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="pdp__related">
          <h2 className="pdp__related-title">You May Also Like</h2>
          <div className="pdp__related-grid">
            {related.map(rp => (
              <Link href={`/product/svet-${rp.id}`} key={rp.id} className="pdp__related-card">
                <div className="pdp__related-img-wrap">
                  <img src={rp.image} alt={rp.name} loading="lazy" />
                </div>
                <div className="pdp__related-info">
                  <h4>{rp.name}</h4>
                  <div className="pdp__related-price">
                    <span className="pdp__related-preorder">${rp.price_preorder}</span>
                    <span className="pdp__related-retail">${rp.price_retail}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
