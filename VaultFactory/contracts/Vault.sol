// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
// import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vault is AccessControl{

    using SafeERC20 for IERC20;

    // Event to log payment received
    event paymentReceived(address indexed from, address indexed assetAddress, uint256 amount);
    event paymentSent(address indexed to, address indexed assetAddress, uint256 amount);
    event assetAdded(address indexed assetAddress, uint64 chainId);
    event assetRemoved(address indexed assetAddress, uint64 chainId);
    event chainIdAdded(uint64 indexed chainId);
    event chainIdRemoved(uint64 indexed chainId);
    event fundInfoAdded(address indexed fundAddress, uint256 amountToBeSent);
    event fundInfoRemoved(address indexed fundAddress, uint256 amountToBeSent);
    event fundInfoUpdated(address indexed fundAddress, uint256 amountToBeSent);

    // Error
    error InvalidAddress(address _address);
    error NotEnoughBalance(uint256 _amountBalance, uint256 _amountNeeded);
    error NotEnoughAssetBalance(uint256 _amountBalance, uint256 _amountNeeded);
    error NotOnSameChain(uint64 _chainId);

    // Roles for the contract
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant FUND_ROLE = keccak256("FUND_ROLE");
    bytes32 public constant DEV_ROLE = keccak256("DEV_ROLE");
    bytes32 public constant SPECIAL_ROLE = keccak256("SPECIAL_ROLE");
    bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");

    uint256 public totalAmountToSpend;

    address[] public assetAddress;
    uint256[] public chainId;

    address[] public fundAddress;

    mapping (address => uint256) public fundToSend; // fundAddress => amount to be sent

    mapping (uint256 => address[]) public assetOfChainId; // chain Id => assetAddress
    mapping (address => uint256) public chainIdOfAsset; // assetAddress => chainId
    
    modifier isZero(address _address) {
        require(_address != address(0), "InvalidAddress(_address)");
        _;
    }

    modifier isGreaterThan(){
        require(totalAmountToSpend >= address(this).balance, "NotEnoughBalance(address(this).balance, totalAmountToFund)");
        _;
    }

    constructor(address _adminAddress, address _fundAddress, address _devAddress, address _special) isZero(_adminAddress) {
        // Set the contract creator as the admin
        _grantRole(ADMIN_ROLE, _adminAddress);
        _grantRole(FUND_ROLE, _fundAddress);
        _grantRole(DEV_ROLE, _devAddress); 
        _grantRole(SPECIAL_ROLE, _special);
    }

    function addFundAddress(address _fundAddress, uint256 _fundToBeSent) public onlyRole(ADMIN_ROLE) isZero(_fundAddress) {
        fundAddress.push(_fundAddress);
        fundToSend[_fundAddress] = _fundToBeSent;
        totalAmountToSpend += _fundToBeSent;
        emit fundInfoAdded(_fundAddress, _fundToBeSent);
    }

    function removeFundAddress(address _fundAddress, uint256 _fundToBeSent) public onlyRole(ADMIN_ROLE) isZero(_fundAddress){
        for (uint256 i = 0; i < fundAddress.length; i++) {
            if (fundAddress[i] == _fundAddress) {
                delete fundAddress[i];
                delete fundToSend[_fundAddress];
                totalAmountToSpend -= _fundToBeSent;
                emit fundInfoRemoved(_fundAddress, _fundToBeSent);
            }
        }
    }

    function updateFundAddress(address _fundAddress, uint256 _fundToBeSent)public onlyRole(ADMIN_ROLE) isZero(_fundAddress){
        fundToSend[_fundAddress] = _fundToBeSent;
        totalAmountToSpend -= fundToSend[_fundAddress];
        totalAmountToSpend += _fundToBeSent;
        emit fundInfoUpdated(_fundAddress, _fundToBeSent);
    }

    function addAsset(address _assetAddress, uint64 _chainId) public onlyRole(ADMIN_ROLE) isZero(_assetAddress) {

        assetAddress.push(_assetAddress);

        chainIdOfAsset[_assetAddress] = _chainId;
        assetOfChainId[_chainId].push(_assetAddress);

        emit assetAdded(_assetAddress, _chainId);
    }

    function removeAsset(address _assetAddress, uint64 _chainId) public onlyRole(ADMIN_ROLE) isZero(_assetAddress) {

        for (uint256 i = 0; i < assetAddress.length; i++) {
            if (assetAddress[i] == _assetAddress) {

                delete assetAddress[i];
                
                delete chainIdOfAsset[_assetAddress];

                for (uint256 j = 0; j < assetOfChainId[_chainId].length; j++){

                    if (assetOfChainId[_chainId][j] == _assetAddress){
                        delete assetOfChainId[_chainId][j];
                    }
                }
                emit assetRemoved(_assetAddress, _chainId);
            }
        }
    }

    function addChainId(uint64 _chainId) public onlyRole(ADMIN_ROLE) {
        chainId.push(_chainId);
        emit chainIdAdded(_chainId);
    }

    function removeChainId(uint64 _chainId) public onlyRole(ADMIN_ROLE) {
        for (uint256 i = 0; i < chainId.length; i++) {
            if (chainId[i] == _chainId) {
                delete chainId[i];
                emit chainIdRemoved(_chainId);
            }
        }
    }

    // Function to check the contract's balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to receive payments
    receive() external payable {
        // Emit the PaymentReceived event
        emit paymentReceived(msg.sender, address(0), msg.value);
    }

    function deposit() public payable onlyRole(FUND_ROLE) onlyRole(ADMIN_ROLE){

    }

    function withdraw() public onlyRole(FUND_ROLE) onlyRole(SPECIAL_ROLE){
        for(uint i = 0; i < fundAddress.length; i++){
            address addressAddr = fundAddress[i];
            payable(addressAddr).transfer(fundToSend[addressAddr]);
        }
    }

    function getChainIdLength() public view returns(uint256){
        return chainId.length;
    }

    function getAssetAddressLength() public view returns(uint256){
        return assetAddress.length;
    }

    function getFundAddressLength() public view returns(uint256){
        return fundAddress.length;
    }
}
