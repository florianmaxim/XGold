import React from 'react';

import Logo from './Logo';
import Loader from './Loader';

import Gold from './Gold';

import ModelBlock from './ModelBlock';

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

const DEFAULT = {
  line: 'Targold',
  input: ':number'
}

export default class Block extends React.Component{

  constructor(props){
    super(props);

    this.block = new ModelBlock();

    this.state = {

      numpad: true,

      input: 3881441,

      gold: true,

      hash: 'Targold',

      innerWidth: 0,
      innerHeight: 0,

      isMobile: {
        iOS: false
      }
    }
  }

  componentWillMount(){}

  componentDidMount(){

    this.setState({
      innerWidth: innerWidth,
      innerHeight: innerHeight,
    })

    let url = 'https://etherchain.org/api/blocks/count';

    fetch(url).then(res => res.json()).then((out) => {

        this.block.get(out.data[0].count);

        this.setState({
          // gold: this.state.gold?false:true,
          input: out.data[0].count,
        });

    });

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
      numpad: this.state.numpad?false:true
    })
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
      input:this.state.input.substring(0, this.state.input.length - 1)
    })
  }

  handleGold(event){

    event.stopPropagation();
    event.preventDefault();

    //no input, no gold.

    this.block.get(this.state.input);

    this.setState({
      //toggle gold
      gold: this.state.gold?false:true,
      //toggle numpad
      // numpad:this.state.numpad?false:true
    })
    this.forceUpdate();
  }

  onChange(event) {
    this.setState({input: event.target.value});
  }

  render(){

      return(
        <div className="block">

          <div className="block-frame" />

          <div className="block-gold">

                <Gold input={this.state.input}/>

          </div>

          {
            this.state.numpad
          ?


            <div className="block-display">
              <form onSubmit={(event)=>{this.handleGold(event)}}>
              <input type="text"
                     className="numpad-input"
                     value={this.state.input}
                     placeholder={this.state.input}
                     onChange={this.onChange.bind(this)}
                     ref={input => input && input.focus()} />
              </form>
            </div>

          :
          ''
          }


            {this.state.numpad
            ?

            <div className="block-numpad">

               {this.state.innerWidth<this.state.innerHeight
                 ?
                 /* Portrait numpad */
                <div className="numpad">
                  <div className="numpad-row">
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(1, event)}} onClick={(event)=>{this.handleInput(1, event)}}>1</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(2, event)}} onClick={(event)=>{this.handleInput(2, event)}}>2</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(3, event)}} onClick={(event)=>{this.handleInput(3, event)}}>3</div>
                  </div>
                  <div className="numpad-row">
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(4, event)}} onClick={(event)=>{this.handleInput(4, event)}}>4</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(5, event)}} onClick={(event)=>{this.handleInput(5, event)}}>5</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(6, event)}} onClick={(event)=>{this.handleInput(6, event)}}>6</div>
                  </div>
                  <div className="numpad-row">
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(7, event)}} onClick={(event)=>{this.handleInput(7, event)}}>7</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(8, event)}} onClick={(event)=>{this.handleInput(8, event)}}>8</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(9, event)}} onClick={(event)=>{this.handleInput(9, event)}}>9</div>
                  </div>
                  <div className="numpad-row">
                   <div className="numpad-number" style={{backgroundColor:'gold', color:'black'}} onTouchStart={(event)=>{this.handleBackspace(event)}} onClick={(event)=>{this.handleBackspace(event)}}>⌥</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(0, event)}} onClick={(event)=>{this.handleInput(0, event)}}>0</div>
                   <div className="numpad-number" style={{backgroundColor:'gold', color:'black'}} onTouchStart={(event)=>{this.handleGold(event)}} onClick={(event)=>{this.handleGold(event)}}>⌘</div>
                  </div>
                </div>

                 :
                 /* Landscape numpad */
                 <div className="numpad">
                  <div className="numpad-row">
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(1, event)}} onClick={(event)=>{this.handleInput(1, event)}}>1</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(2, event)}} onClick={(event)=>{this.handleInput(2, event)}}>2</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(3, event)}} onClick={(event)=>{this.handleInput(3, event)}}>3</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(4, event)}} onClick={(event)=>{this.handleInput(4, event)}}>4</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(5, event)}} onClick={(event)=>{this.handleInput(5, event)}}>5</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(6, event)}} onClick={(event)=>{this.handleInput(6, event)}}>6</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(7, event)}} onClick={(event)=>{this.handleInput(7, event)}}>7</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(8, event)}} onClick={(event)=>{this.handleInput(8, event)}}>8</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(9, event)}} onClick={(event)=>{this.handleInput(9, event)}}>9</div>
                  </div>
                  <div className="numpad-row">
                   <div className="numpad-number" style={{backgroundColor:'gold', color:'black'}} onTouchStart={(event)=>{this.handleBackspace(event)}} onClick={(event)=>{this.handleBackspace(event)}}>⌥</div>
                   <div className="numpad-number" onTouchStart={(event)=>{this.handleInput(0, event)}} onClick={(event)=>{this.handleInput(0, event)}}>0</div>
                   <div className="numpad-number" style={{backgroundColor:'gold', color:'black'}} onTouchStart={(event)=>{this.handleGold(event)}} onClick={(event)=>{this.handleGold(event)}}>⌘</div>
                  </div>
                 </div>
                }

            </div>
            :
            <div className="block-line" onTouchEnd={(event)=>{this.handleNumpad(event)}} onClick={()=>{this.handleNumpad(event)}}>
              {this.state.hash}
            </div>
          }


          <div className="block-logo" onTouchEnd={(event)=>{this.handleNumpad(event)}} onClick={()=>{this.handleNumpad(event)}}>
            <Loader/>
          </div>

        </div>
    );
  }
}
