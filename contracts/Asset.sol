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