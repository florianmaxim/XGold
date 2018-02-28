import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled, {keyframes} from 'styled-components';

import ComponentButton     from '../components/component-button';

import {ComponentOuter}     from '../components/component-outer';
import {ComponentInner}     from '../components/component-inner';

import * as actionsStart  from '../actions/actions-start';
import * as actionsMode  from '../actions/actions-mode';

import * as actionsOverlay  from '../actions/actions-overlay';


import * as config from '../../../config.json';
import { ENGINE_METHOD_CIPHERS } from 'constants';
import { setTimeout } from 'timers';

const once = false;

const animation = keyframes`
from {
  opacity: 1
}
to {
  opacity: 0.5
}
`
const ComponentOverlay = styled.div`

    position:fixed;
    left:0;
    top:0;

    width: 100vw;
    height: 100vh;

    background: url(static/disturb1.jpg);
    background-size: cover;

    animation-duration: 30s;

    transition: 5s;
`;

class ContainerStart extends Component {

  constructor(props){
    super(props);

    this.state = {
        display: true,
        countdown: 30
    }
  }

  componentDidMount(){

    //Next mode:
    this.props.setMode('block');

    setInterval(()=>{
      this.setState({countdown:this.state.countdown-1})
    }, 1000)

  }

  handleStart(){

      if(thisstate.countdown>=0) return;
      
      this.props.start();

      setTimeout(()=>{
        this.setState({display:false})
      }, 5000)

    }

  renderPhrase(){
    return "Gosh, the Blockchain looks glittering."
    //return config.phrases[Math.floor(Math.random()*config.phrases.length)]
  }

  render(){
    return(

      <div>
     
        <ComponentOverlay style={{
            animationName: !once?animation:'',
            zIndex:2,
            opacity: !this.props.started?'.85':'0',   
            display: this.state.display?'flex':'none'                
            }}/>

        <ComponentOuter 
          style={{
              position: 'absolute',
              zIndex:3,
              display: this.state.display?'flex':'none'      
              }}>
            
            <ComponentInner>
              <h1 style={{ wordWrap:'normal', fontFamily: 'Roboto', fontSize: '3em', marginBottom: '50px'}}>{this.renderPhrase()}</h1>
            </ComponentInner>

            <ComponentInner>
            <ComponentButton 
                onTouchStart={() => {this.handleStart();}} 
                onMouseDown={() => {this.handleStart();}}
                caption={`${config.start.button} ${this.state.countdown<=0?'':' in '+this.state.countdown+'s'}`}/>
            </ComponentInner>

        </ComponentOuter>  

      </div>
      
    );
}

}

function props(state) {

  return {

    started: state.started

  };

}

function actions(dispatch){

  return bindActionCreators({

    start: actionsStart.start,

    setMode: actionsMode.setMode,

    fadeInOverlay: actionsOverlay.fadeIn,
    fadeOutOverlay: actionsOverlay.fadeOut,

  }, dispatch);

}

export default connect(props, actions)(ContainerStart);


/*
                <iframe style={iFrameStyle} src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" />
           
*/