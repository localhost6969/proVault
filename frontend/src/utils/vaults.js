import {
	useContractWrite,
	useContract,
	Web3Button,
	useAddress,
	useContractRead,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import env from "react-dotenv";
import { getContract, isLoggedIn } from "../auth/auth.mjs";
import VaultAbi from '../../../VaultFactory/artifacts/contracts/Vault.sol/Vault.json' 

const contractAddress = import.meta.env.CONTRACT_ADDRESS;

export const createVault = async (
	contract,
	ownerAddress,
	adminAddress,
	devAddress,
	specialAddress
) => {
	try {
		const res = await contract.call("createVault", [
			ownerAddress,
			adminAddress,
			devAddress,
			specialAddress,
		]);
		return res.receipt.logs[0].address;
	} catch (err) {
		console.log("Error creating vault: ", err);
		return false;
	}
};

export const getVault = async (sdk,address, contract) => {
	try {
		if (address && contract) {
      
			const res = await contract.call("AdminToVaultAddress", [address]);
			if (res != "0x0000000000000000000000000000000000000000") {
        const balance = await getBalance(sdk,res)
				return { vaultAddress: res, role: "admin" ,balance : balance };
			}
			const res1 = await contract.call("DeveloperToVaultAddress", [address]);
			if (res1 != "0x0000000000000000000000000000000000000000") {
        const balance = await getBalance(sdk,res1)
				return { vaultAddress: res1, role: "developer", balance : balance };
			}
			const res2 = await contract.call("FunderToVaultAddress", [address]);
			if (res2 != "0x0000000000000000000000000000000000000000") {
        const balance = await getBalance(sdk,res2)
				return { vaultAddress: res2, role: "funder", balance : balance  };
			} else {
				return false;
			}
		}
	} catch (err) {
		console.error("Error in getting vault address : ", err);
	}
};

export const getBalance = async (sdk,vaultAddress)=>{
    const contract = await sdk.getContract(vaultAddress, VaultAbi.abi);
    const balance = await contract.call('getBalance');
    return(parseInt(balance)/1000000000000000000);
}
