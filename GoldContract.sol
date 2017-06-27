pragma solidity ^0.4.0;

contract GoldContract {

    address private creator;

    string public welcome = "All the gold is in here.";

    /*
    It's all mapped in here (blockNumber => ownersAddress).
    */
    mapping (uint => address) private gold;

    function(){
        creator = msg.sender;
    }

    function getWelcome()     constant returns(string){
        return welcome;
    }

    function getBlockNumber() constant returns(uint){
        return block.number;
    }

    function getMyAddress()   constant returns(address){
        return msg.sender;
    }

    /*
        "SETTERS"

        ("public" defines that this method can change data from
                  the outside)
    */

    function isBlockForSale(uint blockNumber) returns (bool){
        if(gold[blockNumber] == 0x0){
            return true;
        }else{
            return false;
        }
    }

    function buyThisBlock() public returns(string){

        if(isBlockForSale(block.number)){
            gold[block.number] = msg.sender;
            return "Bought Block.";
        }else{
            return "Block is already taken.";
        }

    }

    function buyBlock(uint blockNumber) public returns(string){

        if(isBlockForSale(block.number)){
            gold[blockNumber] = msg.sender;
            return "Bought Block.";
        }else{
            return "Block is already taken.";
        }

    }

    /*
        "GETTERS"
        ("constant" means nothing changed on the blockchain,
                    means no costs at all.)
    */

    function getOwnerOfThisBlock() constant returns (address) {
        return gold[block.number];
    }

    function getOwnerOfBlock(uint blockNumber) constant returns (address) {
        return gold[blockNumber];
    }





    function kill(){

      if(msg.sender == creator){

        suicide(creator);

      }
    }

}
