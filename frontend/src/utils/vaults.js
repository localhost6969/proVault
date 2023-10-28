import { useContractWrite, useContract, Web3Button, useAddress, useContractRead } from "@thirdweb-dev/react";
import {ThirdwebSDK} from '@thirdweb-dev/sdk';
import env from "react-dotenv";
import { getContract, isLoggedIn } from "../auth/auth.mjs";

const contractAddress = import.meta.env.CONTRACT_ADDRESS;

export const createVault = async (contract,ownerAddress, adminAddress, devAddress, specialAddress) =>{
    try {
      const res = await contract.call('createVault',[ownerAddress, adminAddress, devAddress, specialAddress]);
      return res.receipt.logs[0].address;
    } catch (err) {
      console.log("Error creating vault: ", err);
      return false
    }
}


export const getVault = async (address, contract) =>{
  try {
    if(address && contract) {
      const res = await contract.call("AdminToVaultAddress",[address]);
      if (res != "0x0000000000000000000000000000000000000000") {
        return {vaultAddress : res, role : 'admin' }
      } 
      const res1 = await contract.call("DeveloperToVaultAddress",[address]);
      if (res1 != "0x0000000000000000000000000000000000000000") {
        return {vaultAddress : res1, role : 'developer' }
      }
      const res2 = await contract.call("FunderToVaultAddress",[address]);
      if (res2 != "0x0000000000000000000000000000000000000000") {
        return {vaultAddress : res2, role : 'developer' }
      } else {
        return false
      }
        
    }
  } catch (err) {
    console.error("Error in getting vault address : ",err);
  }
}



