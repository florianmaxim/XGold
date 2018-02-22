import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as blocks from '../actions/actions-blocks';

class ContainerBlocks extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    this.props.watchBlocks();

  }

  render() {

      return (

        <div>

          {

            this.props.blocks.map((block, index) => {

              return (

                <div key={index}>

                  <h1>{block.height}</h1>
                  <h2>{block.hash}</h2>

                </div>

              );

            })

          }

        </div>

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

    watchBlocks: blocks.watchBlocks

  }, dispatch);

}

export default connect(props, actions)(ContainerBlocks);