pragma solidity ^0.4.0;

contract GoldContract {

    address private creator;

    string  public  welcome   = "All the gold is in here.";
    uint    public  goldValue = 0;

    /*
    It's all mapped in here (blockNumber => ownersAddress).
    */
    mapping (uint => address) private gold;

    /*
     "payable" automatically gives the value to the account
    */
    function GoldContract() payable{
        creator = msg.sender;
    }

    /*
        HELPERS
    */

    function isBlockForSale(uint blockNumber)  returns (bool){
        if(gold[blockNumber] == 0x0){
            return true;
        }else{
            return false;
        }
    }

    function isOwnerOfBlock(uint blockNumber)  returns (bool) {
        if(gold[blockNumber] == msg.sender){
            return true;
        }else{
            return false;
        }
    }

    /*
        SETTERS

        ("public" defines that this method can change data from
                  the outside)
    */

    //buy
    function buyThisBlock()             public returns(string){

        if(isBlockForSale(block.number)){
            gold[block.number] = msg.sender;
            return "Bought Block.";
        }else{
            return "Block is already taken.";
        }

    }

    function buyBlock(uint blockNumber) public returns(string){

        if(isBlockForSale(blockNumber)){
            gold[blockNumber] = msg.sender;
            return "Bought Block.";
        }else{
            return "Block is already taken.";
        }

    }

    //sell
    function sellThisBlock(){
        if(isOwnerOfBlock(block.number)){
            gold[block.number] = 0x0;
        }
    }

    function sellBlock(uint blockNumber){
        if(isOwnerOfBlock(blockNumber)){
            gold[blockNumber] = 0x0;
        }
    }

    /*
        "GETTERS"
        ("constant" means nothing changed on the blockchain,
                    means no costs at all.)
    */

    //info
    function getWelcome()     constant returns(string){
        return welcome;
    }

    function getBlockNumber() constant returns(uint){
        return block.number;
    }

    function getMyAddress()   constant returns(address){
        return msg.sender;
    }

    //block
    function getOwnerOfThisBlock()             constant returns (address) {
        return gold[block.number];
    }

    function getOwnerOfBlock(uint blockNumber) constant returns (address) {
        return gold[blockNumber];
    }

    //account
    function getMyBalance()                    constant returns (uint){
        return msg.sender.balance;
    }

    //contract
    function setGoldDonation() payable returns(uint){
        //return new GoldBalance
        return getGoldBalance();
    }

    function getGoldBalance() constant returns(uint){
        return this.balance;
    }

    //kill
    function kill(){

      if(msg.sender == creator){

        suicide(creator);

      }
    }

}
