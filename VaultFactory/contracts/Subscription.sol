// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract Subscription is ERC721Royalty, Ownable{
    
    constructor() ERC721("Subscription", "SUB") Ownable(msg.sender){

    }

}