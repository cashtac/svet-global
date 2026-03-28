'use client';

import { useI18n } from '@/lib/i18n-provider';
import { LOCALE_LABELS, LOCALE_LIST, type Locale } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export function LanguageSelector() {
  const { isFirstVisit, setLocale, dismissFirstVisit, t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      setVisible(true);
    }
  }, [isFirstVisit]);

  if (!visible) return null;

  const handleSelect = (locale: Locale) => {
    setLocale(locale);
    setFading(true);
    setTimeout(() => {
      dismissFirstVisit();
      setVisible(false);
    }, 400);
  };

  return (
    <div className={`lang-overlay ${fading ? 'lang-overlay--fading' : ''}`}>
      <div className="lang-overlay__content">
        <div className="lang-overlay__logo">SVET</div>
        <p className="lang-overlay__subtitle">{t('lang.chooseTitle')}</p>
        <div className="lang-overlay__grid">
          {LOCALE_LIST.map(l => (
            <button
              key={l}
              className="lang-overlay__btn"
              onClick={() => handleSelect(l)}
            >
              <span className="lang-overlay__flag">{LOCALE_LABELS[l].split(' ')[0]}</span>
              <span className="lang-overlay__name">{LOCALE_LABELS[l].split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
