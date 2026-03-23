import { NextRequest, NextResponse } from 'next/server';
import catalogData from '@/data/products.json';

/* ════════════════════════════════════════════════
   GET /api/products
   Open product API — any agent or platform can read
   
   Query params:
     ?category=clothing
     ?subcategory=hoodies
     ?sort=price_asc|price_desc|name_asc|newest
     ?search=hoodie
     ?badge=NEW
     ?featured=true
     ?limit=10
     ?offset=0
   ════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

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

  const inStock = searchParams.get('in_stock');
  if (inStock === 'true') {
    products = products.filter(p => p.in_stock);
  }

  const search = searchParams.get('search');
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }

  // ── Sort ─────────────────────────────────────
  const sort = searchParams.get('sort');
  switch (sort) {
    case 'price_asc':
      products.sort((a, b) => a.price_preorder - b.price_preorder);
      break;
    case 'price_desc':
      products.sort((a, b) => b.price_preorder - a.price_preorder);
      break;
    case 'name_asc':
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    // 'newest' or default — keep original order (newest first in JSON)
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

  // ── Response ─────────────────────────────────
  return NextResponse.json(
    { products, total, categories: catalogData.categories },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
