import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

/* ════════════════════════════════════════════════
   Stripe Webhook — POST /api/stripe-webhook
   Handles: checkout.session.completed, payment_intent.succeeded
   Actions: create user, send Telegram notification
   ════════════════════════════════════════════════ */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const ADMIN_CHAT_ID = 339073973; // @carpediemrn

// In-memory subscriber store (replace with DB)
interface Subscriber {
  id: string;
  email: string;
  plan: string;
  amount: number;
  stripeCustomerId: string;
  stripeSessionId: string;
  createdAt: number;
}

const subscribers = new Map<string, Subscriber>();
export { subscribers };

async function notifyTelegram(message: string) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.log('[Stripe Webhook] Telegram notification (no bot token):', message);
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    console.log('[Stripe Webhook] Telegram notification sent');
  } catch (err) {
    console.error('[Stripe Webhook] Telegram notification failed:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;

    if (webhookSecret && sig) {
      // Verify webhook signature in production
      try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      } catch (err: any) {
        console.error('[Stripe Webhook] Signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // Development mode — parse raw JSON
      event = JSON.parse(body);
      console.log('[Stripe Webhook] Dev mode — no signature verification');
    }

    console.log(`[Stripe Webhook] Event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.customer_details?.email || session.customer_email || 'unknown';
        const customerId = session.customer || 'unknown';
        const amountTotal = session.amount_total || 0;
        const mode = session.mode; // 'payment' for products, 'subscription' for AI plans
        const orderNumber = session.metadata?.orderNumber || '';

        if (mode === 'payment') {
          // ═══ PRODUCT ORDER ═══
          console.log(`[Stripe Webhook] Product order: ${orderNumber} by ${email} — $${(amountTotal / 100).toFixed(2)}`);

          await notifyTelegram(
            `🛍️ <b>NEW ORDER!</b>\n\n` +
            `📧 ${email}\n` +
            `📦 Order: <b>${orderNumber}</b>\n` +
            `💵 Total: <b>$${(amountTotal / 100).toFixed(2)}</b>\n` +
            `🚚 Shipping address collected\n` +
            `⏰ ${new Date().toISOString()}\n\n` +
            `📋 Check Stripe Dashboard for full details.`
          );
        } else {
          // ═══ SUBSCRIPTION ═══
          const plan = getPlanFromAmount(amountTotal);
          const subId = `sub_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
          subscribers.set(subId, {
            id: subId,
            email,
            plan,
            amount: amountTotal,
            stripeCustomerId: customerId,
            stripeSessionId: session.id,
            createdAt: Date.now(),
          });

          console.log(`[Stripe Webhook] New subscriber: ${email} → ${plan} ($${amountTotal / 100})`);

          await notifyTelegram(
            `💰 <b>NEW SUBSCRIPTION!</b>\n\n` +
            `📧 ${email}\n` +
            `📦 Plan: <b>${plan.toUpperCase()}</b>\n` +
            `💵 Amount: <b>$${(amountTotal / 100).toFixed(2)}/mo</b>\n` +
            `🆔 ${subId}\n` +
            `⏰ ${new Date().toISOString()}\n\n` +
            `✅ Account created automatically.`
          );
        }

        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object;
        console.log(`[Stripe Webhook] Subscription created: ${subscription.id}`);

        await notifyTelegram(
          `🔄 <b>SUBSCRIPTION ACTIVE</b>\n\n` +
          `🆔 ${subscription.id}\n` +
          `📊 Status: ${subscription.status}\n` +
          `⏰ ${new Date().toISOString()}`
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`[Stripe Webhook] Subscription cancelled: ${subscription.id}`);

        await notifyTelegram(
          `❌ <b>SUBSCRIPTION CANCELLED</b>\n\n` +
          `🆔 ${subscription.id}\n` +
          `⏰ ${new Date().toISOString()}`
        );
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`[Stripe Webhook] Payment failed: ${invoice.id}`);

        await notifyTelegram(
          `⚠️ <b>PAYMENT FAILED</b>\n\n` +
          `🆔 Invoice: ${invoice.id}\n` +
          `📧 ${invoice.customer_email || 'unknown'}\n` +
          `💵 $${((invoice.amount_due || 0) / 100).toFixed(2)}\n` +
          `⏰ ${new Date().toISOString()}`
        );
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('[Stripe Webhook] Error:', err.message);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}

function getPlanFromAmount(amountCents: number): string {
  switch (amountCents) {
    case 2300: return 'starter';
    case 6900: return 'builder';
    case 9900: return 'ultra';
    case 29900: return 'business';
    default: return `custom_${amountCents}`;
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    ok: true,
    webhook: 'SVET Stripe Webhook',
    events: ['checkout.session.completed', 'customer.subscription.created', 'customer.subscription.deleted', 'invoice.payment_failed'],
    subscribers: subscribers.size,
  });
}
