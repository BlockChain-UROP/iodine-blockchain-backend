pragma solidity ^0.4.13;

contract Asset {
    
    // ######### Parameters ######## //
    
    address public publisher;
    address public holder;
    string public name;
    string[] public status = ["NotAvailable", "Available", "Removed"];
    uint8 public availStatusID; 
    
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
    
    
    modifier onlyAvail(){
        require(availStatusID == 1);
        _;
    }

    // ######### Constructor ######## //
    
    function Asset(string _name, uint8 _availStatusID, address _publisher) public {
        publisher = _publisher;
        holder = _publisher;
        name = _name;
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
    
    function updateName(string _name) public {
        name = _name;
        EventAssetUpdatedAt(now, name, status[availStatusID]);
    }
    
    function updateAvailStatus(uint8 statusID) public onlyHolder(msg.sender) {
        availStatusID = statusID;
        EventAssetUpdatedAt(now, name, status[statusID]);
    }
    
    // Remover //
    
    function remove() public onlyPublisher(msg.sender) {
        availStatusID = 2; // status: Removed
        holder = publisher;
        EventAssetRemovedAt(now, name);
    }

}