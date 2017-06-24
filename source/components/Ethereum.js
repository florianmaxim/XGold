var Web3 = require('web3');

export default class Ethereum{

  constructor(){

    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

    this.peerCount = 0;

    this.connectionTye = null;


      if(this.web3.isConnected()) {

        this.connectionType = 'node';


        this.coinbase = this.web3.eth.coinbase;

       } else {

         this.connectionType = 'api';

       }

  }

  watchBlockchain(callback, interval){

    //BLOCKCHAIN
    if(this.isConnected()){

      var filter = this.web3.eth.filter('latest');

      filter.watch((error, result)=>{
        if (!error)

          var block = this.web3.eth.getBlock(result);

          // console.log('('+this.connectionType+')lastBlock:'+block.number)
          block.number            = block.number;
          block.hash              = block.hash;
          block.size              = block.size;

          block.price             = block.gasLimit*block.gasUsed;

          block.own = false;

          let _transactions = [];

          block.transactions.forEach((txId) => {

          let  _tx        = this.web3.eth.getTransaction(txId);

               _tx.price = this.web3.toBigNumber(_tx.value)
               _tx.amount =  _tx.price.toNumber()

            _transactions.push(_tx)

          })


          block.transactions = _transactions;

          // console.log('block.transactions:'+block.transactions.length)

          callback(block, this.connectionType)

      });

    /////////////////
    //PUBLIC API
    ////////////////

    }else{

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
            block.transactionAmount = out.data[0].tx_count;

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
    return this.web3.isConnected();
  }

  getConnectionType(){
    return this.connectionType;
  }

  getBalance(){

    if(this.isConnected()){

      var balance = this.web3.eth.getBalance(this.coinbase);

      return balance.toNumber();

    }else{

      return 0;
    }

  }

}
