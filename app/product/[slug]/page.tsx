'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useI18n } from '@/lib/i18n-provider';
import type { TranslationKey } from '@/lib/i18n';

/* ════════════════════════════════════════════════
   SVET — FIRST DROP PRODUCT PAGE
   Clean, minimal, floating animation
   ════════════════════════════════════════════════ */

interface FullProduct {
  id: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  slug: string;
  preOrderPrice: number;
  retailPrice: number;
  sizes: string[];
  image: string;
  color: string;
  material: string;
  category: 'CLOTHING' | 'ACCESSORIES';
  badge?: 'bestValue';
  details: string[];
}

const ALL_PRODUCTS: FullProduct[] = [
  {
    id: 'tshirt-black', nameKey: 'product.tshirt-black', descKey: 'product.tshirt-black.desc',
    slug: 'svet-tshirt-black', preOrderPrice: 25, retailPrice: 35,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/tee-pack.png',
    color: 'Black', material: '100% Cotton, 180gsm',
    details: ['Oversized fit', 'Bubble sVet™ logo', 'Ribbed crew neck', 'Pre-shrunk'],
  },
  {
    id: 'tshirt-yellow', nameKey: 'product.tshirt-yellow', descKey: 'product.tshirt-yellow.desc',
    slug: 'svet-tshirt-yellow', preOrderPrice: 25, retailPrice: 35,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/tee-pack.png',
    color: 'Yellow / Cream', material: '100% Cotton, 180gsm',
    details: ['Color-block design', 'Serif SVET™ logo', 'Contrast sleeves', 'Relaxed fit'],
  },
  {
    id: 'tshirt-white', nameKey: 'product.tshirt-grey', descKey: 'product.tshirt-grey.desc',
    slug: 'svet-tshirt-white', preOrderPrice: 25, retailPrice: 35,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/tee-pack.png',
    color: 'White', material: '100% Cotton, 180gsm',
    details: ['Clean minimal design', 'Small SVET™ logo', 'Classic fit', 'Soft-touch finish'],
  },
  {
    id: 'longsleeve-yellow', nameKey: 'product.longsleeve-yellow', descKey: 'product.longsleeve-yellow.desc',
    slug: 'svet-longsleeve-yellow', preOrderPrice: 45, retailPrice: 60,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/longsleeve-yellow.png',
    color: 'Butter Yellow', material: '100% Heavy Cotton, 220gsm',
    details: ['Red SVET™ chest logo', 'Red accent details', 'Ribbed cuffs', 'Heavyweight cotton'],
  },
  {
    id: 'hoodie-bubble', nameKey: 'product.hoodie-bubble', descKey: 'product.hoodie-bubble.desc',
    slug: 'svet-hoodie-bubble', preOrderPrice: 69, retailPrice: 95,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/set-hoodie-pants.png',
    color: 'Dark Navy', material: '100% Cotton French Terry, 400gsm',
    details: ['Bubble sVet™ embroidery', 'Heavyweight 400gsm', 'Kangaroo pocket', 'Drawstring hood'],
  },
  {
    id: 'pants-bubble', nameKey: 'product.pants-bubble', descKey: 'product.pants-bubble.desc',
    slug: 'svet-pants-bubble', preOrderPrice: 59, retailPrice: 85,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/set-hoodie-pants.png',
    color: 'Dark Navy', material: '100% Cotton French Terry, 380gsm',
    details: ['Bubble sVet™ embroidery', 'Wide-leg relaxed fit', 'Elastic waistband + drawstring', 'Side pockets'],
  },
  {
    id: 'set-hoodie-pants', nameKey: 'product.set-hoodie-pants', descKey: 'product.set-hoodie-pants.desc',
    slug: 'svet-set-hoodie-pants', preOrderPrice: 99, retailPrice: 149,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    badge: 'bestValue',
    image: '/images/products/set-hoodie-pants.png',
    color: 'Dark Navy', material: '100% Cotton French Terry, 400gsm',
    details: ['Hoodie + Pants full set', 'Save $29 vs buying separately', 'Bubble sVet™ embroidery', 'Complete matching look'],
  },
  {
    id: 'cap', nameKey: 'product.cap', descKey: 'product.cap.desc',
    slug: 'svet-cap', preOrderPrice: 25, retailPrice: 35,
    sizes: ['ONE SIZE'], category: 'ACCESSORIES',
    image: '/images/products/cap.png',
    color: 'Dark Navy', material: 'Cotton Twill, Brass Buckle',
    details: ['Bubble sVet™ embroidered', 'Structured 6-panel', 'Adjustable brass buckle', 'One size fits all'],
  },
];

