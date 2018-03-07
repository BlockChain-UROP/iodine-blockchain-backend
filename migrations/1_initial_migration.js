var Migrations = artifacts.require("./Migrations.sol");
var Custodian = artifacts.require("./Custodian.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Custodian);
};
