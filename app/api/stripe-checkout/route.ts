import { NextResponse } from 'next/server';

/* ════════════════════════════════════════════════
   Stripe Checkout API — Test Mode
   POST /api/stripe-checkout
   Body: { planName: string, priceId?: string }
   ════════════════════════════════════════════════ */

const STRIPE_PLANS: Record<string, { price: number; name: string }> = {
  starter: { price: 2300, name: 'SVET Starter' },
  builder: { price: 6900, name: 'SVET Builder' },
  ultra:   { price: 9900, name: 'SVET Ultra' },
  business:{ price: 29900, name: 'SVET Business' },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = STRIPE_PLANS[body.plan?.toLowerCase()];

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      // No Stripe key configured — return demo URL
      console.log(`[Stripe] Would create checkout for ${plan.name} at $${plan.price / 100}/mo`);
      return NextResponse.json({
        url: '/pricing?checkout=demo&plan=' + body.plan,
        demo: true,
        message: 'Stripe not configured yet. Set STRIPE_SECRET_KEY env var.',
      });
    }

    // Real Stripe checkout session
    const stripe = require('stripe')(stripeKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: plan.name },
          unit_amount: plan.price,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://svet.global'}/profile?subscribed=${body.plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://svet.global'}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[Stripe] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
