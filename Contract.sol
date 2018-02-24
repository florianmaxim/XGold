pragma solidity ^0.4.6;

contract XGoldContract005 {

    address private creator;
    
    string  public  welcome   = "All the gold is in here.";
    
    uint public amount;

    /*
        Properties (blockNumber => ownersAddress).
    */
    
    mapping (uint => address) private gold;

    
    /*
        Get Amount Of Blocks
    */
    
    function getAmountOfBlocks() constant returns (uint) {
        return amount;
    }
    
    /*
        Get owner
    */
    
    function getOwnerOfBlock(uint blockNumber) constant returns (address) {
        return gold[blockNumber];
    }

    /*
        Buy block
    */
    
    function isBlockForSale(uint blockNumber) returns (bool){

        if(gold[blockNumber] == 0x0){
            return true;
        }else{
            return false;
        }

    }

    
    function buyBlock(uint blockNumber) payable public returns(bool){

        if(isBlockForSale(blockNumber)){
            gold[blockNumber] = msg.sender;
            
            amount++;
            return true;
        }else{
            return false;
        }

    }

    /*
        Sell block
    */
    
    function isSenderOwnerOfBlock(uint blockNumber) returns (bool) {

        if(gold[blockNumber] == msg.sender){
            return true;
        }else{
            return false;
        }

    }
    
    function sellBlock(uint blockNumber) payable public returns(bool){

        if(isSenderOwnerOfBlock(blockNumber)){
            
            gold[blockNumber] = 0x0;
            
            //Send money back
            //Check if sending back was successful
            if (!msg.sender.send(0.001 ether))
            throw;
            
            amount--;
            return true;
            
        }else{
            return false;
        }

    }
    
    /*
        Get welcome
    */
    function getWelcome() constant returns(string){
        return welcome;
    }

    /*
        Get balance
    */
    function getBalance() constant returns(uint){
        return this.balance;
    }

    /*
        Kill
    */
    function kill(){
      if(msg.sender == creator){
        suicide(creator);
      }
    }


}