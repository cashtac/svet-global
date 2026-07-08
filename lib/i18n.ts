/* ════════════════════════════════════════════════
   SVET i18n — EN + RU (trimmed to used keys only)
   ════════════════════════════════════════════════ */

export type Locale = 'en' | 'ru';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: '🇬🇧 English',
  ru: '🇷🇺 Русский',
};

export const LOCALE_LIST: Locale[] = ['en', 'ru'];

export function isRTL(_locale: Locale): boolean {
  return false;
}

export function detectLocale(): Locale {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_LOCALE === 'ru') return 'ru';
  if (typeof window === 'undefined') return 'en';
  const lang = (navigator.language || '').toLowerCase();
  if (lang.startsWith('ru')) return 'ru';
  return 'en';
}

/* ── Translation dictionaries ── */

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Home — hero
    'home.badge': 'FIRST DROP — PRE-ORDER OPEN',
    'home.tagline': 'One Sun. One Energy.',
    'home.tagline2': 'One Planet. For Everyone.',
    'home.cta': 'EXPLORE COLLECTION',
    'home.scroll': 'SCROLL',

    // Home — marquee
    'home.marquee.oneSun': 'ONE SUN',
    'home.marquee.oneEnergy': 'ONE ENERGY',
    'home.marquee.onePlanet': 'ONE PLANET',
    'home.marquee.forEveryone': 'FOR EVERYONE',

    // Home — three pillars
    'home.oneSun': 'One Sun',
    'home.oneSunDesc': 'The same star lights every corner of the planet. No borders. No exceptions. Just light.',
    'home.oneEnergy': 'One Energy',
    'home.oneEnergyDesc': 'Every culture, every language, every heartbeat — powered by the same force. We are all made of the same energy.',
    'home.onePlanet': 'One Planet',
    'home.onePlanetDesc': 'This is the only home we share. Clothing should remind us to protect it, not destroy it.',

    // Home — philosophy
    'home.connected': 'We Are All Connected',
    'home.connectedDesc1': 'SVET is not a fashion brand. It\'s a belief system sewn into fabric. Every thread is a reminder that we share the same sun, breathe the same air, and walk the same earth.',
    'home.connectedDesc2': 'When you wear SVET, you carry that message with you. Not as a statement — as a way of being.',
    'home.connections': 'Connections',
    'home.planet': 'Planet',
    'home.forEveryone': 'For Everyone',

    // About
    'about.badge': 'THE ORIGIN',
    'about.title': 'We Are SVET',
    'about.heroDesc': 'Born from a belief that clothing should carry meaning, not just style.',
    'about.meaningTitle': 'SVET means Light',
    'about.meaningP1': 'In Slavic languages, SVET (СВЕТ) means light — the kind of light that reveals truth, connects people, and illuminates what matters.',
    'about.meaningP2': 'We took that word and built a world around it. A clothing line. A philosophy. A community of people who believe the things you wear should mean something.',
    'about.meaningP3': '"One Sun. One Energy. One Planet. For Everyone." — These aren\'t just words. They\'re the compass for everything we create.',
    'about.oneSunDesc': 'The same star shines on every corner of the Earth. It doesn\'t choose who receives its light. Neither do we.',
    'about.oneEnergyDesc': 'Every heartbeat, every step, every creation — fueled by the same universal force. Fashion should celebrate that unity, not divide it.',
    'about.onePlanetDesc': 'We have one home. Every piece of clothing we make honours that truth through mindful materials and conscious production.',
    'about.forEveryoneTitle': 'For Everyone',
    'about.forEveryoneDesc': 'SVET is not exclusive. It\'s not for a demographic. It\'s for anyone who sees themselves in the message. Wear the light.',
  },

  ru: {
    // Home — hero
    'home.badge': 'ПЕРВЫЙ ДРОП — ПРЕДЗАКАЗ ОТКРЫТ',
    'home.tagline': 'Одно Солнце. Одна Энергия.',
    'home.tagline2': 'Одна Планета. Для Всех.',
    'home.cta': 'СМОТРЕТЬ КОЛЛЕКЦИЮ',
    'home.scroll': 'ЛИСТАЙТЕ',

    // Home — marquee
    'home.marquee.oneSun': 'ОДНО СОЛНЦЕ',
    'home.marquee.oneEnergy': 'ОДНА ЭНЕРГИЯ',
    'home.marquee.onePlanet': 'ОДНА ПЛАНЕТА',
    'home.marquee.forEveryone': 'ДЛЯ ВСЕХ',

    // Home — three pillars
    'home.oneSun': 'Одно Солнце',
    'home.oneSunDesc': 'Одна и та же звезда освещает каждый уголок планеты. Без границ. Без исключений. Только свет.',
    'home.oneEnergy': 'Одна Энергия',
    'home.oneEnergyDesc': 'Каждая культура, каждый язык, каждое сердцебиение — всё от одной и той же силы. Мы все сделаны из одной энергии.',
    'home.onePlanet': 'Одна Планета',
    'home.onePlanetDesc': 'Это единственный дом, который мы делим. Одежда должна напоминать нам беречь его, а не разрушать.',

    // Home — philosophy
    'home.connected': 'Мы все связаны',
    'home.connectedDesc1': 'SVET — это не модный бренд. Это система ценностей, вшитая в ткань. Каждая нить — напоминание о том, что мы живём под одним солнцем, дышим одним воздухом и ходим по одной земле.',
    'home.connectedDesc2': 'Когда вы носите SVET, вы несёте это послание с собой. Не как лозунг — как образ жизни.',
    'home.connections': 'Связей',
    'home.planet': 'Планета',
    'home.forEveryone': 'Для Всех',

    // About
    'about.badge': 'НАЧАЛО',
    'about.title': 'Мы — SVET',
    'about.heroDesc': 'Родился из убеждения, что одежда должна нести смысл, а не просто стиль.',
    'about.meaningTitle': 'СВЕТ значит Свет',
    'about.meaningP1': 'В славянских языках СВЕТ — это не просто слово. Это свет, который открывает истину, объединяет людей и освещает то, что важно.',
    'about.meaningP2': 'Мы взяли это слово и построили вокруг него целый мир. Линию одежды. Философию. Сообщество людей, которые верят, что вещи, которые ты носишь, должны что-то значить.',
    'about.meaningP3': '«Одно Солнце. Одна Энергия. Одна Планета. Для Всех.» — Это не просто слова. Это компас для всего, что мы создаём.',
    'about.oneSunDesc': 'Одна и та же звезда светит в каждом уголке Земли. Она не выбирает, кому дарить свой свет. И мы тоже.',
    'about.oneEnergyDesc': 'Каждое сердцебиение, каждый шаг, каждое творение — всё от одной и той же вселенской силы. Мода должна отмечать это единство, а не разделять.',
    'about.onePlanetDesc': 'У нас один дом. Каждая вещь, которую мы создаём, чтит эту истину через осознанные материалы и ответственное производство.',
    'about.forEveryoneTitle': 'Для Всех',
    'about.forEveryoneDesc': 'SVET — не эксклюзив. Он не для какой-то аудитории. Он для каждого, кто видит себя в этом послании. Носите свет.',
  },
};

export type TranslationKey = keyof typeof translations.en | string;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}

export { translations };
