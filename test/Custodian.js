var Custodian = artifacts.require("./Custodian.sol");

contract('Custodian', function(accounts) {
  it("first test", async function() {
    var instance = await Custodian.deployed();

    var seed = await instance.getSeed();
    assert.equal(seed, 0);

    var client = await instance.createClient();
    console.log(client);

    var volume = await instance.volume.call();
    console.log(volume);
    });
  });