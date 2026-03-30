/**
 * Stripe price ID lookup — maps product name to Stripe price ID
 * Generated from stripe-products.json
 */

import stripeProducts from '@/stripe-products.json';

// Build lookup: product name → priceId
const priceLookup: Record<string, string> = {};
for (const p of stripeProducts) {
  if ('priceId' in p && p.priceId) {
    priceLookup[p.name] = p.priceId;
  }
}

/**
 * Get Stripe price ID by product name
 */
export function getStripePriceId(productName: string): string | undefined {
  return priceLookup[productName];
}

export { priceLookup };
