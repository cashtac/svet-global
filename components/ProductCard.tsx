import Link from 'next/link';
import { Product, formatPrice } from '@/lib/api';

/* ════════════════════════════════════════════════
   ProductCard — Homepage featured product card
   Now with image fallback SVG placeholder
   ════════════════════════════════════════════════ */

const PLACEHOLDER_SVG = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="400" height="500" fill="#111"/><rect x="20" y="20" width="360" height="460" rx="16" fill="none" stroke="#222" stroke-width="1"/><text x="200" y="220" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="#333" letter-spacing="8">SVET</text><text x="200" y="260" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#444" letter-spacing="4">COMING SOON</text><circle cx="200" cy="340" r="24" fill="none" stroke="#C9A84C" stroke-width="1" opacity="0.3"/><text x="200" y="345" text-anchor="middle" font-size="16" fill="#C9A84C" opacity="0.4">☀</text></svg>')}`;

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const mainImage = product.images?.[0] || PLACEHOLDER_SVG;

  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      {product.badge && <span className="product-card__badge">{product.badge}</span>}
      <div className="product-card__image-wrap">
        <img
          src={mainImage}
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
        {product.color && <div className="product-card__color">{product.color}</div>}
        <div className="product-card__price">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
}
