import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminStats, ADMIN_ID, BOT_TOKEN, TELEGRAM_API } from '@/lib/telegram-bot';

/* ════════════════════════════════════════════════
   Telegram Bot Admin API — GET /api/telegram/admin
   Protected: requires admin secret token
   Returns anonymized user stats
   ════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  // Simple auth check — admin secret from env
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.TELEGRAM_ADMIN_SECRET || 'svet-admin-2024';

  if (authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const stats = getAdminStats();

  return NextResponse.json({
    ok: true,
    stats: {
      ...stats,
      botActive: !!BOT_TOKEN,
      webhookUrl: BOT_TOKEN
        ? `${process.env.NEXT_PUBLIC_URL || 'https://svet.global'}/api/telegram/webhook`
        : null,
    },
  });
}

// POST — set webhook (admin only)
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.TELEGRAM_ADMIN_SECRET || 'svet-admin-2024';

  if (authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!BOT_TOKEN) {
    return NextResponse.json(
      { ok: false, error: 'TELEGRAM_BOT_TOKEN not configured' },
      { status: 400 }
    );
  }

  const webhookUrl = `${process.env.NEXT_PUBLIC_URL || 'https://svet.global'}/api/telegram/webhook`;

  // Set webhook with Telegram
  const result = await fetch(`${TELEGRAM_API}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: webhookUrl,
      allowed_updates: ['message', 'callback_query'],
      drop_pending_updates: true,
    }),
  });

  const data = await result.json();

  // Set bot commands
  await fetch(`${TELEGRAM_API}/setMyCommands`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      commands: [
        { command: 'start', description: 'Welcome + status' },
        { command: 'chain', description: 'Your earned symbols' },
        { command: 'subscription', description: 'Plan info' },
        { command: 'help', description: 'Support & commands' },
        { command: 'delete', description: 'Erase all my data' },
      ],
    }),
  });

  return NextResponse.json({
    ok: true,
    webhook: webhookUrl,
    telegramResponse: data,
  });
}
