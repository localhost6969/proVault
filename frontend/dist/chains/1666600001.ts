import type { Chain } from "../src/types";
export default {
  "chain": "Harmony",
  "chainId": 1666600001,
  "explorers": [
    {
      "name": "Harmony Block Explorer",
      "url": "https://explorer.harmony.one/blocks/shard/1",
      "standard": "none"
    }
  ],
  "faucets": [],
  "features": [],
  "infoURL": "https://www.harmony.one/",
  "name": "Harmony Mainnet Shard 1",
  "nativeCurrency": {
    "name": "ONE",
    "symbol": "ONE",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://harmony-shard-1.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://api.s1.t.hmny.io"
  ],
  "shortName": "hmy-s1",
  "slug": "harmony-shard-1",
  "testnet": false
} as const satisfies Chain;