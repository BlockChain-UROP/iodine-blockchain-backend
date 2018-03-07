// Libraries
var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/lMgQfS5DDh31T0z6iD5E'));

var TruffleContract = require("truffle-contract");

// Web3 Provider
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }

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
var CUSTODIAN_CONTRACT_ADDRESS = "0xaba35ced931aa5dd9edcad3457c984b056d4f0ad";


var test_account = "0x9BDe18763610E7beEE45F522B641F156D538d901";

exports.info = function(req, res) {


    // Get Seed
    Custodian.at(CUSTODIAN_CONTRACT_ADDRESS).then(function(instance) {
        return instance.getSeed({from: test_account});
    }).then(function(result){
        console.log("Result: " + result);
    }).catch(function(err) {
        console.log("ERROR! " + err.message);
    });

    Custodian.at(CUSTODIAN_CONTRACT_ADDRESS).then(function(instance) {
        instance.createClient({from: test_account});
        return instance.volume.call();
    }).then(function(result){
        console.log("Volume: " + result);
    }).catch(function(err) {
        console.log("ERROR! " + err.message);
    });


    
    // Custodian.at(CUSTODIAN_CONTRACT_ADDRESS).then(async function(instance) {
    //     var hi = await web3.eth.getBalance(test_account);
    //     console.log(hi)
    //     var client = await instance.createClient({from: test_account});
    //     console.log(client)
    // }).catch(function(err) {
    //     console.log("ERROR! " + err.message);
    // });
    // }).then(function(result){
    //     console.log("Client Address: " + result);
    // }).catch(function(err) {
    //     console.log("ERROR! " + err.message);
    // });










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