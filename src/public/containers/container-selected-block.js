import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Outer, Info} from './Block_';

import * as actionsBlock from '../actions/actions-block';

import * as config from '../../../config.json';

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

let interval;

class ContainerBlock extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            countdown: config.refresh/1000 //in s
        }
    }

    componentDidMount(){
       
        this.initCountdown();
    }

    initCountdown(){

        this.props.getBlock();

        let eventName;

        if(isMobile.any()){
            eventName = 'touchstart';
        }else{
            eventName = 'click';
        }
        
        addEventListener(eventName, (e)=>{

            e.preventDefault();

            //TODO Isnt this the same as watch?!
            this.props.getBlock(); 

            //Reset timer TODO: Can this go into a callback from the above?!?!
            this.setState({
                countdown: config.refresh/1000
            }, () => {

                //Reset interval
                clearInterval(interval);

                //Set new interval
                interval = setInterval(()=>{
        
                    this.setState({
                    countdown: this.state.countdown>1?this.state.countdown-1:config.refresh/1000
                    })
            
                }, 1000);

            })


        });


        interval = setInterval(()=>{
    
          this.setState({
            countdown: this.state.countdown>1?this.state.countdown-1:config.refresh/1000
          })
    
        }, 1000);
    
    }

    render(){
        return(
            <Outer>
                <Info>
                    <h1>#{this.props.block.number}</h1>
                    <h2>{this.props.block.hash}</h2>

                    <h3>Size: {this.props.block.size}</h3>
                    <h2>Nonce: {this.props.block.nonce}</h2>
                    <h2>Transactions [{this.props.block.transactions.length}]</h2>                    

                    <h3>ETH 0.521 (BALANCE 1.39)</h3>
                    <h2>Price varies with currency exchange rates and may be different tomorrow.</h2>
                    <h4>Next block will be available in {this.state.countdown}s.</h4>
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