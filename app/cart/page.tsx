'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/api';
import { trackBeginCheckout } from '@/components/Analytics';

/* ════════════════════════════════════════════════
   CART — Full checkout flow via /api/checkout
   Works in both demo mode and with Stripe
   ════════════════════════════════════════════════ */

const PLACEHOLDER_SVG = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="#111"/><text x="40" y="42" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="900" fill="#333" letter-spacing="2">SVET</text></svg>')}`;

function CartPageInner() {
  const { items, removeItem, updateQuantity, clearCart, total, count } = useCart();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCancelBanner, setShowCancelBanner] = useState(false);

  // Check for cancelled checkout
  useEffect(() => {
    if (searchParams.get('cancelled') === 'true') {
      setShowCancelBanner(true);
      // Clean up URL without reload
      window.history.replaceState({}, '', '/cart');
    }
  }, [searchParams]);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!email || items.length === 0) return;

    setLoading(true);
    setError('');

    trackBeginCheckout(total, count);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: items.map(i => ({
            productId: i.productId,
            stripePriceId: i.stripePriceId,
            name: i.name,
            price: i.price,
            size: i.size,
            quantity: i.quantity,
          })),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Checkout failed');
      }

      const data = json.data;

      if (data.checkoutUrl) {
        // Stripe — redirect (cart cleared on /success page)
        window.location.href = data.checkoutUrl;
      } else {
        // Demo mode
        clearCart();
        setSuccess(`✅ Order ${data.orderNumber} created!`);
      }
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section className="cart-page">
        <div className="cart-page__container">
          <div className="cart-success">
            <div className="cart-success__icon">☀</div>
            <h2 className="cart-success__title">Order Placed</h2>
            <p className="cart-success__msg">{success}</p>
            <Link href="/shop" className="hero__cta" style={{ marginTop: 24 }}>
              CONTINUE SHOPPING
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="cart-page">
        <div className="cart-page__container">
          <h1 className="cart-page__title">CART</h1>
          <div className="cart-empty">
            <div className="cart-empty__icon">🛒</div>
            <p className="cart-empty__text">Empty</p>
            <Link href="/shop" className="btn-primary">Shop</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-page__container">
        <h1 className="cart-page__title">CART</h1>

        {/* Cancel banner */}
        {showCancelBanner && (
          <div style={{
            background: 'rgba(201, 168, 76, 0.08)',
            border: '1px solid rgba(201, 168, 76, 0.2)',
            borderRadius: 10,
            padding: '14px 20px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ color: '#C9A84C', fontSize: 13, fontWeight: 500 }}>
              Payment was cancelled. Your items are still here — pick up where you left off.
            </span>
            <button
              onClick={() => setShowCancelBanner(false)}
              style={{ color: '#666', fontSize: 16, cursor: 'pointer', background: 'none', border: 'none', padding: '0 4px' }}
            >✕</button>
          </div>
        )}

        {items.map(item => (
          <div key={`${item.productId}-${item.size}`} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item__image"
              onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER_SVG; }}
            />
            <div>
              <div className="cart-item__name">{item.name}</div>
              <div className="cart-item__size">Size: {item.size}</div>
              <div className="cart-item__qty">
                <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>+</button>
              </div>
              <button className="cart-item__remove" onClick={() => removeItem(item.productId, item.size)}>Remove</button>
            </div>
            <div className="cart-item__price">{formatPrice(item.price * item.quantity)}</div>
          </div>
        ))}

        <div className="cart-summary">
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span style={{ color: '#4CAF50', fontSize: 13 }}>Free in the US</span>
          </div>
          <div style={{ fontSize: 11, color: '#666', textAlign: 'right', marginTop: -4, marginBottom: 8 }}>
            International orders — shipping calculated separately
          </div>
          <div className="cart-summary__row total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <form className="cart-checkout-form" onSubmit={handleCheckout}>
          <input
            type="email"
            placeholder="Email for order confirmation"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="magic-input"
          />
          {error && (
            <p style={{ color: 'var(--accent)', fontSize: 14, marginTop: 8 }}>{error}</p>
          )}
          <button type="submit" className="magic-submit-btn" disabled={loading || !email}>
            {loading ? '⏳ PROCESSING...' : `💳 CHECKOUT · ${formatPrice(total)}`}
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: '#444', marginTop: 12, letterSpacing: '0.05em' }}>
            🔒 Secure checkout via Stripe · Apple Pay · Google Pay
          </p>
        </form>
      </div>
    </section>
  );
}

export default function CartPage() {
  return (
    <Suspense>
      <CartPageInner />
    </Suspense>
  );
}
