'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { formatPrice, isRussia } from '@/lib/locale';

const ru = isRussia();

function OrderContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderNumber = params.id as string;
  const status = searchParams.get('status');

  return (
    <section className="order-page">
      <div className="order-page__container">
        {status === 'success' ? (
          <>
            <div className="order-page__icon">✓</div>
            <h1 className="order-page__title">
              {ru ? 'СПАСИБО' : 'THANK YOU'}
            </h1>
            <p className="order-page__number">
              {ru ? 'Заказ' : 'Order'} #{orderNumber}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 32, lineHeight: 1.8 }}>
              {ru
                ? 'Ваш заказ получен. Мы отправим подтверждение на вашу почту.'
                : 'Your order has been received. We\'ll send a confirmation to your email.'}
              <br />
              {ru
                ? 'Спасибо, что вы с нами. ☀'
                : 'Thank you for being part of the light. ☀'}
            </p>

            <Link href="/shop" className="btn-primary" style={{ marginTop: 32, display: 'inline-flex' }}>
              {ru ? 'Продолжить покупки' : 'Continue Shopping'}
            </Link>
          </>
        ) : (
          <>
            <h1 className="order-page__title">
              {ru ? 'ЗАКАЗ' : 'ORDER'} #{orderNumber}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginTop: 32, lineHeight: 1.8 }}>
              {ru
                ? 'Если у вас есть вопросы по заказу, свяжитесь с нами.'
                : 'If you have questions about your order, please contact us.'}
            </p>
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
          <p style={{ color: 'var(--text-muted)' }}>
            {ru ? 'Загрузка...' : 'Loading...'}
          </p>
        </div>
      </section>
    }>
      <OrderContent />
    </Suspense>
  );
}
