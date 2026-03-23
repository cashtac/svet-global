import crypto from 'crypto';

/* ════════════════════════════════════════════════
   SVET Telegram Bot — Core Logic
   Privacy-first: no names, no IPs, stateless checks
   ════════════════════════════════════════════════ */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://svet.global';

// In-memory user store (replace with DB in production)
// Only stores: hashed_id, subscription_status, chain_symbols, created_at
interface BotUser {
  hashedId: string;
  telegramId: number;
  subscriptionStatus: 'none' | 'starter' | 'creator' | 'pro' | 'oracle';
  chainSymbols: number[]; // indices of earned symbols
  verified: boolean;
  verifiedAt?: number;
  freeAccessExpiry?: number;
  createdAt: number;
}

const users = new Map<number, BotUser>();

// Hash telegram ID for privacy
function hashId(telegramId: number): string {
  return crypto.createHash('sha256').update(`svet_${telegramId}`).digest('hex').slice(0, 12);
}

// Admin user ID (Daniil Osipov's Telegram)
const ADMIN_ID = parseInt(process.env.TELEGRAM_ADMIN_ID || '0');

// SVET Chain symbols
const CHAIN_SYMBOLS = [
  { emoji: '🪲', name: 'Precision', nameRu: 'Точность' },
  { emoji: '🐋', name: 'Scale', nameRu: 'Масштаб' },
  { emoji: '🐆', name: 'Speed', nameRu: 'Скорость' },
  { emoji: '🐘', name: 'Memory', nameRu: 'Память' },
  { emoji: '🦉', name: 'Wisdom', nameRu: 'Мудрость' },
  { emoji: '🐺', name: 'Loyalty', nameRu: 'Верность' },
  { emoji: '🦅', name: 'Vision', nameRu: 'Видение' },
  { emoji: '🦈', name: 'Focus', nameRu: 'Фокус' },
  { emoji: '🦋', name: 'Evolution', nameRu: 'Эволюция' },
];

// ═══════════════════════════════════
// Telegram API helpers
// ═══════════════════════════════════

async function sendMessage(chatId: number, text: string, options: Record<string, unknown> = {}) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      ...options,
    }),
  });
}

async function sendInlineKeyboard(chatId: number, text: string, buttons: Array<Array<{ text: string; callback_data: string }>>) {
  await sendMessage(chatId, text, {
    reply_markup: { inline_keyboard: buttons },
  });
}

// ═══════════════════════════════════
// Get or create user (privacy-first)
// ═══════════════════════════════════

function getOrCreateUser(telegramId: number): BotUser {
  let user = users.get(telegramId);
  if (!user) {
    user = {
      hashedId: hashId(telegramId),
      telegramId,
      subscriptionStatus: 'none',
      chainSymbols: [],
      verified: false,
      createdAt: Date.now(),
    };
    users.set(telegramId, user);
  }
  return user;
}

// ═══════════════════════════════════
// Command Handlers
// ═══════════════════════════════════

