import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-ethers";
import dotenv from "dotenv";
dotenv.config();
// import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      evmVersion: "berlin",
      viaIR: true,
      optimizer: { enabled: true, runs: 99999 },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY!,
    customChains: [
      {
        network: "mode",
        chainId: 34443,
        urls: {
          apiURL: "https://explorer.mode.network/api",
          browserURL: "https://explorer.mode.network/",
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    mode: {
      chainId: 34443,
      url: "https://mainnet.mode.network/",
      accounts: [process.env.MODE_PRIVATE_KEY!],
      // gasPrice: 1000000,
    },
    ftm: {
      url: "https://rpc.ankr.com/fantom/",
      chainId: 250,
      accounts: [process.env.MODE_PRIVATE_KEY!],
    },
  },
};

export default config;
