import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled from 'styled-components';

import ComponentButton     from '../components/component-button';

import * as actionsStart  from '../actions/actions-start';
import * as actionsMode  from '../actions/actions-mode';

import * as config from '../../../config.json';
import { ENGINE_METHOD_CIPHERS } from 'constants';
import { setTimeout } from 'timers';

const Outer = styled.div`

  z-index:2;

  position: absolute;

  right:0;
  top:0;

  margin:0;
  padding:0;
  padding:5vh;
  padding-top:10vh;
  

  width: 100vw;
  height: 100vh;

  box-sizing: border-box;
  //border: 5px solid gold;

  opacity: 85%;

  color: gold;

  background: url("static/disturb1_kl.png");
  background-size: cover;

  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;

    transition: 1s opacity;
    transition-timing-function: ease;
    transition-delay: 0s;

    > h1 {

    margin:0;
    padding:0;
    color: white;
    font-size: 3em;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight:bold;
    
    word-break: keep-all;
    
    text-align:center;

    text-shadow: 0px 0px 25px rgba(255, 215, 0, .25);
     
  }
`;

const VideoContainer = styled.div`
    z-index:2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
`;

const iFrameStyle = {
    zIndex:'1',
    position:'fixed',
    transform: 'translateX(-25%) translateY(-250vh)',
    left:'50vw',
    top:'50vh',
    width:'500%',
    height:'500%'
}

class ContainerStart extends Component {

  constructor(props){
    super(props);

    this.state = {
        display: true
    }
  }

  componentDidMount(){

    //Next mode:
    this.props.setMode('block');

  }

  handleStart(){

      this.props.start();

      setTimeout(()=>{
        this.setState({display:false})
      }, 1000)
 
    }

  renderPhrase(){
    return config.phrases[Math.floor(Math.random()*config.phrases.length)]
  }

  render(){
    return(

        <Outer style={{
                opacity: !this.props.started?'1':'0',
                display: this.state.display?'flex':'none'                
            }}>
            
            <h1>{this.renderPhrase()}</h1>

            <ComponentButton 
                onTouchStart={() => this.handleStart()} 
                onMouseDown={() => this.handleStart()}
                caption="let's buy it" style={{margin: '25px', marginTop: '10vh'}} />

        </Outer>
       
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

    setMode: actionsMode.setMode

  }, dispatch);

}

export default connect(props, actions)(ContainerStart);


/*
                <iframe style={iFrameStyle} src="https://www.youtube.com/embed/W0LHTWG-UmQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" />
           
*/