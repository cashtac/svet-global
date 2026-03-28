import { NextRequest, NextResponse } from 'next/server';

/* ═══════════════════════════════════════════════════
   SVET SUPPORT AGENT — AI Agent #1
   POST /api/agents/support
   
   Handles customer questions about products, pricing,
   shipping, subscriptions, and general platform info.
   Responds in the user's language (en/ru/de/pt/ar/tr/zh).
   ═══════════════════════════════════════════════════ */

const SYSTEM_PROMPT = `You are SVET Support — the AI assistant for svet.global, a philosophy-driven clothing brand.

CORE IDENTITY:
- SVET means "light" (and "world") in Slavic languages
- Philosophy: One Sun, One Energy, One Planet — For Everyone
- Not a hype brand. A belief that everything is interconnected.

PRODUCTS & PRICING:
- All items are PRE-ORDER (shipping starts soon)
- Product categories: Hoodies ($69 pre-order / $95 retail), T-Shirts ($35-45), Sets ($125-180), Accessories ($25-45)
- Materials: Premium 100% Cotton, French Terry 400gsm for hoodies
- Sizes: S/M, L/XL (unisex/oversized fit)
- Colors: varies by product (yellows, blacks, navys, greens)
- Worldwide shipping included
- Pre-order saves 25-30% vs retail price

AI SUBSCRIPTIONS:
- Essential: $23/mo — Personal AI assistant, 200 tasks/month
- Professional: $43/mo — Advanced AI, unlimited tasks, voice mode
- Business: $193/mo — Team AI, API access, dedicated support, SLA
- Special promo: Buy $100+ clothing → get 24h AI access FREE

ENGAGEMENT SYSTEM:
- ☀ Connection Tokens: earned by purchasing (1 per $1), sharing, referring friends, joining Discord
- Levels: 🌱 Seedling (0-99 ☀) → ⚡ Energized (100-499 ☀) → 🔥 Radiant (500-999 ☀) → 💎 Luminary (1000+ ☀)
- Chain System: 9 symbolic animals (🪲🐝☀️🦅🐋🐆🐻🌿🦁) earned through purchases

SHIPPING & RETURNS:
- Worldwide shipping included in price
- Pre-orders ship when collection is ready (estimated 2-4 weeks)
- 30-day return policy for unused items with tags
- Contact support@svet.global for issues

RULES:
- Be concise, warm, and authentic. Not corporate.
- Match the vibe: philosophical but practical.
- If you don't know something, say so honestly.
- Never invent discount codes or promotions not listed above.
- Respond in the same language as the user's message or the specified lang parameter.
`;

// Language-specific greetings for when the agent needs to be welcoming
const GREETINGS: Record<string, string> = {
  en: 'Hey! How can I help you today?',
  ru: 'Привет! Как могу помочь?',
  de: 'Hey! Wie kann ich dir helfen?',
  pt: 'Oi! Como posso ajudar?',
  ar: 'أهلاً! كيف أقدر أساعدك؟',
  tr: 'Selam! Nasıl yardımcı olabilirim?',
  zh: '你好！有什么我可以帮你的？',
};

