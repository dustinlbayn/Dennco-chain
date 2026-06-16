# Dennco Chain Explorer

The explorer module will provide search and visibility into Dennco Chain activity.

## Planned capabilities

- Block, transaction, and address lookup
- Contract event indexing
- Identity registry event views
- Asset registry event views
- Internal administrator dashboard
- Public/private visibility controls

## Integration options

For local development, connect an Ethereum-compatible block explorer to the Besu JSON-RPC endpoint at `http://localhost:8545`.

For production, explorer access should use a read-only RPC endpoint and should not expose validator management APIs.
