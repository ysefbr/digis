const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:mfhjeKBGgDmtFpYpoUizYfMjSoVWNNLQ@reseau.proxy.rlwy.net:11774/railway",
  ssl: { rejectUnauthorized: false }
});

async function updateDbPrice() {
  try {
    const client = await pool.connect();
    await client.query(`UPDATE gemini_store_settings SET price_tnd = 80.00 WHERE id = 'default'`);
    console.log("Database price updated to 80 TND");
    client.release();
    await pool.end();
  } catch (err) {
    console.error(err);
  }
}

updateDbPrice();
