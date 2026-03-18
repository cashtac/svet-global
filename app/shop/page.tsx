import { getProducts, Product } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop — SVET',
  description: 'Browse the SVET collection. Clothing that connects us all.',
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1', name: 'SVET Logo Long Sleeve', slug: 'svet-logo-long-sleeve',
    shortDescription: 'Wear light. Spread warmth.', price: 8500, currency: 'USD',
    images: ['/images/long-sleeve.png'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'SVET', color: 'Yellow / Red Print', category: 'TOPS', status: 'ACTIVE',
  },
  {
    id: '2', name: 'SVET Hoodie & Pants Set', slug: 'svet-hoodie-pants-set',
    shortDescription: 'Top and bottom, moving as one.', price: 18000, currency: 'USD',
    images: ['/images/hoodie-set.png'], sizes: ['S', 'M', 'L', 'XL'],
    badge: '3 WAYS', color: 'Forest Green', category: 'SETS', status: 'ACTIVE',
  },
  {
    id: '3', name: 'SVET Logo Tee 3-Pack', slug: 'svet-logo-tee-3pack',
    shortDescription: 'Three tees, one message.', price: 6500, currency: 'USD',
    images: ['/images/tee-pack.png'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'SVET', color: 'Black / White / Red', category: 'TOPS', status: 'ACTIVE',
  },
  {
    id: '4', name: 'SVET Embroidered Cap', slug: 'svet-embroidered-cap',
    shortDescription: 'Crown yourself in light.', price: 4500, currency: 'USD',
    images: ['/images/cap.png'], sizes: ['ONE SIZE'],
    badge: 'SVET', color: 'Black', category: 'ACCESSORIES', status: 'ACTIVE',
  },
];

async function getProductsOrMock(): Promise<Product[]> {
  try { return await getProducts(); } catch { return MOCK_PRODUCTS; }
}

export default async function ShopPage() {
  const products = await getProductsOrMock();

  return (
    <section className="section" style={{ paddingTop: 140 }}>
      <div className="section__container">
        <div className="section-header">
          <span className="section-header__label">Collection</span>
          <h1 className="section-header__title">SHOP</h1>
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
  );
}
