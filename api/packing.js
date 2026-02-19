import { neon } from '@neondatabase/serverless';
import { verifyAuth } from './_auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = verifyAuth(req);
  if (!user) return res.status(401).json({ error: 'Ikke autentisert' });

  const sql = neon(process.env.DATABASE_URL);

  // Auto-create table
  await sql`
    CREATE TABLE IF NOT EXISTS packing_items (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      items_json JSONB NOT NULL DEFAULT '[]',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT items_json FROM packing_items WHERE user_id = ${user.userId} LIMIT 1
    `;
    return res.json({ items: rows.length ? rows[0].items_json : null });
  }

  if (req.method === 'POST') {
    const { items } = req.body || {};
    if (!items) return res.status(400).json({ error: 'items required' });

    await sql`
      INSERT INTO packing_items (user_id, items_json, updated_at)
      VALUES (${user.userId}, ${JSON.stringify(items)}, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        items_json = ${JSON.stringify(items)},
        updated_at = NOW()
    `;

    // Add unique constraint if missing (idempotent)
    try {
      await sql`CREATE UNIQUE INDEX IF NOT EXISTS packing_items_user_id ON packing_items (user_id)`;
    } catch (e) { /* ignore */ }

    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
