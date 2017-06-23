import React       from 'react';

import request     from 'sync-request';

import Logo        from './Logo';
import Gold        from './Gold';
import Chain        from './Chain';

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

      block:{
        number: 1234567890,
        hash: 0x123456789,
        dollar: 123456789
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
    this.refs.gold.appendChild(_GOLD.init());


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

      console.log(this.state.countdown)

    }, 1000)

    //handle frame animation

    this.setState({
      animation: 100
    })

      setInterval(()=>{

        this.setState({
          animation: this.state.animation===100?0:100,
        })

        //get the latest block
        let url = 'https://etherchain.org/api/blocks/count';
        fetch(url, _GOLD).then(res => res.json()).then((out) => {

          let lastBlock = out.data[0].count;

          this.getBlock(lastBlock);

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

  handleOnChange(event) {
    this.setState({input: event.target.value});
  }


  toggleDisplay(){
   this.setState({
     mode: this.state.mode<DEFAULT.modes.length-1?(this.state.mode+1):0
   })}

  handleDisplay(mode){

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

             <p style={{fontWeight:'200', marginTop: '5px'}}> Next gold will be available in {this.state.countdown}s</p>

             <div className="block-button" onClick={()=>{this.buy(event)}}>
               BUY
             </div>

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


  buy(event) {
    this.setState({sold: this.state.sold?false:true});
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
