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
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id TEXT PRIMARY KEY,
      role TEXT NOT NULL DEFAULT 'passenger',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT role FROM user_profiles WHERE user_id = ${user.userId} LIMIT 1
    `;
    return res.json({ role: rows.length ? rows[0].role : 'passenger' });
  }

  if (req.method === 'POST') {
    const { role } = req.body || {};
    if (role !== 'skipper' && role !== 'passenger') {
      return res.status(400).json({ error: 'Invalid role' });
    }
    await sql`
      INSERT INTO user_profiles (user_id, role, updated_at)
      VALUES (${user.userId}, ${role}, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        role = ${role},
        updated_at = NOW()
    `;
    return res.json({ success: true, role });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
