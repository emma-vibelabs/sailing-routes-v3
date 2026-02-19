import { neon } from '@neondatabase/serverless';
import { verifyAuth } from './_auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = verifyAuth(req);
  if (!user) return res.status(401).json({ error: 'Ikke autentisert' });

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    CREATE TABLE IF NOT EXISTS countdown_days (
      user_id TEXT NOT NULL,
      day_date DATE NOT NULL,
      torn_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (user_id, day_date)
    )
  `;

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT day_date FROM countdown_days WHERE user_id = ${user.userId} ORDER BY day_date
    `;
    return res.json({ days: rows.map(r => r.day_date) });
  }

  if (req.method === 'POST') {
    const { day_date } = req.body || {};
    if (!day_date) return res.status(400).json({ error: 'day_date required' });

    await sql`
      INSERT INTO countdown_days (user_id, day_date, torn_at)
      VALUES (${user.userId}, ${day_date}, NOW())
      ON CONFLICT (user_id, day_date) DO NOTHING
    `;
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
