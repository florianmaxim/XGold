var request = require('sync-request');

import React       from 'react';

import Logo        from './Logo';
import Loader      from './Loader';

import EthereumApi from './EthereumApi';
import Gold        from './Gold';

import Chain        from './Chain';

const _USD = 320.83;

/* little dev helper */
const _ON     = false;
const _LIGHT  = false;
const _BORDER = true;

const DEFAULT = {

  line: 'Ex.gold',
  input: ':number',
  goldrush: 30000, //timeout to load next block

  title: [
    'Tar.gold',
    'ex.gold',
    'my.gold',
    '79.money'
  ],

  modes: ['start','buy','none','chain','logo'],

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
      animation: 0,

      counter: DEFAULT.goldrush/1000, //in s

      _loaded: false

    }
  }

  componentWillMount(){}

  componentDidMount(){

    //init iphone buggyfill

    require('viewport-units-buggyfill').init();

    //init gold canvas
    this.refs.gold.appendChild(_GOLD.init());


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



    //counter seconds
    setInterval(()=>{
      this.setState({
        counter: this.state.counter<DEFAULT.goldrush/1000?this.state.counter+1:0,
      })

      //once in a lifetime be loaded
      if(this.state.counter===DEFAULT.goldrush/1000-1&&!this.state._loaded){
        this.setState({
          _loaded: true,
        })
      }

      this.forceUpdate();
    }, 1000)  //every second

    //handle frame animation

    this.setState({
      animation: 100
    })

    // console.log('BLOCK: Just follow the blockchain.');
    //
    //   //get the latest block
    //   let url = 'https://etherchain.org/api/blocks/count';
    //   fetch(url, _GOLD).then(res => res.json()).then((out) => {
    //
    //     let lastBlock = out.data[0].count;
    //
    //     this.setState({
    //         animation: 100
    //     })
    //
    //     //get the new one
    //     this.getBlock(lastBlock);
    //
    //   });

      setInterval(()=>{

        this.setState({
          animation: this.state.animation===100?0:100,
          counter:0
        })

        //get the latest block
        let url = 'https://etherchain.org/api/blocks/count';
        fetch(url, _GOLD).then(res => res.json()).then((out) => {

          let lastBlock = out.data[0].count;

          //get the new one
          this.getBlock(lastBlock);

          //set back the animation

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

        });

        if(_ON) _GOLD.gold(block, _LIGHT);

        if(_ON) history.pushState(null, null, '/block/'+block.number);

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

  start(event) {
    this.setState({
      mode: 1
    });
    this.forceUpdate();
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

      case 'start':
       return(
         <div className="block-buy">

          <div className="block-buy-container-price">

           <div>
            <div className="block-buy-heading" onClick={()=>{this.buy(event)}}>
            </div>
            <div className="block-button" onClick={()=>{this.start(event)}}>
              Connected to the blockchain.
            </div>
           </div>

           <div className="block-buy-price" onClick={()=>{this.buy(event)}} style={{zIndex:'10'}}>

            <p style={{fontWeight:'200', marginTop: '1px'}}></p>

            {
              this.state._loaded
              ?
              <div className='block-button' onClick={()=>{this.start()}} style={{color: 'rgba(255,255,82)', borderColor: 'rgba(255,255,82)', backgroundColor: 'black'}}>
                Start
              </div>
              :
              <div className='block-button block-button-sold' style={{color: 'rgba(255,255,82)', borderColor: 'rgba(255,255,82)', backgroundColor: 'black'}}>
                Extraction will available in {DEFAULT.goldrush/1000-this.state.counter}s
              </div>
            }


           </div>

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

      case 'logo':
       return(
        <div className="block-about">
          <Logo/>
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

            <div className='frame-left' style={{marginTop: 100-this.state.animation+'vh', transition:     ((DEFAULT.goldrush/1000)/4)+'s all linear', transitionDelay: ((DEFAULT.goldrush/1000)/4)*0+'s'}}/>
            <div className='frame-top' style={{marginLeft: -100+this.state.animation+'vw', transition:     ((DEFAULT.goldrush/1000)/4)+'s all linear', transitionDelay: ((DEFAULT.goldrush/1000)/4)*1+'s'}}/>
            <div className='frame-right' style={{marginBottom: 100-this.state.animation+'vh', transition: ((DEFAULT.goldrush/1000)/4)+'s all linear', transitionDelay: ((DEFAULT.goldrush/1000)/4)*2+'s'}}/>
            <div className='frame-bottom' style={{marginRight: -100+this.state.animation+'vw', transition: ((DEFAULT.goldrush/1000)/4)+'s all linear', transitionDelay: ((DEFAULT.goldrush/1000)/4)*3+'s'}}/>

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

// TODO OLD FRAME
// <div className={this.state.animation?'frame-left frame-left-animation':'frame-left'}/>
// <div className={this.state.animation?'frame-top frame-top-animation':'frame-top'}/>
// <div className={this.state.animation?'frame-right frame-right-animation':'frame-right'}/>
// <div className={this.state.animation?'frame-bottom frame-bottom-animation':'frame-bottm'}/>
