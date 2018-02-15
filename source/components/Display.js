import * as config from '../../config.json';

import {log} from './Helpers';

import React, {Component} from 'react';

import Logo        from './Logo';
import Gold        from './Gold';
import Chain       from './Chain';

import DisplayInfo from './DisplayInfo';


import Ethereum    from './Ethereum';

const _BLOCKCHAIN = new Ethereum();
const _GOLD       = new Gold();

const DEFAULT = {

  input: ':number',

  modes: ['start', 'data', 'list', 'info', 'none'],

  keys: [1,2,3,4,5,6,7,8,9]

}

/** 
 * This handles the main view
 * TODO: This should actually be the App component by convention
*/
export default class Display extends Component{

  constructor(props){
    
    super(props);

    this.state = {

      currency: 'ETH',
      exchangeRate: config.rates.usd,

      block:{
        number: 1234567890,
        hash: "0x88e96d4537bea4d9c05d12549907b32561d3bf31f45aae734cdc119f13406cb6",
        price: 1,
        own:false
      },

      mode: 0, // DEFAULT.modes[this]

      animation: 0,

      countdown: config.refresh/1000, //in s

      _loaded: false,
      _started: false

    }
  }

  componentWillMount(){}

  componentDidMount(){

    log(`[${config.name}] (${config.version.number}) "${config.version.name}"`)

    //Init Gold Canvas
    let element = _GOLD.init()

    //Append HTML Canvas Element for the gold
    this.refs.gold.appendChild(element);

    if(_BLOCKCHAIN.init());

    if(this.props.params.id!==undefined){

    /////////////////////////////////////////
    // BLOCK: SPECIFIC
    /////////////////////////////////////////

      let blockNumber = this.props.params.id;

      console.log('BLOCK: Specific #'+blockNumber);

      this.getBlock(blockNumber);

    }else{

    /////////////////////////////////////////
    // BLOCK: JUST FOLLOW THE CHAIN.
    /////////////////////////////////////////
     
      _BLOCKCHAIN.watchBlockchain(
        
        (lastBlock, connectionType) => {

        //Gold swallows the block data object that is assembled by 'watchBlockchain'
        _GOLD.generate(lastBlock);

         this.setState({
           block: lastBlock,
           mode: 1
         });

        history.pushState(null, null, '/block/'+lastBlock.number);

      }, config.refresh); 



    }

  }

  handleNumpad(event){

    event.stopPropagation();
    event.preventDefault();

    this.setState({
      numpad: this.state.numpad?false:true,
    });

  }

