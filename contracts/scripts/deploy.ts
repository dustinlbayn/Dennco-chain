import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("No deployer account configured. Set DEPLOYER_PRIVATE_KEY in .env.");
  }

  console.log(`Deploying Dennco Chain contracts with ${deployer.address}`);

  const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
  const identityRegistry = await IdentityRegistry.deploy(deployer.address);
  await identityRegistry.waitForDeployment();

  const identityRegistryAddress = await identityRegistry.getAddress();
  console.log(`IdentityRegistry deployed to ${identityRegistryAddress}`);

  const AssetRegistry = await ethers.getContractFactory("AssetRegistry");
  const assetRegistry = await AssetRegistry.deploy(deployer.address, identityRegistryAddress);
  await assetRegistry.waitForDeployment();

  const assetRegistryAddress = await assetRegistry.getAddress();
  console.log(`AssetRegistry deployed to ${assetRegistryAddress}`);

  console.log("\nAdd these values to .env:");
  console.log(`IDENTITY_REGISTRY_ADDRESS=${identityRegistryAddress}`);
  console.log(`ASSET_REGISTRY_ADDRESS=${assetRegistryAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
