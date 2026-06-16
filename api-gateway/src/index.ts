import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { JsonRpcProvider, isAddress } from "ethers";
import { z } from "zod";
import * as dotenv from "dotenv";
import { config, loadContractAddress, loadDeployment } from "./config";
import { requireContract } from "./contracts";

dotenv.config({ path: "../.env" });

const provider = new JsonRpcProvider(config.rpcUrl, config.chainId);

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
    rpcUrl: config.rpcUrl
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
    rpcUrl: config.rpcUrl
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
    network: config.networkName,
    identityRegistry: loadContractAddress("IdentityRegistry", "IDENTITY_REGISTRY_ADDRESS"),
    assetRegistry: loadContractAddress("AssetRegistry", "ASSET_REGISTRY_ADDRESS"),
    deployments: {
      identityRegistry: loadDeployment("IdentityRegistry"),
      assetRegistry: loadDeployment("AssetRegistry")
    }
  };
});

app.get("/identity/:address", async (request, reply) => {
  const params = z.object({ address: z.string() }).parse(request.params);

  if (!isAddress(params.address)) {
    return reply.code(400).send({ error: "Invalid identity address." });
  }

  const registry = requireContract(provider, "IdentityRegistry");
  const identity = await registry.getIdentity(params.address);
  const isActive = await registry.isActive(params.address);

  return {
    account: identity.account,
    legalName: identity.legalName,
    metadataURI: identity.metadataURI,
    status: Number(identity.status),
    createdAt: identity.createdAt.toString(),
    updatedAt: identity.updatedAt.toString(),
    isActive
  };
});

app.get("/assets/:assetId", async (request) => {
  const params = z.object({ assetId: z.string().regex(/^0x[a-fA-F0-9]{64}$/) }).parse(request.params);
  const registry = requireContract(provider, "AssetRegistry");
  const asset = await registry.getAsset(params.assetId);

  return {
    assetId: asset.assetId,
    owner: asset.owner,
    assetType: asset.assetType,
    metadataURI: asset.metadataURI,
    status: Number(asset.status),
    createdAt: asset.createdAt.toString(),
    updatedAt: asset.updatedAt.toString()
  };
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  reply.code(500).send({
    error: "Dennco Chain API Gateway error",
    message: error.message
  });
});

await app.listen({ host: config.host, port: config.port });
