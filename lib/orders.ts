import fs from 'fs';
import path from 'path';

/* ════════════════════════════════════════════════
   Simple JSON Order Storage
   No database needed — just a JSON file

   In production on Vercel, the filesystem is read-only
   so orders also live in Stripe Dashboard. This is
   a fallback/logging mechanism that works in dev
   and logs to console in prod.
   ════════════════════════════════════════════════ */

export interface StoredOrder {
  orderNumber: string;
  email: string;
  phone?: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  total: number;
  shipping: { name: string; address: any; phone?: string } | null;
  status: string;
  stripeSessionId?: string;
  createdAt: string;
}

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

function readOrders(): StoredOrder[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {
    // File doesn't exist or can't be read
  }
  return [];
}

function writeOrders(orders: StoredOrder[]) {
  try {
    const dir = path.dirname(ORDERS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  } catch (err) {
    // On Vercel (read-only fs), this will fail — that's fine, orders are in Stripe
    console.log('[Orders] Cannot write to filesystem (expected on Vercel):', err);
  }
}

export async function saveOrder(order: StoredOrder): Promise<void> {
  // Always log to console (visible in Vercel logs)
  console.log(`[Order Saved] ${order.orderNumber} — ${order.email} — $${(order.total / 100).toFixed(2)}`);
  console.log(JSON.stringify(order, null, 2));

  // Try to persist to file (works in dev, not on Vercel)
  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);
}

export async function getOrder(orderNumber: string): Promise<StoredOrder | null> {
  const orders = readOrders();
  return orders.find(o => o.orderNumber === orderNumber) || null;
}

export async function getAllOrders(): Promise<StoredOrder[]> {
  return readOrders();
}
