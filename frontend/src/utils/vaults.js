import VaultAbi from '../artifacts/contracts/Vault.sol/Vault.json' 

const {VITE_CONTRACT_ADDRESS, VITE_SUBSCRIPTION} = import.meta.env;

const contractAddress = import.meta.env.CONTRACT_ADDRESS;

export const createVault = async (
	contract,
	ownerAddress,
	adminAddress,
	devAddress,
	specialAddress,
	orgName
) => {
	try {
		const res = await contract.call("createVault", [
			ownerAddress,
			adminAddress,
			devAddress,
			specialAddress,
			VITE_SUBSCRIPTION,
			orgName
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
			const orgName = await contract.call('getName', [address]);
			const res = await contract.call("AdminToVaultAddress", [address]);
			if (res != "0x0000000000000000000000000000000000000000") {
        const balance = await getBalance(sdk,res)
				return { vaultAddress: res, role: "admin" ,balance : balance, orgName };
			}
			const res1 = await contract.call("DeveloperToVaultAddress", [address] );
			if (res1 != "0x0000000000000000000000000000000000000000") {
        const balance = await getBalance(sdk,res1)
				return { vaultAddress: res1, role: "developer", balance : balance, orgName };
			}
			const res2 = await contract.call("FunderToVaultAddress", [address]);
			if (res2 != "0x0000000000000000000000000000000000000000") {
        const balance = await getBalance(sdk,res2)
				return { vaultAddress: res2, role: "funder", balance : balance, orgName};
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



export const getVaultWithCount = async (sdk,contract, position) => {
	try {
		const vaultAddress = await contract.call('vaults', [position]);
		const walletBalance = await getBalance(sdk, vaultAddress);
		const orgName = await contract.call('getName', [vaultAddress]);
		return {
			vaultAddress,
			walletBalance,
			orgName
		}
		
	} catch (err) {
		console.error("Error in getting vault with count : ", err);
		return null
	}

}

export const getAllVaults = async (sdk) =>{
	try {
		const contract = await sdk.getContract(VITE_CONTRACT_ADDRESS);
		let vaultsLength = await contract.call('vaultCount');
		vaultsLength = parseInt(vaultsLength);
		console.log(vaultsLength)
		let allVaults=[];
		for(let i=0;i<vaultsLength;i++) {
			const vault = await getVaultWithCount(sdk,contract,i);
			if (vault) allVaults.push(vault);
		}
		return allVaults;
	} catch(err) {
		console.log("Error in getting all vaults", err);
		return []
	}
}
