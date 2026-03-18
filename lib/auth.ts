/**
 * Auth API client — connects to Svetrix OS auth endpoints
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface SvetrixUser {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  discordId?: string;
  discordUsername?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  sex?: string;
  city?: string;
  totpEnabled: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

async function authFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'Request failed');
  return json.data;
}

export async function register(data: {
  name: string; email: string; password: string;
  dateOfBirth?: string; sex?: string; city?: string;
}) {
  return authFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) });
}

export async function login(email: string, password: string, totpCode?: string) {
  return authFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, totpCode }),
  });
}

export async function logout() {
  return authFetch('/auth/logout', { method: 'POST' });
}

export async function getMe(): Promise<SvetrixUser | null> {
  try {
    const data = await authFetch('/auth/me');
    return data.user;
  } catch {
    return null;
  }
}

export async function forgotPassword(email: string, dateOfBirth: string, city: string) {
  return authFetch('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email, dateOfBirth, city }),
  });
}

export async function resetPassword(token: string, password: string) {
  return authFetch('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });
}

export async function setup2FA() {
  return authFetch('/auth/2fa/setup', { method: 'POST' });
}

export async function verify2FA(code: string) {
  return authFetch('/auth/2fa/verify', { method: 'POST', body: JSON.stringify({ code }) });
}

export function getDiscordLoginUrl() {
  return `${API_BASE}/auth/discord`;
}
