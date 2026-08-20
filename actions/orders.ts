'use server';

import { query, ensureTablesExist } from '@/lib/db';
import { CreateOrderInput, GeminiOrder, StoreSettings } from '@/lib/types';

export async function getStoreSettings(): Promise<StoreSettings> {
  await ensureTablesExist();
  try {
    const rows = await query<StoreSettings>(
      `SELECT * FROM gemini_store_settings WHERE id = 'default' LIMIT 1`
    );
    if (rows.length > 0) {
      return {
        ...rows[0],
        price_tnd: Number(rows[0].price_tnd),
        original_price_tnd: Number(rows[0].original_price_tnd),
        stock_remaining: Number(rows[0].stock_remaining),
      };
    }
  } catch (error) {
    console.error('Failed to get store settings, using defaults:', error);
  }

  const envPrice = Number(process.env.DEFAULT_PRICE_TND) || 80.00;
  const envOrigPrice = Number(process.env.DEFAULT_ORIGINAL_PRICE_TND) || 1120.00;

  return {
    id: 'default',
    product_title: process.env.DEFAULT_PRODUCT_TITLE || 'Google Gemini Advanced (18 Months Plan)',
    price_tnd: envPrice,
    original_price_tnd: envOrigPrice,
    whatsapp_number: process.env.DEFAULT_WHATSAPP_NUMBER || '+21656000000',
    stock_remaining: 9,
    is_active: true,
    announcement_text: '⚡ Limited Stock: 18-Month Activation Codes at 88% OFF!',
  };
}

export async function createOrder(input: CreateOrderInput): Promise<{ success: boolean; order?: GeminiOrder; error?: string }> {
  await ensureTablesExist();

  try {
    const name = input.customer_name?.trim();
    const email = input.customer_email?.trim().toLowerCase();
    const phone = input.customer_phone?.trim();
    const quantity = Math.max(1, input.quantity || 1);
    const paymentMethod = input.payment_method || 'WhatsApp / D17';
    const notes = input.customer_notes?.trim() || null;

    if (!name || !email || !phone) {
      return { success: false, error: 'Please fill in all required fields (Name, Email, Phone/WhatsApp).' };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    // Get current price
    const settings = await getStoreSettings();
    const unitPrice = settings.price_tnd || 129.00;
    const totalPrice = unitPrice * quantity;

    // Generate unique human-readable order number
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `GEM-${randomDigits}`;

    const insertQuery = `
      INSERT INTO gemini_pro_orders (
        order_number,
        customer_name,
        customer_email,
        customer_phone,
        quantity,
        unit_price,
        total_price,
        currency,
        payment_method,
        status,
        customer_notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'PENDING', $10)
      RETURNING *;
    `;

    const result = await query<GeminiOrder>(insertQuery, [
      orderNumber,
      name,
      email,
      phone,
      quantity,
      unitPrice,
      totalPrice,
      'TND',
      paymentMethod,
      notes,
    ]);

    if (result.length === 0) {
      return { success: false, error: 'Failed to create order. Please try again.' };
    }

    // Decrement stock if stock > 0
    try {
      await query(`
        UPDATE gemini_store_settings
        SET stock_remaining = GREATEST(0, stock_remaining - $1)
        WHERE id = 'default' AND stock_remaining > 0
      `, [quantity]);
    } catch (e) {
      // Non-blocking
    }

    const createdOrder = result[0];
    return {
      success: true,
      order: {
        ...createdOrder,
        unit_price: Number(createdOrder.unit_price),
        total_price: Number(createdOrder.total_price),
      },
    };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message || 'Internal server error while placing order.' };
  }
}

export async function getOrderByNumber(orderNumber: string): Promise<GeminiOrder | null> {
  await ensureTablesExist();
  try {
    const rows = await query<GeminiOrder>(
      `SELECT * FROM gemini_pro_orders WHERE UPPER(order_number) = UPPER($1) LIMIT 1`,
      [orderNumber.trim()]
    );
    if (rows.length === 0) return null;
    return {
      ...rows[0],
      unit_price: Number(rows[0].unit_price),
      total_price: Number(rows[0].total_price),
    };
  } catch (error) {
    console.error('Error fetching order by number:', error);
    return null;
  }
}

export async function lookupOrders(queryText: string): Promise<GeminiOrder[]> {
  await ensureTablesExist();
  try {
    const cleanQuery = queryText.trim();
    if (!cleanQuery) return [];

    const rows = await query<GeminiOrder>(
      `SELECT * FROM gemini_pro_orders 
       WHERE UPPER(order_number) = UPPER($1)
          OR LOWER(customer_email) = LOWER($1)
          OR customer_phone ILIKE $2
       ORDER BY created_at DESC 
       LIMIT 10`,
      [cleanQuery, `%${cleanQuery}%`]
    );

    return rows.map((r) => ({
      ...r,
      unit_price: Number(r.unit_price),
      total_price: Number(r.total_price),
    }));
  } catch (error) {
    console.error('Error looking up orders:', error);
    return [];
  }
}
