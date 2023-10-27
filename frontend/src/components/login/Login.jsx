import {
    ThirdwebProvider,
    ConnectWallet,
    metamaskWallet,
    coinbaseWallet,
    walletConnect,
    localWallet,
    embeddedWallet,
    useAddress,
  } from "@thirdweb-dev/react";
  
  export default function Login() {
    const address = useAddress();
    console.log(address);
    return (
        <ConnectWallet
          theme={"dark"}
          modalSize={"wide"}
        />
      
    );
  }