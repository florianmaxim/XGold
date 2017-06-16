import React from 'react';

import Logo from './Logo';
import Loader from './Loader';

import Gold from './Gold';

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

    this.state = {

      numpad: true,

      input: 3881441,

      input: gold,

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

    let params = {

                   method: 'GET',
                   headers: {
                      Accept: 'application/json'
                     }
                 }

    fetch(url, params).then(res => res.json()).then((out) => {

        this.setState({

          input: out.data[0].count,

          gold: out.data[0].count,

          numpad:this.state.numpad?false:true

        });

    });

    addEventListener('mousemove', (event) => {
      event.stopPropagation();
      event.preventDefault();
      console.log(this.state.input)
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
      input:parseInt( this.state.input.toString().slice(0, -1) )
    })
  }

  handleGold(event){

    event.stopPropagation();
    event.preventDefault();

    //no input, no gold.

    this.setState({
      //send current inout to gold
      gold: this.state.input,
      //toggle numpad
      numpad:this.state.numpad?false:true
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

                <Gold input={this.state.gold}/>

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
            <div className="block-numpad">
              <div className="block-line" onTouchEnd={(event)=>{this.handleNumpad(event)}} onClick={()=>{this.handleNumpad(event)}}>
                {this.state.hash}
              </div>
            </div>
          }


          <div className="block-logo" onTouchEnd={(event)=>{this.handleNumpad(event)}} onClick={()=>{this.handleNumpad(event)}}>
            <Loader/>
          </div>

        </div>
    );
  }
}
