import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/* ════════════════════════════════════════════════
   Magic Link Verify — GET /api/auth/verify?token=XXX
   Validates token → creates session → returns user
   ════════════════════════════════════════════════ */

// Access the shared magic links store
// In production, this would be a database query
import { magicLinks } from '@/app/api/auth/magic-link/route';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { ok: false, error: 'Token required' },
      { status: 400 }
    );
  }

  const link = magicLinks.get(token);

  if (!link) {
    return NextResponse.json(
      { ok: false, error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  if (link.used) {
    return NextResponse.json(
      { ok: false, error: 'This link has already been used' },
      { status: 401 }
    );
  }

  if (Date.now() > link.expiresAt) {
    magicLinks.delete(token);
    return NextResponse.json(
      { ok: false, error: 'This link has expired' },
      { status: 401 }
    );
  }

  // Mark as used (single-use)
  link.used = true;

  // Create user session
  const userId = `svet_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const isNewUser = true; // In production, check if contact exists in users table

  const response = NextResponse.json({
    ok: true,
    user: {
      id: userId,
      contact: link.contact,
      isNewUser,
    },
    redirect: isNewUser ? '/profile?welcome=true' : '/profile',
  });

  // Set session cookie
  response.cookies.set('svet_session', JSON.stringify({
    userId,
    contact: link.contact,
    createdAt: Date.now(),
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  return response;
}
