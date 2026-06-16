# Stripe Integration Plan

Stripe should serve as the commercial billing layer for Dennco Chain. It should handle normal business payments, subscriptions, invoices, service packages, customer billing records, and usage-based billing.

Stripe should not be used to sell a speculative coin or investment token.

## Role of Stripe

Stripe connects customer payment activity to Dennco Chain service access.

```text
Customer
  ↓
Stripe Checkout, Invoice, or Billing Portal
  ↓
Stripe payment event
  ↓
Dennco billing service
  ↓
Service entitlement or credit record
  ↓
Dennco Chain API Gateway
  ↓
Chain record or service action
```

## Products and services to bill

Potential Stripe products:

```text
Enterprise subscription
Document verification package
Asset registration package
Identity onboarding fee
API usage package
Managed node hosting
Private chain setup
Enterprise support plan
Founding customer package
Franchise or vendor onboarding package
```

## Billing models

### Subscription billing

Used for recurring access.

Examples:

```text
Starter enterprise plan
Professional enterprise plan
Institutional plan
Managed infrastructure plan
```

### Usage-based billing

Used when customers pay based on activity.

Examples:

```text
document verifications
asset registrations
API calls
identity records
transaction submissions
```

### One-time payments

Used for setup fees and special packages.

Examples:

```text
private chain setup
enterprise onboarding
custom integration work
founding customer package
```

## Service credit model

Dennco may create internal service credits for product access, but they should be treated as prepaid service credits rather than investment tokens.

Recommended language:

> Service credits are used to purchase or access Dennco Chain services. They do not represent equity, profit-sharing, dividends, voting rights, or an investment in Dennco.

Service credits may be used for:

```text
document verification
asset registration
identity onboarding
API usage
enterprise workflow actions
```

## Billing event handling

The billing service should receive payment and subscription events from Stripe and update internal entitlement records.

Initial event categories to support:

```text
checkout completed
invoice paid
invoice payment failed
subscription created
subscription updated
subscription canceled
payment succeeded
payment failed
```

## Internal billing service responsibilities

The billing service should:

- Receive Stripe billing events.
- Map Stripe customers to Dennco customer accounts.
- Update subscription status.
- Add or remove service entitlements.
- Record invoice and payment references.
- Create audit references for chain-linked service actions.
- Keep payment processing inside Stripe.

## Suggested data model

```text
Customer
├── id
├── stripe_customer_id
├── organization_id
└── billing_status

Subscription
├── id
├── stripe_subscription_id
├── customer_id
├── plan
├── status
└── current_period_end

ServiceCreditLedger
├── id
├── customer_id
├── source
├── credit_type
├── amount
├── balance_after
├── stripe_event_id
└── created_at

BillingAuditReference
├── id
├── customer_id
├── stripe_event_id
├── chain_tx_hash
├── action_type
└── created_at
```

## Chain linkage

Stripe should remain the payment system. Dennco Chain should record business and audit references when appropriate.

Examples:

```text
paid invoice → service entitlement created
verification package purchased → service credits issued
asset package purchased → customer may register assets
subscription active → API access enabled
payment failed → access reduced or suspended
```

Not every payment needs to be written directly on-chain. The preferred model is to store payment records in the billing database and write only useful audit references to the chain.

## API Gateway integration

The API Gateway should eventually ask the billing service whether a customer is allowed to perform a paid action.

Example policy checks:

```text
customer has active subscription
customer has enough verification credits
customer has enough asset registration credits
customer billing account is not suspended
customer plan allows requested API method
```

## Operating notes

- Use Stripe for payment processing.
- Use separate test and live environments.
- Keep service credits separate from securities or investment language.
- Do not describe credits as profit-producing assets.
- Log entitlement changes for auditability.
- Keep billing records separate from chain state unless an audit reference is useful.

## Implementation phases

### Phase 1: Planning

- Define Stripe products.
- Define pricing plans.
- Define customer account model.
- Define service credit types.

### Phase 2: Billing service skeleton

- Add billing service module.
- Add billing event endpoint.
- Add local testing guide.
- Add billing database schema.

### Phase 3: Entitlements

- Map paid subscriptions to access levels.
- Map one-time payments to service credits.
- Add billing checks to API Gateway.

### Phase 4: Chain audit references

- Link paid service activity to optional chain audit records.
- Add transaction hash references to billing events.
- Add explorer and admin visibility.

### Phase 5: Customer portal

- Add customer billing portal link.
- Show subscription status.
- Show service credit balances.
- Show invoice and payment history.
