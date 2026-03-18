'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { login, getDiscordLoginUrl } from '@/lib/auth';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified');
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [needs2FA, setNeeds2FA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      await login(email, password, needs2FA ? totpCode : undefined);
      router.push('/account');
    } catch (error: any) {
      if (error.message === '2FA code required') {
        setNeeds2FA(true);
      } else {
        setErr(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__header">
          <h1 className="auth-page__title">SIGN IN</h1>
          <p className="auth-page__subtitle">One account. Every Svetrix product.</p>
        </div>

        {verified && (
          <div className="auth-page__alert auth-page__alert--success">
            ✓ Email verified! You can now sign in.
          </div>
        )}

        {error && (
          <div className="auth-page__alert auth-page__alert--error">
            {error === 'discord_failed' ? 'Discord login failed. Try again.' : 'Login failed.'}
          </div>
        )}

        {/* Discord */}
        <a href={getDiscordLoginUrl()} className="auth-page__discord-btn">
          <svg width="20" height="20" viewBox="0 0 71 55" fill="white">
            <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3## 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"/>
          </svg>
          Continue with Discord
        </a>

        <div className="auth-page__divider">
          <span>OR</span>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)} required
          />

          {needs2FA && (
            <input
              type="text" placeholder="2FA Code (from authenticator app)"
              value={totpCode} onChange={e => setTotpCode(e.target.value)}
              autoFocus maxLength={6}
            />
          )}

          {err && <p className="auth-form__error">{err}</p>}

          <button type="submit" className="add-to-cart" disabled={loading}>
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="auth-page__footer-links">
          <Link href="/register">Create an account</Link>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<section className="auth-page"><div className="auth-page__container"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div></section>}>
      <LoginForm />
    </Suspense>
  );
}
