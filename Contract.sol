pragma solidity ^0.4.6;

contract XGoldContract047 {

    address private creator;
    
    string  private  welcome   = "The Blockchain Looks Corny.";
    
    /*
        Amount of blocks
    */
    
    uint  public amountOfBlocks;
    
    /*
        Block
    */
    
    struct Block {
        address owner;
        uint number;
        string state;
    }


    /*
        blocks
    */
    
    mapping (uint => Block) public blocks;
    
    Block[] public arrayBlocks;
    
    /*
        Get total amount of blocks
    */
    
    function getTotoalAmountOfBlocks() constant returns (uint) {
        return amountOfBlocks;
    }
    
    
    /*
        Get owner of block
    */
    
    function getOwnerOfBlock(uint blockNumber) constant returns (address) {
        
        address owner;
        
        for(uint i = 0;i<amountOfBlocks+1;i++){
            
            if(blocks[i].number == blockNumber){
                
                return blocks[i].owner;
            }
        }
        
    }
    
    
    /*
        Get blocks of sender
    */
    
    
    function getBlocksOfSender() constant returns (uint[]) {
        
        
        uint[] list;
        
        for(uint i = 0;i<amountOfBlocks+1;i++){
            
            if(blocks[i].owner == msg.sender){
                
                list.push(blocks[i].number);
            }
        }
        
        return list;
    }
    
    
    /*
        Is block for sale
    */
    
    function isBlockForSale(uint blockNumber) constant returns (bool){

 
        for(uint i = 0;i<amountOfBlocks+1;i++){
            
            if(blocks[i].number == blockNumber){
                
                return false;
            }
        }
        
        return true;

    }
    
    /*
        Buy gold block
    */
    
    function buyGoldBlock(uint blockNumber) payable public returns(bool){
        
        if(!isBlockForSale(blockNumber)) return false;
        
        amountOfBlocks = amountOfBlocks+1;
        
        blocks[amountOfBlocks] = Block(msg.sender, blockNumber, "gold");
        
        arrayBlocks.push(Block(msg.sender, blockNumber, "gold"));

        return true;

    }
    
    /*
        Buy nebula block
    */
    
    function buyNebulaBlock(uint blockNumber) payable public returns(bool){
        
        if(!isBlockForSale(blockNumber)) return false;
        
        amountOfBlocks = amountOfBlocks+1;
        
        blocks[amountOfBlocks] = Block(msg.sender, blockNumber, "nebula");
        
        arrayBlocks.push(Block(msg.sender, blockNumber, "nebula"));

        return true;

    }
    

    /*
        Is sender owner of block
    */
    
    function isSenderOwnerOfBlock(uint blockNumber) constant returns (bool) {

        for(uint i = 0;i<amountOfBlocks+1;i++){
            
            if(blocks[i].number == blockNumber){
                
                if(blocks[i].owner == msg.sender){
                    return true;
                }
                
                return false;
                
            }
            
        }

    }
    
    
    /*
    
        Sell block
    */
    
    function sellBlock(uint blockNumber) payable public returns(bool){

        if(!isSenderOwnerOfBlock(blockNumber)) return;
            
            
        for(uint i = 0;i<amountOfBlocks+1;i++){
            
            if(blocks[i].number == blockNumber){
                
                blocks[i].owner = 0x0;
                blocks[i].state = 'available';
                
                
                //Send money back
                //Check if sending back was successful
                if (!msg.sender.send(0.001 ether))
                throw;
                
                amountOfBlocks--;
                return true;
                
            }
            
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