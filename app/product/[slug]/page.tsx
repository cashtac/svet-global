'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import catalogData from '@/data/products.json';
import { getLocale, getCurrency, formatPrice, isRussia } from '@/lib/locale';

/* ════════════════════════════════════════════════
   SVET — PRODUCT PAGE (locale-aware)
   ════════════════════════════════════════════════ */

type RawProduct = (typeof catalogData.products)[number];

const locale = getLocale();
const currency = getCurrency();

function pName(p: RawProduct) { return locale === 'ru' ? p.ru.name : p.en.name; }
function pDesc(p: RawProduct) { return locale === 'ru' ? p.ru.description : p.en.description; }
function pDetails(p: RawProduct) { return locale === 'ru' ? p.ru.details : p.en.details; }
function pPrice(p: RawProduct) { return p.price[currency] || p.price.USD; }

function getRelated(current: RawProduct): RawProduct[] {
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
  const { addItem } = useCart();
  const slug = params.slug as string;

  const product = catalogData.products.find(p =>
    slug === `svet-${p.id}` || slug === p.id
  );

  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="section" style={{ paddingTop: 160, minHeight: '80vh', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 16 }}>
          {isRussia() ? 'Товар не найден' : 'Product Not Found'}
        </h1>
        <p style={{ color: '#888', marginBottom: 32 }}>
          {isRussia() ? 'Этот товар недоступен.' : 'This item is not available.'}
        </p>
        <Link href="/shop" className="pdp-btn pdp-btn--primary" style={{ display: 'inline-block', maxWidth: 300 }}>
          ← {isRussia() ? 'В магазин' : 'Back to Shop'}
        </Link>
      </section>
    );
  }

  const name = pName(product);
  const price = pPrice(product);
  const related = getRelated(product);

  function handleAddToCart() {
    if (!selectedSize && product!.sizes.length > 1) return;
    addItem({
      productId: product!.id,
      stripePriceId: '',
      name,
      price,
      size: selectedSize || product!.sizes[0],
      image: product!.image_main,
      slug: product!.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const detailsList = pDetails(product).split('. ').filter(Boolean);

  return (
    <section className="pdp">
      {/* Breadcrumb */}
      <div className="pdp__breadcrumb">
        <Link href="/">{isRussia() ? 'Главная' : 'Home'}</Link>
        <span>/</span>
        <Link href="/shop">{isRussia() ? 'Магазин' : 'Shop'}</Link>
        <span>/</span>
        <span className="pdp__breadcrumb-current">{name}</span>
      </div>

      <div className="pdp__grid">
        {/* Left: Product Image */}
        <div className="pdp__gallery">
          <div className="pdp__image-main">
            {product.badge && <span className="pdp__best-value">{product.badge}</span>}
            {product.preorder && (
              <span className="pdp__preorder-tag">{isRussia() ? 'ПРЕДЗАКАЗ' : 'PRE-ORDER'}</span>
            )}
            <img
              src={product.image_main}
              alt={name}
              className="pdp__img pdp__img--float"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="pdp__info">
          <div className="pdp__category">
            {product.category.toUpperCase()} / {product.subcategory.toUpperCase()}
          </div>
          <h1 className="pdp__name">{name}</h1>
          <p className="pdp__desc">{pDesc(product)}</p>

          {/* Price */}
          <div className="pdp__price-block">
            <div className="pdp__prices">
              <span className="pdp__price">{formatPrice(price)}</span>
            </div>
          </div>

          {/* Color + Material */}
          <div className="pdp__meta">
            <div className="pdp__meta-item">
              <span className="pdp__meta-label">{isRussia() ? 'Цвет' : 'Color'}</span>
              <span className="pdp__meta-value">{product.color}</span>
            </div>
            <div className="pdp__meta-item">
              <span className="pdp__meta-label">{isRussia() ? 'Материал' : 'Material'}</span>
              <span className="pdp__meta-value">{product.material}</span>
            </div>
          </div>

          {/* Size selector */}
          <div className="pdp__sizes">
            <div className="pdp__sizes-label">
              {isRussia() ? 'РАЗМЕР' : 'SIZE'}
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
            {added
              ? (isRussia() ? '✓ ДОБАВЛЕНО' : '✓ ADDED')
              : (isRussia()
                ? `ПРЕДЗАКАЗ — ${formatPrice(price)}`
                : `PRE-ORDER — ${formatPrice(price)}`)
            }
          </button>

          {added && (
            <button className="pdp-btn pdp-btn--secondary" onClick={() => router.push('/cart')}>
              {isRussia() ? 'ПЕРЕЙТИ В КОРЗИНУ →' : 'VIEW CART →'}
            </button>
          )}

          {/* Shipping */}
          <div className="pdp__shipping">
            {isRussia() ? (
              <>
                <div className="pdp__shipping-item">🇷🇺 Бесплатная доставка по России</div>
                <div className="pdp__shipping-item">📦 Предзаказ: отправка в течение ~1 месяца</div>
                <div className="pdp__shipping-item">🔒 Безопасная оплата</div>
              </>
            ) : (
              <>
                <div className="pdp__shipping-item">🌍 Free shipping</div>
                <div className="pdp__shipping-item">📦 Pre-order: ships in ~1 month</div>
                <div className="pdp__shipping-item">🔒 Secure checkout via Stripe</div>
              </>
            )}
          </div>

          {/* Details */}
          <details className="pdp__details">
            <summary>{isRussia() ? 'Подробнее о товаре' : 'Product Details'}</summary>
            <ul className="pdp__details-list">
              {detailsList.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </details>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="pdp__related">
          <h2 className="pdp__related-title">
            {isRussia() ? 'Вам может понравиться' : 'You May Also Like'}
          </h2>
          <div className="pdp__related-grid">
            {related.map(rp => (
              <Link href={`/product/${rp.id}`} key={rp.id} className="pdp__related-card">
                <div className="pdp__related-img-wrap">
                  <img src={rp.image_main} alt={pName(rp)} loading="lazy" />
                </div>
                <div className="pdp__related-info">
                  <h4>{pName(rp)}</h4>
                  <div className="pdp__related-price">
                    <span className="pdp__related-preorder">{formatPrice(pPrice(rp))}</span>
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
