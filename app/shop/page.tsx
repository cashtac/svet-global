'use client';

import { useCart } from '@/lib/cart';
import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';

/* ════════════════════════════════════════════════
   SVET SHOP — FIRST DROP COLLECTION
   Individual product photos · S/M + L/XL
   ════════════════════════════════════════════════ */

interface ShopProduct {
  id: string;
  name: string;
  desc: string;
  slug: string;
  preOrderPrice: number;
  retailPrice: number;
  sizes: string[];
  badge?: 'bestValue';
  category: 'CLOTHING' | 'ACCESSORIES';
  image: string;
}

const PRODUCTS: ShopProduct[] = [
  {
    id: 'hoodie-vintage',
    name: 'SVET Hoodie Vintage',
    desc: 'Distressed washed hoodie, vintage aged look, bubble logo',
    slug: 'svet-hoodie-vintage', preOrderPrice: 69, retailPrice: 95,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/hoodie-vintage.jpg',
  },
  {
    id: 'hoodie-bubble',
    name: 'SVET Hoodie Bubble',
    desc: 'Dark navy, red bubble "sVet™" logo, kangaroo pocket',
    slug: 'svet-hoodie-bubble', preOrderPrice: 69, retailPrice: 95,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/hoodie-bubble.jpg',
  },
  {
    id: 'hoodie-serif',
    name: 'SVET Hoodie Serif',
    desc: 'Dark navy, clean elegant serif SVET logo',
    slug: 'svet-hoodie-serif', preOrderPrice: 69, retailPrice: 95,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/hoodie-serif.jpg',
  },
  {
    id: 'pants-jogger-navy',
    name: 'SVET Jogger Pants',
    desc: 'Dark navy jogger cut, small SVET logo, comfortable fit',
    slug: 'svet-pants-jogger-navy', preOrderPrice: 55, retailPrice: 75,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/pants-jogger-navy.jpg',
  },
  {
    id: 'pants-bubble',
    name: 'SVET Wide-Leg Pants Bubble',
    desc: 'Wide leg, bubble logo left thigh',
    slug: 'svet-pants-bubble', preOrderPrice: 59, retailPrice: 85,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/pants-bubble.jpg',
  },
  {
    id: 'pants-green',
    name: 'SVET Pants Olive',
    desc: 'Olive/army green wide-leg, minimal serif logo',
    slug: 'svet-pants-green', preOrderPrice: 59, retailPrice: 85,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/pants-green.jpg',
  },
  {
    id: 'tshirt-black',
    name: 'SVET T-Shirt Black',
    desc: 'Oversized fit, bubble sVet™ logo',
    slug: 'svet-tshirt-black', preOrderPrice: 25, retailPrice: 35,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/tshirt-black.jpg',
  },
  {
    id: 'tshirt-black-glow',
    name: 'SVET T-Shirt Black Glow',
    desc: 'Oversized fit, glowing SVET text front + back',
    slug: 'svet-tshirt-black-glow', preOrderPrice: 25, retailPrice: 35,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/tshirt-black-glow.jpg',
  },
  {
    id: 'tshirt-yellow',
    name: 'SVET T-Shirt Yellow',
    desc: 'Color-block mustard/cream, serif logo',
    slug: 'svet-tshirt-yellow', preOrderPrice: 25, retailPrice: 35,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/tshirt-yellow.jpg',
  },
  {
    id: 'tshirt-white',
    name: 'SVET T-Shirt White',
    desc: 'Oversized white, minimal coral SVET logo',
    slug: 'svet-tshirt-white', preOrderPrice: 25, retailPrice: 35,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/tshirt-white.jpg',
  },
  {
    id: 'longsleeve-yellow',
    name: 'SVET Long Sleeve Yellow',
    desc: 'Butter yellow, red logo, sleeve stripes',
    slug: 'svet-longsleeve-yellow', preOrderPrice: 45, retailPrice: 60,
    sizes: ['S/M', 'L/XL'], category: 'CLOTHING',
    image: '/images/products/longsleeve-yellow.png',
  },
  {
    id: 'cap',
    name: 'SVET Cap',
    desc: 'Dark navy, 3D rubber bubble logo patch',
    slug: 'svet-cap', preOrderPrice: 25, retailPrice: 35,
    sizes: ['ONE SIZE'], category: 'ACCESSORIES',
    image: '/images/products/cap.png',
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
      name: product.name,
      price: product.preOrderPrice * 100,
      size: selectedSize,
      image: product.image,
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="shop-card">
      {product.badge && <span className="shop-card__badge">{t('shop.bestValue')}</span>}
      <span className="shop-card__preorder-label">{t('shop.preorder')}</span>

      {/* Product image — links to detail page */}
      <Link href={`/product/${product.slug}`} className="shop-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="shop-card__info">
        <Link href={`/product/${product.slug}`} className="shop-card__name-link">
          <h3 className="shop-card__name">{product.name}</h3>
        </Link>
        <p className="shop-card__desc">{product.desc}</p>

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
