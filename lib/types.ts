export type OrderStatus = 'PENDING' | 'PAID' | 'DELIVERED' | 'CANCELLED';

export interface GeminiOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  currency: string;
  payment_method: string;
  payment_proof?: string | null;
  status: OrderStatus;
  activation_link?: string | null;
  activation_instructions?: string | null;
  customer_notes?: string | null;
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
  delivered_at?: string | null;
}

export interface StoreSettings {
  id: string;
  product_title: string;
  price_tnd: number;
  original_price_tnd: number;
  whatsapp_number: string;
  stock_remaining: number;
  is_active: boolean;
  announcement_text: string;
  updated_at?: string;
}

export interface CreateOrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  quantity?: number;
  payment_method: string;
  customer_notes?: string;
}

export interface AdminMetrics {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  paidOrders: number;
  recentOrders: GeminiOrder[];
}
