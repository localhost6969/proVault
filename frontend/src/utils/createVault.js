import { useContractWrite, useContract, Web3Button, useAddress } from "@thirdweb-dev/react";

const contractAddress = "0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f";


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
