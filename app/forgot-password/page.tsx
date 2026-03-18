'use client';

import { useState } from 'react';
import Link from 'next/link';
import { forgotPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');

    try {
      await forgotPassword(email, dateOfBirth, city);
      setSent(true);
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <section className="auth-page">
        <div className="auth-page__container">
          <div className="auth-page__header">
            <h1 className="auth-page__title">CHECK YOUR EMAIL</h1>
            <p className="auth-page__subtitle">If we found a matching account, a reset link has been sent.</p>
          </div>
          <Link href="/login" className="add-to-cart" style={{ display: 'block', textAlign: 'center' }}>
            BACK TO LOGIN
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__header">
          <h1 className="auth-page__title">RESET PASSWORD</h1>
          <p className="auth-page__subtitle">Verify your identity to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <input type="date" placeholder="Date of Birth" value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)} required />
          <input type="text" placeholder="City" value={city}
            onChange={e => setCity(e.target.value)} required />

          {err && <p className="auth-form__error">{err}</p>}

          <button type="submit" className="add-to-cart" disabled={loading}>
            {loading ? 'VERIFYING...' : 'RESET PASSWORD'}
          </button>
        </form>

        <div className="auth-page__footer-links">
          <Link href="/login">Back to login</Link>
        </div>
      </div>
    </section>
  );
}
