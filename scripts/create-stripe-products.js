#!/usr/bin/env node

/**
 * Create all 12 SVET products + prices in Stripe
 * 
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-stripe-products.js
 * 
 * Or add STRIPE_SECRET_KEY to .env.local first, then:
 *   node scripts/create-stripe-products.js
 */

const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

// Load env from .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length > 0 && !process.env[key.trim()]) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  });
}

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not set.');
  console.error('   Run: STRIPE_SECRET_KEY=sk_test_xxx node scripts/create-stripe-products.js');
  process.exit(1);
}

const stripe = new Stripe(STRIPE_KEY);

// ═══ PRODUCT CATALOG ═══
const PRODUCTS = [
  { name: 'SVET Hoodie Vintage',          price: 6900, desc: 'Distressed washed hoodie, vintage aged look, bubble logo. 400gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET Hoodie Bubble',           price: 6900, desc: 'Dark navy hoodie, red bubble sVet™ logo, kangaroo pocket. 400gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET Hoodie Serif',            price: 6900, desc: 'Dark navy hoodie, clean serif SVET logo. 400gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET Jogger Pants',            price: 5500, desc: 'Dark navy jogger cut, small SVET logo. 380gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET Wide-Leg Pants Bubble',   price: 5900, desc: 'Wide leg, bubble logo left thigh. 380gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET Pants Olive',             price: 5900, desc: 'Olive green wide-leg, minimal serif logo. 380gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET T-Shirt Black',           price: 2500, desc: 'Oversized fit, bubble sVet™ logo. 180gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET T-Shirt Black Glow',      price: 2500, desc: 'Oversized fit, glowing SVET text front + back. 180gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET T-Shirt Yellow',          price: 2500, desc: 'Color-block mustard/cream, serif logo. 180gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET T-Shirt White',           price: 2500, desc: 'Oversized white, minimal coral SVET logo. 180gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET Long Sleeve Yellow',      price: 4500, desc: 'Butter yellow, red logo, sleeve stripes. 220gsm cotton.', sizes: ['S/M', 'L/XL'] },
  { name: 'SVET Cap',                     price: 2500, desc: 'Dark navy, 3D rubber bubble logo patch. Adjustable brass buckle.', sizes: ['ONE SIZE'] },
];

async function main() {
  console.log('☀ Creating SVET products in Stripe...\n');

  const results = [];

  for (const item of PRODUCTS) {
    try {
      // Create product
      const product = await stripe.products.create({
        name: item.name,
        description: item.desc,
        metadata: {
          brand: 'SVET',
          sizes: item.sizes.join(', '),
        },
      });

      // Create price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: item.price,
        currency: 'usd',
      });

      const entry = {
        name: item.name,
        productId: product.id,
        priceId: price.id,
        price: item.price,
        sizes: item.sizes,
      };

      results.push(entry);
      console.log(`  ✅ ${item.name} — $${(item.price / 100).toFixed(2)} — ${product.id}`);
    } catch (err) {
      console.error(`  ❌ ${item.name}: ${err.message}`);
      results.push({
        name: item.name,
        error: err.message,
      });
    }
  }

  // Save results
  const outPath = path.join(__dirname, '..', 'stripe-products.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Done! ${results.filter(r => r.productId).length}/${PRODUCTS.length} products created.`);
  console.log(`📄 Saved to: stripe-products.json`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
