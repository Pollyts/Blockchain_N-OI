module.exports = {
    contractAddress: '0x71a4e5ab5858ba7d345ea057da8177bf3b0bdb10',
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_sender",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_from",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_to",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                }
            ],
            "name": "createParcel",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "parcelCode",
                    "type": "uint256"
                }
            ],
            "name": "ParcelCreated",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "parcelCode",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "parcelInfo",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "from",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "to",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "currentLocation",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lastUpdate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "enum SupplyChainManagement.ParcelStatus",
                            "name": "status",
                            "type": "uint8"
                        },
                        {
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct SupplyChainManagement.Parcel",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "parcelCode",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                }
            ],
            "name": "receiveParcel",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "parcelCode",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_editor",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_parcelLocation",
                    "type": "string"
                }
            ],
            "name": "updateParcelLocation",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "Parcels",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "from",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "to",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "currentLocation",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "lastUpdate",
                    "type": "uint256"
                },
                {
                    "internalType": "enum SupplyChainManagement.ParcelStatus",
                    "name": "status",
                    "type": "uint8"
                },
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
  }
  