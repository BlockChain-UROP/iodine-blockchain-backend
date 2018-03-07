// Libraries
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/lMgQfS5DDh31T0z6iD5E'));

var TruffleContract = require("truffle-contract");

var custodianArtifacts = require('../build/contracts/Custodian.json');
var Custodian = new TruffleContract(custodianArtifacts);

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
var CUSTODIAN_CONTRACT_ADDRESS = "0x71e923ee401e9604d3ae9cd0945b91bc613a6708";


var test_account = "0x9BDe18763610E7beEE45F522B641F156D538d901";

exports.info = async function(req, res) {

    try {
        // Get Seed
        var instance = await Custodian.at(CUSTODIAN_CONTRACT_ADDRESS);
        console.log(instance);
        var seed = await instance.getSeed({from: test_account});

        var client = await instance.createClient({from: test_account});
        console.log(client);

        var volume = await instance.volume.call({from: test_account});
        console.log(volume);

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