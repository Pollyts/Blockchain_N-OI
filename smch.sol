// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainManagement {
    // Structure to represent an item in the supply chain
    struct Item {
        uint id;
        string name;
        string description;
        address currentOwner;
        bool isReceived;
    }

    // Mapping of item ID to Item for tracking
    mapping(uint => Item) public items;

    // Event to emit when an item is updated in the supply chain
    event ItemUpdated(uint id, string status, address owner);

    // Function to add a new item to the supply chain
    function addItem(uint _id, string memory _name, string memory _description) public {
        items[_id] = Item(_id, _name, _description, msg.sender, false);
        emit ItemUpdated(_id, "Added", msg.sender);
    }

    // Function to update item ownership and status in the supply chain
    function updateItem(uint _id, address newOwner, string memory status) public {
        require(items[_id].currentOwner == msg.sender, "Only the current owner can update the item.");
        items[_id].currentOwner = newOwner;
        items[_id].isReceived = keccak256(bytes(status)) == keccak256(bytes("Received"));
        emit ItemUpdated(_id, status, newOwner);
    }

    // Function to check the details of an item
    function getItemDetails(uint _id) public view returns (Item memory) {
        return items[_id];
    }
}
