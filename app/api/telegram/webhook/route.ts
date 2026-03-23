import { NextResponse } from 'next/server';
import {
  handleStart,
  handleConsentYes,
  handleConsentNo,
  handleChain,
  handleSubscription,
  handleHelp,
  handleDelete,
  BOT_TOKEN,
} from '@/lib/telegram-bot';

/* ════════════════════════════════════════════════
   Telegram Webhook — POST /api/telegram/webhook
   Receives Telegram updates, routes to handlers
   ════════════════════════════════════════════════ */

export async function POST(request: Request) {
  if (!BOT_TOKEN) {
    console.log('[Telegram Bot] No TELEGRAM_BOT_TOKEN set — ignoring webhook');
    return NextResponse.json({ ok: true });
  }

  try {
    const update = await request.json();

    // Handle regular messages (commands)
    if (update.message?.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      const firstName = update.message.from?.first_name || 'there';
      const telegramId = update.message.from?.id;

      if (!telegramId) return NextResponse.json({ ok: true });

      const command = text.split(' ')[0].split('@')[0].toLowerCase();

      switch (command) {
        case '/start':
          await handleStart(chatId, firstName, telegramId);
          break;
        case '/chain':
          await handleChain(chatId, telegramId);
          break;
        case '/subscription':
          await handleSubscription(chatId, telegramId);
          break;
        case '/help':
          await handleHelp(chatId);
          break;
        case '/delete':
          await handleDelete(chatId, telegramId);
          break;
        default:
          // Unknown command — show help
          if (text.startsWith('/')) {
            await handleHelp(chatId);
          }
          break;
      }
    }

    // Handle callback queries (inline button presses)
    if (update.callback_query) {
      const callbackData = update.callback_query.data;
      const chatId = update.callback_query.message?.chat?.id;
      const telegramId = update.callback_query.from?.id;

      if (!chatId || !telegramId) return NextResponse.json({ ok: true });

      // Answer callback to remove loading state
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: update.callback_query.id }),
      });

      switch (callbackData) {
        case 'consent_yes':
          await handleConsentYes(chatId, telegramId);
          break;
        case 'consent_no':
          await handleConsentNo(chatId);
          break;
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Telegram Bot] Webhook error:', err);
    return NextResponse.json({ ok: true }); // Always return 200 to Telegram
  }
}

// GET — webhook health check & setup info
export async function GET() {
  return NextResponse.json({
    ok: true,
    bot: 'SVET Telegram Bot',
    webhook: BOT_TOKEN ? 'configured' : 'no TELEGRAM_BOT_TOKEN set',
    setup: BOT_TOKEN
      ? 'Webhook is ready. Set it via: POST https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://svet.global/api/telegram/webhook'
      : 'Add TELEGRAM_BOT_TOKEN env var to Vercel, then set webhook URL.',
  });
}
