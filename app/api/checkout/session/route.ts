import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

/* ════════════════════════════════════════════════
   GET /api/checkout/session?session_id=cs_xxx
   Returns session details for the success page
   ════════════════════════════════════════════════ */

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({
      customer_email: 'demo@svet.global',
      amount_total: 0,
      payment_status: 'paid',
      metadata: { orderNumber: 'SVET-DEMO' },
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      customer_email: session.customer_details?.email || session.customer_email,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
      metadata: session.metadata,
    });
  } catch (err: any) {
    console.error('[Session Fetch Error]', err.message);
    return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 });
  }
}
