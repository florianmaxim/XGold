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
  min-height: 50vh;

  margin: 50px;

  display: flex;
  flex-direction:column;
  align-items:flex-start;
  justify-content:space-between;

  @media (orientation: portrait) {
      left:0;
      top:0;
      width: 90vw;
      min-height: 72.5vh;
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

const Block = styled.div`

    width: 100%;

    display: flex;
    flex-direction:column;

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
    this.props.getContractTotalBalance();
    this.props.getContractAmountOfBlocks();

  }

  render(){
    return(
        <Outer>

          <Block>

            <h1>XGold</h1>

            <h3 style={{marginBottom:'10px'}}>ETH {this.props.contract.balance} (TOKENS {this.props.contract.amountOfBlocks})</h3>            
          
          </Block>

          <Block>

            <a href={`https://ropsten.etherscan.io/address/${config.contractAddress}`} target="_blank">
             <ComponentButton caption="read the golden contract" />
             </a>

             <a href="https://github.com/florianmaxim/xgold" target="_blank">
             <ComponentButton caption="read the golden code" />
             </a>

            <ComponentButton caption="read the golden paper" />
            
          </Block>
          
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
    getContractTotalBalance:        actionsBlocks.getContractTotalBalance,
    getContractAmountOfBlocks: actionsBlocks.getContractAmountOfBlocks,

  }, dispatch);

}

export default connect(props, actions)(ContainerBlocks);