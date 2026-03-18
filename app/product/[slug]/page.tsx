'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product, formatPrice } from '@/lib/api';
import { useCart } from '@/lib/cart';

const MOCK_PRODUCTS: Record<string, Product> = {
  'svet-logo-long-sleeve': {
    id: '1', name: 'SVET Logo Long Sleeve', slug: 'svet-logo-long-sleeve',
    shortDescription: 'Wear light. Spread warmth. One Sun connects us all.',
    description: 'Premium long-sleeve tee with the SVET logo. Made from 100% organic cotton with a soft-touch finish. The design features our signature sun motif — a reminder that the same light warms us all.\n\nRelaxed fit, ribbed cuffs, and reinforced stitching for everyday wear.',
    price: 8500, currency: 'USD', images: ['/images/long-sleeve.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'SVET', color: 'Yellow / Red Print',
    category: 'TOPS', status: 'ACTIVE',
  },
  'svet-hoodie-pants-set': {
    id: '2', name: 'SVET Hoodie & Pants Set', slug: 'svet-hoodie-pants-set',
    shortDescription: 'Top and bottom, moving as one. One Energy in every fiber.',
    description: 'The complete SVET set — hoodie and matching pants in forest green. Heavyweight 400gsm French terry cotton. Kangaroo pocket, drawstring hood, elastic waistband.\n\nDesigned to move as one — just like us.',
    price: 18000, currency: 'USD', images: ['/images/hoodie-set.png'],
    sizes: ['S', 'M', 'L', 'XL'], badge: '3 WAYS', color: 'Forest Green',
    category: 'SETS', status: 'ACTIVE',
  },
  'svet-logo-tee-3pack': {
    id: '3', name: 'SVET Logo Tee 3-Pack', slug: 'svet-logo-tee-3pack',
    shortDescription: 'Three tees, one message. One Planet, many ways to share.',
    description: 'Three essential tees in Black, White, and Red. Each features the SVET logo and our philosophy woven into the tag. 100% ring-spun cotton, 180gsm.\n\nThree colors, one message — for everyone.',
    price: 6500, currency: 'USD', images: ['/images/tee-pack.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'SVET', color: 'Black / White / Red',
    category: 'TOPS', status: 'ACTIVE',
  },
  'svet-embroidered-cap': {
    id: '4', name: 'SVET Embroidered Cap', slug: 'svet-embroidered-cap',
    shortDescription: 'Crown yourself in light. For everyone, everywhere.',
    description: 'Structured 6-panel cap with embroidered SVET logo. Adjustable strap and brass buckle. One size fits all — because SVET is for everyone.\n\nBlack cotton twill with tone-on-tone embroidery.',
    price: 4500, currency: 'USD', images: ['/images/cap.png'],
    sizes: ['ONE SIZE'], badge: 'SVET', color: 'Black',
    category: 'ACCESSORIES', status: 'ACTIVE',
  },
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await fetch(`${API_BASE}/store/products/${slug}`);
        const json = await res.json();
        if (json.ok) { setProduct(json.data); return; }
      } catch { /* fallback */ }
      setProduct(MOCK_PRODUCTS[slug] || null);
    }
    load();
  }, [slug]);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    );
  }

  const mainImage = product.images?.[0] || '/images/placeholder.jpg';

  function handleAddToCart() {
    if (!selectedSize && product!.sizes.length > 0) return;
    addItem({
      productId: product!.id,
      name: product!.name,
      price: product!.price,
      size: selectedSize || 'ONE SIZE',
      image: mainImage,
      slug: product!.slug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <section className="product-detail">
      <div className="product-detail__container">
        <div className="product-detail__gallery">
          <img src={mainImage} alt={product.name} className="product-detail__image" />
        </div>
        <div className="product-detail__info">
          {product.badge && <span className="product-detail__badge">{product.badge}</span>}
          <h1 className="product-detail__name">{product.name}</h1>
          {product.color && <p className="product-detail__color">{product.color}</p>}
          <div className="product-detail__price">{formatPrice(product.price)}</div>
          {product.description && (
            <p className="product-detail__desc">
              {product.description.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
          )}

          {product.sizes.length > 0 && (
            <div className="size-selector">
              <div className="size-selector__label">Size</div>
              <div className="size-selector__options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-selector__btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={product.sizes.length > 0 && !selectedSize}
          >
            {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
          </button>

          {added && (
            <button
              onClick={() => router.push('/cart')}
              style={{
                marginTop: 16, width: '100%', padding: '14px 36px',
                fontSize: 13, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', cursor: 'pointer',
              }}
            >
              VIEW CART →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
