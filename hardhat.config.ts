import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
// import "@nomicfoundation/hardhat-verify";
import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';
dotenv.config();
// import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: {
      evmVersion: 'berlin',
      viaIR: true,
      optimizer: { enabled: true, runs: 99999 },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY!,
    customChains: [
      {
        network: 'mode',
        chainId: 34443,
        urls: {
          apiURL: 'https://api-opbnb-testnet.bscscan.com/api',
          browserURL: 'https://explorer.mode.network/',
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
      url: 'https://mainnet.mode.network/',
      accounts: [process.env.PRIVATE_KEY!],
      // gasPrice: 1000000,
    },
    ftm: {
      url: 'https://rpc.ankr.com/fantom/',
      chainId: 250,
      accounts: [process.env.PRIVATE_KEY!],
    },
    bnbTestnet: {
      chainId: 97,
      url: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
      accounts: [process.env.PRIVATE_KEY!],
    },
    opBNBTestnet: {
      chainId: 5611,
      url: 'https://opbnb-testnet-rpc.bnbchain.org',
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
