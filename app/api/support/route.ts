import { NextRequest, NextResponse } from 'next/server';

/* ════════════════════════════════════════════════
   Support Contact — POST /api/support
   → Notifies admin on Telegram
   → Sends auto-reply email to customer
   ════════════════════════════════════════════════ */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const ADMIN_CHAT_ID = 339073973;
const RESEND_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'SVET Support <onboarding@resend.dev>';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, orderNumber, message } = body;

    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message required' }, { status: 400 });
    }

    // ═══ NOTIFY ADMIN ON TELEGRAM ═══
    const telegramMsg = [
      '💬 <b>SUPPORT MESSAGE</b>',
      '',
      `👤 Name: ${name || 'Not provided'}`,
      `📧 Email: ${email}`,
      orderNumber ? `📋 Order: ${orderNumber}` : '',
      '',
      `<b>Message:</b>`,
      message,
      '',
      `🕐 ${new Date().toISOString()}`,
    ].filter(Boolean).join('\n');

    if (TELEGRAM_BOT_TOKEN) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: telegramMsg, parse_mode: 'HTML' }),
      });
    }
    console.log('[Support]', telegramMsg);

    // ═══ SEND AUTO-REPLY EMAIL ═══
    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [email],
          subject: '☀ We received your message — SVET Support',
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;padding:32px 0;border-bottom:1px solid #222;">
      <h1 style="color:#fff;font-size:28px;letter-spacing:10px;margin:0;">SVET</h1>
    </div>
    <div style="padding:40px 0;text-align:center;">
      <div style="font-size:36px;margin-bottom:16px;">💬</div>
      <h2 style="color:#fff;font-size:20px;font-weight:700;margin:0;">We got your message!</h2>
      <p style="color:#888;font-size:14px;line-height:1.8;margin:20px 0 0;">
        Hi ${name || 'there'},<br/><br/>
        Thank you for reaching out. We've received your message and will get back to you within 24 hours.<br/><br/>
        ${orderNumber ? `Your order reference: <strong style="color:#C9A84C;">${orderNumber}</strong><br/><br/>` : ''}
        In the meantime, feel free to check our <a href="https://svet.global/support" style="color:#C9A84C;">FAQ page</a> for quick answers.
      </p>
    </div>
    <div style="border-top:1px solid #222;padding:24px 0;text-align:center;">
      <p style="color:#333;font-size:10px;letter-spacing:2px;">© ${new Date().getFullYear()} SVET</p>
    </div>
  </div>
</body>
</html>`,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[Support] Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
