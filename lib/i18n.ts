/* ════════════════════════════════════════════════
   SVET i18n — Auto Language Detection + Translations
   EN default, RU for Russia/CIS countries
   ════════════════════════════════════════════════ */

export type Locale = 'en' | 'ru';

const CIS_COUNTRIES = [
  'RU', 'BY', 'KZ', 'UA', 'UZ', 'KG', 'TJ', 'TM', 'AZ', 'AM', 'MD', 'GE',
];

/**
 * Detect locale from browser/navigator.
 * Returns 'ru' if user's timezone or language suggests Russia/CIS.
 */
export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  // Check navigator language first
  const lang = navigator.language || (navigator as any).userLanguage || '';
  if (lang.startsWith('ru')) return 'ru';

  // Check timezone for Russia/CIS
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (
      tz.startsWith('Europe/Moscow') ||
      tz.startsWith('Europe/Minsk') ||
      tz.startsWith('Asia/Almaty') ||
      tz.startsWith('Asia/Tashkent') ||
      tz.startsWith('Asia/Yekaterinburg') ||
      tz.startsWith('Europe/Kiev') ||
      tz.startsWith('Europe/Kyiv') ||
      tz.includes('Russia') ||
      tz.includes('Volgograd') ||
      tz.includes('Samara') ||
      tz.includes('Novosibirsk') ||
      tz.includes('Krasnoyarsk') ||
      tz.includes('Irkutsk') ||
      tz.includes('Vladivostok') ||
      tz.includes('Kamchatka') ||
      tz.includes('Baku') ||
      tz.includes('Tbilisi') ||
      tz.includes('Yerevan') ||
      tz.includes('Bishkek') ||
      tz.includes('Dushanbe') ||
      tz.includes('Ashgabat') ||
      tz.includes('Chisinau')
    ) {
      return 'ru';
    }
  } catch { /* ignore */ }

  return 'en';
}

/* ── Translation dictionaries ── */

