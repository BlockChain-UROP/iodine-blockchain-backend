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
var CUSTODIAN_CONTRACT_ADDRESS = "0x920ea33c9af011a74ddac700e9c6884ee035c06b";
var test_account = "0x5ff2c17ada131e5d9fa0f927395abe35657e4768";


exports.test = async function(req, res) {
    try {
        web3.eth.getAccounts((err, res) => { console.log(res); });

        // Get Instance
        var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log("instance is ok");

        // Create Asset
        var receipt = await custodianInstance.publishAsset("Test Asset", "Extremely good condition", true, {from: test_account});
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

        response = {
            "asset": {
                "id": assetId,
                "address": assetAddress,
                "name": assetName,
                "status": assetStatus,
                "avail": assetAvail
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

exports.update = function(req, res) {

    var response = {};

    try {
        // var custodianInstance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        // console.log("instance is ok");

        var assetId = req.body.id;
        console.log(assetId);

        var newStatus = req.body.status;
        console.log(newStatus);

        // var assetAddress = await custodianInstance.getAssetAddrByID(assetId, {from: test_account});
        // console.log(assetAddress);

        // var assetInstance = Asset.at(assetAddress);
        // console.log("asset is ok");

        // var assetName = await assetInstance.name.call({from: test_account});
        // console.log(assetName);

        // var assetStatus = await assetInstance.status.call({from: test_account});
        // console.log(assetStatus);

        // var assetAvail = await assetInstance.avail.call({from: test_account});
        // console.log(assetAvail);

        // response = {
        //     "asset": {
        //         "id": assetId,
        //         "address": assetAddress,
        //         "name": assetName,
        //         "status": assetStatus,
        //         "avail": assetAvail
        //     }
        // }

        response = "success";
        
    } catch (error) {
        console.error(error);
        response = {
            "error": error
        }
    }

    res.send(response);
};

exports.transfer = function(req, res) {
    res.send("transfer is here");
};

exports.publish = function(req, res) {
    res.send("publish is here");
};