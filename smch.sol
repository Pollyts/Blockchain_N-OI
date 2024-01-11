// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainManagement{
    // Structure to represent an item in the supply chain
    struct Item {
        //uint id;
        string name;
        //string description;
        // address currentOwner;
        // bool isReceived;
    }

    mapping (address => Item[]) public items;

    // Mapping of item ID to Item for tracking
    //mapping(uint => Item) public items;

    // Event to emit when an item is updated in the supply chain
    //event ItemUpdated(uint id, string status);

    // Function to add a new item to the supply chain
    function addItem(string memory _name, address _user) payable public {
        //uint id = items.length;
        items[_user].push(Item(_name));
        //emit ItemUpdated(id, "Added");
    }

    // Function to update item ownership and status in the supply chain
    // function updateItem(uint _id, address newOwner, string memory status) public {
    //     require(items[_id].currentOwner == msg.sender, "Only the current owner can update the item.");
    //     items[_id].currentOwner = newOwner;
    //     items[_id].isReceived = keccak256(bytes(status)) == keccak256(bytes("Received"));
    //     emit ItemUpdated(_id, status, newOwner);
    // }

    // Function to check the details of an item
    function getItemDetails(address _user) public view returns (Item [] memory) {
        return items[_user];
    }
}


// pragma solidity ^0.8.0;

// contract HeroesOfMagicalKingdom {

//     event NewHero(uint heroId, string name);
//     event HeroFought(uint heroId, uint enemyId, string outcome);
//     event PotionUsed(uint heroId, string potionType);

//     struct Hero {
//         string name;
//         uint health;
//         uint attackPower;
//         uint defense;
//     }

//     Hero[] public heroes;

//     mapping(uint => mapping(string => uint)) public potions; // heroId => potionType => quantity

//     function createHero(string memory _name, uint _attackPower, uint _defense) public {
//         uint id = heroes.length;
//         heroes.push(Hero(_name, 100, _attackPower, _defense)); // Heroes start with 100 health
//         emit NewHero(id, _name);
//     }

//     function usePotion(uint _heroId, string memory _potionType) public {
//         require(potions[_heroId][_potionType] > 0, "No potions of this type left!");
        
//         if (keccak256(abi.encodePacked(_potionType)) == keccak256(abi.encodePacked("Health"))) {
//             heroes[_heroId].health += 20;
//         }else
//         if (keccak256(abi.encodePacked(_potionType)) == keccak256(abi.encodePacked("AttackPower"))) {
//             heroes[_heroId].attackPower += 5;
//         }else
//         if (keccak256(abi.encodePacked(_potionType)) == keccak256(abi.encodePacked("Defense"))) {
//             heroes[_heroId].defense += 5;
//         }

//         potions[_heroId][_potionType]--;
//         emit PotionUsed(_heroId, _potionType);
//     }

//     function fight(uint _heroId, uint _enemyId) public {
//         require(_heroId < heroes.length && _enemyId < heroes.length, "Hero not found");
//         require(heroes[_enemyId].health > 0, "The enemy is already dead");
        
//         uint heroAttack = heroes[_heroId].attackPower;
//         uint enemyDefense = heroes[_enemyId].defense;
//         uint damage = 0;

//         if (heroAttack > enemyDefense) {
//             damage = heroAttack - enemyDefense;
//         }

//         heroes[_enemyId].health = (heroes[_enemyId].health > damage) ? (heroes[_enemyId].health - damage) : 0;      

//         if(heroes[_enemyId].health == 0)
//         {
//             emit HeroFought(_heroId, _enemyId, "The enemy is dead");
//         } 
//         else{
//             emit HeroFought(_heroId, _enemyId, "The enemy is alive, but got damage");
//         }       
//     }
// }

