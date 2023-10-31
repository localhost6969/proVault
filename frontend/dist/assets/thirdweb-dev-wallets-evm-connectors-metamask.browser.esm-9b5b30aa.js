import{_ as l,a as m,b as p,c as w,f,h as g,w as C}from"./index-2c0fe92c.js";import{C as I,U as u,R as v}from"./url-bc88b2b6.browser.esm-e92dd2fa.js";import{I as _}from"./thirdweb-dev-wallets-evm-connectors-injected.browser.esm-f9f6571c.js";var r=new WeakMap;class y extends _{constructor(t){const s={...{name:"MetaMask",shimDisconnect:!0,shimChainChangedDisconnect:!0,getProvider:g},...t.options};super({chains:t.chains,options:s,connectorStorage:t.connectorStorage}),l(this,"id",C.metamask),m(this,r,{writable:!0,value:void 0}),p(this,r,s.UNSTABLE_shimOnConnectSelectAccount)}async connect(){var c,s;let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{const e=await this.getProvider();if(!e)throw new I;this.setupListeners(),this.emit("message",{type:"connecting"});let n=null;if(w(this,r)&&((c=this.options)!=null&&c.shimDisconnect)&&!this.connectorStorage.getItem(this.shimDisconnectKey)&&(n=await this.getAccount().catch(()=>null),!!n))try{await e.request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}catch(d){if(this.isUserRejectedRequestError(d))throw new u(d)}if(!n){const o=await e.request({method:"eth_requestAccounts"});n=f(o[0])}let i=await this.getChainId(),a=this.isChainUnsupported(i);if(t.chainId&&i!==t.chainId)try{await this.switchChain(t.chainId),i=t.chainId,a=this.isChainUnsupported(t.chainId)}catch(o){console.error(`Could not switch to chain id : ${t.chainId}`,o)}(s=this.options)!=null&&s.shimDisconnect&&await this.connectorStorage.setItem(this.shimDisconnectKey,"true");const h={chain:{id:i,unsupported:a},provider:e,account:n};return this.emit("connect",h),h}catch(e){throw this.isUserRejectedRequestError(e)?new u(e):e.code===-32002?new v(e):e}}async switchAccount(){await(await this.getProvider()).request({method:"wallet_requestPermissions",params:[{eth_accounts:{}}]})}}export{y as MetaMaskConnector};
