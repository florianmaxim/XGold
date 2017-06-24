var Web3 = require('web3');

const _ON = true;

export default class Ethereum{

  constructor(){

  }

  init(){

    if(!_ON) return;

    if (typeof web3 !== 'undefined') {

      this.web3 = new Web3(web3.currentProvider);

    } else {


      //TODO doesn't work because of mixed content restriction in browser
      // fetch('http://localhost:8545', {
      //   method: 'get'
      // }).then((response) => {

        //TODO fucking annoying!
        /*
          have it running on a https server doenst work because it of mixed content restrictions on chrome
          checking the localports first also doesnt work

          so you have to have it running on your local mashine with a full blockchain copy to be able to buy
        */

        //TODO this throws constantly errors if there is no rpc server running on chrome
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

        if(!isChrome)
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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

    }

  }

  watchBlockchain(callback, interval){


    //BLOCKCHAIN
    if(_ON&&this.web3&&this.web3.isConnected()){

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
