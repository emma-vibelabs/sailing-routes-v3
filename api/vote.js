import { neon } from '@neondatabase/serverless';

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
    voters[v.route_id].push(v.name);
  }

  return { tally: tallyMap, voters };
}

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  // POST — cast or change vote
  if (req.method === 'POST') {
    const { name, route } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return res.status(400).json({ error: 'Navn er påkrevd' });
    }
    if (!route || typeof route !== 'string') {
      return res.status(400).json({ error: 'Ugyldig rute' });
    }

    const voterName = name.trim();

    // Upsert vote (unique on name) — supports changing vote
    await sql`
      INSERT INTO votes (name, route_id, voted_at)
      VALUES (${voterName}, ${route}, NOW())
      ON CONFLICT (name) DO UPDATE SET
        route_id = ${route},
        voted_at = NOW()
    `;

    const { tally, voters } = await getTallyAndVoters(sql);
    return res.status(200).json({ success: true, tally, voters, voter: voterName });
  }

  // DELETE — remove vote
  if (req.method === 'DELETE') {
    const { name } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return res.status(400).json({ error: 'Navn er påkrevd' });
    }

    const voterName = name.trim();
    await sql`DELETE FROM votes WHERE name = ${voterName}`;

    const { tally, voters } = await getTallyAndVoters(sql);
    return res.status(200).json({ success: true, tally, voters });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
