# Dennco Chain Project Frame

Dennco Chain is the enterprise blockchain and digital records layer inside Dennco's broader infrastructure platform. It should be developed as a commercial infrastructure product, not as a speculative coin project.

## Strategic objective

Build a permissioned enterprise blockchain platform that supports identity, asset registration, document verification, wallet infrastructure, transaction routing, API access, payment integration, and future digital operating systems for Dennco business units and external customers.

## Platform layers

```text
Dennco Chain
├── Network layer
│   ├── Hyperledger Besu validators
│   ├── transaction nodes
│   ├── RPC boundaries
│   └── permissioning
├── Contract layer
│   ├── IdentityRegistry
│   ├── AssetRegistry
│   ├── DocumentRegistry
│   ├── OrganizationRegistry
│   └── BillingRegistry
├── Service layer
│   ├── API Gateway
│   ├── wallet/signing service
│   ├── transaction policy service
│   ├── explorer/indexer
│   └── integration workers
├── Commercial layer
│   ├── Stripe billing
│   ├── customer subscriptions
│   ├── service credits
│   ├── invoices
│   └── enterprise contracts
└── Application layer
    ├── admin dashboard
    ├── customer portal
    ├── document verification portal
    ├── asset registry portal
    └── franchise/vendor onboarding tools
```

## Core modules

### 1. Network module

Purpose: operate the blockchain network.

Current scope:

- Local Besu validator node
- Local Besu transaction node
- Docker Compose development stack

Future scope:

- Multi-validator QBFT or IBFT network
- Node permissioning
- Account permissioning
- Validator key generation
- Private peer network
- Production RPC controls

### 2. Identity module

Purpose: maintain enterprise identity records.

Current scope:

- `IdentityRegistry` smart contract
- Active, suspended, and revoked identity states

Future scope:

- Organization onboarding
- KYC/KYB metadata references
- Role mapping
- API write routes
- Admin review workflow

### 3. Asset registry module

Purpose: register, transfer, lock, and retire enterprise assets.

Current scope:

- `AssetRegistry` smart contract
- Identity checks before asset registration or transfer

Future scope:

- Asset type governance
- Asset metadata schemas
- Document attachments
- Audit history
- Enterprise approval flows

### 4. Document verification module

Purpose: provide tamper-evident records for documents, contracts, certificates, publishing records, invoices, and compliance artifacts.

Future scope:

- Document hash registration
- Verification endpoint
- Public verification page
- Private metadata storage
- Expiration and revocation states

### 5. Wallet and signing module

Purpose: manage blockchain accounts and transaction signing.

Future scope:

- Wallet creation/import
- Signing policies
- Custodial and non-custodial accounts
- Approval workflows
- Key management system integration
- Hardware security module path

### 6. Transaction node and policy module

Purpose: receive transaction submissions from trusted services and relay them to the validator network.

Current scope:

- Non-validator transaction node design
- Local transaction node configuration

Future scope:

- Transaction policy checks
- Rate limiting
- Transaction queue
- Transaction status monitoring
- Retry and failure handling

### 7. Explorer and indexer module

Purpose: make chain activity searchable and auditable.

Future scope:

- Block indexer
- Transaction indexer
- Contract event indexer
- Identity event views
- Asset event views
- Document verification views
- Admin dashboard integration

### 8. API Gateway module

Purpose: expose controlled application APIs instead of direct raw node access.

Current scope:

- Health route
- Chain status route
- Wallet balance route
- Contract address route
- Identity read route
- Asset read route

Future scope:

- Authentication middleware
- Identity write routes
- Asset write routes
- Document verification routes
- Stripe webhook routes
- Admin-only routes

### 9. Stripe integration module

Purpose: connect Dennco Chain to the commercial payment layer.

Stripe should be used for normal business payments, subscriptions, invoices, metered billing, service packages, and customer payment records. It should not be used to sell a speculative coin as an investment.

Potential Stripe uses:

```text
enterprise subscriptions
API usage billing
document verification credits
asset registration packages
identity onboarding fees
managed node hosting fees
founding customer packages
franchise/vendor onboarding
invoice payments
customer portal billing
```

### 10. Admin and customer portal module

Purpose: provide user interfaces for Dennco staff, enterprise customers, vendors, and future franchise operators.

Future scope:

- Admin dashboard
- Customer portal
- Payment/billing view
- Identity onboarding UI
- Asset registry UI
- Document verification UI
- Transaction monitoring UI

## Integration map

```text
Customer / Enterprise User
        ↓
Customer Portal / Admin Dashboard
        ↓
API Gateway
        ├── Stripe billing service
        ├── wallet/signing service
        ├── transaction policy service
        ├── identity service
        ├── asset service
        └── document verification service
        ↓
Besu transaction node
        ↓
Besu validator network
        ↓
Explorer / indexer / audit records
```

## Commercial model

Dennco Chain can support company revenue through infrastructure services rather than token speculation.

Possible revenue streams:

```text
monthly enterprise subscription
per-document verification fee
per-asset registration fee
API usage billing
managed private chain setup fee
managed node hosting
enterprise support plan
franchise/vendor onboarding fee
custom integration projects
```

## Product positioning

Recommended positioning:

> Dennco Chain is an enterprise infrastructure product for identity, asset registration, document verification, secure business records, API access, wallet infrastructure, and transaction auditability.

Avoid positioning:

> Dennco Chain is an investment coin or speculative cryptocurrency.

## Build principle

The system should be built in this order:

```text
reliable local network
contract tests
deployment artifacts
API reads
API writes
auth and roles
transaction policy
wallet/signing
Stripe billing
explorer/indexer
admin dashboard
production network
```
