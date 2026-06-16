import { Contract, JsonRpcProvider } from "ethers";
import { loadContractAddress, loadDeployment } from "./config";

export function getContract(provider: JsonRpcProvider, contractName: "IdentityRegistry" | "AssetRegistry") {
  const envName = contractName === "IdentityRegistry" ? "IDENTITY_REGISTRY_ADDRESS" : "ASSET_REGISTRY_ADDRESS";
  const deployment = loadDeployment(contractName);
  const address = deployment?.address || loadContractAddress(contractName, envName);

  if (!address) {
    return null;
  }

  if (deployment?.abi) {
    return new Contract(address, deployment.abi, provider);
  }

  return null;
}

export function requireContract(provider: JsonRpcProvider, contractName: "IdentityRegistry" | "AssetRegistry") {
  const contract = getContract(provider, contractName);

  if (!contract) {
    throw new Error(`${contractName} is not configured. Deploy contracts and set deployment artifacts or environment addresses.`);
  }

  return contract;
}
