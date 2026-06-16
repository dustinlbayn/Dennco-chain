# Dennco Chain Milestones

This roadmap organizes Dennco Chain into build phases, moving from a local proof of concept into a commercial enterprise infrastructure platform.

## Milestone 0: Repository foundation

Status: mostly complete.

Deliverables:

- [x] Repository scaffold
- [x] README
- [x] Architecture documentation
- [x] Capital strategy documentation
- [x] Local Docker Compose stack
- [x] Initial contract workspace
- [x] API Gateway starter
- [x] CI workflow

Exit criteria:

- Repository has clear project structure.
- Developers can understand the purpose of each module.

## Milestone 1: Functional local chain

Status: underway.

Deliverables:

- [x] Local Besu validator node
- [x] Local Besu transaction node
- [x] IdentityRegistry contract
- [x] AssetRegistry contract
- [x] Contract tests
- [x] Deployment artifact output
- [x] API read routes
- [ ] Real validator keys and valid genesis configuration
- [ ] Reliable local node connectivity
- [ ] End-to-end local deployment walkthrough

Exit criteria:

```text
docker compose up -d
cd contracts
npm install
npm test
npm run deploy:local
cd ../api-gateway
npm install
npm run dev
curl http://localhost:8080/chain/status
curl http://localhost:8080/contracts
```

## Milestone 2: Contract and API expansion

Deliverables:

- [ ] Identity write API routes
- [ ] Asset write API routes
- [ ] DocumentRegistry contract
- [ ] Document verification API routes
- [ ] OrganizationRegistry contract
- [ ] Contract event review
- [ ] Deployment artifact loader improvements
- [ ] OpenAPI specification

Exit criteria:

- Applications can register identities, register assets, verify documents, and read contract state through the API Gateway.

## Milestone 3: Authentication and access control

Deliverables:

- [ ] API authentication middleware
- [ ] Admin role model
- [ ] Service authentication
- [ ] Transaction policy checks
- [ ] Method allowlist
- [ ] Rate limiting
- [ ] Request audit logging
- [ ] Error reporting

Exit criteria:

- API write routes are protected by role and policy checks.

## Milestone 4: Wallet and signing service

Deliverables:

- [ ] Wallet service skeleton
- [ ] Account creation and import flow
- [ ] Signing abstraction
- [ ] Custodial wallet policy
- [ ] Non-custodial wallet support path
- [ ] Key management integration plan
- [ ] Approval workflow design
- [ ] Transaction queue

Exit criteria:

- Transactions can be prepared and signed through a controlled wallet service.

## Milestone 5: Stripe commercial integration

Deliverables:

- [ ] Stripe integration service
- [ ] Product and price model
- [ ] Subscription creation flow
- [ ] Invoice payment flow
- [ ] Webhook receiver
- [ ] Customer billing portal path
- [ ] Usage event model
- [ ] Service credit accounting model
- [ ] Billing-to-chain reference model

Exit criteria:

- Customers can pay for Dennco Chain services through standard business billing.
- Paid events can be linked to chain records without treating service credits as speculative investment tokens.

## Milestone 6: Explorer and indexer

Deliverables:

- [ ] Event indexer service
- [ ] Block and transaction indexing
- [ ] Identity event indexing
- [ ] Asset event indexing
- [ ] Document verification indexing
- [ ] Search API
- [ ] Admin dashboard data feed
- [ ] Public verification page feed

Exit criteria:

- Chain activity can be searched, audited, and displayed in dashboards.

## Milestone 7: Admin dashboard and customer portal

Deliverables:

- [ ] Admin dashboard shell
- [ ] Customer portal shell
- [ ] Identity onboarding UI
- [ ] Asset registry UI
- [ ] Document verification UI
- [ ] Billing and subscription UI
- [ ] Transaction monitoring UI
- [ ] Role-based navigation

Exit criteria:

- Dennco staff and customers can operate core workflows through a user interface.

## Milestone 8: Production network hardening

Deliverables:

- [ ] Multi-node enterprise network
- [ ] Validator key management
- [ ] Node permissioning
- [ ] Account permissioning
- [ ] Private network topology
- [ ] RPC access controls
- [ ] TLS configuration
- [ ] Logging and monitoring
- [ ] Backup and recovery plan
- [ ] Security review checklist

Exit criteria:

- Dennco Chain has a production-ready network topology with separated validators, transaction nodes, access boundaries, monitoring, and recovery planning.

## Milestone 9: Enterprise pilots

Deliverables:

- [ ] Pilot customer profile
- [ ] Pilot onboarding checklist
- [ ] Service agreement template
- [ ] Pricing package
- [ ] Support process
- [ ] Feedback loop
- [ ] Pilot success metrics

Exit criteria:

- At least one real customer or internal Dennco business unit can use the platform for a defined enterprise workflow.

## Milestone 10: Commercial launch

Deliverables:

- [ ] Public service pages
- [ ] Customer onboarding flow
- [ ] Billing flow
- [ ] Support documentation
- [ ] Terms and policy documents
- [ ] Security page
- [ ] Sales materials
- [ ] Investor-ready traction report

Exit criteria:

- Dennco Chain can be sold as a commercial enterprise infrastructure service.
