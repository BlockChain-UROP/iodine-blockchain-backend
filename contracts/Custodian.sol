pragma solidity ^0.4.13;

contract Asset {
    
    // ######### Parameters ######## //
    
    string public name;
    address public publisher;
    address public holder;
    string public status;
    bool public avail;
    
    // ######### Events ######## //
    
    event EventAssetPublishedAt(uint256 time, string name, address publisher);
    event EventAssetTransferredAt(uint256 time, string name, address newHolder);
    event EventAssetUpdatedAt(uint256 time, string name, string status);
    event EventAssetRemovedAt(uint256 time, string name);

    // ######### Modifiers ######## //

    modifier onlyPublisher(address sender){
        require(sender == publisher);
        _;
    }

    modifier onlyHolder(address sender){
        require(sender == holder);
        _;
    } 
    
    modifier onlyHolderOrPublisher(address sender){
        require(sender == holder || sender == publisher);
        _;
    } 
    
    modifier isAvail(){
        require(avail == true);
        _;
    }

    // ######### Constructor ######## //
    
    function Asset(string _name, string _status, bool _avail, address _publisher) public {
        name = _name;
        publisher = _publisher;
        holder = _publisher;
        status = _status;
        avail = _avail;
        EventAssetPublishedAt(now, name, publisher);
    }
    
    // ######### Public Functions ######## //
    
    // Transfer //

    function transfer(address _receiver) public onlyHolder(msg.sender) isAvail() {
        holder = _receiver;
        EventAssetTransferredAt(now, name, holder);
    }

    // Updator //
    
    function updateStatus(string _status) public {
        status = _status;
        EventAssetUpdatedAt(now, name, status);
    }
    
    function updateName(string _name) public {
        name = _name;
        EventAssetUpdatedAt(now, name, status);
    }
    
    // Setter //
    
    function setNotAvail() public onlyHolder(msg.sender) {
        avail = false;
    }
    
    function setAvail() public onlyHolder(msg.sender) {
        avail = true;
    }
    
    // Remover //
    
    function remove() public onlyPublisher(msg.sender) {
        avail = false;
        holder = publisher;
        status = "Removed";
        EventAssetRemovedAt(now, name);
    }

}




contract Custodian {

    // ######### Parameters ######## //

    uint256 public volume;
    address public owner;
    mapping (uint256 => address) assets;
    
    // ######### Events ######## //

    event EventPublishAsset(uint256 id, address newAddress);
    
    // ######### Modifiers ######## //

    modifier onlyOwner(address sender){
        require(sender == owner);
        _;
    }
    
    // ######### Internal Functions ######## //
    
    function getNextID() internal returns (uint256) {
        volume = volume + 1;   // Increment total volume
        return volume;
    }

    // ######### Constructor ######## //

    function Custodian() public {
        volume = 0;
        owner = msg.sender;
    }
    
    // ######### Public Functions ######## //

    function publishAsset(string _name, string _status, bool _avail) public returns (uint256) {    //onlyOwner(msg.sender) is removed
        uint256 assetID = getNextID();
        address assetAddress = new Asset(_name, _status, _avail, msg.sender);
        assets[assetID] = assetAddress;
        EventPublishAsset(assetID, assetAddress);

        return assetID;
    }
    
    function getAssetAddrByID(uint256 assetID) public view returns (address) {    //onlyOwner(msg.sender)
        return assets[assetID];
    }
    
    function changeOwner(address newOwner) public onlyOwner(msg.sender) {
        owner = newOwner;
    }
}

// pragma solidity ^0.4.13;

// contract Client {

//     address owner; // currently not in use
//     uint256 seed;
//     address public creator;
//     uint256 randomState = 0;

//     event ClientSeedChangedAt(uint256 time);

//     modifier onlyCreater(address sender){
//         require(sender == creator);
//         _;
//     }

//     /** Internal functions **/
//     // function getRamdomNumber() internal view returns (uint256) {
//     //     uint256 random_number = uint(block.blockhash(block.number-1))%10 + 1;
//     //     // uint256(keccak256(seed));
//     //     return random_number;
//     // }
//     /************************/
    
