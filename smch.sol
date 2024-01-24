// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainManagement {
    address public owner;
    event ParcelCreated(uint indexed parcelCode);

    struct User {
        string firstName;
        string lastName;
        string email;
    }

    enum ParcelStatus { Preparing, Shipping, Received }

    struct Parcel {
        string name;
        string from;
        string to;
        string currentLocation;
        uint256 lastUpdate;  
        ParcelStatus status; 
        address receiver;  
        address sender;
    }

    struct ParcelHistory {
        address edior;
    }

    mapping(uint => Parcel) public Parcels;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createParcel(address _sender, string memory _name, string memory _from, string memory _to, address _receiver) public returns (uint){
        uint parcelCode = uint(keccak256(abi.encodePacked(_name)));
        uint256 date = block.timestamp;
        Parcels[parcelCode] = Parcel(_name, _from, _to, _from, date, ParcelStatus.Preparing, _receiver, _sender);
        
        emit ParcelCreated(parcelCode);
        
        return parcelCode;
    }

    function updateParcelLocation(uint parcelCode, address _editor, string memory _parcelLocation) external payable {
        uint256 date = block.timestamp;
        Parcels[parcelCode].lastUpdate = date;
        Parcels[parcelCode].status = ParcelStatus.Shipping;
        Parcels[parcelCode].currentLocation = _parcelLocation;
    }

    function receiveParcel(uint parcelCode, address _receiver) external payable {
        Parcels[parcelCode].status = ParcelStatus.Received;
    }

    function parcelInfo(uint parcelCode, address _user) public payable returns (Parcel memory) {
        return Parcels[parcelCode];
    }

    // function parcelsInfo() public payable returns (Parcel [] memory) {
    //     return Parcels;
    // }
}