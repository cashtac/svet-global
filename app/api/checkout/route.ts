import { NextRequest, NextResponse } from 'next/server';

/* ════════════════════════════════════════════════
   Product Checkout — Stripe / Demo Mode
   POST /api/checkout
   
   Body: {
     email: string,
     items: [{ productId, name, price, size, quantity }]
   }
   
   If STRIPE_SECRET_KEY is set → creates Stripe Checkout Session
   If not → returns a demo success order
   ════════════════════════════════════════════════ */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, items } = body;

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Email and items are required' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://svet.global';

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0);
    const orderNumber = `SVET-${Date.now().toString(36).toUpperCase()}`;

    if (!stripeKey) {
      // Demo mode — simulate successful order
      console.log(`[Checkout DEMO] Order ${orderNumber} for ${email}: ${items.length} items, $${(total / 100).toFixed(2)}`);
      return NextResponse.json({
        ok: true,
        data: {
          orderNumber,
          demo: true,
          message: `Order ${orderNumber} created in demo mode. Set STRIPE_SECRET_KEY for real payments.`,
        },
      });
    }

    // Real Stripe checkout
    const stripe = require('stripe')(stripeKey);
    
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || `SVET Product ${item.productId}`,
          description: item.size ? `Size: ${item.size}` : undefined,
        },
        unit_amount: item.price, // in cents
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      customer_email: email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: [
          'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE',
          'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'AU', 'NZ', 'JP',
          'KR', 'SG', 'AE', 'SA', 'TR', 'BR', 'MX', 'PL', 'CZ', 'RO',
          'BG', 'HR', 'HU', 'EE', 'LT', 'LV', 'RU', 'UA', 'KZ',
        ],
      },
      line_items: lineItems,
      success_url: `${siteUrl}/order/${orderNumber}?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart?cancelled=true`,
      metadata: {
        orderNumber,
        source: 'svet.global',
        email,
      },
    });

    return NextResponse.json({
      ok: true,
      data: {
        orderNumber,
        checkoutUrl: session.url,
      },
    });
  } catch (err: any) {
    console.error('[Checkout Error]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
