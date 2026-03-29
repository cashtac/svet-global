import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

/* ════════════════════════════════════════════════
   Stripe Webhook — POST /api/stripe-webhook
   Handles: checkout.session.completed
   Actions: send email confirmation, Telegram notification
   ════════════════════════════════════════════════ */

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
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (err) {
    console.error('[Webhook] Telegram failed:', err);
  }
}

async function sendOrderEmail(email: string, orderNumber: string, total: number) {
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://svet.global';
  try {
    await fetch(`${siteUrl}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        orderNumber,
        items: [{ name: 'SVET Collection Order', size: '', quantity: 1, price: total }],
        total,
      }),
    });
    console.log(`[Webhook] Confirmation email sent to ${email}`);
  } catch (err) {
    console.error('[Webhook] Email failed:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;

    if (webhookSecret && sig) {
      try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      } catch (err: any) {
        console.error('[Webhook] Signature failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      event = JSON.parse(body);
    }

    console.log(`[Webhook] Event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.customer_details?.email || session.customer_email || 'unknown';
        const amountTotal = session.amount_total || 0;
        const mode = session.mode;
        const orderNumber = session.metadata?.orderNumber || `SVET-${Date.now().toString(36).toUpperCase()}`;

        if (mode === 'payment') {
          // ═══ PRODUCT ORDER ═══
          console.log(`[Webhook] Order: ${orderNumber} by ${email} - $${(amountTotal / 100).toFixed(2)}`);

          // Send branded confirmation email to customer
          await sendOrderEmail(email, orderNumber, amountTotal);

          // Notify admin on Telegram
          const msg = [
            '<b>NEW ORDER!</b>',
            '',
            `Email: ${email}`,
            `Order: <b>${orderNumber}</b>`,
            `Total: <b>$${(amountTotal / 100).toFixed(2)}</b>`,
            `Shipping: address collected`,
            `Email: confirmation sent`,
            `Time: ${new Date().toISOString()}`,
            '',
            'Check Stripe Dashboard for details.',
          ].join('\n');
          await notifyTelegram(msg);
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
        const inv = event.data.object;
        await notifyTelegram(`<b>PAYMENT FAILED</b>\nInvoice: ${inv.id}\nEmail: ${inv.customer_email || 'unknown'}\nAmount: $${((inv.amount_due || 0) / 100).toFixed(2)}`);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled: ${event.type}`);
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
    events: ['checkout.session.completed', 'customer.subscription.created', 'customer.subscription.deleted', 'invoice.payment_failed'],
  });
}
