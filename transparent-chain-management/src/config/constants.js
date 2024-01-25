module.exports = {
    contractAddress: '0xb008074370d3afdc865e41de85b327de4a0b226a',
    abi:[
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_parcelCode",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_date",
                    "type": "string"
                },
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
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "parcelCode",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_date",
                    "type": "string"
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
                    "internalType": "string",
                    "name": "parcelCode",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_date",
                    "type": "string"
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
                    "internalType": "string",
                    "name": "parcelCode",
                    "type": "string"
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
                            "internalType": "string",
                            "name": "lastUpdate",
                            "type": "string"
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
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
                    "internalType": "string",
                    "name": "lastUpdate",
                    "type": "string"
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
  