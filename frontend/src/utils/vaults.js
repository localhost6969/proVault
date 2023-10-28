import { useContractWrite, useContract, Web3Button, useAddress, useContractRead } from "@thirdweb-dev/react";
import {ThirdwebSDK} from '@thirdweb-dev/sdk';
import env from "react-dotenv";
import { getContract, isLoggedIn } from "../auth/auth.mjs";

const contractAddress = import.meta.env.CONTRACT_ADDRESS;

export const createVault = async (ownerAddress, adminAddress, devAddress) =>{
    try {
      const { contract } = useContract(contractAddress);
      const res = await contract.call('createVault',[ownerAddress, adminAddress, devAddress, ownerAddress]);
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
      console.log(res);
    } else {
      return false
    }
  } catch (err) {
    console.error("Error in getting vault address : ",err);
  }
}



