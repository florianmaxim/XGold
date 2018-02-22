import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Outer, Info} from './Block_';

import * as actionsBlock from '../actions/actions-block';

class ContainerBlock extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        addEventListener('click', ()=>{
            this.props.getBlock();
        })
    }

    handleOnClick(){
        this.setState({
            block: {
                height: 'Hi!'
            }
        })
    }

    render(){
        return(
            <Outer>
                <Info>
                    <h1>{this.props.block.number}</h1>
                    <h2>{this.props.block.hash}</h2>

                    <h3>Size {this.props.block.size}</h3>
                    <h2>Nonce {this.props.block.nonce}</h2>
                    <h2>Transactions {this.props.block.transactions.length}</h2>                    

                    <h3>ETH 0.521 (BALANCE 1.39)</h3>
                    <h2>Price varies with currency exchange rates and may be different tomorrow.</h2>
                    <h4>Next block will be available in 5s.</h4>
                </Info>
            </Outer>
        );
    }
}

function props(state) {

    return {
  
      block: state.block
  
    };
  
  }
  
  function actions(dispatch){
  
    return bindActionCreators({
  
        getBlock: actionsBlock.getBlock
  
    }, dispatch);
  
  }
  
export default connect(props, actions)(ContainerBlock);