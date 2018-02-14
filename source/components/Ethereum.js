import * as config from '../../config.json';

const Web3 = require('web3');

const _ON = config.api.public;

const _GOLD_CONTRACT_ADDRESS = "0x876BCa49BD8E4667d295363Fd2028142C7ba396C";
const _GOLD_CONTRACT_ABI = [ { "constant": true, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "getOwnerOfBlock", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getWelcome", "outputs": [ { "name": "", "type": "string", "value": "All the gold is in here." } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getOwnerOfThisBlock", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256", "value": "1208225" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getMyBalance", "outputs": [ { "name": "", "type": "uint256", "value": "1.15792089237316195423570985008687907853269984665640564039455084007913129639935e+77" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "buyBlock", "outputs": [ { "name": "", "type": "string" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "sellBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "buyThisBlock", "outputs": [ { "name": "", "type": "string" } ], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "getMyAddress", "outputs": [ { "name": "", "type": "address", "value": "0xafc1f6739566ccf60d2a80edfbd6d9ee6361a3ea" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "isOwnerOfBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "isOwnerOfThisBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "welcome", "outputs": [ { "name": "", "type": "string", "value": "All the gold is in here." } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "sellThisBlock", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getGoldBalance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "setGoldDonation", "outputs": [ { "name": "", "type": "uint256" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "isBlockForSale", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" } ]
let    GoldContract;

export default class Ethereum{

  constructor(){
  }

  init(){

/*     if(!_ON) return;

    if (typeof web3 !== 'undefined') {

      //If using MetaMask it will overwrite the windows web3 object, so we abandon that
      this.web3 = new Web3(web3.currentProvider);

    } else {

      fetch('http://localhost:8545', {
        method: 'get'
      }).then((response) => {
        if(this.web3.net.listening){
          console.log('Connected to Ethereum node.');
        }else{
          console.log('No Ethereum node available. Falling back on public api (etherchain.org).');
        }
      
      }).catch((err) => {
      
        console.log('No Ethereum node available. Falling back on public api (etherchain.org).');
      
      });

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

    } */

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

    if(_ON&&this.web3&&this.web3.isConnected()){

      /* console.log('[Blockchain] - Watching the ethereum node api.')

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

      }); */

    /////////////////
    //PUBLIC API
    ////////////////

    }else{

      console.log(`[Ethereum] Fetching Blockchain data from public API`)

      //ask for latest block in intervals
      // setInterval(()=>{

        let url = 'https://api.blockcypher.com/v1/eth/main';

        //Fetch current block height
        
        fetch(url)
        .then(dataWrappedByPromise => dataWrappedByPromise.json())
        .then(data => {
            
          console.log(`[Ethereum] Latest Block ${data.height}`);

          let url = `https://api.blockcypher.com/v1/eth/main/blocks/${data.height}`;

          let block = {};

          //Fetch data of current block
          fetch(url)
          .then(res => res.json())
          .then((data) => {

            block.number            = data.height;
            block.hash              = data.hash;
            block.size              = data.size;

            block.price             = 123;
            

            block.transactions      = data.txids;

            console.log(block);

            callback(block, this.connectionType)

            /* let url = 'https://etherchain.org/api/block/'+block.number+'/tx';

            fetch(url)
            .then(res => res.json())
            .then((data) => {

              block.transactions =resout.data;

              callback(block, this.connectionType)

            }); */

          });

        })
        .catch((err) => {
          console.log(err)
        });

    //  }, interval)

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
