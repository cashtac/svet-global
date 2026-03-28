'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n-provider';
import { useEffect, useState } from 'react';

/* ════════════════════════════════════════════════
   /profile — Progressive Profile System
   ════════════════════════════════════════════════ */

const CHAIN_SYMBOLS = [
  { emoji: '🪲', name: 'Precision' },
  { emoji: '🐝', name: 'Creation' },
  { emoji: '☀️', name: 'Light' },
  { emoji: '🦅', name: 'Vision' },
  { emoji: '🐋', name: 'Memory' },
  { emoji: '🐆', name: 'Grace' },
  { emoji: '🐻', name: 'Endurance' },
  { emoji: '🌿', name: 'Power' },
  { emoji: '🦁', name: 'Eternity' },
];

const TOKEN_LEVELS = [
  { key: 'seedling', min: 0, max: 99, color: '#4a7c59' },
  { key: 'energized', min: 100, max: 499, color: '#f5a623' },
  { key: 'radiant', min: 500, max: 999, color: '#e93323' },
  { key: 'luminary', min: 1000, max: Infinity, color: '#FFD700' },
];

// Mock transaction data — in production this comes from API
const MOCK_TRANSACTIONS = [
  { id: 1, type: 'purchase', label: 'Purchase: SVET Hoodie', tokens: 69, date: '2026-03-28' },
  { id: 2, type: 'referral', label: 'Referral bonus', tokens: 25, date: '2026-03-27' },
  { id: 3, type: 'share', label: 'Instagram post', tokens: 10, date: '2026-03-25' },
  { id: 4, type: 'signup', label: 'Account created 🪲', tokens: 5, date: '2026-03-20' },
];

