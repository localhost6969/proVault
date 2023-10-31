

import VaultAbi from "../artifacts/contracts/Vault.sol/Vault.json";

import { ethers } from "ethers";


export const getAsset = async (contract, position) => {
	try {
		const assetAddress = await contract.call("assetAddress", [position]);
		const chainId = await contract.call("chainIdOfAsset", [assetAddress]);
		const importURl = `/chains/${chainId}.ts`;
		const res = await fetch(importURl) /* @vite-ignore */
		let dynamicImport = await res.text();
		dynamicImport = dynamicImport.split(';')
		dynamicImport = dynamicImport[1];
		dynamicImport = dynamicImport.split(',');
		let positionArray=-1;
		const networkName = dynamicImport[0].split('"chain":')[1];
		console.log(networkName);
		for (var i=0;i<dynamicImport.length;i++) {
			const pos = dynamicImport[i].search('"rpc":');
			
			if (pos != -1) {
				positionArray=i;
				break;
			}
		}
		dynamicImport = dynamicImport[positionArray].split('[');
		let rpcTemplate = String(dynamicImport[1]);
		
		rpcTemplate = rpcTemplate.replace('"', '');
		const url = rpcTemplate.replace("${THIRDWEB_API_KEY}", 'c3bd26c426ad51a037777501a50767c5D');
		
		const provider = new ethers.providers.JsonRpcProvider(url);
		const balance = await provider.getBalance(assetAddress);
		const walletBalance = parseInt(balance) / 1000000000000000000;
		return {
			networkName: networkName,
			assetAddress,
			walletBalance,
		};
	} catch (err) {
		console.error("Error in accessing the vault", err);
		return false;
	}
};

export const addAsset = async (sdk, assetAddress, chainId, vaultAddress) => {
	try {
		const contract = await sdk.getContract(vaultAddress, VaultAbi.abi);
		const res = await contract.call("addAsset", [assetAddress, chainId]);
		console.log(res);
		return true;
	} catch (err) {
		console.log("Error in adding asset : ", err);
		return false;
	}
};

export const getAllAssets = (sdk,vaultAddress) =>{
  return new Promise (  async function (resolve, reject) {
    try {
      const contract = await sdk.getContract(vaultAddress, VaultAbi.abi);
      let assets = [];
      const data = await contract.call("getAssetAddressLength");
      const assetLength = parseInt(data);
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