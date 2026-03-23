'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ════════════════════════════════════════════════
   REGISTER — Magic Link (Passwordless)
   ════════════════════════════════════════════════ */

export default function RegisterPage() {
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const [devUrl, setDevUrl] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: contact.trim() }),
      });

      const data = await res.json();

      if (data.ok) {
        setSent(true);
        if (data._dev_verify_url) setDevUrl(data._dev_verify_url);
      } else {
        setErr(data.error || 'Something went wrong');
      }
    } catch {
      setErr('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Success state — link sent
  if (sent) {
    return (
      <section className="auth-page">
        <div className="auth-page__container">
          <div className="magic-sent">
            <div className="magic-sent__icon">✨</div>
            <h1 className="magic-sent__title">CHECK YOUR INBOX</h1>
            <p className="magic-sent__desc">
              We sent a magic link to <strong>{contact}</strong>
            </p>
            <p className="magic-sent__timer">Valid for 15 minutes. Check spam folder too.</p>

            {devUrl && (
              <div className="magic-sent__dev">
                <p style={{ fontSize: 11, color: '#C9A84C', marginBottom: 8, letterSpacing: '0.1em' }}>
                  DEV MODE — Click to verify:
                </p>
                <a href={devUrl} className="magic-sent__dev-link">
                  Open verify link →
                </a>
              </div>
            )}

            <button
              onClick={() => { setSent(false); setDevUrl(''); }}
              className="magic-sent__retry"
            >
              ← Send again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__header">
          <h1 className="auth-page__title">GET ACCESS</h1>
          <p className="auth-page__subtitle">
            No password needed. We&apos;ll send you a magic link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Enter your email or phone number"
            value={contact}
            onChange={e => setContact(e.target.value)}
            required
            autoFocus
            className="magic-input"
          />

          {err && <p className="auth-form__error">{err}</p>}

          <button type="submit" className="magic-submit-btn" disabled={loading}>
            {loading ? 'SENDING...' : 'Send me access link ✨'}
          </button>
        </form>

        <div className="auth-page__divider">
          <span>OR</span>
        </div>

        <a
          href="https://t.me/svetglobal_bot"
          className="magic-telegram-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          Continue with Telegram →
        </a>

        <div className="auth-page__footer-links">
          <Link href="/login">Already have an account? Sign in</Link>
        </div>

        <p className="magic-security-note">
          🔒 No passwords stored. One-time link, single use, HTTPS only.
        </p>
      </div>
    </section>
  );
}
