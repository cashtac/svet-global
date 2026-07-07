/**
 * Locale system — reads NEXT_PUBLIC_LOCALE to determine site behavior.
 * Controls language, currency, payment provider, and sister-site linking.
 */

export type SiteLocale = 'ru' | 'en';
export type Currency = 'RUB' | 'USD';
export type PaymentProvider = 'yookassa' | 'cloudpayments' | 'robokassa' | 'stripe';

const LOCALE = (process.env.NEXT_PUBLIC_LOCALE || 'en') as SiteLocale;
const CURRENCY = (process.env.NEXT_PUBLIC_CURRENCY || 'USD') as Currency;
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://svet.global';
const SISTER_URL = process.env.NEXT_PUBLIC_SISTER_URL || (LOCALE === 'ru' ? 'https://svet.global' : 'https://ru.svet.global');
const PAYMENT_PROVIDER = (process.env.PAYMENT_PROVIDER || 'stripe') as PaymentProvider;

export function getLocale(): SiteLocale {
  return LOCALE;
}

export function getCurrency(): Currency {
  return CURRENCY;
}

export function getSiteUrl(): string {
  return SITE_URL;
}

export function getSisterUrl(): string {
  return SISTER_URL;
}

export function getSisterLabel(): string {
  return LOCALE === 'ru' ? 'English Version' : 'Русская версия';
}

export function getSisterFlag(): string {
  return LOCALE === 'ru' ? '🌍' : '🇷🇺';
}

export function getPaymentProvider(): PaymentProvider {
  return PAYMENT_PROVIDER;
}

export function isRussia(): boolean {
  return LOCALE === 'ru';
}

export function formatPrice(amount: number): string {
  if (CURRENCY === 'RUB') {
    // Russian format: 12 900 ₽ (space as thousands separator)
    return `${amount.toLocaleString('ru-RU')} ₽`;
  }
  return `$${amount}`;
}

export function formatPriceCents(cents: number): string {
  if (CURRENCY === 'RUB') {
    return formatPrice(cents); // RUB prices stored as whole numbers
  }
  return `$${(cents / 100).toFixed(0)}`;
}

export function getHtmlLang(): string {
  return LOCALE === 'ru' ? 'ru' : 'en';
}
