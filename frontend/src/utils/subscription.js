const {VITE_SUBSCRIPTION} = import.meta.env;
import Subscription from '../../../VaultFactory/artifacts/contracts/Subscription.sol/Subscription.json';
import { ethers } from 'ethers';

export const createSubscription = async (sdk, address)=>{
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const res = await contract.call('mintSubscription', [address], {value: ethers.utils.parseEther("10")});
        return res;
    } catch (err) {
        console.log("Error in creating subscription: ", err);
        return null;
    }
}

export const getSubscriptionWithPosition = async (contract, position) =>{
    try {
        const walletAddress = await contract.call('subscriptionSellers',[position]);
        const subscription = await contract.call('infoOfVault',[walletAddress]);
        console.log(subscription.sellPrice);
        if (parseInt(subscription.tokenId) != 0){
            const {tokenId, startTime, endTime, royaltyPercentage, sellPrice} = subscription;
            const start = new Date(parseInt(startTime));
            const end = new Date(parseInt(endTime));
            let checkSelling = false;
            let checkSellingPrice = 0;

            const isSelling = await contract.call('isSelling',[walletAddress]);
            if(isSelling) {
                checkSelling = isSelling;
                checkSellingPrice = parseInt(sellPrice)
            }
            return {
                ownerAddress : walletAddress, 
                tokenId: parseInt(tokenId),
                startDate: `${start.toLocaleString()}`,
                endDate: `${end.toLocaleString()}`,
                royaltyPercentage : parseInt(royaltyPercentage),
                isSelling : checkSelling,
                sellingPrice : checkSellingPrice
            }
        } else {
           return null
        }
    } catch (err) {
        console.log('Error in getting the subscription: ', err);
        return null
    }
}

export const getAllSellingSubscriptions = async (sdk) =>{
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const result = await contract.call('getSubscriptionSellersLength')
        const subscriptionLength = parseInt(result);
        let allSubs = [];
        for (var i=0; i<subscriptionLength; i++) {
            const sub = await getSubscriptionWithPosition(contract, i);
            allSubs.push(sub);
        }
        return allSubs;
    } catch (err) {
        console.log("Error: ", err);
        return null;   
    }
}

export const purchaseSubscription = async (sdk, walletAddress, price) => {
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const res = await contract.call('purchase', [walletAddress], {value : ethers.utils.parseEther(price)});
        return res;
    } catch (err) {
        console.error("Purchase failed : ", err);
        return null 
    } 
}

export const sellingOn = async (sdk, walletAddress, price, royaltyPercentage) => {
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const res = await contract.call('sellingOn', [walletAddress, parseInt(price), parseInt(royaltyPercentage)]);
        return true;
    } catch (err) {
        console.log('Error in setting sellingOn : ', err);
        return null
    }
}

export const sellingOff = async (sdk, walletAddress) =>{
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const res = await contract.call('sellingOff', [walletAddress]);
        return true;
    } catch (err) {
        console.log('Error in setting sellingOff : ', err);
        return null
    }
}

export const redeemSubscription  = async (sdk) => {
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const res = await contract.call('redeemRoyalty');
        return true
    } catch (err) {
        console.log("Error in redeeming Subscription : ", err);
        return null;
    }
}

export const getSubscription = async (sdk, walletAddress) =>{
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const subscription = await contract.call('infoOfVault',[walletAddress]);
        console.log(subscription.isSelling);
        if (parseInt(subscription.tokenId) != 0){
            const {tokenId, startTime, endTime, isSelling, royaltyPercentage, SellingPrice} = subscription;
            const start = new Date(parseInt(startTime));
            const end = new Date(parseInt(endTime));
            let checkSelling = false;
            let checkSellingPrice = 0;
            if(subscription.isSelling) {
                checkSelling = subscription.isSelling;
                checkSelling = parseFloat(SellingPrice/1e8).toString()
            }
            return {
                tokenId: parseInt(tokenId),
                startDate: `${start.toLocaleString()}`,
                endDate: `${end.toLocaleString()}`,
                royaltyPercentage : parseInt(royaltyPercentage),
                isSelling : checkSelling,
                SellingPrice : checkSellingPrice
            }
        } else {
           return null
        }
        
    } catch (err) {
        console.log("Failed to fetch subscription info", err);
        return null;
    } 
}