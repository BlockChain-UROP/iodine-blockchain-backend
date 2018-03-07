// Libraries
var Web3 = require('web3');
// var web3 = new Web3();
// const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

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
    // console.log(typeof web3);
    // console.log(Custodian);

    // console.log(web3);
    // console.log(Custodian.at(CUSTODIAN_CONTRACT_ADDRESS).then);

    // Custodian


    // Custodian.at(CUSTODIAN_CONTRACT_ADDRESS).then(function(instance) {
    //     instance.setProvider
    //     console.log(instance);
    // });

    Custodian.at(CUSTODIAN_CONTRACT_ADDRESS).then(function(instance) {
        // console.log(instance);
        return instance.getSeed({from: test_account});
      }).then(function(result){
          console.log("Result: " + result);
      }).catch(function(err) {
        console.log("ERROR! " + err.message);
      });











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