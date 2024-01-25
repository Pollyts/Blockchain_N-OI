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
        string lastUpdate;  
        ParcelStatus status; 
        address receiver;  
        address sender;
    }

    struct ParcelHistory {
        address edior;
    }

    mapping(string => Parcel) public Parcels;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createParcel(string memory _parcelCode, string memory _date, address _sender, string memory _name, string memory _from, string memory _to, address _receiver) public payable{
        Parcels[_parcelCode] = Parcel(_name, _from, _to, _from, _date, ParcelStatus.Preparing, _receiver, _sender);
    }

    function updateParcelLocation(string memory parcelCode, string memory _date, address _editor, string memory _parcelLocation) external payable {
        uint256 date = block.timestamp;
        Parcels[parcelCode].lastUpdate = _date;
        Parcels[parcelCode].status = ParcelStatus.Shipping;
        Parcels[parcelCode].currentLocation = _parcelLocation;
    }

    function receiveParcel(string memory parcelCode, string memory _date, address _receiver) external payable {
        Parcels[parcelCode].status = ParcelStatus.Received;
        Parcels[parcelCode].currentLocation = Parcels[parcelCode].to;
        Parcels[parcelCode].lastUpdate = _date;
    }

    function parcelInfo(string memory parcelCode, address _user) public view returns (Parcel memory) {
        return Parcels[parcelCode];
        //return Parcels[123];
    }

    // function parcelsInfo() public payable returns (Parcel [] memory) {
    //     return Parcels;
    // }
}