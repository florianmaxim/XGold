var request = require('sync-request');

import React       from 'react';

import Logo        from './Logo';
import Loader      from './Loader';

import EthereumApi from './EthereumApi';
import Gold        from './Gold';

import Chain        from './Chain';

const _USD = 320.83;

/* little dev helper */
const _ON     = true;
const _LIGHT  = false;
const _BORDER = true;

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

  modes: ['logo','buy','none','about'],

  keys: [1,2,3,4,5,6,7,8,9]

}

const _GOLD     = new Gold();
const _ETHEREUM = new EthereumApi();

export default class Block extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      block:{

      },

      mode: 0, // DEFAULT.modes[this]
      animation: true

    }
  }

  componentWillMount(){}

  componentDidMount(){

    //iphone buggyfill
    require('viewport-units-buggyfill').init();

    //attach the gold canvas
       this.refs.gold.appendChild(_GOLD.init());


    // if(!_ON) return;


    if(this.state.block.number!==undefined){

    /////////////////////////////////////////
    // BLOCK: DEV SPECIFIC
    /////////////////////////////////////////

      let blockNumber = this.state.block.number;

      console.log('BLOCK: Specific #'+blockNumber);

      this.getBlock(blockNumber);


    }else if(this.props.params.id!==undefined){

    /////////////////////////////////////////
    // BLOCK: SPECIFIC
    /////////////////////////////////////////

      let blockNumber = this.props.params.id;

      console.log('BLOCK: Specific #'+blockNumber);

      if(_ON) this.getBlock(blockNumber);

    }else{

    /////////////////////////////////////////
    // BLOCK: JUST FOLLOW THE BLOCKCHAIN
    /////////////////////////////////////////

    console.log('BLOCK: Just follow the blockchain.');

      //remove old gold
      // _GOLD.removeGold();

      //get the latest block
      let url = 'https://etherchain.org/api/blocks/count';
      fetch(url, _GOLD).then(res => res.json()).then((out) => {

        let lastBlock = out.data[0].count;

        //get the new one
        if(_ON) this.getBlock(lastBlock);

      });


      setInterval(()=>{

        //remove old gold
        if(_ON) _GOLD.removeGold();

        //get the latest block
        let url = 'https://etherchain.org/api/blocks/count';
        fetch(url, _GOLD).then(res => res.json()).then((out) => {

          let lastBlock = out.data[0].count;

          //get the new one
          if(_ON) this.getBlock(lastBlock);

        });

      }, DEFAULT.goldrush);

    }

  }

  getBlock(blockNumber){

    console.log('BLOCK: getBlock:'+blockNumber);

    let block = {}

    var url = 'https://etherchain.org/api/block/'+blockNumber;

    fetch(url, _GOLD).then(res => res.json()).then((out) => {

      block.number            = out.data[0].number;
      block.hash              = out.data[0].hash;
      block.size              = out.data[0].size;
      block.transactionAmount = out.data[0].tx_count;

      block.reward            = out.data[0].totalFee;

      block.dollar = (block.reward/1000000000000000000)*_USD;


      let url = 'https://etherchain.org/api/block/'+block.number+'/tx';

      fetch(url, _GOLD).then(res => res.json()).then((out) => {

        block.transactions = out.data;

        this.setState({

          block: block,

          mode: 1,

        });

        if(_ON)
        _GOLD.gold(block, _LIGHT);

        history.pushState(null, null, '/block/'+block.number);

      });

    });
  }

  handleNumpad(event){

    event.stopPropagation();
    event.preventDefault();

    this.setState({
      numpad: this.state.numpad?false:true,
    })
  }

  handleInput(v, event){

    //console.log('pressed key '+v);
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

    console.log(`DISPLAY: Switch to mode '${mode}'`);

    switch(mode){
      case 'buy':
        return(
          <div className="block-buy">

           <div className="block-buy-container-price">

            <div>
             <div className="block-buy-heading" onClick={()=>{this.buy(event)}}>
              {this.state.block.number}
             </div>
             <div className="block-buy-subheading" onClick={()=>{this.buy(event)}}>
              {this.state.block.hash}
             </div>
            </div>

            <div className="block-buy-price" onClick={()=>{this.buy(event)}}>

             ${this.state.block.dollar.toFixed(2)}<br/>

             <p style={{fontWeight:'200', marginTop: '1px'}}>Price varies with currency exchange rates and may be different tomorrow.</p>

             <div className="block-button" onClick={()=>{this.buy(event)}}>
               BUY
             </div>

            </div>

           </div>

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
              DEFAULT.keys.map((key,index) => {
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
          <div className="block-line">
           TARGOLD.
          </div>
        </div>
      );
      break;

      case 'chain':
       return(
        <div className="block-chain">
          <Chain/>
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

    //console.log('MODE:'+this.state.mode);
    //console.log('LENGTH:'+DEFAULT.modes.length);

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
              <div className="block-logo" onClick={()=>{this.toggleDisplay(event)}}>
                <Logo/>
              </div>
            </div>

          </div>

        </div>
    );
  }
}
