import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled from 'styled-components';

import ComponentButton     from '../components/component-button';

import * as actionsMode  from '../actions/actions-mode';

import * as config from '../../../config.json';

const Outer = styled.div`

    position: absolute;

    right:0;
    top:0;

    width: 300px;
    height: 75vh;

    margin: 12.5px;

    display: flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-between;

    @media (orientation: portrait) {
        left:0;
        top:0;
        width: 90vw;
        margin: 5vw; 
    }

    word-wrap: break-word;

    > h1 {
        width:inherit;
        margin:0;
        padding:0;
        color: gold;
        font-size: 3em;
        font-family: Cinzel;
        2px 2px 5px rgba(0, 0, 0, 0.25);
        word-wrap: break-word;
    }
`;

class ContainerBlocks extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    //Actually still sets next mode TODO This can be handled smarter!
    this.props.setMode('block');

  }

  render(){
    return(
        <Outer>
          <h1>XGold</h1>
          <ComponentButton caption="read the golden paper" />
        </Outer>
    );
}

}

function props(state) {

  return {

  };

}

function actions(dispatch){

  return bindActionCreators({

    setMode: actionsMode.setMode

  }, dispatch);

}

export default connect(props, actions)(ContainerBlocks);