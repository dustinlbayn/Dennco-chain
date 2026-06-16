import * as fs from "node:fs";
import * as path from "node:path";

export type ContractDeployment = {
  contractName: string;
  address: string;
  network: string;
  chainId?: number;
  abi: unknown[];
  deployedAt?: string;
};

export const config = {
  host: process.env.API_GATEWAY_HOST || "0.0.0.0",
  port: Number(process.env.API_GATEWAY_PORT || 8080),
  rpcUrl: process.env.BESU_RPC_URL || "http://127.0.0.1:8545",
  chainId: Number(process.env.CHAIN_ID || 20260616),
  networkName: process.env.DEPLOYMENT_NETWORK || "local"
};

function deploymentPath(contractName: string) {
  return path.resolve(process.cwd(), "..", "deployments", config.networkName, `${contractName}.json`);
}

export function loadDeployment(contractName: string): ContractDeployment | null {
  const candidatePath = deploymentPath(contractName);

  if (!fs.existsSync(candidatePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(candidatePath, "utf8")) as ContractDeployment;
}

export function loadContractAddress(contractName: string, fallbackEnvName: string): string | null {
  const deployment = loadDeployment(contractName);
  return deployment?.address || process.env[fallbackEnvName] || null;
}
