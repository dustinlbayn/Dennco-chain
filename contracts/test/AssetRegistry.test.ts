import { expect } from "chai";
import { ethers } from "hardhat";

describe("AssetRegistry", function () {
  async function deployFixture() {
    const [admin, owner, recipient, inactive, outsider] = await ethers.getSigners();

    const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    const identityRegistry = await IdentityRegistry.deploy(admin.address);
    await identityRegistry.waitForDeployment();

    const AssetRegistry = await ethers.getContractFactory("AssetRegistry");
    const assetRegistry = await AssetRegistry.deploy(admin.address, await identityRegistry.getAddress());
    await assetRegistry.waitForDeployment();

    await identityRegistry.registerIdentity(owner.address, "Owner Entity", "ipfs://identity/owner");
    await identityRegistry.registerIdentity(recipient.address, "Recipient Entity", "ipfs://identity/recipient");
    await identityRegistry.registerIdentity(inactive.address, "Inactive Entity", "ipfs://identity/inactive");
    await identityRegistry.setIdentityStatus(inactive.address, 2);

    const assetId = ethers.id("DENNCO-ASSET-0001");

    return { identityRegistry, assetRegistry, admin, owner, recipient, inactive, outsider, assetId };
  }

  it("registers an asset for an active identity", async function () {
    const { assetRegistry, owner, assetId } = await deployFixture();

    await expect(
      assetRegistry.registerAsset(assetId, owner.address, "INFRASTRUCTURE", "ipfs://asset/1")
    )
      .to.emit(assetRegistry, "AssetRegistered")
      .withArgs(assetId, owner.address, "INFRASTRUCTURE", "ipfs://asset/1");

    const asset = await assetRegistry.getAsset(assetId);
    expect(asset.assetId).to.equal(assetId);
    expect(asset.owner).to.equal(owner.address);
    expect(asset.assetType).to.equal("INFRASTRUCTURE");
    expect(asset.metadataURI).to.equal("ipfs://asset/1");
    expect(asset.status).to.equal(1);
    expect(await assetRegistry.totalAssets()).to.equal(1);
  });

  it("blocks registration for inactive identities", async function () {
    const { assetRegistry, inactive } = await deployFixture();
    const assetId = ethers.id("DENNCO-ASSET-INACTIVE");

    await expect(
      assetRegistry.registerAsset(assetId, inactive.address, "INFRASTRUCTURE", "ipfs://asset/inactive")
    ).to.be.revertedWith("AssetRegistry: owner identity inactive");
  });

  it("transfers an active asset to another active identity", async function () {
    const { assetRegistry, owner, recipient, assetId } = await deployFixture();

    await assetRegistry.registerAsset(assetId, owner.address, "INFRASTRUCTURE", "ipfs://asset/1");

    await expect(assetRegistry.connect(owner).transferAsset(assetId, recipient.address))
      .to.emit(assetRegistry, "AssetTransferred")
      .withArgs(assetId, owner.address, recipient.address);

    const asset = await assetRegistry.getAsset(assetId);
    expect(asset.owner).to.equal(recipient.address);
  });

  it("blocks transfer to an inactive identity", async function () {
    const { assetRegistry, owner, inactive, assetId } = await deployFixture();

    await assetRegistry.registerAsset(assetId, owner.address, "INFRASTRUCTURE", "ipfs://asset/1");

    await expect(
      assetRegistry.connect(owner).transferAsset(assetId, inactive.address)
    ).to.be.revertedWith("AssetRegistry: recipient identity inactive");
  });

  it("blocks unauthorized transfers", async function () {
    const { assetRegistry, owner, recipient, outsider, assetId } = await deployFixture();

    await assetRegistry.registerAsset(assetId, owner.address, "INFRASTRUCTURE", "ipfs://asset/1");

    await expect(
      assetRegistry.connect(outsider).transferAsset(assetId, recipient.address)
    ).to.be.revertedWith("AssetRegistry: not authorized");
  });

  it("allows asset administrators to lock assets", async function () {
    const { assetRegistry, owner, assetId } = await deployFixture();

    await assetRegistry.registerAsset(assetId, owner.address, "INFRASTRUCTURE", "ipfs://asset/1");

    await expect(assetRegistry.setAssetStatus(assetId, 2))
      .to.emit(assetRegistry, "AssetStatusChanged")
      .withArgs(assetId, 2);

    const asset = await assetRegistry.getAsset(assetId);
    expect(asset.status).to.equal(2);
  });
});
