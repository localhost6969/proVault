import * as React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <NextUIProvider>
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
        <App />
        </ThirdwebProvider>
      </NextUIProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
