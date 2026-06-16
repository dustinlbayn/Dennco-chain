import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { JsonRpcProvider, isAddress } from "ethers";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const host = process.env.API_GATEWAY_HOST || "0.0.0.0";
const port = Number(process.env.API_GATEWAY_PORT || 8080);
const rpcUrl = process.env.BESU_RPC_URL || "http://127.0.0.1:8545";
const provider = new JsonRpcProvider(rpcUrl, Number(process.env.CHAIN_ID || 20260616));

const app = Fastify({
  logger: true
});

await app.register(helmet);
await app.register(cors, {
  origin: true
});

app.get("/health", async () => {
  return {
    service: "dennco-chain-api-gateway",
    status: "ok",
    rpcUrl
  };
});

app.get("/chain/status", async () => {
  const [network, blockNumber] = await Promise.all([
    provider.getNetwork(),
    provider.getBlockNumber()
  ]);

  return {
    chainId: network.chainId.toString(),
    blockNumber,
    rpcUrl
  };
});

app.get("/wallet/:address/balance", async (request, reply) => {
  const params = z.object({ address: z.string() }).parse(request.params);

  if (!isAddress(params.address)) {
    return reply.code(400).send({ error: "Invalid wallet address." });
  }

  const balance = await provider.getBalance(params.address);
  return {
    address: params.address,
    balanceWei: balance.toString()
  };
});

app.get("/contracts", async () => {
  return {
    identityRegistry: process.env.IDENTITY_REGISTRY_ADDRESS || null,
    assetRegistry: process.env.ASSET_REGISTRY_ADDRESS || null
  };
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  reply.code(500).send({
    error: "Dennco Chain API Gateway error",
    message: error.message
  });
});

await app.listen({ host, port });
