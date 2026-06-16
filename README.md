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
├── api-gateway/          # REST API service for blockchain operations
├── config/               # Besu network and node configuration
├── contracts/            # Solidity contracts and deployment scripts
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

Then deploy contracts:

```bash
cd contracts
npm install
npm run compile
npm run deploy:local
```

Run the API gateway:

```bash
cd api-gateway
npm install
npm run dev
```

## Network defaults

- Chain ID: `20260616`
- Besu RPC: `http://localhost:8545`
- API Gateway: `http://localhost:8080`

## Status

This repository is currently in scaffold phase. The first implementation includes Besu configuration, identity and asset registry contracts, a TypeScript API gateway starter, and documentation for the enterprise architecture.
