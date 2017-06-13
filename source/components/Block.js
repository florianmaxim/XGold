import React from 'react';

import Logo from './Logo';

import Gold from './Gold';

import ModelBlock from './ModelBlock';

const DEFAULT = {
  line: 'Targold',
  input: ':number'
}

export default class Block extends React.Component{

  constructor(props){
    super(props);

    this.block = new ModelBlock();

    this.state = {
      numpad: false,
      input: DEFAULT.input,

      gold: false,

      hash: 'Targold.'
    }
  }

  handleNumpad(){
    this.setState({
      numpad: this.state.numpad?false:true
    })
    this.forceUpdate();
  }

  handleInput(v){
    this.setState({
      input:this.state.input!=DEFAULT.input?(this.state.input+v.toString()):v.toString()
    })
  }

  handleBackspace(){
    this.setState({
      input:this.state.input.substring(0, this.state.input.length - 1)
    })
  }

  handleGold(){
    this.setState({
      gold: this.state.gold?false:true,
      hash: this.block.get(this.state.input)
    })
    this.forceUpdate();
  }

  render(){
      return(
        <div className="home">
          <div className="home-gold">
            {this.state.gold? <Gold input={this.state.input}/>: ''}
          </div>
          {this.state.numpad
            ?
            <div className="home-interface">
              <div className="home-input">
                {this.state.input}_
              </div>
              <div className="numpad">
               <div className="numpad-row">
                <div className="numpad-number" onClick={()=>{this.handleInput(1)}}>1</div>
                <div className="numpad-number" onClick={()=>{this.handleInput(2)}}>2</div>
                <div className="numpad-number" onClick={()=>{this.handleInput(3)}}>3</div>
               </div>
               <div className="numpad-row">
                <div className="numpad-number" onClick={()=>{this.handleInput(4)}}>4</div>
                <div className="numpad-number" onClick={()=>{this.handleInput(5)}}>5</div>
                <div className="numpad-number" onClick={()=>{this.handleInput(6)}}>6</div>
               </div>
               <div className="numpad-row">
                <div className="numpad-number" onClick={()=>{this.handleInput(7)}}>7</div>
                <div className="numpad-number" onClick={()=>{this.handleInput(8)}}>8</div>
                <div className="numpad-number" onClick={()=>{this.handleInput(9)}}>9</div>
               </div>
               <div className="numpad-row">
                <div className="numpad-number-secondary" onClick={()=>{this.handleBackspace()}}>back</div>
                <div className="numpad-number" onClick={()=>{this.handleInput(0)}}>0</div>
                <div className="numpad-number-secondary" onClick={()=>{this.handleGold(0)}}>gold</div>
               </div>
              </div>
            </div>
            :
            <div className="home-interface">
              <div className="home-line">
                {this.state.hash}
              </div>
            </div>
          }
          <div className="home-logo" onClick={this.handleNumpad.bind(this)}>
            <Logo/>
          </div>
        </div>
    );
  }
}
