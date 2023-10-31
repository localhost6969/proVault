import type { Chain } from "../src/types";
export default {
  "chain": "DFK",
  "chainId": 335,
  "explorers": [
    {
      "name": "ethernal",
      "url": "https://explorer-test.dfkchain.com",
      "standard": "none"
    }
  ],
  "faucets": [],
  "features": [],
  "icon": {
    "url": "ipfs://QmQB48m15TzhUFrmu56QCRQjkrkgUaKfgCmKE8o3RzmuPJ",
    "width": 500,
    "height": 500,
    "format": "png"
  },
  "infoURL": "https://defikingdoms.com",
  "name": "DFK Chain Test",
  "nativeCurrency": {
    "name": "Jewel",
    "symbol": "JEWEL",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://dfk-chain-test.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/rpc"
  ],
  "shortName": "DFKTEST",
  "slug": "dfk-chain-test",
  "testnet": true
} as const satisfies Chain;