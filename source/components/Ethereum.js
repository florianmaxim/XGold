var Web3 = require('web3');

import * as config from '../../config.json';

const _ON = config.api.public;

const _GOLD_CONTRACT_ADDRESS = "0x876BCa49BD8E4667d295363Fd2028142C7ba396C";
const _GOLD_CONTRACT_ABI = [ { "constant": true, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "getOwnerOfBlock", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getWelcome", "outputs": [ { "name": "", "type": "string", "value": "All the gold is in here." } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getOwnerOfThisBlock", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256", "value": "1208225" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getMyBalance", "outputs": [ { "name": "", "type": "uint256", "value": "1.15792089237316195423570985008687907853269984665640564039455084007913129639935e+77" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "buyBlock", "outputs": [ { "name": "", "type": "string" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "sellBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "buyThisBlock", "outputs": [ { "name": "", "type": "string" } ], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "getMyAddress", "outputs": [ { "name": "", "type": "address", "value": "0xafc1f6739566ccf60d2a80edfbd6d9ee6361a3ea" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "isOwnerOfBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "isOwnerOfThisBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "welcome", "outputs": [ { "name": "", "type": "string", "value": "All the gold is in here." } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "sellThisBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getGoldBalance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "setGoldDonation", "outputs": [ { "name": "", "type": "uint256" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "isBlockForSale", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" } ]
let    GoldContract;

export default class Ethereum{

  constructor(){
  }

  init(){

    if(!_ON) return;

    if (typeof web3 !== 'undefined') {

      //If using MetaMask it will overwrite the windows web3 object, so we abandon that
      this.web3 = new Web3(web3.currentProvider);

    } else {

      //TODO doesn't work because of mixed content restriction in browser
      // fetch('http://localhost:8545', {
      //   method: 'get'
      // }).then((response) => {
      //   if(this.web3.net.listening){
      //     console.log('Connected to Ethereum node.');
      //   }else{
      //     console.log('No Ethereum node available. Falling back on public api (etherchain.org).');
      //   }
      //
      // }).catch((err) => {
      //
      //   console.log('No Ethereum node available. Falling back on public api (etherchain.org).');
      //
      // });

        //TODO fucking annoying!
        /*
          TODO NOTES(24/6/17)

          have it running on a https server doenst work because it of mixed content restrictions on chrome
          checking the localports first also doesnt work

          so you have to have it running on your local mashine with a full blockchain copy to be able to buy

          if you just let him try to connect all the time it slows the whole app down on chrome
          (windows only?!)

          => ONLY WORKING SOLUTION SO FAR:
             ONLY CONNECT TO RPC SERVER IF APP IS SERVED ON THE LOCAL MACHINE AS WELL.

          TODO: POSSIBLE SOLUTION: METAMASK?
          Using Metamask I can contribute to the network but can I access the same data
          like the whole chain???

          TODO UPDTAE(24/6/17)
          Via Metamask (MetaMask is a bridge that allows you to visit the distributed
          web of tomorrow in your browser today. It allows you to run Ethereum dApps
          right in your browser without running a full Ethereum node.)

          and async data handling it seems to work. ony need to arrange the data correctly...

          =>
        */

        if(location.hostname=='localhost'||location.hostname=='0.0.0.0'){

            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

        }


        if(_ON&&this.web3&&this.web3.isConnected()){

          console.log('Comming from local, watching the local ethereum node api.')

          this.connectionType = 'local';

          GoldContract = this.web3.eth.contract(_GOLD_CONTRACT_ABI).at(_GOLD_CONTRACT_ADDRESS);

          //Check if I am already the owner of this guy
          let message = GoldContract.getWelcome.call();
          console.log('[Blockchain] - '+message)


        }else{

          console.log('Comming from remote, watching the public api.')

          this.connectionType = 'remote';

        }

    }

  }

  makeTransaction(amountInEther, blockNumber){

    if(_ON&&this.web3&&this.web3.isConnected()){

      console.log('[Blockchain] - Transaction');
      console.log('[Blockchain] - Coinbase:'+this.web3.eth.coinbase);
      console.log('[Blockchain] - Contract:'+_GOLD_CONTRACT_ADDRESS);
      console.log('[Blockchain] - Amount:'+amountInEther);

      const data = {
  					from: this.web3.eth.coinbase,
  					to: _GOLD_CONTRACT_ADDRESS,
            value: this.web3.toWei(amountInEther,'ether'),
  				};

      let transactionHash = GoldContract.buyBlock.sendTransaction(blockNumber, data);

      console.log('[Blockchain] - TransactionHash:'+transactionHash);

    }
  }

  watchBlockchain(callback, interval){

    console.log(config.api.public)

    if(_ON&&this.web3&&this.web3.isConnected()){

      console.log('[Blockchain] - Watching the ethereum node api.')

      var filter = this.web3.eth.filter('latest');

      filter.watch((error, result) => {

        if (!error){

            let block = {}

            let that = this;

            this.web3.eth.getBlock(result, function(error, result){

              if(!error){

                console.log('[Blockchain] - Received Block #'+result.number);

                //Check ownership and availability
                block.isMine  = GoldContract.isOwnerOfBlock.call(result.number);

                if(!block.isMine){
                    block.isForSale = GoldContract.isBlockForSale.call(result.number);

                  console.log('[Blockchain] - The Block #'+result.number+' is for sale:'+block.isForSale);
                }else{
                  console.log('[Blockchain] - The Block #'+result.number+' is already mine.');
                }

                //Arrange block data for DiamondSquare Algorithm
                block.number            = result.number;
                block.hash              = result.hash;
                block.size              = result.size;

                // block.price             = result.gasLimit*result.gasUsed;
                block.price             = result.gasLimit*result.gasUsed;
                block.price             = (result.gasLimit*result.gasUsed)/10000000000000;


                console.log('result.gasLimit:'+result.gasLimit)
                console.log('result.gasUsed:'+result.gasUsed)

                console.log('block.price:'+block.price)

                console.log('Wei:'+block.price)
                console.log('Ether:'+block.price/1000000000000000000)

                // alert(block.price.toFixed(2))
                // block.price             = that.web3.fromWei(block.price , 'ether');

                let _transactions = [];

                result.transactions.forEach((txId) => {

                  let thus = that;

                  that.web3.eth.getTransaction(txId, (error, besult) => {

                      if(!error){

                        //TODO ARG! WHAT IS GOING ON HERE?!
                        // besult.price = thus.web3.toBigNumber(besult.value);

                        besult.amount =  besult.value.toNumber();

                        // console.log(JSON.stringify(besult));

                        _transactions.push(besult);


                      }else{

                        console.log('Could get the transaction.')

                      }

                  });


                });

                block.transactions = _transactions;

                console.log(block.transactions);

                callback(block, this.connectionType)

            }else{

                console.log('Could get the block.')

            }

          })

        }else{

          console.log('Could not even watch the chain.')

        }

      });

    /////////////////
    //PUBLIC API
    ////////////////

    }else{

      console.log('Watching the public api.')

      //ask for latest block in intervals
      setInterval(()=>{

        let url = 'https://etherchain.org/api/blocks/count';
        fetch(url).then(res => res.json()).then((out) => {

          let lastBlock = out.data[0].count;

          //fetch block's transaction
          let block = {}

          var url = 'https://etherchain.org/api/block/'+lastBlock;

          fetch(url).then(res => res.json()).then((out) => {

            block.number            = out.data[0].number;
            block.hash              = out.data[0].hash;
            block.size              = out.data[0].size;

            block.price             = (out.data[0].gasUsed)*(out.data[0].gasLimit);

            block.own = false;

            let url = 'https://etherchain.org/api/block/'+block.number+'/tx';

            fetch(url).then(res => res.json()).then((out) => {

              block.transactions = out.data;

              callback(block, this.connectionType)

            });

          });


        });

      }, interval)

    }

  }


  isConnected(){

    return _ON&&this.web3&&this.web3.isConnected()?true:false;
  }

  getConnectionType(){

    return this.connectionType;
  }

  getBalance(){

    if(_ON&&this.isConnected()){

      var balance = this.web3.eth.getBalance(this.web3.eth.coinbase);

      return balance.toNumber();

    }else{

      return 0;
    }

  }

}
