# Environment Variables

Reference for every environment variable consumed by stellar-bounty-board.

## Backend

| Name              | Required | Default                              | Purpose |
| ----------------- | -------- | ------------------------------------ | ------- |
| `PORT`            | no       | `3001`                               | HTTP listen port |
| `BOUNTIES_FILE`   | no       | `backend/data/bounties.json`         | Path to JSON persistence file |
| `ADMIN_KEY_HASH`  | no       | (none)                               | SHA-256 hash of admin password; required for write endpoints (generate via `scripts/hash-admin-key.js`) |
| `WEBHOOK_SECRET`  | no       | (none)                               | GitHub webhook HMAC secret; required for `/webhooks/github` endpoint |
| `CURRENCY_CACHE_TTL_MS` | no | `60000`                          | How long cached currency conversion rates are valid (ms) |
| `LOG_LEVEL`       | no       | `info`                               | One of: `trace`, `debug`, `info`, `warn`, `error` |

## Frontend

| Name                          | Required | Default | Purpose |
| ----------------------------- | -------- | ------- | ------- |
| `VITE_API_BASE_URL`           | no       | `http://localhost:3001` | Backend API base URL |
| `VITE_ENABLE_DEVTOOLS`        | no       | `false` in prod, `true` in dev | Toggle Redux/React Query devtools |

## Contracts

| Name                       | Required | Default | Purpose |
| -------------------------- | -------- | ------- | ------- |
| `SOROBAN_RPC_URL`          | yes      | (none)  | Stellar RPC node URL (e.g. `https://rpc-futurenet.stellar.org`) |
| `SOROBAN_NETWORK_PASSPHRASE` | yes     | (none)  | Network passphrase (Futurenet / Testnet / Pubnet) |
| `DEPLOYER_SECRET_KEY`      | yes (deploy only) | (none) | Secret key of the deploying account |

## CI (.github/workflows)

| Name              | Required | Purpose |
| ----------------- | -------- | ------- |
| `STELLAR_SECRET`  | yes (contract CI only) | RPC URL passphrase, used in `gen-bindings.sh` |

## Local .env Setup

The project ships a `.env.example` in `backend/`. Copy and edit:

```bash
cd backend
cp .env.example .env
# edit .env
```

The backend auto-loads `.env` via `dotenv` in dev mode. In production, set
these in the host environment (systemd, Docker, Vercel, etc.) — do NOT commit
the production `.env` file.

## Security

- Never commit `.env` files containing real secrets. The repo's `.gitignore`
  already excludes `*.env`.
- Rotate `WEBHOOK_SECRET` and `ADMIN_KEY_HASH` if either is leaked.
- The `DEPLOYER_SECRET_KEY` is only required during contract deploys — CI runs
  in a sandboxed env that scrubs it after the deploy step.
