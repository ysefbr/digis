'use server';

import { query, ensureTablesExist } from '@/lib/db';
import { GeminiOrder, OrderStatus, StoreSettings, AdminMetrics } from '@/lib/types';
import { verifyAdminSession, signAdminSession, clearAdminSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'admin_gemini_2026';

export async function adminLoginAction(password: string): Promise<{ success: boolean; error?: string }> {
  await ensureTablesExist();

  try {
    // Check if custom password is set in DB
    const settings = await query<{ admin_password_hash: string | null }>(
      `SELECT admin_password_hash FROM gemini_store_settings WHERE id = 'default' LIMIT 1`
    );

    const dbPassword = settings[0]?.admin_password_hash;
    const isValid = dbPassword ? password === dbPassword : password === DEFAULT_ADMIN_PASSWORD;

    if (!isValid) {
      return { success: false, error: 'Invalid admin credentials.' };
    }

    await signAdminSession({ role: 'admin' });
    return { success: true };
  } catch (error: any) {
    console.error('Admin login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
}

export async function adminLogoutAction() {
  await clearAdminSession();
  revalidatePath('/digismeda');
  return { success: true };
}

export async function checkIsAdmin(): Promise<boolean> {
  return await verifyAdminSession();
}

export async function getAdminDashboardData(filters?: { status?: string; search?: string }): Promise<{
  metrics: AdminMetrics;
  orders: GeminiOrder[];
  settings: StoreSettings;
} | null> {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) return null;

  await ensureTablesExist();

  // Metrics query
  const totalCountRes = await query<{ count: string; sum: string }>(
    `SELECT COUNT(*) as count, COALESCE(SUM(total_price), 0) as sum FROM gemini_pro_orders`
  );
  const pendingRes = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM gemini_pro_orders WHERE status = 'PENDING'`
  );
  const paidRes = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM gemini_pro_orders WHERE status = 'PAID'`
  );
  const deliveredRes = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM gemini_pro_orders WHERE status = 'DELIVERED'`
  );

  // Orders query with filtering
  let whereClauses: string[] = [];
  let params: any[] = [];
  let paramIndex = 1;

  if (filters?.status && filters.status !== 'ALL') {
    whereClauses.push(`status = $${paramIndex++}`);
    params.push(filters.status);
  }

  if (filters?.search && filters.search.trim()) {
    const s = `%${filters.search.trim()}%`;
    whereClauses.push(`(
      order_number ILIKE $${paramIndex} OR 
      customer_name ILIKE $${paramIndex} OR 
      customer_email ILIKE $${paramIndex} OR 
      customer_phone ILIKE $${paramIndex}
    )`);
    params.push(s);
    paramIndex++;
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
  const orders = await query<GeminiOrder>(
    `SELECT * FROM gemini_pro_orders ${whereSql} ORDER BY created_at DESC LIMIT 150`,
    params
  );

  const formattedOrders = orders.map((o) => ({
    ...o,
    unit_price: Number(o.unit_price),
    total_price: Number(o.total_price),
  }));

  // Settings
  const settingsRows = await query<StoreSettings>(
    `SELECT * FROM gemini_store_settings WHERE id = 'default' LIMIT 1`
  );
  const settings: StoreSettings = settingsRows[0]
    ? {
        ...settingsRows[0],
        price_tnd: Number(settingsRows[0].price_tnd),
        original_price_tnd: Number(settingsRows[0].original_price_tnd),
        stock_remaining: Number(settingsRows[0].stock_remaining),
      }
    : {
        id: 'default',
        product_title: 'Google Gemini Advanced (18 Months Plan)',
        price_tnd: 129,
        original_price_tnd: 1120,
        whatsapp_number: '+21656000000',
        stock_remaining: 9,
        is_active: true,
        announcement_text: '⚡ Limited Stock: 18-Month Activation Codes at 88% OFF!',
      };

  return {
    metrics: {
      totalOrders: Number(totalCountRes[0]?.count || 0),
      totalRevenue: Number(totalCountRes[0]?.sum || 0),
      pendingOrders: Number(pendingRes[0]?.count || 0),
      paidOrders: Number(paidRes[0]?.count || 0),
      deliveredOrders: Number(deliveredRes[0]?.count || 0),
      recentOrders: formattedOrders.slice(0, 5),
    },
    orders: formattedOrders,
    settings,
  };
}

export async function updateOrderStatusAction(orderId: string, status: OrderStatus, adminNotes?: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error('Unauthorized');

  await query(
    `UPDATE gemini_pro_orders 
     SET status = $1, 
         admin_notes = COALESCE($2, admin_notes), 
         updated_at = CURRENT_TIMESTAMP 
     WHERE id = $3`,
    [status, adminNotes || null, orderId]
  );

  revalidatePath('/digismeda');
  return { success: true };
}

export async function fulfillOrderAction(
  orderId: string,
  activationLink: string,
  instructions?: string
) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error('Unauthorized');

  await query(
    `UPDATE gemini_pro_orders 
     SET status = 'DELIVERED', 
         activation_link = $1, 
         activation_instructions = $2, 
         delivered_at = CURRENT_TIMESTAMP, 
         updated_at = CURRENT_TIMESTAMP 
     WHERE id = $3`,
    [activationLink.trim(), instructions?.trim() || null, orderId]
  );

  revalidatePath('/digismeda');
  return { success: true };
}

export async function updateStoreSettingsAction(settings: Partial<StoreSettings>, newPassword?: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error('Unauthorized');

  const updates: string[] = [];
  const params: any[] = [];
  let paramIdx = 1;

  if (settings.product_title !== undefined) {
    updates.push(`product_title = $${paramIdx++}`);
    params.push(settings.product_title);
  }
  if (settings.price_tnd !== undefined) {
    updates.push(`price_tnd = $${paramIdx++}`);
    params.push(settings.price_tnd);
  }
  if (settings.original_price_tnd !== undefined) {
    updates.push(`original_price_tnd = $${paramIdx++}`);
    params.push(settings.original_price_tnd);
  }
  if (settings.whatsapp_number !== undefined) {
    updates.push(`whatsapp_number = $${paramIdx++}`);
    params.push(settings.whatsapp_number);
  }
  if (settings.stock_remaining !== undefined) {
    updates.push(`stock_remaining = $${paramIdx++}`);
    params.push(settings.stock_remaining);
  }
  if (settings.is_active !== undefined) {
    updates.push(`is_active = $${paramIdx++}`);
    params.push(settings.is_active);
  }
  if (settings.announcement_text !== undefined) {
    updates.push(`announcement_text = $${paramIdx++}`);
    params.push(settings.announcement_text);
  }
  if (newPassword && newPassword.trim().length >= 6) {
    updates.push(`admin_password_hash = $${paramIdx++}`);
    params.push(newPassword.trim());
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`);

  if (updates.length > 1) {
    await query(
      `UPDATE gemini_store_settings SET ${updates.join(', ')} WHERE id = 'default'`,
      params
    );
  }

  revalidatePath('/digismeda');
  revalidatePath('/');
  return { success: true };
}

export async function deleteOrderAction(orderId: string) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) throw new Error('Unauthorized');

  await query(`DELETE FROM gemini_pro_orders WHERE id = $1`, [orderId]);
  revalidatePath('/digismeda');
  return { success: true };
}
