import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled, {keyframes} from 'styled-components';

import * as actionsOverlay from '../actions/actions-overlay';

import * as config from '../../../config.json';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;


const Overlay = styled.div`

  position: fixed;
  
  left:0;
  top:0;

  width: 100vw;
  height: 100vh;

  background: gold;

  opacity: 0;

  animation-fill-mode: forwards;
`;

class ContainerOverlay extends React.Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
    }

    componentWillReceiveProps(){
    }

    render(){
        return(
           <Overlay style={{opacity: this.props.overlay?'0':'1', animation: this.props.overlay?`${fadeIn} ${config.flashDuration}s linear forwards`:`${fadeOut} ${config.flashDuration}s linear forwards`}} />
        );
    }
}

function props(state) {

    return {
  
      overlay: state.overlay
  
    };
  
  }
  
  function actions(dispatch){
  
    return bindActionCreators({
  
    }, dispatch);
  
  }
  
export default connect(props, actions)(ContainerOverlay);