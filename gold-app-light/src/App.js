import React, { Component } from 'react';

import Scroll from 'react-scroll';

import './App.css';

import Web3 from 'web3';

// var Link       = Scroll.Link;
// var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;

const BLOCKCHAIN_NODE = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const _GOLD_CONTRACT_ADDRESS = "0xd5284355b5A051c28c5CbEdC977be646a5D4cc5c";
const _GOLD_CONTRACT_ABI     = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "sellGold", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "string" } ], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "getMyGold", "outputs": [ { "name": "", "type": "uint256[]", "value": [] } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newMessage", "type": "string" } ], "name": "setWelcome", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "blockNumber", "type": "uint256" } ], "name": "buyGold", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "removeGoldFromTreasure", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "welcome", "outputs": [ { "name": "", "type": "string", "value": "The finest in crypto gold." } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "ownerAddress", "type": "address" } ], "name": "getGoldOf", "outputs": [ { "name": "", "type": "uint256[]", "value": [] } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getLatestGold", "outputs": [ { "name": "", "type": "uint256", "value": "1221598" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": true, "type": "constructor" }, { "payable": false, "type": "fallback" } ]

let    GoldContract;

GoldContract = BLOCKCHAIN_NODE.eth.contract(_GOLD_CONTRACT_ABI).at(_GOLD_CONTRACT_ADDRESS);

Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

function calculateBlockPrice(block){
  let price;

      price = (block.gasUsed*block.gasLimit);

      price = BLOCKCHAIN_NODE.fromWei(price, 'ether')*(block.size*block.size);

  return price;
}

let DEFAULT = {
  text:{
    nav: {
      more: 'show more',
      less: 'show less'
    }
  },
  exchangeRates: [
    ["ETH", 1]
  ],

  itemsOffsetStep: 5
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: GoldContract.welcome.call(),
      balance: BLOCKCHAIN_NODE.eth.getBalance(_GOLD_CONTRACT_ADDRESS),

      mode:'blockchain',

      block: {
        number:0
      },

      _blockchain: {
        blocks: []
      },
      _wallet: {
        blocks: []
      },

      exchangeRate: 0,
      itemsOffset: DEFAULT.itemsOffsetStep,

      filter: {
        availability: 'forsale' // forsale, sold, mine
      }
    }
  }


  buyBlock(event, index, blockNumber, amountInEther){
    const data = {
          from:  BLOCKCHAIN_NODE.eth.coinbase,
          to:    _GOLD_CONTRACT_ADDRESS,
          value: BLOCKCHAIN_NODE.toWei(amountInEther,'ether'),
        };

    let transactionHash = GoldContract.buyGold.sendTransaction(blockNumber, data);

    let _blocks = this.state._blockchain.blocks;
        _blocks[index].transactionHash = transactionHash;

        this.setState({
          _blockchain: {
            blocks: _blocks
          }
        })

    // //console.log('[Blockchain] - TransactionHash:'+transactionHash);
  }

  sellBlock(event, index, blockNumber){

    const data = {
          from:  BLOCKCHAIN_NODE.eth.coinbase,
          to:    _GOLD_CONTRACT_ADDRESS
        };

    let transactionHash = GoldContract.sellGold.sendTransaction(blockNumber, data);


    let _blocks = this.state._wallet.blocks;
        _blocks[index].transactionHash = transactionHash;

        this.setState({
          _wallet: {
            blocks: _blocks
          }
        })

    //console.log('[Blockchain] - TransactionHash:'+transactionHash);
  }

  getGold(){

    let goldOfThisAddress = GoldContract.getMyGold.call();

    let _goldOfThisAddress =[]

    const _blocks = [];

    goldOfThisAddress.forEach((gold) => {

      let blockNumber = gold.toNumber();

          if(blockNumber===0) return;

      _goldOfThisAddress.push(blockNumber);


      BLOCKCHAIN_NODE.eth.getBlock(blockNumber, (error, result) =>{

        if(!error){
          // //console.log('[Blockchain] - Received block #'+result.number)

          let block = result;
              block.price = calculateBlockPrice(block);
              block.transactionHash = false;

             _blocks.push(block);

          this.setState({
            _wallet: {
              block: block,
              blocks: _blocks,
            },

            balance: BLOCKCHAIN_NODE.eth.getBalance(_GOLD_CONTRACT_ADDRESS)
          })

        }
      });

    })

  }


  showLessItems(event){
    this.setState({
      itemsOffset: (this.state.itemsOffset-DEFAULT.itemsOffsetStep)>0?this.state.itemsOffset-DEFAULT.itemsOffsetStep:0
    })
  }

  showMoreItems(event){

    event.preventDefault();

    let lowestLoadedBlock, lowestRequiredBlock;

    if(this.state._blockchain.blocks.length<=this.state.itemsOffset){

      if(this.state._blockchain.blocks.length<1) return;

      lowestLoadedBlock            = this.state._blockchain.blocks[this.state._blockchain.blocks.length-1].number;
      lowestRequiredBlock          = lowestLoadedBlock-(DEFAULT.itemsOffsetStep);

      // alert('Loaded down to:'+lowestLoadedBlock+'\n'+'Need to load down to:'+lowestRequiredBlock)

      for(let i = lowestLoadedBlock-1;  i > lowestRequiredBlock-1; i--){

        //console.log('Loading Block #'+i);

        BLOCKCHAIN_NODE.eth.getBlock(i, (error, result) =>{

          if(!error){
            //console.log('[Blockchain] - Received block #'+result.number)

            let block = result;
                block.price = calculateBlockPrice(block);
                block.transactionHash = false;

                // block.owned = (GoldContract.getOwnerOfThisBlock.call(result.number)==BLOCKCHAIN_NODE.eth.coinbase)?true:false;

            const _blocks = this.state._blockchain.blocks;
                  _blocks.push(block);

            this.setState({
              _blockchain:{

                block: block,
                blocks: _blocks,

              },

              balance: BLOCKCHAIN_NODE.eth.getBalance(_GOLD_CONTRACT_ADDRESS)
            })

          }
        });

      }
    }

    this.setState({
      itemsOffset: this.state.itemsOffset+DEFAULT.itemsOffsetStep
    })

    scroll.scrollMore(500);
  }

  switchCurrency(event){
      event.preventDefault();

      this.setState({
        exchangeRate: this.state.exchangeRate<DEFAULT.exchangeRates.length-1?this.state.exchangeRate+1:0
      })
  }

  setMode(event, _mode){
    event.preventDefault();
    this.setState({
      mode: _mode
    })
  }


  componentWillMount(){
    //scrolling
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');

    //Watch latest blocks
    const filter = BLOCKCHAIN_NODE.eth.filter('latest');

    filter.watch((error, result) => {

      this.getGold();

      BLOCKCHAIN_NODE.eth.getBlock(result, (error, result) =>{

        if(!error){
          //console.log('[Blockchain] - Received block #'+result.number)

          let block = result;
              block.price = calculateBlockPrice(block);
              block.transactionHash = false;

              // block.owned = (GoldContract.getOwnerOfThisBlock.call(result.number)==BLOCKCHAIN_NODE.eth.coinbase)?true:false;

          const _blocks = this.state._blockchain.blocks;
                _blocks.unshift(block);

            this.setState({
              _blockchain: {
                block: block,
                blocks: _blocks,
              },
              balance: BLOCKCHAIN_NODE.eth.getBalance(_GOLD_CONTRACT_ADDRESS)
            })

        }
      });

    })

  }

  componentDidMount(){
    //init scrolling
    Events.scrollEvent.register('begin', function(to, element) {
      //console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      //console.log("end", arguments);
    });

    scrollSpy.update();
    //Fetch latest exchange rates
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {

      Object.keys(json).map((key) => {
        DEFAULT.exchangeRates.push([(key), json[key]]);
      });

    })
    .catch(function(ex) {
      //console.log('parsing failed', ex)
    })
  }


  render() {

    let blocks = this.state.mode==='blockchain'?this.state._blockchain.blocks:this.state._wallet.blocks;

    return (
      <div className="gold">

        <div className="gold-header">
          <div className="gold-header-message">{this.state.message}</div>
          <div className="gold-header-currency">{(BLOCKCHAIN_NODE.fromWei(this.state.balance, 'ether').toNumber()*DEFAULT.exchangeRates[this.state.exchangeRate][1]).format(2, 3, '.', '.')}</div>
          <div className="gold-header-currency" onClick={(event) => {this.switchCurrency(event)}}>{DEFAULT.exchangeRates[this.state.exchangeRate][0]}</div>
        </div>

        <div className="gold-nav">
          <div className={this.state.mode==='blockchain'?'button button-active':'button'} onClick={(event)=>{this.setMode(event, 'blockchain')}}>blockchain</div>
          <div className={this.state.mode==='wallet'?'button button-active':'button'} onClick={(event)=>{this.setMode(event, 'wallet')}}>wallet ({this.state._wallet.blocks.length})</div>
        </div>

        <div className="blocks-labels">
          <div className="button button-secondary">
          Latest Block: {BLOCKCHAIN_NODE.eth.blockNumber.format(0, 3, '.', ',')}
          </div>
        </div>

        <div className="blocks">
          {blocks.slice(0, this.state.itemsOffset).map((block, index) => {
            return (
              <div className="block-row" key={index}>
                <div className="block-row-data">
                  <p style={{fontWeight:'bold', margin:'0'}}># {block.number}</p>
                  {block.hash}
                </div>
                <div className="block-row-buy">
                  {
                    this.state.mode==='blockchain'
                    ?

                    <div className="button" onClick={(event)=>{this.buyBlock(event, index, block.number, block.price)}}>
                      {block.transactionHash?block.transactionHash.slice(0,9)+'...':DEFAULT.exchangeRates[this.state.exchangeRate][0]}&nbsp;{(block.price*DEFAULT.exchangeRates[this.state.exchangeRate][1]).toFixed(2)}
                    </div>

                    :

                    <div className="button" onClick={(event)=>{this.sellBlock(event, index, block.number)}}>
                      {block.transactionHash?block.transactionHash.slice(0,9)+'...':DEFAULT.exchangeRates[this.state.exchangeRate][0]}&nbsp;{(block.price*DEFAULT.exchangeRates[this.state.exchangeRate][1]).toFixed(2)}
                    </div>
                  }
                </div>
              </div>
            );
          })}
        </div>

        <div ref="latest" className="block-more">
          <div className="button button-secondary">
            {this.state.itemsOffset>blocks.length?blocks.length:this.state.itemsOffset} blocks displayed
          </div>
        </div>

        <div className="block-more">
          <div className="button button-secondary">
            {blocks.length-this.state.itemsOffset>0?(blocks.length-this.state.itemsOffset):0} more loaded
          </div>
        </div>

        <div className="block-more">
          <div className="button" id="button-more" onClick={(event)=>{this.showMoreItems(event)}}>
            {DEFAULT.text.nav.more}&nbsp;(+{DEFAULT.itemsOffsetStep})
          </div>
        </div>

        <div className="block-more">
          <div className="button button-secondary" id="button-more" onClick={(event)=>{this.showLessItems(event)}}>
            {DEFAULT.text.nav.less}&nbsp;(-{DEFAULT.itemsOffsetStep})
          </div>
        </div>

        <div className="block-total">
          <div className="button button-secondary" onClick={(event)=>{this.showMoreItems(event)}}>
            There are {BLOCKCHAIN_NODE.eth.blockNumber.format(0, 3, '.', ',')} Blocks of Gold available.
          </div>
        </div>
      </div>
    );
  }
}

export default App;
