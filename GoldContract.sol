pragma solidity ^0.4.0;

contract GoldContract {

    address creator;

    string public welcome = "All the gold is in here.";

    /*
    It's hidden inside this array.
    (blockNumber => ownersAddress)
    */
    mapping(uint => address) public gold;

    //Right now we are talking about this bar.
    uint goldBlock;

    function GoldContract(){

        goldBlock = block.number;

    }

    function getWelcome() constant returns(string){

        return welcome;


    }

    function amITheOwner() constant returns(bool){

        return gold[goldBlock] == msg.sender;

    }


    function buyGold() returns(address){

       gold[goldBlock] = msg.sender;

       return gold[goldBlock];

    }


    function sellGold() returns(address){

        return gold[goldBlock] = 0x0;

    }


    function kill(){

      if(msg.sender == creator){

        suicide(creator);

      }
    }
}
