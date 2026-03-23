/* ════════════════════════════════════════════════
   SVET i18n — 5 Languages with Auto-Detection
   EN (default) | RU (Russia/CIS) | PT (Portuguese)
   DE (German) | AR-EG (Egyptian Arabic w/ slang)
   ════════════════════════════════════════════════ */

export type Locale = 'en' | 'ru' | 'pt' | 'de' | 'ar';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: '🇬🇧 English',
  ru: '🇷🇺 Русский',
  pt: '🇧🇷 Português',
  de: '🇩🇪 Deutsch',
  ar: '🇪🇬 عربي',
};

export const LOCALE_LIST: Locale[] = ['en', 'ru', 'pt', 'de', 'ar'];

/** RTL locales */
export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}

/**
 * Detect locale from browser/navigator.
 */
export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const lang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();

  // Arabic
  if (lang.startsWith('ar')) return 'ar';
  // Russian
  if (lang.startsWith('ru')) return 'ru';
  // Portuguese
  if (lang.startsWith('pt')) return 'pt';
  // German
  if (lang.startsWith('de')) return 'de';

  // Timezone fallback
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    // Egypt / Arabic
    if (tz.includes('Cairo') || tz.includes('Riyadh') || tz.includes('Dubai') ||
        tz.includes('Baghdad') || tz.includes('Amman') || tz.includes('Beirut') ||
        tz.includes('Kuwait') || tz.includes('Bahrain') || tz.includes('Qatar') ||
        tz.includes('Muscat')) return 'ar';

    // Russia/CIS
    if (tz.startsWith('Europe/Moscow') || tz.startsWith('Europe/Minsk') ||
        tz.startsWith('Asia/Almaty') || tz.startsWith('Asia/Tashkent') ||
        tz.includes('Yekaterinburg') || tz.startsWith('Europe/Kiev') ||
        tz.startsWith('Europe/Kyiv') || tz.includes('Russia') ||
        tz.includes('Volgograd') || tz.includes('Samara') ||
        tz.includes('Novosibirsk') || tz.includes('Krasnoyarsk') ||
        tz.includes('Irkutsk') || tz.includes('Vladivostok') ||
        tz.includes('Kamchatka') || tz.includes('Baku') ||
        tz.includes('Tbilisi') || tz.includes('Yerevan') ||
        tz.includes('Bishkek') || tz.includes('Dushanbe') ||
        tz.includes('Ashgabat') || tz.includes('Chisinau')) return 'ru';

    // Portugal / Brazil
    if (tz.includes('Lisbon') || tz.includes('Sao_Paulo') ||
        tz.includes('Brasilia') || tz.includes('Fortaleza') ||
        tz.includes('Recife') || tz.includes('Manaus') ||
        tz.includes('Belem') || tz.includes('Rio_Branco') ||
        tz.includes('Azores') || tz.includes('Madeira')) return 'pt';

    // Germany / Austria / Switzerland-DE
    if (tz.includes('Berlin') || tz.includes('Vienna') ||
        tz.includes('Zurich')) return 'de';

  } catch { /* ignore */ }

  return 'en';
}

/* ── Translation dictionaries ── */

