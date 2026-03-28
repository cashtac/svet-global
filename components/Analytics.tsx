'use client';

import Script from 'next/script';

/* ════════════════════════════════════════════════
   Google Analytics 4 + Meta Pixel
   
   Environment variables required:
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXX
   
   If not set, scripts will not render.
   ════════════════════════════════════════════════ */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function Analytics() {
  return (
    <>
      {/* ═══ Google Analytics 4 ═══ */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_title: document.title,
                send_page_view: true,
                cookie_flags: 'max-age=7200;secure;samesite=none',
              });
            `}
          </Script>
        </>
      )}

      {/* ═══ Meta (Facebook) Pixel ═══ */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}

/* ═══ E-Commerce Event Helpers ═══ */

// Track product views
export function trackViewProduct(product: { id: string; name: string; price: number; category?: string }) {
  if (typeof window === 'undefined') return;

  // GA4
  if (GA_ID && (window as any).gtag) {
    (window as any).gtag('event', 'view_item', {
      currency: 'USD',
      value: product.price / 100,
      items: [{
        item_id: product.id,
        item_name: product.name,
        item_category: product.category || 'Clothing',
        price: product.price / 100,
      }],
    });
  }

  // Meta
  if (META_PIXEL_ID && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price / 100,
      currency: 'USD',
    });
  }
}

// Track add to cart
export function trackAddToCart(product: { id: string; name: string; price: number; quantity: number }) {
  if (typeof window === 'undefined') return;

  if (GA_ID && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: (product.price * product.quantity) / 100,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price / 100,
        quantity: product.quantity,
      }],
    });
  }

  if (META_PIXEL_ID && (window as any).fbq) {
    (window as any).fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: (product.price * product.quantity) / 100,
      currency: 'USD',
    });
  }
}

// Track checkout initiation
export function trackBeginCheckout(total: number, itemCount: number) {
  if (typeof window === 'undefined') return;

  if (GA_ID && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: total / 100,
      items: [{ item_name: 'Cart', quantity: itemCount }],
    });
  }

  if (META_PIXEL_ID && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      value: total / 100,
      currency: 'USD',
      num_items: itemCount,
    });
  }
}

// Track purchase completion
export function trackPurchase(orderId: string, total: number) {
  if (typeof window === 'undefined') return;

  if (GA_ID && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: orderId,
      value: total / 100,
      currency: 'USD',
    });
  }

  if (META_PIXEL_ID && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: total / 100,
      currency: 'USD',
    });
  }
}
