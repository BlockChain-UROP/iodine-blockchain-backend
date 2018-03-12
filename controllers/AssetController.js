// Libraries
var Web3 = require('web3');

// var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.ifura.io/lMgQfS5DDh31T0z6iD5E'));
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));


var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "force pistol endless treat spot craft easily panel hurt potato slide explain";
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/lMgQfS5DDh31T0z6iD5E");
var web3 = new Web3(provider);


var TruffleContract = require("truffle-contract");

var custodianArtifacts = require('../build/contracts/Custodian.json');
var clientArtifacts = require('../build/contracts/Client.json');

var Custodian = new TruffleContract(custodianArtifacts);
var Client = new TruffleContract(clientArtifacts);

// Set Provider 
Custodian.setProvider(web3.currentProvider);

// Solve Apply Issue (https://github.com/trufflesuite/truffle-contract/issues/57)
if (typeof Custodian.currentProvider.sendAsync !== "function") {
    Custodian.currentProvider.sendAsync = function() {
        return Custodian.currentProvider.send.apply(
            Custodian.currentProvider, arguments
        );
    };
}


// Initialization
// var accounts;
var CUSTODIAN_CONTRACT_ADDRESS = "0xFDe186Ddb09ef7b83FD997CC5a7461E8E8af56C9";
var test_account = "0x5ff2c17ada131e5d9fa0f927395abe35657e4768";



exports.info = async function(req, res) {

    try {
        // web3.eth.getAccounts((err, res) => { console.log(res); });

        // Get Instance
        var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log("instance");

        // Get Seed
        var seed = await custodianInstance.getSeed({from: test_account});
        console.log("seed:", seed.toNumber());

        // Create Client
        var receipt = await custodianInstance.createClient({from: test_account});
        var clientId = receipt.logs[0].args.id.toNumber();
        var clientAddress = receipt.logs[0].args.newAddress;
        var clientInstance = Client.at(clientAddress);
        console.log(clientInstance);

        // Get Volume
        var volume = await custodianInstance.volume.call({from: test_account});
        console.log("volume:", volume.toNumber());

    } catch (error) {
        console.error(error);
    }

    res.send("info is here");
};

exports.update = function(req, res) {
    res.send("update is here");
};

exports.transfer = function(req, res) {
    res.send("transfer is here");
};

exports.publish = function(req, res) {
    res.send("publish is here");
};