require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("@nomicfoundation/hardhat-verify");
require("dotenv").config()

const XDC_RPC_URL1 = process.env.XDC_RPC_URL1
const XDC_RPC_URL2 = process.env.XDC_RPC_URL2
const XDC_RPC_URL3 = process.env.XDC_RPC_URL3
const PRIVATE_KEY = process.env.PRIVATE_KEY
const MATIC_RPC_URL = process.env.MATIC_RPC_URL
const API_KEY = process.env.API_KEY

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
      chainId: 80001,
    },
    running: {
      url: "http://localhost:8545",
      chainId: 1337,
    },
    hardhat: {
      chainId: 1337,
    },

  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  etherscan : {
    apiKey : API_KEY
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
