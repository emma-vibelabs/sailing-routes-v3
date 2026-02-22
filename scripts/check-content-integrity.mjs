#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();

function loadWindowVar(filePath, varName) {
  const code = fs.readFileSync(filePath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: filePath });
  const value = context.window[varName];
  if (!value) {
    throw new Error(`Missing window.${varName} in ${filePath}`);
  }
  return { value, code };
}

function slugify(name) {
  return String(name || '')
    .replace(/\s*\(.*?\)/g, '')
    .replace(/\s*—\s*.*/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-zæøå0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function checkBilingual(value, ptr, errors) {
  if (Array.isArray(value)) {
    value.forEach((entry, i) => checkBilingual(entry, `${ptr}[${i}]`, errors));
    return;
  }

  if (!isPlainObject(value)) return;

  const hasNo = Object.prototype.hasOwnProperty.call(value, 'no');
  const hasEn = Object.prototype.hasOwnProperty.call(value, 'en');

  if (hasNo || hasEn) {
    const noValid = typeof value.no === 'string' && value.no.trim().length > 0;
    const enValid = typeof value.en === 'string' && value.en.trim().length > 0;

    if (!noValid || !enValid) {
      errors.push(`${ptr} must include non-empty { no, en } strings`);
    }
  }

  for (const [k, v] of Object.entries(value)) {
    checkBilingual(v, `${ptr}.${k}`, errors);
  }
}

function extractImagePairsFromSource(source) {
  const regex = /^\s*"([^"]+)"\s*:\s*"([^"]+)"\s*,?\s*$/gm;
  const pairs = [];
  let match;
  while ((match = regex.exec(source)) !== null) {
    pairs.push({ key: match[1], value: match[2] });
  }
  return pairs;
}

function failIfAny(errors) {
  if (errors.length === 0) return;
  console.error(`Content integrity failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) {
    console.error(` - ${error}`);
  }
  process.exit(1);
}

const routesPath = path.join(root, 'public', 'routes-data.js');
const islandsPath = path.join(root, 'public', 'islands.js');
const imagesPath = path.join(root, 'public', 'images.js');

const errors = [];

const { value: routes } = loadWindowVar(routesPath, 'ROUTES_DATA');
const { value: islands } = loadWindowVar(islandsPath, 'ISLANDS_DATA');
const { value: images, code: imagesSource } = loadWindowVar(imagesPath, 'IMAGE_URLS');

if (!Array.isArray(routes) || routes.length === 0) {
  errors.push('public/routes-data.js must export a non-empty window.ROUTES_DATA array');
}

if (!isPlainObject(islands) || Object.keys(islands).length === 0) {
  errors.push('public/islands.js must export a non-empty window.ISLANDS_DATA object');
}

if (!isPlainObject(images) || Object.keys(images).length === 0) {
  errors.push('public/images.js must export a non-empty window.IMAGE_URLS object');
}

const routeIds = new Set();
const islandKeys = new Set(Object.keys(islands));

for (const [key, island] of Object.entries(islands)) {
  if (!isPlainObject(island)) {
    errors.push(`ISLANDS_DATA["${key}"] must be an object`);
    continue;
  }

  if (island.slug !== key) {
    errors.push(`ISLANDS_DATA["${key}"].slug must equal key (found "${island.slug}")`);
  }

  if (!images[island.image]) {
    errors.push(`Missing IMAGE_URLS key for island image: "${island.image}" (island ${key})`);
  }

  checkBilingual(island, `ISLANDS_DATA["${key}"]`, errors);
}

function findIslandByStopName(stopName) {
  const stopSlug = slugify(stopName);
  if (islandKeys.has(stopSlug)) return true;

  const normalized = String(stopName || '')
    .toLowerCase()
    .replace(/\s*\(.*?\)/, '')
    .replace(/\s*—.*/, '')
    .trim();

  for (const island of Object.values(islands)) {
    if (String(island.name || '').toLowerCase() === normalized) return true;
  }

  return false;
}

for (const route of routes) {
  if (!route || typeof route !== 'object') {
    errors.push('Each route entry must be an object');
    continue;
  }

  if (!route.id || typeof route.id !== 'string') {
    errors.push('Every route must have a string id');
    continue;
  }

  if (routeIds.has(route.id)) {
    errors.push(`Duplicate route id: "${route.id}"`);
  }
  routeIds.add(route.id);

  if (!Array.isArray(route.stops) || route.stops.length === 0) {
    errors.push(`Route "${route.id}" must define a non-empty stops array`);
    continue;
  }

  const sumNm = route.stops.reduce((acc, stop) => acc + (Number(stop.nm) || 0), 0);
  if (Number(route.distance) !== sumNm) {
    errors.push(`Route "${route.id}" distance (${route.distance}) must equal sum(stop.nm) (${sumNm})`);
  }

  if (!images[route.heroImage]) {
    errors.push(`Missing IMAGE_URLS key for route heroImage: "${route.heroImage}" (route ${route.id})`);
  }

  checkBilingual(route, `ROUTES_DATA["${route.id}"]`, errors);

  route.stops.forEach((stop, idx) => {
    const ptr = `ROUTES_DATA["${route.id}"].stops[${idx}]`;

    if (typeof stop.name !== 'string' || !stop.name.trim()) {
      errors.push(`${ptr}.name must be a non-empty string`);
    }

    if (typeof stop.day !== 'number' || Number.isNaN(stop.day)) {
      errors.push(`${ptr}.day must be a valid number`);
    }

    if (typeof stop.lat !== 'number' || typeof stop.lng !== 'number') {
      errors.push(`${ptr}.lat/lng must be numbers`);
    }

    if (typeof stop.nm !== 'number' || stop.nm < 0) {
      errors.push(`${ptr}.nm must be a non-negative number`);
    }

    if (!images[stop.image]) {
      errors.push(`Missing IMAGE_URLS key for stop image: "${stop.image}" (${ptr})`);
    }

    if (!findIslandByStopName(stop.name)) {
      errors.push(`Malformed stop reference: "${stop.name}" in route "${route.id}" does not resolve to ISLANDS_DATA`);
    }

    checkBilingual(stop, ptr, errors);
  });
}

const imagePairs = extractImagePairsFromSource(imagesSource);
const seenImageKeys = new Map();
for (const pair of imagePairs) {
  if (!seenImageKeys.has(pair.key)) {
    seenImageKeys.set(pair.key, pair.value);
    continue;
  }
  const previous = seenImageKeys.get(pair.key);
  if (previous !== pair.value) {
    errors.push(`Conflicting duplicate IMAGE_URLS mapping for key "${pair.key}"`);
  }
}

failIfAny(errors);

console.log(`Content integrity passed: ${routes.length} routes, ${Object.keys(islands).length} islands, ${Object.keys(images).length} image keys.`);
