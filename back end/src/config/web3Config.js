import Web3 from 'web3';

const { ethers } = require('ethers');

const privateKey = 'e9bc4f098f935ccbf0f5f516154df71e7e9e2b42bba1e704f8d7f11bfb597d0e';

const contractAddress = '0x28fdD7c524829007A014Fe2772D2eAD9481782B7'
const payment_address = "0x3884A052569eb7D5D30AA7528DC1aF160d218a69"

const payment_ABI =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_matching",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_team",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_range",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_sales",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_MOS",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_BonusWallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_BonusContract",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "subCategory_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "margin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "buyer_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "buyer_address",
				"type": "address"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "subCategoryId",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amount",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "margin",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "buyer_Id",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "buyer_address",
				"type": "address[]"
			}
		],
		"name": "purchaseBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "subCategory_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "margin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "buyer_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "vender_address",
				"type": "address"
			}
		],
		"name": "purchaseUNE",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "subCategoryId",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amount",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "margin",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "buyer_Id",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "vender_address",
				"type": "address[]"
			}
		],
		"name": "purchaseUNEBatch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "subcategory_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "subCat_id",
				"type": "uint256"
			},
			{
				"internalType": "uint16[]",
				"name": "directBonus",
				"type": "uint16[]"
			}
		],
		"name": "setCategory",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "bonusRates",
		"outputs": [
			{
				"internalType": "uint16",
				"name": "directBonus",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "matchingBonus",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "teamBonus",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "rangeBonus",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "salesBonus",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "genuRevenue",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "infrastructure",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "salesMan",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "IDAccount",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "community",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "othersAccount",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "founder",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "liquidity",
				"type": "uint16"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getCategory_subCategory",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWUNEPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
	}
]

const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_caller",
				"type": "address"
			}
		],
		"name": "addCaller",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newMember",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "parent",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "mine",
				"type": "address"
			}
		],
		"name": "addMember",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "newMember",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "parent",
				"type": "uint256[]"
			},
			{
				"internalType": "address[]",
				"name": "mine",
				"type": "address[]"
			}
		],
		"name": "addMembers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "buyer",
				"type": "uint256"
			}
		],
		"name": "addPurchaseData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_matching",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_team",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_range",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_sales",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_MOS",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_BonusWallet",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "payMatchingBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmounts",
				"type": "uint256"
			}
		],
		"name": "paySalesPoolBonusForAllUsers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rangeNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "matchedAmount",
				"type": "uint256"
			}
		],
		"name": "payTeamBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "payTeamBonusForAllusers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "margin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "buyer",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "directbonusRate",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmounts",
				"type": "uint256"
			}
		],
		"name": "salesPoolBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setPreviousPayTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "updateFatherPendingMatch",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "mine",
				"type": "address"
			}
		],
		"name": "updateMember",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_range",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "previous_level_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "level_amount",
				"type": "uint256"
			}
		],
		"name": "updateOrgMatchedAccumMinRange",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_range",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "previous_level_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_range_amount",
				"type": "uint256"
			}
		],
		"name": "updateRANGE_SALES",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_range",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "range_amount",
				"type": "uint256"
			}
		],
		"name": "updateRangeBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_range",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_range_amount",
				"type": "uint256"
			}
		],
		"name": "updateTEAM_BONUS_PERCENT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "children",
				"type": "address[]"
			}
		],
		"name": "weeklyPayChildren",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "weeklyPayMatchingBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "BonusType",
				"type": "string"
			}
		],
		"name": "withdrawBonus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAnuallyTotalAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getDistrubuteAndPercent",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getMatchedAccumData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getMatchPendingAccumData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getNodeChildren",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getNodeRange",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getNodeRangeAccum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getNodesumTeamBonus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getNodeTeamBonus",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getOrgMatchedAccumLevel",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			}
		],
		"name": "getPurchasedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "node",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "business",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "BonusType",
				"type": "string"
			}
		],
		"name": "getReservedTotalBonusAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "nodes",
		"outputs": [
			{
				"internalType": "address",
				"name": "mine",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "parent",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "range",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "flag",
				"type": "bool"
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
		"name": "OrgMatchedAccum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "OrgMatchedAccumMinRange",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
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
				"name": "",
				"type": "string"
			}
		],
		"name": "RANGE_BONUS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "RANGE_MEMBER_COUNT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "RANGE_SALES",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "TEAM_BONUS_PERCENT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



const web3 = new Web3("http://193.203.15.109:8545/")
let account = web3.eth.accounts.privateKeyToAccount(privateKey)
const contract = new web3.eth.Contract(ABI, contractAddress);
const payment_contract = new web3.eth.Contract(payment_ABI, payment_address);



export {ABI,contractAddress,contract,web3,privateKey,account,payment_ABI,payment_address,payment_contract}