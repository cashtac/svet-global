'use client';

import { useCart } from '@/lib/cart';
import { useState } from 'react';
import type { Metadata } from 'next';

/* ════════════════════════════════════════════════
   SVET SHOP — FULL PRE-ORDER CATALOG
   ════════════════════════════════════════════════ */

interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  preOrderPrice: number;   // dollars
  retailPrice: number;     // dollars
  sizes: string[];
  badge?: string;
  category: 'CLOTHING' | 'ACCESSORIES';
}

const PRODUCTS: ShopProduct[] = [
  {
    id: 'tshirt-black', name: 'SVET T-Shirt Black', slug: 'svet-tshirt-black',
    description: 'Oversized boxy fit, bubble "sVet™" logo in red/orange, 100% cotton',
    preOrderPrice: 25, retailPrice: 35,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'tshirt-yellow', name: 'SVET T-Shirt Yellow', slug: 'svet-tshirt-yellow',
    description: 'Color-block mustard/cream, serif logo, red seam piping',
    preOrderPrice: 25, retailPrice: 35,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'tshirt-grey', name: 'SVET T-Shirt Grey', slug: 'svet-tshirt-grey',
    description: 'Heather grey, minimal red logo',
    preOrderPrice: 25, retailPrice: 35,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'longsleeve-yellow', name: 'SVET Long Sleeve Yellow', slug: 'svet-longsleeve-yellow',
    description: 'Butter yellow, red logo left chest, red piping',
    preOrderPrice: 45, retailPrice: 60,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'sweatshirt-cropped', name: 'SVET Sweatshirt Cropped', slug: 'svet-sweatshirt-cropped',
    description: 'Butter yellow, cropped fit, ribbed cuffs',
    preOrderPrice: 55, retailPrice: 75,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'sweatshirt-relaxed', name: 'SVET Sweatshirt Relaxed', slug: 'svet-sweatshirt-relaxed',
    description: 'Butter yellow, oversized fit, V-neckline',
    preOrderPrice: 55, retailPrice: 75,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'sweatshirt-vintage', name: 'SVET Sweatshirt Vintage', slug: 'svet-sweatshirt-vintage',
    description: 'Distressed golden wash, vintage feel',
    preOrderPrice: 55, retailPrice: 75,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'hoodie-bubble', name: 'SVET Hoodie Bubble', slug: 'svet-hoodie-bubble',
    description: 'Dark navy, bubble logo, kangaroo pocket',
    preOrderPrice: 69, retailPrice: 95,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'hoodie-serif', name: 'SVET Hoodie Serif', slug: 'svet-hoodie-serif',
    description: 'Dark navy, clean serif logo, minimal',
    preOrderPrice: 69, retailPrice: 95,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'pants-bubble', name: 'SVET Wide-Leg Pants Bubble', slug: 'svet-pants-bubble',
    description: 'Dark navy, bubble logo on thigh',
    preOrderPrice: 59, retailPrice: 85,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'pants-serif', name: 'SVET Wide-Leg Pants Serif', slug: 'svet-pants-serif',
    description: 'Dark navy, serif logo',
    preOrderPrice: 59, retailPrice: 85,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
  },
  {
    id: 'set-hoodie-pants', name: 'SVET Set (Hoodie + Pants)', slug: 'svet-set-hoodie-pants',
    description: 'Full matching set, choice of logo style',
    preOrderPrice: 99, retailPrice: 149,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], category: 'CLOTHING',
    badge: 'BEST VALUE',
  },
  {
    id: 'cap', name: 'SVET Cap', slug: 'svet-cap',
    description: 'Dark navy, 3D rubber bubble logo patch',
    preOrderPrice: 25, retailPrice: 35,
    sizes: ['ONE SIZE'], category: 'ACCESSORIES',
  },
];

function ShopProductCard({ product }: { product: ShopProduct }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.preOrderPrice * 100, // cents
      size: selectedSize,
      image: '/images/placeholder.jpg',
      slug: product.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="shop-card">
      {product.badge && <span className="shop-card__badge">{product.badge}</span>}
      <span className="shop-card__preorder-label">PRE-ORDER</span>

      {/* Image placeholder */}
      <div className="shop-card__image-wrap">
        <div className="shop-card__image-placeholder">
          <span>SVET</span>
        </div>
      </div>

      {/* Info */}
      <div className="shop-card__info">
        <h3 className="shop-card__name">{product.name}</h3>
        <p className="shop-card__desc">{product.description}</p>

        {/* Price */}
        <div className="shop-card__pricing">
          <span className="shop-card__price">${product.preOrderPrice}</span>
          <span className="shop-card__retail-price">${product.retailPrice}</span>
        </div>

        {/* Shipping badge */}
        <div className="shop-card__shipping">🌍 Worldwide Shipping</div>

        {/* Size selector */}
        <div className="shop-card__sizes">
          <div className="shop-card__sizes-label">Size</div>
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
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      {/* Sticky pre-order banner */}
      <div className="preorder-banner">
        🔥 PRE-ORDER — Order now, ships within 1 month. Free worldwide shipping on orders $100+
      </div>

      <section className="section" style={{ paddingTop: 140 }}>
        <div className="section__container">
          <div className="section-header">
            <span className="section-header__label">Pre-Order Collection</span>
            <h1 className="section-header__title">SHOP</h1>
            <p className="section-header__desc">
              Every piece carries a message. Pre-order now at exclusive prices.
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
