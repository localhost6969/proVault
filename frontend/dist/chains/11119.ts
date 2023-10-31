import type { Chain } from "../src/types";
export default {
  "chain": "HBIT",
  "chainId": 11119,
  "explorers": [
    {
      "name": "hashbitscan",
      "url": "https://explorer.hashbit.org",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "features": [],
  "infoURL": "https://hashbit.org",
  "name": "HashBit Mainnet",
  "nativeCurrency": {
    "name": "HashBit Native Token",
    "symbol": "HBIT",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://hashbit.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet-rpc.hashbit.org",
    "https://rpc.hashbit.org"
  ],
  "shortName": "hbit",
  "slug": "hashbit",
  "testnet": false
} as const satisfies Chain;