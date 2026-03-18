'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    dateOfBirth: '', sex: '', city: '',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  function set(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setErr('Passwords do not match');
    }
    setLoading(true);
    setErr('');

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        dateOfBirth: form.dateOfBirth || undefined,
        sex: form.sex || undefined,
        city: form.city || undefined,
      });
      router.push('/account?registered=true');
    } catch (error: any) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__header">
          <h1 className="auth-page__title">CREATE ACCOUNT</h1>
          <p className="auth-page__subtitle">One account for Svetrix OS, Svetrix AI, and SVET.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" placeholder="Full Name" value={form.name}
            onChange={e => set('name', e.target.value)} required />
          <input type="email" placeholder="Email" value={form.email}
            onChange={e => set('email', e.target.value)} required />
          <input type="password" placeholder="Password (min 8 characters)" value={form.password}
            onChange={e => set('password', e.target.value)} required minLength={8} />
          <input type="password" placeholder="Confirm Password" value={form.confirmPassword}
            onChange={e => set('confirmPassword', e.target.value)} required minLength={8} />

          <div className="auth-form__divider">
            <span>RECOVERY INFO</span>
          </div>
          <p className="auth-form__hint">
            Used to verify your identity if you forget your password.
          </p>

          <input type="date" placeholder="Date of Birth" value={form.dateOfBirth}
            onChange={e => set('dateOfBirth', e.target.value)} />

          <select value={form.sex} onChange={e => set('sex', e.target.value)}>
            <option value="">Sex (optional)</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
          </select>

          <input type="text" placeholder="City (optional)" value={form.city}
            onChange={e => set('city', e.target.value)} />

          {err && <p className="auth-form__error">{err}</p>}

          <button type="submit" className="add-to-cart" disabled={loading}>
            {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="auth-page__footer-links">
          <Link href="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </section>
  );
}
