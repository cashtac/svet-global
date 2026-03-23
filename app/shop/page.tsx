'use client';

import { useCart } from '@/lib/cart';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';
import catalogData from '@/data/products.json';

/* ════════════════════════════════════════════════
   SVET SHOP — FULL CATALOG SYSTEM
   Category sidebar · Filters · Scalable to 100+
   ════════════════════════════════════════════════ */

type Product = (typeof catalogData.products)[number];
type Category = (typeof catalogData.categories)[number];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'A → Z' },
] as const;

/* ── Product Card ────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize && product.sizes.length > 1) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price_preorder * 100,
      size: selectedSize || product.sizes[0],
      image: product.image,
      slug: product.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const slug = `svet-${product.id}`;

  return (
    <div className="shop-card">
      {product.badge && <span className={`shop-card__badge ${product.badge === 'NEW' ? 'shop-card__badge--new' : ''}`}>{product.badge}</span>}
      {product.preorder && <span className="shop-card__preorder-label">PRE-ORDER</span>}

      <Link href={`/product/${slug}`} className="shop-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className="shop-card__info">
        <Link href={`/product/${slug}`} className="shop-card__name-link">
          <h3 className="shop-card__name">{product.name}</h3>
        </Link>
        <p className="shop-card__desc">{product.description}</p>

        <div className="shop-card__pricing">
          <span className="shop-card__price">${product.price_preorder}</span>
          <span className="shop-card__retail-price">${product.price_retail}</span>
        </div>

        <div className="shop-card__shipping">🌍 WORLDWIDE SHIPPING</div>

        <div className="shop-card__sizes">
          <div className="shop-card__sizes-label">SIZE</div>
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
          {added ? '✓ ADDED' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}

/* ── Category Sidebar ────────────────────────── */
function CategorySidebar({
  categories,
  activeCategory,
  activeSubcategory,
  productCounts,
  onCategoryChange,
  onSubcategoryChange,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}: {
  categories: Category[];
  activeCategory: string;
  activeSubcategory: string;
  productCounts: Record<string, number>;
  onCategoryChange: (cat: string) => void;
  onSubcategoryChange: (sub: string) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean) => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileSidebarOpen && <div className="catalog-overlay" onClick={() => setMobileSidebarOpen(false)} />}

      <aside className={`catalog-sidebar ${mobileSidebarOpen ? 'catalog-sidebar--open' : ''}`}>
        <div className="catalog-sidebar__header">
          <h3>Categories</h3>
          <button className="catalog-sidebar__close" onClick={() => setMobileSidebarOpen(false)}>✕</button>
        </div>

        <button
          className={`catalog-sidebar__item ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => { onCategoryChange('all'); onSubcategoryChange('all'); setMobileSidebarOpen(false); }}
        >
          <span>🏷️ All Products</span>
          <span className="catalog-sidebar__count">{catalogData.products.length}</span>
        </button>

        {categories.map(cat => {
          const count = productCounts[cat.id] || 0;
          const isActive = activeCategory === cat.id;
          const isComingSoon = 'comingSoon' in cat && cat.comingSoon;

          return (
            <div key={cat.id} className="catalog-sidebar__group">
              <button
                className={`catalog-sidebar__item ${isActive ? 'active' : ''} ${isComingSoon ? 'catalog-sidebar__item--soon' : ''}`}
                onClick={() => {
                  if (isComingSoon) return;
                  onCategoryChange(cat.id);
                  onSubcategoryChange('all');
                  setMobileSidebarOpen(false);
                }}
                disabled={isComingSoon}
              >
                <span>{cat.icon} {cat.name}</span>
                {isComingSoon ? (
                  <span className="catalog-sidebar__soon">SOON</span>
                ) : (
                  <span className="catalog-sidebar__count">{count}</span>
                )}
              </button>

              {/* Subcategories */}
              {isActive && !isComingSoon && cat.subcategories.length > 0 && (
                <div className="catalog-sidebar__subs">
                  <button
                    className={`catalog-sidebar__sub ${activeSubcategory === 'all' ? 'active' : ''}`}
                    onClick={() => { onSubcategoryChange('all'); setMobileSidebarOpen(false); }}
                  >
                    All {cat.name}
                  </button>
                  {cat.subcategories.map(sub => {
                    const subCount = catalogData.products.filter(p => p.subcategory === sub).length;
                    if (subCount === 0) return null;
                    return (
                      <button
                        key={sub}
                        className={`catalog-sidebar__sub ${activeSubcategory === sub ? 'active' : ''}`}
                        onClick={() => { onSubcategoryChange(sub); setMobileSidebarOpen(false); }}
                      >
                        {sub.charAt(0).toUpperCase() + sub.slice(1)}
                        <span className="catalog-sidebar__count">{subCount}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </aside>
    </>
  );
}

/* ── Main Shop Page ──────────────────────────── */
export default function ShopPage() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Product counts per category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    catalogData.products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter products
  const filtered = useMemo(() => {
    let result = [...catalogData.products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Subcategory filter
    if (activeSubcategory !== 'all') {
      result = result.filter(p => p.subcategory === activeSubcategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price_preorder - b.price_preorder);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price_preorder - a.price_preorder);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // newest — keep original order
        break;
    }

    return result;
  }, [activeCategory, activeSubcategory, sortBy, searchQuery]);

  const activeLabel = activeCategory === 'all'
    ? 'All Products'
    : activeSubcategory !== 'all'
      ? `${activeSubcategory.charAt(0).toUpperCase() + activeSubcategory.slice(1)}`
      : catalogData.categories.find(c => c.id === activeCategory)?.name || 'Products';

  return (
    <>
      <div className="preorder-banner">
        {t('shop.banner')}
      </div>

      <section className="section" style={{ paddingTop: 120 }}>
        <div className="section__container">
          {/* Header */}
          <div className="section-header" style={{ marginBottom: 32 }}>
            <span className="section-header__label">CATALOG</span>
            <h1 className="section-header__title">SHOP</h1>
            <p className="section-header__desc">
              Every piece carries a message. Pre-order now at exclusive prices.
            </p>
          </div>

          {/* Toolbar: search + sort + mobile filter btn */}
          <div className="catalog-toolbar">
            <button
              className="catalog-toolbar__filter-btn"
              onClick={() => setMobileSidebarOpen(true)}
            >
              ☰ Filters
            </button>

            <div className="catalog-toolbar__search">
              <input
                type="text"
                placeholder="Search products..."
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
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Quick category pills (top filter) */}
          <div className="catalog-pills">
            <button
              className={`catalog-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('all'); setActiveSubcategory('all'); }}
            >
              All
            </button>
            {catalogData.categories.map(cat => {
              const isComingSoon = 'comingSoon' in cat && cat.comingSoon;
              return (
                <button
                  key={cat.id}
                  className={`catalog-pill ${activeCategory === cat.id ? 'active' : ''} ${isComingSoon ? 'catalog-pill--soon' : ''}`}
                  onClick={() => {
                    if (isComingSoon) return;
                    setActiveCategory(cat.id);
                    setActiveSubcategory('all');
                  }}
                  disabled={isComingSoon}
                >
                  {cat.icon} {cat.name}
                  {isComingSoon && <span className="catalog-pill__soon">Soon</span>}
                </button>
              );
            })}
          </div>

          {/* Layout: Sidebar + Grid */}
          <div className="catalog-layout">
            <CategorySidebar
              categories={catalogData.categories}
              activeCategory={activeCategory}
              activeSubcategory={activeSubcategory}
              productCounts={productCounts}
              onCategoryChange={setActiveCategory}
              onSubcategoryChange={setActiveSubcategory}
              mobileSidebarOpen={mobileSidebarOpen}
              setMobileSidebarOpen={setMobileSidebarOpen}
            />

            <div className="catalog-main">
              {/* Active filter label */}
              {(activeCategory !== 'all' || searchQuery) && (
                <div className="catalog-active-filter">
                  <span>{activeLabel}</span>
                  {searchQuery && <span className="catalog-active-filter__query"> — "{searchQuery}"</span>}
                  <button
                    className="catalog-active-filter__clear"
                    onClick={() => { setActiveCategory('all'); setActiveSubcategory('all'); setSearchQuery(''); }}
                  >
                    Clear all ✕
                  </button>
                </div>
              )}

              {/* Product Grid */}
              {filtered.length > 0 ? (
                <div className="shop-grid">
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="catalog-empty">
                  <div className="catalog-empty__icon">🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search query.</p>
                  <button
                    className="catalog-empty__reset"
                    onClick={() => { setActiveCategory('all'); setActiveSubcategory('all'); setSearchQuery(''); }}
                  >
                    Reset Filters
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
