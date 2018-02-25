import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled from 'styled-components';

import * as actionsOverlay from '../actions/actions-overlay';

import * as actionsBlocks from '../actions/actions-blocks';
import * as actionsMode   from '../actions/actions-mode';

import * as actionsCounter   from '../actions/actions-counter';


import ComponentButton     from '../components/component-button';

import * as config from '../../../config.json';

import ControllerMagic from '../controllers/controller-magic';

const _ControllerMagic = new ControllerMagic();

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

let interval;

class ContainerBlock extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

        this.props.setMode('list');

    
        if(this.props.blockNumber===undefined){

            if(this.props.selectedBlock.number===null){
                this.props.getBlock();
            }
        }else{

            if(this.props.selectedBlock===undefined)
            {
                this.props.getBlock(this.props.blockNumber);

            }else{
                
                if(this.props.selectedBlock!==this.props.blockNumber){
                    this.props.getBlock(this.props.blockNumber);
                }
              
            }
            
        }

    }

    componentWillReceiveProps(props){

        switch(props.selectedBlock.state)
        {
            case "owned":
               
                this.props.stopCounter();
              
            break;

            case "available":

                this.props.stopCounter();
               
            break;

            case "pending":
              
                

            break;

            default:

                this.props.stopCounter();
               
            break;
            
        }

    }

    handleButtonAction(){
        switch(this.props.selectedBlock.state)
        {
            case "owned":
                this.props.sellBlock(this.props.selectedBlock.number);
                this.props.startCounter();
            break;

            case "available":
                this.props.buyBlock(this.props.selectedBlock.number);
                this.props.startCounter();
            break;

            default:
                
            break;    
        } 
    }

    renderButtonCaption(){
        switch(this.props.selectedBlock.state)
        {
            case "owned":
                return "sell"
            break;

            case "available":
                return "buy"
            break;

            case "pending":
                return "pending"
            break;

            default:
                return "sold"
            break;    
        } 
    }


    render(){
        return(
            <Outer>
                <h1>X{this.props.selectedBlock.number}</h1>
                <h2>{this.props.selectedBlock.hash}</h2>

                <h2>Size: {this.props.selectedBlock.size}</h2>
                <h2>Nonce: {this.props.selectedBlock.nonce}</h2>
                <h2>Transactions [{this.props.selectedBlock.transactions.length}]</h2>                    

                <h3 style={{marginBottom:'5px'}}>ETH {_ControllerMagic.calculatePrice(this.props.selectedBlock)} (ETH {this.props.account.balance})</h3>       

                <ComponentButton 

                    onClick={()=>{this.handleButtonAction()}} 

                    caption={`${this.renderButtonCaption()} ${this.props.counter!==0?this.props.counter+'s':''}`}
                />

                <h2 style={{marginTop:'5px'}}>{this.props.selectedBlock.ownersAddress}</h2>                
                 
            </Outer>
        );
    }
}

function props(state) {

    return {
  
        selectedBlock: state.selectedBlock,

        account: state.account,

        counter: state.counter        
  
    };
  
  }
  
  function actions(dispatch){
  
    return bindActionCreators({

        setMode: actionsMode.setMode,
  
        watchBlocks: actionsBlocks.watchBlocks,

        getBlock: actionsBlocks.getBlock,

        buyBlock:    actionsBlocks.buyBlock,
        sellBlock:    actionsBlocks.sellBlock,              

        startCounter: actionsCounter.startCounter,
        stopCounter: actionsCounter.stopCounter        
  
    }, dispatch);
  
  }
  
export default connect(props, actions)(ContainerBlock);