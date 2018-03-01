import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styled from 'styled-components';

import * as actionsOverlay from '../actions/actions-overlay';
import * as actionsElements from '../actions/actions-elements';

import * as actionsBlocks from '../actions/actions-blocks';
import * as actionsMode   from '../actions/actions-mode';

import * as actionsCounter   from '../actions/actions-counter';

import {ComponentOuter} from '../components/component-outer';

import ComponentButton     from '../components/component-button';

import * as config from '../../../config.json';

import ControllerMagic from '../controllers/controller-magic';

//VERY DIRTY
let wasGoldBefore = false;

let startedGold = false;
let startedNebula = false;

const _ControllerMagic = new ControllerMagic();


const Block = styled.div`

    margin:0;

    transition: 1s all;

    display: flex;
    flex-direction:column;

    width: 100%;

    opacity: {${props => props.toggle?'1':'0'}};

    @media (orientation: portrait ){

        //border: 5px solid gold;

        width: 75vw;
       
    }

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

        this.state = {
            elements: {
                heading: true,
                data: true,
                purchase: true
            }
        }
    }

    componentDidMount(){

        this.props.setMode('list');

        
        //No URL given
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

    componentWillReceiveProps(newProps){

        if(newProps.selectedBlock.state===this.props.selectedBlock.state) return;

        switch(newProps.selectedBlock.state)
        {
            case "gold":
              
                
                this.props.stopCounter();
              
            break;

            case "nebula":

              
                this.props.stopCounter();
          
            break;
            
        }

    }

    handleButtonAction(){
        switch(this.props.selectedBlock.state)
        {
            case "owned":
                this.props.sellBlock(this.props.selectedBlock.number);
               
            break;

            case "available":
                this.props.buyGoldBlock(this.props.selectedBlock.number);
                
                startedGold = true;
                startedNebula = false;

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

            case "gold":
                wasGoldBefore = true;
                return "sell gold"
            break;

            case "nebula":
                return "sell gold"
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

    renderButtonSecondaryCaption(){
        switch(this.props.selectedBlock.state)
        {
            case "gold":
                if(startedNebula){
                    return "pending"
                }
                if(wasGoldBefore){
                    return "buy nebula"
                }else{
                    return "not available"
                }
            break;

            case "pending":
                if(wasGoldBefore){
                    return "pending"
                }else{
                    return "not available"
                }
            break;

            case "nebula":
                return "sell nebula"
            break;

            default:
            return "not available"
        break;    
        } 
    }

    handleButtonSecondaryAction(){
        switch(this.props.selectedBlock.state)
        {
            case "gold":
                this.props.buyNebulaBlock(this.props.selectedBlock.number);
               
                startedGold = false;
                startedNebula = true;

                wasGoldBefore = true;
               
                this.props.startCounter();
            break;

            default:
                
            break;    
        } 
    }

    renderCounterTime(seconds){

        return seconds>60?`${Math.floor(seconds / 60)}:${seconds%60}m`:`${seconds}s`;

    }

    render(){
        return(
            <ComponentOuter style={{display: this.props.started?'flex':'none'}}>
                
                <Block   
                    onClick = {() => this.props.toggleHeading()}                    
                    style={{opacity:this.props.elements.heading&&this.props.started?'1':'0'}}>
                    
                    <h1>X{this.props.selectedBlock.number}</h1>
                    <h2 style={{marginTop:'10px',marginBottom:'10px'}}>{this.props.selectedBlock.hash}</h2>
                </Block>
                <Block 
                   
                    onClick = {() => this.props.toggleHeading()}                    
                    style={{opacity:this.props.elements.heading&&this.props.started?'1':'0'}}>
                    <h2>Size: {this.props.selectedBlock.size}</h2>
                    <h2>Nonce: {this.props.selectedBlock.nonce}</h2>
                    <h2>Transactions [{this.props.selectedBlock.transactions.length}]</h2>                    
                </Block>
                <Block
                    
                    style={{transitionDelay:this.props.started?'0s':'5s',opacity:this.props.elements.heading&&this.props.started?'1':'0'}}               
                    > 
                    <h3 
                        style={{marginBottom:'10px'}}>ETH {_ControllerMagic.calculatePrice(this.props.selectedBlock)} (ETH {this.props.account.balance})</h3>       

                    <ComponentButton
                    
                        style={{display:this.props.selectedBlock.state!=='nebula'?'flex':'none'}}

                        onClick={()=>{this.handleButtonAction()}} 

                        caption={`${this.renderButtonCaption()} ${startedGold&&this.props.counter!==0?this.renderCounterTime(this.props.counter):''}`}
                    />

                    <ComponentButton

                        style={{display:this.props.selectedBlock.state==='gold'||this.props.selectedBlock.state==='nebula'?'flex':'none'}}

                        onClick={()=>{this.handleButtonSecondaryAction()}} 

                        caption={`${this.renderButtonSecondaryCaption()} ${startedNebula&&this.props.counter!==0?this.renderCounterTime(this.props.counter):''}`}
                    />
                    
                </Block>

            </ComponentOuter>
        );
    }
}

function props(state) {

    return {
  
        selectedBlock: state.selectedBlock,

        account: state.account,

        counter: state.counter,
        
        elements: state.elements,

        started: state.started,
  
    };
  
  }
  
  function actions(dispatch){
  
    return bindActionCreators({

        setMode: actionsMode.setMode,

        toggleHeading: actionsElements.toggleHeading,
        toggleData: actionsElements.toggleData,
        togglePurchase: actionsElements.togglePurchase,
  
        watchBlocks: actionsBlocks.watchBlocks,

        getBlock: actionsBlocks.getBlock,

        buyGoldBlock:    actionsBlocks.buyGoldBlock,
        buyNebulaBlock:    actionsBlocks.buyNebulaBlock,

        sellBlock:    actionsBlocks.sellBlock,              

        startCounter: actionsCounter.startCounter,
        stopCounter: actionsCounter.stopCounter        
  
    }, dispatch);
  
  }
  
export default connect(props, actions)(ContainerBlock);