import { neon } from '@neondatabase/serverless';
import { verifyAuth } from './_auth.js';

const TRIP_ID = process.env.TRIP_ID || 'greece-2026';

function asStringArray(value, options = {}) {
  const {
    maxItems = 500,
    maxLength = 120,
  } = options;

  if (!Array.isArray(value)) return [];
  const seen = new Set();
  const out = [];

  for (const item of value) {
    if (typeof item !== 'string') continue;
    const trimmed = item.trim();
    if (!trimmed || trimmed.length > maxLength || seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
    if (out.length >= maxItems) break;
  }

  return out;
}

function asString(value, maxLength = 20000) {
  if (typeof value !== 'string') return '';
  return value.slice(0, maxLength);
}

function normalizeRow(row) {
  return {
    tripId: row?.trip_id || TRIP_ID,
    checklist_completed: asStringArray(row?.checklist_completed, { maxItems: 300, maxLength: 80 }),
    checklist_removed: asStringArray(row?.checklist_removed, { maxItems: 300, maxLength: 80 }),
    packing_checked: asStringArray(row?.packing_checked, { maxItems: 1000, maxLength: 120 }),
    notes: asString(row?.notes, 20000),
    updated_at: row?.updated_at || null,
    updated_by: row?.updated_by || null,
  };
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS shared_planning (
      trip_id TEXT PRIMARY KEY,
      checklist_completed JSONB NOT NULL DEFAULT '[]'::jsonb,
      checklist_removed JSONB NOT NULL DEFAULT '[]'::jsonb,
      packing_checked JSONB NOT NULL DEFAULT '[]'::jsonb,
      notes TEXT NOT NULL DEFAULT '',
      updated_by TEXT,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;
}

async function readPlanning(sql) {
  const rows = await sql`
    SELECT
      trip_id,
      checklist_completed,
      checklist_removed,
      packing_checked,
      notes,
      updated_by,
      updated_at
    FROM shared_planning
    WHERE trip_id = ${TRIP_ID}
    LIMIT 1
  `;
  return normalizeRow(rows[0] || {});
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = verifyAuth(req);
  if (!user) return res.status(401).json({ error: 'Ikke autentisert' });

  const sql = neon(process.env.DATABASE_URL);
  await ensureTable(sql);

  if (req.method === 'GET') {
    const data = await readPlanning(sql);
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const current = await readPlanning(sql);

    const nextChecklistCompleted = Object.prototype.hasOwnProperty.call(body, 'checklist_completed')
      ? asStringArray(body.checklist_completed, { maxItems: 300, maxLength: 80 })
      : current.checklist_completed;
    const nextChecklistRemoved = Object.prototype.hasOwnProperty.call(body, 'checklist_removed')
      ? asStringArray(body.checklist_removed, { maxItems: 300, maxLength: 80 })
      : current.checklist_removed;
    const nextPackingChecked = Object.prototype.hasOwnProperty.call(body, 'packing_checked')
      ? asStringArray(body.packing_checked, { maxItems: 1000, maxLength: 120 })
      : current.packing_checked;
    const nextNotes = Object.prototype.hasOwnProperty.call(body, 'notes')
      ? asString(body.notes, 20000)
      : current.notes;

    await sql`
      INSERT INTO shared_planning (
        trip_id,
        checklist_completed,
        checklist_removed,
        packing_checked,
        notes,
        updated_by,
        updated_at
      )
      VALUES (
        ${TRIP_ID},
        ${JSON.stringify(nextChecklistCompleted)}::jsonb,
        ${JSON.stringify(nextChecklistRemoved)}::jsonb,
        ${JSON.stringify(nextPackingChecked)}::jsonb,
        ${nextNotes},
        ${user.userId || user.email || 'unknown'},
        NOW()
      )
      ON CONFLICT (trip_id) DO UPDATE SET
        checklist_completed = EXCLUDED.checklist_completed,
        checklist_removed = EXCLUDED.checklist_removed,
        packing_checked = EXCLUDED.packing_checked,
        notes = EXCLUDED.notes,
        updated_by = EXCLUDED.updated_by,
        updated_at = NOW()
    `;

    const data = await readPlanning(sql);
    return res.status(200).json({ success: true, ...data });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
