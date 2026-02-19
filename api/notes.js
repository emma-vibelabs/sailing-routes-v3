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
    CREATE TABLE IF NOT EXISTS trip_notes (
      id SERIAL PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT content, updated_at FROM trip_notes WHERE user_id = ${user.userId} LIMIT 1
    `;
    return res.json({ note: rows.length ? rows[0] : null });
  }

  if (req.method === 'POST') {
    const { content } = req.body || {};
    if (typeof content !== 'string') return res.status(400).json({ error: 'content required' });

    await sql`
      INSERT INTO trip_notes (user_id, content, updated_at)
      VALUES (${user.userId}, ${content}, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        content = ${content},
        updated_at = NOW()
    `;
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
