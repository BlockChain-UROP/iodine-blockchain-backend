pragma solidity ^0.4.13;

contract Asset {
    
    // ######### Constants ######## //
    
    string[] public AVAILABILITY = ["available", "unavailable", "removed"];
    
    // ######### Parameters ######## //
    
    string public name;
    address public publisher;
    address public holder;
    string public condition;
    uint8 public availStatusID; 
    
    // ######### Events ######## //
    
    event EventAssetPublishedAt(uint256 time, string name, address publisher);
    event EventAssetTransferredAt(uint256 time, string name, address newHolder);
    event EventAssetUpdatedAt(uint256 time, string name, string condition, string avail);
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
    
    modifier onlyAvail(){
        require(availStatusID == 0);
        _;
    }

    // ######### Constructor ######## //
    
    function Asset(string _name, string _condition, uint8 _availStatusID, address _publisher) public {
        name = _name;
        publisher = _publisher;
        holder = _publisher;
        condition = _condition;
        availStatusID = _availStatusID;
        EventAssetPublishedAt(now, name, publisher);
    }
    
    // ######### Public Functions ######## //
    
    // Transfer //

    function transfer(address _receiver) public onlyHolder(msg.sender) onlyAvail() {
        holder = _receiver;
        EventAssetTransferredAt(now, name, holder);
    }

    // Updator //
    
    function updateCondition(string _condition) public {
        condition = _condition;
        EventAssetUpdatedAt(now, name, condition, AVAILABILITY[availStatusID]);
    }
    
    function updateName(string _name) public {
        name = _name;
        EventAssetUpdatedAt(now, name, condition, AVAILABILITY[availStatusID]);
    }
    
    function updateAvail(uint8 _availStatusID) public {
        availStatusID = _availStatusID;
        EventAssetUpdatedAt(now, name, condition, AVAILABILITY[availStatusID]);
    }
    
    // Remover //
    
    function remove() public onlyPublisher(msg.sender) {
        availStatusID = 2;
        holder = publisher;
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

    function publishAsset(string _name, string _condition, uint8 _availStatusID) public returns (uint256) {    //onlyOwner(msg.sender) is removed
        uint256 assetID = getNextID();
        address assetAddress = new Asset(_name, _condition, _availStatusID, msg.sender);
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
