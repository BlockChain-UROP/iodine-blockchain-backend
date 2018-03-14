var Migrations = artifacts.require("./Migrations.sol");
var Custodian = artifacts.require("./Custodian.sol");
var Asset = artifacts.require("./Asset.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Custodian);
  deployer.deploy(Asset);
};
