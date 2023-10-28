import { useContractWrite, useContract, useContractRead } from "@thirdweb-dev/react";
import {ThirdwebSDK} from '@thirdweb-dev/sdk';
import env from "react-dotenv";
import { getContract } from "../auth/auth.mjs";
import VaultAbi from '../../../VaultFactory/artifacts/contracts/Vault.sol/Vault.json';

const {VITE_CLIENT_ID} = import.meta.env;
import { ethers } from "ethers";

export const getAsset = async (contract, position) => {
    try {
        const assetAddress = await contract.call('assetAddress',[position])
        const chainId = await contract.call('chainIdOfAsset', [assetAddress]);
        const importURl = `../../node_modules/@thirdweb-dev/chains/chains/${chainId}.ts`;
        const dynamicImport = await import(importURl);  /* @vite-ignore */
        console.log(dynamicImport)
        const rpcTemplate = dynamicImport.default.rpc[0];
        const url = rpcTemplate.replace("${THIRDWEB_API_KEY}", VITE_CLIENT_ID); 
        const provider = new ethers.providers.JsonRpcProvider(url);
        const balance = await provider.getBalance(assetAddress);
        const walletBalance = parseInt(balance)/1000000000000000000;
        return {networkName : dynamicImport.default.chain, assetAddress, walletBalance };

    } catch(err) {
      console.error("Error in accessing the vault",err);
      return false;
    }
}

export const addAsset = async (sdk,assetAddress, chainId, vaultAddress) =>{
  try {
    const contract = await sdk.getContract(vaultAddress, VaultAbi.abi);
    const res = await contract.call('addAsset', [assetAddress,chainId]);
    console.log(res);
    return true;
  } catch (err) {
    console.log("Error in adding asset : ",err);
    return false
  }
}

export const getAllAssets = (sdk,vaultAddress) =>{
  return new Promise (  async function (resolve, reject) {
    try {
      const contract = await sdk.getContract(vaultAddress, VaultAbi.abi);
      let assets = [];
      const data = await contract.call("getAssetAddressLength");
      const assetLength = parseInt(data)
      for(var i=0;i<assetLength;i++) {
        const asset = await getAsset(contract, i);
        assets.push(asset);
      }
      resolve(assets);
   
    } catch (err) {
      console.log("Error in getting all assets: ", err);
      reject(null);
    }  
  });
}