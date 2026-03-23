'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { detectLocale, t, isRTL, type Locale, type TranslationKey } from './i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
  rtl: boolean;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  rtl: false,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('svet-locale') as Locale | null;
    if (saved && ['en', 'ru', 'pt', 'de', 'ar'].includes(saved)) {
      setLocaleState(saved);
    } else {
      setLocaleState(detectLocale());
    }
  }, []);

  // Apply RTL direction to document
  useEffect(() => {
    const rtl = isRTL(locale);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = locale === 'ar' ? 'ar-EG' : locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('svet-locale', l);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: (key) => t(locale, key), rtl: isRTL(locale) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
