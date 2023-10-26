require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("dotenv").config()

const XDC_RPC_URL1 = process.env.XDC_RPC_URL1
const XDC_RPC_URL2 = process.env.XDC_RPC_URL2
const XDC_RPC_URL3 = process.env.XDC_RPC_URL3
const PRIVATE_KEY = process.env.PRIVATE_KEY
const MATIC_RPC_URL = process.env.MATIC_RPC_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks:{
    xdc: {
      url: XDC_RPC_URL3 || XDC_RPC_URL2 || XDC_RPC_URL1,
      accounts: [PRIVATE_KEY],
      chainId: 51
    },
    matic: {
      url:  MATIC_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80001
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
