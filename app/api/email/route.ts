import { NextRequest, NextResponse } from 'next/server';

/* ════════════════════════════════════════════════
   Order Confirmation Email — POST /api/email
   
   Uses Resend (free: 100 emails/day) for branded emails.
   Fallback: logs to console if no API key.
   
   Body: {
     to: string (customer email),
     orderNumber: string,
     items: [{ name, size, quantity, price }],
     total: number (cents)
   }
   ════════════════════════════════════════════════ */

const RESEND_KEY = process.env.RESEND_API_KEY || '';
// Use FROM_EMAIL env if domain is verified, else Resend's free sender
const FROM_EMAIL = process.env.FROM_EMAIL || 'SVET Orders <onboarding@resend.dev>';

function buildOrderHTML(orderNumber: string, items: any[], total: number): string {
  const itemRows = items.map(i => `
    <tr>
      <td style="padding:12px;border-bottom:1px solid #222;color:#ccc;">${i.name}</td>
      <td style="padding:12px;border-bottom:1px solid #222;color:#888;">${i.size}</td>
      <td style="padding:12px;border-bottom:1px solid #222;color:#888;text-align:center;">${i.quantity}</td>
      <td style="padding:12px;border-bottom:1px solid #222;color:#fff;text-align:right;">$${(i.price * i.quantity / 100).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    
    <!-- Header -->
    <div style="text-align:center;padding:40px 0;border-bottom:1px solid #222;">
      <h1 style="color:#fff;font-size:36px;letter-spacing:12px;margin:0;">SVET</h1>
      <p style="color:#888;font-size:11px;letter-spacing:3px;margin:8px 0 0;">ONE SUN · ONE ENERGY · ONE PLANET</p>
    </div>

    <!-- Order Confirmation -->
    <div style="padding:40px 0;text-align:center;">
      <div style="font-size:48px;margin-bottom:16px;">☀</div>
      <h2 style="color:#fff;font-size:24px;font-weight:800;letter-spacing:2px;margin:0;">ORDER CONFIRMED</h2>
      <p style="color:#C9A84C;font-size:14px;letter-spacing:2px;margin:12px 0 0;">${orderNumber}</p>
    </div>

    <!-- Items Table -->
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      <thead>
        <tr style="border-bottom:2px solid #333;">
          <th style="padding:12px;text-align:left;color:#666;font-size:11px;letter-spacing:1px;">ITEM</th>
          <th style="padding:12px;text-align:left;color:#666;font-size:11px;letter-spacing:1px;">SIZE</th>
          <th style="padding:12px;text-align:center;color:#666;font-size:11px;letter-spacing:1px;">QTY</th>
          <th style="padding:12px;text-align:right;color:#666;font-size:11px;letter-spacing:1px;">PRICE</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>

    <!-- Total -->
    <div style="border-top:2px solid #333;padding:20px 0;display:flex;justify-content:space-between;">
      <span style="color:#888;font-size:14px;font-weight:700;letter-spacing:1px;">TOTAL</span>
      <span style="color:#fff;font-size:20px;font-weight:800;">$${(total / 100).toFixed(2)}</span>
    </div>

    <!-- Shipping Info -->
    <div style="background:#111;border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
      <p style="color:#4CAF50;font-size:13px;font-weight:700;letter-spacing:1px;margin:0;">🚚 FREE WORLDWIDE SHIPPING</p>
      <p style="color:#666;font-size:12px;margin:8px 0 0;">Ships within 1 month · Tracking provided</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:32px 0;">
      <p style="color:#888;font-size:14px;line-height:1.8;margin:0;">
        Thank you for being part of the light.<br/>
        We'll send you tracking details when your order ships.
      </p>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #222;padding:32px 0;text-align:center;">
      <p style="color:#333;font-size:11px;letter-spacing:3px;margin:0;">SVET</p>
      <p style="color:#444;font-size:10px;margin:8px 0 0;">
        <a href="https://svet.global" style="color:#666;text-decoration:none;">svet.global</a> ·
        <a href="https://svet.global/shop" style="color:#666;text-decoration:none;">Shop</a> ·
        <a href="https://svet.global/about" style="color:#666;text-decoration:none;">About</a>
      </p>
      <p style="color:#333;font-size:10px;margin:16px 0 0;">© ${new Date().getFullYear()} SVET. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, orderNumber, items, total } = body;

    if (!to || !orderNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const html = buildOrderHTML(orderNumber, items || [], total || 0);

    if (!RESEND_KEY) {
      // No email service — log and return success (Stripe still sends its own receipt)
      console.log(`[Email] Would send order confirmation to ${to} for ${orderNumber}`);
      return NextResponse.json({
        ok: true,
        demo: true,
        message: `Email logged. Set RESEND_API_KEY to send branded confirmations.`,
      });
    }

    // Send via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject: `☀ Order ${orderNumber} Confirmed — SVET`,
        html,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('[Email] Resend error:', result);
      return NextResponse.json({ ok: false, error: result }, { status: 500 });
    }

    console.log(`[Email] Order confirmation sent to ${to}: ${result.id}`);
    return NextResponse.json({ ok: true, id: result.id });

  } catch (err: any) {
    console.error('[Email] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
