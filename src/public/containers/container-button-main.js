import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Link, Redirect } from 'react-router-dom';

import * as actionsOverlay from '../actions/actions-overlay';
import * as actionsMode    from '../actions/actions-mode';

import * as actionsBlocks    from '../actions/actions-blocks';

import * as config         from '../../../config.json';

import styled, {keyframes} from 'styled-components';

const Container = styled.div`

    z-index:2;

    position: fixed;

    left:50vw;
    bottom:0;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    user-select: none;

    transform: translateX(-50%);
`

const Circle = styled.div`

    margin-bottom:25px;
    
    width: 65px;
    height: 65px;
    opacity: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: black;

    user-select: none;
    
    border-radius: 50%;
    border: 4px solid rgba(255, 215, 0, 1);

    box-shadow: 0px 0px 50px rgba(255, 215, 0, .25);

    user-select: none;
`
  
const Outer = styled.div`
    
    width: 50px;
    height: 15vh;
    opacity: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: gold;

    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

    transform: scale3d(.35,.35,.35);

    user-select: none;    
`
  
const Inner = styled.div`
    width: 45px;
    height: 19px;
    opacity: 1;
  
    background-color:rgba(80,70,25, .5);
  
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

    user-select: none;    
`
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

class ContainerButtonMain extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

        //NEEDS TO GO SOMEWHERE ELSE

        this.props.watchBlocks();
        
        this.props.getCoinbase();
        
    }

    render(){

        return(

            <Container style={{transition: '3s all', opacity: this.props.started?'1':'0'}}>
                
                <Link 
                    style={{userSelect:'none'}}
                    to={`/${this.props.mode}`} 

                    onMouseDown={(e)=>{e.stopPropagation();this.props.fadeInOverlay()}}
                    onMouseUp={(e)=>{e.stopPropagation();this.props.fadeOutOverlay()}}

                    onTouchStart={(e)=>{e.stopPropagation();this.props.fadeInOverlay()}}
                    onTouchEnd={(e)=>{e.stopPropagation();this.props.fadeOutOverlay()}}>
                    
                    <Circle style={{opacity: !this.props.overlay?'0':'1', animation: !this.props.overlay?`${fadeIn} ${config.flashDuration}s linear forwards`:`${fadeOut} ${config.flashDuration}s linear forwards`}}>

                        <Outer>

                            <Inner/>

                        </Outer>

                    </Circle>

                </Link>    

            </Container>

        );
    }

}


function props(state) {

    return {
  
      overlay: state.overlay,
      mode: state.mode,

      started: state.started
  
    };
  
  }
  
  function actions(dispatch){
  
    return bindActionCreators({

        fadeInOverlay: actionsOverlay.fadeIn,
        fadeOutOverlay: actionsOverlay.fadeOut,

        setMode: actionsMode.setMode,    

        watchBlocks: actionsBlocks.watchBlocks,
        getCoinbase: actionsBlocks.getCoinbase,
        
    }, dispatch);
  
  }
  
export default connect(props, actions)(ContainerButtonMain);