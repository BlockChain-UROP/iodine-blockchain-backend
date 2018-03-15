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