export default function ProfilePage() {
  const { t } = useI18n();
  const [user, setUser] = useState<any>(null);
  const [tokens, setTokens] = useState(0);
  const [earnedSymbols, setEarnedSymbols] = useState<Set<number>>(new Set());
  const [transactions, setTransactions] = useState<typeof MOCK_TRANSACTIONS>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('svet_profile');
      if (stored) {
        const data = JSON.parse(stored);
        setUser(data);
        setTokens(data.tokens || 0);
        setEarnedSymbols(new Set(data.symbols || [0]));
        setTransactions(data.transactions || MOCK_TRANSACTIONS);
      }
    } catch {}
  }, []);

  // Determine current level from tokens
  const currentLevel = TOKEN_LEVELS.find(l => tokens >= l.min && tokens <= l.max) || TOKEN_LEVELS[0];
  const currentLevelIndex = TOKEN_LEVELS.indexOf(currentLevel);
  const nextLevel = TOKEN_LEVELS[currentLevelIndex + 1];
  const progressInLevel = nextLevel
    ? ((tokens - currentLevel.min) / (currentLevel.max - currentLevel.min + 1)) * 100
    : 100;

  // Guest state — not logged in
  if (!user) {
    return (
      <section className="profile-page profile-page--guest">
        <div className="section__container">
          <div className="section-header" style={{ paddingTop: 150 }}>
            <h1 className="section-header__title" style={{ fontSize: '2rem', color: '#555' }}>
              {t('profile.title')}
            </h1>
            <p className="section-header__desc" style={{ color: '#444' }}>
              {t('profile.guestTitle')}
            </p>
          </div>

          <div className="profile-guest-card">
            <div className="profile-guest-card__icon">🌑</div>
            <p className="profile-guest-card__text">
              {t('profile.guestText')}
            </p>
            <Link href="/register" className="profile-guest-card__cta">
              {t('profile.createAccount')} →
            </Link>
            <Link href="/login" className="profile-guest-card__login">
              {t('profile.alreadyHave')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const chainProgress = (earnedSymbols.size / 9) * 100;

  // Subscription mock
  const subscription = user.subscription || null;

  return (
    <section className="profile-page">
      <div className="section__container">
        <div className="section-header" style={{ paddingTop: 120 }}>
          <span className="section-header__label" style={{ color: currentLevel.color }}>
            {t(`profile.level.${currentLevel.key}`)}
          </span>
          <h1 className="section-header__title">{t('profile.title')}</h1>
        </div>

        {/* ═══ User Header ═══ */}
        <div className="profile-header">
          <div className="profile-avatar" style={{ borderColor: currentLevel.color }}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="profile-avatar__img" />
            ) : (
              <span className="profile-avatar__initials">{user.name?.[0]?.toUpperCase() || '✦'}</span>
            )}
          </div>
          <div className="profile-header__info">
            <h2 className="profile-name">{user.name}</h2>
            <span className="profile-email">{user.email || ''}</span>
          </div>
          <button className="profile-edit-btn">{t('profile.edit')}</button>
        </div>

        {/* ═══ Token Balance ═══ */}
        <div className="profile-section profile-tokens-section">
          <h3 className="profile-section__title">☀️ {t('profile.tokens')}</h3>
          <div className="profile-tokens-display">
            <span className="profile-tokens__big-number">{tokens}</span>
            <span className="profile-tokens__label">☀ Connection Tokens</span>
          </div>
          <div className="profile-level-progress">
            <div className="profile-level-progress__labels">
              <span style={{ color: currentLevel.color }}>{t(`profile.level.${currentLevel.key}`)}</span>
              {nextLevel && <span style={{ color: '#555' }}>{t(`profile.level.${nextLevel.key}`)}</span>}
            </div>
            <div className="profile-level-progress__bar">
              <div
                className="profile-level-progress__fill"
                style={{ width: `${progressInLevel}%`, background: currentLevel.color }}
              />
            </div>
            {nextLevel && (
              <p className="profile-level-progress__hint">
                {nextLevel.min - tokens} ☀ {t('profile.nextUnlock')} {t(`profile.level.${nextLevel.key}`)}
              </p>
            )}
          </div>

          {/* Level badges */}
          <div className="profile-levels-grid">
            {TOKEN_LEVELS.map((level, i) => {
              const isActive = i <= currentLevelIndex;
              return (
                <div key={level.key} className={`profile-level-badge ${isActive ? 'profile-level-badge--active' : 'profile-level-badge--locked'}`}>
                  <span className="profile-level-badge__icon">{t(`profile.level.${level.key}`).split(' ')[0]}</span>
                  <span className="profile-level-badge__name">{t(`profile.level.${level.key}`).split(' ').slice(1).join(' ')}</span>
                  {!isActive && <span className="profile-level-badge__lock">🔒</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ Transaction History ═══ */}
        <div className="profile-section">
          <h3 className="profile-section__title">{t('profile.history')}</h3>
          {transactions.length > 0 ? (
            <div className="profile-tx-list">
              {transactions.map(tx => (
                <div key={tx.id} className="profile-tx">
                  <div className="profile-tx__left">
                    <span className="profile-tx__icon">
                      {tx.type === 'purchase' ? '🛒' : tx.type === 'referral' ? '👋' : tx.type === 'share' ? '📸' : '✨'}
                    </span>
                    <div>
                      <div className="profile-tx__label">{tx.label}</div>
                      <div className="profile-tx__date">{tx.date}</div>
                    </div>
                  </div>
                  <span className="profile-tx__tokens">+{tx.tokens} ☀</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="profile-empty-state">
              <span>📜</span>
              <p style={{ color: '#555', marginTop: 8 }}>—</p>
            </div>
          )}
        </div>

        {/* ═══ Subscription ═══ */}
        <div className="profile-section">
          <h3 className="profile-section__title">{t('profile.subscription')}</h3>
          {subscription ? (
            <div className="profile-sub-card profile-sub-card--active">
              <div className="profile-sub-card__info">
                <span className="profile-sub-card__plan">{subscription.plan}</span>
                <span className="profile-sub-card__renew">
                  {t('profile.renews')} {subscription.renewDate}
                </span>
              </div>
              <button className="profile-sub-card__manage-btn">{t('profile.manage')}</button>
            </div>
          ) : (
            <div className="profile-sub-card">
              <span>{t('profile.noSub')}</span>
              <Link href="/pricing" className="profile-sub-card__cta">{t('profile.viewPlans')} →</Link>
            </div>
          )}
        </div>

        {/* ═══ Chain Progress ═══ */}
        <div className="profile-section">
          <h3 className="profile-section__title">{t('profile.chain')}</h3>
          <div className="profile-chain">
            {CHAIN_SYMBOLS.map((s, i) => (
              <div key={i} className={`profile-chain__slot ${earnedSymbols.has(i) ? 'profile-chain__slot--earned' : ''}`}>
                <span className="profile-chain__emoji">{s.emoji}</span>
                <span className="profile-chain__name">{s.name}</span>
              </div>
            ))}
          </div>
          <div className="profile-progress">
            <div className="profile-progress__bar">
              <div className="profile-progress__fill" style={{ width: `${chainProgress}%` }} />
            </div>
            <span className="profile-progress__text">{earnedSymbols.size}/9</span>
          </div>
        </div>

        {/* ═══ Order History ═══ */}
        <div className="profile-section">
          <h3 className="profile-section__title">{t('profile.orders')}</h3>
          <div className="profile-empty-state">
            <span>🛒</span>
            <p style={{ color: '#555', marginTop: 8 }}>—</p>
          </div>
        </div>
      </div>
    </section>
  );
}
