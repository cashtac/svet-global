'use client';

import { useState, useEffect } from 'react';

/* ════════════════════════════════════════════════
   /admin/bot — SVET Telegram Bot Admin Panel
   Anonymized user display (USR-[hash] only)
   ════════════════════════════════════════════════ */

interface BotStats {
  totalUsers: number;
  verifiedUsers: number;
  activeAccess: number;
  botActive: boolean;
  webhookUrl: string | null;
  userList: Array<{
    id: string;
    status: string;
    symbols: number;
    verified: boolean;
  }>;
}

export default function BotAdminPage() {
  const [stats, setStats] = useState<BotStats | null>(null);
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [webhookResult, setWebhookResult] = useState('');

  async function loadStats() {
    setLoading(true);
    try {
      const res = await fetch('/api/telegram/admin', {
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = await res.json();
      if (data.ok) {
        setStats(data.stats);
        setAuthenticated(true);
        setError('');
      } else {
        setError('Access denied');
      }
    } catch {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  }

  async function setupWebhook() {
    try {
      const res = await fetch('/api/telegram/admin', {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = await res.json();
      setWebhookResult(JSON.stringify(data, null, 2));
      if (data.ok) loadStats();
    } catch {
      setWebhookResult('Failed to set webhook');
    }
  }

  // Login screen
  if (!authenticated) {
    return (
      <section className="bot-admin">
        <div className="bot-admin__login">
          <h1 className="bot-admin__title">🤖 SVET BOT ADMIN</h1>
          <input
            type="password"
            placeholder="Admin secret"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            className="magic-input"
            onKeyDown={e => e.key === 'Enter' && loadStats()}
          />
          {error && <p className="auth-form__error">{error}</p>}
          <button onClick={loadStats} className="magic-submit-btn" disabled={loading}>
            {loading ? 'LOADING...' : 'ACCESS PANEL'}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bot-admin">
      <div className="bot-admin__container">
        <h1 className="bot-admin__title">🤖 SVET BOT ADMIN</h1>

        {/* Status cards */}
        <div className="bot-admin__stats">
          <div className="bot-admin__stat-card">
            <span className="bot-admin__stat-value">{stats?.totalUsers || 0}</span>
            <span className="bot-admin__stat-label">Total Users</span>
          </div>
          <div className="bot-admin__stat-card">
            <span className="bot-admin__stat-value">{stats?.verifiedUsers || 0}</span>
            <span className="bot-admin__stat-label">Verified</span>
          </div>
          <div className="bot-admin__stat-card">
            <span className="bot-admin__stat-value">{stats?.activeAccess || 0}</span>
            <span className="bot-admin__stat-label">Active AI</span>
          </div>
          <div className="bot-admin__stat-card">
            <span className="bot-admin__stat-value">{stats?.botActive ? '🟢' : '🔴'}</span>
            <span className="bot-admin__stat-label">Bot Status</span>
          </div>
        </div>

        {/* Webhook setup */}
        <div className="bot-admin__section">
          <h2 className="bot-admin__section-title">WEBHOOK</h2>
          <p className="bot-admin__webhook-url">
            {stats?.webhookUrl || 'Not configured — add TELEGRAM_BOT_TOKEN'}
          </p>
          <button onClick={setupWebhook} className="bot-admin__action-btn">
            Set Webhook + Register Commands
          </button>
          {webhookResult && (
            <pre className="bot-admin__result">{webhookResult}</pre>
          )}
        </div>

        {/* User list (anonymized) */}
        <div className="bot-admin__section">
          <h2 className="bot-admin__section-title">USERS</h2>
          <p className="bot-admin__privacy-note">
            🔒 All names removed. Only USR-[hash] displayed. Exception: owner account.
          </p>
          {stats?.userList && stats.userList.length > 0 ? (
            <table className="bot-admin__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Symbols</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>
                {stats.userList.map((user, i) => (
                  <tr key={i}>
                    <td className="bot-admin__user-id">{user.id}</td>
                    <td>{user.status === 'none' ? '—' : user.status.toUpperCase()}</td>
                    <td>{user.symbols}/9</td>
                    <td>{user.verified ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: '#555', fontStyle: 'italic' }}>No users yet.</p>
          )}
        </div>

        {/* Analytics placeholder */}
        <div className="bot-admin__section">
          <h2 className="bot-admin__section-title">ANALYTICS</h2>
          <div className="bot-admin__placeholder">
            <p>📊 Analytics — coming soon</p>
            <p style={{ fontSize: 13, color: '#555' }}>скоро напишу</p>
          </div>
        </div>
      </div>
    </section>
  );
}