const translations = {
  en: {
    // Nav
    'nav.shop': 'Shop',
    'nav.pricing': 'Pricing',
    'nav.community': 'Community',
    'nav.philosophy': 'Philosophy',
    'nav.cart': 'Cart',
    'nav.signin': 'Sign in',
    'nav.myaccount': 'MY ACCOUNT →',

    // Shop
    'shop.title': 'SHOP',
    'shop.label': 'Pre-Order Collection',
    'shop.desc': 'Every piece carries a message. Pre-order now at exclusive prices.',
    'shop.banner': '🔥 PRE-ORDER — Order now, ships within 1 month. Free worldwide shipping on orders $100+',
    'shop.size': 'Size',
    'shop.addToCart': 'Add to Cart',
    'shop.added': '✓ Added!',
    'shop.preorder': 'PRE-ORDER',
    'shop.shipping': '🌍 Worldwide Shipping',
    'shop.bestValue': 'BEST VALUE',

    // Pricing
    'pricing.title': 'CHOOSE YOUR PLAN',
    'pricing.label': 'AI Subscriptions',
    'pricing.desc': 'AI-powered personal assistant. Build, create, and launch with SVET.',
    'pricing.banner': '🎁 Buy $100+ of SVET clothing → get 24h Starter FREE',
    'pricing.popular': 'MOST POPULAR',
    'pricing.get': 'Get',
    'pricing.freeTitle': 'FREE 24h Starter Access',
    'pricing.freeDesc': 'Spend $100+ on SVET clothing and unlock 24 hours of Starter AI for free. No credit card needed for the trial.',
    'pricing.shopNow': 'Shop Now →',
    'pricing.paymentTitle': 'Payment Methods',

    // Starter features
    'plan.starter.f1': 'Personal AI assistant',
    'plan.starter.f2': 'Chat & task management',
    'plan.starter.f3': 'Basic integrations',
    'plan.starter.f4': '24h FREE with $100+ clothing order',
    // Builder features
    'plan.builder.f1': 'Full AI capabilities',
    'plan.builder.f2': 'Build, create, launch projects',
    'plan.builder.f3': 'Advanced integrations',
    'plan.builder.f4': 'Priority support',
    'plan.builder.f5': 'Custom workflows',
    // Ultra features
    'plan.ultra.f1': 'Personal AI + self-hostable',
    'plan.ultra.f2': 'Transfer to your own server',
    'plan.ultra.f3': 'Full source access',
    'plan.ultra.f4': 'Unlimited usage',
    'plan.ultra.f5': 'White-label ready',
    // Business features
    'plan.business.f1': 'Enterprise-grade AI',
    'plan.business.f2': 'Team collaboration',
    'plan.business.f3': 'Custom integrations',
    'plan.business.f4': 'Dedicated support',
    'plan.business.f5': 'SSO & admin controls',
    'plan.business.f6': 'SLA guarantee',

    // Products
    'product.tshirt-black': 'SVET T-Shirt Black',
    'product.tshirt-black.desc': 'Oversized boxy fit, bubble "sVet™" logo in red/orange, 100% cotton',
    'product.tshirt-yellow': 'SVET T-Shirt Yellow',
    'product.tshirt-yellow.desc': 'Color-block mustard/cream, serif logo, red seam piping',
    'product.tshirt-grey': 'SVET T-Shirt Grey',
    'product.tshirt-grey.desc': 'Heather grey, minimal red logo',
    'product.longsleeve-yellow': 'SVET Long Sleeve Yellow',
    'product.longsleeve-yellow.desc': 'Butter yellow, red logo left chest, red piping',
    'product.sweatshirt-cropped': 'SVET Sweatshirt Cropped',
    'product.sweatshirt-cropped.desc': 'Butter yellow, cropped fit, ribbed cuffs',
    'product.sweatshirt-relaxed': 'SVET Sweatshirt Relaxed',
    'product.sweatshirt-relaxed.desc': 'Butter yellow, oversized fit, V-neckline',
    'product.sweatshirt-vintage': 'SVET Sweatshirt Vintage',
    'product.sweatshirt-vintage.desc': 'Distressed golden wash, vintage feel',
    'product.hoodie-bubble': 'SVET Hoodie Bubble',
    'product.hoodie-bubble.desc': 'Dark navy, bubble logo, kangaroo pocket',
    'product.hoodie-serif': 'SVET Hoodie Serif',
    'product.hoodie-serif.desc': 'Dark navy, clean serif logo, minimal',
    'product.pants-bubble': 'SVET Wide-Leg Pants Bubble',
    'product.pants-bubble.desc': 'Dark navy, bubble logo on thigh',
    'product.pants-serif': 'SVET Wide-Leg Pants Serif',
    'product.pants-serif.desc': 'Dark navy, serif logo',
    'product.set-hoodie-pants': 'SVET Set (Hoodie + Pants)',
    'product.set-hoodie-pants.desc': 'Full matching set, choice of logo style',
    'product.cap': 'SVET Cap',
    'product.cap.desc': 'Dark navy, 3D rubber bubble logo patch',

    // Footer
    'footer.tagline': 'One Sun · One Energy · One Planet · For Everyone',
    'footer.oneAccount': 'One account. All of SVET.',
    'footer.rights': 'All rights reserved.',

    // Homepage
    'home.badge': 'ONE SUN · ONE ENERGY · ONE PLANET',
    'home.tagline': 'Not a trend. A way of life.',
    'home.tagline2': 'Clothing that connects us all.',
    'home.cta': 'Discover SVET',
    'home.scroll': 'SCROLL',
  },

  ru: {
    // Nav
    'nav.shop': 'Магазин',
    'nav.pricing': 'Цены',
    'nav.community': 'Сообщество',
    'nav.philosophy': 'Философия',
    'nav.cart': 'Корзина',
    'nav.signin': 'Войти',
    'nav.myaccount': 'МОЙ АККАУНТ →',

    // Shop
    'shop.title': 'МАГАЗИН',
    'shop.label': 'Коллекция предзаказа',
    'shop.desc': 'Каждая вещь несёт послание. Закажи сейчас по эксклюзивной цене.',
    'shop.banner': '🔥 ПРЕДЗАКАЗ — Закажи сейчас, доставка в течение 1 месяца. Бесплатная доставка по всему миру от $100+',
    'shop.size': 'Размер',
    'shop.addToCart': 'В корзину',
    'shop.added': '✓ Добавлено!',
    'shop.preorder': 'ПРЕДЗАКАЗ',
    'shop.shipping': '🌍 Доставка по всему миру',
    'shop.bestValue': 'ЛУЧШАЯ ЦЕНА',

    // Pricing
    'pricing.title': 'ВЫБЕРИТЕ ПЛАН',
    'pricing.label': 'AI Подписки',
    'pricing.desc': 'Персональный AI-помощник. Создавай, запускай и развивай проекты со SVET.',
    'pricing.banner': '🎁 Купи одежды SVET на $100+ → получи 24ч Starter БЕСПЛАТНО',
    'pricing.popular': 'САМЫЙ ПОПУЛЯРНЫЙ',
    'pricing.get': 'Выбрать',
    'pricing.freeTitle': 'БЕСПЛАТНЫЙ 24ч доступ Starter',
    'pricing.freeDesc': 'Потрать $100+ на одежду SVET и получи 24 часа Starter AI бесплатно. Карта не нужна.',
    'pricing.shopNow': 'В магазин →',
    'pricing.paymentTitle': 'Способы оплаты',

    // Starter features
    'plan.starter.f1': 'Персональный AI ассистент',
    'plan.starter.f2': 'Чат и управление задачами',
    'plan.starter.f3': 'Базовые интеграции',
    'plan.starter.f4': '24ч БЕСПЛАТНО при заказе от $100+',
    // Builder features
    'plan.builder.f1': 'Полные возможности AI',
    'plan.builder.f2': 'Создавай, стройте, запускайте проекты',
    'plan.builder.f3': 'Продвинутые интеграции',
    'plan.builder.f4': 'Приоритетная поддержка',
    'plan.builder.f5': 'Кастомные рабочие процессы',
    // Ultra features
    'plan.ultra.f1': 'Персональный AI + свой сервер',
    'plan.ultra.f2': 'Перенос на свой сервер',
    'plan.ultra.f3': 'Полный доступ к исходникам',
    'plan.ultra.f4': 'Безлимитное использование',
    'plan.ultra.f5': 'White-label готов',
    // Business features
    'plan.business.f1': 'Корпоративный AI',
    'plan.business.f2': 'Командная работа',
    'plan.business.f3': 'Кастомные интеграции',
    'plan.business.f4': 'Выделенная поддержка',
    'plan.business.f5': 'SSO и админ-панель',
    'plan.business.f6': 'Гарантия SLA',

    // Products
    'product.tshirt-black': 'SVET Футболка Чёрная',
    'product.tshirt-black.desc': 'Оверсайз крой, объёмный логотип "sVet™" красный/оранжевый, 100% хлопок',
    'product.tshirt-yellow': 'SVET Футболка Жёлтая',
    'product.tshirt-yellow.desc': 'Колор-блок горчичный/кремовый, шрифтовой логотип, красная окантовка',
    'product.tshirt-grey': 'SVET Футболка Серая',
    'product.tshirt-grey.desc': 'Меланж серый, минимальный красный логотип',
    'product.longsleeve-yellow': 'SVET Лонгслив Жёлтый',
    'product.longsleeve-yellow.desc': 'Масляно-жёлтый, красный логотип на груди, красная окантовка',
    'product.sweatshirt-cropped': 'SVET Свитшот Укороченный',
    'product.sweatshirt-cropped.desc': 'Масляно-жёлтый, укороченный крой, резинки на манжетах',
    'product.sweatshirt-relaxed': 'SVET Свитшот Свободный',
    'product.sweatshirt-relaxed.desc': 'Масляно-жёлтый, оверсайз, V-образный вырез',
    'product.sweatshirt-vintage': 'SVET Свитшот Винтаж',
    'product.sweatshirt-vintage.desc': 'Потёрный золотистый, винтажный стиль',
    'product.hoodie-bubble': 'SVET Худи Объёмный',
    'product.hoodie-bubble.desc': 'Тёмно-синий, объёмный логотип, карман-кенгуру',
    'product.hoodie-serif': 'SVET Худи Шрифтовой',
    'product.hoodie-serif.desc': 'Тёмно-синий, шрифтовой логотип, минимальный',
    'product.pants-bubble': 'SVET Брюки Широкие Объёмные',
    'product.pants-bubble.desc': 'Тёмно-синий, объёмный логотип на бедре',
    'product.pants-serif': 'SVET Брюки Широкие Шрифтовые',
    'product.pants-serif.desc': 'Тёмно-синий, шрифтовой логотип',
    'product.set-hoodie-pants': 'SVET Комплект (Худи + Брюки)',
    'product.set-hoodie-pants.desc': 'Полный комплект, выбор стиля логотипа',
    'product.cap': 'SVET Кепка',
    'product.cap.desc': 'Тёмно-синий, 3D резиновый объёмный логотип',

    // Footer
    'footer.tagline': 'Одно Солнце · Одна Энергия · Одна Планета · Для Всех',
    'footer.oneAccount': 'Один аккаунт. Весь SVET.',
    'footer.rights': 'Все права защищены.',

    // Homepage
    'home.badge': 'ОДНО СОЛНЦЕ · ОДНА ЭНЕРГИЯ · ОДНА ПЛАНЕТА',
    'home.tagline': 'Не тренд. Образ жизни.',
    'home.tagline2': 'Одежда, которая объединяет.',
    'home.cta': 'Открыть SVET',
    'home.scroll': 'ЛИСТАЙ',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

export { translations };
