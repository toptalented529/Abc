import Web3 from 'web3';

const { ethers } = require('ethers');

const privateKey = 'd6bf6f93b12dd365faeed99f44bf9cb493edf5deb734878abec4d5f0418134cd';

const contractAddress = '0xE2Df4634A43b7EE81d2C13fe5C56931E543E64bc'



const ABI = [
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
	},
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
	}
]



const web3 = new Web3("http://193.203.15.109:8545/")
let account = web3.eth.accounts.privateKeyToAccount(privateKey)
const contract = new web3.eth.Contract(ABI, contractAddress);



export {ABI,contractAddress,contract,web3,privateKey,account}