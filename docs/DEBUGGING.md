# Debugging

Common issues and the diagnostic steps to resolve them.

## Backend (Express + JSON file persistence)

### "Cannot read property 'id' of undefined" on POST /api/bounties

Likely cause: request body missing required fields. Check `validateBody.ts` for
the Zod schema — the validator throws a 400 with the missing field name in the
response.

```bash
curl -X POST http://localhost:3001/api/bounties \
  -H 'Content-Type: application/json' \
  -d '{ "issueId": 123, "amount": "100", "currency": "USDC" }'
```

### "EADDRINUSE: address already in use :::3001"

Another process is holding port 3001. Find and kill it:

```bash
lsof -i :3001
kill -9 <pid>
```

### JSON file persistence corrupt

If `backend/data/bounties.json` becomes invalid (manual edit, kill -9 mid-write):

1. Stop the backend
2. Restore from `bounties.json.bak` (auto-created on each write)
3. If no backup: re-seed from `scripts/seed-demo.js`

### OpenAPI drift after route changes

After editing `backend/src/api/*.ts`, regenerate the spec:

```bash
cd backend && npm run gen:openapi
```

The diff in `docs/openapi.generated.json` shows what changed.

## Frontend (React + Vite)

### "Cannot find module 'x'"

Run `npm install` in `frontend/`. Vite caches aggressively — delete
`frontend/node_modules/.vite` if hot reload stops working.

### Hydration mismatch on BountyDetailPage

Check that the SSR-generated HTML matches what React renders on the client.
Common cause: reading `localStorage` during render. Move to `useEffect`.

### CORS errors in browser console

Backend must run on port 3001 with CORS allowed for 3000. Check
`backend/src/index.ts` for the `cors()` middleware config.

## Soroban Contract

### "simulation failed: resource budget exceeded"

The transaction is too expensive. Reduce the number of cross-contract calls,
batch reads/writes, or raise the installed footprint in `tsconfig.json`.

### "missing signature"

The wallet hasn't signed the prepared transaction. Ensure `signTransaction` was
called before `sendTransaction`.

## Cross-Cutting

### CI is green locally but red on GitHub

Check for OS-specific paths (backslash vs forward slash). Run
`npm run lint && npm test` in a fresh clone.

### Snapshot test fails intermittently

Vitest snapshots are deterministic only if the source data is. If the snapshot
includes a timestamp or random ID, stub it in the test.

## Getting More Help

- `docs/ARCHITECTURE.md` — high-level data flow
- `docs/LOCAL_DEVELOPMENT.md` — setup walkthrough
- `docs/TESTING.md` — test stack and conventions
- Search closed issues: `gh issue list --state closed --search "<error>"`
