'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { detectLocale, t, type Locale, type TranslationKey } from './i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Check localStorage first (user override), else auto-detect
    const saved = localStorage.getItem('svet-locale') as Locale | null;
    if (saved === 'en' || saved === 'ru') {
      setLocaleState(saved);
    } else {
      setLocaleState(detectLocale());
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('svet-locale', l);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: (key) => t(locale, key) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
