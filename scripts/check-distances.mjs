#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROUTE_THRESHOLD_PCT = 10;
const LEG_THRESHOLD_PCT = 25;

function haversineNm(a, b) {
  const R = 6371008.8;
  const toRad = deg => deg * Math.PI / 180;
  const [lat1, lon1] = a;
  const [lat2, lon2] = b;
  const p1 = toRad(lat1);
  const p2 = toRad(lat2);
  const dPhi = toRad(lat2 - lat1);
  const dLam = toRad(lon2 - lon1);
  const h = (Math.sin(dPhi / 2) ** 2) + (Math.cos(p1) * Math.cos(p2) * (Math.sin(dLam / 2) ** 2));
  const meters = 2 * R * Math.asin(Math.sqrt(h));
  return meters / 1852;
}

function distanceOfPoints(points) {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineNm(points[i - 1], points[i]);
  }
  return total;
}

function routePointKey(lat, lng) {
  return `${Number(lat).toFixed(5)},${Number(lng).toFixed(5)}`;
}

function collisionOffsets(count) {
  if (count <= 1) return [{ x: 0, y: 0 }];
  if (count === 2) return [{ x: -12, y: 0 }, { x: 12, y: 0 }];
  if (count === 3) return [{ x: -11, y: 7 }, { x: 11, y: 7 }, { x: 0, y: -10 }];
  if (count === 4) return [{ x: -12, y: 0 }, { x: 12, y: 0 }, { x: 0, y: -12 }, { x: 0, y: 12 }];

  const radius = 13 + Math.min(10, Math.floor((count - 5) / 2));
  const result = [];
  for (let i = 0; i < count; i++) {
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI / count);
    result.push({
      x: Math.round(Math.cos(angle) * radius),
      y: Math.round(Math.sin(angle) * radius),
    });
  }
  return result;
}

function computeOverlapOffsets(stops) {
  const grouped = {};
  const byIndex = {};

  (stops || []).forEach((stop, index) => {
    const key = routePointKey(stop.lat, stop.lng);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(index);
  });

  Object.values(grouped).forEach(indices => {
    if (indices.length < 2) return;
    const offsets = collisionOffsets(indices.length);
    indices.forEach((idx, order) => {
      byIndex[idx] = offsets[order];
    });
  });

  return byIndex;
}