const translations: Record<Locale, Record<string, string>> = {
  /* ═══════════════════════════════ ENGLISH ═══════════════════════════════ */
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

    // Plan features
    'plan.starter.f1': 'Personal AI assistant',
    'plan.starter.f2': 'Chat & task management',
    'plan.starter.f3': 'Basic integrations',
    'plan.starter.f4': '24h FREE with $100+ clothing order',
    'plan.builder.f1': 'Full AI capabilities',
    'plan.builder.f2': 'Build, create, launch projects',
    'plan.builder.f3': 'Advanced integrations',
    'plan.builder.f4': 'Priority support',
    'plan.builder.f5': 'Custom workflows',
    'plan.ultra.f1': 'Personal AI + self-hostable',
    'plan.ultra.f2': 'Transfer to your own server',
    'plan.ultra.f3': 'Full source access',
    'plan.ultra.f4': 'Unlimited usage',
    'plan.ultra.f5': 'White-label ready',
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

  /* ═══════════════════════════════ RUSSIAN ═══════════════════════════════ */
  ru: {
    'nav.shop': 'Магазин',
    'nav.pricing': 'Цены',
    'nav.community': 'Сообщество',
    'nav.philosophy': 'Философия',
    'nav.cart': 'Корзина',
    'nav.signin': 'Войти',
    'nav.myaccount': 'МОЙ АККАУНТ →',

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

    'plan.starter.f1': 'Персональный AI ассистент',
    'plan.starter.f2': 'Чат и управление задачами',
    'plan.starter.f3': 'Базовые интеграции',
    'plan.starter.f4': '24ч БЕСПЛАТНО при заказе от $100+',
    'plan.builder.f1': 'Полные возможности AI',
    'plan.builder.f2': 'Создавай и запускай проекты',
    'plan.builder.f3': 'Продвинутые интеграции',
    'plan.builder.f4': 'Приоритетная поддержка',
    'plan.builder.f5': 'Кастомные рабочие процессы',
    'plan.ultra.f1': 'Персональный AI + свой сервер',
    'plan.ultra.f2': 'Перенос на свой сервер',
    'plan.ultra.f3': 'Полный доступ к исходникам',
    'plan.ultra.f4': 'Безлимитное использование',
    'plan.ultra.f5': 'White-label готов',
    'plan.business.f1': 'Корпоративный AI',
    'plan.business.f2': 'Командная работа',
    'plan.business.f3': 'Кастомные интеграции',
    'plan.business.f4': 'Выделенная поддержка',
    'plan.business.f5': 'SSO и админ-панель',
    'plan.business.f6': 'Гарантия SLA',

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
    'product.sweatshirt-vintage.desc': 'Потёртый золотистый, винтажный стиль',
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

    'footer.tagline': 'Одно Солнце · Одна Энергия · Одна Планета · Для Всех',
    'footer.oneAccount': 'Один аккаунт. Весь SVET.',
    'footer.rights': 'Все права защищены.',

    'home.badge': 'ОДНО СОЛНЦЕ · ОДНА ЭНЕРГИЯ · ОДНА ПЛАНЕТА',
    'home.tagline': 'Не тренд. Образ жизни.',
    'home.tagline2': 'Одежда, которая объединяет.',
    'home.cta': 'Открыть SVET',
    'home.scroll': 'ЛИСТАЙ',
  },

  /* ═══════════════════════════════ PORTUGUESE ═══════════════════════════════ */
  pt: {
    'nav.shop': 'Loja',
    'nav.pricing': 'Preços',
    'nav.community': 'Comunidade',
    'nav.philosophy': 'Filosofia',
    'nav.cart': 'Carrinho',
    'nav.signin': 'Entrar',
    'nav.myaccount': 'MINHA CONTA →',

    'shop.title': 'LOJA',
    'shop.label': 'Coleção Pré-Venda',
    'shop.desc': 'Cada peça carrega uma mensagem. Garanta agora com preço exclusivo.',
    'shop.banner': '🔥 PRÉ-VENDA — Peça agora, entrega em até 1 mês. Frete grátis mundial em pedidos acima de $100',
    'shop.size': 'Tamanho',
    'shop.addToCart': 'Adicionar ao Carrinho',
    'shop.added': '✓ Adicionado!',
    'shop.preorder': 'PRÉ-VENDA',
    'shop.shipping': '🌍 Entrega Mundial',
    'shop.bestValue': 'MELHOR VALOR',

    'pricing.title': 'ESCOLHA SEU PLANO',
    'pricing.label': 'Assinaturas AI',
    'pricing.desc': 'Assistente pessoal com IA. Crie, desenvolva e lance com SVET.',
    'pricing.banner': '🎁 Compre $100+ em roupas SVET → ganhe 24h Starter GRÁTIS',
    'pricing.popular': 'MAIS POPULAR',
    'pricing.get': 'Escolher',
    'pricing.freeTitle': 'Acesso Starter 24h GRÁTIS',
    'pricing.freeDesc': 'Gaste $100+ em roupas SVET e desbloqueie 24 horas de Starter AI grátis. Sem necessidade de cartão.',
    'pricing.shopNow': 'Ir à Loja →',
    'pricing.paymentTitle': 'Formas de Pagamento',

    'plan.starter.f1': 'Assistente pessoal de IA',
    'plan.starter.f2': 'Chat e gestão de tarefas',
    'plan.starter.f3': 'Integrações básicas',
    'plan.starter.f4': '24h GRÁTIS com pedido de $100+',
    'plan.builder.f1': 'Capacidades completas de IA',
    'plan.builder.f2': 'Crie, desenvolva e lance projetos',
    'plan.builder.f3': 'Integrações avançadas',
    'plan.builder.f4': 'Suporte prioritário',
    'plan.builder.f5': 'Fluxos de trabalho personalizados',
    'plan.ultra.f1': 'IA pessoal + auto-hospedável',
    'plan.ultra.f2': 'Transfira para seu próprio servidor',
    'plan.ultra.f3': 'Acesso total ao código-fonte',
    'plan.ultra.f4': 'Uso ilimitado',
    'plan.ultra.f5': 'White-label pronto',
    'plan.business.f1': 'IA nível empresarial',
    'plan.business.f2': 'Colaboração em equipe',
    'plan.business.f3': 'Integrações personalizadas',
    'plan.business.f4': 'Suporte dedicado',
    'plan.business.f5': 'SSO e controle de admin',
    'plan.business.f6': 'Garantia de SLA',

    'product.tshirt-black': 'SVET Camiseta Preta',
    'product.tshirt-black.desc': 'Modelagem oversized boxy, logo "sVet™" em bolha vermelho/laranja, 100% algodão',
    'product.tshirt-yellow': 'SVET Camiseta Amarela',
    'product.tshirt-yellow.desc': 'Color-block mostarda/creme, logo serifado, costura vermelha',
    'product.tshirt-grey': 'SVET Camiseta Cinza',
    'product.tshirt-grey.desc': 'Cinza mescla, logo vermelho minimalista',
    'product.longsleeve-yellow': 'SVET Manga Longa Amarela',
    'product.longsleeve-yellow.desc': 'Amarelo manteiga, logo vermelho no peito, costura vermelha',
    'product.sweatshirt-cropped': 'SVET Moletom Cropped',
    'product.sweatshirt-cropped.desc': 'Amarelo manteiga, corte cropped, punhos canelados',
    'product.sweatshirt-relaxed': 'SVET Moletom Relaxed',
    'product.sweatshirt-relaxed.desc': 'Amarelo manteiga, modelagem oversized, decote em V',
    'product.sweatshirt-vintage': 'SVET Moletom Vintage',
    'product.sweatshirt-vintage.desc': 'Lavagem dourada desgastada, estilo vintage',
    'product.hoodie-bubble': 'SVET Hoodie Bubble',
    'product.hoodie-bubble.desc': 'Azul marinho escuro, logo bubble, bolso canguru',
    'product.hoodie-serif': 'SVET Hoodie Serif',
    'product.hoodie-serif.desc': 'Azul marinho escuro, logo serifado clean, minimalista',
    'product.pants-bubble': 'SVET Calça Wide-Leg Bubble',
    'product.pants-bubble.desc': 'Azul marinho escuro, logo bubble na coxa',
    'product.pants-serif': 'SVET Calça Wide-Leg Serif',
    'product.pants-serif.desc': 'Azul marinho escuro, logo serifado',
    'product.set-hoodie-pants': 'SVET Conjunto (Hoodie + Calça)',
    'product.set-hoodie-pants.desc': 'Conjunto completo combinando, escolha o estilo do logo',
    'product.cap': 'SVET Boné',
    'product.cap.desc': 'Azul marinho escuro, logo 3D em borracha bubble',

    'footer.tagline': 'Um Sol · Uma Energia · Um Planeta · Para Todos',
    'footer.oneAccount': 'Uma conta. Todo o SVET.',
    'footer.rights': 'Todos os direitos reservados.',

    'home.badge': 'UM SOL · UMA ENERGIA · UM PLANETA',
    'home.tagline': 'Não é tendência. É estilo de vida.',
    'home.tagline2': 'Roupas que conectam todos nós.',
    'home.cta': 'Descubra SVET',
    'home.scroll': 'ROLAR',
  },

  /* ═══════════════════════════════ GERMAN ═══════════════════════════════ */
  de: {
    'nav.shop': 'Shop',
    'nav.pricing': 'Preise',
    'nav.community': 'Community',
    'nav.philosophy': 'Philosophie',
    'nav.cart': 'Warenkorb',
    'nav.signin': 'Anmelden',
    'nav.myaccount': 'MEIN KONTO →',

    'shop.title': 'SHOP',
    'shop.label': 'Vorbestellungs-Kollektion',
    'shop.desc': 'Jedes Stück trägt eine Botschaft. Jetzt vorbestellen zu exklusiven Preisen.',
    'shop.banner': '🔥 VORBESTELLUNG — Jetzt bestellen, Versand innerhalb 1 Monat. Kostenloser Versand weltweit ab $100+',
    'shop.size': 'Größe',
    'shop.addToCart': 'In den Warenkorb',
    'shop.added': '✓ Hinzugefügt!',
    'shop.preorder': 'VORBESTELLUNG',
    'shop.shipping': '🌍 Weltweiter Versand',
    'shop.bestValue': 'BESTER WERT',

    'pricing.title': 'WÄHLE DEINEN PLAN',
    'pricing.label': 'AI-Abonnements',
    'pricing.desc': 'KI-gestützter persönlicher Assistent. Erstelle, baue und starte mit SVET.',
    'pricing.banner': '🎁 Kaufe $100+ SVET Kleidung → erhalte 24h Starter GRATIS',
    'pricing.popular': 'AM BELIEBTESTEN',
    'pricing.get': 'Wählen',
    'pricing.freeTitle': 'GRATIS 24h Starter-Zugang',
    'pricing.freeDesc': 'Gib $100+ für SVET Kleidung aus und schalte 24 Stunden Starter AI gratis frei. Keine Kreditkarte erforderlich.',
    'pricing.shopNow': 'Zum Shop →',
    'pricing.paymentTitle': 'Zahlungsmethoden',

    'plan.starter.f1': 'Persönlicher KI-Assistent',
    'plan.starter.f2': 'Chat & Aufgabenverwaltung',
    'plan.starter.f3': 'Basis-Integrationen',
    'plan.starter.f4': '24h GRATIS bei Bestellung ab $100+',
    'plan.builder.f1': 'Volle KI-Fähigkeiten',
    'plan.builder.f2': 'Projekte erstellen und starten',
    'plan.builder.f3': 'Erweiterte Integrationen',
    'plan.builder.f4': 'Prioritärer Support',
    'plan.builder.f5': 'Individuelle Workflows',
    'plan.ultra.f1': 'Persönliche KI + Self-Hosting',
    'plan.ultra.f2': 'Auf eigenen Server übertragen',
    'plan.ultra.f3': 'Voller Quellcode-Zugang',
    'plan.ultra.f4': 'Unbegrenzte Nutzung',
    'plan.ultra.f5': 'White-Label bereit',
    'plan.business.f1': 'Enterprise-KI',
    'plan.business.f2': 'Team-Zusammenarbeit',
    'plan.business.f3': 'Individuelle Integrationen',
    'plan.business.f4': 'Dedizierter Support',
    'plan.business.f5': 'SSO & Admin-Steuerung',
    'plan.business.f6': 'SLA-Garantie',

    'product.tshirt-black': 'SVET T-Shirt Schwarz',
    'product.tshirt-black.desc': 'Oversized Boxy-Fit, Bubble-Logo "sVet™" in Rot/Orange, 100% Baumwolle',
    'product.tshirt-yellow': 'SVET T-Shirt Gelb',
    'product.tshirt-yellow.desc': 'Colorblock Senf/Creme, Serifen-Logo, rote Ziernaht',
    'product.tshirt-grey': 'SVET T-Shirt Grau',
    'product.tshirt-grey.desc': 'Meliertes Grau, minimales rotes Logo',
    'product.longsleeve-yellow': 'SVET Langarm Gelb',
    'product.longsleeve-yellow.desc': 'Buttergelb, rotes Logo Brustseite, rote Paspeln',
    'product.sweatshirt-cropped': 'SVET Sweatshirt Cropped',
    'product.sweatshirt-cropped.desc': 'Buttergelb, kurzer Schnitt, gerippte Bündchen',
    'product.sweatshirt-relaxed': 'SVET Sweatshirt Relaxed',
    'product.sweatshirt-relaxed.desc': 'Buttergelb, Oversized-Fit, V-Ausschnitt',
    'product.sweatshirt-vintage': 'SVET Sweatshirt Vintage',
    'product.sweatshirt-vintage.desc': 'Goldene Used-Waschung, Vintage-Feeling',
    'product.hoodie-bubble': 'SVET Hoodie Bubble',
    'product.hoodie-bubble.desc': 'Dunkelmarineblau, Bubble-Logo, Känguru-Tasche',
    'product.hoodie-serif': 'SVET Hoodie Serif',
    'product.hoodie-serif.desc': 'Dunkelmarineblau, cleanes Serifen-Logo, minimal',
    'product.pants-bubble': 'SVET Weite Hose Bubble',
    'product.pants-bubble.desc': 'Dunkelmarineblau, Bubble-Logo am Oberschenkel',
    'product.pants-serif': 'SVET Weite Hose Serif',
    'product.pants-serif.desc': 'Dunkelmarineblau, Serifen-Logo',
    'product.set-hoodie-pants': 'SVET Set (Hoodie + Hose)',
    'product.set-hoodie-pants.desc': 'Passendes Komplett-Set, Logo-Stil wählbar',
    'product.cap': 'SVET Cap',
    'product.cap.desc': 'Dunkelmarineblau, 3D-Gummi-Bubble-Logo-Patch',

    'footer.tagline': 'Eine Sonne · Eine Energie · Ein Planet · Für Alle',
    'footer.oneAccount': 'Ein Konto. Alles von SVET.',
    'footer.rights': 'Alle Rechte vorbehalten.',

    'home.badge': 'EINE SONNE · EINE ENERGIE · EIN PLANET',
    'home.tagline': 'Kein Trend. Eine Lebensart.',
    'home.tagline2': 'Kleidung, die uns alle verbindet.',
    'home.cta': 'Entdecke SVET',
    'home.scroll': 'SCROLLEN',
  },

  /* ════════════════════════ EGYPTIAN ARABIC (عامية مصرية) ════════════════════════ */
  ar: {
    'nav.shop': 'المحل',
    'nav.pricing': 'الأسعار',
    'nav.community': 'الكوميونتي',
    'nav.philosophy': 'الفلسفة',
    'nav.cart': 'السلة',
    'nav.signin': 'سجّل دخولك',
    'nav.myaccount': 'حسابي ←',

    'shop.title': 'المحل',
    'shop.label': 'كولكشن الطلب المسبق',
    'shop.desc': 'كل قطعة فيها رسالة. اطلب دلوقتي بسعر حصري.',
    'shop.banner': '🔥 طلب مسبق — اطلب دلوقتي، التوصيل خلال شهر. شحن مجاني لكل العالم للطلبات فوق $100',
    'shop.size': 'المقاس',
    'shop.addToCart': 'حطّه في السلة',
    'shop.added': '✓ اتضاف!',
    'shop.preorder': 'طلب مسبق',
    'shop.shipping': '🌍 شحن لكل حتة في العالم',
    'shop.bestValue': 'أحسن ديل',

    'pricing.title': 'اختار بلانك',
    'pricing.label': 'اشتراكات الذكاء الاصطناعي',
    'pricing.desc': 'مساعد شخصي بالذكاء الاصطناعي. ابني، اعمل، وشغّل مع SVET.',
    'pricing.banner': '🎁 اشتري هدوم SVET بـ$100+ → خد 24 ساعة Starter ببلاش',
    'pricing.popular': 'الأكتر مبيعاً',
    'pricing.get': 'اختار',
    'pricing.freeTitle': '24 ساعة Starter ببلاش',
    'pricing.freeDesc': 'اصرف $100+ على هدوم SVET وافتح 24 ساعة Starter AI ببلاش. مفيش كارت مطلوب.',
    'pricing.shopNow': 'روح المحل ←',
    'pricing.paymentTitle': 'طرق الدفع',

    'plan.starter.f1': 'مساعد AI شخصي',
    'plan.starter.f2': 'شات وإدارة مهام',
    'plan.starter.f3': 'ربط أساسي',
    'plan.starter.f4': '24 ساعة ببلاش مع طلب $100+',
    'plan.builder.f1': 'كل إمكانيات الـAI',
    'plan.builder.f2': 'ابني واعمل وشغّل مشاريع',
    'plan.builder.f3': 'ربط متقدم',
    'plan.builder.f4': 'دعم أولوية',
    'plan.builder.f5': 'سير عمل مخصص',
    'plan.ultra.f1': 'AI شخصي + تستضيفه عندك',
    'plan.ultra.f2': 'نقل على سيرفرك الخاص',
    'plan.ultra.f3': 'وصول كامل للسورس كود',
    'plan.ultra.f4': 'استخدام بلا حدود',
    'plan.ultra.f5': 'وايت ليبل جاهز',
    'plan.business.f1': 'AI مستوى شركات',
    'plan.business.f2': 'شغل جماعي',
    'plan.business.f3': 'ربط مخصص',
    'plan.business.f4': 'دعم مخصوص ليك',
    'plan.business.f5': 'SSO وتحكم أدمن',
    'plan.business.f6': 'ضمان SLA',

    'product.tshirt-black': 'SVET تيشيرت أسود',
    'product.tshirt-black.desc': 'قصة أوفر سايز بوكسي، لوجو "sVet™" بابل أحمر/برتقالي، قطن 100%',
    'product.tshirt-yellow': 'SVET تيشيرت أصفر',
    'product.tshirt-yellow.desc': 'كلر بلوك ماسترد/كريمي، لوجو سيريف، خياطة حمرا',
    'product.tshirt-grey': 'SVET تيشيرت رمادي',
    'product.tshirt-grey.desc': 'رمادي ميلانج، لوجو أحمر مينيمال',
    'product.longsleeve-yellow': 'SVET كم طويل أصفر',
    'product.longsleeve-yellow.desc': 'أصفر زبدة، لوجو أحمر على الصدر، خياطة حمرا',
    'product.sweatshirt-cropped': 'SVET سويت شيرت كروبد',
    'product.sweatshirt-cropped.desc': 'أصفر زبدة، قصة قصيرة، أساور ريب',
    'product.sweatshirt-relaxed': 'SVET سويت شيرت ريلاكسد',
    'product.sweatshirt-relaxed.desc': 'أصفر زبدة، أوفر سايز، رقبة V',
    'product.sweatshirt-vintage': 'SVET سويت شيرت فينتج',
    'product.sweatshirt-vintage.desc': 'غسلة ذهبية متهالكة، ستايل فينتج',
    'product.hoodie-bubble': 'SVET هودي بابل',
    'product.hoodie-bubble.desc': 'كحلي غامق، لوجو بابل، جيب كانجرو',
    'product.hoodie-serif': 'SVET هودي سيريف',
    'product.hoodie-serif.desc': 'كحلي غامق، لوجو سيريف نضيف، مينيمال',
    'product.pants-bubble': 'SVET بنطلون واسع بابل',
    'product.pants-bubble.desc': 'كحلي غامق، لوجو بابل على الفخد',
    'product.pants-serif': 'SVET بنطلون واسع سيريف',
    'product.pants-serif.desc': 'كحلي غامق، لوجو سيريف',
    'product.set-hoodie-pants': 'SVET طقم (هودي + بنطلون)',
    'product.set-hoodie-pants.desc': 'طقم كامل متنسق، اختار ستايل اللوجو',
    'product.cap': 'SVET كاب',
    'product.cap.desc': 'كحلي غامق، لوجو بابل 3D مطاط',

    'footer.tagline': 'شمس واحدة · طاقة واحدة · كوكب واحد · للكل',
    'footer.oneAccount': 'حساب واحد. كل SVET.',
    'footer.rights': 'كل الحقوق محفوظة.',

    'home.badge': 'شمس واحدة · طاقة واحدة · كوكب واحد',
    'home.tagline': 'مش موضة. أسلوب حياة.',
    'home.tagline2': 'هدوم بتوصّلنا كلنا ببعض.',
    'home.cta': 'اكتشف SVET',
    'home.scroll': 'سكرول',
  },
};

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

export { translations };
