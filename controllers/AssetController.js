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
var assetArtifacts = require('../build/contracts/Asset.json');
// var clientArtifacts = require('../build/contracts/Client.json');

var Custodian = new TruffleContract(custodianArtifacts);
var Asset = new TruffleContract(assetArtifacts);
// var Client = new TruffleContract(clientArtifacts);

// Set Provider 
Custodian.setProvider(web3.currentProvider);
Asset.setProvider(web3.currentProvider);
// Client.setProvider(web3.currentProvider);

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
// var CUSTODIAN_CONTRACT_ADDRESS = "0xFDe186Ddb09ef7b83FD997CC5a7461E8E8af56C9";
var CUSTODIAN_CONTRACT_ADDRESS = "0x5279770d33129df7e0a659d3566fd9912ccf665a";
var test_account = "0x5ff2c17ada131e5d9fa0f927395abe35657e4768";


exports.test = async function(req, res) {
    try {
        web3.eth.getAccounts((err, res) => { console.log(res); });

        // Get Instance
        var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log("instance is ok");

        // Create Asset
        var receipt = await custodianInstance.publishAsset("Test Asset", "Extremely good condition", 0, {from: test_account});
        var assetId = receipt.logs[0].args.id.toNumber();
        var assetAddress = receipt.logs[0].args.newAddress;
        var assetInstance = Asset.at(assetAddress);
        console.log(assetInstance); 

        // Get Asset Name
        var assetName = await assetInstance.name.call({from: test_account});
        console.log("Asset Name: ", assetName);

        // Get Volume
        var volume = await custodianInstance.volume.call({from: test_account});
        console.log("volume:", volume.toNumber());

    } catch (error) {
        console.error(error);
    }

    res.send("test is here");
};

exports.info = async function(req, res) {

    var response = {};

    try {
        var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log("instance is ok");

        var assetId = req.params.id;
        console.log(assetId);

        var assetAddress = await custodianInstance.getAssetAddrByID(assetId, {from: test_account});
        console.log(assetAddress);

        var assetInstance = Asset.at(assetAddress);
        console.log("asset is ok");

        var assetName = await assetInstance.name.call({from: test_account});
        console.log(assetName);

        var assetStatus = await assetInstance.status.call({from: test_account});
        console.log(assetStatus);

        var assetAvail = await assetInstance.avail.call({from: test_account});
        console.log(assetAvail);

        var assetHolder = await assetInstance.holder.call({from: test_account});
        console.log(assetHolder);

        var assetPublisher = await assetInstance.publisher.call({from: test_account});
        console.log(assetPublisher);

        response = {
            "asset": {
                "id": assetId,
                "address": assetAddress,
                "name": assetName,
                "status": assetStatus,
                "avail": assetAvail,
                "holder": assetHolder,
                "publisher": assetPublisher
            }
        }
        
    } catch (error) {
        console.error(error);
        response = {
            "error": error
        }
    }

    res.send(response);
};

exports.update = async function(req, res) {

    var response = {};

    try {
        var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log("instance is ok");

        var assetId = req.body.id;
        console.log(assetId);

        var newStatus = req.body.status;
        console.log("Received: ", newStatus);

        var assetAddress = await custodianInstance.getAssetAddrByID(assetId, {from: test_account});
        console.log(assetAddress);

        var assetInstance = Asset.at(assetAddress);
        console.log("asset is ok");

        await assetInstance.updateStatus(newStatus, {from: test_account});

        response = {
            "message": "success"
        }
        
    } catch (error) {
        console.error(error);
        response = {
            "error": error
        }
    }

    res.send(response);
};

exports.transfer = async function(req, res) {

    var response = {};

    try {
        var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log("instance is ok");

        var assetId = req.body.id;
        console.log(assetId);

        var receiver = req.body.receiver;
        console.log(receiver);

        var assetAddress = await custodianInstance.getAssetAddrByID(assetId, {from: test_account});
        console.log(assetAddress);

        var assetInstance = Asset.at(assetAddress);
        console.log("asset is ok");

        await assetInstance.transfer(receiver, {from: test_account});

        response = {
            "message": "success"
        }
        
    } catch (error) {
        console.error(error);
        response = {
            "error": error
        }
    }

    res.send(response);
};

exports.publish = async function(req, res) {

    var response = {};

    try {
        var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log("instance is ok");

        var assetName = req.body.name;
        console.log(assetName);

        var assetStatus = req.body.status;
        console.log(assetStatus);

        var assetAvail = req.body.avail;
        console.log(assetAvail);

        // Publish Asset
        var receipt = await custodianInstance.publishAsset(assetName, assetStatus, assetAvail, {from: test_account});
        var assetId = receipt.logs[0].args.id.toNumber();
        var assetAddress = receipt.logs[0].args.newAddress;
        var assetInstance = Asset.at(assetAddress);
        console.log(assetInstance); 

        response = {
            "message": "success"
        };

    } catch (error) {
        console.error(error);
        response = {
            "error": error
        };
    }

    res.send(response);

};