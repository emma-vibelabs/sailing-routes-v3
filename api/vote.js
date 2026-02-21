import { neon } from '@neondatabase/serverless';
import { verifyAuth } from './_auth.js';

const ALLOWED_ROUTE_IDS = new Set([
  'saronic',
  'klassisk-kykladene',
  'fulle-kykladene',
  'smaa-kykladene',
  'nordlige-kykladene',
  'lipsi-tur-retur',
  'sporadene',
  'saronisk-kyklader',
]);

function toDisplayName(storedName) {
  if (!storedName || typeof storedName !== 'string') return 'Sailor';
  const value = storedName.trim();
  if (!value) return 'Sailor';
  if (value.includes('@')) return value.split('@')[0];
  if (value.startsWith('user:')) return 'Sailor';
  return value;
}

function getVoterIdentity(user) {
  if (!user || typeof user.userId !== 'string' || !user.userId.trim()) return null;
  const voterId = user.userId.trim();
  const rawEmail = typeof user.email === 'string' ? user.email.trim().toLowerCase() : '';
  const storedName = rawEmail && rawEmail.includes('@') ? rawEmail : `user:${voterId}`;
  return {
    voterId,
    storedName,
    displayName: toDisplayName(storedName),
  };
}

async function ensureVotesSchema(sql) {
  await sql`ALTER TABLE votes ADD COLUMN IF NOT EXISTS user_id TEXT`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS votes_user_id_unique ON votes (user_id) WHERE user_id IS NOT NULL`;
}

async function getTallyAndVoters(sql) {
  const tally = await sql`
    SELECT route_id, COUNT(*)::int as count FROM votes GROUP BY route_id
  `;
  const allVotes = await sql`
    SELECT name, route_id FROM votes ORDER BY voted_at
  `;

  const tallyMap = {};
  for (const row of tally) {
    tallyMap[row.route_id] = row.count;
  }

  const voters = {};
  for (const v of allVotes) {
    if (!voters[v.route_id]) voters[v.route_id] = [];
    voters[v.route_id].push(toDisplayName(v.name));
  }

  return { tally: tallyMap, voters };
}

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = verifyAuth(req);
  if (!user) return res.status(401).json({ error: 'Ikke autentisert' });

  const identity = getVoterIdentity(user);
  if (!identity) return res.status(401).json({ error: 'Ugyldig bruker' });

  const sql = neon(process.env.DATABASE_URL);
  await ensureVotesSchema(sql);

  // POST — cast or change vote
  if (req.method === 'POST') {
    const { route } = req.body || {};

    if (!route || typeof route !== 'string') {
      return res.status(400).json({ error: 'Ugyldig rute' });
    }
    if (!ALLOWED_ROUTE_IDS.has(route)) {
      return res.status(400).json({ error: 'Ukjent rute' });
    }

    // Upsert vote bound to authenticated user identity
    await sql`
      INSERT INTO votes (user_id, name, route_id, voted_at)
      VALUES (${identity.voterId}, ${identity.storedName}, ${route}, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        name = EXCLUDED.name,
        route_id = EXCLUDED.route_id,
        voted_at = NOW()
    `;

    const { tally, voters } = await getTallyAndVoters(sql);
    return res.status(200).json({ success: true, tally, voters, voter: identity.displayName });
  }

  // DELETE — remove vote
  if (req.method === 'DELETE') {
    await sql`DELETE FROM votes WHERE user_id = ${identity.voterId}`;

    const { tally, voters } = await getTallyAndVoters(sql);
    return res.status(200).json({ success: true, tally, voters });
  }
}