function getRelated(currentSlug: string): FullProduct[] {
  return ALL_PRODUCTS.filter(p => p.slug !== currentSlug).slice(0, 3);
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items } = useCart();
  const { t } = useI18n();
  const slug = params.slug as string;

  const product = ALL_PRODUCTS.find(p => p.slug === slug);
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

  const savings = product.retailPrice - product.preOrderPrice;
  const savingsPercent = Math.round((savings / product.retailPrice) * 100);
  const cartTotal = items.reduce((sum, i) => sum + i.price / 100, 0) + product.preOrderPrice;
  const qualifiesForFreeAI = cartTotal >= 100;
  const related = getRelated(slug);

  function handleAddToCart() {
    if (!selectedSize && product!.sizes.length > 1) return;
    addItem({
      productId: product!.id,
      name: t(product!.nameKey),
      price: product!.preOrderPrice * 100,
      size: selectedSize || product!.sizes[0],
      image: product!.image,
      slug: product!.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <section className="pdp">
      {/* Breadcrumb */}
      <div className="pdp__breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <span className="pdp__breadcrumb-current">{t(product.nameKey)}</span>
      </div>

      <div className="pdp__grid">
        {/* Left: Product Image — clean, floating */}
        <div className="pdp__gallery">
          <div className="pdp__image-main">
            {product.badge && <span className="pdp__best-value">{t('shop.bestValue')}</span>}
            <span className="pdp__preorder-tag">{t('shop.preorder')}</span>
            <img
              src={product.image}
              alt={t(product.nameKey)}
              className="pdp__img pdp__img--float"
            />
          </div>
        </div>

        {/* Right: Product Info — clean & minimal */}
        <div className="pdp__info">
          <div className="pdp__category">{product.category}</div>
          <h1 className="pdp__name">{t(product.nameKey)}</h1>
          <p className="pdp__desc">{t(product.descKey)}</p>

          {/* Price block */}
          <div className="pdp__price-block">
            <div className="pdp__prices">
              <span className="pdp__price">${product.preOrderPrice}</span>
              <span className="pdp__retail">${product.retailPrice}</span>
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
            {added ? '✓ ADDED' : `PRE-ORDER — $${product.preOrderPrice}`}
          </button>

          {added && (
            <button className="pdp-btn pdp-btn--secondary" onClick={() => router.push('/cart')}>
              VIEW CART →
            </button>
          )}

          {/* Promotion: Free AI Access */}
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

          {/* Product details */}
          <details className="pdp__details">
            <summary>Product Details</summary>
            <ul className="pdp__details-list">
              {product.details.map((d, i) => <li key={i}>{d}</li>)}
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
              <Link href={`/product/${rp.slug}`} key={rp.id} className="pdp__related-card">
                <div className="pdp__related-img-wrap">
                  <img src={rp.image} alt={t(rp.nameKey)} loading="lazy" />
                </div>
                <div className="pdp__related-info">
                  <h4>{t(rp.nameKey)}</h4>
                  <div className="pdp__related-price">
                    <span className="pdp__related-preorder">${rp.preOrderPrice}</span>
                    <span className="pdp__related-retail">${rp.retailPrice}</span>
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
