# Dennco Chain API Gateway

The API gateway is the application-facing service for Dennco Chain. It prevents applications from depending directly on raw blockchain node RPC access.

## Routes

### `GET /health`

Returns service health and configured RPC URL.

### `GET /chain/status`

Returns the connected chain ID and latest block number.

### `GET /wallet/:address/balance`

Returns the wallet balance in wei for a valid EVM address.

### `GET /contracts`

Returns configured contract addresses and deployment artifact metadata when available.

### `GET /identity/:address`

Reads an identity record from `IdentityRegistry`.

### `GET /assets/:assetId`

Reads an asset record from `AssetRegistry`. The `assetId` must be a 32-byte hex value.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Deployment artifact loading

The gateway first looks for contract deployment artifacts at:

```text
../deployments/<network>/IdentityRegistry.json
../deployments/<network>/AssetRegistry.json
```

If artifacts are unavailable, it falls back to environment variables:

```text
IDENTITY_REGISTRY_ADDRESS=
ASSET_REGISTRY_ADDRESS=
```