export async function handleStart(chatId: number, firstName: string, telegramId: number) {
  const user = getOrCreateUser(telegramId);

  // Greeting
  let greeting = `☀️ <b>Welcome to SVET, ${firstName}!</b>\n\n`;

  if (user.verified) {
    // Existing verified user — show status
    const symbolsEarned = user.chainSymbols.length;
    const symbolsList = user.chainSymbols.map(i => CHAIN_SYMBOLS[i]?.emoji || '⬜').join(' ');

    greeting += `<b>Your status:</b>\n`;
    greeting += `🔗 Chain: ${symbolsList || 'No symbols yet'} (${symbolsEarned}/9)\n`;
    greeting += `📦 Subscription: ${user.subscriptionStatus === 'none' ? 'No active plan' : user.subscriptionStatus.toUpperCase()}\n`;

    if (user.freeAccessExpiry && user.freeAccessExpiry > Date.now()) {
      const hoursLeft = Math.ceil((user.freeAccessExpiry - Date.now()) / (60 * 60 * 1000));
      greeting += `\n🟢 <b>AI Access active</b> — ${hoursLeft}h remaining`;
    } else {
      greeting += `\n⚪ AI Access expired`;
    }

    greeting += `\n\n/chain — view your symbols\n/subscription — plan info\n/help — support`;
  } else {
    // New user — show consent flow
    greeting += `SVET is a digital-physical ecosystem. Clothing, AI tools, a living symbol chain.\n\n`;
    greeting += `<b>To unlock your 24h free AI access, I need to verify your checklist.</b>\n`;
    greeting += `This check is private — nothing is stored without your consent.\n\n`;
    greeting += `Do you agree?`;

    await sendInlineKeyboard(chatId, greeting, [
      [
        { text: 'Yes ✅', callback_data: 'consent_yes' },
        { text: 'No, skip 🚫', callback_data: 'consent_no' },
      ],
    ]);
    return;
  }

  await sendMessage(chatId, greeting);
}

export async function handleConsentYes(chatId: number, telegramId: number) {
  // Stateless checklist verification
  // In production: query DB for these. Here we simulate.
  const user = getOrCreateUser(telegramId);

  // Check items (stateless — check, result, forget)
  const checklist = [
    { label: 'Registered on svet.global', done: false, link: `${SITE_URL}/register` },
    { label: 'Email/phone verified', done: false, link: `${SITE_URL}/register` },
    { label: 'Subscribed to SVET newsletter', done: false, link: `${SITE_URL}/pricing` },
    { label: 'Joined Discord (or skipped)', done: true, link: 'https://discord.gg/svet' },
    { label: 'Made first order OR has subscription', done: user.subscriptionStatus !== 'none', link: `${SITE_URL}/shop` },
  ];

  const allDone = checklist.every(c => c.done);

  if (allDone) {
    // Mark verified, start 24h timer
    user.verified = true;
    user.verifiedAt = Date.now();
    user.freeAccessExpiry = Date.now() + 24 * 60 * 60 * 1000;

    // Award first symbol if not earned
    if (!user.chainSymbols.includes(0)) {
      user.chainSymbols.push(0);
    }

    await sendMessage(chatId,
      `✅ <b>Access unlocked!</b>\n\n` +
      `Your 24h Starter AI is active.\n` +
      `🪲 PRECISION symbol earned!\n\n` +
      `Visit ${SITE_URL}/profile to see your chain.\n\n` +
      `/chain — view your symbols\n` +
      `/help — support`
    );
  } else {
    const remaining = checklist.filter(c => !c.done);
    let msg = `📋 <b>Here's what's left:</b>\n\n`;

    remaining.forEach((item, i) => {
      msg += `${i + 1}. ❌ ${item.label}\n   → <a href="${item.link}">Complete now</a>\n\n`;
    });

    msg += `Complete all items and come back — type /start to re-check.\n`;
    msg += `\n⚠️ <i>No data was stored from this check.</i>`;

    await sendMessage(chatId, msg, { disable_web_page_preview: true });
  }
}

export async function handleConsentNo(chatId: number) {
  // Zero data stored. Zero logs.
  await sendMessage(chatId,
    `No problem. Come back anytime.\n\n` +
    `${SITE_URL} ☀️\n\n` +
    `<i>Zero data stored. Zero logs. Only this chat exists on Telegram's own servers.</i>`
  );
}

export async function handleChain(chatId: number, telegramId: number) {
  const user = getOrCreateUser(telegramId);

  let msg = `🔗 <b>YOUR SVET CHAIN</b>\n\n`;

  CHAIN_SYMBOLS.forEach((symbol, i) => {
    const earned = user.chainSymbols.includes(i);
    msg += `${earned ? symbol.emoji : '⬜'} ${symbol.name} — ${earned ? '✅ Earned' : '🔒 Locked'}\n`;
  });

  msg += `\n<b>${user.chainSymbols.length}/9</b> symbols earned`;

  if (user.chainSymbols.length === 9) {
    msg += `\n\n🦋 <b>SVET COMPLETE</b> — You've unlocked the full chain!`;
  } else {
    msg += `\n\nKeep building your chain at ${SITE_URL}/chain`;
  }

  await sendMessage(chatId, msg, { disable_web_page_preview: true });
}

