import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {ComponentButton} from '../components/component-button';

import {ComponentList}          from '../components/component-list';
import {ComponentItem}          from '../components/component-item';

import {ComponentOuter} from '../components/component-outer';
import {ComponentInner} from '../components/component-inner';


import * as actionsOverlay from '../actions/actions-overlay';

import * as actionsBlocks from '../actions/actions-blocks';
import * as actionsMode  from '../actions/actions-mode';

import * as config from '../../../config.json';

import styled from 'styled-components';

import Magic from '../controllers/controller-magic';

const _MAGIC = new Magic();

class ContainerBlocks extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.setMode('account');
  }

  handleSelect(){
    this.props.history.push('/block');
  }

  render(){
    return(   
      <ComponentOuter style={{display: this.props.started?'flex':'none'}}>
        <ComponentInner>
          <div style={{height: '300px', width: '100%', overflowX: 'hidden', overflowY: 'scroll', boxSizing: 'border-box'}}>
          {/* <div style={{width: '300px', height:'2000px', background: 'linear-gradient(red, yellow)'}}/> */}
            {
                this.props.blocks.map((block) => {
                  return(
                    <Link 
                    style={{width:'inherit'}} 
                    to={`/block/${block.number}`}
                    >
                      <ComponentItem>
                        <h3>#{block.number} (ETH {_MAGIC.calculatePrice(block)})</h3>
                        <h3>{new Date(block.timestamp*1000).toGMTString()}</h3>
                        <h2>{block.hash}</h2>
                      </ComponentItem>
                    </Link>
                  ) 
                })
              }
          </div>
          <ComponentButton caption={`blockchain (${this.props.blocks.length})`} />
        </ComponentInner>
      </ComponentOuter>
    );
  }

}

function props(state) {

  return {

    blocks: state.blocks,
    started: state.started

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


/*

<ComponentList>
            {
              this.props.blocks.map((block) => {
                return(

                    <ComponentItem>
                      <h3>#{block.number} (ETH {_MAGIC.calculatePrice(block)})</h3>
                      <h3>{new Date(block.timestamp*1000).toGMTString()}</h3>
                      <h2>{block.hash}</h2>
                    </ComponentItem>

                ) 
              })
            }
        </ComponentList>
        <ComponentButton caption="blockchain" />
*/