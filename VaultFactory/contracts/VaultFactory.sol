// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./Vault.sol";


contract VaultFactory is Ownable, Pausable{

    uint256 public vaultCount;

    address[] public vaults;
    address[] public admins;
    address[] public funder;
    address[] public developer;

    mapping(address=> string) public getName;

    mapping (address => address) public vaultAddressToAdmin;
    mapping (address => address) public AdminToVaultAddress;
    mapping (address => address) public FunderToVaultAddress;
    mapping (address => address) public DeveloperToVaultAddress;

    constructor() Ownable(msg.sender) {

    }

    function createVault(address _admin, address _fund, address _dev, address _special, string memory _name) public{

        Vault _vault = new Vault(_admin, _fund, _dev, _special);
        address _vaultAddr = address(_vault);

        vaults.push(_vaultAddr);
        admins.push(_admin);
        funder.push(_fund);
        developer.push(_dev);

        getName[_vaultAddr] = _name;

        vaultAddressToAdmin[_vaultAddr] = _admin;
        AdminToVaultAddress[_admin] = _vaultAddr;
        FunderToVaultAddress[_fund] = _vaultAddr;
        DeveloperToVaultAddress[_dev] = _vaultAddr;
        
        vaultCount +=1;
    }

    

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getVaultsLength() public view returns(uint256) {
        return vaults.length;
    }

    function getAdminsLength() public view returns(uint256) {
        return admins.length;
    }

    function getFunderLength() public view returns(uint256) {
        return funder.length;
    }
    
    function getDeveloperLength() public view returns(uint256) {
        return developer.length;
    }

}