function loadRoutesData(rootDir) {
  const routesPath = path.join(rootDir, 'public', 'routes-data.js');
  const code = fs.readFileSync(routesPath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context.window.ROUTES_DATA || [];
}

function loadSeaWaypointOverrides(rootDir) {
  const seawayPath = path.join(rootDir, 'public', 'sea-waypoints.js');
  if (!fs.existsSync(seawayPath)) return {};
  const code = fs.readFileSync(seawayPath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context.window.SEA_WAYPOINTS || {};
}

function seawayWaypointsForLeg(routeId, stop, overrides) {
  const routeOverrides = overrides[routeId];
  const dayKey = stop && stop.day !== undefined && stop.day !== null ? String(stop.day) : null;
  if (routeOverrides && dayKey && Array.isArray(routeOverrides[dayKey])) {
    return routeOverrides[dayKey];
  }
  return Array.isArray(stop && stop.waypoints) ? stop.waypoints : [];
}

function loadWaivers(rootDir) {
  const waiversPath = path.join(rootDir, 'research', 'distance-waivers.json');
  if (!fs.existsSync(waiversPath)) return { routes: {}, legs: {} };

  try {
    const parsed = JSON.parse(fs.readFileSync(waiversPath, 'utf8'));
    return {
      routes: parsed.routes || {},
      legs: parsed.legs || {},
    };
  } catch (error) {
    console.error(`Failed to parse ${waiversPath}:`, error.message);
    process.exit(1);
  }
}

function fmtNm(value) {
  return `${(Math.round(value * 10) / 10).toFixed(1)} NM`;
}

function fmtPct(value) {
  return `${(Math.round(value * 10) / 10).toFixed(1)}%`;
}

function legWaiver(waivers, routeId, day) {
  return waivers.legs[`${routeId}:day${day}`] || waivers.legs[`${routeId}:${day}`] || null;
}

const rootDir = process.cwd();
const waivers = loadWaivers(rootDir);
const routes = loadRoutesData(rootDir);
const seaWaypointOverrides = loadSeaWaypointOverrides(rootDir);

if (!routes.length) {
  console.error('No routes found in public/routes-data.js');
  process.exit(1);
}

const failures = [];

console.log(`Distance audit: ${routes.length} routes`);
console.log(`Thresholds: route <= ${ROUTE_THRESHOLD_PCT}% | leg <= ${LEG_THRESHOLD_PCT}% (unless waived)`);

for (const route of routes) {
  const canonicalTotal = (route.stops || []).reduce((sum, stop) => sum + (Number(stop.nm) || 0), 0);

  let straightTotal = 0;
  let seawayTotal = 0;

  const legRows = [];

  for (let i = 1; i < route.stops.length; i++) {
    const from = route.stops[i - 1];
    const to = route.stops[i];
    const canonicalLeg = Number(to.nm) || 0;

    const straightPoints = [[from.lat, from.lng], [to.lat, to.lng]];
    const seawayPoints = [[from.lat, from.lng], ...seawayWaypointsForLeg(route.id, to, seaWaypointOverrides), [to.lat, to.lng]];

    const straightLeg = distanceOfPoints(straightPoints);
    const seawayLeg = distanceOfPoints(seawayPoints);

    straightTotal += straightLeg;
    seawayTotal += seawayLeg;

    if (canonicalLeg > 0) {
      const seawayDeltaPct = Math.abs((canonicalLeg - seawayLeg) / canonicalLeg) * 100;
      const waived = legWaiver(waivers, route.id, to.day);

      legRows.push({
        day: to.day,
        from: from.name,
        to: to.name,
        canonicalLeg,
        straightLeg,
        seawayLeg,
        seawayDeltaPct,
        waived,
      });

      if (seawayDeltaPct > LEG_THRESHOLD_PCT && !waived) {
        failures.push({
          type: 'leg',
          routeId: route.id,
          day: to.day,
          message: `Leg day ${to.day} exceeds ${LEG_THRESHOLD_PCT}% delta (${fmtPct(seawayDeltaPct)})`,
        });
      }
    }
  }

  const routeDeltaPct = canonicalTotal > 0
    ? Math.abs((canonicalTotal - seawayTotal) / canonicalTotal) * 100
    : 0;
  const routeWaiver = waivers.routes[route.id] || null;

  console.log(`\n[${route.id}] canonical=${fmtNm(canonicalTotal)} straight=${fmtNm(straightTotal)} seaway=${fmtNm(seawayTotal)} seawayDelta=${fmtPct(routeDeltaPct)}${routeWaiver ? ' (waived)' : ''}`);

  if (routeDeltaPct > ROUTE_THRESHOLD_PCT && !routeWaiver) {
    failures.push({
      type: 'route',
      routeId: route.id,
      message: `Route exceeds ${ROUTE_THRESHOLD_PCT}% delta (${fmtPct(routeDeltaPct)})`,
    });
  }

  for (const row of legRows) {
    const flag = row.seawayDeltaPct > LEG_THRESHOLD_PCT;
    const status = flag ? (row.waived ? 'WAIVED' : 'FAIL') : 'OK';
    console.log(
      `  day ${String(row.day).padStart(2, ' ')} | ${status.padEnd(6, ' ')} | canonical=${fmtNm(row.canonicalLeg)} straight=${fmtNm(row.straightLeg)} seaway=${fmtNm(row.seawayLeg)} delta=${fmtPct(row.seawayDeltaPct)} | ${row.from} -> ${row.to}`
    );
  }

  const overlapOffsets = computeOverlapOffsets(route.stops);
  const grouped = {};
  route.stops.forEach((stop, index) => {
    const key = routePointKey(stop.lat, stop.lng);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(index);
  });

  for (const [key, indices] of Object.entries(grouped)) {
    if (indices.length < 2) continue;
    const seen = new Set();
    indices.forEach(idx => {
      const offset = overlapOffsets[idx] || { x: 0, y: 0 };
      seen.add(`${offset.x},${offset.y}`);
    });
    if (seen.size !== indices.length) {
      failures.push({
        type: 'offset',
        routeId: route.id,
        message: `Duplicate marker offset at ${key} (${indices.length} markers)`
      });
    }
  }
}

if (failures.length) {
  console.error(`\nAudit failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  failures.forEach(issue => {
    console.error(` - [${issue.routeId}] ${issue.message}`);
  });
  process.exit(1);
}

console.log('\nAudit passed: all distance deltas and marker offset checks are within policy.');