// Simple keyword-based response engine (no external AI dependency)
// In production, replace with OpenAI/Anthropic API call
function generateResponse(message: string, lang: string): string {
  const msg = message.toLowerCase();

  // Shipping questions
  if (msg.includes('ship') || msg.includes('deliver') || msg.includes('доставк') || msg.includes('Lieferung') || msg.includes('versand')) {
    const responses: Record<string, string> = {
      en: 'Worldwide shipping is included in every order! 🌍 Pre-orders ship within 2-4 weeks as the collection is being finalized. You\'ll get a tracking number once shipped.',
      ru: 'Доставка по всему миру включена в каждый заказ! 🌍 Предзаказы отправляются в течение 2-4 недель. Трек-номер придёт как только отправим.',
      de: 'Weltweiter Versand ist in jeder Bestellung enthalten! 🌍 Vorbestellungen werden innerhalb von 2-4 Wochen versendet.',
      pt: 'Frete mundial incluso em cada pedido! 🌍 Pré-encomendas enviam em 2-4 semanas.',
      ar: 'الشحن لكل العالم مجاني! 🌍 الطلبات المسبقة بتتشحن في خلال 2-4 أسابيع.',
      tr: 'Dünya geneli ücretsiz kargo dahil! 🌍 Ön siparişler 2-4 hafta içinde gönderilir.',
      zh: '全球运费已包含！🌍 预售商品将在2-4周内发货。',
    };
    return responses[lang] || responses.en;
  }

  // Pricing / cost questions
  if (msg.includes('price') || msg.includes('cost') || msg.includes('цен') || msg.includes('стоим') || msg.includes('сколько') || msg.includes('preis') || msg.includes('preço')) {
    const responses: Record<string, string> = {
      en: 'Pre-order prices save 25-30%! Hoodies: $69 (retail $95), T-Shirts: $35-45, Sets: $125-180, Accessories: $25-45. All include worldwide shipping. Check svet.global/shop for the full catalog ☀',
      ru: 'Предзаказ экономит 25-30%! Худи: $69 (розница $95), Футболки: $35-45, Сеты: $125-180, Аксессуары: $25-45. Доставка по миру включена. Каталог: svet.global/shop ☀',
      de: 'Vorbestellpreise sparen 25-30%! Hoodies: $69 (UVP $95), T-Shirts: $35-45, Sets: $125-180, Accessoires: $25-45. Weltweiter Versand inklusive. ☀',
      pt: 'Pré-venda economiza 25-30%! Hoodies: $69, T-Shirts: $35-45, Sets: $125-180, Acessórios: $25-45. Frete mundial incluso. ☀',
      ar: 'الطلب المسبق بيوفر 25-30%! هوديز: $69، تيشيرتات: $35-45، سيتات: $125-180. الشحن مجاني! ☀',
      tr: 'Ön sipariş %25-30 tasarruf! Hoodie: $69, T-Shirt: $35-45, Set: $125-180, Aksesuar: $25-45. ☀',
      zh: '预订省25-30%！卫衣：$69，T恤：$35-45，套装：$125-180，配饰：$25-45。全球包邮。☀',
    };
    return responses[lang] || responses.en;
  }

  // AI subscription
  if (msg.includes('ai') || msg.includes('subscri') || msg.includes('подписк') || msg.includes('abonnement')) {
    const responses: Record<string, string> = {
      en: 'SVET AI Plans:\n☀ Essential — $23/mo (200 tasks)\n☀ Professional — $43/mo (unlimited + voice)\n☀ Business — $193/mo (team + API)\n\n💡 Special: Buy $100+ clothing → get 24h AI access FREE!\n\nDetails at svet.global/pricing',
      ru: 'Планы SVET AI:\n☀ Essential — $23/мес (200 задач)\n☀ Professional — $43/мес (безлимит + голос)\n☀ Business — $193/мес (команда + API)\n\n💡 Акция: Купи одежду на $100+ → AI бесплатно на 24ч!\n\nДетали: svet.global/pricing',
      de: 'SVET AI Pläne:\n☀ Essential — $23/Mo (200 Aufgaben)\n☀ Professional — $43/Mo (unbegrenzt + Stimme)\n☀ Business — $193/Mo (Team + API)\n\nDetails: svet.global/pricing',
      pt: 'Planos SVET AI:\n☀ Essential — $23/mês (200 tarefas)\n☀ Professional — $43/mês (ilimitado + voz)\n☀ Business — $193/mês (equipe + API)\n\nDetalhes: svet.global/pricing',
      ar: 'خطط SVET AI:\n☀ Essential — $23/شهر\n☀ Professional — $43/شهر\n☀ Business — $193/شهر\n\nالتفاصيل: svet.global/pricing',
      tr: 'SVET AI Planları:\n☀ Essential — $23/ay\n☀ Professional — $43/ay\n☀ Business — $193/ay\n\nDetaylar: svet.global/pricing',
      zh: 'SVET AI方案：\n☀ Essential — $23/月\n☀ Professional — $43/月\n☀ Business — $193/月\n\n详情：svet.global/pricing',
    };
    return responses[lang] || responses.en;
  }

  // Return / refund
  if (msg.includes('return') || msg.includes('refund') || msg.includes('возврат') || msg.includes('rückgabe')) {
    const responses: Record<string, string> = {
      en: '30-day return policy for unused items with original tags. Contact support@svet.global and we\'ll help you right away. ☀',
      ru: 'Возврат в течение 30 дней для неношеных вещей с бирками. Пишите на support@svet.global — поможем сразу. ☀',
      de: '30 Tage Rückgaberecht für ungetragene Artikel. Kontakt: support@svet.global ☀',
    };
    return responses[lang] || responses.en;
  }

  // Size questions
  if (msg.includes('size') || msg.includes('fit') || msg.includes('размер') || msg.includes('größe')) {
    const responses: Record<string, string> = {
      en: 'Our sizing: S/M and L/XL — oversized/unisex fit. When in doubt, go with your usual size for an oversized look, or size down for a regular fit.',
      ru: 'Размеры: S/M и L/XL — оверсайз/унисекс посадка. Если сомневаешься — бери свой обычный для оверсайза, или на размер меньше для обычной посадки.',
      de: 'Unsere Größen: S/M und L/XL — Oversized/Unisex-Passform.',
    };
    return responses[lang] || responses.en;
  }

  // Tokens / levels
  if (msg.includes('token') || msg.includes('level') || msg.includes('токен') || msg.includes('уровень')) {
    const responses: Record<string, string> = {
      en: '☀ Connection Tokens — earn by:\n🛒 Buying (1 ☀ per $1)\n📸 Sharing on social\n👋 Referring friends\n💬 Joining Discord\n\nLevels: 🌱 Seedling → ⚡ Energized → 🔥 Radiant → 💎 Luminary',
      ru: '☀ Токены Связи — зарабатывай:\n🛒 Покупки (1 ☀ за $1)\n📸 Посты в соцсетях\n👋 Приглашение друзей\n💬 Discord\n\nУровни: 🌱 Росток → ⚡ Заряженный → 🔥 Сияющий → 💎 Светило',
    };
    return responses[lang] || responses.en;
  }

  // Default / general
  const defaults: Record<string, string> = {
    en: 'Thanks for reaching out! I\'m here to help with anything about SVET — products, pricing, shipping, sizing, or our AI platform. What would you like to know? ☀',
    ru: 'Спасибо за обращение! Я здесь чтобы помочь с любыми вопросами о SVET — товары, цены, доставка, размеры или AI платформа. Что хочешь узнать? ☀',
    de: 'Danke für deine Nachricht! Ich bin hier, um bei allem rund um SVET zu helfen. Was möchtest du wissen? ☀',
    pt: 'Obrigado por entrar em contato! Estou aqui para ajudar com tudo sobre SVET. O que gostaria de saber? ☀',
    ar: 'شكراً إنك تواصلت! أنا هنا عشان أساعدك في أي حاجة عن SVET. إيه اللي عايز تعرفه؟ ☀',
    tr: 'İletişime geçtiğin için teşekkürler! SVET hakkında her konuda yardımcı olmak için buradayım. ☀',
    zh: '感谢联系！我在这里帮助您解答有关SVET的任何问题。您想了解什么？☀',
  };
  return defaults[lang] || defaults.en;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, userId, lang = 'en' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required', agent: 'support' },
        { status: 400 }
      );
    }

    const normalizedLang = ['en', 'ru', 'de', 'pt', 'ar', 'tr', 'zh'].includes(lang) ? lang : 'en';
    const reply = generateResponse(message.trim(), normalizedLang);

    return NextResponse.json({
      reply,
      agent: 'support',
      lang: normalizedLang,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body', agent: 'support' },
      { status: 400 }
    );
  }
}