  handleInput(v, event){

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

  handleOnChange(event) {
    this.setState({input: event.target.value});
  }


  buy(event, amountInEther) {

    console.log('[Display] - Buy')

    _BLOCKCHAIN.makeTransaction(this.state.block.price, this.state.block.number);

  }

  handleMode(){

    //log(`[Display] Mode: ${mode} "handleMode()"`);

    this.setState({
      mode: this.state.mode<DEFAULT.modes.length-1?(this.state.mode+1):0
    });
  
  }

  renderMode(mode){

    log(`[Display] Mode: ${mode} "renderMode()"`);

    switch(mode){

      case 'start':
       return(
         <div className="block-buy">

         {this.state._loaded&&this.state._started?

         <div className="block-buy-container-price">


           <div className="block-buy-heading" onClick={()=>{this.buy(event)}}>
             XGold
           </div>


          <div className="block-buy-price" onClick={()=>{this.buy(event)}} style={{zIndex:'10'}}>

           <p style={{fontWeight:'200', marginTop: '1px'}}>What is the ideal state of money?</p>

             <div className='block-button' style={{color: 'rgba(255,255,82)', borderColor: 'rgba(255,255,82)', backgroundColor: 'black'}}>
               READ THE GOLDEN PAPER
             </div>

          </div>

         </div>

        :

         <div className="block-buy-container-price">

          <div>
           <div className="block-buy-heading" onClick={()=>{this.buy(event)}}>
           </div>
           <div className="block-button" onClick={()=>{this.start(event)}}>
             {
               _BLOCKCHAIN.isConnected()
               ?
               <span>Connected to the blockchain</span>
               :
               <span>Public api (No purchase possible)</span>

             }

           </div>
          </div>

          <div className="block-buy-price" onClick={()=>{this.buy(event)}} style={{zIndex:'10'}}>

           <p style={{fontWeight:'200', marginTop: '1px'}}></p>

           {
             this.state._loaded||_BLOCKCHAIN.isConnected()
             ?
             <div className='block-button' onClick={()=>{this.start()}} style={{color: 'rgba(255,255,82)', borderColor: 'rgba(255,255,82)', backgroundColor: 'black'}}>
               Start
             </div>
             :
             <div className='block-button block-button-sold' style={{color: 'rgba(255,255,82)', borderColor: 'rgba(255,255,82)'}}>
               Gold will be available in {this.state.countdown}s
             </div>
           }


          </div>

        </div>

        }

        </div>);
      break;

      case 'data':
        return(
          <div className="block-buy">

           <div className="block-buy-container-price">

            <div>
             <div className="block-buy-heading">
              {this.state.block.number}
             </div>
             <div className="block-buy-subheading" >
              {this.state.block.hash}
             </div>
            </div>

            <div className="block-buy-price">

             {this.state.currency} {this.state.block.price.toFixed(2)} - (BALANCE {((_BLOCKCHAIN.getBalance()/1000000000000000000)).toFixed(2)})<br/>

             <p style={{fontWeight:'200', marginTop: '1px'}}>Price varies with currency exchange rates and may be different tomorrow.</p>

             <div>
             {!_BLOCKCHAIN.isConnected()
               ?
               <p style={{fontWeight:'200', marginTop: '5px'}}> Next gold will be available in {this.state.countdown}s</p>
               :
               ''
             }
              </div>

             {
               _BLOCKCHAIN.isConnected()
               ?
               <div>
                 {
                   this.state.block.isMine
                   ?
                   <div className="block-button" style={{backgroundColor:'gold'}}>
                     OWNED
                   </div>
                   :
                   <div className="block-button" onClick={this.state.block.isForSale?(event)=>{this.buy(event)}:''}>
                    {this.state.block.isForSale?'BUY':'SOLD'}
                   </div>
                 }
               </div>
               :

               <div className="block-button block-button-sold">
                 NOT CONNECTED TO BLOCKCHAIN
               </div>

             }

            </div>

           </div>

          </div>
        );
      break;

      case 'list':
        return(
          <div className="block-buy">

            <div className="block-buy-container-price" style={{border: '0px solid red'}}>

              <div style={{width:'100%'}}>
              <Chain/>
              </div>

              <div className="block-buy-price" style={{display:'flex',flexDirection:'row'}}>

              <div className="block-button" style={{backgroundColor:'gold',color:'black'}} onClick={()=>{this.buy(event)}}>
                available
              </div>
              <div className="block-button" onClick={()=>{this.buy(event)}}>
                sold
              </div>

              </div>

            </div>

          </div>);
      break;

      case 'input':
        return(
          <div className="numpad">
            <form className="block-input" onSubmit={(event)=>{this.handleGold(event)}}>
              <input type="text"
                     className="numpad-input"
                     value={this.state.input}
                     placeholder={this.state.input}
                     handleOnChange={this.handleOnChange.bind(this)}
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

      case 'info':
        return <DisplayInfo/>;

      break;

      case 'none':
       return(
        <div>
        </div>);
      break;
    }

  }

  render(){

      return(
        <div className="block">

          <div ref="gold" className="block-gold"/>

          <div className="block-display">

            <div className='frame-left' style={{marginTop: 100-this.state.animation+'vh', transition:     ((config.refresh/1000)/4)+'s all linear', transitionDelay: ((config.refresh/1000)/4)*0+'s'}}/>
            <div className='frame-top' style={{marginLeft: -100+this.state.animation+'vw', transition:     ((config.refresh/1000)/4)+'s all linear', transitionDelay: ((config.refresh/1000)/4)*1+'s'}}/>
            <div className='frame-right' style={{marginBottom: 100-this.state.animation+'vh', transition: ((config.refresh/1000)/4)+'s all linear', transitionDelay: ((config.refresh/1000)/4)*2+'s'}}/>
            <div className='frame-bottom' style={{marginRight: -100+this.state.animation+'vw', transition: ((config.refresh/1000)/4)+'s all linear', transitionDelay: ((config.refresh/1000)/4)*3+'s'}}/>

            <div className="block-top">

            </div>

            <div className="block-middle">
              {this.renderMode(DEFAULT.modes[this.state.mode])}
            </div>

            <div className="block-bottom">
              <div className="block-nav" onClick={()=>this.handleMode(event)}>
                <Logo/>
              </div>
            </div>

          </div>

        </div>
    );
  }
}
