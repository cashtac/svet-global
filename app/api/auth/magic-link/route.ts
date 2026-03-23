import { NextResponse } from 'next/server';
import crypto from 'crypto';

/* ════════════════════════════════════════════════
   Magic Link Auth — POST /api/auth/magic-link
   Body: { contact: "email@..." or "+1234..." }
   ════════════════════════════════════════════════ */

// In-memory store (replace with DB in production)
interface MagicLink {
  token: string;
  contact: string;
  expiresAt: number;
  used: boolean;
  createdAt: number;
}

// Rate limit: max 3 per contact per hour
interface RateEntry {
  count: number;
  windowStart: number;
}

const magicLinks = new Map<string, MagicLink>();
const rateLimits = new Map<string, RateEntry>();

// Export for verify route access
export { magicLinks };

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isPhone(s: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(s);
}

function checkRateLimit(contact: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(contact);
  const oneHour = 60 * 60 * 1000;

  if (!entry || (now - entry.windowStart) > oneHour) {
    rateLimits.set(contact, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const contact = body.contact?.trim();

    if (!contact) {
      return NextResponse.json(
        { ok: false, error: 'Email or phone number required' },
        { status: 400 }
      );
    }

    const contactIsEmail = isEmail(contact);
    const contactIsPhone = isPhone(contact);

    if (!contactIsEmail && !contactIsPhone) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email or phone number' },
        { status: 400 }
      );
    }

    // Rate limit check
    if (!checkRateLimit(contact)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Try again in an hour.' },
        { status: 429 }
      );
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Store magic link
    magicLinks.set(token, {
      token,
      contact,
      expiresAt,
      used: false,
      createdAt: Date.now(),
    });

    // Build verify URL
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://svet.global';
    const verifyUrl = `${baseUrl}/auth/verify?token=${token}`;

    if (contactIsEmail) {
      // Try Resend API if key exists
      const resendKey = process.env.RESEND_API_KEY;
      if (resendKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'SVET <noreply@svet.global>',
              to: contact,
              subject: '✨ Your SVET Access Link',
              html: `
                <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background: #0a0a0a; color: #fff;">
                  <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.2em; color: #C9A84C; text-align: center;">SVET</h1>
                  <p style="font-size: 16px; color: #999; text-align: center; margin: 24px 0;">Click below to access your account:</p>
                  <a href="${verifyUrl}" style="display: block; padding: 16px 32px; background: linear-gradient(135deg, #C9A84C, #a8893e); color: #0a0a0a; text-decoration: none; font-weight: 800; font-size: 14px; letter-spacing: 0.1em; text-align: center; border-radius: 10px; margin: 24px auto; max-width: 280px;">
                    ENTER SVET ✨
                  </a>
                  <p style="font-size: 12px; color: #555; text-align: center;">This link expires in 15 minutes. Do not share it.</p>
                </div>
              `,
            }),
          });
          console.log(`[Magic Link] Email sent to ${contact}`);
        } catch (emailErr) {
          console.error('[Magic Link] Email send failed:', emailErr);
        }
      } else {
        console.log(`[Magic Link] No RESEND_API_KEY — token for ${contact}: ${token}`);
        console.log(`[Magic Link] Verify URL: ${verifyUrl}`);
      }
    } else {
      // Phone — log for now (integrate Twilio later)
      console.log(`[Magic Link] SMS would be sent to ${contact}`);
      console.log(`[Magic Link] Verify URL: ${verifyUrl}`);
    }

    return NextResponse.json({
      ok: true,
      type: contactIsEmail ? 'email' : 'phone',
      message: contactIsEmail
        ? 'Magic link sent to your email!'
        : 'Magic link sent to your phone!',
      // In dev/demo mode, expose the token
      ...(process.env.NODE_ENV !== 'production' || !process.env.RESEND_API_KEY
        ? { _dev_verify_url: verifyUrl }
        : {}),
    });
  } catch (err: any) {
    console.error('[Magic Link] Error:', err);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
