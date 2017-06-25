pragma solidity ^0.4.0;

contract GoldContract {

    string welcome = "The gold is here";

    //all the gold is in here (blockNumber => ownerAddress)
    mapping(uint => address) public gold;

    //this is the bar we're talking about
    uint goldBlock;

    function GoldContract(){

        goldBlock = block.number;

    }

    function amITheOwner() returns(bool){

        return gold[goldBlock] == msg.sender;

    }


    function buyGold() returns(address){

       gold[goldBlock] = msg.sender;

       return gold[goldBlock];

    }


    function sellGold() returns(uint){

        gold[goldBlock] = 0x0;

    }



}
