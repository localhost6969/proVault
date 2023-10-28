import { useContractWrite, useContract, useContractRead } from "@thirdweb-dev/react";
import {ThirdwebSDK} from '@thirdweb-dev/sdk';
import env from "react-dotenv";
import { getContract } from "../auth/auth.mjs";

export const getAsset = async (assetAddress, chainId) => {
    try {
        const sdk = new ThirdwebSDK(chainId, {
            clientId : import.meta.env.CLIENT_ID
          });
        const data = await sdk.getBalance(assets[i].assetAddress)
        return data.displayValue;  
    } catch(err) {
      console.error("Error in accessing the vault",err);
      return false;
    }
}

export const addAsset = async (assetAddress, chainId) =>{
  try {
    const contract = getContract();
    if(!contract){
      const res = await contract.call('addAsset', [assetAddress,chainId]);
      return true;
    }
  } catch (err) {
    console.log("Error in adding asset : ",err);
  }
}

export const getAllAssets = async (vaultAddress) =>{
  return new Promise ( function (resolve, reject) {
    try {
      const contract = getContract();
      if(!contract){
        const { data, isLoading, error } = useContractRead(contract, "getAssetAddressLength");
        if (!isLoading) {
          for(var i=0;i<data;i++) {

          }
        } 
      }
    } catch (err) {
      console.log("Error in getting all assets: ", err);
      reject("Error in getting all assets")
    }  
  });
}