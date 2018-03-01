import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {ComponentItem} from '../components/component-item';
import {ComponentOuter} from '../components/component-outer';

import * as actionsOverlay from '../actions/actions-overlay';

import * as actionsBlocks from '../actions/actions-blocks';
import * as actionsMode  from '../actions/actions-mode';
import * as actionsAccount  from '../actions/actions-account';

import * as config from '../../../config.json';

import styled from 'styled-components';

import Magic from '../controllers/controller-magic';

const _MAGIC = new Magic();

class ContainerOwnedBlocks extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    //Actually still sets next mode TODO This can be handled smarter!
    this.props.setMode('about');

    this.props.getBlocksOfSender();

  }

  render(){
    return(
      <ComponentOuter style={{display: this.props.started?'flex':'none', flexDirection: 'column-reverse', justifyContent: 'flex-end'}}>
        {
          this.props.ownedBlocks.map((block) => {
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
      </ComponentOuter>
    );
}

}

function props(state) {

  return {

    contract: state.contract,

    started: state.started,

    account: state.account,

    ownedBlocks: state.ownedBlocks

  };

}

function actions(dispatch){

  return bindActionCreators({

    setMode: actionsMode.setMode,
    getBlocksOfSender: actionsAccount.getBlocksOfSender

  }, dispatch);

}

export default connect(props, actions)(ContainerOwnedBlocks);