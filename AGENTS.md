# AGENTS.md

## Project overview
- This repo is a static web app for "Seilruter Hellas 2026" with Vercel serverless APIs.
- Frontend: vanilla HTML/CSS/JS in `public/` (no bundler).
- Backend: Vercel functions in `api/` using Neon Postgres (`@neondatabase/serverless`).
- Auth: frontend stores Neon Auth session token and sends `Authorization: Bearer <token>`.

## Repository map
- `public/index.html`: app shell and script load order.
- `public/app.js`: main UI flow (entry, explore, voting, prep, map).
- `public/i18n.js`: translation keys + locale utilities.
- `public/routes-data.js`: route itineraries (bilingual objects).
- `public/islands.js`: island/stop metadata keyed by slug.
- `public/prep-content.js`: prep articles and packing content.
- `public/calendar.js`: prep calendar/task logic.
- `public/auth.js`: client auth/session helpers.
- `public/config.js`: public runtime API/auth base URLs.
- `api/*.js`: serverless endpoints.
- `api/_auth.js`: shared auth extraction.

## Run and deploy
- Install deps: `npm install`
- Local dev with API: `npx vercel dev`
- Required env var for API: `DATABASE_URL`
- Static-only preview (without API): `npx serve public`
- Deployment is configured via `vercel.json` (`public/` as output + `/api/*` rewrites).

## Core conventions
- Keep the app no-build and framework-free unless explicitly requested.
- Preserve script order in `public/index.html`; several files depend on globals loaded earlier.
- Keep bilingual content as `{ no, en }` objects where applicable.
- For UI strings, add/update keys in `public/i18n.js` and use `data-i18n` / `I18n.t(...)`.
- Follow existing code style: plain JS, semicolons, readable sectioned comments, minimal abstraction.

## API conventions
- Use parameterized Neon SQL tagged templates (never string-concatenated SQL).
- Preserve method guards (`405`) and JSON error responses.
- Endpoints that store user data should require auth (`verifyAuth`).
- Keep schema changes idempotent (`CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... IF NOT EXISTS`).
- Return stable JSON shapes so frontend callers do not break.

## Data integrity rules
- Route IDs must stay consistent across frontend and API.
- If adding/changing a route ID, update all relevant places:
  - `public/routes-data.js`
  - `api/vote.js` (`ALLOWED_ROUTE_IDS`)
  - `public/islands.js` (if stops/islands change)
  - `public/images.js` (if new image keys are introduced)
- Preserve date-sensitive trip planning assumptions centered around April-May 2026 unless asked to change them.

## Security notes
- Never commit secrets. `DATABASE_URL` must come from environment variables.
- `public/config.js` is public client config only.
- If auth logic is modified, keep all protected endpoints aligned with the same verification approach.

## Validation checklist after changes
- App loads and can switch from entry screen to main app.
- Language toggle updates visible strings correctly.
- Map renders and route highlighting still works.
- Voting flow works (list, cast vote, change/remove vote).
- Personal planning flows work when logged in (profile role, notes, packing, countdown).
