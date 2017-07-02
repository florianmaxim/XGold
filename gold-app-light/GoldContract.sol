pragma solidity ^0.4.0;

contract GoldContract {

    address private creator;

    string  public  welcome      = "All the gold is in here.";

    uint    public  lastestGold  = block.number;

    uint    public  minimumPrice = .01 ether;

    struct Gold {
        uint blockNumber;
        address ownerAddress;
        uint value; //in wei
    }

    Gold[] private treasure;

    function GoldContract() payable {
        creator = msg.sender;
    }

    //helpers
    function removeGoldFromTreasure(uint index) private returns(bool) {

        for (uint i = index; i<treasure.length-1; i++){
            treasure[i] = treasure[i+1];
        }
        delete treasure[treasure.length-1];
        treasure.length--;

        return true;
    }


    function calculatePurchaseValue(uint purchasePrice, uint goldNumber) public constant returns(uint){

        uint bonus = (goldNumber*now);

        uint newValue;

        if(now%2==0){
            newValue = purchasePrice+bonus;
        }else{
            newValue = purchasePrice-bonus;
        }

        //return purchasePrice - newValue;

        //short: add nothing
        return purchasePrice;
    }

    function calculateRetailValue  (uint purchasePrice, uint goldNumber) public constant returns(uint){

        uint bonus = (goldNumber*now);

        uint newValue;

        if(now%2==0){
            newValue = purchasePrice+bonus*2;
        }else{
            newValue = purchasePrice+bonus;
        }

        //return purchasePrice - newValue;

        //short: add a plus
        return purchasePrice + 1 ether;
    }


    function buyGold(uint blockNumber)  payable public returns(bool, string, uint){

        //Validate block (<block.number)
        if(blockNumber>block.number)
            return (false, 'Gold not valid', 0);

        //Validate purchase price (>minimum)
        if(msg.value<minimumPrice)
            return (false, 'Purchase price below mimimum', 0);

        //Validate availability
        uint length = treasure.length;

        for(uint i = 0; i < length;i++){

            Gold memory currentGold;
                        currentGold = treasure[i];

            if(currentGold.blockNumber == blockNumber){

                if(currentGold.ownerAddress != 0x0){
                    return (false, 'Gold is already sold', 0);
                }

            }

        }

        //Take the available gold
        Gold memory newGold;
                    newGold.blockNumber = blockNumber;
                    newGold.ownerAddress = msg.sender;
                    newGold.value = calculatePurchaseValue(msg.value, blockNumber);

        treasure.push(newGold);

        //if new value is higher
        if(newGold.value>msg.value)
            //check if we have that
            if(this.balance>newGold.value-msg.value)
                //if so send difference back
                msg.sender.transfer(newGold.value-msg.value);


        return (true, 'Gold successfully purchased', newGold.value);

    }

    function sellGold(uint blockNumber) payable public returns(bool, string, uint){

        uint length = treasure.length;

        for(uint i = 0; i < length;i++){

            Gold memory currentGold;
                        currentGold = treasure[i];

            //is it mine?
            if(currentGold.blockNumber == blockNumber){

                //Is it the one I want to sell?
                if(currentGold.ownerAddress == msg.sender){

                    //Remove the item from the treasure array
                    removeGoldFromTreasure(i);

                    //Transfer retail value to seller
                    uint retailValue = calculateRetailValue(currentGold.value, blockNumber);
                    msg.sender.transfer(retailValue);

                    return (true, 'Gold successfully sold.', retailValue);
                }else{
                    return (false, 'Gold is not yours.', 0);
                }

            }

        }

        //went through all of them but didnt find it
        return (false, 'Gold not found.', 0);

    }


    function getGoldOf(address ownerAddress) public constant returns(uint[]){

        uint length = treasure.length;

        uint[] memory blockNumbers    = new uint[](length);

        for(uint i = 0; i < length;i++){

            Gold memory currentGold;
                        currentGold = treasure[i];

            if(currentGold.ownerAddress == ownerAddress){

                blockNumbers[i]  = currentGold.blockNumber;

            }
        }

         return (blockNumbers);
    }

    function getMyGold()                     public constant returns(uint[]){

        uint length = treasure.length;

        uint[] memory blockNumbers    = new uint[](length);

        for(uint i = 0; i < length;i++){

            Gold memory currentGold;
                        currentGold = treasure[i];

            if(currentGold.ownerAddress == msg.sender){

                blockNumbers[i]  = currentGold.blockNumber;

            }
        }

         return (blockNumbers);
    }


    //welcome
    function setWelcome(string newMessage) public returns (string){
      if(msg.sender == creator){
        welcome = newMessage;
        return welcome;
      }
      return 'This is not your treasure';
    }

    function kill(){
      if(msg.sender == creator){
        suicide(creator);
      }
    }

    function () {
        throw;
    }

}
