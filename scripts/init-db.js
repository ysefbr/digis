const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:mfhjeKBGgDmtFpYpoUizYfMjSoVWNNLQ@reseau.proxy.rlwy.net:11774/railway";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDb() {
  const client = await pool.connect();
  console.log("🚀 Connecting to Railway PostgreSQL database...");

  try {
    // 1. Create orders table for Gemini Pro 18 Months
    console.log("Creating table: gemini_pro_orders...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS gemini_pro_orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_number VARCHAR(32) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(64) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        unit_price NUMERIC(10, 2) NOT NULL DEFAULT 129.00,
        total_price NUMERIC(10, 2) NOT NULL DEFAULT 129.00,
        currency VARCHAR(16) NOT NULL DEFAULT 'TND',
        payment_method VARCHAR(64) NOT NULL DEFAULT 'WhatsApp / D17',
        payment_proof TEXT,
        status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
        activation_link TEXT,
        activation_instructions TEXT,
        customer_notes TEXT,
        admin_notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        delivered_at TIMESTAMP WITH TIME ZONE
      );

      CREATE INDEX IF NOT EXISTS idx_gemini_orders_status ON gemini_pro_orders(status);
      CREATE INDEX IF NOT EXISTS idx_gemini_orders_phone ON gemini_pro_orders(customer_phone);
      CREATE INDEX IF NOT EXISTS idx_gemini_orders_email ON gemini_pro_orders(customer_email);
      CREATE INDEX IF NOT EXISTS idx_gemini_orders_created ON gemini_pro_orders(created_at DESC);
    `);
    console.log("✅ Table gemini_pro_orders ready!");

    // 2. Create store settings table
    console.log("Creating table: gemini_store_settings...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS gemini_store_settings (
        id VARCHAR(32) PRIMARY KEY DEFAULT 'default',
        product_title VARCHAR(255) NOT NULL DEFAULT 'Google Gemini Advanced (18 Months Plan)',
        price_tnd NUMERIC(10, 2) NOT NULL DEFAULT 129.00,
        original_price_tnd NUMERIC(10, 2) NOT NULL DEFAULT 1120.00,
        whatsapp_number VARCHAR(64) NOT NULL DEFAULT '+21656000000',
        stock_remaining INTEGER NOT NULL DEFAULT 9,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        announcement_text VARCHAR(500) DEFAULT '⚡ Limited Stock: 18-Month Activation Codes at 88% OFF!',
        admin_password_hash VARCHAR(255),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO gemini_store_settings (id, product_title, price_tnd, original_price_tnd, whatsapp_number, stock_remaining, is_active, announcement_text)
      VALUES ('default', 'Google Gemini Advanced (18 Months Plan)', 129.00, 1120.00, '+21656000000', 9, TRUE, '⚡ Limited Stock: 18-Month Activation Codes at 88% OFF!')
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log("✅ Table gemini_store_settings ready!");

    console.log("🎉 Database initialization completed successfully!");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

initDb();
