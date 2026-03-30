import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

/* ════════════════════════════════════════════════
   Checkout — Creates Stripe Checkout Session
   Collects shipping address for ALL countries
   POST /api/checkout
   ════════════════════════════════════════════════ */

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://svet.global';

// Stripe-supported shipping countries (comprehensive list)
const ALL_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  'AC','AD','AE','AF','AG','AI','AL','AM','AO','AQ','AR','AT','AU','AW','AX','AZ',
  'BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS','BT','BV','BW','BY','BZ',
  'CA','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CR','CV','CW','CY','CZ',
  'DE','DJ','DK','DM','DO','DZ',
  'EC','EE','EG','EH','ER','ES','ET',
  'FI','FJ','FK','FO','FR',
  'GA','GB','GD','GE','GF','GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY',
  'HK','HN','HR','HT','HU',
  'ID','IE','IL','IM','IN','IO','IQ','IS','IT',
  'JE','JM','JO','JP',
  'KE','KG','KH','KI','KM','KN','KR','KW','KY','KZ',
  'LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY',
  'MA','MC','MD','ME','MF','MG','MK','ML','MM','MN','MO','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ',
  'NA','NC','NE','NG','NI','NL','NO','NP','NR','NZ',
  'OM',
  'PA','PE','PF','PG','PH','PK','PL','PM','PN','PR','PS','PT','PY',
  'QA',
  'RE','RO','RS','RU','RW',
  'SA','SB','SC','SE','SG','SH','SI','SK','SL','SM','SN','SO','SR','SS','ST','SV','SX','SZ',
  'TA','TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO','TR','TT','TV','TW','TZ',
  'UA','UG','US','UY','UZ',
  'VA','VC','VE','VG','VN','VU',
  'WF','WS',
  'XK',
  'YE','YT',
  'ZA','ZM','ZW',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, items } = body;

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Email and items are required' }, { status: 400 });
    }

    const orderNumber = `SVET-${Date.now().toString(36).toUpperCase()}`;
    const total = items.reduce((sum: number, item: any) => sum + (item.price * (item.quantity || 1)), 0);

    if (!stripe) {
      // Demo mode
      console.log(`[Checkout DEMO] ${orderNumber} — ${email} — $${(total / 100).toFixed(2)}`);
      return NextResponse.json({
        ok: true,
        data: { orderNumber, demo: true, message: 'Demo mode. Set STRIPE_SECRET_KEY for real payments.' },
      });
    }

    // Build Stripe line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || `SVET ${item.productId}`,
          description: item.size ? `Size: ${item.size}` : undefined,
          metadata: { sku: item.sku || '', productId: item.productId },
        },
        unit_amount: item.price,
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      allow_promotion_codes: true,
      customer_email: email,
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ALL_COUNTRIES },
      phone_number_collection: { enabled: true },
      line_items: lineItems,
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cart?cancelled=true`,
      metadata: { orderNumber, source: 'svet.global', email },
    });

    return NextResponse.json({
      ok: true,
      data: { orderNumber, checkoutUrl: session.url },
    });
  } catch (err: any) {
    console.error('[Checkout Error]', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
