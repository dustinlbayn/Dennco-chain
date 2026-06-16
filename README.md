# Dennco Chain

Dennco Chain is the enterprise blockchain platform for Dennco Holding Company. The platform is designed around a permissioned Hyperledger Besu network with smart contracts for identity, asset registration, API access, wallet operations, and explorer integrations.

Dennco Chain is one technology asset inside Dennco's broader infrastructure platform. The capital strategy for the company should be centered on raising company capital for Dennco Holding Company or a dedicated subsidiary, not selling a speculative coin or public investment token.

## Platform goals

- Private / permissioned enterprise blockchain network
- Hyperledger Besu node stack
- Dedicated transaction node for application submissions
- Identity registry smart contract
- Asset registry smart contract
- API gateway for internal and external applications
- Wallet service foundation
- Block explorer integration path
- Production-oriented documentation and deployment layout
- Support for Dennco's broader company-capital and infrastructure strategy

## Repository layout

```text
.
├── .github/workflows/    # CI checks for contracts and gateway
├── api-gateway/          # REST API service for blockchain operations
├── config/               # Besu validator and transaction node configuration
├── contracts/            # Solidity contracts, tests, and deployment scripts
├── deployments/          # Generated deployment artifact documentation
├── docs/                 # Architecture, roadmap, and capital strategy documentation
├── explorer/             # Explorer integration notes and future service config
├── scripts/              # Local setup and operations scripts
├── wallet/               # Wallet service/app placeholder
├── docker-compose.yml    # Local Dennco Chain development network
└── README.md
```

## Capital positioning

Dennco is raising company capital to build an integrated technology infrastructure platform. Dennco Chain supports that larger platform through enterprise identity, asset registration, secure records, document verification, API access, wallet infrastructure, and future digital operating systems.

See [`docs/CAPITAL_STRATEGY.md`](docs/CAPITAL_STRATEGY.md) for the company capital strategy.

## Transaction node

Dennco Chain includes a dedicated non-validator transaction node for application-facing blockchain traffic. Applications and the API Gateway should use the transaction node instead of sending application traffic directly to validator nodes.

See [`docs/TRANSACTION_NODE.md`](docs/TRANSACTION_NODE.md) for the transaction node architecture.

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
- Validator RPC: `http://localhost:8545`
- Transaction RPC: `http://localhost:8555`
- Transaction WS: `ws://localhost:8556`
- API Gateway: `http://localhost:8080`

## Current status

Milestone 1 is underway. The repository now includes Besu validator and transaction node configuration, identity and asset registry contracts, contract tests, deployment artifact output, CI, a TypeScript API gateway starter, capital strategy documentation, and documentation for the enterprise architecture.
