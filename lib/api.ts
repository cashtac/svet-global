const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  price: number; // cents
  compareAtPrice?: number;
  currency: string;
  images: string[];
  sizes: string[];
  badge?: string;
  color?: string;
  category?: string;
  status: string;
}

export interface OrderItem {
  id: string;
  name: string;
  size?: string;
  quantity: number;
  unitPrice: number;
  product: {
    name: string;
    slug: string;
    images: string[];
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'API error');
  return json.data as T;
}

export async function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>('/store/products');
}

export async function getProduct(slug: string): Promise<Product> {
  return apiFetch<Product>(`/store/products/${slug}`);
}

export async function createCheckout(email: string, items: { productId: string; size?: string; quantity: number }[]): Promise<{ orderNumber: string; checkoutUrl?: string }> {
  return apiFetch('/store/checkout', {
    method: 'POST',
    body: JSON.stringify({ email, items }),
  });
}

export async function getOrder(orderNumber: string): Promise<Order> {
  return apiFetch<Order>(`/store/order/${orderNumber}`);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}
