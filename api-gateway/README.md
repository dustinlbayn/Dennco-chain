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

Returns configured contract addresses from environment variables.

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
