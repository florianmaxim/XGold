import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Link, Redirect } from 'react-router-dom';

import * as actionsOverlay from '../actions/actions-overlay';
import * as actionsMode    from '../actions/actions-mode';

import * as actionsBlocks    from '../actions/actions-blocks';

import * as config         from '../../../config.json';

import styled from 'styled-components';

const Container = styled.div`

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
  
const Outer = styled.div`

    z-index:1;
    
    width: 50px;
    height: 110px;
    opacity: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: gold;

    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

    transform: scale3d(.4,.4,.4);

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

            <Container>
                
                <Link to={`/${this.props.mode}`} 

                    onMouseDown={()=>this.props.fadeInOverlay()}
                    onMouseUp={()=>this.props.fadeOutOverlay()}

                    onTouchStart={()=>this.props.fadeInOverlay()}
                    onTouchEnd={()=>this.props.fadeOutOverlay()}>

                    <Outer>

                        <Inner/>

                    </Outer>

                </Link>    

            </Container>

        );
    }

}


function props(state) {

    return {
  
      overlay: state.overlay,
      mode: state.mode
  
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