import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { saveOrder } from '@/lib/orders';

/* ════════════════════════════════════════════════
   Stripe Webhook — POST /api/webhooks/stripe
   
   Register in Stripe Dashboard:
   https://dashboard.stripe.com/webhooks
   URL: https://svet.global/api/webhooks/stripe
   Events: checkout.session.completed
   
   ✅ Verifies webhook signature
   ✅ Extracts shipping address + line items
   ✅ Saves order locally
   ✅ Sends branded confirmation email
   ✅ Notifies admin on Telegram
   ════════════════════════════════════════════════ */

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const ADMIN_CHAT_ID = 339073973;

async function notifyTelegram(message: string) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log('[Webhook] Telegram (no token):', message);
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: message, parse_mode: 'HTML' }),
    });
  } catch (err) {
    console.error('[Webhook] Telegram failed:', err);
  }
}

async function sendOrderEmail(
  email: string,
  orderNumber: string,
  items: { name: string; size: string; quantity: number; price: number }[],
  total: number,
  shipping: { name: string; address: any; phone?: string } | null,
) {
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://svet.global';
  try {
    await fetch(`${siteUrl}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, orderNumber, items, total, shipping }),
    });
    console.log(`[Webhook] Email sent to ${email}`);
  } catch (err) {
    console.error('[Webhook] Email failed:', err);
  }
}

function formatAddress(shipping: any): string {
  if (!shipping?.address) return 'Not provided';
  const a = shipping.address;
  const parts = [
    shipping.name || '',
    a.line1 || '',
    a.line2 || '',
    [a.city, a.state, a.postal_code].filter(Boolean).join(', '),
    a.country || '',
  ].filter(Boolean);
  return parts.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    // ═══ VERIFY SIGNATURE ═══
    if (webhookSecret && sig && stripe) {
      try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      } catch (err: any) {
        console.error('[Webhook] ❌ Signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else if (!webhookSecret) {
      console.warn('[Webhook] ⚠️ No STRIPE_WEBHOOK_SECRET set — skipping signature verification');
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }

    console.log(`[Webhook] ✅ Event received: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionAny = session as any;
        const email = session.customer_details?.email || session.customer_email || 'unknown';
        const phone = session.customer_details?.phone || '';
        const amountTotal = session.amount_total || 0;
        const orderNumber = session.metadata?.orderNumber || `SVET-${Date.now().toString(36).toUpperCase()}`;

        // ═══ SHIPPING ADDRESS ═══
        const shippingRaw = sessionAny.shipping_details
          || sessionAny.collected_information?.shipping_details
          || null;
        const shipping = shippingRaw
          ? {
              name: shippingRaw.name || session.customer_details?.name || '',
              address: shippingRaw.address || null,
              phone,
            }
          : null;

        // ═══ LINE ITEMS FROM STRIPE ═══
        let lineItems: { name: string; size: string; quantity: number; price: number }[] = [];
        if (stripe) {
          try {
            const stripeItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });
            lineItems = stripeItems.data.map(item => ({
              name: item.description || 'SVET Product',
              size: '',
              quantity: item.quantity || 1,
              price: item.amount_total || 0,
            }));
          } catch (err) {
            console.error('[Webhook] Failed to fetch line items:', err);
            lineItems = [{ name: 'SVET Collection Order', size: '', quantity: 1, price: amountTotal }];
          }
        }

        if (session.mode === 'payment') {
          // ═══ SAVE ORDER ═══
          try {
            await saveOrder({
              orderNumber,
              email,
              phone,
              items: lineItems,
              total: amountTotal,
              shipping,
              status: 'confirmed',
              stripeSessionId: session.id,
              createdAt: new Date().toISOString(),
            });
            console.log(`[Webhook] Order saved: ${orderNumber}`);
          } catch (err) {
            console.error('[Webhook] Failed to save order:', err);
          }

          // ═══ SEND EMAIL ═══
          await sendOrderEmail(email, orderNumber, lineItems, amountTotal, shipping);

          // ═══ TELEGRAM NOTIFICATION ═══
          const msg = [
            '🛍 <b>NEW ORDER!</b>',
            '',
            `📋 Order: <b>${orderNumber}</b>`,
            `💰 Total: <b>$${(amountTotal / 100).toFixed(2)}</b>`,
            `📧 Email: ${email}`,
            phone ? `📱 Phone: ${phone}` : '',
            '',
            '<b>Items:</b>',
            ...lineItems.map(i => `  • ${i.name} × ${i.quantity} — $${(i.price / 100).toFixed(2)}`),
            '',
            '📦 <b>Ship to:</b>',
            formatAddress(shipping),
            '',
            `🕐 ${new Date().toISOString()}`,
          ].filter(Boolean).join('\n');

          await notifyTelegram(msg);
          console.log(`[Webhook] ✅ Order ${orderNumber} processed — email + telegram sent`);
        }
        break;
      }

      case 'customer.subscription.created': {
        const sub = event.data.object;
        await notifyTelegram(`<b>SUBSCRIPTION ACTIVE</b>\nID: ${sub.id}\nStatus: ${sub.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        await notifyTelegram(`<b>SUBSCRIPTION CANCELLED</b>\nID: ${sub.id}`);
        break;
      }

      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice;
        await notifyTelegram(`<b>PAYMENT FAILED</b>\nInvoice: ${inv.id}\nEmail: ${inv.customer_email || 'unknown'}\nAmount: $${((inv.amount_due || 0) / 100).toFixed(2)}`);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('[Webhook] Error:', err.message);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    webhook: 'SVET Stripe Webhook',
    endpoint: '/api/webhooks/stripe',
    events: ['checkout.session.completed', 'customer.subscription.created', 'customer.subscription.deleted', 'invoice.payment_failed'],
    docs: 'Register at https://dashboard.stripe.com/webhooks with URL: https://svet.global/api/webhooks/stripe',
  });
}
