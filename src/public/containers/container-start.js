import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled, {keyframes} from 'styled-components';

import ComponentButton     from '../components/component-button';

import {ComponentOuter}     from '../components/component-outer';
import {ComponentInner}     from '../components/component-inner';

import * as actionsStart  from '../actions/actions-start';
import * as actionsMode  from '../actions/actions-mode';
import * as actionsBlocks  from '../actions/actions-blocks';


import * as actionsOverlay  from '../actions/actions-overlay';


import * as config from '../../../config.json';
import { ENGINE_METHOD_CIPHERS } from 'constants';
import { setTimeout } from 'timers';

let once = false;

const animation = keyframes`
from {
  opacity: 1
}
to {
  opacity: ${config.startUpOpacityTo}
}
`;

const ComponentOverlay = styled.div`

    overflow: hidden;

    position:fixed;
    left:0;
    top:0;

    width: 100vw;
    height: 100vh;

    background: url(static/disturb1.jpg);
    //background: red;
    background-size: cover;

    animation-name: ${(props) => props.animate?animation:''},
    animation-duration: ${config.startUpTime/1000}s;
  
    transition: ${config.startUpFinalTransitionTime/1000}s opacity;
    
`;

const LogoOuter = styled.div`

    z-index:5;

    position:fixed;

    left:5vw;
    top:5vw;

    width: 10vw;
    height: 10vw;

    max-width:75px;
    max-height:75px;

    display: flex;
    align-items: center;
    justify-content: center;

    background:transparent;

    border: 10px solid transparent;

    box-sizing: border-box;
  
    

    font-family: Lato;
    font-size:2vw;
    max-font-size:1.5em;

    box-shadow: 0px 0px 15px rgba(255,255,255,0);
    color:white;
    opacity:.5;

    &:hover {
      color: white;
      text-shadow: 0px 0px 2px rgba(0,0,0,.5);
      box-shadow: 0px 0px 15px rgba(255,255,255,.5);
      opacity:.9;
    }

    cursor: pointer;

    @media(orientation: portrait){
      top:auto;
      bottom:10vh;
      left:50vw;
      font-size:5vw;
      transform: translateX(-50%);
    }

    transition: ${config.startUpFinalTransitionTime/1000}s opacity;
`;

const LogoText = styled.div`

    z-index:5;

    position:fixed;

    left:15vw;
    top:5vw;

    width: 100%;
    text-align:center;
    height: 10vw;

    max-height:75px;

    display: flex;
    align-items: center;
    justify-content: center;

    background:transparent;

    border: 10px solid transparent;

    box-sizing: border-box;

    font-family: Lato;
    font-size:2vw;
    max-font-size:1.5em;
    color: white;
    text-shadow: 0px 0px 2px rgba(0,0,0,.5);
    opacity:.5;

    transition: .5s all;

    &:hover {
      
      opacity:.9;
    }

    cursor: pointer;

    @media(orientation: portrait){
      top:auto;
      bottom:2.5vh;
      left:50vw;
      font-size:3vw;
      transform: translateX(-50%);
    }

    transition: ${config.startUpFinalTransitionTime/1000}s opacity;
`;

class ContainerStart extends Component {

  constructor(props){
    super(props);

    this.state = {
        display: true,
        countdown: config.startUpTime/1000,
        logo: false
    }
  }

  componentDidMount(){

    //Next mode:
    this.props.setMode('block');

    setInterval(()=>{
      this.setState({countdown:this.state.countdown-1})
    }, 1000)

    once = true;

  }

  handleStart(){

      if(this.state.countdown>=0) return;

      this.props.start();
    }

  componentWillReceiveProps(props){
    setTimeout(()=>{
      this.setState({display:false})
    }, config.startUpFinalTransitionTime)
  }  

  renderPhrase(){
    return "Gosh, the Blockchain looks glittering."
    //return config.phrases[Math.floor(Math.random()*config.phrases.length)]
  }

  render(){
    return(

      <div style={{
        display: this.state.display?'flex':'none',
        overflow: 'hidden'
      }}>

        <a href="https://florianmaxim.com">
          <LogoOuter style={{display:!this.props.started&&config.logoEnabled?'flex':'none'}}>
            {config.logoInitials}
          </LogoOuter>
          <LogoText style={{display:!this.props.started&&config.logoEnabled?'flex':'none'}}>
            {config.logoText}
          </LogoText>
        </a>
     
        <ComponentOverlay 

          animate
        
          style={{

            zIndex:2,
            opacity: this.props.started?'0':config.startUpOpacityTo,                 
            }}/>

        <ComponentOuter 
          style={{
  
              zIndex:3,
              transition: `${config.startUpFinalTransitionTime/1000}s opacity`,
              opacity: this.props.started?'0':'1',     

              }}>
            
            <ComponentInner>
              <h1 style={{marginBottom: '25px', fontSize: '3em', fontFamily: 'Lato', color: 'white'}}>Yes, the blockchain looks beautiful.</h1>
            </ComponentInner>

            <ComponentInner>
            <ComponentButton 
                
                onClick={() => {this.handleStart();}} 

                caption={`${config.startButtonCaption} ${this.state.countdown<=0?'':' in '+this.state.countdown+'s'}`}/>
            
            </ComponentInner>

        </ComponentOuter>  

      </div>

    );
}

}

function props(state) {

  return {

    started: state.started,

    contract: state.contract

  };

}

function actions(dispatch){

  return bindActionCreators({

    start: actionsStart.start,

    setMode: actionsMode.setMode,

    fadeInOverlay: actionsOverlay.fadeIn,
    fadeOutOverlay: actionsOverlay.fadeOut,

    getContractWelcome: actionsBlocks.getContractWelcome

  }, dispatch);

}

export default connect(props, actions)(ContainerStart);


/*
                <iframe style={iFrameStyle} src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" />
           
*/