import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
const accounts = privateKey && privateKey !== "0x0000000000000000000000000000000000000000000000000000000000000000"
  ? [privateKey]
  : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    local: {
      url: process.env.BESU_RPC_URL || "http://127.0.0.1:8545",
      chainId: Number(process.env.CHAIN_ID || 20260616),
      accounts
    }
  }
};

export default config;
