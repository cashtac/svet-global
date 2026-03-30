'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { detectLocale, t, isRTL, LOCALE_LIST, type Locale, type TranslationKey } from './i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
  rtl: boolean;
  isFirstVisit: boolean;
  dismissFirstVisit: () => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
  rtl: false,
  isFirstVisit: false,
  dismissFirstVisit: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force English — no language detection
    setLocaleState('en');
    setIsFirstVisit(false);
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

  const dismissFirstVisit = () => {
    setIsFirstVisit(false);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: (key) => t(locale, key), rtl: isRTL(locale), isFirstVisit: mounted && isFirstVisit, dismissFirstVisit }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
