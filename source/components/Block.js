import React from 'react';

import Logo from './Logo';
import Numpad from './Numpad';

import ModelBlock from './ModelBlock';

import '../styles/Home.scss';

export default class Block extends React.Component{

  constructor(props){
    super(props);

    this.block = new ModelBlock();

    this.state = {
      numpad: false,
      input: ':Hash',

      block:{
        hash: 'Extract'
      }
    }
  }

  handleNumpad(){
    console.log('numpad');

    this.setState({
      numpad: this.state.numpad?false:true
    })
    this.forceUpdate();
  }

  handleInput(v){
    this.setState({
      input:this.state.input!=':Hash'?(this.state.input+v.toString()):v.toString()
    })
  }

  handleDisplay(hash){
    this.setState({
      block:{
        hash: hash
      }
    })
  }

  handleTar(){
    let hash = this.block.get(this.state.input)
  }

  render(){
    if(this.state.numpad){
    return(
      <div className="home">

        <div className="home-input" onClick={this.handleTar.bind(this)}>
        /{this.state.input}
        </div>
        <div className="home-gold">
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
          </div>
        </div>
        <div className="home-line" onClick={this.handleNumpad.bind(this)}>
        {this.state.block.hash}
        </div>
      </div>
    );
    }else{
      return(
        <div className="home">
          <div className="home-gold" onClick={this.handleNumpad.bind(this)}>
            <Logo/>
          </div>
          <div className="home-line">Targold.</div>
        </div>
      );
    }
  }
}