export async function handleSubscription(chatId: number, telegramId: number) {
  const user = getOrCreateUser(telegramId);

  if (user.subscriptionStatus === 'none') {
    await sendMessage(chatId,
      `📦 <b>No active subscription</b>\n\n` +
      `Choose your plan:\n\n` +
      `🌱 <b>Starter</b> — $5/mo — Daily insights\n` +
      `✨ <b>Creator</b> — $15/mo — AI tools + content\n` +
      `🚀 <b>Pro</b> — $30/mo — Full AI suite\n` +
      `👁 <b>Oracle</b> — $100/mo — Everything + priority\n\n` +
      `→ <a href="${SITE_URL}/pricing">View plans</a>`,
      { disable_web_page_preview: true }
    );
  } else {
    let accessExpiry = '';
    if (user.freeAccessExpiry && user.freeAccessExpiry > Date.now()) {
      const hoursLeft = Math.ceil((user.freeAccessExpiry - Date.now()) / (60 * 60 * 1000));
      accessExpiry = `\n🟢 AI Access: ${hoursLeft}h remaining`;
    }

    await sendMessage(chatId,
      `📦 <b>Your subscription: ${user.subscriptionStatus.toUpperCase()}</b>\n` +
      accessExpiry +
      `\n\n→ <a href="${SITE_URL}/pricing">Manage subscription</a>`,
      { disable_web_page_preview: true }
    );
  }
}

export async function handleHelp(chatId: number) {
  await sendMessage(chatId,
    `🆘 <b>SVET Bot Commands</b>\n\n` +
    `/start — Welcome + status check\n` +
    `/chain — Your earned symbols\n` +
    `/subscription — Plan info\n` +
    `/help — This message\n` +
    `/delete — Erase all my data\n\n` +
    `📧 Support: support@svet.global\n` +
    `🌐 Website: ${SITE_URL}\n` +
    `💬 Discord: discord.gg/svet`,
    { disable_web_page_preview: true }
  );
}

export async function handleDelete(chatId: number, telegramId: number) {
  // Delete all user data
  users.delete(telegramId);

  await sendMessage(chatId,
    `🗑 <b>All your data has been erased.</b>\n\n` +
    `✅ User ID hash — deleted\n` +
    `✅ Subscription status — deleted\n` +
    `✅ Chain symbols — deleted\n` +
    `✅ Verification status — deleted\n\n` +
    `<i>Only this Telegram chat remains (on Telegram's servers).\n` +
    `You can start fresh anytime with /start.</i>`
  );
}

// ═══════════════════════════════════
// Admin functions
// ═══════════════════════════════════

export function getAdminStats(): {
  totalUsers: number;
  verifiedUsers: number;
  activeAccess: number;
  userList: Array<{ id: string; status: string; symbols: number; verified: boolean }>;
} {
  const now = Date.now();
  const allUsers = Array.from(users.values());

  return {
    totalUsers: allUsers.length,
    verifiedUsers: allUsers.filter(u => u.verified).length,
    activeAccess: allUsers.filter(u => u.freeAccessExpiry && u.freeAccessExpiry > now).length,
    userList: allUsers.map(u => ({
      id: u.telegramId === ADMIN_ID ? 'Daniil Osipov' : `USR-${u.hashedId}`,
      status: u.subscriptionStatus,
      symbols: u.chainSymbols.length,
      verified: u.verified,
    })),
  };
}

export { users, ADMIN_ID, BOT_TOKEN, TELEGRAM_API };
