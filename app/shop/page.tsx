'use client';

import { useCart } from '@/lib/cart';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import catalogData from '@/data/products.json';
import { getLocale, getCurrency, formatPrice, isRussia } from '@/lib/locale';

/* ════════════════════════════════════════════════
   SVET SHOP — Locale-aware catalog
   Reads NEXT_PUBLIC_LOCALE for language + currency
   ════════════════════════════════════════════════ */

type RawProduct = (typeof catalogData.products)[number];
type Category = (typeof catalogData.categories)[number];

const locale = getLocale();
const currency = getCurrency();

/* Helper: get localized field from product */
function pName(p: RawProduct): string {
  return locale === 'ru' ? p.ru.name : p.en.name;
}
function pDesc(p: RawProduct): string {
  return locale === 'ru' ? p.ru.description : p.en.description;
}
function pPrice(p: RawProduct): number {
  return p.price[currency] || p.price.USD;
}
function catName(c: Category): string {
  return locale === 'ru' ? (c.name_ru || c.name) : c.name;
}

const SORT_OPTIONS = locale === 'ru' ? [
  { value: 'newest', label: 'Новинки' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'name-asc', label: 'А → Я' },
] : [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'A → Z' },
];

/* ── Product Card ────────────────────────────── */
function ProductCard({ product }: { product: RawProduct }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [added, setAdded] = useState(false);
  const name = pName(product);
  const price = pPrice(product);

  const handleAdd = () => {
    if (!selectedSize && product.sizes.length > 1) return;
    addItem({
      productId: product.id,
      stripePriceId: '',
      name,
      price: currency === 'RUB' ? price : price, // stored as-is for both
      size: selectedSize || product.sizes[0],
      image: product.image_main,
      slug: product.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="shop-card">
      {product.badge && <span className={`shop-card__badge ${product.badge === 'NEW' ? 'shop-card__badge--new' : ''}`}>{product.badge}</span>}
      {product.preorder && <span className="shop-card__preorder-label">{locale === 'ru' ? 'ПРЕДЗАКАЗ' : 'PRE-ORDER'}</span>}

      <Link href={`/product/${product.id}`} className="shop-card__image-wrap">
        <img
          src={product.image_main}
          alt={name}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="400" height="500" fill="#111"/><text x="200" y="250" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="900" fill="#333" letter-spacing="8">SVET</text></svg>`)}`;
          }}
        />
      </Link>

      <div className="shop-card__info">
        <Link href={`/product/${product.id}`} className="shop-card__name-link">
          <h3 className="shop-card__name">{name}</h3>
        </Link>
        <p className="shop-card__desc">{pDesc(product)}</p>

        <div className="shop-card__pricing">
          <span className="shop-card__price">{formatPrice(price)}</span>
        </div>

        <div className="shop-card__shipping">
          {isRussia() ? '🇷🇺 БЕСПЛАТНАЯ ДОСТАВКА ПО РОССИИ' : '🌍 FREE SHIPPING'}
        </div>

        <div className="shop-card__sizes">
          <div className="shop-card__sizes-label">{locale === 'ru' ? 'РАЗМЕР' : 'SIZE'}</div>
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

        <button
          className={`shop-card__add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          disabled={!selectedSize && product.sizes.length > 1}
        >
          {added
            ? (locale === 'ru' ? '✓ ДОБАВЛЕНО' : '✓ ADDED')
            : (locale === 'ru' ? 'В КОРЗИНУ' : 'ADD TO CART')
          }
        </button>
      </div>
    </div>
  );
}

/* ── Category Sidebar ────────────────────────── */
function CategorySidebar({
  categories,
  activeCategory,
  productCounts,
  onCategoryChange,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: {
  categories: Category[];
  activeCategory: string;
  productCounts: Record<string, number>;
  onCategoryChange: (cat: string) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean) => void;
}) {
  return (
    <>
      {mobileSidebarOpen && <div className="catalog-overlay" onClick={() => setMobileSidebarOpen(false)} />}

      <aside className={`catalog-sidebar ${mobileSidebarOpen ? 'catalog-sidebar--open' : ''}`}>
        <div className="catalog-sidebar__header">
          <h3>{locale === 'ru' ? 'Категории' : 'Categories'}</h3>
          <button className="catalog-sidebar__close" onClick={() => setMobileSidebarOpen(false)}>✕</button>
        </div>

        <button
          className={`catalog-sidebar__item ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => { onCategoryChange('all'); setMobileSidebarOpen(false); }}
        >
          <span>🏷️ {locale === 'ru' ? 'Все товары' : 'All Products'}</span>
          <span className="catalog-sidebar__count">{catalogData.products.length}</span>
        </button>

        {categories.map(cat => (
          <button
            key={cat.id}
            className={`catalog-sidebar__item ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => { onCategoryChange(cat.id); setMobileSidebarOpen(false); }}
          >
            <span>{cat.icon} {catName(cat)}</span>
            <span className="catalog-sidebar__count">{productCounts[cat.id] || 0}</span>
          </button>
        ))}
      </aside>
    </>
  );
}

/* ── Main Shop Page ──────────────────────────── */
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    catalogData.products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let result = [...catalogData.products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        pName(p).toLowerCase().includes(q) ||
        pDesc(p).toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => pPrice(a) - pPrice(b));
        break;
      case 'price-desc':
        result.sort((a, b) => pPrice(b) - pPrice(a));
        break;
      case 'name-asc':
        result.sort((a, b) => pName(a).localeCompare(pName(b)));
        break;
    }

    return result;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <>
      <div className="preorder-banner">
        {isRussia()
          ? '☀ ПРЕДЗАКАЗ ОТКРЫТ — ПЕРВАЯ КОЛЛЕКЦИЯ — БЕСПЛАТНАЯ ДОСТАВКА ПО РОССИИ'
          : '☀ PRE-ORDER OPEN — FIRST DROP — FREE SHIPPING'
        }
      </div>

      <section className="section" style={{ paddingTop: 120 }}>
        <div className="section__container">
          <div className="section-header" style={{ marginBottom: 32 }}>
            <span className="section-header__label">{locale === 'ru' ? 'КАТАЛОГ' : 'CATALOG'}</span>
            <h1 className="section-header__title">{locale === 'ru' ? 'МАГАЗИН' : 'SHOP'}</h1>
            <p className="section-header__desc">
              {isRussia()
                ? 'Каждая вещь несёт смысл. Предзаказ по эксклюзивным ценам.'
                : 'Every piece carries a message. Pre-order now at exclusive prices.'
              }
            </p>
          </div>

          {/* Toolbar */}
          <div className="catalog-toolbar">
            <button
              className="catalog-toolbar__filter-btn"
              onClick={() => setMobileSidebarOpen(true)}
            >
              ☰ {locale === 'ru' ? 'Фильтры' : 'Filters'}
            </button>

            <div className="catalog-toolbar__search">
              <input
                type="text"
                placeholder={locale === 'ru' ? 'Поиск товаров...' : 'Search products...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="catalog-toolbar__search-input"
              />
              {searchQuery && (
                <button className="catalog-toolbar__search-clear" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            <div className="catalog-toolbar__sort">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="catalog-toolbar__sort-select"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="catalog-toolbar__count">
              {filtered.length} {locale === 'ru'
                ? (filtered.length === 1 ? 'товар' : 'товаров')
                : (filtered.length === 1 ? 'product' : 'products')
              }
            </div>
          </div>

          {/* Category pills */}
          <div className="catalog-pills">
            <button
              className={`catalog-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {locale === 'ru' ? 'Все' : 'All'}
            </button>
            {catalogData.categories.map(cat => (
              <button
                key={cat.id}
                className={`catalog-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon} {catName(cat)}
              </button>
            ))}
          </div>

          {/* Layout */}
          <div className="catalog-layout">
            <CategorySidebar
              categories={catalogData.categories}
              activeCategory={activeCategory}
              productCounts={productCounts}
              onCategoryChange={setActiveCategory}
              mobileSidebarOpen={mobileSidebarOpen}
              setMobileSidebarOpen={setMobileSidebarOpen}
            />

            <div className="catalog-main">
              {filtered.length > 0 ? (
                <div className="shop-grid">
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="catalog-empty">
                  <div className="catalog-empty__icon">🔍</div>
                  <h3>{locale === 'ru' ? 'Ничего не найдено' : 'No products found'}</h3>
                  <p>{locale === 'ru' ? 'Попробуйте изменить фильтры.' : 'Try adjusting your filters.'}</p>
                  <button
                    className="catalog-empty__reset"
                    onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  >
                    {locale === 'ru' ? 'Сбросить фильтры' : 'Reset Filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
