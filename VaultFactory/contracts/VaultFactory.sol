// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./Vault.sol";


contract VaultFactory is Ownable, Pausable{

    uint256 public vaultCount;

    address[] public vaults;
    mapping (address => address) public ownerOfVault; // vault => owner



    constructor() Ownable(msg.sender) {

    }

    function createVault(address _admin, address _fund, address _dev, address _special) public returns(address) {
        Vault _vault = new Vault(_admin, _fund, _dev, _special);
        vaults.push(address(_vault));
        ownerOfVault[address(_vault)] = _admin;
        return address(_vault);
    }

    

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

}