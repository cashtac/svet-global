import { NextResponse } from 'next/server';

/* ════════════════════════════════════════════════
   Stripe Checkout API — Test Mode
   POST /api/stripe-checkout
   Body: { plan: "starter" | "builder" | "ultra" | "business" }
   Supports: Card, Apple Pay, Google Pay
   ════════════════════════════════════════════════ */

const STRIPE_PLANS: Record<string, { price: number; name: string }> = {
  starter:  { price: 2300,  name: 'SVET Starter' },
  builder:  { price: 6900,  name: 'SVET Builder' },
  ultra:    { price: 9900,  name: 'SVET Ultra' },
  business: { price: 29900, name: 'SVET Business' },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = STRIPE_PLANS[body.plan?.toLowerCase()];

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://svet.global';

    if (!stripeKey) {
      // No Stripe key configured — return demo URL
      console.log(`[Stripe] Would create checkout for ${plan.name} at $${plan.price / 100}/mo`);
      return NextResponse.json({
        url: `/pricing?checkout=demo&plan=${body.plan}`,
        demo: true,
        message: `${plan.name} ($${plan.price / 100}/mo) — Stripe test mode ready. Set STRIPE_SECRET_KEY to enable real checkout.`,
      });
    }

    // Real Stripe checkout session
    const stripe = require('stripe')(stripeKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      // Card enables Apple Pay + Google Pay automatically
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: plan.name,
            description: `SVET AI subscription — ${plan.name} plan`,
          },
          unit_amount: plan.price,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      success_url: `${siteUrl}/profile?subscribed=${body.plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing?cancelled=true`,
      metadata: {
        plan: body.plan,
        source: 'svet.global',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
