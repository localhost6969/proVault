import * as React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
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
import {
	XinfinXdcNetwork,
	XdcApothemNetwork,
	Mumbai,
	Localhost,
} from "@thirdweb-dev/chains";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <NextUIProvider>
      <ThirdwebProvider
        activeChain={XdcApothemNetwork}
        clientId={'c3bd26c426ad51a037777501a50767c5'}
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          localWallet(),
          embeddedWallet(),
        ]}
      >
        <App />
        </ThirdwebProvider>
      </NextUIProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
