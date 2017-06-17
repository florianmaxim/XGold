var request = require('sync-request');

import React       from 'react';

import Logo        from './Logo';
import Loader      from './Loader';

import EthereumApi from './EthereumApi';
import Gold        from './Gold';

const DEFAULT = {
  line: 'Targold',
  input: ':number',
  goldrush: 20000
}

const _GOLD     = new Gold();
const _ETHEREUM = new EthereumApi();

export default class Block extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      animation:true,

      init:false,

      //toggle numpad
      numpad: false,

      //numpad keys
      keys: [1,2,3,4,5,6,7,8,9],

      //display input
      input: 3881441,

      gold: '3881441',

      hash: '',

      innerWidth: 0,
      innerHeight: 0,

      isMobile: {
        iOS: false
      }
    }
  }

  componentWillMount(){}

  componentDidMount(){

    require('viewport-units-buggyfill').init();

    //append gold context to view
    this.refs.gold.appendChild(_GOLD.init());

    //TODO this is so ugly, what the fuck I hate css.
    setInterval(() => {
      that.setState({
        animation: this.state.animation?false:true
      })
    }, DEFAULT.goldrush)

    setInterval(() => {
      that.setState({
        animation: this.state.animation?false:true
      })
    }, DEFAULT.goldrush+10)

    let that = this;

    let block = {}

    setInterval(()=>{

      let url = 'https://etherchain.org/api/blocks/count';
      fetch(url, _GOLD, that).then(res => res.json()).then((out) => {

        let number = out.data[0].count;

        var url = 'https://etherchain.org/api/block/'+number;
        let params = {
                       method: 'GET',
                       headers: {
                          Accept: 'application/json'
                         }
                     }

        let that = this;

        fetch(url, _GOLD, that).then(res => res.json()).then((out) => {

          block.number            = out.data[0].number;
          block.hash              = out.data[0].hash;
          block.size              = out.data[0].size;
          block.transactionAmount = out.data[0].tx_count;

          console.log(JSON.stringify(block.hash));

          let url = 'https://etherchain.org/api/block/'+number+'/tx';

          let params = {
                         method: 'GET',
                         headers: {
                            Accept: 'application/json'
                           }
                       }

          fetch(url, _GOLD, that).then(res => res.json()).then((out) => {

            block.transactions = out.data;

            _GOLD.gold(block);

          });

        });

      });

    }, DEFAULT.goldrush);

    addEventListener('load', ()=>{

    })

    addEventListener('touchstart', (event) => {
      event.stopPropagation();
      event.preventDefault();
    });

    addEventListener('resize', (event) => {
      event.stopPropagation();
      event.preventDefault();

      this.setState({
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        isMobile: {
          iOS: isMobile.iOS()
        }
      })
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

            {this.state.numpad
              ?

              <form className="block-input" onSubmit={(event)=>{this.handleGold(event)}}>
                <input type="text"
                       className="numpad-input"
                       value={this.state.input}
                       placeholder={this.state.input}
                       onChange={this.onChange.bind(this)}
                       />
              </form>
              :
              ''
            }
            </div>

            <div className="block-middle">

              {this.state.numpad
              ?

              <div className="numpad">
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

              :

              <div className="block-line">
                {this.state.hash}
              </div>
              }

            </div>

            <div className="block-bottom">
              <div className="block-logo" onTouchEnd={(event)=>{this.handleNumpad(event)}} onClick={()=>{this.handleNumpad(event)}}>
                <Logo/>
              </div>
            </div>

          </div>

        </div>
    );
  }
}
