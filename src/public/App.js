import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Routes from './Routes'

import ContainerStart  from './containers/container-start';

import ContainerGold  from './containers/container-gold';

import ContainerOverlay     from './containers/container-overlay';
import ContainerButtonMain  from './containers/container-button-main';

import * as actionsBlocks    from './actions/actions-blocks';

import * as config from '../../config.json';

import styled, {injectGlobal} from 'styled-components';

injectGlobal`

  @import url('https://fonts.googleapis.com/css?family=Open+Sans:Light');
  @import url('https://fonts.googleapis.com/css?family=Cinzel');
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Lato');
  @import url('https://fonts.googleapis.com/css?family=Dosis');
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');
  

  body {
    margin: 0;
    padding:0;
    font-family: Open Sans;
    background: black;
  }

  *{
    user-select:none;
    text-shadow: 0px -0px 5px rgba(255, 215, 0, .5);
  }

  a{
    user-select:none;
    text-decoration:none;
  }

  html {
    overflow: scroll;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
      width: 0px;  /* remove scrollbar space */
      background: transparent;  /* optional: just make scrollbar invisible */
  }
  /* optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
      background: #FF0000;
  }

`;

export const Outer = styled.div`

  z-index:0;

  width: 100vw;
  height: 100vh;

  box-sizing: border-box;
  border: ${props => props.frame ? '5' : '0'}px solid gold;
  
  background: black;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  user-select:none;
`;

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <Outer frame={config.frame}>

        <ContainerStart/>

        <ContainerGold/>

        <ContainerOverlay/>
    
        <Routes/>
    
        <ContainerButtonMain/>
    
      </Outer>
    )
  }
}


/* function props(state) {

  return {

  };

}

function actions(dispatch){

  return bindActionCreators({

      getWelcome: actionsBlocks.getWelcome,

      getCoinbase: actionsBlocks.getCoinbase,

      watchBlocks: actionsBlocks.watchBlocks

  }, dispatch);

}

export default connect(props, actions)(App); */
