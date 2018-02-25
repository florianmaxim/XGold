import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import * as actionsOverlay from '../actions/actions-overlay';

import * as actionsBlocks from '../actions/actions-blocks';
import * as actionsMode  from '../actions/actions-mode';

import * as config from '../../../config.json';

import styled from 'styled-components';

import Magic from '../controllers/controller-magic';

const _MAGIC = new Magic();

const Outer = styled.div`

  position: absolute;

  right:0;
  top:0;

  width: 300px;
  min-height: 50vh;

  margin: 50px;

  display: flex;
  flex-direction:column-reverse;
  align-items:flex-start;
  justify-content:flex-end;

  @media (orientation: portrait) {
      left:0;
      top:0;
      width: 90vw;
      min-height: 72.5vh;
      margin: 5vw; 
  }

    word-wrap: break-word;

    > h1 {
      margin:0px;
      color: gold;
      font-size: 3em;
      font-family: Cinzel;
      2px 2px 5px rgba(0, 0, 0, 0.25);
      word-break: break-all;
      word-wrap: break-word;
    }
`;

const Item = styled.div`

  width:inherit;

  margin-bottom: 5px;
  padding:0;

  background: transparent;
  color:gold;

  word-break: break-all;

/*   &:hover {
    background: gold;
    color:black;
  } */

  > h2 {
    margin:0;
    color: inherit;
    font-size: 16px;
    font-family: Lato;
    font-weight: 200;
    2px 2px 5px rgba(0, 0, 0, 0.25);
    word-break: break-all;
    word-wrap: break-word;
  }

  > h3 {
    margin:0;
    color: inherit;
    font-size: 16px;
    font-family: Lato;
    font-weight: bold;
    2px 2px 5px rgba(0, 0, 0, 0.25);
    word-break: break-all;
    word-wrap: break-word;
  }

  > h4 {
    margin:5px;
    color: inherit;
    font-size: 16px;
    font-family: Lato;
    font-weight: 200;
    2px 2px 5px rgba(0, 0, 0, 0.25);
    word-break: break-all;
    word-wrap: break-word;
  }
`;

class ContainerBlocks extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.setMode('about');
  }

  handleSelect(){
    this.props.history.push('/block');
  }

  render(){
    return(   
      <Outer>
        {
          this.props.blocks.map((block) => {
            return(
              <Link 
                style={{width:'inherit'}} 
                to={`/block/${block.number}`}
              
                onMouseDown={()=>this.props.fadeInOverlay()}
                onMouseUp={()=>this.props.fadeOutOverlay()}

                onTouchStart={()=>this.props.fadeInOverlay()}
                onTouchEnd={()=>this.props.fadeOutOverlay()}
              >
                <Item>
                  <h3>#{block.number} (ETH {_MAGIC.calculatePrice(block)})</h3>
                  <h3>{new Date(block.timestamp*1000).toGMTString()}</h3>
                  <h2>{block.hash}</h2>
                </Item>
              </Link>
            ) 
          })
        }
      </Outer>
    );
  }

}

function props(state) {

  return {

    blocks: state.blocks

  };

}

function actions(dispatch){

  return bindActionCreators({

    fadeInOverlay: actionsOverlay.fadeIn,
    fadeOutOverlay: actionsOverlay.fadeOut,

    watchBlocks: actionsBlocks.watchBlocks,

    setMode: actionsMode.setMode,

    selectBlock: actionsBlocks.selectBlock

  }, dispatch);

}

export default connect(props, actions)(ContainerBlocks);