'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { getOrder, Order, formatPrice } from '@/lib/api';

function OrderContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderNumber = params.id as string;
  const status = searchParams.get('status');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getOrder(orderNumber);
        setOrder(data);
      } catch {
        // Order might not be in DB yet in stub mode
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [orderNumber]);

  return (
    <section className="order-page">
      <div className="order-page__container">
        {status === 'success' && (
          <>
            <div className="order-page__icon">✓</div>
            <h1 className="order-page__title">THANK YOU</h1>
            <p className="order-page__number">Order #{orderNumber}</p>

            {order && (
              <div style={{ textAlign: 'left', marginTop: 32 }}>
                <div className="cart-summary">
                  <div className="cart-summary__row">
                    <span>Email</span>
                    <span>{order.email}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Status</span>
                    <span style={{ color: 'var(--accent)' }}>{order.status}</span>
                  </div>
                  <div className="cart-summary__row total">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            )}

            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 32, lineHeight: 1.8 }}>
              Your order has been received. We'll send a confirmation to your email.
              <br />Thank you for being part of the light. ☀
            </p>

            <Link href="/shop" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
              Continue Shopping
            </Link>
          </>
        )}

        {!status && (
          <>
            <h1 className="order-page__title">ORDER #{orderNumber}</h1>
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading order details...</p>
            ) : order ? (
              <div style={{ textAlign: 'left', marginTop: 32 }}>
                <div className="cart-summary">
                  <div className="cart-summary__row">
                    <span>Email</span>
                    <span>{order.email}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Status</span>
                    <span>{order.status}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Items</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="cart-summary__row total">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', marginTop: 32 }}>Order not found.</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <section className="order-page">
        <div className="order-page__container">
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
      </section>
    }>
      <OrderContent />
    </Suspense>
  );
}
