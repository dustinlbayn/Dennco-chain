# Dennco Chain Architecture

Dennco Chain is organized as an enterprise blockchain platform with a permissioned ledger at the center and application services around it.

## Core layers

### 1. Network layer

Hyperledger Besu provides the Ethereum-compatible enterprise blockchain node. The local scaffold uses one development node so the team can build contracts and services quickly.

Production should use multiple validator nodes, dedicated bootnodes, controlled RPC endpoints, and formal node/account permissioning.

### 2. Contract layer

The contract layer currently includes:

- `IdentityRegistry`: registers and governs enterprise participants.
- `AssetRegistry`: records enterprise assets and requires active identity status before issuance or transfer.

These contracts create the foundation for permission-aware asset activity.

### 3. API gateway layer

The API gateway provides a REST interface for applications that should not directly communicate with a raw JSON-RPC endpoint.

Current routes:

- `GET /health`
- `GET /chain/status`
- `GET /wallet/:address/balance`
- `GET /contracts`

### 4. Wallet layer

The wallet layer will handle account custody, key management, authorization policy, address books, approvals, and transaction signing.

### 5. Explorer layer

The explorer layer will index blocks, transactions, addresses, contract events, identity records, and asset registry activity.

## Security principles

- Never expose validator management APIs publicly.
- Keep deployer private keys out of source control.
- Separate public API access from internal RPC access.
- Use role-based access controls in contracts and services.
- Require identity state checks before asset issuance and transfer.
- Use a proper key management or HSM-backed signing model in production.

## Development flow

1. Start Besu with Docker Compose.
2. Compile and deploy contracts from `contracts/`.
3. Add deployed contract addresses to `.env`.
4. Start the API gateway.
5. Build wallet and explorer modules against the API gateway and contract events.
