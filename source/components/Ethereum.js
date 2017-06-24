var Web3 = require('web3');

const _ON = true;

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

        }else{

          console.log('Comming from remote, watching the public api.')

          this.connectionType = 'remote';

        }

    }

  }

  watchBlockchain(callback, interval){

    if(_ON&&this.web3&&this.web3.isConnected()){

      console.log('Watching the ethereum node api.')

      var filter = this.web3.eth.filter('latest');

      filter.watch((error, result) => {

        if (!error){

            let block = {}

            let that = this;

            this.web3.eth.getBlock(result, function(error, result){

              if(!error){

                // Arrange array for DiamondSquare Algorithm
                block.number            = result.number;
                block.hash              = result.hash;
                block.size              = result.size;

                block.price             = result.gasLimit*result.gasUsed;

                block.own = false;

                block.transactions      = result.transactions;

                let _transactions = [];

                block.transactions.forEach((txId) => {

                  // console.log(that);

                  let thus = that;

                  that.web3.eth.getTransaction(txId, (error, result) => {

                      console.log(result);

                      if(!error){

                        //TODO ARG! WHAT IS GOING ON HERE?!

                        result.price = thus.web3.toBigNumber(result.v)
                        result.amount =  result.price.toNumber()

                        _transactions.push(result);

                      }else{

                      }

                  });

                });

                block.transactions = _transactions;

                // console.log(block.transactions);

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
