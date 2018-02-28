pragma solidity ^0.4.6;

contract XGoldContract040 {

    address private creator;
    
    string  private  welcome   = "All the gold is in here.";
    
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
        Buy block
    */
    
    function buyGoldBlock(uint blockNumber) payable public returns(bool){
        
        
        amountOfBlocks = amountOfBlocks+1;
        
        blocks[amountOfBlocks] = Block(msg.sender, blockNumber, "gold");
        
        arrayBlocks.push(Block(msg.sender, blockNumber, "gold"));

        return true;

    }
    
    
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
        Kill
    */
    function kill(){
      if(msg.sender == creator){
        suicide(creator);
      }
    }


}