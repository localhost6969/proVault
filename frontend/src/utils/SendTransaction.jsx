import React from 'react'
import { getContract } from '../auth/auth.mjs';
import env from 'react-dotenv';
import { useContractWrite, Web3Button } from '@thirdweb-dev/react';
import { getVault } from './vaults';
function SendTransaction({eth_amount}) {
    const contract = getVaultAddress();
    const { mutateAsync, isLoading, error } = useContractWrite(contract);
    
  return (
    <Web3Button
    contractAddress={contractAddress}
    action={() =>
      mutateAsync({
        args: [],
        overrides: {
          gasLimit: 1000000, // override default gas limit
          value: eth_amount , // send 0.1 native token with the contract call
        },
      })
    }
  >
    Send Transaction
  </Web3Button>
)
}

export default SendTransaction;