//     function resetRandomState() public returns (uint256) {
//         randomState = 0;
//         return randomState;
//     }
    
//     function getRamdomNumber() public view returns (uint256) {
//         return uint(block.blockhash(block.number-1))%10 + 1;
//     }
    
//     function getRamdomNumberSeedDepend(uint256 max) public returns (uint256) {
//         // First Time
//         if (randomState == 0) {
//             randomState = uint256(keccak256(keccak256(seed)));
//         } else {
//             randomState = uint256(keccak256(keccak256(randomState)));
//         }
//         return uint256(randomState) % max + 1;
//     }


//     // Constructor
//     function Client(uint256 _seed, address _creator) public {
//         seed = _seed;
//         creator = _creator;
//     }

//     function changeSeed(uint256 newSeed) public returns (bool success) {
//         seed = newSeed;
//         ClientSeedChangedAt(now);

//         return true;
//     }
  
//     function getSeed() public view onlyCreater(msg.sender) returns (uint256) {
//         return seed;
//     }
  
// }


// contract Custodian {

//     uint256 public volume;   // total volume of Clients
//     address public owner;
//     uint256 seed;
//     mapping (uint256 => address) clients;   // store Client IDs --> Client addresses

//     event CreateClient(uint256 id, address newAddress);
//     event CustodianSeedChangedAt(uint256 time);    
//     event UpdateClientFinished(uint256 amountOfClients, uint256 time);    

//     modifier onlyOwner(address sender){
//         require(sender == owner);
//         _;
//     }

//     /** Internal functions **/
//     function getNextID() internal returns (uint256) {
//         volume = volume + 1;   // Increment total volume
//         return volume;
//     }

//     function setSeedByAddress(address clientAddress, uint256 newSeed) internal onlyOwner(msg.sender) {
//         Client client = Client(clientAddress);
//         assert(client.changeSeed(newSeed)); // should receive the value "true" after successfully called the client contract, 
//         // this is to make sure that the client contract does complete the request as expected 
//     }
//     /************************/

    
//     // Constructor
//     function Custodian() public {
//         volume = 0;
//         owner = msg.sender;
//     }

//     // Client creater
//     function createClient() public onlyOwner(msg.sender) returns (uint256) {
//         uint256 clientID = getNextID();
//         address clientAddress = new Client(seed , msg.sender);
//         clients[clientID] = clientAddress;
//         CreateClient(clientID, clientAddress);

//         return clientID;
//     }
    
//     function createClientBatch(uint256 batchSize) public onlyOwner(msg.sender) returns (uint256) {
//         for (uint256 i = 0; i < batchSize; i++) {
//             createClient();
//         }
//     }

//     // Return Client address
//     function getClientAddrByID(uint256 clientID) public view onlyOwner(msg.sender) returns (address) {
//         return clients[clientID];
//     }
    
//     function getSeed() public view onlyOwner(msg.sender) returns (uint256) {
//         return seed;
//     }

//     function setSeed(uint256 newSeed) public onlyOwner(msg.sender) {
//         setSeedByBatch(newSeed, volume);
//         // seed = newSeed;
//         // CustodianSeedChangedAt(now);

//         // // if there exists client contracts 
//         // if (volume >= 1) { 
//         //     for (uint256 i = 1; i <= volume; i++) {
//         //         setSeedByAddress(getClientAddrByID(i), newSeed);
//         //     }
//         // }
//     }
    
//     function setSeedByBatch(uint256 newSeed, uint256 batchSize) public onlyOwner(msg.sender) {
//         seed = newSeed;
//         CustodianSeedChangedAt(now);

//         // if there exists client contracts 
//         if (batchSize >= 1 && volume >=1 && batchSize <= volume) { 
//             for (uint256 i = 1; i <= batchSize; i++) {
//                 setSeedByAddress(getClientAddrByID(i), newSeed);
//             }
//         }
//     }
    
//     function changeOwner(address newOwner) public onlyOwner(msg.sender) {
//         owner = newOwner;
//     }
// }