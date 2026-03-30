'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart';

/* ════════════════════════════════════════════════
   SUCCESS PAGE — After Stripe payment
   Fetches session details, clears cart, shows confirmation
   ════════════════════════════════════════════════ */

interface SessionData {
  customer_email: string;
  amount_total: number;
  payment_status: string;
  metadata: { orderNumber?: string };
}

function SuccessPageInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cleared, setCleared] = useState(false);

  // Fetch session + clear cart once
  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSession(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  // Clear cart once after session loads
  useEffect(() => {
    if (session && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [session, cleared, clearCart]);

  if (loading) {
    return (
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 16, animation: 'pulse 1.5s ease-in-out infinite' }}>☀</div>
          <p style={{ letterSpacing: '0.1em', fontSize: 13 }}>CONFIRMING YOUR ORDER...</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 80px',
    }}>
      <div style={{
        maxWidth: 520,
        width: '100%',
        textAlign: 'center',
      }}>
        {/* Icon */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '2px solid rgba(34, 197, 94, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 32px',
          fontSize: 36,
        }}>
          ☀
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 800,
          letterSpacing: '0.06em',
          marginBottom: 12,
          color: 'var(--text-primary)',
        }}>
          Order confirmed.
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 16,
          lineHeight: 1.8,
          marginBottom: 32,
        }}>
          Thank you for being part of Drop 001.
        </p>

        {/* Order details card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '28px 24px',
          marginBottom: 32,
          textAlign: 'left',
        }}>
          {session?.customer_email && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Confirmation sent to</span>
              <span style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600 }}>
                {session.customer_email}
              </span>
            </div>
          )}

          {session?.metadata?.orderNumber && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Order number</span>
              <span style={{ color: '#C9A84C', fontSize: 14, fontWeight: 700, letterSpacing: '0.05em' }}>
                {session.metadata.orderNumber}
              </span>
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Payment</span>
            <span style={{ color: '#22c55e', fontSize: 14, fontWeight: 600 }}>
              ✓ {session?.payment_status === 'paid' ? 'Paid' : 'Confirmed'}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Estimated delivery</span>
            <span style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600 }}>
              Ships within 30 days
            </span>
          </div>
        </div>

        {/* Shipping note */}
        <p style={{
          color: 'var(--text-muted)',
          fontSize: 12,
          lineHeight: 1.8,
          marginBottom: 32,
        }}>
          You'll receive a shipping confirmation email with tracking once your order is on its way.
        </p>

        {/* CTA */}
        <Link href="/shop" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 32px',
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}>
          BACK TO SHOP
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </Link>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessPageInner />
    </Suspense>
  );
}
