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

const LEVELS = [
  { level: 1, name: 'Registered', desc: 'Dark base, subtle particles', className: 'profile-level--1' },
  { level: 2, name: 'Email Subscriber', desc: 'Soft gradient colors', className: 'profile-level--2' },
  { level: 3, name: 'First Purchase', desc: 'Warm golden particles', className: 'profile-level--3' },
  { level: 4, name: 'Discord Member', desc: 'Ocean wave texture', className: 'profile-level--4' },
  { level: 5, name: '3-Month Sub', desc: 'Mountain silhouettes', className: 'profile-level--5' },
  { level: 6, name: '12-Month Sub', desc: 'Aurora borealis', className: 'profile-level--6' },
  { level: 7, name: 'SVET COMPLETE', desc: 'Golden butterflies', className: 'profile-level--7' },
];

export default function ProfilePage() {
  const { t } = useI18n();
  const [user, setUser] = useState<any>(null);
  const [level, setLevel] = useState(0);
  const [earnedSymbols, setEarnedSymbols] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Check localStorage for user data
    try {
      const stored = localStorage.getItem('svet_profile');
      if (stored) {
        const data = JSON.parse(stored);
        setUser(data);
        setLevel(data.level || 1);
        setEarnedSymbols(new Set(data.symbols || [0]));
      }
    } catch {}
  }, []);

  // Guest state — not logged in
  if (!user) {
    return (
      <section className="profile-page profile-page--guest">
        <div className="section__container">
          <div className="section-header" style={{ paddingTop: 150 }}>
            <h1 className="section-header__title" style={{ fontSize: '2rem', color: '#555' }}>
              {t('profile.title' as any)}
            </h1>
            <p className="section-header__desc" style={{ color: '#444' }}>
              Create your account to begin your SVET journey.
            </p>
          </div>

          <div className="profile-guest-card">
            <div className="profile-guest-card__icon">🌑</div>
            <p className="profile-guest-card__text">
              The site waits in silence. Register to awaken the light.
            </p>
            <Link href="/register" className="profile-guest-card__cta">
              CREATE ACCOUNT →
            </Link>
            <Link href="/login" className="profile-guest-card__login">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const currentLevel = LEVELS.find(l => l.level === level) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.level === level + 1);
  const progress = (earnedSymbols.size / 9) * 100;

  return (
    <section className={`profile-page ${currentLevel.className}`}>
      <div className="section__container">
        <div className="section-header" style={{ paddingTop: 120 }}>
          <span className="section-header__label" style={{ color: '#C9A84C' }}>
            {t('profile.level' as any)} {level}
          </span>
          <h1 className="section-header__title">{t('profile.title' as any)}</h1>
        </div>

        {/* User info */}
        <div className="profile-info">
          <div className="profile-avatar">{user.name?.[0]?.toUpperCase() || '✦'}</div>
          <h2 className="profile-name">{user.name}</h2>
          <span className="profile-level-badge">{currentLevel.name}</span>
        </div>

        {/* Chain Progress */}
        <div className="profile-section">
          <h3 className="profile-section__title">{t('profile.chain' as any)}</h3>
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
              <div className="profile-progress__fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="profile-progress__text">{earnedSymbols.size}/9</span>
          </div>
          {nextLevel && (
            <p className="profile-next-unlock">
              {t('profile.nextUnlock' as any)} <strong>{nextLevel.name}</strong>
            </p>
          )}
        </div>

        {/* Tokens */}
        <div className="profile-section">
          <h3 className="profile-section__title">☀️ {t('profile.tokens' as any)}</h3>
          <div className="profile-tokens">
            <span className="profile-tokens__count">0</span>
            <span className="profile-tokens__label">Connection Tokens</span>
          </div>
        </div>

        {/* Subscription */}
        <div className="profile-section">
          <h3 className="profile-section__title">{t('profile.subscription' as any)}</h3>
          <div className="profile-sub-card">
            <span>No active subscription</span>
            <Link href="/pricing" className="profile-sub-card__cta">View Plans →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
