import{I as e}from"./thirdweb-dev-wallets-evm-connectors-injected.browser.esm-f9f6571c.js";import{aW as s}from"./index-2c0fe92c.js";import"./url-bc88b2b6.browser.esm-e92dd2fa.js";class w extends e{constructor(n){const t={...{name:"Zerion",getProvider(){var r;function i(o){if(o!=null&&o.isZerion)return o}if(s(globalThis.window))return(r=globalThis.window.ethereum)!=null&&r.providers?globalThis.window.ethereum.providers.find(i):i(globalThis.window.ethereum)}},...n.options};super({chains:n.chains,options:t,connectorStorage:n.connectorStorage})}}export{w as ZerionConnector};