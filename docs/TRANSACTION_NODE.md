# Dennco Chain Transaction Node

A transaction node is a non-validator Besu node dedicated to receiving, validating, relaying, and monitoring application-submitted transactions.

The transaction node should sit between application services and the validator network. Applications should not submit ordinary business transactions directly to validator nodes.

## Purpose

The transaction node provides a controlled RPC boundary for:

```text
API Gateway
Wallet service
Enterprise applications
Document verification services
Asset registry applications
Identity onboarding workflows
```

The transaction node is responsible for accepting transactions from approved services, relaying them to the network, exposing safe read APIs, and supporting monitoring of transaction status.

## Role in the network

```text
Applications / Wallets
        ↓
API Gateway / Transaction Policy Layer
        ↓
Transaction Node
        ↓
Validator / Peer Network
        ↓
Besu chain state
```

## Transaction node responsibilities

- Receive JSON-RPC transaction submissions from trusted internal services.
- Relay signed transactions to the Besu network.
- Provide controlled read access for chain status, transaction status, receipts, balances, and contract state.
- Keep validator nodes isolated from application traffic.
- Support rate limiting and audit logging at the API Gateway layer.
- Support future policy checks before transaction submission.

## What the transaction node should not do

The transaction node should not be treated as the custody system by default.

Avoid placing unrestricted private keys directly on the transaction node. Long-term signing should move toward a dedicated wallet/signing service, key management system, hardware security module, or explicit approval workflow.

## Local development configuration

The local development stack includes:

```text
besu-validator-1     # local validator/block producer
besu-transaction-1   # non-validator RPC/transaction relay node
api-gateway          # application-facing service using the transaction node RPC endpoint
```

Local external RPC ports:

```text
Validator RPC:    http://localhost:8545
Transaction RPC:  http://localhost:8555
Transaction WS:   ws://localhost:8556
API Gateway:      http://localhost:8080
```

For application development, use the transaction node endpoint:

```text
BESU_RPC_URL=http://localhost:8555
```

## Production direction

In production, transaction nodes should be deployed separately from validator nodes.

Recommended production pattern:

```text
Internet / private network boundary
        ↓
API Gateway / reverse proxy / WAF
        ↓
Transaction node pool
        ↓
Private validator network
```

Production hardening should include:

- Node permissioning
- Account permissioning
- Private network access controls
- TLS termination at the gateway/reverse proxy
- Restricted JSON-RPC API exposure
- No public validator management APIs
- Monitoring and alerting
- Log retention and audit trails
- Separate signer/wallet service for key custody

## Future transaction policy layer

The API Gateway should eventually enforce transaction policy before anything reaches the transaction node.

Examples:

```text
identity must be active
asset must not be locked
caller must have an approved role
transaction must match allowed contract method
daily transaction limits must not be exceeded
approval workflow must be complete
```

The transaction node handles blockchain relay. The API Gateway and wallet/signing layer enforce business policy.
