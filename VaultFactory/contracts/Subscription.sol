// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

import "./Counters.sol";


contract Subscription is Ownable{
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct subscriptionInfo{
        uint256 tokenId;
        uint256 sellPrice;
        uint256 royaltyPercentage;
        uint256 startTime;
        uint256 endTime;
    }

    uint buyPrice = 10 ether;
    uint subscriptionTime = 10 * 60;

    address[] public subscriptionHolders;
    address[] public subscriptionSellers;

    mapping (address => subscriptionInfo) public infoOfVault;
    mapping (address => bool) public isSelling;

    constructor() Ownable(msg.sender) {
        _tokenIdCounter.increment();
    }

    modifier isExpired(address user){
        if(infoOfVault[user].endTime>=block.timestamp){
            burnSubscription(user);
        } else{
            _;
        }
    }

    function getSubscriberEndTimeInfo(address user) public view returns(uint256){
        return infoOfVault[user].endTime;
    }

    function mintSubscription(address user) public payable{
        require(msg.value >= buyPrice, "Not enough funds");
        insiderMint(user);
    }

    function insiderMint(address user) public {
        uint256 tokenId = _tokenIdCounter.current();
        // _mint(user, tokenId);
        _tokenIdCounter.increment();

        subscriptionHolders.push(user);

        infoOfVault[user] = subscriptionInfo(tokenId, 0, 0, block.timestamp, block.timestamp+subscriptionTime);
    }

    function burnSubscription(address user) public {
        for (uint i = 0; i < subscriptionHolders.length; i++){
            if(subscriptionHolders[i]==user){
                delete subscriptionHolders[i];
            }
        }

        if(isSelling[user]){
            for (uint i = 0; i < subscriptionSellers.length; i++){
                if(subscriptionSellers[i]==user){
                    delete subscriptionSellers[i];
                }
            }
        }

        // _burn(infoOfVault[user].tokenId);
        delete infoOfVault[user];
        delete isSelling[user];
    }

    function sellingOn(address user, uint256 _price, uint256 _royalty) public {
        isSelling[user] = true;
        subscriptionSellers.push(user);

        infoOfVault[user].sellPrice = _price;
        infoOfVault[user].royaltyPercentage = _royalty;
    }

    function sellingOff(address user) public{
        isSelling[user] = false;
        for (uint i = 0; i < subscriptionSellers.length; i++){
            if(subscriptionSellers[i]==user){
                delete subscriptionSellers[i];
            }
        }
        infoOfVault[user].sellPrice = 0;
        infoOfVault[user].royaltyPercentage = 0;
    }

    function calcSellingPrice(uint256 price, uint256 royaltyPercentage) public pure returns(uint256) {
        return price - (price * royaltyPercentage)/100;
    }

    function purchase(address alreadySubscribedUser) public payable isExpired(alreadySubscribedUser){ 
        require(isSelling[alreadySubscribedUser] == true, "Not for sale");
        require(infoOfVault[alreadySubscribedUser].sellPrice <= msg.value, "Not enough funds");

        payable(msg.sender).transfer(calcSellingPrice(msg.value, infoOfVault[alreadySubscribedUser].royaltyPercentage));

        burnSubscription(alreadySubscribedUser);
        mintSubscription(msg.sender);
    }

    function redeem() public {
        payable(owner()).transfer(address(this).balance);
    }

    function getSubscriptionHoldersLength() public view returns(uint256){
        return subscriptionHolders.length;
    }

    function getSubscriptionSellersLength() public view returns(uint256){
        return subscriptionSellers.length;
    }

}