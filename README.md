# Dennco Chain

Dennco Chain is the enterprise blockchain platform for Dennco Holding Company. The platform is designed around a permissioned Hyperledger Besu network with smart contracts for identity, asset registration, API access, wallet operations, and explorer integrations.

## Platform goals

- Private / permissioned enterprise blockchain network
- Hyperledger Besu node stack
- Identity registry smart contract
- Asset registry smart contract
- API gateway for internal and external applications
- Wallet service foundation
- Block explorer integration path
- Production-oriented documentation and deployment layout

## Repository layout

```text
.
├── .github/workflows/    # CI checks for contracts and gateway
├── api-gateway/          # REST API service for blockchain operations
├── config/               # Besu network and node configuration
├── contracts/            # Solidity contracts, tests, and deployment scripts
├── deployments/          # Generated deployment artifact documentation
├── docs/                 # Architecture and operating documentation
├── explorer/             # Explorer integration notes and future service config
├── scripts/              # Local setup and operations scripts
├── wallet/               # Wallet service/app placeholder
├── docker-compose.yml    # Local Dennco Chain development network
└── README.md
```

## Quick start

```bash
cp .env.example .env
bash scripts/bootstrap-local.sh
docker compose up -d
```

Then test and deploy contracts:

```bash
cd contracts
npm install
npm run compile
npm test
npm run deploy:local
```

Deployment writes contract artifacts to:

```text
deployments/local/IdentityRegistry.json
deployments/local/AssetRegistry.json
```

Run the API gateway:

```bash
cd api-gateway
npm install
npm run dev
```

## API gateway routes

- `GET /health`
- `GET /chain/status`
- `GET /wallet/:address/balance`
- `GET /contracts`
- `GET /identity/:address`
- `GET /assets/:assetId`

## Network defaults

- Chain ID: `20260616`
- Besu RPC: `http://localhost:8545`
- API Gateway: `http://localhost:8080`

## Current status

Milestone 1 is underway. The repository now includes Besu configuration, identity and asset registry contracts, contract tests, deployment artifact output, CI, a TypeScript API gateway starter, and documentation for the enterprise architecture.
