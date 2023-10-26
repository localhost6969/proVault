import {
    ThirdwebProvider,
    ConnectWallet,
    metamaskWallet,
    coinbaseWallet,
    walletConnect,
    localWallet,
    embeddedWallet,
  } from "@thirdweb-dev/react";
  
  export default function Login() {
    return (
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="YOUR_CLIENT_ID"
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          localWallet(),
          embeddedWallet(),
        ]}
      >
        <ConnectWallet
          theme={"dark"}
          modalSize={"wide"}
        />
      </ThirdwebProvider>
    );
  }