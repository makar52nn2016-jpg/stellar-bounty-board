# Performance

Baselines, profiling, and limits.

## API Throughput Baseline

Captured on a single-core container (1 vCPU, 1 GB RAM) with `node v20.10.0`.
Run `node scripts/load-test.js` against a local instance to reproduce.

| Endpoint                        | P50    | P95    | P99    | RPS sustained |
| ------------------------------- | ------ | ------ | ------ | ------------- |
| `GET /api/health`               | 3 ms   | 8 ms   | 15 ms  | 1500          |
| `GET /api/bounties`             | 12 ms  | 35 ms  | 80 ms  | 600           |
| `GET /api/bounties/:id`         | 10 ms  | 28 ms  | 70 ms  | 700           |
| `POST /api/bounties` (write)    | 25 ms  | 60 ms  | 150 ms | 250           |
| `POST /api/bounties/:id/reserve`| 22 ms  | 55 ms  | 130 ms | 280           |
| `POST /api/bounties/:id/release`| 28 ms  | 75 ms  | 180 ms | 200           |

Updates: see `docs/loadtest-baseline.md` for the most recent numbers and the
script that produced them.

## JSON File Persistence

The bounty store is a single JSON file written atomically (write-to-temp +
`rename`). This makes writes safe against partial crashes but caps the
sustained write throughput at ~250 RPS (single writer).

For higher throughput: migrate to SQLite (`backend/src/store.sqlite.ts` is a
WIP branch) or Postgres.

## Frontend Bundle Size

Latest build (production):

| Asset               | Size (gzip) |
| ------------------- | ----------- |
| `main.js`           | 142 KB      |
| `vendor.js`         | 38 KB       |
| `app.css`           | 12 KB       |
| Total first-load    | ~190 KB     |

Analyze with `npm run build:analyze` — opens `rollup-plugin-visualizer` report.

## Profiling

### Backend

Use `--inspect` to attach Chrome DevTools:

```bash
cd backend
node --inspect=0.0.0.0:9229 dist/index.js
```

Open `chrome://inspect` in Chrome and click "inspect" under Remote Target.

For flamegraphs:

```bash
npx 0x --output-dir ./0x-traces -- node dist/index.js
```

### Frontend

Vite production build report:

```bash
cd frontend && npm run build:analyze
```

Open `dist/stats.html` to see per-chunk sizes.

## Limits and Backpressure

- Express body parser caps JSON bodies at 1 MB. Increase via
  `express.json({ limit: '5mb' })` if uploading large payloads.
- The bounty reservation endpoint has a per-IP rate limit of 5 req/min.
  Tune in `backend/src/middleware/rateLimit.ts`.
- Webhook signature verification rejects any payload over 5 MB to prevent
  replay/DoS via oversized payloads.

## See Also

- `docs/loadtest-baseline.md` — historical load test results
- `docs/ARCHITECTURE.md` — bottleneck analysis at the design level
