import { NextRequest, NextResponse } from 'next/server';
import catalogData from '@/data/products.json';

/* ════════════════════════════════════════════════
   GET /api/products
   Locale-aware product API
   
   Query params:
     ?category=clothing
     ?subcategory=hoodies
     ?sort=price_asc|price_desc|name_asc|newest
     ?search=hoodie
     ?featured=true
     ?limit=10&offset=0
     ?locale=en (defaults to en)
   ════════════════════════════════════════════════ */

type RawProduct = (typeof catalogData.products)[number];

function getName(p: RawProduct, locale: string): string {
  return locale === 'ru' ? p.ru.name : p.en.name;
}
function getDesc(p: RawProduct, locale: string): string {
  return locale === 'ru' ? p.ru.description : p.en.description;
}
function getPrice(p: RawProduct, currency: string): number {
  return currency === 'RUB' ? p.price.RUB : p.price.USD;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || process.env.NEXT_PUBLIC_LOCALE || 'en';
  const currency = locale === 'ru' ? 'RUB' : 'USD';

  let products = [...catalogData.products];

  // ── Filters ──────────────────────────────────
  const category = searchParams.get('category');
  if (category) {
    products = products.filter(p => p.category === category || p.subcategory === category);
  }

  const subcategory = searchParams.get('subcategory');
  if (subcategory) {
    products = products.filter(p => p.subcategory === subcategory);
  }

  const badge = searchParams.get('badge');
  if (badge) {
    products = products.filter(p => p.badge === badge);
  }

  const featured = searchParams.get('featured');
  if (featured === 'true') {
    products = products.filter(p => p.featured);
  }

  const search = searchParams.get('search');
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      getName(p, locale).toLowerCase().includes(q) ||
      getDesc(p, locale).toLowerCase().includes(q)
    );
  }

  // ── Sort ─────────────────────────────────────
  const sort = searchParams.get('sort');
  switch (sort) {
    case 'price_asc':
      products.sort((a, b) => getPrice(a, currency) - getPrice(b, currency));
      break;
    case 'price_desc':
      products.sort((a, b) => getPrice(b, currency) - getPrice(a, currency));
      break;
    case 'name_asc':
      products.sort((a, b) => getName(a, locale).localeCompare(getName(b, locale)));
      break;
  }

  // ── Pagination ───────────────────────────────
  const total = products.length;
  const limit = searchParams.get('limit');
  const offset = searchParams.get('offset');

  if (limit) {
    const l = parseInt(limit, 10);
    const o = offset ? parseInt(offset, 10) : 0;
    products = products.slice(o, o + l);
  }

  // ── Serialize with locale-specific fields ────
  const serialized = products.map(p => ({
    id: p.id,
    sku: p.sku,
    name: getName(p, locale),
    description: getDesc(p, locale),
    details: locale === 'ru' ? p.ru.details : p.en.details,
    category: p.category,
    subcategory: p.subcategory,
    price: getPrice(p, currency),
    currency,
    image_main: p.image_main,
    images: p.images,
    color: p.color,
    material: p.material,
    sizes: p.sizes,
    in_stock: p.in_stock,
    preorder: p.preorder,
    featured: p.featured,
    badge: p.badge,
  }));

  return NextResponse.json(
    { products: serialized, total, categories: catalogData.categories },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
