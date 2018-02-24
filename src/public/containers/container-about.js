import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled from 'styled-components';

import ComponentButton     from '../components/component-button';

import * as actionsMode  from '../actions/actions-mode';
import * as actionsBlocks from '../actions/actions-blocks';

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
      color: gold;
      font-size: 3em;
      font-family: Cinzel;
      2px 2px 5px rgba(0, 0, 0, 0.25);
      word-wrap: break-word;
  }

  > h2 {
      width:inherit;
      margin:0;
      color: gold;
      font-size: 16px;
      font-family: Lato;
      font-weight: 200;
      2px 2px 5px rgba(0, 0, 0, 0.25);
      word-wrap: break-word;
  }

  > h3 {
      width:inherit;
      margin:0;
      margin-top:15px;
      color: gold;
      font-size: 16px;
      font-family: Lato;
      font-weight: bold;
      2px 2px 5px rgba(0, 0, 0, 0.25);
      word-wrap: break-word;
  }

  > h4 {
      width:inherit;
      margin-top:15px;
      color: gold;
      font-size: 16px;
      font-family: Lato;
      font-weight: 200;
      2px 2px 5px rgba(0, 0, 0, 0.25);
      word-wrap: break-word;
      text-align:center;
  }
`;

class ContainerBlocks extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    //Actually still sets next mode TODO This can be handled smarter!
    this.props.setMode('block');

    this.props.getContractWelcome();
    this.props.getContractBalance();
    this.props.getContractAmountOfBlocks();

  }

  render(){
    return(
        <Outer>
          <h1>XGold</h1>

          <h2>{this.props.contract.welcome}</h2>

          <h3>ETH {this.props.contract.balance} (GOLD {this.props.contract.amountOfBlocks})</h3>  
          
          <h2 style={{marginTop:'5px'}}>{config.contractAddress}</h2>
          
          <ComponentButton caption="read the golden paper" />
        </Outer>
    );
}

}

function props(state) {

  return {

    contract: state.contract

  };

}

function actions(dispatch){

  return bindActionCreators({

    setMode: actionsMode.setMode,

    getContractWelcome:        actionsBlocks.getContractWelcome,
    getContractBalance:        actionsBlocks.getContractBalance,
    getContractAmountOfBlocks: actionsBlocks.getContractAmountOfBlocks,

  }, dispatch);

}

export default connect(props, actions)(ContainerBlocks);