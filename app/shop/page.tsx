'use client';

import { useCart } from '@/lib/cart';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n-provider';
import type { TranslationKey } from '@/lib/i18n';

/* ════════════════════════════════════════════════
   SVET SHOP — FULL PRE-ORDER CATALOG
   ════════════════════════════════════════════════ */

interface ShopProduct {
  id: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  slug: string;
  preOrderPrice: number;
  retailPrice: number;
  sizes: string[];
  badge?: 'bestValue';
  category: 'CLOTHING' | 'ACCESSORIES';
}

const PRODUCTS: ShopProduct[] = [
  {
    id: 'tshirt-black', nameKey: 'product.tshirt-black', descKey: 'product.tshirt-black.desc',
    slug: 'svet-tshirt-black', preOrderPrice: 25, retailPrice: 35,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'tshirt-yellow', nameKey: 'product.tshirt-yellow', descKey: 'product.tshirt-yellow.desc',
    slug: 'svet-tshirt-yellow', preOrderPrice: 25, retailPrice: 35,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'tshirt-grey', nameKey: 'product.tshirt-grey', descKey: 'product.tshirt-grey.desc',
    slug: 'svet-tshirt-grey', preOrderPrice: 25, retailPrice: 35,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'longsleeve-yellow', nameKey: 'product.longsleeve-yellow', descKey: 'product.longsleeve-yellow.desc',
    slug: 'svet-longsleeve-yellow', preOrderPrice: 45, retailPrice: 60,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'sweatshirt-cropped', nameKey: 'product.sweatshirt-cropped', descKey: 'product.sweatshirt-cropped.desc',
    slug: 'svet-sweatshirt-cropped', preOrderPrice: 55, retailPrice: 75,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'sweatshirt-relaxed', nameKey: 'product.sweatshirt-relaxed', descKey: 'product.sweatshirt-relaxed.desc',
    slug: 'svet-sweatshirt-relaxed', preOrderPrice: 55, retailPrice: 75,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'sweatshirt-vintage', nameKey: 'product.sweatshirt-vintage', descKey: 'product.sweatshirt-vintage.desc',
    slug: 'svet-sweatshirt-vintage', preOrderPrice: 55, retailPrice: 75,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'hoodie-bubble', nameKey: 'product.hoodie-bubble', descKey: 'product.hoodie-bubble.desc',
    slug: 'svet-hoodie-bubble', preOrderPrice: 69, retailPrice: 95,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'hoodie-serif', nameKey: 'product.hoodie-serif', descKey: 'product.hoodie-serif.desc',
    slug: 'svet-hoodie-serif', preOrderPrice: 69, retailPrice: 95,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'pants-bubble', nameKey: 'product.pants-bubble', descKey: 'product.pants-bubble.desc',
    slug: 'svet-pants-bubble', preOrderPrice: 59, retailPrice: 85,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'pants-serif', nameKey: 'product.pants-serif', descKey: 'product.pants-serif.desc',
    slug: 'svet-pants-serif', preOrderPrice: 59, retailPrice: 85,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'set-hoodie-pants', nameKey: 'product.set-hoodie-pants', descKey: 'product.set-hoodie-pants.desc',
    slug: 'svet-set-hoodie-pants', preOrderPrice: 99, retailPrice: 149,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
    badge: 'bestValue',
  },
  {
    id: 'cap', nameKey: 'product.cap', descKey: 'product.cap.desc',
    slug: 'svet-cap', preOrderPrice: 25, retailPrice: 35,
    sizes: ['ONE SIZE'], category: 'ACCESSORIES',
  },
];

function ShopProductCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart();
  const { t } = useI18n();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem({
      productId: product.id,
      name: t(product.nameKey),
      price: product.preOrderPrice * 100,
      size: selectedSize,
      image: '/images/placeholder.jpg',
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="shop-card">
      {product.badge && <span className="shop-card__badge">{t('shop.bestValue')}</span>}
      <span className="shop-card__preorder-label">{t('shop.preorder')}</span>

      {/* Image placeholder */}
      <div className="shop-card__image-wrap">
        <div className="shop-card__image-placeholder">
          <span>SVET</span>
        </div>
      </div>

      {/* Info */}
      <div className="shop-card__info">
        <h3 className="shop-card__name">{t(product.nameKey)}</h3>
        <p className="shop-card__desc">{t(product.descKey)}</p>

        {/* Price */}
        <div className="shop-card__pricing">
          <span className="shop-card__price">${product.preOrderPrice}</span>
          <span className="shop-card__retail-price">${product.retailPrice}</span>
        </div>

        {/* Shipping badge */}
        <div className="shop-card__shipping">{t('shop.shipping')}</div>

        {/* Size selector */}
        <div className="shop-card__sizes">
          <div className="shop-card__sizes-label">{t('shop.size')}</div>
          <div className="shop-card__sizes-options">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`shop-card__size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to cart */}
        <button
          className={`shop-card__add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          disabled={!selectedSize}
        >
          {added ? t('shop.added') : t('shop.addToCart')}
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Sticky pre-order banner */}
      <div className="preorder-banner">
        {t('shop.banner')}
      </div>

      <section className="section" style={{ paddingTop: 140 }}>
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">{t('shop.label')}</span>
            <h1 className="section-header__title">{t('shop.title')}</h1>
            <p className="section-header__desc">
              {t('shop.desc')}
            </p>
          </div>

          <div className="shop-grid">
            {PRODUCTS.map(product => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
