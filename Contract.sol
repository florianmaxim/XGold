pragma solidity ^0.4.6;

contract XGoldContract019 {

    address private creator;
    
    string  private  welcome   = "All the gold is in here.";
    
    /*
        Amount of blocks
    */
    
    uint  public amountOfBlocks;

    /*
        Properties of blocks (blockNumber => ownersAddress).
    */
    
    mapping (uint => address) public blockOwner;
    
    /*
        Block types ['available', 'gold', 'nebula']
    */
    mapping (uint => string) public blockType;
    
    
    /*
        Get blocks of sender
    */
    
    function getBlocksOfSender() constant returns (uint[]) {
        
        uint[] list;
        
        uint count = 1;
        for(uint i = 0; i<amountOfBlocks; i++){
            if(blockOwner[i]==msg.sender){
                list[count] = i;
            }
        }
        
        return list;
    }
    
    /*
        Get amount Of blocks
    */
    
    function getTotalAmountOfBlocks() constant returns (uint) {
        return amountOfBlocks;
    }
    
    /*
        Get owner of block
    */
    
    function getOwnerOfBlock(uint blockNumber) constant returns (address) {
        return blockOwner[blockNumber];
    }
    
    /*
        Get type of block
    */
    
    function getTypeOfBlock(uint blockNumber) constant returns (string) {
        return blockType[blockNumber];
    }

    /*
        Buy block
    */
    
    function isBlockForSale(uint blockNumber) private returns (bool){

        //Is block for sale or am I the owner already?
        if(blockOwner[blockNumber] == 0x0 || blockOwner[blockNumber] == msg.sender){
            return true;
        }else{
            return false;
        }

    }
    
    function buyGoldBlock(uint blockNumber) payable public returns(bool){

        if(isBlockForSale(blockNumber)){
            
            //Set myself as the owener
            blockOwner[blockNumber] = msg.sender;
            
            //Set value on 'gold;
            blockType[blockNumber] = 'gold';
            
            amountOfBlocks = amountOfBlocks+1;
            return true;
        }else{
            return false;
        }

    }
    
    
    function buyNebulaBlock(uint blockNumber) payable public returns(bool){

        if(isBlockForSale(blockNumber)){
            
            blockOwner[blockNumber] = msg.sender;
            
            //Set value on 'nebula'
            blockType[blockNumber] = 'nebula';
            
            amountOfBlocks = amountOfBlocks-1;
            return true;
        }else{
            return false;
        }

    }

    /*
        Sell block
    */
    
    function isSenderOwnerOfBlock(uint blockNumber) private returns (bool) {

        if(blockOwner[blockNumber] == msg.sender){
            return true;
        }else{
            return false;
        }

    }
    
    function sellBlock(uint blockNumber) payable public returns(bool){

        if(isSenderOwnerOfBlock(blockNumber)){
            
            blockOwner[blockNumber] = 0x0;
            
            //Set value back on 'available';
            blockType[blockNumber] = 'available';
            
            //Send money back
            //Check if sending back was successful
            if (!msg.sender.send(0.001 ether))
            throw;
            
            amountOfBlocks--;
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
    function getTotalBalance() constant returns(uint){
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