import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import {ComponentList} from '../components/component-list';
import {ComponentItem} from '../components/component-item';

import {ComponentOuter} from '../components/component-outer';
import {ComponentInner} from '../components/component-inner';


import {ComponentButton} from '../components/component-button';


import * as actionsOverlay from '../actions/actions-overlay';

import * as actionsBlocks from '../actions/actions-blocks';
import * as actionsMode  from '../actions/actions-mode';
import * as actionsAccount  from '../actions/actions-account';

import * as config from '../../../config.json';

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
      <ComponentOuter style={{display: this.props.started?'flex':'none'}}>
        <ComponentInner>
          <div style={{height: '300px', width: '100%', overflowX: 'hidden', overflowY: 'scroll', boxSizing: 'border-box'}}>
          {/* <div style={{width: '300px', height:'2000px', background: 'linear-gradient(red, yellow)'}}/> */}
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
          </div>
          <ComponentButton caption={`wallet (${this.props.ownedBlocks.length})`} />
        </ComponentInner>
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