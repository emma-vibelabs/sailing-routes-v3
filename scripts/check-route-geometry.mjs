#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const FLAT_THRESHOLD_RATIO = 1.03;
const FLAT_MIN_NM = 15;
const MISSING_WP_MIN_NM = 8;
const ANGLE_SPIKE_DEG = 120;

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

function bearing(a, b) {
  const toRad = deg => deg * Math.PI / 180;
  const toDeg = rad => rad * 180 / Math.PI;
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function angleDifference(b1, b2) {
  let diff = Math.abs(b1 - b2);
  if (diff > 180) diff = 360 - diff;
  return diff;
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

function fmtNm(value) {
  return `${(Math.round(value * 10) / 10).toFixed(1)} NM`;
}

const rootDir = process.cwd();
const routes = loadRoutesData(rootDir);
const seaWaypointOverrides = loadSeaWaypointOverrides(rootDir);

if (!routes.length) {
  console.error('No routes found in public/routes-data.js');
  process.exit(1);
}

const issues = [];
let totalLegs = 0;
let flatLegs = 0;
let missingWpLegs = 0;
let angleSpikes = 0;

console.log(`Geometry audit: ${routes.length} routes`);
console.log(`Thresholds: FLAT when ratio < ${FLAT_THRESHOLD_RATIO} on legs >= ${FLAT_MIN_NM} NM | Missing WPs on legs >= ${MISSING_WP_MIN_NM} NM | Angle spike > ${ANGLE_SPIKE_DEG}\u00b0\n`);

for (const route of routes) {
  const legRows = [];

  for (let i = 1; i < route.stops.length; i++) {
    const from = route.stops[i - 1];
    const to = route.stops[i];
    const canonicalNm = Number(to.nm) || 0;
    if (canonicalNm === 0) continue;

    totalLegs++;

    const waypoints = seawayWaypointsForLeg(route.id, to, seaWaypointOverrides);
    const straightPoints = [[from.lat, from.lng], [to.lat, to.lng]];
    const seawayPoints = [[from.lat, from.lng], ...waypoints, [to.lat, to.lng]];

    const straightDist = distanceOfPoints(straightPoints);
    const seawayDist = distanceOfPoints(seawayPoints);
    const ratio = straightDist > 0 ? seawayDist / straightDist : 1;

    const flags = [];

    // Flatness check
    if (straightDist >= FLAT_MIN_NM && ratio < FLAT_THRESHOLD_RATIO) {
      flags.push('FLAT');
      flatLegs++;
      issues.push({
        routeId: route.id,
        day: to.day,
        message: `FLAT: ratio ${ratio.toFixed(4)} on ${fmtNm(straightDist)} leg (${from.name} -> ${to.name})`,
      });
    }

    // Missing waypoints check
    if (straightDist >= MISSING_WP_MIN_NM && waypoints.length === 0) {
      flags.push('NO_WP');
      missingWpLegs++;
      issues.push({
        routeId: route.id,
        day: to.day,
        message: `NO_WP: ${fmtNm(straightDist)} leg with zero waypoints (${from.name} -> ${to.name})`,
      });
    }

    // Angle spike check
    if (seawayPoints.length >= 3) {
      for (let j = 1; j < seawayPoints.length - 1; j++) {
        const b1 = bearing(seawayPoints[j - 1], seawayPoints[j]);
        const b2 = bearing(seawayPoints[j], seawayPoints[j + 1]);
        const diff = angleDifference(b1, b2);
        if (diff > ANGLE_SPIKE_DEG) {
          flags.push(`SPIKE(${Math.round(diff)}\u00b0)`);
          angleSpikes++;
          issues.push({
            routeId: route.id,
            day: to.day,
            message: `SPIKE: ${Math.round(diff)}\u00b0 direction change at WP${j} (${from.name} -> ${to.name})`,
          });
        }
      }
    }

    legRows.push({
      day: to.day,
      from: from.name,
      to: to.name,
      straightDist,
      seawayDist,
      ratio,
      wpCount: waypoints.length,
      flags,
    });
  }

  const routeFlags = legRows.filter(r => r.flags.length > 0);
  const status = routeFlags.length === 0 ? 'OK' : `${routeFlags.length} issue(s)`;
  console.log(`[${route.id}] ${status}`);

  for (const row of legRows) {
    const flagStr = row.flags.length > 0 ? ` << ${row.flags.join(', ')}` : '';
    const marker = row.flags.length > 0 ? 'WARN' : 'OK';
    console.log(
      `  day ${String(row.day).padStart(2, ' ')} | ${marker.padEnd(4, ' ')} | ratio=${row.ratio.toFixed(4)} wps=${row.wpCount} straight=${fmtNm(row.straightDist)} seaway=${fmtNm(row.seawayDist)} | ${row.from} -> ${row.to}${flagStr}`
    );
  }
  console.log();
}

// Summary
console.log('--- Summary ---');
console.log(`Total legs: ${totalLegs}`);
console.log(`FLAT legs (ratio < ${FLAT_THRESHOLD_RATIO}, >= ${FLAT_MIN_NM} NM): ${flatLegs}`);
console.log(`Missing WP legs (>= ${MISSING_WP_MIN_NM} NM, 0 waypoints): ${missingWpLegs}`);
console.log(`Angle spikes (> ${ANGLE_SPIKE_DEG}\u00b0): ${angleSpikes}`);

if (issues.length) {
  console.error(`\nGeometry issues found (${issues.length}):`);
  issues.forEach(issue => {
    console.error(` - [${issue.routeId}] day ${issue.day}: ${issue.message}`);
  });
  process.exit(1);
}

console.log('\nGeometry audit passed: all checks within policy.');
