import { NextRequest, NextResponse } from 'next/server';
import catalogData from '@/data/products.json';

/* ════════════════════════════════════════════════
   GET /api/products/[id]
   Returns a single product by its ID
   ════════════════════════════════════════════════ */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Match by exact ID or with svet- prefix
  const product = catalogData.products.find(
    p => p.id === id || `svet-${p.id}` === id
  );

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found', id },
      { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  // Get related products (same category)
  const related = catalogData.products
    .filter(p => p.id !== product.id)
    .sort((a, b) => {
      if (a.category === product.category && b.category !== product.category) return -1;
      if (b.category === product.category && a.category !== product.category) return 1;
      return 0;
    })
    .slice(0, 4);

  return NextResponse.json(
    { product, related },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
