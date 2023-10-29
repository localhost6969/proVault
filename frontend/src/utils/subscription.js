const {VITE_SUBSCRIPTION} = import.meta.env;
import Subscription from '../../../VaultFactory/artifacts/contracts/Subscription.sol/Subscription.json';

export const createSubscription = async (sdk, address)=>{
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const res = await contract.call('mintSubscription', [address], {value:'10'});
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
        console.log(subscription);
        return subscription
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
        const res = await contract.call('purchase', [walletAddress], {value : price});
        return res;
    } catch (err) {
        console.error("Purchase failed : ", err);
        return null 
    } 
}

export const sellingOn = async (sdk, walletAddress, price) => {
    try {
        const contract = await sdk.getContract(VITE_SUBSCRIPTION, Subscription.abi);
        const res = await contract.call('sellingOn', [walletAddress, price]);
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
        console.log(parseInt(subscription[0]));
        if (parseInt(subscription[0]) != 0)
        return subscription
    } catch (err) {
        console.log("Failed to fetch subscription info", err);
        return null;
    } 
}