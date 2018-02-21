import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as blocks from '../actions/actions-blocks';

class ContainerBlocks extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){

    addEventListener('click', () => this.props.fetchBlocks())

  }

  render() {

    if(!this.props.blocks){
      return (

        <h2>
          No blocks loaded.
        </h2>
      )
    }

    return (

      <h2>Current Height Of The Ethereum Blockchain: {this.props.blocks.height}</h2>

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

    fetchBlocks: blocks.fetchBlocks

  }, dispatch);

}

export default connect(props, actions)(ContainerBlocks);

/*
 {

          this.props.blocks.map((block, index) => {

             return (

               <div key={index}>

                <h1>{block.title}</h1>
                <h2>{block.text}</h2>

               </div>

             );

          })

        }
*/