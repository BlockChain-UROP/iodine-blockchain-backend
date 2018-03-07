var artifactor = require("truffle-artifactor");


// See truffle-schema for more info: https://github.com/trufflesuite/truffle-schema
var contract_data = {
    abi: '[ { "constant": true, "inputs": [], "name": "creator", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newSeed", "type": "uint256" } ], "name": "changeSeed", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getSeed", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "max", "type": "uint256" } ], "name": "getRamdomNumberSeedDepend", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getRamdomNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "resetRandomState", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_seed", "type": "uint256" }, { "name": "_creator", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "time", "type": "uint256" } ], "name": "ClientSeedChangedAt", "type": "event" } ]'
  };
  
  artifactor.save(contract_data, "./MyContract.sol.js").then(function() {
    console.log("success");
  });