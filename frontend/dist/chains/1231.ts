import type { Chain } from "../src/types";
export default {
  "chain": "Ultron",
  "chainId": 1231,
  "explorers": [
    {
      "name": "Ultron Explorer",
      "url": "https://ulxscan.com",
      "standard": "none"
    }
  ],
  "faucets": [],
  "features": [],
  "icon": {
    "url": "ipfs://QmPC6odFVyAQrXJQaZJVFpEQfRNbzZ5BjDZ7KBKmXPaYDw",
    "width": 512,
    "height": 512,
    "format": "png"
  },
  "infoURL": "https://ultron.foundation",
  "name": "Ultron Mainnet",
  "nativeCurrency": {
    "name": "Ultron",
    "symbol": "ULX",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://ultron.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://ultron-rpc.net"
  ],
  "shortName": "UtronMainnet",
  "slug": "ultron",
  "testnet": false
} as const satisfies Chain;