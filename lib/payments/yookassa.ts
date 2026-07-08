/**
 * YooKassa Payment Integration
 * Russian payment processor — supports Mir, SBP, bank cards
 * 
 * Credentials from environment:
 *   YOOKASSA_SHOP_ID — your shop ID
 *   YOOKASSA_SECRET_KEY — your secret key
 * 
 * Docs: https://yookassa.ru/developers
 */

const SHOP_ID = process.env.YOOKASSA_SHOP_ID;
const SECRET_KEY = process.env.YOOKASSA_SECRET_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://ru.svet.global';
const API_BASE = 'https://api.yookassa.ru/v3';

export function isYooKassaConfigured(): boolean {
  return !!(SHOP_ID && SECRET_KEY);
}

function getAuthHeader(): string {
  return 'Basic ' + Buffer.from(`${SHOP_ID}:${SECRET_KEY}`).toString('base64');
}

function generateIdempotenceKey(): string {
  return `svet-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export interface YooKassaPaymentRequest {
  amount: number; // in RUB (whole number, e.g. 6990)
  description: string;
  email: string;
  orderNumber: string;
  items: Array<{
    name: string;
    price: number; // per unit in RUB
    quantity: number;
    size?: string;
  }>;
}

export interface YooKassaPayment {
  id: string;
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  confirmation?: {
    type: string;
    confirmation_url: string;
  };
}

/**
 * Create a YooKassa payment and return the redirect URL.
 * Supports: bank_card (Visa/MC/Mir), sbp, yoo_money
 */
export async function createYooKassaPayment(req: YooKassaPaymentRequest): Promise<YooKassaPayment> {
  if (!SHOP_ID || !SECRET_KEY) {
    throw new Error('YooKassa not configured. Set YOOKASSA_SHOP_ID and YOOKASSA_SECRET_KEY.');
  }

  const body = {
    amount: {
      value: req.amount.toFixed(2),
      currency: 'RUB',
    },
    capture: true,
    confirmation: {
      type: 'redirect',
      return_url: `${SITE_URL}/success?order=${req.orderNumber}`,
    },
    description: req.description,
    metadata: {
      order_number: req.orderNumber,
      email: req.email,
      source: 'ru.svet.global',
    },
    receipt: {
      customer: { email: req.email },
      items: req.items.map(item => ({
        description: item.size ? `${item.name} (${item.size})` : item.name,
        quantity: String(item.quantity),
        amount: {
          value: item.price.toFixed(2),
          currency: 'RUB',
        },
        vat_code: 1, // НДС не облагается (for pre-orders)
      })),
    },
  };

  const response = await fetch(`${API_BASE}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthHeader(),
      'Idempotence-Key': generateIdempotenceKey(),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('[YooKassa Error]', response.status, errorBody);
    throw new Error(`YooKassa payment creation failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Get payment status by ID
 */
export async function getYooKassaPayment(paymentId: string): Promise<YooKassaPayment> {
  if (!SHOP_ID || !SECRET_KEY) {
    throw new Error('YooKassa not configured.');
  }

  const response = await fetch(`${API_BASE}/payments/${paymentId}`, {
    headers: {
      'Authorization': getAuthHeader(),
    },
  });

  if (!response.ok) {
    throw new Error(`YooKassa payment lookup failed: ${response.status}`);
  }

  return response.json();
}
