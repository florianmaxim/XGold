import React       from 'react';

import request     from 'sync-request';

import Logo        from './Logo';
import Gold        from './Gold';
import Chain       from './Chain';

import Ethereum    from './Ethereum';

const _ETHEREUM = new Ethereum();

const _GOLD     = new Gold();

const _USD = 320.83;

/* little dev helper */
const _ON     = true;
const _LIGHT  = false;
const _BORDER = true;

const DEFAULT = {

  line: 'Ex.gold',
  input: ':number',
  goldrush: 30000, //ms timeout to load the next block (MINIMUM on etherchain API is 30s!)

  title: [
    'Tar.gold',
    'ex.gold',
    'my.gold',
    '79.money'
  ],

  modes: ['start','buy','chain','none'],

  keys: [1,2,3,4,5,6,7,8,9]

}

export default class Block extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      currency: 'USD',
      exchangeRate: _USD,

      block:{
        number: 1234567890,
        hash: 0x123456789,
        price: 1,
        own:false
      },

      mode: 0, // DEFAULT.modes[this]

      animation: 0,

      countdown: DEFAULT.goldrush/1000, //in s

      _loaded: false,
      _started: false

    }
  }

  componentWillMount(){}

  componentDidMount(){

    //init iphone buggyfill

    require('viewport-units-buggyfill').init();

    //init gold canvas
    if(_ON)
    this.refs.gold.appendChild(_GOLD.init());

    if(_ETHEREUM.init());


    if(this.props.params.id!==undefined){

    /////////////////////////////////////////
    // BLOCK: SPECIFIC
    /////////////////////////////////////////

      let blockNumber = this.props.params.id;

      console.log('BLOCK: Specific #'+blockNumber);

      if(_ON) this.getBlock(blockNumber);

    }else{

    /////////////////////////////////////////
    // BLOCK: JUST FOLLOW THE CHAIN.
    /////////////////////////////////////////

      //handle countdown
      setInterval(()=>{

        this.setState({
          countdown: this.state.countdown>0?this.state.countdown-1:DEFAULT.goldrush/1000,
            _loaded: this.state._loaded===false&&this.state.countdown===0?true:this.state._loaded
        })

      }, 1000)


      if(_ON)
      _ETHEREUM.watchBlockchain((lastBlock, connectionType)=>{

        console.log('('+connectionType+')lastBlock:'+lastBlock.number)

        _GOLD.gold(lastBlock, _LIGHT);

         this.setState({ block: lastBlock });

      history.pushState(null, null, '/block/'+lastBlock.number);

      },DEFAULT.goldrush);

    }

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

  handleOnChange(event) {
    this.setState({input: event.target.value});
  }


  buy(event) {

    let _block = this.state.block;
        _block.own = this.state.block.own?false:true;


    this.setState({
      block: _block,


    })

    console.log(this.state.block.own)
  }

  toggleDisplay(){
   this.setState({
     mode: this.state.mode<DEFAULT.modes.length-1?(this.state.mode+1):0
   })}

  handleDisplay(mode){

    switch(mode){
      case 'start':
       return(
         <div className="block-buy">

         {this.state._loaded&&this.state._started?

         <div className="block-buy-container-price">


           <div className="block-buy-heading" onClick={()=>{this.buy(event)}}>
             TARGOLD.
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
               _ETHEREUM.isConnected()
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
             this.state._loaded||_ETHEREUM.isConnected()
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

        </div>
      );
      break;

      case 'buy':
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

             {this.state.currency} {((this.state.block.price/100000000000000)*_USD).toFixed(2)} - (BALANCE {((_ETHEREUM.getBalance()/1000000000000000000)).toFixed(2)})<br/>

             <p style={{fontWeight:'200', marginTop: '1px'}}>Price varies with currency exchange rates and may be different tomorrow.</p>

             <div>
             {!_ETHEREUM.isConnected()
               ?
               <p style={{fontWeight:'200', marginTop: '5px'}}> Next gold will be available in {this.state.countdown}s</p>
               :
               ''
             }
              </div>

             {
               _ETHEREUM.isConnected()
               ?
               <div>
                 {
                   this.state.block.own
                   ?
                   <div className="block-button block-button-sold">
                     SOLD
                   </div>
                   :
                   <div className="block-button" onClick={()=>{this.buy(event)}}>
                     BUY
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

      case 'chain':
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

         </div>
      );
      break;

      case 'none':
       return(
        <div>
        </div>
      );
      break;
    }
  }


  start(event) {
    this.setState({
      _started: true,
      mode: 1,
    });
    this.forceUpdate();
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

              {this.handleDisplay(DEFAULT.modes[this.state.mode])}

            </div>

            <div className="block-bottom">
              <div className="block-nav" onClick={this.state._started?()=>{this.toggleDisplay(event)}:''}>
                <Logo/>
              </div>
            </div>

          </div>

        </div>
    );
  }
}
