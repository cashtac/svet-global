'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice, createCheckout } from '@/lib/api';
import type { Metadata } from 'next';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, count } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!email || items.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const result = await createCheckout(email, items.map(i => ({
        productId: i.productId,
        size: i.size,
        quantity: i.quantity,
      })));

      if (result.checkoutUrl) {
        clearCart();
        window.location.href = result.checkoutUrl;
      } else {
        // Stub mode
        clearCart();
        window.location.href = `/order/${result.orderNumber}?status=success`;
      }
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (count === 0) {
    return (
      <section className="cart-page">
        <div className="cart-page__container">
          <h1 className="cart-page__title">YOUR CART</h1>
          <div className="cart-empty">
            <div className="cart-empty__icon">🛒</div>
            <p className="cart-empty__text">Your cart is empty</p>
            <Link href="/shop" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-page__container">
        <h1 className="cart-page__title">YOUR CART</h1>

        {items.map(item => (
          <div key={`${item.productId}-${item.size}`} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item__image" />
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
            <span>FREE</span>
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
          />
          {error && (
            <p style={{ color: 'var(--accent)', fontSize: 14, marginBottom: 16 }}>{error}</p>
          )}
          <button type="submit" className="add-to-cart" disabled={loading || !email}>
            {loading ? 'PROCESSING...' : 'CHECKOUT'}
          </button>
        </form>
      </div>
    </section>
  );
}
