# Besu configuration

This folder contains the local Hyperledger Besu configuration for Dennco Chain.

## Current local mode

The scaffold uses a single-node Clique-style development network so contracts and services can be built quickly.

Production should move to a multi-node permissioned network using one of the following approaches:

- IBFT/QBFT validator set
- Node allowlisting
- Account allowlisting
- TLS and reverse proxy hardening
- Dedicated RPC access policy
- Formal key custody and signing process

## Important production note

The current `config.toml` intentionally exposes JSON-RPC for local development. Do not expose this configuration directly to the public internet.
