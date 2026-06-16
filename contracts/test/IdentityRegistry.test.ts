import { expect } from "chai";
import { ethers } from "hardhat";

describe("IdentityRegistry", function () {
  async function deployFixture() {
    const [admin, participant, other] = await ethers.getSigners();
    const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    const registry = await IdentityRegistry.deploy(admin.address);
    await registry.waitForDeployment();

    return { registry, admin, participant, other };
  }

  it("registers an active identity", async function () {
    const { registry, participant } = await deployFixture();

    await expect(
      registry.registerIdentity(participant.address, "Dennco Information Systems", "ipfs://identity/dennco")
    )
      .to.emit(registry, "IdentityRegistered")
      .withArgs(participant.address, "Dennco Information Systems", "ipfs://identity/dennco");

    const identity = await registry.getIdentity(participant.address);
    expect(identity.account).to.equal(participant.address);
    expect(identity.legalName).to.equal("Dennco Information Systems");
    expect(identity.metadataURI).to.equal("ipfs://identity/dennco");
    expect(identity.status).to.equal(1);
    expect(await registry.isActive(participant.address)).to.equal(true);
    expect(await registry.totalIdentities()).to.equal(1);
  });

  it("prevents duplicate registrations", async function () {
    const { registry, participant } = await deployFixture();

    await registry.registerIdentity(participant.address, "Participant", "ipfs://identity/1");

    await expect(
      registry.registerIdentity(participant.address, "Participant", "ipfs://identity/1")
    ).to.be.revertedWith("IdentityRegistry: already registered");
  });

  it("allows identity administrators to suspend and revoke identities", async function () {
    const { registry, participant } = await deployFixture();

    await registry.registerIdentity(participant.address, "Participant", "ipfs://identity/1");

    await expect(registry.setIdentityStatus(participant.address, 2))
      .to.emit(registry, "IdentityStatusChanged")
      .withArgs(participant.address, 2);
    expect(await registry.isActive(participant.address)).to.equal(false);

    await expect(registry.setIdentityStatus(participant.address, 3))
      .to.emit(registry, "IdentityStatusChanged")
      .withArgs(participant.address, 3);
  });

  it("blocks non-admin registration", async function () {
    const { registry, participant, other } = await deployFixture();

    await expect(
      registry.connect(other).registerIdentity(participant.address, "Participant", "ipfs://identity/1")
    ).to.be.reverted;
  });
});
