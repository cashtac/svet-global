'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMe, logout, setup2FA, verify2FA, SvetrixUser } from '@/lib/auth';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<SvetrixUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 2FA
  const [show2FA, setShow2FA] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [secret2FA, setSecret2FA] = useState('');
  const [code2FA, setCode2FA] = useState('');
  const [msg2FA, setMsg2FA] = useState('');

  useEffect(() => {
    getMe().then(u => { setUser(u); setLoading(false); });
  }, []);

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  async function handleSetup2FA() {
    try {
      const data = await setup2FA();
      setQrCode(data.qrCode);
      setSecret2FA(data.secret);
      setShow2FA(true);
    } catch (err: any) {
      setMsg2FA(err.message);
    }
  }

  async function handleVerify2FA() {
    try {
      await verify2FA(code2FA);
      setMsg2FA('✓ 2FA enabled!');
      setShow2FA(false);
      const u = await getMe();
      setUser(u);
    } catch (err: any) {
      setMsg2FA(err.message);
    }
  }

  if (loading) {
    return (
      <section className="auth-page">
        <div className="auth-page__container">
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="auth-page">
        <div className="auth-page__container">
          <div className="auth-page__header">
            <h1 className="auth-page__title">ACCOUNT</h1>
            <p className="auth-page__subtitle">Sign in to access your Svetrix account.</p>
          </div>
          <Link href="/login" className="add-to-cart" style={{ display: 'block', textAlign: 'center' }}>
            SIGN IN
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__header">
          <div className="account-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <h1 className="auth-page__title">{user.name}</h1>
          <p className="auth-page__subtitle">{user.email}</p>
        </div>

        {/* Account Info */}
        <div className="account-card">
          <div className="account-card__row">
            <span className="account-card__label">Email</span>
            <span className="account-card__value">
              {user.email}
              {user.emailVerified
                ? <span style={{ color: '#22c55e', marginLeft: 8 }}>✓ Verified</span>
                : <span style={{ color: 'var(--accent)', marginLeft: 8 }}>⚠ Unverified</span>
              }
            </span>
          </div>
          {user.discordUsername && (
            <div className="account-card__row">
              <span className="account-card__label">Discord</span>
              <span className="account-card__value">@{user.discordUsername}</span>
            </div>
          )}
          <div className="account-card__row">
            <span className="account-card__label">Role</span>
            <span className="account-card__value">{user.role}</span>
          </div>
          <div className="account-card__row">
            <span className="account-card__label">2FA</span>
            <span className="account-card__value">
              {user.totpEnabled
                ? <span style={{ color: '#22c55e' }}>✓ Enabled</span>
                : <span style={{ color: 'var(--text-muted)' }}>Not enabled</span>
              }
            </span>
          </div>
          {user.city && (
            <div className="account-card__row">
              <span className="account-card__label">City</span>
              <span className="account-card__value">{user.city}</span>
            </div>
          )}
          <div className="account-card__row">
            <span className="account-card__label">Member since</span>
            <span className="account-card__value">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="account-ecosystem">
          <div className="account-ecosystem__label">YOUR SVETRIX ECOSYSTEM</div>
          <div className="account-ecosystem__grid">
            <a href="https://svetrix.com" target="_blank" rel="noopener noreferrer" className="account-ecosystem__item">
              ⚡ Svetrix OS
            </a>
            <a href="https://svetrix.com/maestro" target="_blank" rel="noopener noreferrer" className="account-ecosystem__item">
              🧠 Svetrix AI
            </a>
            <Link href="/shop" className="account-ecosystem__item account-ecosystem__item--active">
              ☀ SVET Shop
            </Link>
          </div>
        </div>

        {/* 2FA Setup */}
        {!user.totpEnabled && (
          <div style={{ marginTop: 32 }}>
            {!show2FA ? (
              <button onClick={handleSetup2FA} className="btn-secondary">
                🔐 Enable 2FA
              </button>
            ) : (
              <div className="account-card" style={{ marginTop: 16 }}>
                <p style={{ marginBottom: 16, fontSize: 14, color: 'var(--text-secondary)' }}>
                  Scan this QR code with your authenticator app:
                </p>
                {qrCode && <img src={qrCode} alt="2FA QR Code" style={{ width: 200, margin: '0 auto 16px', display: 'block' }} />}
                <p style={{ fontSize: 12, color: 'var(--text-muted)', wordBreak: 'break-all', marginBottom: 16 }}>
                  Manual key: {secret2FA}
                </p>
                <input
                  type="text" placeholder="Enter 6-digit code"
                  value={code2FA} onChange={e => setCode2FA(e.target.value)}
                  maxLength={6}
                  style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: 18, textAlign: 'center', letterSpacing: '0.3em', marginBottom: 12 }}
                />
                <button onClick={handleVerify2FA} className="add-to-cart">
                  VERIFY & ENABLE
                </button>
              </div>
            )}
            {msg2FA && <p style={{ marginTop: 12, fontSize: 14, color: msg2FA.includes('✓') ? '#22c55e' : 'var(--accent)' }}>{msg2FA}</p>}
          </div>
        )}

        {/* Logout */}
        <button onClick={handleLogout} className="btn-secondary" style={{ marginTop: 32, width: '100%' }}>
          Sign Out
        </button>
      </div>
    </section>
  );
}
