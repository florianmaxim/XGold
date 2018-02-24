import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Link, Redirect } from 'react-router-dom';

import {Container, Outer, Inner} from './container-button-main_';

import * as actionsOverlay from '../actions/actions-overlay';
import * as actionsMode    from '../actions/actions-mode';

import * as actionsBlocks    from '../actions/actions-blocks';

import * as config         from '../../../config.json';

class ContainerButtonMain extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){

        //NEEDS TO GO IN APP

        this.props.watchBlocks();
        this.props.getCoinbase();

        this.props.getWelcome();
        
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

        getWelcome: actionsBlocks.getWelcome
        
    }, dispatch);
  
  }
  
export default connect(props, actions)(ContainerButtonMain);