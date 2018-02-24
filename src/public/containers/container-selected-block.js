import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled from 'styled-components';

import * as actionsOverlay from '../actions/actions-overlay';

import * as actionsBlocks from '../actions/actions-blocks';
import * as actionsMode   from '../actions/actions-mode';

import ComponentButtonBuy     from '../components/component-button';

import * as config from '../../../config.json';

import ControllerMagic from '../controllers/controller-magic';

const _ControllerMagic = new ControllerMagic();

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

class ContainerBlock extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

        this.props.setMode('list');

        this.props.getBlock(this.props.blockNumber);

    }

    render(){
        return(
            <Outer>
                <h1>X{this.props.selectedBlock.number}</h1>
                <h2>{this.props.selectedBlock.hash}</h2>

                <h2>Size: {this.props.selectedBlock.size}</h2>
                <h2>Nonce: {this.props.selectedBlock.nonce}</h2>
                <h2>Transactions [{this.props.selectedBlock.transactions.length}]</h2>                    

                <h3>ETH {_ControllerMagic.calculatePrice(this.props.selectedBlock)} (ETH {this.props.account.balance})</h3>
                
                <h2 style={{marginTop:'5px'}}>{this.props.selectedBlock.ownersAddress}</h2>

                <ComponentButtonBuy onClick={()=>{

                        if(this.props.selectedBlock.ownersAddress==this.props.account.coinbase){
                            
                            alert('sell')
                            this.props.sellBlock(this.props.selectedBlock)

                        }else{
                            alert('buy')
                            this.props.buyBlock(this.props.selectedBlock)

                        }
                        
                    }} 
                
                    caption={this.props.selectedBlock.ownersAddress!=='0x0000000000000000000000000000000000000000'?(this.props.selectedBlock.ownersAddress==this.props.account.coinbase?'sell':'sold'):'purchase'}/>
                
            </Outer>
        );
    }
}

function props(state) {

    return {
  
        selectedBlock: state.selectedBlock,

        account: state.account
  
    };
  
  }
  
  function actions(dispatch){
  
    return bindActionCreators({

        overlayFadeOut: actionsOverlay.fadeOut,
  
        watchBlocks: actionsBlocks.watchBlocks,

        buyBlock:    actionsBlocks.buyBlock,
        sellBlock:    actionsBlocks.sellBlock,              

        getOwnerOfBlock: actionsBlocks.getOwnerOfBlock,

        getBlock: actionsBlocks.getBlock,
        
        setMode: actionsMode.setMode
  
    }, dispatch);
  
  }
  
export default connect(props, actions)(ContainerBlock);