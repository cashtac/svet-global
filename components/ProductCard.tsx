import Link from 'next/link';
import { Product, formatPrice } from '@/lib/api';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const mainImage = product.images?.[0] || '/images/placeholder.jpg';

  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      {product.badge && <span className="product-card__badge">{product.badge}</span>}
      <div className="product-card__image-wrap">
        <img src={mainImage} alt={product.name} className="product-card__image" />
      </div>
      <div className="product-card__info">
        <div className="product-card__name">{product.name}</div>
        {product.color && <div className="product-card__color">{product.color}</div>}
        <div className="product-card__price">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
}
