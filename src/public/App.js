import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Routes from './Routes'

import {Outer}              from './App_';

import ContainerOverlay     from './containers/container-overlay';
import ContainerButtonMain  from './containers/container-button-main';

import * as actionsBlocks    from './actions/actions-blocks';

import * as config from '../../config.json';

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    
/*   
    this.props.getCoinbase();

    this.props.getWelcome();

    this.props.watchBlocks(); 
*/

  }

  render(){
    return(
      <Outer frame={config.frame}>

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
