var request = require('sync-request');

import React       from 'react';

import Logo        from './Logo';
import Loader      from './Loader';

import EthereumApi from './EthereumApi';
import Gold        from './Gold';

/* little dev helper */
const _ON    = false;
const _LIGHT = false;

const DEFAULT = {
  line: 'Ex.gold',
  input: ':number',
  goldrush: 20000, //timeout to load next block
  title: [
    'Tar.gold',
    'ex.gold',
    'my.gold',
    '79.money'
  ],

  modes: ['logo','buy','input', 'none', 'info', 'about']
}

const _GOLD     = new Gold();
const _ETHEREUM = new EthereumApi();

export default class Block extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      mode: 0, //init (DEFAULT.modes)
      title:0,

      animation:true,

      init:false,

      //toggle numpad
      numpad: false,

      //numpad keys
      keys: [1,2,3,4,5,6,7,8,9],

      //display input
      input: 3881441,

      gold: '3881441',

      hash: 'ex.gold',

      sold: false,

      //TODO
      //logo, block info, enter menu, general, menu
      displayMode: 0,

      innerWidth: 0,
      innerHeight: 0,

    }
  }

  componentWillMount(){}

  componentDidMount(){

    require('viewport-units-buggyfill').init();

    //prepare the gold
    if(_ON) this.refs.gold.appendChild(_GOLD.init());

    if(this.props.params.id!==undefined)
    {

      let blockNumber = this.props.params.id;
      console.log('BLOCK: #'+blockNumber)

      var url = 'https://etherchain.org/api/block/'+blockNumber;

      let block = {}

      fetch(url, _GOLD).then(res => res.json()).then((out) => {

        //TODO handle no result
        if(out.data[0].length===0){
          let msg = 'Block '+blockNumber+' does not exits (yet).';
          alert(msg);
          this.setState({
            hash: msg
          });
        }

        block.number            = out.data[0].number;
        block.hash              = out.data[0].hash;
        block.size              = out.data[0].size;
        block.transactionAmount = out.data[0].tx_count;

        console.log(JSON.stringify(out.data[0]));

        let url = 'https://etherchain.org/api/block/'+blockNumber+'/tx';

        fetch(url, _GOLD).then(res => res.json()).then((out) => {

          block.transactions = out.data;

          this.setState({
            hash: block.number,

            animation: this.state.animation?false:true
          });

          if(_ON)
          _GOLD.gold(block, _LIGHT);

        });

      });

      return;
    }

    /////////////////////////////////////////
    // JUST FOLLOW THE BLOCKCHAIN
    /////////////////////////////////////////

    console.log('JUST FOLLOW THE CHAIN!')

    //TODO this is so ugly, what the fuck I hate css.
    setInterval(() => {
      this.setState({
        animation: this.state.animation?false:true
      })
    }, DEFAULT.goldrush)

    setInterval(() => {
      this.setState({
        animation: this.state.animation?false:true
      })
    }, DEFAULT.goldrush+10)


    if(_ON)
    setInterval(()=>{

      let block = {}

      let url = 'https://etherchain.org/api/blocks/count';
      fetch(url, _GOLD).then(res => res.json()).then((out) => {

        let lastBlock = out.data[0].count;

        var url = 'https://etherchain.org/api/block/'+lastBlock;

        fetch(url, _GOLD).then(res => res.json()).then((out) => {

          block.number            = out.data[0].number;
          block.hash              = out.data[0].hash;
          block.size              = out.data[0].size;
          block.transactionAmount = out.data[0].tx_count;

          console.log(JSON.stringify(out.data[0]));

          let url = 'https://etherchain.org/api/block/'+lastBlock+'/tx';

          fetch(url, _GOLD).then(res => res.json()).then((out) => {

            block.transactions = out.data;

            this.setState({
              hash: block.number
            });

            history.pushState(null, null, '/'+block.number);

            if(_ON)  _GOLD.gold(block, _LIGHT);

          });

        });

      });

    }, DEFAULT.goldrush);

  }

  handleNumpad(event){

    event.stopPropagation();
    event.preventDefault();

    this.setState({
      numpad: this.state.numpad?false:true,
    })
  }

  handleInput(v, event){

    console.log('pressed key '+v);
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      input:this.state.input!=DEFAULT.input?(this.state.input+v.toString()):v.toString()
    })
  }

  handleBackspace(event){
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      input:parseInt( this.state.input.toString().slice(0, -1) )
    })
  }

  handleGold(event){

    event.stopPropagation();
    event.preventDefault();

    this.setState({
      //send current inout to gold
      gold: this.state.input,
      //toggle numpad
      // numpad:this.state.numpad?false:true
    })
  }

  onChange(event) {
    this.setState({input: event.target.value});
  }

  buy(event) {
    this.setState({sold: this.state.sold?false:true});
  }

  display(mode){

    console.log('DISPLAY:'+this.state.mode);

    switch(mode){
      case 'buy':
        return(
          <div className="block-buy">

          {!this.state.sold?

           <div className="block-button" onTouchEnd={(event)=>{this.buy(event)}} onClick={()=>{this.buy(event)}}>
             buy
           </div>

           :

           <div className="block-button block-button-sold" onTouchEnd={(event)=>{this.buy(event)}} onClick={()=>{this.buy(event)}}>
             sold
           </div>

          }

          </div>
        );
      break;

      //numpad
      case 'input':
        return(
          <div className="numpad">
            <form className="block-input" onSubmit={(event)=>{this.handleGold(event)}}>
              <input type="text"
                     className="numpad-input"
                     value={this.state.input}
                     placeholder={this.state.input}
                     onChange={this.onChange.bind(this)}
                     />
            </form>
            <div className="numpad-row">

            {
              this.state.keys.map((key,index) => {
                return <div className="numpad-number-field" key={key} onTouchStart={(event)=>{this.handleInput(index, event)}} onClick={(event)=>{this.handleInput(index, event)}}><div className="numpad-number">{index}</div></div>
              })
            }

            </div>
            <div className="numpad-row">
             <div className="numpad-number-field" onTouchStart={(event)=>{this.handleBackspace(event)}} onClick={(event)=>{this.handleBackspace(event)}}><div className="numpad-number">⌥</div></div>
             <div className="numpad-number-field" onTouchStart={(event)=>{this.handleInput(0, event)}} onClick={(event)=>{this.handleInput(0, event)}}><div className="numpad-number">0</div></div>
             <div className="numpad-number-field" onTouchStart={(event)=>{this.handleGold(event)}} onClick={(event)=>{this.handleGold(event)}}><div className="numpad-number">⌘</div></div>
            </div>
          </div>
        );
      break;

      case 'logo':
       return(
        <div>
          <div className="block-logo" onTouchEnd={(event)=>{this.handleNumpad(event)}} onClick={()=>{this.handleNumpad(event)}}>
            <Logo/>
          </div>
          <div className="block-line">
           TARGOLD.
          </div>
        </div>
      );
      break;
      case 'none':
       return(
        <div>
        </div>
      );
      break;
      case 'about':
       return(
        <div className="block-about">
        What is the ideal state of money?
        </div>
      );
      break;
    }
  }

  toggleDisplay(){
    this.setState({
      mode: this.state.mode<DEFAULT.modes.length-1?(this.state.mode+1):0
    })

    console.log('MODE:'+this.state.mode);
    console.log('LENGTH:'+DEFAULT.modes.length);

  }

  render(){

      return(
        <div className="block">

          <div ref="gold" className="block-gold"/>

          <div className="block-display">

            <div className={this.state.animation?'frame-left frame-left-animation':'frame-left'}/>
            <div className={this.state.animation?'frame-top frame-top-animation':'frame-top'}/>
            <div className={this.state.animation?'frame-right frame-right-animation':'frame-right'}/>
            <div className={this.state.animation?'frame-bottom frame-bottom-animation':'frame-bottm'}/>

            <div className="block-top">

            </div>

            <div className="block-middle">

              {this.display(DEFAULT.modes[this.state.mode])}

            </div>

            <div className="block-bottom">
              <div className="block-logo" onTouchEnd={(event)=>{this.toggleDisplay(event)}} onClick={()=>{this.toggleDisplay(event)}}>
                <Logo/>
              </div>
            </div>

          </div>

        </div>
    );
  }
}
